// Teste do conteúdo das aulas: EXECUTA o Python de todos os exercícios com o mesmo código de verificação que roda no navegador.
// Uso: npm install   (uma vez, instala o Pyodide só para testes)   e depois   node test-conteudo.mjs
import { createRequire } from "node:module";
import { readdirSync, readFileSync } from "node:fs";
import { renderAula } from "./conteudo/modelo.mjs";
import { AULAS, META } from "./conteudo/index.mjs";

let loadPyodide;
try { ({ loadPyodide } = await import("pyodide")); } catch { console.error("Pyodide não instalado. Rode: npm install"); process.exit(2); }
const require = createRequire(import.meta.url);
const V = require("./assets/verifica.js");
const { CURRICULO, conferirResposta } = require("./assets/curso.js");
const py = await loadPyodide();

let falhas = 0, verificacoes = 0;
const checa = (cond, msg) => { verificacoes++; if (!cond) { falhas++; console.log("FALHA " + msg); } };
const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();
const tipoErro = (e) => String(e || "").split(":")[0].trim();
const spec = (s) => ({ ...(s.esperado ? { esperado: s.esperado } : {}), ...(s.cenarios ? { cenarios: s.cenarios } : {}), ...(s.testes ? { testes: s.testes } : {}) });
const rodar = (code, s) => V.executar(py, code, { entradas: s.entradas, testes: s.testes });
// avalia um código contra o exercício exatamente como o navegador faz (um cenário só ou vários)
const avalia = async (code, s) => {
  if (s.cenarios) return V.avaliarCenarios(await V.executarCenarios(py, code, spec(s)), spec(s));
  return V.avaliar(await rodar(code, s), spec(s));
};

// conceitos registrados por módulo (união dos conceitos declarados nas aulas do módulo)
const registro = {};
for (const a of AULAS) { registro[a.modulo] = registro[a.modulo] || new Set(); (a.conceitos || []).forEach(([id]) => registro[a.modulo].add(id)); }
const usados = (c) => (c ? (Array.isArray(c) ? c : [c]) : []);

