// Gera as aulas finais em lessons/ a partir de fonte/*.html, embutindo estilo e script compartilhados.
// Motivo: cada aula vira um arquivo único que funciona em qualquer navegador ou painel, sem depender de caminhos.
// Uso (na pasta do curso): node build.mjs
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { AULAS, META } from "./conteudo/index.mjs";
import { renderAula, renderRecuperacao, idModulo } from "./conteudo/modelo.mjs";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
// Texturas de fundo geradas por código (circuitos, rede neural, colunas de binário).
// O CSS fonte usa os marcadores __CIRCUIT__, __NEURAL__ e __BINARY__, trocados por data-URIs de SVG.
function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const BRICK = "224,90,38";
const uri = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

function circuitSvg() {
  const r = rng(7), S = 360, n = 4, cell = S / n, pts = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) pts.push([Math.round(j * cell + cell * (0.25 + r() * 0.5)), Math.round(i * cell + cell * (0.25 + r() * 0.5))]);
  let g = "";
  pts.forEach(([x, y], k) => {
    const col = k % n, row = Math.floor(k / n);
    const targets = [];
    if (col < n - 1 && r() < 0.8) targets.push(pts[k + 1]);
    if (row < n - 1 && r() < 0.7) targets.push(pts[k + n]);
    targets.forEach(([x2, y2]) => {
      const mx = x + Math.round((x2 - x) * 0.5);
      g += `<path d="M${x} ${y}H${mx}L${mx + Math.sign(y2 - y) * Math.min(18, Math.abs(y2 - y))} ${y + Math.sign(y2 - y) * Math.min(18, Math.abs(y2 - y))}V${y2 - Math.sign(y2 - y) * 0}H${x2}" fill="none" stroke="rgba(${BRICK},.07)" stroke-width="1"/>`;
    });
    g += r() < 0.5
      ? `<circle cx="${x}" cy="${y}" r="3.5" fill="none" stroke="rgba(${BRICK},.14)"/>`
      : `<rect x="${x - 2.5}" y="${y - 2.5}" width="5" height="5" fill="rgba(${BRICK},.12)"/>`;
  });
  return uri(`<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">${g}</svg>`);
}
function neuralSvg() {
  const W = 520, H = 420, layers = [4, 6, 6, 3], xs = [50, 190, 330, 470];
  const nodes = layers.map((c, li) => Array.from({ length: c }, (_, i) => [xs[li], Math.round((H / (c + 1)) * (i + 1))]));
  let g = "";
  for (let l = 0; l < nodes.length - 1; l++) nodes[l].forEach(a => nodes[l + 1].forEach(b => { g += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="rgba(${BRICK},.04)"/>`; }));
  nodes.flat().forEach(([x, y]) => { g += `<circle cx="${x}" cy="${y}" r="3" fill="rgba(${BRICK},.1)"/>`; });
  return uri(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${g}</svg>`);
}
function binarySvg() {
  const r = rng(21), W = 560, H = 720, glyphs = "01010101{}<>/;=01";
  let g = "";
  for (let c = 0; c < 10; c++) {
    const x = 20 + c * 56 + Math.round(r() * 14), len = 8 + Math.floor(r() * 18), y0 = Math.round(r() * 200);
    let col = "";
    for (let i = 0; i < len; i++) col += `<tspan x="${x}" dy="${i ? 18 : 0}">${glyphs[Math.floor(r() * glyphs.length)].replace("<", "&lt;").replace(">", "&gt;")}</tspan>`;
    g += `<text y="${y0}" font-family="monospace" font-size="13" fill="rgba(${BRICK},${(0.05 + r() * 0.04).toFixed(3)})">${col}</text>`;
  }
  return uri(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${g}</svg>`);
}
const css = readFileSync(join(root, "assets", "estilo.css"), "utf8")
  .replaceAll("__CIRCUIT__", () => circuitSvg())
  .replaceAll("__NEURAL__", () => neuralSvg())
  .replaceAll("__BINARY__", () => binarySvg());
const readJs = (n) => readFileSync(join(root, "assets", n + ".js"), "utf8");
mkdirSync(join(root, "lessons"), { recursive: true });

// Guarda de entrada (assets/guarda.js): em páginas de aula, abrir o arquivo leva ao painel; recarregar e links do curso não.
const guard = (f) => f === "index.html" ? "" : `<script>
${readJs("guarda").replaceAll("__HOME__", JSON.stringify("../index.html"))}
</script>
`;

// PWA "KNICode": metatags no <head> e registro do service worker no fim da página.
// O manifesto (manifest.webmanifest) e o service worker (sw.js) são arquivos próprios: o navegador não aceita nenhum dos dois embutido na página.
const pwaHead = (f) => { const p = f === "index.html" ? "" : "../"; return `<link rel="manifest" href="${p}manifest.webmanifest">
<meta name="application-name" content="KNICode">
<meta name="apple-mobile-web-app-title" content="KNICode">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="theme-color" content="#121214">
<link rel="icon" href="${p}icon.png">
<link rel="apple-touch-icon" href="${p}apple-touch-icon.png">
`; };
const pwaTail = (f) => `<script>if("serviceWorker"in navigator&&/^https?:$/.test(location.protocol)){addEventListener("load",function(){navigator.serviceWorker.register("${f === "index.html" ? "" : "../"}sw.js").catch(function(){})})}</script>\n`;

// Teclado do celular: todo textarea/input de texto recebe autocapitalize, autocorrect, spellcheck e autocomplete desligados
const MOBILE = [["autocapitalize", "none"], ["autocorrect", "off"], ["spellcheck", "false"], ["autocomplete", "off"]];
const addMobileAttrs = (src) => src.replace(/<(textarea|input)\b([^>]*)>/g, (m, tag, attrs) => {
  if (/\btype\s*=\s*["']?(checkbox|radio|button|submit|hidden)/i.test(attrs)) return m;
  const extra = MOBILE.filter(([n]) => !new RegExp("\\b" + n + "\\s*=", "i").test(attrs)).map(([n, v]) => ` ${n}="${v}"`).join("");
  return `<${tag}${attrs}${extra}>`;
});

// Conteúdo das aulas (conteudo/): o motor de progresso precisa só dos conceitos, dos exercícios finais e da lista de aulas.
const req = createRequire(import.meta.url);
{
  const conceitos = {}, finais = {};
  for (const a of AULAS) {
    const m = idModulo(a.modulo); conceitos[m] = conceitos[m] || [];
    for (const [id, name] of a.conceitos || []) if (!conceitos[m].some((c) => c.id === id)) conceitos[m].push({ id, name });
  }
  for (const [n, mt] of Object.entries(META)) finais[idModulo(+n)] = [mt.final, mt.transfer];
  const aulas = AULAS.map((a) => ({ id: a.id, n: a.n, module: idModulo(a.modulo), file: "lessons/" + a.arquivo, recovery: "lessons/recuperacao-" + a.id + ".html", titulo: a.titulo }));
  writeFileSync(join(root, "assets", "conteudo.js"), "/* GERADO por build.mjs a partir de conteudo/. Não editar à mão. */\n(typeof window !== \"undefined\" ? window : globalThis).KNI_CONTEUDO = " + JSON.stringify({ conceitos, finais, aulas }) + ";\n");
  req("./assets/conteudo.js");
}

// Painel e matriz curricular saem do mesmo currículo (assets/curso.js): uma fonte só, sem risco de ficarem diferentes.
const { COURSE, CURRICULO, PARTES, rotulo } = req("./assets/curso.js");
const pad2 = (n) => String(n).padStart(2, "0");
const tempo = (m) => [m.aulas ? `${m.aulas} aulas de ~30 min` : null, m.h1 ? (m.aulas ? `+ ${m.h1} h` : `${m.h1} sessões de 1 h`) : null].filter(Boolean);
const painelModulos = () => PARTES.map((parte, pi) => {
  const cards = CURRICULO.map((m, i) => ({ m, i })).filter(x => x.m.parte === pi).map(({ m, i }) => {
    const meta = [...tempo(m).map(t => `<span>${t}</span>`), m.verificar ? '<span class="conf">fonte oficial a conferir</span>' : ""].join("");
    const aulasMod = COURSE.lessons.filter((l) => l.module === idModulo(i + 1));
    const cls = "open", st = rotulo(cls, aulasMod.length > 0);   // nenhum módulo é bloqueado; o progresso real é desenhado pelo curso.js
    const go = aulasMod.length ? `\n        <a class="go" href="${aulasMod[0].file}">▶ continuar: aula 1</a>` : "";
    return `    <article class="mod ${cls}">
      <div class="mod-bar"><i></i><i></i><i></i><span>modulo_${pad2(i + 1)}.${m.ext}</span><b class="st ${cls}">${st}</b></div>
      <div class="mod-body"><h3>${pad2(i + 1)} · ${m.titulo}</h3><p>${m.desc}</p>
        <div class="meta">${meta}</div>${go}</div>
    </article>`;
  }).join("\n");
  return `  <h2 class="parte">Parte ${pi + 1} · ${parte}</h2>\n  <div class="mods">\n${cards}\n  </div>`;
}).join("\n\n");
writeFileSync(join(root, "CURRICULO.md"), `# Matriz curricular do KNICode

Gerado pelo build a partir de \`assets/curso.js\`. Não editar à mão: para mudar um módulo, edite o currículo e rode \`node build.mjs\`.

A trilha é **aberta**: não há limite de módulos. Ferramentas marcadas com "conferir" têm conteúdo que muda com frequência; antes de cada aula, ele é confirmado na documentação oficial (veja \`RESOURCES.md\`).

${PARTES.map((parte, pi) => `## Parte ${pi + 1}: ${parte}\n\n` + CURRICULO.map((m, i) => ({ m, i })).filter(x => x.m.parte === pi).map(({ m, i }) =>
  `### Módulo ${pad2(i + 1)}: ${m.titulo}\n\n${m.desc}\n\n- **Tempo:** ${tempo(m).join(" ")}\n- **Exercício:** ${m.exercicio}\n- **Ao final consegue:** ${m.criterio}${COURSE.lessons.filter((l) => l.module === idModulo(i + 1)).length ? `\n- **Aulas prontas (${COURSE.lessons.filter((l) => l.module === idModulo(i + 1)).length} de ${m.aulas || "?"}):** ` + COURSE.lessons.filter((l) => l.module === idModulo(i + 1)).map((l) => `${l.n}. ${l.titulo}`).join("; ") : ""}${m.verificar ? "\n- **Atenção:** conferir a documentação oficial antes das aulas." : ""}\n`).join("\n")).join("\n")}`);
console.log("ok CURRICULO.md,", CURRICULO.length, "módulos");

const fontes = readdirSync(join(root, "fonte")).filter((n) => n.endsWith(".html")).map((f) => ({ f, src: readFileSync(join(root, "fonte", f), "utf8") }));
AULAS.forEach((a, i) => {
  if (a.manual) return;
  const ctx = { modulo: CURRICULO[a.modulo - 1], anterior: AULAS[i - 1], proxima: AULAS[i + 1] };
  fontes.push({ f: a.arquivo, src: renderAula(a, ctx) }, { f: "recuperacao-" + a.id + ".html", src: renderRecuperacao(a, ctx) });
});
const built = [];
for (const { f, src } of fontes) {
  const html = addMobileAttrs(src.replace("<!--MODULOS-->", () => painelModulos()))
    .replace('<link rel="stylesheet" href="../assets/estilo.css">', () => guard(f) + pwaHead(f) + `<style>\n${css}\n</style>`)
    .replace(/<script src="\.\.\/assets\/([\w-]+)\.js"><\/script>/g, (_, n) => (n === "curso" ? ["conteudo", "verifica", "curso"] : [n]).map((x) => `<script>\n${readJs(x)}\n</script>`).join("\n"))
    .replace("</body>", () => pwaTail(f) + "</body>");
  // O painel inicial vai para a raiz do curso; as aulas, para lessons/
  const rel = f === "index.html" ? "index.html" : `lessons/${f}`;
  writeFileSync(join(root, rel), html);
  built.push({ rel, html });
  console.log("ok", f);
}

// Service worker: guarda o curso no aparelho (funciona offline). A versão muda sozinha quando qualquer página muda.
const version = createHash("sha1").update(built.map(b => b.rel + b.html).join("\n")).digest("hex").slice(0, 10);
const precache = ["./", "manifest.webmanifest", "icon.png", "icon-192.png", "icon-maskable-512.png", "apple-touch-icon.png", ...built.map(b => b.rel)];
writeFileSync(join(root, "sw.js"), readFileSync(join(root, "assets", "sw-modelo.js"), "utf8")
  .replaceAll("__VERSION__", version).replaceAll("__LISTA__", JSON.stringify(precache)));
console.log("ok sw.js", version);
