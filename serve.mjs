// Servidor local para testar o curso como site/PWA (o service worker só funciona em localhost ou https).
// Uso (na pasta do curso): node serve.mjs   e abra http://localhost:5183/
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize, dirname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 5183;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".webmanifest": "application/manifest+json", ".png": "image/png", ".md": "text/plain; charset=utf-8" };

createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const file = normalize(join(root, p));
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end("proibido"); return; }
    if (!(await stat(file)).isFile()) throw new Error("não é arquivo");
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(await readFile(file));
  } catch { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("não encontrado"); }
}).listen(port, "127.0.0.1", () => console.log(`KNICode em http://localhost:${port}/`));
