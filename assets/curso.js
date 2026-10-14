/* Motor de progresso do curso + interface (HUD, botão Home, painel, recuperação).
   O motor (createEngine) é puro e testável em Node: node test-curso.mjs
   Estado salvo em localStorage ("knicode.universal.v1"), só no aparelho do aluno. Começa do zero: Módulo 1 aberto, todos os outros bloqueados.

   REGRAS:
   - Entre aulas: recuperação sem consulta, mínimo 2 de 3 certas.
   - Níveis por conceito: compreensão, execução (sozinho = sem dica), retenção (3+ dias depois), transferência.
   - Status do conceito: Não compreendido, Em aprendizagem, Executa com apoio, Executa sozinho, Retido, Transferido.
   - Módulo concluído: todos os conceitos centrais com compreensão + "Executa sozinho"; >= 60% retidos; transferência aprovada;
     exercício final entregue sem apoio.
   - "Quase": exercício final sem apoio e >= 80% dos conceitos "Executa sozinho": libera o próximo módulo com "Revisão pendente". */
(function (root) {
  const KEY = "knicode.universal.v1", DAY = 86400000;
  const T = { ret: 0.6, almost: 0.8, recoveryPass: 2, retentionDays: 3, offsets: [1, 3, 7, 14, 30] };

  const mod = (id, n, title, concepts, final, transfer) => ({ id, n, title, concepts: concepts || [], final, transfer });
  // Trilha pública. Só o Módulo 1 tem conceitos definidos por enquanto; os demais recebem conceitos quando suas aulas forem criadas.
  const COURSE = {
    modules: [
      mod("m01", 1, "Primeiros passos em código", [
        ["programa", "Programa = instruções em ordem"], ["print_aspas", "print e texto entre aspas"],
        ["aspas_calculo", "Aspas x cálculo"], ["ler_erro", "Ler uma mensagem de erro"],
        ["variaveis", "Variáveis"], ["tipos", "Número x texto (tipos)"], ["entrada", "Entrada de dados (input)"],
        ["privacidade", "Privacidade: usar só o dado necessário"]
      ].map(([id, name]) => ({ id, name })), "Mini-projeto: ficha de cadastro no terminal", "Resolver um problema novo com os mesmos conceitos"),
      mod("m02", 2, "Lógica de decisão"), mod("m03", 3, "Funções"), mod("m04", 4, "Listas, laços e dicionários"),
      mod("m05", 5, "Erros, testes e depuração"), mod("m06", 6, "Engenharia de prompts"), mod("m07", 7, "Claude: Projetos e Artifacts"),
      mod("m08", 8, "Segurança e privacidade com IA"), mod("m09", 9, "Claude Code"), mod("m10", 10, "Skills, MCP e conectores"),
      mod("m11", 11, "API da Anthropic e agentes"), mod("m12", 12, "Projeto final")
    ],
    // Aulas já construídas (atualizar a cada aula nova)
    lessons: [{ id: "0001", n: 1, module: "m01", file: "lessons/0001-o-computador-segue-instrucoes.html", recovery: "lessons/recuperacao-0001.html" }]
  };

  const fresh = () => ({ v: 1, shift: 0, lessons: {}, concepts: {}, modules: {} });
  function memoryStorage() { let s = null; return { load: () => s ? JSON.parse(JSON.stringify(s)) : fresh(), save: (x) => { s = JSON.parse(JSON.stringify(x)); } }; }
  function browserStorage(ls) {
    let mem = null;
    return {
      load() { try { const t = ls.getItem(KEY); const s = t ? JSON.parse(t) : (mem || fresh()); return Object.assign(fresh(), s); } catch (e) { return mem || fresh(); } },
      save(s) { mem = s; try { ls.setItem(KEY, JSON.stringify(s)); } catch (e) { /* sem armazenamento: segue em memória */ } }
    };
  }

  function createEngine(storage) {
    const now = (s) => Date.now() + (s.shift || 0) * DAY;
    const lesson = (s, id) => (s.lessons[id] = s.lessons[id] || { keys: [], total: 0, completedAt: null, recovery: { best: 0, attempts: 0, passed: false, at: null }, reviews: [] });
    const concept = (s, id) => (s.concepts[id] = s.concepts[id] || {});

    function conceptStatus(s, id) {
      const c = s.concepts[id] || {};
      if (c.exec && c.exec.sozinho && c.ret) return c.trans ? "Transferido" : "Retido";
      if (c.exec && c.exec.sozinho) return "Executa sozinho";
      if (c.exec) return "Executa com apoio";
      if (c.comp) return "Em aprendizagem";
      return "Não compreendido";
    }

    function moduleEval(s, m) {
      const cs = m.concepts, n = cs.length, ms = s.modules[m.id] || {};
      const rows = cs.map(c => ({ id: c.id, name: c.name, status: conceptStatus(s, c.id), comp: !!(s.concepts[c.id] || {}).comp, gaps: (s.concepts[c.id] || {}).gaps || 0 }));
      const solo = rows.filter(r => ["Executa sozinho", "Retido", "Transferido"].includes(r.status)).length;
      const comp = rows.filter(r => r.comp).length;
      const ret = rows.filter(r => ["Retido", "Transferido"].includes(r.status)).length;
      const finalOk = !!(ms.final && ms.final.semApoio), finalHelp = !!(ms.final && !ms.final.semApoio), transferOk = !!ms.transfer;
      const defined = n > 0;
      const complete = defined && comp === n && solo === n && ret / n >= T.ret && transferOk && finalOk;
      const almost = !complete && defined && finalOk && solo / n >= T.almost;
      const weak = [];
      if (defined) {
        rows.filter(r => !["Executa sozinho", "Retido", "Transferido"].includes(r.status)).forEach(r => weak.push(`${r.name}: ${r.status.toLowerCase()}`));
        rows.filter(r => r.comp && r.gaps > 0).forEach(r => weak.push(`${r.name}: você marcou lacuna na autoavaliação`));
        if (ret / n < T.ret) weak.push(`Retenção: ${ret} de ${n} conceitos retidos (precisa de ${Math.ceil(n * T.ret)})`);
        if (!transferOk) weak.push(`Transferência pendente${m.transfer ? ": " + m.transfer : ""}`);
        if (!finalOk) weak.push(finalHelp ? "Exercício final entregue com apoio: refazer sem dica" : `Exercício final pendente${m.final ? ": " + m.final : ""}`);
      }
      const progress = defined ? (comp / n + solo / n + Math.min(1, ret / n / T.ret) + (transferOk ? 1 : 0) + (finalOk ? 1 : 0)) / 5 : 0;
      return { defined, total: n, comp, solo, ret, transferOk, finalOk, complete, almost, weak, progress, rows };
    }

    function snapshot() {
      const s = storage.load(); const mods = []; let prevOpen = true;
      COURSE.modules.forEach((m, i) => {
        const e = moduleEval(s, m);
        const open = i === 0 || prevOpen;
        const state = e.complete ? "done" : open ? "run" : "lock";
        const pending = state === "run" && !e.complete && e.almost;
        mods.push({ id: m.id, n: m.n, title: m.title, state, pending, eval: e });
        prevOpen = e.complete || (open && e.almost);
      });
      const done = mods.filter(m => m.state === "done").length;
      const running = mods.filter(m => m.state === "run");
      const current = running.length ? running[running.length - 1].n : COURSE.modules.length;
      const overall = Math.round(mods.reduce((a, m) => a + m.eval.progress, 0) / COURSE.modules.length * 100);
      return { state: s, modules: mods, done, current, overall, nextReview: nextReview(s), built: COURSE.lessons.length };
    }

    function nextReview(s) {
      const t = now(s); let best = null;
      COURSE.lessons.forEach(def => {
        const l = s.lessons[def.id]; if (!l || !l.completedAt) return;
        const last = l.reviews[l.reviews.length - 1];
        let due;
        if (last && last.score < T.recoveryPass) due = last.at + DAY;                  // errou: antecipa
        else { const k = Math.min(l.reviews.length, T.offsets.length - 1); due = l.completedAt + T.offsets[k] * DAY; if (l.reviews.length >= T.offsets.length) return; }
        if (best === null || due < best.due) best = { due, lesson: def.id };
      });
      if (!best) return { label: "sem pendências", due: null };
      const d = Math.ceil((best.due - t) / DAY);
      return { label: d <= 0 ? "hoje" : d === 1 ? "amanhã" : `em ${d} dias`, due: best.due, lesson: best.lesson, overdue: d <= 0 };
    }

    return {
      snapshot, conceptStatus: (id) => conceptStatus(storage.load(), id), nextReview: () => nextReview(storage.load()),
      evidence(id, level, opt) {
        opt = opt || {}; const s = storage.load(), c = concept(s, id), t = now(s);
        if (level === "comp") { if (!c.comp) c.comp = { at: t }; }
        else if (level === "exec") { const sozinho = opt.sozinho !== false; if (!c.exec || (sozinho && !c.exec.sozinho)) c.exec = { at: t, sozinho }; }
        else if (level === "ret") { if (!c.ret) c.ret = { at: t }; }
        else if (level === "trans") { if (!c.trans) c.trans = { at: t }; }
        storage.save(s);
      },
      gap(id) { const s = storage.load(), c = concept(s, id); c.gaps = (c.gaps || 0) + 1; storage.save(s); },
      setFinal(modId, semApoio) { const s = storage.load(); s.modules[modId] = s.modules[modId] || {}; const f = s.modules[modId].final; if (!f || (semApoio && !f.semApoio)) s.modules[modId].final = { at: now(s), semApoio: !!semApoio }; storage.save(s); },
      setTransfer(modId) { const s = storage.load(); s.modules[modId] = s.modules[modId] || {}; s.modules[modId].transfer = s.modules[modId].transfer || { at: now(s) }; storage.save(s); },
      lessonKey(id, key, total) {
        const s = storage.load(), l = lesson(s, id); if (!l.keys.includes(key)) l.keys.push(key); l.total = total;
        if (l.keys.length >= total && !l.completedAt) l.completedAt = now(s);
        storage.save(s);
      },
      lessonInfo(id) { const l = storage.load().lessons[id]; return l ? { keys: l.keys.slice(), total: l.total, completedAt: l.completedAt, recovery: l.recovery } : null; },
      // results: [{concept, ok}]. Passa com >= 2 de 3 (ou 2/3 do total). Acerto 3+ dias depois da aula também conta como retenção.
      submitRecovery(id, results) {
        const s = storage.load(), l = lesson(s, id), t = now(s);
        const total = results.length, correct = results.filter(r => r.ok).length;
        const need = total === 3 ? T.recoveryPass : Math.ceil(total * 2 / 3), passed = correct >= need;
        l.reviews.push({ at: t, score: correct, total }); l.recovery.attempts++; l.recovery.best = Math.max(l.recovery.best, correct);
        if (passed && !l.recovery.passed) { l.recovery.passed = true; l.recovery.at = t; }
        const retained = [];
        if (l.completedAt && t - l.completedAt >= T.retentionDays * DAY) results.forEach(r => {
          const c = r.ok && r.concept && s.concepts[r.concept];
          if (c && (c.comp || c.exec) && !c.ret) { c.ret = { at: t }; retained.push(r.concept); }
        });
        storage.save(s); return { correct, total, passed, retained, need };
      },
      debug: {
        advanceDays(n) { const s = storage.load(); s.shift = (s.shift || 0) + n; storage.save(s); },
        reset() { storage.save(fresh()); }
      }
    };
  }

  const api = { COURSE, T, createEngine, memoryStorage, browserStorage, KEY };
  if (typeof module !== "undefined" && module.exports) { module.exports = api; return; }

  /* ===== A partir daqui: interface (só no navegador) ===== */
  let ls = null; try { ls = root.localStorage; ls.getItem(KEY); } catch (e) { ls = null; }
  const engine = createEngine(ls ? browserStorage(ls) : memoryStorage());
  root.Curso = Object.assign({ course: COURSE }, engine);

  const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();
  const pad = (n) => String(n).padStart(2, "0");
  const metaV = (n) => { const m = document.querySelector(`meta[name="${n}"]`); return m ? m.content : null; };
  const path = location.pathname.replace(/\\/g, "/");
  const inLessons = /\/lessons\//.test(path);
  const homeHref = inLessons ? "../index.html" : "index.html";
  const prefix = inLessons ? "../" : "";

  const HOUSE = `<svg class="house" viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <g class="h-ant"><path d="M16 7V3"/><circle cx="16" cy="2.2" r="1.6" fill="currentColor" stroke="none"/></g>
    <path d="M3.5 16.5L16 7l12.5 9.5"/><rect x="7" y="16" width="18" height="12" rx="1.5"/>
    <rect class="h-eye" x="11" y="19.5" width="3" height="4" rx=".6" fill="currentColor" stroke="none"/>
    <rect class="h-eye" x="18" y="19.5" width="3" height="4" rx=".6" fill="currentColor" stroke="none"/></svg>`;

  function hud() {
    document.body.insertAdjacentHTML("afterbegin",
      `<div class="progress" role="progressbar" aria-label="Progresso"><a class="home" href="${homeHref}" aria-label="Home: painel do curso">${HOUSE}<span>HOME</span></a>
       <span class="hud-l">SYSTEM LOAD</span><div class="track"><div class="bar"></div></div><span class="pct">0%</span></div>`);
    setBar(0);
  }
  function setBar(p) { const b = $(".progress .bar"); if (b) { b.style.width = p + "%"; $(".progress .pct").textContent = p + "%"; } }

  function renderHome() {
    const snap = engine.snapshot();
    setBar(snap.overall);
    $$(".stat").forEach(st => {
      const k = norm($(".k2", st).textContent), v = $(".v", st);
      if (k.startsWith("modulos concluidos")) v.textContent = `${snap.done} / ${snap.modules.length}`;
      else if (k.startsWith("modulo atual")) v.textContent = pad(snap.current);
      else if (k.startsWith("aulas prontas")) v.textContent = snap.built;
      else if (k.startsWith("proxima revisao")) v.textContent = snap.nextReview.label;
    });
    const L = { run: "[EM ANDAMENTO]", lock: "[BLOQUEADO]", done: "[CONCLUÍDO]" };
    $$(".mod").forEach(card => {
      const m = /^(\d+)/.exec($("h3", card).textContent.trim());
      const info = m ? snap.modules[+m[1] - 1] : null;
      const parState = snap.modules[1].state === "lock" ? "lock" : "run";     // trilha paralela abre junto com o Módulo 2
      const state = info ? info.state : parState;
      card.classList.remove("run", "lock", "done"); card.classList.add(state);
      const st = $(".st", card); st.className = "st " + state; st.textContent = L[state];
      $$(".mod-extra", card).forEach(e => e.remove());
      const body = $(".mod-body", card);
      if (info && info.eval.defined && state !== "lock") {
        const e = info.eval, pc = Math.round(e.progress * 100);
        let h = `<div class="mod-extra"><div class="mp-track"><i style="width:${pc}%"></i></div><div class="mp-txt">${pc}% das evidências · ${e.solo}/${e.total} executando sozinho · ${e.ret} retidos</div>`;
        if (info.pending) h += `<div class="review-tag">[ REVISÃO PENDENTE ]</div><ul class="weak">${e.weak.map(w => `<li>${esc(w)}</li>`).join("")}</ul>`;
        body.insertAdjacentHTML("beforeend", h + "</div>");
      }
      const go = $(".go", card);
      if (go && info) {
        const lsn = COURSE.lessons.filter(l => l.module === info.id); let next = null, txt = "";
        for (const l of lsn) {
          const li = engine.lessonInfo(l.id);
          if (!li || !li.completedAt) { next = { href: l.file }; txt = `▶ continuar: aula ${l.n}`; break; }
          if (!li.recovery.passed) { next = { href: l.recovery }; txt = `▶ recuperação da aula ${l.n}`; break; }
        }
        if (state === "lock") go.style.display = "none"; else { go.style.display = ""; }
        if (next) { go.href = next.href; go.textContent = txt; go.classList.remove("off"); }
        else { go.removeAttribute("href"); go.textContent = `aula ${lsn.length + 1} em preparação`; go.classList.add("off"); }
      }
    });
  }

  function doneBanner() {
    const id = metaV("curso-aula"); if (!id || $(".done-banner")) return;
    const def = COURSE.lessons.find(l => l.id === id), li = engine.lessonInfo(id);
    if (!def || !li || !li.completedAt) return;
    const main = $("main"), foot = $("footer", main);
    const html = `<section class="done-banner"><b>[ AULA CONCLUÍDA ]</b> Próxima etapa: a <b>recuperação sem consulta</b> (2 de 3 para liberar a próxima aula). Faça depois de um intervalo, de preferência amanhã. <a href="${def.recovery.replace("lessons/", "")}">Abrir a recuperação</a> · <a href="${homeHref}">Voltar ao painel</a></section>`;
    if (foot) foot.insertAdjacentHTML("beforebegin", html); else main.insertAdjacentHTML("beforeend", html);
  }

  /* Componente de recuperação: 3 perguntas, correção por padrões + opção honesta de contestar */
  function matchAnswer(v, ds) {
    const n = norm(v); if (!n) return false;
    const all = (ds.regex || "").split(";;").filter(Boolean);
    if (!all.every(r => new RegExp(r, "i").test(n))) return false;
    if (ds.notRegex && new RegExp(ds.notRegex, "i").test(n)) return false;
    return true;
  }
  function recovery(box) {
    const lessonId = box.dataset.lesson, items = $$(".rq", box), out = $(".rq-result", box);
    let checked = false, final = [];
    $(".rq-check", box).onclick = () => {
      checked = true;
      final = items.map(it => {
        const inp = $("textarea,input", it), ok = matchAnswer(inp.value, inp.dataset);
        it.classList.toggle("good", ok); it.classList.toggle("wrong", !ok);
        let fb = $(".rq-fb", it); if (!fb) { fb = document.createElement("div"); fb.className = "rq-fb"; it.appendChild(fb); }
        fb.innerHTML = ok ? "<b>Certo.</b>" : `<b>Ainda não.</b> Resposta de referência: ${esc(inp.dataset.model || "")}<br><button type="button" class="ghost rq-own">Minha resposta estava certa, com outras palavras</button>`;
        const r = { concept: inp.dataset.concept, ok, own: false };
        const own = $(".rq-own", fb); if (own) own.onclick = () => { r.ok = true; r.own = true; it.classList.add("good"); it.classList.remove("wrong"); fb.innerHTML = "<b>Contada como certa</b> (autoavaliação)."; };
        return r;
      });
      $(".rq-submit", box).style.display = "";
    };
    $(".rq-submit", box).onclick = () => {
      if (!checked) return;
      const res = engine.submitRecovery(lessonId, final);
      const self = final.filter(r => r.own).length;
      out.className = "rq-result " + (res.passed ? "ok" : "bad");
      out.innerHTML = res.passed
        ? `<b>Recuperação concluída: ${res.correct} de ${res.total}.</b> A próxima aula está liberada.${res.retained.length ? ` Isso também registrou <b>retenção</b> de ${res.retained.length} conceito(s) (passaram 3+ dias desde a aula).` : ""}${self ? ` ${self} resposta(s) foram contadas por autoavaliação; vale rever esses pontos com calma depois.` : ""} <a href="${homeHref}">Voltar ao painel</a>`
        : `<b>${res.correct} de ${res.total}: faltam ${res.need} para liberar a próxima aula.</b> Não é reprovação: releia os pontos das respostas de referência, peça ao Claude (ou a quem te acompanha) para explicar de outro jeito e tente de novo. A revisão fica agendada para mais cedo. <button type="button" class="ghost" onclick="location.reload()">Tentar de novo</button>`;
      $(".rq-submit", box).style.display = "none"; $(".rq-check", box).style.display = "none";
    };
    $(".rq-submit", box).style.display = "none";
  }

  document.addEventListener("DOMContentLoaded", () => {
    hud();
    const isIndex = !!$(".dash");
    /* Marca "navegação interna" quando o aluno clica num link do curso (a guarda lê isso para não redirecionar) */
    document.addEventListener("click", ev => {
      const a = ev.target.closest && ev.target.closest("a[href]");
      if (a && !a.target && ev.button === 0 && !ev.ctrlKey && !ev.metaKey && !ev.shiftKey && /.html?$/i.test(a.pathname) && a.host === location.host) {
        try { sessionStorage.setItem("curso.interno", "1"); } catch (e) { /* ok */ }
      }
    }, true);
    if (isIndex) {
      /* Abrir o painel (carregamento novo) começa na Home, no topo. Recarregar NÃO mexe na posição. */
      const nav = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || {};
      if ((nav.type || "navigate") === "navigate") {
        try { history.scrollRestoration = "manual"; } catch (e) { /* ok */ }
        window.scrollTo(0, 0);
        if (location.hash) history.replaceState(null, "", location.pathname + location.search);
      }
      renderHome();
      $(".home").addEventListener("click", ev => {            // já está no Home: reseta qualquer visão aberta
        ev.preventDefault(); $$("details").forEach(d => d.open = false);
        if (location.hash) history.replaceState(null, "", location.pathname + location.search);
        window.scrollTo({ top: 0, behavior: "smooth" }); renderHome();
      });
    } else {
      const id = metaV("curso-aula"), info = id && engine.lessonInfo(id);
      if (info && info.total) setBar(Math.min(100, Math.round(info.keys.length / info.total * 100)));
      else setBar(engine.snapshot().overall);
      doneBanner();
      document.addEventListener("aula-completa", doneBanner);
    }
    $$(".recovery").forEach(recovery);
  });
  root.addEventListener("pageshow", ev => { if (ev.persisted && $(".dash")) renderHome(); });   // voltou pelo botão "voltar": atualiza
})(typeof window !== "undefined" ? window : globalThis);