for (const a of AULAS) {
  if (a.manual) continue;
  const rot = `aula ${a.id} (${a.slug})`;
  checa(a.titulo && a.resumo && a.objetivos?.length >= 3, `${rot}: título, resumo e 3 objetivos`);
  checa(a.secoes[0].tipo === "aquecimento", `${rot}: começa com aquecimento`);
  checa(a.secoes.at(-1).tipo === "fechar" && a.secoes.at(-2).tipo === "quiz", `${rot}: termina com quiz e fechamento`);
  checa(a.recuperacao?.length === 3, `${rot}: recuperação com 3 perguntas`);
  checa(a.semCodigo || a.secoes.some((s) => ["escrever", "corrigir"].includes(s.tipo)), `${rot}: tem exercício de código`);
  checa(a.secoes.some((s) => s.tipo === "aberta" && s.tag === "sec") || a.secoes.some((s) => s.tag === "sec"), `${rot}: tem pergunta de segurança/privacidade`);

  for (const [i, s] of a.secoes.entries()) {
    const onde = `${rot}, seção ${i + 1} (${s.tipo})`;
    for (const c of usados(s.conceito)) checa(registro[a.modulo].has(c) || [...Object.values(registro)].some((r) => r.has(c)), `${onde}: conceito desconhecido "${c}"`);
    if (s.tipo === "exemplo") {
      const r = await rodar(s.codigo.map((l) => l[0]).join("\n"), s);
      checa(!r.err, `${onde}: o código do exemplo dá erro: ${r.err}`);
    }
    if (s.tipo === "executar") {
      const r = await rodar(s.codigo, s);
      if (s.erroEsperado) checa(r.err && tipoErro(r.err) === s.erroEsperado, `${onde}: esperava ${s.erroEsperado}, veio ${r.err}`);
      else checa(!r.err, `${onde}: o código dá erro: ${r.err}`);
    }
    const itens = s.tipo === "prever" ? s.itens : s.tipo === "executar" && s.prever ? s.prever.itens : null;
    if (itens) for (const [j, it] of itens.entries()) {
      if (!it.codigo) { checa(it.porque && it.resposta, `${onde}, item ${j + 1}: item sem código precisa de resposta e explicação`); continue; }
      const r = await rodar(it.codigo, it);
      const resp = [].concat(it.resposta).map(String);
      checa(resp.every((x) => !x.includes("|")), `${onde}, item ${j + 1}: resposta contém "|"`);
      if (it.erro) checa(tipoErro(r.err) === it.erro, `${onde}, item ${j + 1}: esperava erro ${it.erro}, veio ${r.err || "nenhum"}`);
      else {
        checa(!r.err, `${onde}, item ${j + 1}: o código dá erro: ${r.err}`);
        const saida = V.normaliza(r.out), linha = it.linha !== undefined ? saida[it.linha] : saida.at(-1);
        checa(linha === resp[0], `${onde}, item ${j + 1}: a resposta "${resp[0]}" não é a saída real "${linha}" (saída: ${JSON.stringify(saida)})`);
      }
      checa(it.porque, `${onde}, item ${j + 1}: falta a explicação (porque)`);
    }
    if (s.tipo === "corrigir" || s.tipo === "escrever") {
      checa(s.esperado || s.testes || s.cenarios, `${onde}: sem esperado, testes nem cenários`);
      if (s.cenarios) checa(s.cenarios.length >= 2 && s.cenarios.every((c) => c.esperado?.length), `${onde}: use pelo menos 2 cenários, cada um com saída esperada`);
      checa(s.solucao, `${onde}: sem solução de referência`);
      checa(!(await avalia(s.codigo ?? s.inicial, s)).ok, `${onde}: o código INICIAL já passa (o exercício não exige nada)`);
      const av = await avalia(s.solucao, s);
      checa(av.ok, `${onde}: a SOLUÇÃO não passa: ${av.msg.replace(/<[^>]+>/g, "")}`);
      if (s.tipo === "corrigir") checa(s.dica, `${onde}: exercício de correção sem dica`);
      if (s.final) checa(s.dica, `${onde}: exercício final precisa ter dica opcional`);
    }
    if (s.tipo === "quiz") {
      checa(s.itens.length === 3, `${onde}: quiz com 3 perguntas`);
      for (const [j, q] of s.itens.entries()) {
        const L = q.opcoes.map((o) => o.length), razao = Math.max(...L) / Math.min(...L);
        checa(q.opcoes.length >= 3 && q.correta >= 0 && q.correta < q.opcoes.length, `${onde}, pergunta ${j + 1}: opções ou resposta inválidas`);
        checa(razao <= 1.5 && Math.max(...L) - Math.min(...L) <= 16, `${onde}, pergunta ${j + 1}: opções com tamanhos muito diferentes (${L.join("/")}), o que entrega a resposta`);
        checa(q.porque && q.conceito, `${onde}, pergunta ${j + 1}: falta porque ou conceito`);
      }
      checa(new Set(s.itens.map((q) => q.correta)).size >= 2, `${onde}: a resposta certa está sempre na mesma posição`);
    }
    if (["aberta", "descobrir", "aquecimento", "fechar"].includes(s.tipo)) checa(s.modelo || s.explicacao, `${onde}: falta o modelo/explicação`);
    if (s.tipo === "descobrir") {
      checa(s.dicas?.length === 2, `${onde}: descobrir precisa de 2 dicas progressivas`);
      checa(s.tabela || s.execucoes, `${onde}: descobrir precisa de tabela ou execuções`);
      // as execuções geram a tabela: cada linha é RODADA aqui, então a tabela mostrada ao aluno nunca mente
      if (s.execucoes) for (const [j, e] of s.execucoes.entries()) {
        const r = await rodar(`${e.prefixo || ""}\n${s.codigo}`, e);
        checa(!r.err && JSON.stringify(V.normaliza(r.out)) === JSON.stringify(e.saida), `${onde}, execução ${j + 1}: a saída real é ${JSON.stringify(V.normaliza(r.out))}, mas a tabela diz ${JSON.stringify(e.saida)}${r.err ? " (erro: " + r.err + ")" : ""}`);
      }
    }
  }

  // recuperação: o gabarito deve passar na própria correção; uma resposta vazia ou aleatória não pode passar
  const confere = (q, resp) => conferirResposta(resp, q);   // o mesmo corretor da página (assets/curso.js)
  for (const [j, q] of a.recuperacao.entries()) {
    checa(q.p && q.regex && q.modelo && q.conceito, `${rot}, recuperação ${j + 1}: campos faltando`);
    const padroes = q.regex + ";;" + (q.naoRegex || "");
    checa(!/\(\?<[=!]/.test(padroes), `${rot}, recuperação ${j + 1}: o padrão usa lookbehind, que não funciona em iPhones antigos`);
    checa(!/[\x00-\x08\x0b-\x1f]/.test(padroes), `${rot}, recuperação ${j + 1}: caractere de controle no padrão (provável \\b escrito com uma barra só)`);
    checa(!/[áàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]/.test(padroes), `${rot}, recuperação ${j + 1}: o padrão não deve ter acento (a resposta é comparada sem acento)`);
    checa(confere(q, q.modelo), `${rot}, recuperação ${j + 1}: o próprio gabarito não passa na correção`);
    checa(!confere(q, "não sei") && !confere(q, "banana azul"), `${rot}, recuperação ${j + 1}: a correção aceita qualquer resposta`);
  }
}

// sondas da recuperação (conteudo/sondas/modulo-NN.mjs): respostas certas, com outras palavras, devem passar; respostas erradas ou vagas devem falhar.
// Cada sonda: { aula: "0118", q: 2 (pergunta, a partir de 1), passa: [...], falha: [...] }.
let nSondas = 0;
{
  const dir = new URL("./conteudo/sondas/", import.meta.url);
  let arquivos = []; try { arquivos = readdirSync(dir).filter((n) => n.endsWith(".mjs")).sort(); } catch { /* sem sondas ainda */ }
  for (const f of arquivos) for (const s of (await import(new URL(f, dir))).default) {
    const q = AULAS.find((a) => a.id === s.aula)?.recuperacao?.[s.q - 1];
    checa(q, `sonda ${f}: aula ${s.aula}, pergunta ${s.q} não existe`);
    if (!q) continue;
    for (const r of s.passa || []) { nSondas++; checa(conferirResposta(r, q), `sonda ${s.aula} pergunta ${s.q}: a resposta certa deveria passar: "${r}"`); }
    for (const r of s.falha || []) { nSondas++; checa(!conferirResposta(r, q), `sonda ${s.aula} pergunta ${s.q}: a resposta errada ou vaga deveria FALHAR: "${r}"`); }
  }
}

// o tempo anunciado de cada aula é a soma dos tempos das suas seções (arredondada para o múltiplo de 5); a aula 1 é escrita à mão e o vídeo opcional não entra na conta
{
  const somaMin = (html) => [...html.matchAll(/<h2>([\s\S]*?)<\/h2>/g)].filter((m) => !/Vídeo opcional/.test(m[1])).reduce((t, m) => t + +((m[1].match(/class="mins">(\d+) min/) || [])[1] || 0), 0);
  const chipMin = (html) => +(html.match(/class="chip">(?:cerca de )?(\d+) minutos</) || [])[1];
  const arred5 = (n) => Math.max(5, Math.round(n / 5) * 5);
  for (const a of AULAS) {
    const html = a.manual ? readFileSync(new URL("./fonte/" + a.arquivo, import.meta.url), "utf8") : renderAula(a, { modulo: CURRICULO[a.modulo - 1], anterior: null, proxima: null });
    checa(chipMin(html) === arred5(somaMin(html)), `aula ${a.id}: o tempo anunciado (${chipMin(html)} min) deveria ser a soma dos tempos das seções (${somaMin(html)} min) arredondada para 5`);
  }
}

// o conteúdo declarado bate com a matriz curricular
const porModulo = {};
for (const a of AULAS) porModulo[a.modulo] = (porModulo[a.modulo] || 0) + 1;
for (const [m, n] of Object.entries(porModulo)) {
  const decl = CURRICULO[m - 1].aulas;
  checa(decl === n || decl === 0, `módulo ${m}: a matriz declara ${decl} aulas, mas há ${n} escritas`);
  checa(META[m] && META[m].final && META[m].transfer, `módulo ${m}: faltam o nome do exercício final e do de transferência`);
  const finais = AULAS.filter((a) => a.modulo === +m).flatMap((a) => (a.secoes || []).filter((s) => s.final || s.transfer));
  checa(finais.some((s) => s.final) && finais.some((s) => s.transfer), `módulo ${m}: falta um exercício marcado como final e um como transferência`);
}

console.log(`\n${AULAS.filter((a) => !a.manual).length} aulas verificadas, ${verificacoes} verificações${nSondas ? ` (incluindo ${nSondas} sondas da recuperação)` : ""}.`);
console.log(falhas ? `${falhas} FALHA(S)` : "Todas as verificações passaram: respostas previstas, soluções e correções funcionam de verdade.");
process.exit(falhas ? 1 : 0);
