// Renderizador de aulas: transforma o objeto de uma aula (conteudo/modulo-NN.mjs) na página interativa.
// O build embute estilo e scripts depois. Texto: `código` vira <code>, **negrito** vira <b>; todo o resto é escapado.
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (s) => esc(s).replace(/"/g, "&quot;");
export const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`([^`]+)`/g, "<code>$1</code>");
const pad2 = (n) => String(n).padStart(2, "0");
export const idModulo = (n) => "m" + pad2(n);

const TITULOS = { aquecimento: "Aquecimento", exemplo: "Veja funcionando", texto: "A ideia", executar: "Rode você mesmo", prever: "Preveja antes de rodar", descobrir: "Descubra o padrão", corrigir: "Conserte o erro", escrever: "Escreva o seu", aberta: "Pense e responda", quiz: "Quiz final", fechar: "Para fechar" };

export function renderAula(a, ctx) {
  const { modulo, anterior, proxima } = ctx, mid = idModulo(a.modulo);
  let ks = 0, num = 0;
  const key = () => `k${++ks}`;
  const lista = (s) => (s ? (Array.isArray(s) ? s : [s]) : null);
  const cattr = (s, nivel = "exec") => { const c = lista(s); return c ? ` data-concept="${c.join(",")}" data-level="${nivel}"` : ""; };

  const win = (arquivo, interior) => `<div class="win"><div class="win-bar"><i></i><i></i><i></i><span>${esc(arquivo)}</span></div>\n${interior}</div>`;

  const runner = (s) => {
    const spec = (s.esperado || s.testes || s.cenarios) ? { ...(s.esperado ? { esperado: s.esperado } : {}), ...(s.cenarios ? { cenarios: s.cenarios } : {}), ...(s.testes ? { testes: s.testes } : {}), ...(s.ok ? { ok: s.ok } : {}) } : null;
    const at = [`data-key="${key()}"`,
      spec ? `data-spec="${attr(JSON.stringify(spec))}"` : "",
      s.entradas ? `data-entradas="${attr(JSON.stringify(s.entradas))}"` : "",
      s.dica ? `data-dica="${attr(s.dica)}"` : "",
      s.erroEsperado ? `data-erro-esperado="${attr(s.erroEsperado)}"` : "",
      s.conceito ? cattr(s.conceito).trim() : "",
      s.final ? `data-module-final="${mid}"` : "", s.transfer ? `data-transfer="${mid}"` : ""].filter(Boolean).join(" ");
    return `  <div class="runner" ${at}>
    ${win(s.arquivo || "programa.py", `<textarea spellcheck="false">${esc(s.codigo ?? s.inicial)}</textarea>`)}
    <button class="run">${s.botao || (spec ? "Executar e conferir" : "Executar")}</button>${spec ? "" : '<button class="ghost reset">Restaurar</button>'}
    <div class="out">O resultado aparece aqui.</div>${spec ? '<div class="fb"></div>' : ""}
  </div>`;
  };

  const quest = (itens, { conceito, ok, final, transfer } = {}) => {
    const corpo = itens.map((it, i) => {
      const ans = (Array.isArray(it.resposta) ? it.resposta : [it.resposta]).map(String);
      const cod = it.codigo ? win(it.arquivo || "programa.py", `<pre class="hl">${esc(it.codigo)}</pre>`) + "\n    " : "";
      const ent = it.entradas ? `<p class="ent">Entradas digitadas: ${it.entradas.map((e) => `<code>${esc(e)}</code>`).join(", ")}</p>\n    ` : "";
      return `${cod}${ent}<div class="pred"><span>${inline(it.pergunta || "O que aparece na tela?")}</span><input class="q" data-answer="${attr(ans.join("|"))}" data-label="${attr(it.rotulo || "Item " + (i + 1))}" data-why="${attr(inline(it.porque || ""))}" placeholder="${attr(it.dica || "digite exatamente")}"></div>`;
    }).join("\n    ");
    return `  <div class="quest" data-key="${key()}"${cattr(conceito)}${final ? ` data-module-final="${mid}"` : ""}${transfer ? ` data-transfer="${mid}"` : ""} data-ok="${attr(ok || "Tudo certo. Você aplicou a regra em casos novos.")}">
    ${corpo}
    <button class="chk">Conferir</button><div class="fb"></div>
  </div>`;
  };

  const aberta = (s) => `${s.tag ? `  <div class="callout ${s.tag === "sec" ? "sec" : "term"}"><span class="tag">${s.tag === "sec" ? "Segurança e privacidade" : "Para pensar"}</span>${inline(s.texto)}</div>\n` : s.texto ? `  <p>${inline(s.texto)}</p>\n` : ""}  <p><strong>${inline(s.pergunta)}</strong></p>
  <div class="open" data-key="${key()}" data-min="${s.minimo || 25}"${cattr(s.conceito, "comp")}${s.final ? ` data-module-final="${mid}"` : ""}${s.transfer ? ` data-transfer="${mid}"` : ""}>
    <textarea class="ans" placeholder="${attr(s.dica || "Escreva com suas palavras...")}"></textarea>${s.dicas ? `
    <div class="hints">
${s.dicas.map((d, i) => `      <div class="hint callout warn"><span class="tag">Dica ${i + 1}</span>${inline(d)}</div>`).join("\n")}
      <button class="ghost nexthint">Preciso de uma dica</button>
    </div>` : ""}
    <button class="reg">${s.botao || "Registrar e comparar"}</button>
    <div class="fb"></div>
    <div class="callout model"><span class="tag">${s.rotuloModelo || "Para comparar"}</span>${inline(s.modelo)}</div>
  </div>`;

  const mcq = (it) => `  <div class="mcq" data-key="${key()}" data-correta="${it.correta}"${cattr(it.conceito)}>
    <p class="mcq-q">${inline(it.pergunta)}</p>
