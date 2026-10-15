/* Service worker do KNICode. O build (build.mjs) preenche a versão e a lista de arquivos abaixo e grava o resultado em sw.js na raiz.
   Papel: guardar o curso no aparelho para abrir offline. Não guarda dados do aluno (o progresso fica no localStorage da página). */
const VERSION = "184fd8eae8";
const CORE = "knicode-core-" + VERSION;      // páginas e ícones do curso; recriado a cada versão nova
const EXT = "knicode-ext-v1";                // Python (Pyodide) e fontes, vindos de CDN; sobrevive às versões
const PRECACHE = ["./","manifest.webmanifest","icon.png","icon-192.png","icon-maskable-512.png","apple-touch-icon.png","lessons/0001-o-computador-segue-instrucoes.html","index.html","lessons/recuperacao-0001.html","lessons/0002-variaveis.html","lessons/recuperacao-0002.html","lessons/0003-tipos.html","lessons/recuperacao-0003.html","lessons/0004-operadores.html","lessons/recuperacao-0004.html","lessons/0005-entrada.html","lessons/recuperacao-0005.html","lessons/0006-formatacao.html","lessons/recuperacao-0006.html","lessons/0007-erros-e-comentarios.html","lessons/recuperacao-0007.html","lessons/0008-mini-projeto.html","lessons/recuperacao-0008.html","lessons/0009-comparacoes.html","lessons/recuperacao-0009.html","lessons/0010-if.html","lessons/recuperacao-0010.html","lessons/0011-else.html","lessons/recuperacao-0011.html","lessons/0012-elif.html","lessons/recuperacao-0012.html","lessons/0013-logica.html","lessons/recuperacao-0013.html","lessons/0014-limites.html","lessons/recuperacao-0014.html","lessons/0015-validacao.html","lessons/recuperacao-0015.html","lessons/0016-mini-projeto.html","lessons/recuperacao-0016.html","lessons/0017-for.html","lessons/recuperacao-0017.html","lessons/0018-range-passos.html","lessons/recuperacao-0018.html","lessons/0019-acumuladores.html","lessons/recuperacao-0019.html","lessons/0020-while.html","lessons/recuperacao-0020.html","lessons/0021-break-continue.html","lessons/recuperacao-0021.html","lessons/0022-perguntar-ate-acertar.html","lessons/recuperacao-0022.html","lessons/0023-padroes.html","lessons/recuperacao-0023.html","lessons/0024-mini-projeto.html","lessons/recuperacao-0024.html","lessons/0025-def.html","lessons/recuperacao-0025.html","lessons/0026-parametros.html","lessons/recuperacao-0026.html","lessons/0027-return.html","lessons/recuperacao-0027.html","lessons/0028-padrao-nomeados.html","lessons/recuperacao-0028.html","lessons/0029-funcoes-que-decidem.html","lessons/recuperacao-0029.html","lessons/0030-escopo.html","lessons/recuperacao-0030.html","lessons/0031-composicao.html","lessons/recuperacao-0031.html","lessons/0032-mini-projeto.html","lessons/recuperacao-0032.html","lessons/0033-listas.html","lessons/recuperacao-0033.html","lessons/0034-mudando-listas.html","lessons/recuperacao-0034.html","lessons/0035-percorrer-listas.html","lessons/recuperacao-0035.html","lessons/0036-ordenar-fatias.html","lessons/recuperacao-0036.html","lessons/0037-dicionarios.html","lessons/recuperacao-0037.html","lessons/0038-mudando-dicionarios.html","lessons/recuperacao-0038.html","lessons/0039-percorrer-dicionarios.html","lessons/recuperacao-0039.html","lessons/0040-lista-de-dicionarios.html","lessons/recuperacao-0040.html","lessons/0041-filtrar-resumir.html","lessons/recuperacao-0041.html","lessons/0042-mini-projeto.html","lessons/recuperacao-0042.html","lessons/0043-ler-o-erro.html","lessons/recuperacao-0043.html","lessons/0044-tipos-de-erro.html","lessons/recuperacao-0044.html","lessons/0045-depurar-com-print.html","lessons/recuperacao-0045.html","lessons/0046-testes-com-assert.html","lessons/recuperacao-0046.html","lessons/0047-casos-de-teste.html","lessons/recuperacao-0047.html","lessons/0048-try-except.html","lessons/recuperacao-0048.html","lessons/0049-conferir-codigo-da-ia.html","lessons/recuperacao-0049.html","lessons/0050-mini-projeto.html","lessons/recuperacao-0050.html","lessons/0051-quadro-kanban.html","lessons/recuperacao-0051.html","lessons/0052-backlog.html","lessons/recuperacao-0052.html","lessons/0053-priorizar.html","lessons/recuperacao-0053.html","lessons/0054-entregas-pequenas-mvp.html","lessons/recuperacao-0054.html","lessons/0055-ciclos-curtos.html","lessons/recuperacao-0055.html","lessons/0056-definicao-de-pronto.html","lessons/recuperacao-0056.html","lessons/0057-retrospectiva.html","lessons/recuperacao-0057.html","lessons/0058-mini-projeto.html","lessons/recuperacao-0058.html","lessons/0059-problema-e-usuario.html","lessons/recuperacao-0059.html","lessons/0060-requisitos.html","lessons/recuperacao-0060.html","lessons/0061-historias-de-usuario.html","lessons/recuperacao-0061.html","lessons/0062-criterios-de-aceite.html","lessons/recuperacao-0062.html","lessons/0063-aceite-vira-teste.html","lessons/recuperacao-0063.html","lessons/0064-escopo.html","lessons/recuperacao-0064.html","lessons/0065-riscos-e-dados.html","lessons/recuperacao-0065.html","lessons/0066-mini-projeto.html","lessons/recuperacao-0066.html"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CORE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k.startsWith("knicode-core-") && k !== CORE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    if (req.mode === "navigate") {
      // Páginas: rede primeiro (conteúdo novo quando online); sem rede, usa a cópia guardada.
      e.respondWith(
        fetch(req)
          .then(res => { const cp = res.clone(); caches.open(CORE).then(c => c.put(req, cp)); return res; })
          .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("index.html")))
      );
      return;
    }
    // Ícones e manifesto: cópia guardada primeiro.
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const cp = res.clone(); caches.open(CORE).then(c => c.put(req, cp)); return res; })));
    return;
  }

  // Python no navegador (jsDelivr) e fontes (Google Fonts): guarda na primeira vez e reutiliza; atualiza em segundo plano.
  if (/(^|\.)jsdelivr\.net$|^fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(EXT).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
  }
});
