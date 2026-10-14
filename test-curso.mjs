// Testes das regras de progresso do curso. Uso (na pasta do curso): node test-curso.mjs
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { COURSE, createEngine, memoryStorage } = require("./assets/curso.js");

let fails = 0;
const eq = (name, got, want) => { const ok = JSON.stringify(got) === JSON.stringify(want); if (!ok) fails++; console.log(`${ok ? "ok  " : "FAIL"} ${name}${ok ? "" : `  got=${JSON.stringify(got)} want=${JSON.stringify(want)}`}`); };
const m1 = COURSE.modules[0], ids = m1.concepts.map(c => c.id);
const states = e => e.snapshot().modules.map(m => m.state).join(",");
// Limiares proporcionais ao número de conceitos do Módulo 1 (a trilha pode crescer sem quebrar os testes)
const N = ids.length, NMOD = COURSE.modules.length;
const needRet = Math.ceil(N * 0.6), needSolo = Math.ceil(N * 0.8);
const lockedTail = k => Array(NMOD - k).fill("lock").join(",");

// 1. Estado inicial
let E = createEngine(memoryStorage());
eq("inicial: M1 em andamento, resto bloqueado", states(E), "run," + lockedTail(1));
eq("inicial: 0 concluídos, atual 1", [E.snapshot().done, E.snapshot().current], [0, 1]);

// 2. Status de conceito
E.evidence("programa", "comp");           eq("só comp = Em aprendizagem", E.conceptStatus("programa"), "Em aprendizagem");
E.evidence("programa", "exec", { sozinho: false }); eq("exec com dica = Executa com apoio", E.conceptStatus("programa"), "Executa com apoio");
E.evidence("programa", "exec", { sozinho: true });  eq("exec sozinho (promove)", E.conceptStatus("programa"), "Executa sozinho");
E.evidence("programa", "exec", { sozinho: false }); eq("dica depois não rebaixa", E.conceptStatus("programa"), "Executa sozinho");
E.evidence("programa", "ret");            eq("com retenção = Retido", E.conceptStatus("programa"), "Retido");
E.evidence("programa", "trans");          eq("com transferência = Transferido", E.conceptStatus("programa"), "Transferido");
eq("conceito sem nada = Não compreendido", E.conceptStatus("tipos"), "Não compreendido");

// 3. Módulo completo: todos sozinho + 60% retidos + transferência + final sem apoio
E = createEngine(memoryStorage());
ids.forEach(id => { E.evidence(id, "comp"); E.evidence(id, "exec", { sozinho: true }); });
ids.slice(0, needRet - 1).forEach(id => E.evidence(id, "ret"));   // um a menos que o mínimo de 60% retidos
E.setTransfer("m01"); E.setFinal("m01", true);
eq("retidos abaixo de 60%: ainda não conclui, mas 'quase' libera M2 com revisão pendente", [E.snapshot().modules[0].state, E.snapshot().modules[0].pending, E.snapshot().modules[1].state], ["run", true, "run"]);
E.evidence(ids[needRet - 1], "ret");                          // atinge o mínimo
eq("retidos >= 60% + transfer + final: M1 concluído, M2 ativo", [states(E), E.snapshot().done, E.snapshot().current], ["done,run," + lockedTail(2), 1, 2]);
eq("concluído não tem revisão pendente", E.snapshot().modules[0].pending, false);

// 4. 'Quase' (>= 80% sozinho + final sem apoio, sem transferência/retenção)
E = createEngine(memoryStorage());
ids.slice(0, needSolo).forEach(id => { E.evidence(id, "comp"); E.evidence(id, "exec", { sozinho: true }); });  // exatamente o mínimo de 80%
E.setFinal("m01", true);
let s = E.snapshot();
eq("quase: M1 não concluído, M2 liberado, revisão pendente", [s.modules[0].state, s.modules[0].pending, s.modules[1].state, s.done], ["run", true, "run", 0]);
eq("quase: pontos fracos apontam o que falta", s.modules[0].eval.weak.some(w => w.includes(m1.concepts[N - 1].name)) && s.modules[0].eval.weak.some(w => w.startsWith("Transferência")), true);
eq("quase: M3 continua bloqueado", s.modules[2].state, "lock");

// 5. Final com apoio não libera
E = createEngine(memoryStorage());
ids.forEach(id => { E.evidence(id, "comp"); E.evidence(id, "exec", { sozinho: true }); });
E.setFinal("m01", false);
s = E.snapshot();
eq("final com apoio: M2 continua bloqueado", [s.modules[0].state, s.modules[1].state], ["run", "lock"]);
eq("final com apoio aparece nos pontos fracos", s.modules[0].eval.weak.some(w => w.includes("com apoio")), true);
E.setFinal("m01", true);
eq("refeito sem apoio: libera M2 (quase)", E.snapshot().modules[1].state, "run");