${it.opcoes.map((o) => `    <button type="button" class="opt">${inline(o)}</button>`).join("\n")}
    <div class="fb"></div><div class="porque">${inline(it.porque)}</div>
  </div>`;

  const R = {
    aquecimento: (s) => aberta({ ...s, minimo: s.minimo || 30, rotuloModelo: "Para comparar", botao: "Registrar" }),
    exemplo: (s) => `${s.texto ? `  <p>${inline(s.texto)}</p>\n` : ""}  ${win(s.arquivo || "programa.py", `<pre class="annot" data-key="${key()}">${s.codigo.map(([l, nota]) => `<span class="ln" data-note="${attr(inline(nota))}">${esc(l)}</span>`).join("")}</pre>
    <div class="annot-note"><em>Clique numa linha acima.</em></div>
  `)}${s.termos ? `\n  <div class="callout term"><span class="tag">Palavras novas</span>\n    <dl>\n${s.termos.map(([t, d]) => `      <dt>${inline(t)}</dt><dd>${inline(d)}</dd>`).join("\n")}\n    </dl>\n  </div>` : ""}`,
    texto: (s) => {
      const par = (s.blocos || []).map((b) => `  <p>${inline(b)}</p>`).join("\n");
      const tab = s.tabela ? `\n  <table>\n    <tr>${s.tabela.cab.map((c) => `<th>${inline(c)}</th>`).join("")}</tr>\n${s.tabela.linhas.map((l) => `    <tr>${l.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("\n")}\n  </table>` : "";
      const ter = s.termos ? `\n  <div class="callout term"><span class="tag">Palavras novas</span>\n    <dl>\n${s.termos.map(([t, d]) => `      <dt>${inline(t)}</dt><dd>${inline(d)}</dd>`).join("\n")}\n    </dl>\n  </div>` : "";
      const fon = s.fonte ? `\n  <p class="fonte">Fonte: ${inline(s.fonte)}</p>` : "";
      return par + tab + ter + fon;
    },
    executar: (s) => `${s.texto ? `  <p>${inline(s.texto)}</p>\n` : ""}${runner(s)}${s.prever ? `\n  <p><strong>${inline(s.prever.enunciado)}</strong></p>\n${quest(s.prever.itens, { conceito: s.prever.conceito })}` : ""}`,
    prever: (s) => `${s.texto ? `  <p>${inline(s.texto)}</p>\n` : ""}${quest(s.itens, { conceito: s.conceito, ok: s.ok, final: s.final, transfer: s.transfer })}`,
    descobrir: (s) => `${s.texto ? `  <p>${inline(s.texto)}</p>\n` : ""}${s.codigo ? `  ${win(s.arquivo || "programa.py", `<pre class="hl">${esc(s.codigo)}</pre>`)}\n` : ""}${(() => {
      // Tabela escrita à mão (tabela) ou gerada das execuções (execucoes); as execuções são rodadas nos testes, então a tabela nunca mente.
      const t = s.execucoes ? { cab: s.colunas || ["Valores", "O que aparece"], linhas: s.execucoes.map((e) => [e.rotulo ? e.rotulo : e.prefixo ? "`" + e.prefixo.split("\n").join("; ") + "`" : "Entradas: " + (e.entradas || []).map((x) => "`" + x + "`").join(" · "), e.saida.length ? e.saida.map((x) => "`" + x + "`").join(" · ") : "(nada aparece)"]) } : s.tabela;
      return `  <table>
    <tr>${t.cab.map((c) => `<th>${inline(c)}</th>`).join("")}</tr>
${t.linhas.map((l) => `    <tr>${l.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("\n")}
  </table>`;
    })()}
