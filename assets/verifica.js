/* Verificação de exercícios de Python. O MESMO código roda no navegador (aula.js) e nos testes em Node (test-python.mjs),
   então o que os testes provam é exatamente o que o aluno vai ver.
   Um exercício tem uma "spec": { esperado: [linhas da saída], testes: [[expressão, "repr esperado"]], entradas: [...], dica, ok } */
(function (root) {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const cod = (s) => `<code>${esc(s)}</code>`;

  /* O input() desta tela lê de uma lista, como se o aluno digitasse; a pergunta aparece na saída, como num terminal. */
  function preludioEntradas(entradas) {
    return `__ent = iter(${JSON.stringify((entradas || []).map(String))})
def input(prompt=""):
    try:
        v = next(__ent)
    except StopIteration:
        raise EOFError("o programa pediu mais dados do que os fornecidos; digite os valores na caixa de entradas")
    print(str(prompt) + v)
    return v
`;
  }

  /* Vigia: interrompe o programa depois de muitos passos, para um laço sem fim não travar a página (nem o teste). */
  function preludioVigia() {
    return "import sys\n__passos = [0]\ndef __vigia(frame, event, arg):\n    __passos[0] += 1\n    if __passos[0] > 400000:\n        sys.settrace(None)\n        raise RuntimeError('o programa rodou por tempo demais; pode haver um laço sem fim')\n    return __vigia\nsys.settrace(__vigia)\n";
  }

  /* Avalia cada expressão do teste no mesmo ambiente do código do aluno e compara o repr() com o esperado. */
  function preludioTestes(testes) {
    return `import json as __json
__res = []
for __expr, __esp in __json.loads(${JSON.stringify(JSON.stringify(testes))}):
    try:
        __v = eval(__expr)
        __res.append([__expr, repr(__v), __esp, repr(__v) == __esp])
    except Exception as __e:
        __res.append([__expr, "erro " + type(__e).__name__ + ": " + str(__e), __esp, False])
__json.dumps(__res)
`;
  }

  /* Executa o código do aluno com uma instância do Pyodide (navegador ou Node). Devolve saída, erro, linha do erro e resultado dos testes. */
  async function executar(py, code, opt) {
    opt = opt || {};
    const out = [];
    py.setStdout({ batched: (s) => out.push(s) });
    py.setStderr({ batched: (s) => out.push(s) });
    const g = py.globals.get("dict")();
    let err = null, linha = null, testes = null;
    const falha = (e) => {
      const m = String((e && e.message) || e).trim(), ls = m.split("\n").filter(Boolean);
      err = ls[ls.length - 1];
      const ln = [...m.matchAll(/<exec>[^\n]*?line (\d+)/g)];
      if (ln.length) linha = +ln[ln.length - 1][1];
    };
    try { py.runPython(preludioEntradas(opt.entradas), { globals: g }); py.runPython(preludioVigia(), { globals: g }); } catch (e) { falha(e); }
    if (!err) try { py.runPython(code, { globals: g }); } catch (e) { falha(e); }
    if (!err && opt.testes && opt.testes.length) try { testes = JSON.parse(py.runPython(preludioTestes(opt.testes), { globals: g })); } catch (e) { falha(e); }
    try { py.runPython("import sys\nsys.settrace(None)"); } catch (e) { /* sem rastreio ativo */ }
    g.destroy();
    return { out, err, linha, testes };
  }

  const ERROS = {
    SyntaxError: "o Python não entendeu como a linha foi escrita. Procure aspas, parênteses ou dois-pontos faltando.",
    IndentationError: "a indentação (os espaços no começo da linha) está errada. As linhas dentro de um bloco usam 4 espaços.",
    TabError: "há mistura de espaços e tabulações no começo das linhas. Use só espaços.",
    NameError: "você usou um nome que o Python não conhece. Confira se escreveu igual (maiúsculas e minúsculas contam!) e se criou a variável antes de usá-la.",
    UnboundLocalError: "você usou uma variável de dentro da função antes de dar um valor a ela.",
    TypeError: "você misturou tipos que não combinam, como texto com número. Confira se precisa converter com int(), float() ou str().",
    ValueError: "o valor não pôde ser convertido, ou não faz sentido para essa operação.",
    ZeroDivisionError: "houve uma divisão por zero. Confira o divisor.",
    IndexError: "você pediu uma posição que não existe na lista. A primeira posição é a 0.",
    KeyError: "você pediu uma chave que não existe no dicionário.",
    AttributeError: "esse objeto não tem esse recurso. Confira o nome do método.",
    EOFError: "o programa pediu mais dados (input) do que os fornecidos.",
    AssertionError: "uma verificação (assert) falhou: o resultado não foi o esperado.",
    RuntimeError: "o programa rodou por tempo demais, provavelmente por um laço sem fim: confira se a condição do while muda a cada volta.",
    RecursionError: "a função chamou a si mesma sem parar.",
  };
  function explicarErro(err) {
    const tipo = String(err || "").split(":")[0].trim();
    return ERROS[tipo] || "";
  }

  const normaliza = (out) => {
    const l = (out || []).map((s) => String(s).replace(/\s+$/, ""));
    while (l.length && l[l.length - 1] === "") l.pop();
    return l;
  };
  const semAcento = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "");

  /* Decide se o resultado passou na spec e monta o feedback (HTML) para o aluno. */
  function avaliar(res, spec) {
    spec = spec || {};
    const dica = spec.dica ? ` <br><i>Dica:</i> ${esc(spec.dica)}` : "";
    if (res.err) {
      const onde = res.linha ? ` (na linha ${res.linha} do seu código)` : "";
      const em = explicarErro(res.err);
      return { ok: false, msg: `O Python parou com um erro${onde}: <b>${esc(res.err)}</b>.${em ? " Em português: " + esc(em) : ""}${dica}` };
    }
    const problemas = [];
    if (spec.esperado) {
      const out = normaliza(res.out), want = spec.esperado.map((s) => String(s).replace(/\s+$/, ""));
      if (JSON.stringify(out) !== JSON.stringify(want)) {
        if (!out.length) problemas.push("Nada apareceu na tela. Use " + cod('print(...)') + " para mostrar o resultado.");
        else if (out.length !== want.length) problemas.push(`Apareceram ${out.length} linha(s); eram esperadas ${want.length}. Apareceu: ${cod(out.join(" | "))}. Esperado: ${cod(want.join(" | "))}.`);
        else if (JSON.stringify([...out].sort()) === JSON.stringify([...want].sort())) problemas.push("As linhas certas apareceram, mas em <b>ordem trocada</b>. O computador segue a ordem em que você escreveu.");
        else {
          const i = out.findIndex((s, k) => s !== want[k]);
          let d = "";
          if (out[i].toLowerCase() === want[i].toLowerCase()) d = " Confira as <b>maiúsculas e minúsculas</b>: o Python diferencia “A” de “a”.";
          else if (semAcento(out[i]) === semAcento(want[i])) d = " Confira os <b>acentos</b>.";
          else if (out[i].replace(/\s+/g, "") === want[i].replace(/\s+/g, "")) d = " Confira os <b>espaços</b>.";
          problemas.push(`Na linha ${i + 1} apareceu ${cod(out[i])}, mas o esperado era ${cod(want[i])}.${d}`);
        }
      }
    }
    if (spec.testes && spec.testes.length) {
      const t = res.testes || [];
      const falhos = t.filter((x) => !x[3]);
      if (falhos.length) problemas.push(`Falhou em ${falhos.length} de ${t.length} teste(s):<br>` + falhos.slice(0, 3).map((x) => `${cod(x[0])} devolveu ${cod(x[1])}, esperado ${cod(x[2])}`).join("<br>") + (falhos.length > 3 ? "<br>…" : ""));
    }
    if (problemas.length) return { ok: false, msg: problemas.join("<br>") + dica };
    return { ok: true, msg: spec.ok || "<b>Passou.</b> O resultado é exatamente o esperado." };
  }

  /* Um exercício pode ser testado com vários cenários de entrada, cada um com sua saída esperada (essencial para provar um if). */
  async function executarCenarios(py, code, spec) {
    const rs = [];
    for (const c of spec.cenarios) rs.push(await executar(py, code, { entradas: c.entradas, testes: rs.length === 0 ? spec.testes : null }));
    return rs;
  }
  function avaliarCenarios(rs, spec) {
    for (let i = 0; i < spec.cenarios.length; i++) {
      const c = spec.cenarios[i];
      const av = avaliar(rs[i], { esperado: c.esperado, testes: i === 0 ? spec.testes : undefined });
      if (!av.ok) return { ok: false, msg: ((c.entradas || []).length ? "Com as entradas " + cod(c.entradas.join(" · ")) + ": " : "") + av.msg };
    }
    return { ok: true, msg: spec.ok || "<b>Passou nos " + spec.cenarios.length + " cenários.</b> O programa decide certo em todos." };
  }

  const api = { executarCenarios, avaliarCenarios, preludioEntradas, preludioTestes, executar, avaliar, explicarErro, normaliza };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Verifica = api;
})(typeof window !== "undefined" ? window : globalThis);