// 6. Abaixo de 80% sozinho não libera mesmo com final
E = createEngine(memoryStorage());
ids.slice(0, needSolo - 1).forEach(id => { E.evidence(id, "comp"); E.evidence(id, "exec", { sozinho: true }); });  // um a menos que o mínimo
E.setFinal("m01", true);
eq("abaixo de 80% sozinho + final: M2 bloqueado", E.snapshot().modules[1].state, "lock");

// 7. Recuperação entre aulas
E = createEngine(memoryStorage());
["a", "b", "c"].forEach((k, i) => E.lessonKey("0001", k, 3));
eq("aula concluída registra data", !!E.lessonInfo("0001").completedAt, true);
E.evidence("programa", "comp"); E.evidence("aspas_calculo", "comp"); E.evidence("minimizacao", "comp");
let r = E.submitRecovery("0001", [{ concept: "programa", ok: true }, { concept: "aspas_calculo", ok: true }, { concept: "minimizacao", ok: false }]);
eq("2 de 3 passa", [r.correct, r.passed], [2, true]);
eq("no dia seguinte não vira retenção", r.retained, []);
E = createEngine(memoryStorage());
["a", "b", "c"].forEach(k => E.lessonKey("0001", k, 3));
r = E.submitRecovery("0001", [{ concept: "programa", ok: true }, { concept: "aspas_calculo", ok: false }, { concept: "minimizacao", ok: false }]);
eq("1 de 3 reprova", [r.correct, r.passed, E.lessonInfo("0001").recovery.passed], [1, false, false]);
eq("reprovou: revisão antecipada para amanhã", E.nextReview().label, "amanhã");
E.debug.advanceDays(1);
eq("passou 1 dia: revisão vence hoje", E.nextReview().label, "hoje");

// 8. Retenção só 3+ dias depois
E = createEngine(memoryStorage());
["a", "b", "c"].forEach(k => E.lessonKey("0001", k, 3));
E.evidence("programa", "comp"); E.evidence("aspas_calculo", "comp");
E.debug.advanceDays(3);
r = E.submitRecovery("0001", [{ concept: "programa", ok: true }, { concept: "aspas_calculo", ok: true }, { concept: "minimizacao", ok: true }]);
eq("3 dias depois: retenção registrada só de quem tem evidência prévia", r.retained.sort(), ["aspas_calculo", "programa"]);
eq("status vira Retido só com exec sozinho; sem exec fica Em aprendizagem", E.conceptStatus("programa"), "Em aprendizagem");

// 9. Calendário de revisões (1,3,7,14,30 dias)
E = createEngine(memoryStorage());
["a", "b", "c"].forEach(k => E.lessonKey("0001", k, 3));
eq("aula nova: próxima revisão amanhã", E.nextReview().label, "amanhã");
E.submitRecovery("0001", [{ ok: true }, { ok: true }, { ok: true }]);
eq("após 1ª revisão: próxima em 3 dias da aula (2 dias a partir de hoje)", E.nextReview().label, "em 3 dias");

// 10. Painel: aulas prontas e progresso geral
E = createEngine(memoryStorage());
eq("aulas prontas = 1", E.snapshot().built, 1);
eq("progresso geral começa em 0", E.snapshot().overall, 0);

// 11. Guarda de entrada: abrir = painel; link interno, recarregar e voltar = ficam
import vm from "node:vm";
import { readFileSync } from "node:fs";
const guardSrc = readFileSync(new URL("./assets/guarda.js", import.meta.url), "utf8").replaceAll("__HOME__", JSON.stringify("../index.html"));
function runGuard({ protocol = "file:", type = "navigate", flag = false, storageThrows = false }) {
  const store = flag ? { "curso.interno": "1" } : {}; let redirected = null;
  const win = { sessionStorage: storageThrows ? { getItem() { throw new Error("sem storage"); }, removeItem() {} } : { getItem: k => store[k] ?? null, removeItem: k => { delete store[k]; } } };
  const ctx = { window: win, location: { protocol, replace: u => { redirected = u; } }, performance: { getEntriesByType: () => [{ type }] } };
  vm.runInNewContext(guardSrc, ctx);
  return { redirected, flagLeft: store["curso.interno"] };
}
eq("guarda: abrir o arquivo da aula (novo carregamento) vai ao painel", runGuard({}).redirected, "../index.html");
eq("guarda: seguir link do curso não redireciona e consome a marca", runGuard({ flag: true }), { redirected: null, flagLeft: undefined });
eq("guarda: RECARREGAR não redireciona", runGuard({ type: "reload" }).redirected, null);
eq("guarda: voltar/avançar não redireciona", runGuard({ type: "back_forward" }).redirected, null);
eq("guarda: recarregar com marca antiga também limpa a marca", runGuard({ type: "reload", flag: true }).flagLeft, undefined);
eq("guarda: sem storage não redireciona (não perde trabalho)", runGuard({ storageThrows: true }).redirected, null);
eq("guarda: fora de file/http (ex.: painel de prévia) não redireciona", runGuard({ protocol: "data:" }).redirected, null);