${aberta({ pergunta: s.pergunta, minimo: s.minimo || 15, conceito: s.conceito, dicas: s.dicas, modelo: s.explicacao, rotuloModelo: "Explicação", botao: "Registrar e ver a explicação" })}`,
    corrigir: (s) => `${s.texto ? `  <p>${inline(s.texto)}</p>\n` : ""}${runner(s)}`,
    escrever: (s) => `${s.texto ? `  <p>${inline(s.texto)}</p>\n` : ""}${runner(s)}`,
    aberta: (s) => aberta(s),
    quiz: (s) => `  <p>${inline(s.texto || "Sem voltar à aula: escolha a melhor resposta. Acertar de primeira conta como “sozinho”; errar antes conta como “com apoio”.")}</p>\n${s.itens.map(mcq).join("\n")}`,
    fechar: (s) => `${aberta({ ...s, minimo: s.minimo || 25, botao: "Registrar", rotuloModelo: "Resposta de referência" })}
  <div class="next"><b>Amanhã a aula começa sem consulta, com estas perguntas:</b> ${a.recuperacao.map((q, i) => `(${i + 1}) ${inline(q.p)}`).join(" ")} <a href="recuperacao-${a.id}.html">Abrir a recuperação</a> (2 de 3 libera a próxima aula).</div>`,
  };

  const cards = a.secoes.map((s) => {
    if (!R[s.tipo]) throw new Error(`aula ${a.id}: tipo de seção desconhecido: ${s.tipo}`);
    const n = s.tipo === "aquecimento" ? 0 : ++num;
    const min = s.minutos ?? { aquecimento: 3, texto: 4, exemplo: 3, executar: 4, prever: 4, descobrir: 5, corrigir: 4, escrever: 5, aberta: 3, quiz: 3, fechar: 2 }[s.tipo];
    return `<!-- ${n} -->
<section class="card">
  <h2><span class="num">${n}</span>${inline(s.titulo || TITULOS[s.tipo])} <span class="mins">${min} min</span></h2>
