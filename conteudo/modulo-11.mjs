// Módulo 11: Vibe coding com responsabilidade (universal). Fio condutor: um analisador de log de pedidos de uma loja virtual,
// pedido à IA, lido linha a linha, testado e ajustado pelo aluno. Todos os dados são fictícios.
export const meta = {
  final: "Mini-projeto: ler, testar e ajustar o analisador de log gerado pela IA",
  transfer: "Somar despesas por categoria tratando linhas com defeito",
};
const aulas = [];
const FONTE_PROMPT = "documentação oficial da Anthropic, “Prompting best practices”, platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices";

// ---------- Aula 0083: o ciclo ----------
aulas.push({
  id: "0083", modulo: 11, n: 1, slug: "o-ciclo", titulo: "O ciclo: especificar, gerar, ler, testar, ajustar",
  resumo: "Pedir código a uma IA é rápido. Entregar algo que funciona exige um ciclo de cinco passos, e quatro deles são seus.",
  objetivos: ["Nomear os cinco passos do ciclo e dizer quem faz cada um.", "Explicar por que o código gerado ainda não está pronto.", "Usar um teste curto para pegar um defeito que parecia certo."],
  conceitos: [["vc_ciclo", "O ciclo de vibe coding"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você pediu a uma IA: “faça um programa que some os preços de um pedido”. Ela devolveu 12 linhas e o programa rodou sem nenhuma mensagem de erro. O que mais você faria antes de usar esse programa de verdade?", modelo: "Rodar sem erro **não prova** que o resultado está certo. Eu **leria** o código para entender o que ele faz e **testaria** com valores cujo resultado eu já sei (por exemplo, 10 + 5,50 = 15,50)." },
    { tipo: "texto", titulo: "Cinco passos, e a IA só faz um", blocos: [
      "“Vibe coding” é pedir o código à IA em linguagem do dia a dia e ir ajustando pelo resultado. Feito sem cuidado, vira aceitar qualquer coisa que “parece funcionar”. Feito **com responsabilidade**, segue um ciclo.",
      "A IA só faz o passo 2. Os outros quatro são seus. É você que sabe o que a loja precisa, e é você quem responde pelo programa depois.",
    ], tabela: { cab: ["Passo", "O que acontece", "Quem faz"], linhas: [["1. Especificar", "escrever o que o programa deve fazer, com exemplos", "você"], ["2. Gerar", "pedir o código à IA", "a IA"], ["3. Ler", "entender cada linha: o que faz e o que falta", "você"], ["4. Testar", "conferir com casos que você já sabe a resposta", "você"], ["5. Ajustar", "pedir uma mudança pequena e voltar ao passo 3", "você, com a IA"]] },
      termos: [["Vibe coding", "criar programas pedindo o código a uma IA e ajustando o resultado."], ["Especificação", "o texto que diz o que o programa deve fazer, com exemplos concretos de entrada e saída."], ["Ciclo", "uma sequência de passos que se repete até o resultado ficar bom."]] },
    { tipo: "exemplo", arquivo: "ciclo.py", texto: "Um mini-ciclo completo. As notas dizem em que passo cada linha entra.",
      codigo: [["# Especificação (minha): soma_pedido(precos) soma a lista; lista vazia dá 0", "O passo 1 é um comentário: o que eu quero, com um caso difícil (lista vazia)."], ["def soma_pedido(precos):", "Passo 2: este trecho é o que a IA geraria."], ["    total = 0", "Começa em zero, o que já resolve a lista vazia."], ["    for p in precos:", "Percorre cada preço da lista."], ["        total = total + p", "Acumula o preço no total."], ["    return total", "Devolve o total."], ["assert soma_pedido([10, 5.5]) == 15.5", "Passo 4: um teste meu, com resposta que eu calculei à mão."], ["assert soma_pedido([]) == 0", "O caso difícil da especificação também vira teste."], ["print(\"ciclo completo\")", "Só aparece se os dois testes passarem."]],
      termos: [["assert", "“afirmo que isto é verdade”: se for falso, o programa para com `AssertionError`."], ["Lista vazia", "uma lista sem nenhum item, `[]`."]] },
    { tipo: "executar", texto: "Rode a função e veja o resultado. Depois troque a lista por outra.", arquivo: "ciclo.py (pode editar)", codigo: `def soma_pedido(precos):
    total = 0
    for p in precos:
        total = total + p
    return total

print(soma_pedido([10, 5.5]))
print(soma_pedido([]))`,
      prever: { enunciado: "Antes de testar, preveja a última linha mostrada:", conceito: "vc_ciclo", itens: [
        { codigo: `def soma_pedido(precos):
    total = 0
    for p in precos:
        total = total + p
    return total
print(soma_pedido([2, 3, 4]))`, resposta: "9", porque: "2 + 3 + 4 = 9." },
        { codigo: `def soma_pedido(precos):
    return max(precos)
print(soma_pedido([2, 3, 4]))`, resposta: "4", porque: "Esta versão “gerada” devolve o maior preço, não a soma. Roda sem erro e está errada." }] } },
    { tipo: "descobrir", texto: "Uma IA gerou esta versão. Rode com três listas e compare com a soma que você faria de cabeça.", arquivo: "soma_gerada.py", codigo: `def soma_pedido(precos):
    return max(precos)

print(soma_pedido(lista))`,
      execucoes: [{ prefixo: "lista = [7]", saida: ["7"] }, { prefixo: "lista = [3, 4]", saida: ["4"] }, { prefixo: "lista = [1, 2, 3]", saida: ["3"] }], colunas: ["Lista", "O que aparece"],
      pergunta: "Com qual lista a função parece certa? O que isso ensina sobre testar com um caso só?", dicas: ["Some cada lista de cabeça e compare com a saída.", "Uma lista de um item só: soma e maior valor são iguais?"],
      explicacao: "Com `[7]` o resultado coincide (soma e maior valor são 7). Nas outras listas a função erra. Um teste só pode **esconder** o defeito; por isso o passo 4 usa **vários** casos, inclusive o difícil.", conceito: "vc_ciclo" },
    { tipo: "prever", texto: "Responda com uma palavra.", conceito: "vc_ciclo", itens: [
      { pergunta: "Qual passo vem logo depois de **gerar**?", rotulo: "Item 1", resposta: ["ler", "leitura"], porque: "Depois que a IA entrega, você lê o código antes de rodar e confiar." },
      { pergunta: "Se um teste falhar, qual passo você faz?", rotulo: "Item 2", resposta: ["ajustar", "ajuste"], porque: "Você pede uma mudança pequena e volta a ler e testar." },
      { pergunta: "Quem escreve a especificação: eu ou a IA?", rotulo: "Item 3", resposta: ["eu", "voce", "você"], porque: "Quem sabe o que a loja precisa é você; a IA só gera o código." }] },
    { tipo: "corrigir", texto: "A IA gerou `soma_pedido` com defeito, e o seu teste pegou. Conserte **a função** (não o teste).", arquivo: "gerado.py", dica: "Python tem a função `sum(...)` que soma uma lista; para a lista vazia ela devolve 0.", conceito: "vc_ciclo",
      codigo: `def soma_pedido(precos):
    return max(precos)

assert soma_pedido([10, 5.5]) == 15.5
assert soma_pedido([]) == 0
print("ciclo completo")`, esperado: ["ciclo completo"],
      solucao: `def soma_pedido(precos):
    return sum(precos)

assert soma_pedido([10, 5.5]) == 15.5
assert soma_pedido([]) == 0
print("ciclo completo")` },
    { tipo: "escrever", texto: "Faça o ciclo você mesmo: escreva `media_pedido(precos)`, que devolve a média dos preços. Pela especificação, uma lista vazia dá `0` (e não pode dar erro).", arquivo: "meu_programa.py",
      inicial: `# Especificação: media_pedido(precos) devolve a média; lista vazia dá 0
`, testes: [["media_pedido([10, 20])", "15.0"], ["media_pedido([5])", "5.0"], ["media_pedido([])", "0"]], dica: "Primeiro um `if len(precos) == 0:` que devolve 0; depois `sum(precos) / len(precos)`.", conceito: "vc_ciclo",
      solucao: `def media_pedido(precos):
    if len(precos) == 0:
        return 0
    return sum(precos) / len(precos)` },
    { tipo: "aberta", tag: "sec", titulo: "Pedir sem expor", texto: "Para “dar um exemplo realista”, alguém cola no pedido à IA uma planilha inteira de pedidos reais, com nomes e endereços de clientes.", pergunta: "Qual é o risco? Como pedir o mesmo código sem expor ninguém?", modelo: "A planilha tem **dados de pessoas** que não precisavam sair dali. Para pedir o código basta a **forma** dos dados: invente 3 linhas **fictícias** com o mesmo formato." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual é a ordem do ciclo?", opcoes: ["Especificar, gerar, ler, testar, ajustar", "Gerar, testar, ler, especificar, ajustar", "Ler, gerar, ajustar, testar, especificar", "Testar, ajustar, gerar, especificar, ler"], correta: 0, porque: "Primeiro você diz o que quer; depois gera, lê, testa e ajusta.", conceito: "vc_ciclo" },
      { pergunta: "Quando a IA entrega o código, o trabalho:", opcoes: ["Terminou: já pode ser usado", "Continua: falta ler e testar", "Terminou se rodou uma vez", "Terminou se não deu erro"], correta: 1, porque: "Rodar sem erro não prova que o resultado está certo.", conceito: "vc_ciclo" },
      { pergunta: "Quem escreve o que o programa deve fazer?", opcoes: ["A IA, depois de gerar", "O teste, quando falhar", "Eu, antes de pedir à IA", "Ninguém precisa escrever"], correta: 2, porque: "A especificação é sua e vem antes do código.", conceito: "vc_ciclo" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: quais são os cinco passos do ciclo e por que o código gerado não está “pronto” quando a IA entrega?", conceito: "vc_ciclo", modelo: "Especificar, gerar, ler, testar e ajustar. O código gerado pode **parecer certo e estar errado**: só a leitura e os testes feitos por mim provam que ele faz o que a especificação pede." },
  ],
  recuperacao: [
    { p: "Quais são os cinco passos do ciclo?", regex: "(especific);;(gera);;(ler|leia|leitura);;(testa);;(ajust)", modelo: "Especificar, gerar, ler, testar e ajustar.", conceito: "vc_ciclo" },
    { p: "Por que o código gerado não está pronto quando a IA entrega?", regex: "(test|ler|leitura|conferi|revis|verific)", modelo: "Porque pode parecer certo e estar errado; só ler e testar mostram se funciona.", conceito: "vc_ciclo" },
    { p: "Por que não colar dados reais de clientes no pedido à IA?", regex: "(dado|sensiv|privacid|vaz|expo|cliente)", modelo: "Porque expõe dados de pessoas; use dados fictícios com o mesmo formato.", conceito: "vc_ciclo" },
  ],
});

// ---------- Aula 0084: especificar ----------
aulas.push({
  id: "0084", modulo: 11, n: 2, slug: "especificar", titulo: "Especificar antes de pedir",
  resumo: "Um pedido vago volta como um código que adivinha. Cinco informações transformam o pedido numa especificação que a IA e você conseguem conferir.",
  semCodigo: true,
  objetivos: ["Listar as cinco partes de uma boa especificação.", "Reconhecer o que falta num pedido vago.", "Escrever uma especificação para uma ferramenta pequena."],
  conceitos: [["vc_spec", "Especificação clara"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você pede: “faça um programa que analise o log da minha loja”. Que decisões a IA terá de **adivinhar** para escrever o código?", modelo: "Ela terá de adivinhar o **formato** das linhas, **o que contar**, o que fazer com linhas **estranhas**, como mostrar o **resultado**... Cada palpite pode estar errado." },
    { tipo: "texto", titulo: "As cinco partes", blocos: [
      "A documentação oficial resume a regra de ouro: mostre o seu pedido a um colega que não conhece o assunto. Se ele ficaria confuso, a IA também fica. Quanto mais específico e explícito, melhor.",
      "Para um programa pequeno, uma boa especificação responde cinco perguntas. Compare o pedido vago (A) com o pedido completo (B).",
    ], tabela: { cab: ["Parte", "Pergunta que responde", "Pedido A (vago)", "Pedido B (completo)"], linhas: [["Objetivo", "para que serve?", "analisar o log", "contar linhas por nível"], ["Entrada", "como são os dados?", "não diz", "texto, uma linha por evento, com data, hora, nível e mensagem"], ["Saída", "o que devolver?", "não diz", "dicionário com a contagem de INFO, WARNING e ERROR"], ["Regras e bordas", "e se vier algo estranho?", "não diz", "ignorar linhas vazias; contar à parte as malformadas"], ["Limites", "o que NÃO fazer?", "não diz", "não apagar nem enviar nada; não usar bibliotecas externas"]] },
      termos: [["Log", "o diário de um sistema: um texto com uma linha para cada coisa que aconteceu."], ["Caso de borda", "uma situação rara ou no limite, como linha vazia ou lista sem itens."], ["Biblioteca externa", "código de terceiros que se instala à parte."]], fonte: FONTE_PROMPT },
    { tipo: "prever", texto: "Use a tabela acima. Responda com um número.", conceito: "vc_spec", itens: [
      { pergunta: "Quantas das cinco partes o pedido A informa de verdade?", rotulo: "Item 1", resposta: ["1"], porque: "Só o objetivo, e ainda vago. Entrada, saída, regras e limites ficam por adivinhar." },
      { pergunta: "Quantas das cinco partes o pedido B informa?", rotulo: "Item 2", resposta: ["5"], porque: "Objetivo, entrada, saída, regras e limites estão todos escritos." },
      { pergunta: "Em qual parte entra “o que fazer com linha vazia”? (use o número da ordem na tabela)", rotulo: "Item 3", resposta: ["4"], porque: "É um caso de borda, a quarta parte: regras e bordas." }] },
    { tipo: "descobrir", texto: "Três pedidos para o mesmo programa e o que a IA provavelmente entregou.", tabela: { cab: ["Pedido", "O que a IA provavelmente fez"], linhas: [["“analise o log”", "imprimiu o número total de linhas"], ["“conte os erros do log”", "contou só a palavra ERROR, até dentro de mensagens"], ["“conte as linhas de nível ERROR, ignorando vazias”", "contou o campo de nível e pulou as vazias"]] }, dicas: ["Compare o quanto cada pedido diz sobre o que contar.", "Quando o pedido não diz, quem decide o que fazer?"],
      pergunta: "O que mudou de um pedido para o seguinte, e por que o resultado ficou mais confiável?", explicacao: "Cada pedido tirou um palpite da IA: **o que contar**, **onde** (campo de nível) e **o que ignorar**. Menos palpite significa menos surpresa, e um resultado que você consegue **conferir**.", conceito: "vc_spec" },
    { tipo: "aberta", titulo: "Escreva a sua especificação", texto: "Imagine uma ferramenta pequena para uma loja virtual: dado o valor de um pedido e o cupom do cliente, calcular o valor final.", pergunta: "Escreva a especificação com as cinco partes (objetivo, entrada, saída, regras e bordas, limites) e invente 2 exemplos com a resposta esperada.", minimo: 80, conceito: "vc_spec", modelo: "Uma boa resposta traz o **objetivo** (calcular o valor final), a **entrada** (valor e cupom), a **saída** (um número com 2 casas), **regras e bordas** (cupom inexistente, valor negativo) e **limites** (não guardar dados do cliente), além de exemplos como: pedido 100,00 com cupom de 10% dá 90,00." },
    { tipo: "aberta", tag: "sec", titulo: "O que a especificação deve proibir", texto: "A IA gerou um programa de relatório que, “para ajudar”, também envia o resultado por e-mail e grava uma cópia na nuvem. Ninguém pediu isso.", pergunta: "Que parte da especificação teria evitado isso? Escreva uma frase de limite que você colocaria.", modelo: "A parte de **limites**. Por exemplo: “O programa só **lê** o texto recebido e **devolve** o resultado; não envia nada para fora e não grava arquivos”." },
    { tipo: "quiz", itens: [
      { pergunta: "Para que serve a parte “limites”?", opcoes: ["Dizer o que NÃO fazer", "Limitar o tamanho do log", "Escolher a cor do texto", "Definir quem lê o código"], correta: 0, porque: "Ela evita que a IA acrescente ações que ninguém pediu.", conceito: "vc_spec" },
      { pergunta: "Um bom exemplo na especificação mostra:", opcoes: ["O código pronto da função", "Entrada e resposta certa", "Quem pediu e para quando", "O prazo e o responsável"], correta: 1, porque: "Entrada e resposta esperada viram depois o seu teste.", conceito: "vc_spec" },
      { pergunta: "O que é um caso de borda?", opcoes: ["Um erro de digitação", "Um comentário no código", "Uma situação rara ou limite", "Uma função muito longa"], correta: 2, porque: "Exemplos: linha vazia, lista sem itens, valor zero.", conceito: "vc_spec" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: quais informações uma boa especificação deve trazer antes de você pedir o código?", conceito: "vc_spec", modelo: "Objetivo, **entrada**, **saída**, **regras e casos de borda** e **limites** (o que não fazer), de preferência com exemplos de entrada e resposta esperada." },
  ],
  recuperacao: [
    { p: "Cite pelo menos três partes de uma boa especificação.", regex: "(objetivo|entrada|saida|borda|regra|limite)", modelo: "Objetivo, entrada, saída, regras e bordas, limites.", conceito: "vc_spec" },
    { p: "Para que servem os exemplos com resposta esperada na especificação?", regex: "(teste|conferi|verific|validar)", modelo: "Viram os testes que conferem o código gerado.", conceito: "vc_spec" },
    { p: "Que parte da especificação evita que a IA acrescente ações que ninguém pediu, como enviar e-mail?", regex: "(limite|nao fazer|proib)", modelo: "Os limites: o que o programa não deve fazer.", conceito: "vc_spec" },
  ],
});

// ---------- Aula 0085: ler o código gerado ----------
aulas.push({
  id: "0085", modulo: 11, n: 3, slug: "ler-o-codigo", titulo: "Ler o código gerado, linha a linha",
  resumo: "Antes de rodar, leia. Para cada linha, pergunte o que ela faz e o que está faltando. Hoje, com laços dentro de laços.",
  objetivos: ["Explicar uma linha de código gerado com suas palavras.", "Acompanhar um laço dentro de outro laço.", "Achar o que falta ou está errado num trecho gerado."],
  conceitos: [["vc_ler", "Ler código gerado"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você recebeu 10 linhas de código de uma IA e não entende duas delas. O que você faz com elas: apaga, deixa como está porque “funcionou”, ou outra coisa?", modelo: "Nem apagar às cegas nem deixar sem entender. Peça à IA para **explicar** essas linhas, **teste** o que elas fazem com um exemplo pequeno e só então decida. Código que você não entende é código pelo qual você não pode responder." },
    { tipo: "texto", titulo: "Duas perguntas por linha", blocos: [
      "Ler código gerado é diferente de ler um texto. Para cada linha, faça duas perguntas: **o que ela faz?** e **o que falta?**. A segunda pergunta é a mais importante: a IA raramente erra por escrever demais, e sim por **esquecer** casos.",
      "Hoje o código usa um **laço dentro de outro**. O laço de fora percorre os pedidos; o laço de dentro percorre os itens de cada pedido. Para cada volta do de fora, o de dentro roda **inteiro**.",
    ], termos: [["Laço de fora e laço de dentro", "um `for` escrito dentro de outro: o de dentro repete tudo a cada volta do de fora."], ["Dicionário", "uma coleção de pares chave-valor, como `{\"ana\": 3}`."], ["`.get(chave, 0)`", "devolve o valor da chave, ou 0 se a chave ainda não existe."]] },
    { tipo: "exemplo", arquivo: "gerado_itens.py", texto: "Código que a IA gerou para contar quantos itens cada cliente comprou. Clique nas linhas para ler.",
      codigo: [["def itens_por_cliente(pedidos):", "Recebe uma lista de pedidos. Cada pedido é um par: (cliente, lista de itens)."], ["    contagem = {}", "Um dicionário vazio para guardar cliente e quantidade."], ["    for pedido in pedidos:", "Laço de fora: um pedido por volta."], ["        cliente = pedido[0]", "O primeiro elemento do par é o cliente."], ["        for item in pedido[1]:", "Laço de dentro: um item do pedido por volta."], ["            contagem[cliente] = contagem.get(cliente, 0) + 1", "Soma 1 à contagem do cliente (começando de 0 se for a primeira vez)."], ["    return contagem", "Devolve o dicionário."], ["pedidos = [(\"ana\", [\"caneta\", \"caderno\"]), (\"bia\", [\"lapis\"]), (\"ana\", [\"borracha\"])]", "Três pedidos fictícios; a Ana aparece duas vezes."], ["print(itens_por_cliente(pedidos))", "Falta algo? Um cliente com pedido sem itens não aparece no resultado."]] },
    { tipo: "executar", texto: "Rode e depois acrescente `(\"caio\", [])` à lista de pedidos para ver o que acontece com um pedido sem itens.", arquivo: "gerado_itens.py (pode editar)", codigo: `def itens_por_cliente(pedidos):
    contagem = {}
    for pedido in pedidos:
        cliente = pedido[0]
        for item in pedido[1]:
            contagem[cliente] = contagem.get(cliente, 0) + 1
    return contagem

pedidos = [("ana", ["caneta", "caderno"]), ("bia", ["lapis"]), ("ana", ["borracha"])]
print(itens_por_cliente(pedidos))`,
      prever: { enunciado: "Antes de testar, siga os laços e preveja a última linha mostrada:", conceito: "vc_ler", itens: [
        { codigo: `for i in range(2):
    for j in range(3):
        print(i, j)`, resposta: "1 2", porque: "O de dentro roda 3 vezes (0, 1, 2) para cada valor de i; o último par é 1 e 2." },
        { codigo: `n = 0
for i in range(3):
    for j in range(4):
        n = n + 1
print(n)`, resposta: "12", porque: "3 voltas de fora vezes 4 voltas de dentro = 12." }] } },
    { tipo: "descobrir", texto: "Conte quantas vezes o `n = n + 1` roda, mudando os tamanhos dos dois laços.", arquivo: "contar_voltas.py", codigo: `n = 0
for a in range(x):
    for b in range(y):
        n = n + 1
print(n)`,
      execucoes: [{ prefixo: "x, y = 2, 3", saida: ["6"] }, { prefixo: "x, y = 4, 5", saida: ["20"] }, { prefixo: "x, y = 3, 0", saida: ["0"] }], colunas: ["Valores", "O que aparece"],
      pergunta: "Qual é a regra entre `x`, `y` e o resultado? Por que `y = 0` zera tudo?", dicas: ["Multiplique x por y em cada linha.", "Se o laço de dentro não tem nenhuma volta, o `n = n + 1` chega a rodar?"],
      explicacao: "O resultado é **x vezes y**. Com `y = 0` o laço de dentro não faz nenhuma volta, então a linha de dentro nunca roda, qualquer que seja o x. É o mesmo efeito de um pedido **sem itens** no exemplo da Ana e da Bia.", conceito: "vc_ler" },
    { tipo: "prever", conceito: "vc_ler", itens: [
      { codigo: `pedidos = [[2, 1], [3], []]
total = 0
for pedido in pedidos:
    for qtd in pedido:
        total = total + qtd
print(total)`, resposta: "6", porque: "2 + 1 + 3 = 6. O pedido vazio não tem voltas de dentro." },
      { codigo: `pedidos = [[2, 1], [3], []]
contagem = 0
for pedido in pedidos:
    contagem = contagem + 1
print(contagem)`, resposta: "3", porque: "Só um laço: conta pedidos (3), não itens." },
      { codigo: `contagem = {}
for nivel in ["INFO", "ERROR", "INFO"]:
    contagem[nivel] = contagem.get(nivel, 0) + 1
print(contagem["INFO"])`, resposta: "2", porque: "INFO aparece duas vezes: a contagem começa em 0 e sobe 2 vezes." }] },
    { tipo: "corrigir", texto: "A IA gerou esta função, mas ela guarda sempre `1` por cliente (leia a linha do `contagem`). Conserte **uma linha** para a Ana dar 3.", arquivo: "gerado_com_defeito.py", dica: "A contagem do cliente deve crescer: use `contagem.get(cliente, 0) + 1`.", conceito: "vc_ler",
      codigo: `def itens_por_cliente(pedidos):
    contagem = {}
    for pedido in pedidos:
        cliente = pedido[0]
        for item in pedido[1]:
            contagem[cliente] = 1
    return contagem

pedidos = [("ana", ["caneta", "caderno"]), ("bia", ["lapis"]), ("ana", ["borracha"])]
print(itens_por_cliente(pedidos))`, esperado: ["{'ana': 3, 'bia': 1}"],
      solucao: `def itens_por_cliente(pedidos):
    contagem = {}
    for pedido in pedidos:
        cliente = pedido[0]
        for item in pedido[1]:
            contagem[cliente] = contagem.get(cliente, 0) + 1
    return contagem

pedidos = [("ana", ["caneta", "caderno"]), ("bia", ["lapis"]), ("ana", ["borracha"])]
print(itens_por_cliente(pedidos))` },
    { tipo: "escrever", texto: "Escreva, com um laço dentro de outro, o programa que soma todas as quantidades de `pedidos` (cada pedido é uma lista de quantidades) e mostra `Total de itens: 6`. Guarde a soma na variável `total`.", arquivo: "meu_programa.py",
      inicial: `pedidos = [[2, 1], [3], []]
# some todas as quantidades com um laço dentro de outro
`, esperado: ["Total de itens: 6"], testes: [["total", "6"]], dica: "O laço de fora é `for pedido in pedidos:` e o de dentro é `for qtd in pedido:`; some em `total`.", conceito: "vc_ler",
      solucao: `pedidos = [[2, 1], [3], []]
total = 0
for pedido in pedidos:
    for qtd in pedido:
        total = total + qtd
print("Total de itens:", total)` },
    { tipo: "aberta", tag: "sec", titulo: "Linhas que olham para fora", texto: "Ao ler um código gerado, você vê linhas com `open(...)`, `requests.post(...)` e `os.remove(...)`, que a sua especificação nunca mencionou.", pergunta: "Por que essas linhas pedem atenção especial na leitura? O que você faria antes de rodar o código?", modelo: "Elas **mexem fora do programa**: abrem arquivos, enviam dados pela internet ou apagam coisas. Eu **não rodaria** antes de entender para quê servem; se não estavam na especificação, **pediria para remover** e conferiria de novo." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual é a pergunta mais importante ao ler?", opcoes: ["O que está faltando?", "Quantas linhas tem?", "Qual é o nome da função?", "Quem escreveu o código?"], correta: 0, porque: "A IA costuma esquecer casos, mais do que escrever demais.", conceito: "vc_ler" },
      { pergunta: "Com 3 voltas de fora e 4 de dentro, quantas voltas de dentro ocorrem?", opcoes: ["7 voltas", "12 voltas", "1 volta", "34 voltas"], correta: 1, porque: "O de dentro roda inteiro a cada volta do de fora: 3 vezes 4.", conceito: "vc_ler" },
      { pergunta: "Se não entendo uma linha gerada, devo:", opcoes: ["Deixar, pois funcionou", "Apagar sem testar", "Entender antes de usar", "Rodar em produção"], correta: 2, porque: "Código que você não entende é código pelo qual não pode responder.", conceito: "vc_ler" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: que duas perguntas você faz a cada linha de código gerado e como o laço dentro de laço funciona?", conceito: "vc_ler", modelo: "**O que ela faz?** e **o que falta?**. No laço dentro de laço, o de fora percorre uma coleção e, **a cada volta**, o de dentro roda inteiro; o total de voltas internas é o produto dos tamanhos." },
  ],
  recuperacao: [
    { p: "Que duas perguntas se faz a cada linha de código gerado?", regex: "(faz);;(falta)", modelo: "O que ela faz e o que falta.", conceito: "vc_ler" },
    { p: "Num laço dentro de outro, quantas vezes roda o laço de dentro?", regex: "(inteiro|cada volta|toda volta|vezes|produto|multipl)", modelo: "Roda inteiro a cada volta do laço de fora (o total é um vezes o outro).", conceito: "vc_ler" },
    { p: "Por que linhas que abrem arquivos, enviam dados ou apagam coisas pedem atenção?", regex: "(fora|apag|envi|dados|risco|perig|nao pedi|especific)", modelo: "Porque mexem fora do programa e não estavam na especificação.", conceito: "vc_ler" },
  ],
});

// ---------- Aula 0086: testes antes ----------
aulas.push({
  id: "0086", modulo: 11, n: 4, slug: "testes-antes", titulo: "Testes escritos por você, antes do código",
  resumo: "Código que parece certo engana. O que prova é um teste cuja resposta vem de você, escrita antes de ver o código.",
  objetivos: ["Escrever `assert` com a resposta esperada antes de pedir a função.", "Dividir uma linha de log com `split` e `strip`.", "Achar um defeito que não dá erro mas dá resposta errada."],
  conceitos: [["vc_testes", "Testes escritos antes, com assert"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "A IA escreveu a função e também os testes dela, e todos passam. Isso basta para confiar? Que cuidado você teria?", modelo: "Não basta: se a IA entendeu errado o pedido, ela escreve **código e testes com o mesmo erro**, e tudo passa. Os testes que valem são os com **respostas que eu calculei** (ou tirei da especificação), de preferência **escritos antes**." },
    { tipo: "texto", titulo: "Teste primeiro, código depois", blocos: [
      "O jeito mais seguro: escreva os testes **antes** de pedir o código. Assim a resposta esperada vem da **sua** cabeça (ou de uma conta à mão), e não do código que está sendo testado.",
      "Uma linha do log da loja tem este formato: data, hora, nível e mensagem, separados por espaço. Por exemplo: `2026-03-01 10:15:02 INFO pedido 1001 criado`. Para separá-la, usa-se `linha.split(\" \", 3)`: o `3` limita a 3 cortes, e a mensagem inteira fica na última peça. `strip()` tira espaços das pontas.",
    ], termos: [["split", "corta um texto em pedaços e devolve uma lista; `\"a b c\".split(\" \")` dá `['a', 'b', 'c']`."], ["strip", "tira espaços e quebras de linha do começo e do fim do texto."], ["Teste primeiro", "escrever os `assert` antes de pedir ou escrever a função."]] },
    { tipo: "exemplo", arquivo: "nivel.py", texto: "Os testes foram escritos antes. Depois entrou a função, “gerada pela IA”.",
      codigo: [["# Testes meus, escritos antes de pedir a função:", "A resposta certa vem de mim."], ["# nivel_da_linha(\"2026-03-01 10:15:02 INFO pedido 1001 criado\") deve dar \"INFO\"", "Em palavras: o terceiro pedaço é o nível."], ["def nivel_da_linha(linha):", "A função gerada."], ["    partes = linha.strip().split(\" \", 3)", "Tira as sobras das pontas e corta em até 4 pedaços: data, hora, nível e mensagem."], ["    return partes[2]", "Devolve o terceiro pedaço (posição 2, pois a contagem começa em 0)."], ["assert nivel_da_linha(\"2026-03-01 10:15:02 INFO pedido 1001 criado\") == \"INFO\"", "O primeiro teste."], ["assert nivel_da_linha(\"  2026-03-01 10:20:00 ERROR pagamento recusado  \") == \"ERROR\"", "O segundo tem espaços nas pontas, de propósito."], ["print(\"passou\")", "Só aparece se todos passarem."]] },
    { tipo: "executar", texto: "Rode e depois troque o `\"INFO\"` do primeiro teste por `\"ERROR\"` para ver o teste falhar de propósito.", arquivo: "nivel.py (pode editar)", codigo: `def nivel_da_linha(linha):
    partes = linha.strip().split(" ", 3)
    return partes[2]

assert nivel_da_linha("2026-03-01 10:15:02 INFO pedido 1001 criado") == "INFO"
print("passou")`,
      prever: { enunciado: "Antes de testar:", conceito: "vc_testes", itens: [
        { codigo: `partes = "2026-03-01 10:15:02 INFO pedido criado".split(" ", 3)
print(len(partes))`, resposta: "4", porque: "Data, hora, nível e a mensagem inteira (“pedido criado”) como quarto pedaço." },
        { codigo: `partes = "2026-03-01 10:15:02 WARNING estoque baixo".split(" ", 3)
print(partes[3])`, resposta: "estoque baixo", porque: "O limite de 3 cortes mantém a mensagem junta." }] } },
    { tipo: "descobrir", texto: "A mesma função, com três linhas diferentes. Uma delas tem um problema que não faz o Python reclamar.", arquivo: "nivel.py", codigo: `def nivel_da_linha(linha):
    partes = linha.strip().split(" ", 3)
    return partes[2]

print(nivel_da_linha(l))`,
      execucoes: [{ prefixo: 'l = "2026-03-01 10:15:02 INFO pedido criado"', rotulo: "linha completa com INFO", saida: ["INFO"] }, { prefixo: 'l = "2026-03-01 10:15:02 WARNING estoque baixo"', rotulo: "linha completa com WARNING", saida: ["WARNING"] }, { prefixo: 'l = "10:15:02 INFO sem data"', rotulo: "linha sem a data", saida: ["sem"] }], colunas: ["Linha", "O que aparece"],
      pergunta: "Qual linha deu uma resposta errada sem nenhum erro? Que teste, escrito antes, teria denunciado isso?", dicas: ["Qual das três respostas não é um nível de log?", "Pense numa linha sem a data: qual deveria ser a resposta certa?"],
      explicacao: "A linha **sem data** devolveu `sem`, que não é um nível: o código “parece certo” e roda sem erro. Um teste escrito antes, como `assert nivel_da_linha(\"10:15:02 INFO sem data\")` com uma resposta definida na **especificação** (por exemplo, tratar como linha malformada), teria mostrado que a função precisa de outra regra.", conceito: "vc_testes" },
    { tipo: "prever", conceito: "vc_testes", itens: [
      { codigo: `def eh_erro(linha):
    return "ERROR" in linha
print(eh_erro("2026-03-01 10:00:00 INFO pagina mostrou ERROR 404"))`, resposta: "True", porque: "A palavra ERROR aparece na mensagem, mesmo sendo uma linha INFO: a função parece certa, mas erra." },
      { codigo: `def eh_erro(linha):
    return linha.split(" ", 3)[2] == "ERROR"
print(eh_erro("2026-03-01 10:00:00 INFO pagina mostrou ERROR 404"))`, resposta: "False", porque: "Agora a função olha só o campo do nível, que é INFO." },
      { codigo: `def eh_erro(linha):
    return linha.split(" ", 3)[2] == "ERROR"
print(eh_erro("2026-03-01 10:05:00 ERROR pagamento recusado"))`, resposta: "True", porque: "O campo do nível é ERROR." }] },
    { tipo: "corrigir", texto: "A IA escreveu `eh_erro` com um defeito que parece certo. O seu teste (escrito antes) falha. Conserte **a função**.", arquivo: "gerado.py", dica: "Compare só o campo do nível: `linha.split(\" \", 3)[2] == \"ERROR\"`.", conceito: "vc_testes",
      codigo: `def eh_erro(linha):
    return "ERROR" in linha

assert eh_erro("2026-03-01 10:05:00 ERROR pagamento recusado") == True
assert eh_erro("2026-03-01 10:00:00 INFO pagina mostrou ERROR 404") == False
print("passou")`, esperado: ["passou"],
      solucao: `def eh_erro(linha):
    return linha.split(" ", 3)[2] == "ERROR"

assert eh_erro("2026-03-01 10:05:00 ERROR pagamento recusado") == True
assert eh_erro("2026-03-01 10:00:00 INFO pagina mostrou ERROR 404") == False
print("passou")` },
    { tipo: "escrever", texto: "Os testes já estão escritos (por você, antes). Escreva o corpo da função `hora_da_linha(linha)`, que devolve só a hora, por exemplo `\"08:05:00\"`.", arquivo: "meu_programa.py",
      inicial: `def hora_da_linha(linha):
    # devolva só a hora da linha
    pass

assert hora_da_linha("2026-03-01 08:05:00 INFO pedido criado") == "08:05:00"
assert hora_da_linha("  2026-03-02 23:59:59 ERROR falha  ") == "23:59:59"
print("passou")`, esperado: ["passou"], testes: [["hora_da_linha('2026-03-05 12:00:01 WARNING estoque baixo')", "'12:00:01'"]], dica: "Use `linha.strip().split(\" \", 3)` e devolva a peça de posição 1.", conceito: "vc_testes",
      solucao: `def hora_da_linha(linha):
    partes = linha.strip().split(" ", 3)
    return partes[1]

assert hora_da_linha("2026-03-01 08:05:00 INFO pedido criado") == "08:05:00"
assert hora_da_linha("  2026-03-02 23:59:59 ERROR falha  ") == "23:59:59"
print("passou")` },
    { tipo: "aberta", tag: "sec", titulo: "Quem escreveu o teste?", texto: "Você pediu à IA: “escreva a função e os testes”. Os testes passaram de primeira, e você publicou o programa.", pergunta: "Por que isso é arriscado? Como você garantiria que os testes valem alguma coisa?", modelo: "Se a IA entendeu o pedido de um jeito errado, o **código e o teste erram juntos**. Eu escreveria **pelo menos alguns testes eu mesmo**, com respostas calculadas à mão ou tiradas da especificação, e **tentaria quebrar** a função com casos esquisitos (linha vazia, linha sem data)." },
    { tipo: "quiz", itens: [
      { pergunta: "De onde deve vir a resposta esperada do teste?", opcoes: ["Do próprio código gerado", "Da minha especificação", "De um sorteio de valores", "Do último teste que passou"], correta: 1, porque: "Se vier do código testado, o teste prova pouco.", conceito: "vc_testes" },
      { pergunta: "Por que escrever os testes antes?", opcoes: ["A resposta vem de mim", "O código fica mais curto", "A IA responde mais rápido", "O teste nunca falha"], correta: 0, porque: "Escrever antes evita que a resposta seja ajustada ao código.", conceito: "vc_testes" },
      { pergunta: "O que `\"a b c d e\".split(\" \", 3)` devolve?", opcoes: ["Dois pedaços só", "Cinco pedaços", "Quatro pedaços", "Um pedaço só"], correta: 2, porque: "Com 3 cortes saem 4 pedaços; o último guarda o resto (“d e”).", conceito: "vc_testes" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: por que não basta o código “parecer certo” e como os testes escritos por você ajudam?", conceito: "vc_testes", modelo: "Código pode **parecer certo e rodar sem erro** e mesmo assim dar resposta errada. Testes com **respostas minhas**, escritos **antes**, provam o comportamento, inclusive nos casos esquisitos, e não repetem o erro da IA." },
  ],
  recuperacao: [
    { p: "Por que escrever os testes antes de pedir o código?", regex: "(resposta|esperad);;(minha|vem de mim|mim|eu|propri|fora|independente)", modelo: "Para que a resposta esperada venha de mim, e não do código testado.", conceito: "vc_testes" },
    { p: "O que faz `linha.split(\" \", 3)` numa linha de log?", regex: "(corta|divide|separa|pedaco|parte|lista)", modelo: "Corta a linha em até 4 pedaços: data, hora, nível e mensagem.", conceito: "vc_testes" },
    { p: "Por que não confiar só em testes que a própria IA escreveu?", regex: "(mesmo erro|erro junt|entend|errado|nao prova|propri)", modelo: "Porque se a IA entendeu errado, código e teste erram juntos.", conceito: "vc_testes" },
  ],
});

// ---------- Aula 0087: logs ----------
aulas.push({
  id: "0087", modulo: 11, n: 5, slug: "ler-logs", titulo: "Ler logs para saber o que aconteceu",
  resumo: "O log é o diário do sistema. Saber contar por nível e filtrar por dia transforma um monte de linhas em respostas.",
  objetivos: ["Percorrer as linhas de um log em texto.", "Contar linhas por nível (INFO, WARNING, ERROR) com um dicionário.", "Filtrar o log por dia."],
  conceitos: [["vc_log", "Ler e contar logs"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "A loja virtual teve clientes reclamando de pagamento recusado ontem à tarde. Onde você procuraria o motivo? O que esperaria encontrar lá?", modelo: "No **log**: o registro automático do que o sistema fez, com data, hora, nível e mensagem. Eu procuraria as linhas de **ERROR** perto do horário das reclamações para ver **o que** falhou e **quando**." },
    { tipo: "texto", titulo: "Níveis e linhas", blocos: [
      "Um log é um texto com uma linha por evento. Cada linha tem um **nível**: **INFO** (aconteceu algo normal), **WARNING** (atenção, algo estranho) e **ERROR** (falhou). Ler logs é a forma mais rápida de depurar sistemas que você não está vendo rodar.",
      "Em Python, `log.splitlines()` devolve a lista de linhas do texto. Para cada linha, `split(\" \", 3)` separa os campos. Um **dicionário de contagem** (`contagem[nivel] = contagem.get(nivel, 0) + 1`) guarda quantas linhas há de cada nível.",
    ], termos: [["Nível", "a gravidade do evento: INFO, WARNING ou ERROR."], ["splitlines", "corta um texto em uma lista com uma linha por item."], ["startswith", "pergunta se um texto começa com certo pedaço: `\"2026-03-01 09:00\".startswith(\"2026-03-01\")` é `True`."]] },
    { tipo: "exemplo", arquivo: "contar_niveis.py", texto: "Um log fictício de uma loja e a contagem por nível.",
      codigo: [["log = \"\"\"2026-03-01 09:00:01 INFO pedido 1001 criado", "O log é um texto de várias linhas, entre três aspas."], ["2026-03-01 09:05:10 WARNING estoque baixo item 77", "Uma linha de aviso."], ["2026-03-01 09:12:44 ERROR pagamento recusado pedido 1002", "Uma linha de erro."], ["2026-03-01 10:01:09 INFO pedido 1003 criado", "Mais um evento normal."], ["2026-03-02 08:30:00 ERROR falha ao gerar nota pedido 1003", "Já é o dia seguinte."], ["2026-03-02 08:45:12 INFO pedido 1004 criado\"\"\"", "Fim do texto, fechando as três aspas."], ["contagem = {}", "Dicionário de contagem, vazio."], ["for linha in log.splitlines():", "Uma volta para cada linha do log."], ["    nivel = linha.strip().split(\" \", 3)[2]", "Pega o terceiro campo: o nível."], ["    contagem[nivel] = contagem.get(nivel, 0) + 1", "Soma 1 à contagem daquele nível."], ["print(contagem)", "Mostra os totais."]] },
    { tipo: "executar", texto: "Rode e depois troque `\"INFO\"` por `\"ERROR\"` na última linha para ver só um total.", arquivo: "contar_niveis.py (pode editar)", codigo: `log = """2026-03-01 09:00:01 INFO pedido 1001 criado
2026-03-01 09:05:10 WARNING estoque baixo item 77
2026-03-01 09:12:44 ERROR pagamento recusado pedido 1002
2026-03-01 10:01:09 INFO pedido 1003 criado
2026-03-02 08:30:00 ERROR falha ao gerar nota pedido 1003
2026-03-02 08:45:12 INFO pedido 1004 criado"""

contagem = {}
for linha in log.splitlines():
    nivel = linha.strip().split(" ", 3)[2]
    contagem[nivel] = contagem.get(nivel, 0) + 1
print(contagem["INFO"])`,
      prever: { enunciado: "Antes de testar:", conceito: "vc_log", itens: [
        { codigo: `texto = "um\\ndois\\ntres"
print(len(texto.splitlines()))`, resposta: "3", porque: "São três linhas." },
        { codigo: `contagem = {}
for nivel in ["INFO", "ERROR", "ERROR", "WARNING", "ERROR"]:
    contagem[nivel] = contagem.get(nivel, 0) + 1
print(contagem["ERROR"])`, resposta: "3", porque: "ERROR aparece 3 vezes na lista." }] } },
    { tipo: "descobrir", texto: "Filtrar por dia: contar as linhas do mesmo log que começam com a data escolhida (o log é o do exemplo acima).", arquivo: "filtrar_dia.py", codigo: `n = 0
for linha in log.splitlines():
    if linha.startswith(dia):
        n = n + 1
print(n)`,
      execucoes: [{ prefixo: 'log = """2026-03-01 09:00:01 INFO pedido 1001 criado\n2026-03-01 09:05:10 WARNING estoque baixo item 77\n2026-03-01 09:12:44 ERROR pagamento recusado pedido 1002\n2026-03-01 10:01:09 INFO pedido 1003 criado\n2026-03-02 08:30:00 ERROR falha ao gerar nota pedido 1003\n2026-03-02 08:45:12 INFO pedido 1004 criado"""\ndia = "2026-03-01"', rotulo: 'dia = "2026-03-01"', saida: ["4"] }, { prefixo: 'log = """2026-03-01 09:00:01 INFO pedido 1001 criado\n2026-03-01 09:05:10 WARNING estoque baixo item 77\n2026-03-01 09:12:44 ERROR pagamento recusado pedido 1002\n2026-03-01 10:01:09 INFO pedido 1003 criado\n2026-03-02 08:30:00 ERROR falha ao gerar nota pedido 1003\n2026-03-02 08:45:12 INFO pedido 1004 criado"""\ndia = "2026-03-02"', rotulo: 'dia = "2026-03-02"', saida: ["2"] }, { prefixo: 'log = """2026-03-01 09:00:01 INFO pedido 1001 criado\n2026-03-01 09:05:10 WARNING estoque baixo item 77\n2026-03-01 09:12:44 ERROR pagamento recusado pedido 1002\n2026-03-01 10:01:09 INFO pedido 1003 criado\n2026-03-02 08:30:00 ERROR falha ao gerar nota pedido 1003\n2026-03-02 08:45:12 INFO pedido 1004 criado"""\ndia = "2026-03-03"', rotulo: 'dia = "2026-03-03"', saida: ["0"] }], colunas: ["Dia escolhido", "O que aparece"],
      pergunta: "Por que o dia `2026-03-03` dá 0, e não erro? Como você filtraria por **dia e nível ao mesmo tempo**?", dicas: ["Quantas linhas começam com 2026-03-03?", "Dentro do `if`, você pode juntar duas condições com `and`."],
      explicacao: "Nenhuma linha começa com `2026-03-03`; o `if` nunca é verdadeiro, então `n` continua 0 e nada dá erro. Para dia **e** nível: `if linha.startswith(dia) and nivel == \"ERROR\":`.", conceito: "vc_log" },
    { tipo: "prever", conceito: "vc_log", itens: [
      { codigo: `linha = "2026-03-01 09:12:44 ERROR pagamento recusado pedido 1002"
print(linha.split(" ", 3)[3])`, resposta: "pagamento recusado pedido 1002", porque: "O quarto pedaço é a mensagem inteira." },
      { codigo: `linha = "2026-03-01 09:12:44 ERROR pagamento recusado pedido 1002"
print(linha.startswith("2026-03-02"))`, resposta: "False", porque: "A linha começa com 2026-03-01." },
      { codigo: `linha = "   2026-03-01 09:12:44 ERROR falha   "
print(linha.strip().split(" ", 3)[2])`, resposta: "ERROR", porque: "O `strip()` tira os espaços das pontas, então o nível é o terceiro pedaço." }] },
    { tipo: "corrigir", texto: "O log desta função está indentado (as linhas começam com espaços) e a contagem sai com chaves estranhas. Conserte **uma linha** para sair `{'INFO': 2, 'ERROR': 1}`.", arquivo: "gerado_com_defeito.py", dica: "Espaços no começo viram pedaços vazios no `split`. Use `linha.strip()` antes de cortar.", conceito: "vc_log",
      codigo: `log = """    2026-03-01 09:00:01 INFO pedido 1001 criado
    2026-03-01 09:12:44 ERROR pagamento recusado
    2026-03-01 10:01:09 INFO pedido 1003 criado"""

contagem = {}
for linha in log.splitlines():
    nivel = linha.split(" ", 3)[2]
    contagem[nivel] = contagem.get(nivel, 0) + 1
print(contagem)`, esperado: ["{'INFO': 2, 'ERROR': 1}"],
      solucao: `log = """    2026-03-01 09:00:01 INFO pedido 1001 criado
    2026-03-01 09:12:44 ERROR pagamento recusado
    2026-03-01 10:01:09 INFO pedido 1003 criado"""

contagem = {}
for linha in log.splitlines():
    nivel = linha.strip().split(" ", 3)[2]
    contagem[nivel] = contagem.get(nivel, 0) + 1
print(contagem)` },
    { tipo: "escrever", texto: "Escreva a função `contar_nivel(log, nivel, dia)`, que devolve quantas linhas do `log` são do `nivel` indicado **e** começam com o `dia`.", arquivo: "meu_programa.py",
      inicial: `log = """2026-03-01 09:00:01 INFO pedido 1001 criado
2026-03-01 09:05:10 WARNING estoque baixo item 77
2026-03-01 09:12:44 ERROR pagamento recusado pedido 1002
2026-03-01 10:01:09 INFO pedido 1003 criado
2026-03-02 08:30:00 ERROR falha ao gerar nota pedido 1003
2026-03-02 08:45:12 INFO pedido 1004 criado"""

def contar_nivel(log, nivel, dia):
    # conte as linhas do nível e do dia
    pass
`, testes: [["contar_nivel(log, 'ERROR', '2026-03-01')", "1"], ["contar_nivel(log, 'INFO', '2026-03-01')", "2"], ["contar_nivel(log, 'ERROR', '2026-03-02')", "1"], ["contar_nivel(log, 'WARNING', '2026-03-02')", "0"]], dica: "Um laço sobre `log.splitlines()`; dentro dele, `if linha.startswith(dia) and nivel_da_linha == nivel:` aumenta o contador.", conceito: "vc_log",
      solucao: `log = """2026-03-01 09:00:01 INFO pedido 1001 criado
2026-03-01 09:05:10 WARNING estoque baixo item 77
2026-03-01 09:12:44 ERROR pagamento recusado pedido 1002
2026-03-01 10:01:09 INFO pedido 1003 criado
2026-03-02 08:30:00 ERROR falha ao gerar nota pedido 1003
2026-03-02 08:45:12 INFO pedido 1004 criado"""

def contar_nivel(log, nivel, dia):
    n = 0
    for linha in log.splitlines():
        linha = linha.strip()
        if linha.startswith(dia) and linha.split(" ", 3)[2] == nivel:
            n = n + 1
    return n
` },
    { tipo: "aberta", tag: "sec", titulo: "O log com dados pessoais", texto: "Você quer pedir ajuda à IA para analisar um log de verdade, e as mensagens trazem nomes de clientes, e-mails e finais de cartão.", pergunta: "O que fazer antes de colar o log num pedido à IA? Como obter ajuda sem expor ninguém?", modelo: "**Não colar** o log real. Eu **trocaria** nomes, e-mails e números por valores **fictícios** (ou apagaria esses trechos) e manteria só a **forma** das linhas. Também registraria no log só o necessário, sem dados pessoais." },
    { tipo: "quiz", itens: [
      { pergunta: "O que `log.splitlines()` devolve?", opcoes: ["Uma lista de linhas", "O número de linhas", "O texto em maiúsculas", "Só a primeira linha"], correta: 0, porque: "Uma lista com um item para cada linha do texto.", conceito: "vc_log" },
      { pergunta: "Qual nível indica que algo falhou?", opcoes: ["INFO, o normal", "WARNING, só aviso", "Nenhum deles", "ERROR, a falha"], correta: 3, porque: "ERROR marca falhas; WARNING é atenção e INFO é rotina.", conceito: "vc_log" },
      { pergunta: "Para contar por nível, usa-se:", opcoes: ["Um dicionário contador", "Uma lista ordenada", "Um número inteiro só", "Um texto concatenado"], correta: 0, porque: "O dicionário guarda uma contagem para cada nível diferente.", conceito: "vc_log" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como contar quantas linhas de cada nível existem em um log em texto e como filtrar por dia?", conceito: "vc_log", modelo: "Percorro `log.splitlines()`, corto cada linha com `strip().split(\" \", 3)`, pego o nível (posição 2) e somo 1 no dicionário com `.get(nivel, 0) + 1`. Para filtrar por dia, uso `linha.startswith(dia)` num `if`." },
  ],
  recuperacao: [
    { p: "Quais são os três níveis de log da aula e o que cada um indica?", regex: "(info);;(warning);;(error)", modelo: "INFO (normal), WARNING (atenção) e ERROR (falha).", conceito: "vc_log" },
    { p: "Como contar quantas linhas há de cada nível?", regex: "(dicionario|contador|contagem)", modelo: "Com um dicionário de contagem: cada nível é uma chave e soma 1 a cada linha.", conceito: "vc_log" },
    { p: "Por que não colar um log real com nomes e e-mails num pedido à IA?", regex: "(dado|pessoa|exp|ficti|sensiv|privacid|cliente)", modelo: "Porque expõe dados de pessoas; troque por valores fictícios.", conceito: "vc_log" },
  ],
});

// ---------- Aula 0088: tratar erros ----------
aulas.push({
  id: "0088", modulo: 11, n: 6, slug: "tratar-erros", titulo: "Tratar erros em vez de escondê-los",
  resumo: "Linhas defeituosas existem em todo log. try/except evita que o programa pare, mas só ajuda se o erro for contado e mostrado.",
  objetivos: ["Usar `try` e `except` para uma linha malformada.", "Distinguir tratar um erro de escondê-lo.", "Entender o papel de `finally` e `raise`."],
  conceitos: [["vc_erros", "Tratar erros com try/except"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O seu programa lê 10.000 linhas de log, e a linha 4.321 está cortada pela metade. O programa para com erro. O que seria melhor: parar tudo, ignorar a linha sem avisar, ou outra coisa?", modelo: "Nem parar tudo por uma linha ruim, nem ignorar em silêncio. O melhor é **seguir em frente** e **contar** quantas linhas estavam ruins, para eu saber se o resultado merece confiança." },
    { tipo: "texto", titulo: "try, except, finally e raise", blocos: [
      "Dentro de `try:` fica o código que pode falhar. Se falhar, o Python pula para o `except` do **tipo de erro** que você escolheu. Escolher o tipo é importante: `except ValueError:` trata só o que você espera.",
      "O `finally:` roda **sempre**, com ou sem erro (útil para fechar ou avisar). O `raise` faz o contrário: **provoca** um erro de propósito, para que um dado inválido não passe despercebido.",
      "Dois jeitos ruins: `except:` sem tipo, que captura até erros que você nem imaginava; e `except ...: pass`, que **esconde** o erro. Quando uma IA gera um `pass` dentro de um `except`, leia com desconfiança.",
    ], termos: [["try / except", "tenta rodar um bloco e, se der o erro indicado, roda outro bloco em vez de parar."], ["finally", "bloco que roda sempre no final, houve erro ou não."], ["raise", "provoca um erro de propósito, como `raise ValueError(\"valor negativo\")`."]] },
    { tipo: "exemplo", arquivo: "ler_valor.py", texto: "Uma função que converte texto em valor e trata o erro em vez de parar.",
      codigo: [["def ler_valor(texto):", "Recebe um texto como \"59.90\"."], ["    try:", "Tenta converter."], ["        return float(texto)", "Converte para número decimal."], ["    except ValueError:", "Se o texto não for um número (por exemplo, \"abc\"), cai aqui."], ["        print(\"valor inválido:\", texto)", "Avisa em vez de esconder."], ["        return 0.0", "Devolve um valor neutro e o programa segue."], ["    finally:", "Este bloco roda nos dois casos."], ["        print(\"conferido:\", texto)", "Um aviso de que o texto foi conferido, deu certo ou não."], ["print(ler_valor(\"59.90\"))", "Caminho feliz."], ["print(ler_valor(\"abc\"))", "Caminho com erro: o programa não para."]] },
    { tipo: "executar", texto: "Este programa provoca um erro de propósito com `raise`. Rode e leia a mensagem. Depois mude `-5` para `5`.", arquivo: "exigir.py (pode editar)", erroEsperado: "ValueError", codigo: `def exigir_positivo(v):
    if v < 0:
        raise ValueError("valor negativo")
    return v

print(exigir_positivo(-5))`,
      prever: { enunciado: "Antes de testar:", conceito: "vc_erros", itens: [
        { codigo: `try:
    print(int("12"))
except ValueError:
    print("erro")`, resposta: "12", porque: "“12” vira número; o `except` não é usado." },
        { codigo: `try:
    print(int("doze"))
except ValueError:
    print("erro")`, resposta: "erro", porque: "“doze” não vira número: o Python pula para o `except`." },
        { codigo: `try:
    x = 1
finally:
    print("fim")`, resposta: "fim", porque: "O `finally` roda sempre." }] } },
    { tipo: "descobrir", texto: "Este programa soma valores de um texto e “ignora” o que não consegue converter.", arquivo: "somar.py", codigo: `total = 0
for t in textos:
    try:
        total = total + float(t)
    except ValueError:
        pass
print(total)`,
      execucoes: [{ prefixo: 'textos = ["10", "5.5", "4"]', saida: ["19.5"] }, { prefixo: 'textos = ["10", "5,50", "4"]', saida: ["14.0"] }, { prefixo: 'textos = ["10", "x", "y"]', saida: ["10.0"] }], colunas: ["Valores", "O que aparece"],
      pergunta: "Em qual linha parte do dinheiro sumiu sem aviso? Como o programa deveria agir quando ignora algo?", dicas: ["Some de cabeça cada linha e compare com o resultado.", "O que o programa podia mostrar além do total?"],
      explicacao: "Em `\"5,50\"` (com vírgula) o `float` falha e o `pass` esconde o problema: o total sai **14.0**, sem aviso, quando deveria ser 19.5. O programa deveria **contar** os valores ignorados e **mostrar** essa contagem junto do total.", conceito: "vc_erros" },
    { tipo: "prever", conceito: "vc_erros", itens: [
      { codigo: `def f(t):
    try:
        return int(t)
    except ValueError:
        return -1
print(f("7") + f("x"))`, resposta: "6", porque: "7 + (-1) = 6: o “x” cai no `except` e devolve -1." },
      { codigo: `n = 0
for t in ["1", "a", "2", "b"]:
    try:
        int(t)
    except ValueError:
        n = n + 1
print(n)`, resposta: "2", porque: "“a” e “b” falham: o contador chega a 2." },
      { codigo: `def f(v):
    if v < 0:
        raise ValueError("negativo")
    return v
try:
    f(-1)
except ValueError as e:
    print(e)`, resposta: "negativo", porque: "`as e` guarda o erro; `print(e)` mostra a mensagem que foi passada ao `raise`." }] },
    { tipo: "corrigir", texto: "A IA escreveu um `pass` no `except`: os valores com defeito somem sem aviso. Conserte para contar os ignorados e mostrar `Linhas ignoradas: 1`.", arquivo: "gerado_com_defeito.py", dica: "Crie `ignoradas = 0` antes do laço, some 1 dentro do `except` e mostre no final.", conceito: "vc_erros",
      codigo: `textos = ["10", "5,50", "4"]
total = 0
for t in textos:
    try:
        total = total + float(t)
    except ValueError:
        pass
print("Soma:", total)`, esperado: ["Soma: 14.0", "Linhas ignoradas: 1"],
      solucao: `textos = ["10", "5,50", "4"]
total = 0
ignoradas = 0
for t in textos:
    try:
        total = total + float(t)
    except ValueError:
        ignoradas = ignoradas + 1
print("Soma:", total)
print("Linhas ignoradas:", ignoradas)` },
    { tipo: "escrever", texto: "Escreva a função `somar_validos(textos)`, que devolve um par `(soma, ignorados)`: a soma dos textos que viram número e quantos não viraram.", arquivo: "meu_programa.py",
      inicial: `def somar_validos(textos):
    # some os valores válidos e conte os ignorados
    pass
`, testes: [["somar_validos(['10', 'abc', '4'])", "(14.0, 1)"], ["somar_validos(['2.5'])", "(2.5, 0)"], ["somar_validos([])", "(0, 0)"]], dica: "Dois contadores (`total` e `ignorados`), um `try` com `float(t)` e um `except ValueError`; devolva `total, ignorados`.", conceito: "vc_erros",
      solucao: `def somar_validos(textos):
    total = 0
    ignorados = 0
    for t in textos:
        try:
            total = total + float(t)
        except ValueError:
            ignorados = ignorados + 1
    return total, ignorados
` },
    { tipo: "aberta", tag: "sec", titulo: "Erro engolido, pagamento perdido", texto: "Num programa de loja, o envio do pagamento está dentro de um `try`, e o `except Exception: pass` não registra nada. Se o envio falha, o cliente vê “pedido concluído”.", pergunta: "Que prejuízo isso causa? O que o programa deveria fazer no `except`?", modelo: "O cliente acha que pagou, e **ninguém fica sabendo** da falha. O `except` deveria **registrar** o erro (tipo, pedido e horário, sem dados do cartão), **avisar** o cliente e permitir **tentar de novo**. Erros que o programa não sabe tratar devem **subir** com `raise`." },
    { tipo: "quiz", itens: [
      { pergunta: "O que faz o bloco `finally`?", opcoes: ["Só quando há erro", "Sempre, com ou sem erro", "Só quando não há erro", "Nunca, é só decoração"], correta: 1, porque: "O `finally` roda houve erro ou não.", conceito: "vc_erros" },
      { pergunta: "Qual `except` é o mais seguro?", opcoes: ["Capturar tudo e ignorar", "Tratar o erro esperado e contar", "Esconder o erro com pass", "Deixar o erro sem tratar"], correta: 1, porque: "Trata só o erro esperado e conta, em vez de esconder.", conceito: "vc_erros" },
      { pergunta: "Para que serve o `raise`?", opcoes: ["Esconder um erro de vista", "Acelerar o programa todo", "Provocar um erro de propósito", "Apagar uma variável criada"], correta: 2, porque: "Serve para não deixar um dado inválido passar.", conceito: "vc_erros" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: qual a diferença entre tratar um erro e escondê-lo?", conceito: "vc_erros", modelo: "**Tratar** é pegar o erro esperado (`except ValueError`), **contar ou registrar** e seguir. **Esconder** é um `pass` que faz o problema sumir sem aviso. Erros inesperados ou graves devem subir com `raise`." },
  ],
  recuperacao: [
    { p: "Para que serve o try/except?", regex: "(tenta|erro|falh);;(nao para|seguir|continu|em vez de parar|tratar|trata)", modelo: "Para tentar um bloco e tratar o erro, sem o programa parar.", conceito: "vc_erros" },
    { p: "Por que um `except` com `pass` é perigoso?", regex: "(escond|sem aviso|silenc|ninguem|some)", modelo: "Porque esconde o erro: ninguém fica sabendo do problema.", conceito: "vc_erros" },
    { p: "O que o `raise` faz?", regex: "(provoca|levanta|lanca|gera|cria);;(erro|excecao)", modelo: "Provoca um erro de propósito.", conceito: "vc_erros" },
  ],
});

// ---------- Aula 0089: diff e riscos ----------
aulas.push({
  id: "0089", modulo: 11, n: 7, slug: "diff-e-riscos", titulo: "Mudanças pequenas, revisão do diff e riscos",
  resumo: "Peça uma mudança de cada vez, leia só o que mudou (o diff) e procure sinais de risco: segredos, dependências estranhas e código que apaga ou envia coisas.",
  objetivos: ["Pedir uma mudança pequena e ler o diff.", "Reconhecer os três riscos principais de código gerado.", "Trocar uma ação perigosa por uma simulação segura."],
  conceitos: [["vc_riscos", "Revisão do diff e riscos"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você pediu à IA para “melhorar o programa” e ela devolveu o arquivo inteiro reescrito. Dá para saber o que mudou? Que pedido seria melhor?", modelo: "Quase impossível conferir tudo de novo. Um pedido **pequeno e específico** (“acrescente o filtro por dia, sem mudar o resto”) devolve **poucas linhas diferentes**, e isso eu consigo revisar com cuidado." },
    { tipo: "texto", titulo: "Ler só o que mudou", blocos: [
      "O **diff** é a lista do que mudou entre duas versões: linhas com **-** foram removidas e linhas com **+** foram adicionadas. Se o pedido foi pequeno, o diff é pequeno e dá para conferir linha a linha, como na aula 3.",
      "Cada diff pede três perguntas: **o que mudou foi só o que eu pedi?** Entrou alguma linha que **mexe fora** do programa? Os meus **testes** continuam passando?",
    ], tabela: { cab: ["Sinal", "Linha do diff", "Leitura"], linhas: [["-", "    contagem = {}", "linha removida"], ["+", "    contagem = {\"INFO\": 0, \"WARNING\": 0, \"ERROR\": 0}", "linha adicionada (níveis sempre aparecem)"], ["+", "    # enviar resumo por e-mail", "linha adicionada que ninguém pediu: desconfiar"]] },
      termos: [["Diff", "a diferença entre duas versões do código: o que saiu e o que entrou."], ["Dependência", "um pacote de terceiros que o programa precisa instalar."], ["Segredo", "senha, chave ou token que dá acesso a um serviço."]] },
    { tipo: "prever", texto: "Use o diff da tabela acima. Responda com um número ou uma palavra.", conceito: "vc_riscos", itens: [
      { pergunta: "Quantas linhas foram adicionadas no diff?", rotulo: "Item 1", resposta: ["2"], porque: "Duas linhas começam com +." },
      { pergunta: "Quantas linhas foram removidas?", rotulo: "Item 2", resposta: ["1"], porque: "Só uma linha tem -." },
      { pergunta: "A linha do e-mail deve ser aceita? (sim ou não)", rotulo: "Item 3", resposta: ["não", "nao"], porque: "Ninguém pediu: envia dados para fora e fica de fora da especificação." }] },
    { tipo: "texto", titulo: "Os três riscos", blocos: [
      "**Segredos no código**: uma chave escrita no arquivo pode vazar quando o arquivo é copiado ou publicado. Chaves ficam fora do código e não vão para pedidos à IA.",
      "**Dependências desconhecidas**: se o código manda instalar um pacote que você nunca ouviu falar, pesquise antes (nome, quem mantém, se é mesmo necessário). Nome parecido com um pacote famoso é sinal de alerta.",
      "**Código que apaga ou envia**: linhas como `os.remove`, `shutil.rmtree`, `requests.post` ou `smtplib` agem fora do programa e podem não ter volta. A regra é: **começar simulando**.",
    ], tabela: { cab: ["Risco", "Sinal no código", "O que fazer"], linhas: [["Segredo", "`senha = \"...\"`, `token = \"...\"`", "tirar do código; nunca colar em pedido"], ["Dependência", "`pip install` ou `import` de nome desconhecido", "pesquisar ou pedir para não usar"], ["Apagar ou enviar", "`os.remove`, `rmtree`, `requests`, `smtplib`", "rodar em modo simulação primeiro"]] } },
    { tipo: "exemplo", arquivo: "detector.py", texto: "Um detector simples de sinais de risco. Ele procura palavras suspeitas num código gerado (fictício).",
      codigo: [["sinais = [\"os.remove\", \"rmtree\", \"requests\", \"smtplib\", \"token\", \"senha\"]", "As palavras que pedem atenção."], ["codigo_gerado = \"\"\"", "O código gerado fica num texto, só para analisar."], ["import requests", "Uma importação que fala com a internet."], ["token = \"XXXX-FICTICIO\"", "Um segredo (fictício) escrito no código."], ["requests.post(\"endereco-ficticio\", token)", "Um envio de dados para fora."], ["\"\"\"", "Fim do texto."], ["for s in sinais:", "Para cada sinal da lista..."], ["    if s in codigo_gerado.lower():", "...vê se ele aparece no código (em minúsculas)."], ["        print(\"atenção:\", s)", "Mostra o que achou. É só um filtro: a leitura continua sendo sua."]] },
    { tipo: "corrigir", texto: "A IA gerou uma limpeza que **apaga de verdade** por padrão (`confirmar=True`). Conserte para que, sem pedir, ela apenas **simule**.", arquivo: "gerado_com_defeito.py", dica: "Troque o valor padrão do parâmetro: `confirmar=False`.", conceito: "vc_riscos",
      codigo: `def pedidos_antigos(pedidos, corte):
    return [p["id"] for p in pedidos if p["dia"] < corte]

def limpar(pedidos, corte, confirmar=True):
    ids = pedidos_antigos(pedidos, corte)
    if not confirmar:
        print("SIMULAÇÃO: apagaria", len(ids), "pedidos")
        return pedidos
    return [p for p in pedidos if p["id"] not in ids]

lista = [{"id": 1, "dia": "2026-02-01"}, {"id": 2, "dia": "2026-02-10"}, {"id": 3, "dia": "2026-03-05"}]
resultado = limpar(lista, "2026-03-01")
print(len(resultado))`, esperado: ["SIMULAÇÃO: apagaria 2 pedidos", "3"],
      solucao: `def pedidos_antigos(pedidos, corte):
    return [p["id"] for p in pedidos if p["dia"] < corte]

def limpar(pedidos, corte, confirmar=False):
    ids = pedidos_antigos(pedidos, corte)
    if not confirmar:
        print("SIMULAÇÃO: apagaria", len(ids), "pedidos")
        return pedidos
    return [p for p in pedidos if p["id"] not in ids]

lista = [{"id": 1, "dia": "2026-02-01"}, {"id": 2, "dia": "2026-02-10"}, {"id": 3, "dia": "2026-03-05"}]
resultado = limpar(lista, "2026-03-01")
print(len(resultado))` },
    { tipo: "escrever", texto: "Escreva `achar_sinais(codigo)`, que devolve a lista de sinais de risco (de `SINAIS`) que aparecem no texto `codigo`, em minúsculas, na ordem da lista.", arquivo: "meu_programa.py",
      inicial: `SINAIS = ["os.remove", "rmtree", "requests", "smtplib", "token", "senha"]

def achar_sinais(codigo):
    # devolva a lista de sinais encontrados
    pass
`, testes: [["achar_sinais('import requests\\ntoken = \"x\"')", "['requests', 'token']"], ["achar_sinais('print(1)')", "[]"], ["achar_sinais('os.remove(a)')", "['os.remove']"]], dica: "Crie uma lista `achados`, percorra `SINAIS` e, se `s in codigo.lower()`, use `achados.append(s)`.", conceito: "vc_riscos",
      solucao: `SINAIS = ["os.remove", "rmtree", "requests", "smtplib", "token", "senha"]

def achar_sinais(codigo):
    achados = []
    for s in SINAIS:
        if s in codigo.lower():
            achados.append(s)
    return achados
` },
    { tipo: "aberta", tag: "sec", titulo: "A chave no código", texto: "Para “facilitar”, a IA gerou um script com uma chave de acesso escrita direto no arquivo. Você vai enviar o arquivo para um colega e guardá-lo num repositório compartilhado.", pergunta: "Qual é o risco? Que mudança você pediria à IA?", modelo: "A chave **vaza** com o arquivo: qualquer pessoa com a cópia usa o serviço no seu nome. Eu pediria para **tirar a chave do código** e lê-la de fora (por exemplo, de uma variável de ambiente), e **revogaria** a chave que já tenha sido exposta." },
    { tipo: "quiz", itens: [
      { pergunta: "Como pedir uma mudança, de preferência?", opcoes: ["Pequena e bem específica", "Grande e bem geral", "Vários pedidos de uma vez", "Sem dizer o que manter"], correta: 0, porque: "Mudança pequena gera um diff pequeno, fácil de revisar.", conceito: "vc_riscos" },
      { pergunta: "O que é um diff?", opcoes: ["Um erro de sintaxe", "Uma lista de testes", "O que mudou no código", "Uma biblioteca nova"], correta: 2, porque: "Mostra as linhas removidas e as adicionadas.", conceito: "vc_riscos" },
      { pergunta: "Antes de apagar de verdade, o melhor é:", opcoes: ["Apagar e conferir depois", "Simular e ver o resultado", "Apagar só de madrugada", "Pedir à IA para apagar"], correta: 1, porque: "A simulação mostra o que seria apagado, sem perder nada.", conceito: "vc_riscos" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: por que pedir mudanças pequenas e quais são três riscos a procurar no código gerado?", conceito: "vc_riscos", modelo: "Mudanças pequenas geram um **diff pequeno**, que dá para revisar. Os riscos: **segredos** escritos no código, **dependências** desconhecidas e código que **apaga ou envia** coisas (começar em modo simulação)." },
  ],
  recuperacao: [
    { p: "Por que pedir mudanças pequenas à IA?", regex: "(diff|revis|conferi|ler|leia|entend|pequen)", modelo: "Porque o diff fica pequeno e dá para revisar com cuidado.", conceito: "vc_riscos" },
    { p: "Cite pelo menos dois riscos de código gerado.", regex: "(segredo|senha|chave|token|dependenc|pacote|apag|envi)", modelo: "Segredos no código, dependências desconhecidas e código que apaga ou envia coisas.", conceito: "vc_riscos" },
    { p: "O que fazer antes de rodar um código que apaga arquivos ou dados?", regex: "(simul|testar sem|ensaio|nao apagar|so mostrar)", modelo: "Rodar em modo simulação, que só mostra o que seria apagado.", conceito: "vc_riscos" },
  ],
});

// ---------- Aula 0090: mini-projeto ----------
aulas.push({
  id: "0090", modulo: 11, n: 8, slug: "mini-projeto-analisador", titulo: "Mini-projeto: o analisador de log de pedidos",
  resumo: "Você especifica, recebe o código “da IA”, lê linha a linha, escreve os testes e faz o ajuste final. Depois repete o método em outro problema.",
  objetivos: ["Aplicar o ciclo inteiro em uma ferramenta pequena.", "Escrever testes para o que a especificação pede e o código esqueceu.", "Ajustar o código gerado e provar o ajuste com testes."],
  conceitos: [["vc_projeto", "Mini-projeto de ponta a ponta"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Antes de começar: quais são os passos do ciclo, em ordem, e em qual deles você acha que mais erros passam despercebidos?", modelo: "**Especificar, gerar, ler, testar e ajustar.** Costumam passar despercebidos os erros do passo **ler** (o que **falta**) e do **testar** (casos de borda que ninguém lembrou)." },
    { tipo: "texto", titulo: "Passo 1: a especificação", blocos: [
      "A loja virtual quer saber, a partir do log de pedidos, quantos eventos de cada nível ocorreram, opcionalmente em um dia específico. Esta é a **sua especificação**:",
      "**Objetivo:** contar linhas por nível. **Entrada:** `analisar(log, dia=None)`, com o log em texto (uma linha por evento: data, hora, nível e mensagem) e, opcionalmente, um dia como `\"2026-03-02\"`. **Saída:** um par `(contagem, malformadas)`, com `contagem` sendo um dicionário com INFO, WARNING e ERROR (sempre os três, mesmo que seja 0). **Regras:** ignorar linhas vazias; contar como malformada a linha com poucos campos, nível desconhecido ou data fora do formato `AAAA-MM-DD`; se `dia` for dado, contar só aquele dia. **Limites:** só ler texto; não abrir arquivos, não enviar nada, não instalar nada.",
    ] },
    { tipo: "exemplo", arquivo: "gerado_analisar.py", texto: "Passo 2: este é o código que a IA devolveu. Passo 3: leia cada linha e compare com a especificação.",
      codigo: [["def analisar(log):", "Pela especificação deveria receber também `dia=None`. Isto é o que falta nº 1."], ["    contagem = {\"INFO\": 0, \"WARNING\": 0, \"ERROR\": 0}", "Boa: os três níveis sempre aparecem."], ["    malformadas = 0", "Contador das linhas ruins: o que a especificação pediu."], ["    for linha in log.splitlines():", "Uma volta por linha."], ["        linha = linha.strip()", "Tira os espaços das pontas."], ["        if linha == \"\":", "Linha vazia..."], ["            continue", "...é ignorada, como pedido (`continue` pula para a próxima volta)."], ["        try:", "Protege o corte da linha."], ["            partes = linha.split(\" \", 3)", "Corta em até 4 pedaços."], ["            nivel = partes[2]", "Terceiro pedaço."], ["            contagem[nivel] += 1", "Soma 1. Se o nível não existir, dá `KeyError`."], ["        except (IndexError, KeyError):", "Linha curta ou nível desconhecido vira malformada. Mas o erro de data (falta nº 2) não é checado."], ["            malformadas += 1", "Conta a linha ruim em vez de esconder."], ["    return contagem, malformadas", "Devolve o par."], ["LOG = \"\"\"2026-03-01 09:00:01 INFO pedido 1001 criado", "Um log fictício para testar."], ["2026-03-01 09:05:10 WARNING estoque baixo item 77", "Um aviso."], ["2026-03-01 09:12:44 ERROR pagamento recusado pedido 1002", "Um erro."], ["2026-03-01 10:01:09 INFO pedido 1003 criado", "Normal."], ["2026-03-02 08:30:00 ERROR falha ao gerar nota pedido 1003", "Outro dia."], ["2026-03-02 08:45:12 INFO pedido 1004 criado\"\"\"", "Fim do log."], ["print(analisar(LOG))", "Mostra a contagem e as malformadas."]] },
    { tipo: "prever", texto: "Passo 3, leitura: preveja o que a versão gerada devolve (use o exemplo acima).", conceito: "vc_projeto", itens: [
      { pergunta: "Quantas linhas ERROR a versão gerada conta no log todo?", rotulo: "Item 1", resposta: ["2"], porque: "Há duas linhas de ERROR: uma em cada dia." },
      { pergunta: "Quantas linhas INFO ela conta no log todo?", rotulo: "Item 2", resposta: ["3"], porque: "Três linhas INFO." },
      { pergunta: "A versão gerada consegue filtrar por dia? (sim ou não)", rotulo: "Item 3", resposta: ["não", "nao"], porque: "A função não tem o parâmetro `dia`: é o que falta na especificação." }] },
    { tipo: "aberta", titulo: "Passo 4: os seus testes", texto: "Os testes vêm da **especificação**, não do código. Pense no log do exemplo e em linhas estranhas.", pergunta: "Escreva 4 casos de teste (entrada e resposta esperada) que você faria para esta ferramenta, incluindo pelo menos um com `dia` e um com linha malformada.", minimo: 80, conceito: "vc_projeto", modelo: "Por exemplo: (1) o log todo dá `{'INFO': 3, 'WARNING': 1, 'ERROR': 2}` e 0 malformadas; (2) `dia=\"2026-03-02\"` dá `{'INFO': 1, 'WARNING': 0, 'ERROR': 1}`; (3) um log com uma linha vazia dá o mesmo resultado, sem contá-la; (4) uma linha como `x y INFO` (data inválida) conta como **1 malformada** e não entra na contagem." },
    { tipo: "corrigir", final: true, titulo: "Passo 5: ajustar", texto: "A versão gerada não aceita `dia` e conta como válida uma linha com data inválida. Ajuste a função para cumprir a especificação (leia os testes abaixo do código).", arquivo: "analisar.py", dica: "Acrescente `dia=None` na assinatura. Depois do `split`, valide a data com `len(data) != 10 or data[4] != \"-\"` (use `raise ValueError`) e, com `dia`, pule as linhas de outro dia com `continue`. Acrescente `ValueError` ao `except`.", conceito: "vc_projeto",
      codigo: `def analisar(log):
    contagem = {"INFO": 0, "WARNING": 0, "ERROR": 0}
    malformadas = 0
    for linha in log.splitlines():
        linha = linha.strip()
        if linha == "":
            continue
        try:
            partes = linha.split(" ", 3)
            nivel = partes[2]
            contagem[nivel] += 1
        except (IndexError, KeyError):
            malformadas += 1
    return contagem, malformadas

LOG = """2026-03-01 09:00:01 INFO pedido 1001 criado
2026-03-01 09:05:10 WARNING estoque baixo item 77
2026-03-01 09:12:44 ERROR pagamento recusado pedido 1002
2026-03-01 10:01:09 INFO pedido 1003 criado
2026-03-02 08:30:00 ERROR falha ao gerar nota pedido 1003
2026-03-02 08:45:12 INFO pedido 1004 criado"""
RUIM = "x y INFO\\n\\n2026-03-01 09:00:00 ERROR falha\\ncurta"
`, testes: [["analisar(LOG)", "({'INFO': 3, 'WARNING': 1, 'ERROR': 2}, 0)"], ["analisar(LOG, '2026-03-02')", "({'INFO': 1, 'WARNING': 0, 'ERROR': 1}, 0)"], ["analisar(RUIM)", "({'INFO': 0, 'WARNING': 0, 'ERROR': 1}, 2)"], ["analisar('')", "({'INFO': 0, 'WARNING': 0, 'ERROR': 0}, 0)"]],
      solucao: `def analisar(log, dia=None):
    contagem = {"INFO": 0, "WARNING": 0, "ERROR": 0}
    malformadas = 0
    for linha in log.splitlines():
        linha = linha.strip()
        if linha == "":
            continue
        try:
            partes = linha.split(" ", 3)
            data = partes[0]
            nivel = partes[2]
            if len(data) != 10 or data[4] != "-":
                raise ValueError("data inválida")
            if dia is not None and data != dia:
                continue
            contagem[nivel] += 1
        except (IndexError, KeyError, ValueError):
            malformadas += 1
    return contagem, malformadas

LOG = """2026-03-01 09:00:01 INFO pedido 1001 criado
2026-03-01 09:05:10 WARNING estoque baixo item 77
2026-03-01 09:12:44 ERROR pagamento recusado pedido 1002
2026-03-01 10:01:09 INFO pedido 1003 criado
2026-03-02 08:30:00 ERROR falha ao gerar nota pedido 1003
2026-03-02 08:45:12 INFO pedido 1004 criado"""
RUIM = "x y INFO\\n\\n2026-03-01 09:00:00 ERROR falha\\ncurta"
` },
    { tipo: "escrever", transfer: true, titulo: "Transferência: despesas pessoais", texto: "Mesmo método, outro assunto. Um app de finanças pessoais guarda linhas como `2026-03-01 mercado 45.90` (data, categoria, valor). Escreva `somar_por_categoria(texto)`, que devolve `(totais, malformadas)`: um dicionário com a soma por categoria (arredondada a 2 casas) e quantas linhas tinham defeito (campos faltando ou valor que não é número). Linhas vazias são ignoradas.", arquivo: "meu_programa.py",
      inicial: `DESP = """2026-03-01 mercado 45.90
2026-03-01 transporte 8.50
2026-03-02 mercado 30.10
linha estranha
2026-03-03 lazer abc"""

def somar_por_categoria(texto):
    # some por categoria e conte as linhas defeituosas
    pass
`, testes: [["somar_por_categoria(DESP)", "({'mercado': 76.0, 'transporte': 8.5}, 2)"], ["somar_por_categoria('')", "({}, 0)"], ["somar_por_categoria('2026-03-05 lazer 12.345')", "({'lazer': 12.35}, 0)"]], dica: "Para cada linha não vazia: `data, categoria, valor = linha.split()` dentro de um `try` com `except ValueError`; some em um dicionário e arredonde no fim.", conceito: "vc_projeto",
      solucao: `DESP = """2026-03-01 mercado 45.90
2026-03-01 transporte 8.50
2026-03-02 mercado 30.10
linha estranha
2026-03-03 lazer abc"""

def somar_por_categoria(texto):
    totais = {}
    malformadas = 0
    for linha in texto.splitlines():
        linha = linha.strip()
        if linha == "":
            continue
        try:
            data, categoria, valor = linha.split()
            totais[categoria] = totais.get(categoria, 0) + float(valor)
        except ValueError:
            malformadas += 1
    for c in totais:
        totais[c] = round(totais[c], 2)
    return totais, malformadas
` },
    { tipo: "aberta", tag: "sec", titulo: "Antes de aceitar o código final", texto: "A IA acrescentou, “de brinde”, uma linha que grava o resultado da análise em um arquivo e outra que importa um pacote que você não conhece. Os seus testes continuam passando.", pergunta: "Você aceita o código? Escreva três perguntas da sua revisão final.", modelo: "Testes passando **não bastam**: as linhas extras **não estavam na especificação**. Eu pediria para remover as duas ou entenderia **para que servem**. Perguntas: (1) **todas as linhas foram pedidas?** (2) **que dependências entraram**? (3) **o programa mexe em algo fora dele** (arquivo, rede, apagar)?" },
    { tipo: "quiz", itens: [
      { pergunta: "O que mais vale para decidir se o código está certo?", opcoes: ["A IA garantiu que sim", "Meus testes e a leitura", "Ele rodou uma vez", "Ele é curto e limpo"], correta: 1, porque: "Só leitura e testes baseados na especificação provam o comportamento.", conceito: "vc_projeto" },
      { pergunta: "Uma linha malformada deve ser:", opcoes: ["Contada e relatada", "Escondida com `pass`", "Apagada do log", "Corrigida pela IA"], correta: 0, porque: "Contar permite saber se o resultado merece confiança.", conceito: "vc_projeto" },
      { pergunta: "Se um teste falha depois do ajuste:", opcoes: ["Apago o teste que falhou", "Mudo a resposta esperada", "Leio o diff e ajusto o código", "Rodo de novo até passar"], correta: 2, porque: "O teste vem da especificação; ajusta-se o código.", conceito: "vc_projeto" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: descreva como você usou o ciclo (especificar, gerar, ler, testar, ajustar) neste mini-projeto.", conceito: "vc_projeto", modelo: "Escrevi a **especificação** (entrada, saída, regras, limites); a IA **gerou** o código; eu **li** e vi o que faltava (o parâmetro `dia` e a validação da data); escrevi **testes** a partir da especificação; e **ajustei** o código até todos passarem, sem esconder erros." },
  ],
  recuperacao: [
    { p: "Por que os testes devem vir da especificação, e não do código gerado?", regex: "(especific);;(codigo|propri|mesmo|erro)", modelo: "Porque o teste deve conferir a especificação, e não repetir o erro do código.", conceito: "vc_projeto" },
    { p: "O que fazer com uma linha malformada no log?", regex: "(cont|registr|relat|report|mostr|avis)", modelo: "Contar e relatar, em vez de esconder.", conceito: "vc_projeto" },
    { p: "Por que testes passando não bastam para aceitar o código?", regex: "(nao pedi|nao estava|especific|extra|a mais|fora|risco)", modelo: "Porque o código pode ter linhas extras, fora da especificação, que mexem fora do programa.", conceito: "vc_projeto" },
  ],
});

export default aulas;
