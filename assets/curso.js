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

  /* ===== CURRÍCULO: fonte única da trilha (aberta, sem limite de módulos) =====
     Alimenta o motor de progresso, o painel (index.html), CURRICULO.md e os testes. Para criar um módulo, acrescente uma linha aqui
     (e, quando houver aulas, os conceitos em CONCEITOS). "verificar": o conteúdo depende de ferramenta que muda; conferir na documentação oficial. */
  const PARTES = ["Lógica e Python","Gestão de projetos e mentalidade ágil","Vibe coding e engenharia de prompts","Ecossistema Claude","No ar, com segurança","Projetos e carreira"];
  const CURRICULO = [
    {"parte":0,"ext":"py","titulo":"Primeiros passos: algoritmos e Python","desc":"Um robô que passa café: o que é um algoritmo, print, texto e aspas, variáveis, tipos e entrada de dados.","aulas":8,"h1":1,"exercicio":"Um robô de café que monta o pedido na tela.","criterio":"Prever a saída de um programa curto, corrigir um erro e escrever um programa pequeno do zero.","verificar":false},
    {"parte":0,"ext":"py","titulo":"Decisões: conferir antes de agir","desc":"O robô confere se há água e se ela está quente: comparações, if, else, elif, a ordem das regras e os limites.","aulas":8,"h1":0,"exercicio":"Regras de desconto de uma loja virtual simples.","criterio":"Achar erro de ordem ou de limite numa regra e alterar a regra sozinho.","verificar":false},
    {"parte":0,"ext":"py","titulo":"Repetições: fazer de novo sem copiar","desc":"Organizar as tarefas da semana: for, while, contadores e acumuladores.","aulas":8,"h1":1,"exercicio":"Percorrer os dias da semana e somar horas de estudo.","criterio":"Ler e escrever laços sem pular nem repetir itens por engano.","verificar":false},
    {"parte":0,"ext":"py","titulo":"Funções: receitas com nome","desc":"Dar nome a um passo a passo, passar entradas, devolver resultados e reaproveitar código.","aulas":8,"h1":1,"exercicio":"Transformar os exercícios anteriores em funções reutilizáveis.","criterio":"Quebrar um problema em funções pequenas e ler funções escritas por outra pessoa ou pela IA.","verificar":false},
    {"parte":0,"ext":"py","titulo":"Listas e dicionários","desc":"Carrinho de compras e lista de tarefas: guardar muitos dados, filtrar, ordenar e ler arquivos simples.","aulas":10,"h1":1,"exercicio":"Um carrinho de e-commerce com total e desconto.","criterio":"Ler um script que percorre uma lista e dizer o que sai; corrigir um laço que pula itens.","verificar":false},
    {"parte":0,"ext":"py","titulo":"Erros, testes e depuração","desc":"Ler mensagens de erro, escrever testes simples e provar que um código funciona, inclusive o que a IA escreve.","aulas":8,"h1":0,"exercicio":"Corrigir um script com defeitos plantados e escrever testes que os revelam.","criterio":"Transformar uma regra em casos de teste e usá-los para conferir código gerado.","verificar":false},
    {"parte":1,"ext":"agil","titulo":"Mentalidade ágil e gestão de processos","desc":"Quadro kanban, backlog, priorização, entregas pequenas (MVP), ciclos curtos e retrospectiva.","aulas":8,"h1":0,"exercicio":"Montar e priorizar o backlog de um gerenciador de tarefas pessoal.","criterio":"Quebrar uma ideia em entregas pequenas e priorizar com critério explicado.","verificar":false},
    {"parte":1,"ext":"agil","titulo":"Do problema ao plano","desc":"Requisitos, histórias de usuário, critérios de aceite e escopo, com um app de finanças pessoais como exemplo.","aulas":8,"h1":1,"exercicio":"Escrever o plano de um app de finanças pessoais, pronto para ser construído.","criterio":"Escrever critérios de aceite que um teste consegue verificar.","verificar":false},
    {"parte":2,"ext":"prompt","titulo":"Engenharia de prompts: fundamentos","desc":"Como pedir bem: objetivo, contexto, exemplos e formato da resposta.","aulas":8,"h1":0,"exercicio":"Reescrever pedidos vagos até obter respostas úteis e verificáveis.","criterio":"Escrever pedidos claros e reconhecer quando uma resposta não serve.","verificar":false},
    {"parte":2,"ext":"prompt","titulo":"Engenharia de prompts avançada","desc":"Dividir tarefas, encadear passos, dar papéis e restrições, pedir verificação e avaliar respostas com testes.","aulas":8,"h1":1,"exercicio":"Montar uma cadeia de prompts que gera e testa uma pequena função.","criterio":"Projetar prompts em etapas e medir se melhoraram, em vez de confiar na impressão.","verificar":false},
    {"parte":2,"ext":"prompt","titulo":"Vibe coding com responsabilidade","desc":"O ciclo: especificar, gerar, ler, testar e ajustar. Quando confiar, quando desconfiar e como não aceitar código às cegas.","aulas":8,"h1":2,"exercicio":"Construir uma ferramenta pequena pedindo à IA, lendo cada trecho e escrevendo os testes.","criterio":"Dirigir a IA com especificações claras e rejeitar código que não passa na revisão.","verificar":false},
    {"parte":3,"ext":"claude","titulo":"Claude Chat","desc":"Conversar com método: pedir, iterar, verificar respostas e conhecer os limites.","aulas":6,"h1":0,"exercicio":"Resolver um problema do dia a dia em uma conversa guiada e checar o resultado.","criterio":"Usar o chat para aprender e produzir, conferindo as respostas por conta própria.","verificar":true},
    {"parte":3,"ext":"claude","titulo":"Claude Artifacts","desc":"Criar e refinar páginas e ferramentas interativas direto na conversa, e revisar o código gerado.","aulas":8,"h1":1,"exercicio":"Um conversor ou calculadora simples feito com Artifacts.","criterio":"Pedir, revisar e ajustar um artifact até ele fazer o que foi especificado.","verificar":true},
    {"parte":3,"ext":"claude","titulo":"Claude Projects","desc":"Organizar conhecimento e instruções persistentes para trabalhar num assunto ao longo do tempo.","aulas":6,"h1":0,"exercicio":"Montar um Projeto de estudo com instruções e materiais.","criterio":"Estruturar um Projeto que dê respostas consistentes para um assunto.","verificar":true},
    {"parte":3,"ext":"code","titulo":"Claude Code","desc":"Programar com um assistente no terminal: pedir, revisar mudanças, rodar testes e versionar.","aulas":10,"h1":2,"exercicio":"Construir e melhorar um pequeno programa, com testes, revisando cada mudança.","criterio":"Dirigir o Claude Code com especificações claras e aceitar só o que passa na revisão.","verificar":true},
    {"parte":3,"ext":"mcp","titulo":"Skills, MCP e conectores","desc":"Estender o Claude com instruções reutilizáveis e ligações a ferramentas e dados, com cuidado nas permissões.","aulas":8,"h1":0,"exercicio":"Criar uma skill simples e avaliar os riscos de uma conexão.","criterio":"Estender o Claude de forma útil e segura.","verificar":true},
    {"parte":3,"ext":"agent","titulo":"Agentes e orquestração (Cowork)","desc":"Workflow x agente, subagentes e orquestração de várias tarefas; inclui ferramentas como o Cowork (conferir na documentação oficial).","aulas":8,"h1":1,"exercicio":"Desenhar um fluxo com várias etapas e definir limites e permissões de cada agente.","criterio":"Explicar quando usar um agente, como orquestrar e quais cuidados ele exige.","verificar":true},
    {"parte":3,"ext":"api","titulo":"API da Anthropic","desc":"Chamar o Claude por código, enviar mensagens, usar ferramentas e controlar custos.","aulas":8,"h1":1,"exercicio":"Um programa que usa a API para uma tarefa pequena e útil.","criterio":"Fazer uma chamada à API, tratar erros e limitar o que o programa pode fazer.","verificar":true},
    {"parte":4,"ext":"git","titulo":"Git e GitHub","desc":"Versionar o trabalho: commits, branches, desfazer erros e publicar um repositório.","aulas":8,"h1":1,"exercicio":"Versionar um projeto e publicá-lo, com um README claro.","criterio":"Usar o Git no dia a dia sem medo de perder trabalho.","verificar":false},
    {"parte":4,"ext":"cloud","titulo":"Hospedagem na nuvem","desc":"Colocar um site no ar: hospedagem estática, deploy automático a cada alteração, endereço e app instalável (PWA).","aulas":6,"h1":1,"exercicio":"Publicar um projeto do curso e abri-lo no celular.","criterio":"Publicar, atualizar e reverter um site com segurança.","verificar":true},
    {"parte":4,"ext":"sec","titulo":"Segurança de dados para quem constrói","desc":"Segredos e chaves, validação de entrada, injeção, dependências, o que nunca colar numa IA e riscos comuns (OWASP).","aulas":8,"h1":0,"exercicio":"Revisar com um checklist um código gerado pela IA.","criterio":"Identificar riscos básicos e priorizar o que corrigir.","verificar":true},
    {"parte":4,"ext":"lgpd","titulo":"LGPD para desenvolvedores","desc":"Fundamentos: dado pessoal e sensível, bases legais, minimização, direitos do titular e incidentes. Noções de GDPR.","aulas":6,"h1":0,"exercicio":"Mapear quais dados um app coleta e justificar cada campo.","criterio":"Dizer, para cada dado, se é necessário, por que, quem acessa e por quanto tempo.","verificar":true},
    {"parte":5,"ext":"final","titulo":"Projeto integrador","desc":"Um app de finanças pessoais (ou gerenciador de tarefas) do plano ao ar, com vibe coding responsável de ponta a ponta.","aulas":0,"h1":8,"exercicio":"Planejar, construir, testar, proteger e publicar o app.","criterio":"Um app seu, funcional, testado, seguro e publicado, que você explica sem consultar.","verificar":false},
    {"parte":5,"ext":"final","titulo":"Portfólio e próximos passos","desc":"Documentar, apresentar o trabalho e traçar caminhos de estudo e de carreira com honestidade.","aulas":4,"h1":1,"exercicio":"README, demonstração e plano de estudos dos próximos três meses.","criterio":"Apresentar seus projetos de forma clara e saber o que estudar a seguir.","verificar":false}
  ];
  // Conceitos centrais por módulo (só o Módulo 1 tem aulas por enquanto; os demais ganham conceitos quando suas aulas forem criadas).
  const CONCEITOS = {
    m01: [
      ["programa", "Algoritmo e programa: instruções exatas, em ordem"], ["print_aspas", "print e texto entre aspas"],
      ["aspas_calculo", "Aspas x cálculo"], ["ler_erro", "Ler uma mensagem de erro"],
      ["variaveis", "Variáveis"], ["tipos", "Número x texto (tipos)"], ["entrada", "Entrada de dados (input)"],
      ["privacidade", "Privacidade: usar só o dado necessário"]
    ].map(([id, name]) => ({ id, name }))
  };
  const FINAL = { m01: ["Mini-projeto: robô de café que monta o pedido", "Aplicar os mesmos conceitos a organizar as tarefas da semana"] };
  const COURSE = {
    modules: CURRICULO.map((m, i) => { const id = "m" + String(i + 1).padStart(2, "0"); return mod(id, i + 1, m.titulo, CONCEITOS[id], (FINAL[id] || [])[0], (FINAL[id] || [])[1]); }),
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

  /* ===== Tolerância ao teclado do celular: o corretor automático põe maiúscula em "print" ===== */
  const normT = (s) => String(s == null ? "" : s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();
  // Troca Print( por print( e Input( por input( só no código, nunca dentro de textos entre aspas. Sem lookbehind (iPhones antigos não suportam).
  function corrigirMaiusculas(code) {
    const partes = String(code).split(/("[^"\n]*"|'[^'\n]*')/), trocas = [];
    for (let i = 0; i < partes.length; i += 2)   // posições pares = código; ímpares = textos entre aspas
      partes[i] = partes[i].replace(/(^|[^\w.])(Print|Input)(\s*)\(/g, (m, antes, nome, esp) => { trocas.push(nome); return antes + nome.toLowerCase() + esp + "("; });
    return { code: partes.join(""), trocas };
  }
  // Lê a resposta de um quiz: aceita o texto puro ou o comando que o produz, por exemplo print("Valor: 500")
  function lerResposta(raw) {
    let v = String(raw == null ? "" : raw).trim(), capitalizado = false;
    const m = v.match(/^(print|input)(\s*)\(\s*([\s\S]*?)\s*\)$/i);
    if (m) { capitalizado = m[1] !== m[1].toLowerCase(); v = m[3].trim().replace(/^["'“”‘’]+|["'“”‘’]+$/g, "").trim(); }
    return { texto: v, capitalizado };
  }
  // Compara com o gabarito ignorando maiúsculas, espaços extras e acentos nos dois lados (digitado e gabarito).
  function conferir(raw, aceitas, desembrulhar) {
    const r = desembrulhar ? lerResposta(raw) : { texto: String(raw == null ? "" : raw), capitalizado: false };
    const ok = aceitas.map(normT).includes(normT(r.texto));
    return { ok, capitalizado: ok && r.capitalizado };   // o alerta educativo só aparece quando a resposta está certa
  }
  const MSG_CASE_QUIZ = "✅ Resposta correta! Mas atenção: no Python, os comandos são 'case-sensitive' (diferenciam maiúsculas de minúsculas) e o correto é usar 'print' com p minúsculo. O seu celular capitalizou a letra automaticamente, mas o sistema ajustou para você continuar!";
  const MSG_CASE_RUN = "Atenção: no Python, os comandos são 'case-sensitive' (diferenciam maiúsculas de minúsculas). Você escreveu {nomes} com letra maiúscula (provavelmente o corretor do celular) e o sistema trocou para minúsculo para o código rodar. O correto é sempre minúsculo: 'print', 'input'.";
  const tolerancia = { corrigirMaiusculas, lerResposta, conferir, MSG_CASE_QUIZ, MSG_CASE_RUN };

  const api = { COURSE, CURRICULO, PARTES, T, createEngine, memoryStorage, browserStorage, KEY, tolerancia };
  if (typeof module !== "undefined" && module.exports) { module.exports = api; return; }

  /* ===== A partir daqui: interface (só no navegador) ===== */
  let ls = null; try { ls = root.localStorage; ls.getItem(KEY); } catch (e) { ls = null; }
  const engine = createEngine(ls ? browserStorage(ls) : memoryStorage());
  root.Curso = Object.assign({ course: COURSE, tolerancia }, engine);

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