${R[s.tipo](s)}
</section>`;
  }).join("\n\n");

  const nav = [anterior ? `<a href="${anterior.arquivo}">← Aula anterior</a>` : "", proxima ? `<a href="${proxima.arquivo}">Próxima aula →</a>` : ""].filter(Boolean).join(" · ");
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Aula ${a.n}: ${esc(a.titulo)}</title>
<meta name="curso-aula" content="${a.id}">
<link rel="stylesheet" href="../assets/estilo.css">
</head>
<body>

<header class="hero"><div class="hero-in">
  <div class="crumb">Módulo ${a.modulo} · ${esc(modulo.titulo)} · Aula ${a.n}</div>
  <h1>${inline(a.titulo)}</h1>
  <p>${inline(a.resumo)}</p>
  <div class="chips"><span class="chip">${a.minutos || 25} minutos</span><span class="chip">Sem instalar nada</span><span class="chip">Você faz, o programa responde</span></div>
  <div class="goal"><b>Ao final desta aula você consegue:</b>
    <ul>
${a.objetivos.map((o) => `      <li>${inline(o)}</li>`).join("\n")}
    </ul>
  </div>${anterior ? `\n  <p class="meta-rec">Antes de começar, tente a <a href="recuperacao-${anterior.id}.html">recuperação da aula anterior</a>, sem consultar.</p>` : ""}
</div></header>

<main>

${cards}

<footer>
  <p><strong>Ficou alguma dúvida?</strong> Pergunte ao Claude (ou a quem te acompanha) qualquer coisa que ficou nebulosa, inclusive o “por quê?” de qualquer passo.</p>
  <p>${nav ? nav + " · " : ""}<a href="../index.html">Painel</a> · <a href="../PLANO.md">Método e regras</a> · <a href="../CURRICULO.md">Matriz curricular</a> · <a href="../RESOURCES.md">Recursos</a></p>
</footer>

</main>

<script src="../assets/curso.js"></script>
<script src="../assets/aula.js"></script>
</body>
</html>
`;
}

export function renderRecuperacao(a, ctx) {
  const { modulo } = ctx;
  const qs = a.recuperacao.map((q, i) => `    <div class="rq">
      <p><b>${i + 1}.</b> ${inline(q.p)}</p>
      <textarea class="ans" data-concept="${q.conceito}" data-regex="${attr(q.regex)}"${q.naoRegex ? ` data-not-regex="${attr(q.naoRegex)}"` : ""} data-model="${attr(q.modelo)}"></textarea>
    </div>`).join("\n");
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Recuperação da aula ${a.n}</title>
<meta name="curso-recuperacao" content="${a.id}">
<link rel="stylesheet" href="../assets/estilo.css">
</head>
<body>

<header class="hero"><div class="hero-in">
  <div class="crumb">Módulo ${a.modulo} · ${esc(modulo.titulo)} · Aula ${a.n} · Recuperação</div>
  <h1>Recuperação: o que ficou da aula ${a.n}</h1>
  <p>Responda sem consultar a aula, de memória. Não vale pesquisar. Acertando 2 de 3, a próxima aula é liberada.</p>
  <div class="chips"><span class="chip">3 perguntas</span><span class="chip">mínimo: 2 certas</span><span class="chip">sem consulta</span></div>
</div></header>

<main>
<section class="card">
  <h2><span class="num">?</span>Três perguntas <span class="mins">5 min</span></h2>
  <p>Escreva com suas palavras. A correção procura as ideias principais; se a sua resposta estava certa com outras palavras, você pode contestar depois e contar como certa.</p>

  <div class="recovery" data-lesson="${a.id}">
${qs}
    <button class="rq-check" type="button">Conferir</button>
    <button class="rq-submit" type="button">Registrar o resultado</button>
    <div class="rq-result"></div>
  </div>
</section>

<footer>
  <p>O resultado fica salvo neste navegador e atualiza o painel. A conferência por palavras-chave é um filtro simples: o que vale de verdade é você conseguir explicar com as suas palavras.</p>
  <p><a href="${a.arquivo}">Voltar à aula ${a.n}</a> · <a href="../index.html">Painel do curso</a></p>
</footer>
</main>

<script src="../assets/curso.js"></script>
<script src="../assets/aula.js"></script>
</body>
</html>
`;
}