// 12. Service worker (sw.js gerado pelo build): ambiente simulado de cache e rede, com modo offline
const swSrc = readFileSync(new URL("./sw.js", import.meta.url), "utf8");
function swWorld() {
  const store = new Map(); let online = true; const handlers = {};
  class Res { constructor(body, o = {}) { this.body = body; this.ok = o.ok !== false; this.type = o.type || "basic"; } clone() { return new Res(this.body, { ok: this.ok, type: this.type }); } }
  const key = (r, ignore) => { const u = new URL(typeof r === "string" ? r : r.url, "http://site/"); if (ignore) u.search = ""; return u.href; };
  const caches = {
    open: async n => { if (!store.has(n)) store.set(n, new Map()); const c = store.get(n);
      return { addAll: async us => us.forEach(u => c.set(key(u), new Res("pre:" + u))), put: async (r, res) => { c.set(key(r), res); },
        match: async r => c.get(key(r)), keys: async () => [...c.keys()].map(u => ({ url: u })) }; },
    match: async (r, o = {}) => { for (const c of store.values()) { const k = key(r, o.ignoreSearch); for (const [u, v] of c) if (key(u, o.ignoreSearch) === k) return v; } },
    keys: async () => [...store.keys()], delete: async n => store.delete(n)
  };
  const fetchFn = async r => { const u = typeof r === "string" ? r : r.url; if (!online) throw new Error("offline"); return new Res("net:" + u); };
  const self = { addEventListener: (n, f) => { handlers[n] = f; }, skipWaiting: async () => {}, clients: { claim: async () => {} } };
  vm.runInNewContext(swSrc, { self, caches, fetch: fetchFn, location: { origin: "http://site" }, URL, Promise });
  const run = async (name, ev) => { let p; ev.waitUntil = x => { p = x; }; ev.respondWith = x => { ev._resp = Promise.resolve(x); ev._handled = true; }; handlers[name](ev); if (p) await p; return ev; };
  return { store, caches, setOnline: v => { online = v; }, install: () => run("install", {}), activate: () => run("activate", {}),
    fetch: async (u, extra = {}) => { const ev = await run("fetch", { request: { url: u, method: "GET", mode: "cors", ...extra } }); return ev._handled ? await ev._resp : "nao-tratado"; } };
}
const W = swWorld();
await W.install();
const coreName = [...W.store.keys()].find(k => k.startsWith("knicode-core-"));
const pre = [...W.store.get(coreName).keys()];
eq("sw: instalação guarda painel, aula, recuperação, manifesto e ícones", ["index.html", "lessons/0001-o-computador-segue-instrucoes.html", "lessons/recuperacao-0001.html", "manifest.webmanifest", "icon.png", "icon-192.png", "icon-maskable-512.png", "apple-touch-icon.png"].map(p => pre.includes("http://site/" + p)), Array(8).fill(true));
W.store.set("knicode-core-antigo", new Map()); W.store.set("knicode-ext-v1", new Map());
await W.activate();
eq("sw: ativação apaga a versão antiga e preserva o cache do Python/fontes", [...W.store.keys()].sort(), [coreName, "knicode-ext-v1"].sort());
const aula = "http://site/lessons/0001-o-computador-segue-instrucoes.html";
eq("sw: aula online vem da rede (conteúdo novo)", (await W.fetch(aula, { mode: "navigate" })).body, "net:" + aula);
W.setOnline(false);
eq("sw: aula offline vem da cópia guardada na última visita", (await W.fetch(aula, { mode: "navigate" })).body, "net:" + aula);
eq("sw: painel offline abre, mesmo com parâmetro na URL", (await W.fetch("http://site/index.html?x=1", { mode: "navigate" })).body, "pre:index.html");
eq("sw: página desconhecida offline cai no painel", (await W.fetch("http://site/nao-existe.html", { mode: "navigate" })).body, "pre:index.html");
eq("sw: ícone offline vem do cache", (await W.fetch("http://site/icon-192.png")).body, "pre:icon-192.png");
W.setOnline(true);
const py = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
eq("sw: Python (jsDelivr) online é buscado e guardado", [(await W.fetch(py)).body, (await W.caches.match(py)).body], ["net:" + py, "net:" + py]);
W.setOnline(false);
eq("sw: Python offline vem do cache (curso roda sem internet depois da 1ª vez)", (await W.fetch(py)).body, "net:" + py);
eq("sw: POST não é interceptado", await W.fetch("http://site/index.html", { method: "POST", mode: "navigate" }), "nao-tratado");
eq("sw: outro domínio (YouTube) não é interceptado", await W.fetch("https://www.youtube.com/watch?v=31llNGKWDdo", { mode: "navigate" }), "nao-tratado");

console.log(fails ? `\n${fails} FALHA(S)` : "\nTodos os testes passaram.");
process.exit(fails ? 1 : 0);
