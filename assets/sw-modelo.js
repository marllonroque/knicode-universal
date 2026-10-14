/* Service worker do KNICode. O build (build.mjs) preenche a versão e a lista de arquivos abaixo e grava o resultado em sw.js na raiz.
   Papel: guardar o curso no aparelho para abrir offline. Não guarda dados do aluno (o progresso fica no localStorage da página). */
const VERSION = "__VERSION__";
const CORE = "knicode-core-" + VERSION;      // páginas e ícones do curso; recriado a cada versão nova
const EXT = "knicode-ext-v1";                // Python (Pyodide) e fontes, vindos de CDN; sobrevive às versões
const PRECACHE = __LISTA__;

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
