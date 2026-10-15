// Módulo 6: Erros, testes e depuração (universal). Fio condutor: um script de caixa com defeitos que o robô aprende a achar e a provar corrigidos.
export const meta = {
  final: "Mini-projeto: consertar o script do caixa e provar com testes",
  transfer: "Testar uma função de reajuste de preço",
};
const aulas = [];

// ---------- Aula 43: ler o erro ----------
aulas.push({
  id: "0043", modulo: 6, n: 1, slug: "ler-o-erro", titulo: "O erro é uma mensagem, não uma bronca",
  resumo: "Quando o Python para, ele diz onde e por quê. Hoje você aprende a ler essa mensagem de baixo para cima.",
  objetivos: ["Achar o tipo do erro, a linha e a explicação numa mensagem.", "Ler a mensagem a partir da última linha.", "Usar a mensagem para consertar sem chutar."],
  conceitos: [["erro_ler", "Ler a mensagem de erro"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O programa parou e apareceu um texto vermelho cheio de linhas. Que informações úteis você espera encontrar nele para descobrir o que houve?", modelo: "O **tipo** do erro, uma **explicação** curta e a **linha** do programa onde a coisa aconteceu. A mensagem existe para ajudar, e a parte mais útil costuma ser a **última linha**." },
    { tipo: "exemplo", arquivo: "erro_leitura.py", texto: "Este programa está correto. Leia as notas para ver o que o Python diria se cada linha estivesse errada.",
      codigo: [["precos = [4.5, 3.0]", "A lista tem duas posições: 0 e 1."], ["print(precos[1])", "Mostra `3.0`. Se fosse `precos[2]`, o Python pararia com `IndexError: list index out of range` (posição fora da lista)."], ["print(precos)", "Mostra a lista toda. Se estivesse escrito `preco` (sem o s), seria `NameError: name 'preco' is not defined` (nome que não existe)."], ["print(precos[0])", "Mostra `4.5`. Na mensagem de erro, a **última linha** diz o tipo e a explicação, e as linhas de cima dizem o lugar."]],
      termos: [["Traceback", "o relatório do erro: mostra o caminho percorrido e termina com o tipo e a explicação."], ["Tipo do erro", "a primeira palavra da última linha, como `NameError` ou `IndexError`."]] },
    { tipo: "executar", texto: "Rode e depois apague a linha final do `print` para ver que ela era o que mostrava o resultado.", arquivo: "erro_leitura.py (pode editar)", codigo: `precos = [4.5, 3.0]
print(precos[0])`,
      prever: { enunciado: "Antes de testar, qual é o **tipo do erro**?", conceito: "erro_ler", itens: [{ codigo: "print(preco)", erro: "NameError", resposta: "NameError", pergunta: "Tipo do erro:", porque: "O nome `preco` nunca foi criado." }, { codigo: `lista = [1, 2]
print(lista[5])`, erro: "IndexError", resposta: "IndexError", pergunta: "Tipo do erro:", porque: "A posição 5 não existe." }] } },
    { tipo: "descobrir", texto: "Cada programa abaixo mostra algo ou falha. Observe o que muda.", arquivo: "ordem.py", codigo: `print(a)
a = 1`,
      execucoes: [{ prefixo: "a = 0", saida: ["0"] }, { prefixo: "a = 5", saida: ["5"] }], colunas: ["Antes", "O que aparece"],
      pergunta: "Se `a = 1` ficasse **depois** do `print(a)` sem nenhum valor antes, o que o Python diria e por quê?", dicas: ["O programa executa de cima para baixo.", "Quando o `print(a)` roda, a variável `a` já existe?"],
      explicacao: "Diria `NameError`: o Python executa de cima para baixo e, quando chega ao `print(a)`, ainda não conhece `a`. Variável precisa ser criada **antes** de ser usada.", conceito: "erro_ler" },
    { tipo: "prever", conceito: "erro_ler", itens: [
      { codigo: 'print("oi" + 1)', erro: "TypeError", resposta: "TypeError", pergunta: "Tipo do erro:", porque: "Não dá para somar texto com número." },
      { codigo: 'print(int("abc"))', erro: "ValueError", resposta: "ValueError", pergunta: "Tipo do erro:", porque: "“abc” não vira número." },
      { codigo: 'd = {"a": 1}\nprint(d["b"])', erro: "KeyError", resposta: "KeyError", pergunta: "Tipo do erro:", porque: "A chave “b” não existe." },
      { codigo: "print(10 / 0)", erro: "ZeroDivisionError", resposta: "ZeroDivisionError", pergunta: "Tipo do erro:", porque: "Dividir por zero é impossível." }] },
    { tipo: "corrigir", texto: "O programa dá `NameError`. Conserte **uma linha**.", arquivo: "com_defeito.py", dica: "Confira a escrita do nome da variável.", conceito: "erro_ler",
      codigo: `total = 10
print(totl)`, esperado: ["10"],
      solucao: `total = 10
print(total)` },
    { tipo: "escrever", texto: "Escreva um programa que cria `lista = [1, 2, 3]` e mostra o **último** item (3) sem causar `IndexError`.", arquivo: "meu_programa.py",
      inicial: `lista = [1, 2, 3]
# mostre o último item
`, esperado: ["3"], dica: "A última posição de uma lista de 3 itens é a 2 (ou -1).", conceito: "erro_ler",
      solucao: `lista = [1, 2, 3]
print(lista[-1])` },
    { tipo: "aberta", tag: "sec", titulo: "Colar o erro inteiro", texto: "Para pedir ajuda, uma pessoa copia a mensagem de erro **inteira** e cola num chat público. O trecho contém o caminho da pasta dela (com o nome do usuário) e um pedaço de código com uma senha.", pergunta: "O que há de arriscado? O que revisar antes de colar?", modelo: "A mensagem pode revelar **nomes de pessoas, pastas e dados internos**, e o código pode ter **senhas ou chaves**. Antes de colar, **leia e apague** o que for sensível, ou reproduza o erro com dados fictícios." },
    { tipo: "quiz", itens: [
      { pergunta: "Por onde começar a ler uma mensagem de erro?", opcoes: ["Pela última linha", "Pela primeira linha", "Pela linha mais longa", "Por qualquer linha"], correta: 0, porque: "A última linha traz o tipo do erro e a explicação.", conceito: "erro_ler" },
      { pergunta: "O que `NameError` indica?", opcoes: ["Texto mal escrito", "Nome não existente", "Número muito grande", "Lista sem itens"], correta: 1, porque: "O Python não conhece o nome usado.", conceito: "erro_ler" },
      { pergunta: "A mensagem de erro serve para:", opcoes: ["Culpar quem escreveu", "Apagar o programa", "Dar pistas do defeito", "Acelerar a execução"], correta: 2, porque: "Ela diz o tipo, a explicação e o lugar do problema.", conceito: "erro_ler" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como ler uma mensagem de erro do Python?", conceito: "erro_ler", modelo: "Começando pela última linha: o tipo do erro e a explicação dizem o que houve, e o número da linha diz onde. Com isso se conserta sem chutar." },
  ],
  recuperacao: [
    { p: "Por onde se começa a ler uma mensagem de erro?", regex: "(ultima)", modelo: "Pela última linha.", conceito: "erro_ler" },
    { p: "O que o `NameError` quer dizer?", regex: "(nome);;(nao existe|nao foi criad|nao definid|nao existente|nao conhece)", modelo: "O nome usado não existe (não foi criado).", conceito: "erro_ler" },
    { p: "Por que não colar o erro inteiro num chat público sem revisar?", regex: "(senha|chave|sensiv|pasta|nome|dados|revis|expoe)", modelo: "Porque pode conter senhas, nomes e caminhos internos.", conceito: "erro_ler" },
  ],
});

// ---------- Aula 44: tipos de erro ----------
aulas.push({
  id: "0044", modulo: 6, n: 2, slug: "tipos-de-erro", titulo: "Os erros mais comuns e o que cada um quer dizer",
  resumo: "Seis erros aparecem 90% das vezes. Reconhecer o nome já diz onde olhar.",
  objetivos: ["Associar cada tipo de erro à sua causa típica.", "Distinguir erro que para o programa de erro de lógica.", "Consertar o erro mais provável a partir do nome."],
  conceitos: [["erro_tipos", "Tipos de erro comuns"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Se o programa mostrasse só o **nome** do erro (sem mais nada), que pistas cada nome daria? Por exemplo: `TypeError`, `ValueError`, `KeyError`.", modelo: "Cada nome aponta uma família de causas: **Type** é tipo errado (texto no lugar de número), **Value** é o tipo certo com valor impossível (`int(\"abc\")`) e **Key** é uma chave inexistente num dicionário." },
    { tipo: "exemplo", arquivo: "tipos_de_erro.py", texto: "Este programa está correto. As notas dizem qual erro cada linha causaria se estivesse errada.",
      codigo: [["idade = int(\"30\")", "Converter “30” funciona. `int(\"trinta\")` daria `ValueError`."], ["soma = idade + 5", "Número com número funciona. `idade + \"5\"` daria `TypeError`."], ["itens = [1, 2, 3]", "Posições 0, 1, 2. Pedir a 3 daria `IndexError`."], ["d = {\"a\": 1}", "Só existe a chave “a”. Pedir `d[\"b\"]` daria `KeyError`."], ["print(soma)", "Mostra `35`. Um `print(` sem fechar daria `SyntaxError`."]],
      termos: [["SyntaxError", "o código está escrito de forma que o Python não entende (parêntese ou aspas faltando)."], ["Erro de lógica", "o programa roda sem aviso, mas dá o resultado errado."]] },
    { tipo: "executar", texto: "Rode e depois troque `\"30\"` por `\"trinta\"` para ver o `ValueError`.", arquivo: "tipos_de_erro.py (pode editar)", codigo: `idade = int("30")
print(idade + 5)`,
      prever: { enunciado: "Antes de testar:", conceito: "erro_tipos", itens: [{ codigo: 'print(int("12") + 1)', resposta: "13", porque: "“12” vira o número 12." }, { codigo: 'print("a" * 3)', resposta: "aaa", porque: "Texto vezes número repete o texto." }] } },
    { tipo: "descobrir", texto: "O programa converte e soma 10.", arquivo: "converter.py", codigo: `print(int(t) + 10)`,
      execucoes: [{ prefixo: 't = "5"', saida: ["15"] }, { prefixo: 't = "20"', saida: ["30"] }, { prefixo: 't = "0"', saida: ["10"] }], colunas: ["Valor de t", "O que aparece"],
      pergunta: "Que tipo de texto faz o `int(t)` funcionar? Qual erro apareceria com `t = \"abc\"`?", dicas: ["Os valores acima têm algo em comum?", "Pense em qual erro acontece quando o tipo é certo, mas o conteúdo não serve."],
      explicacao: "Só textos que **parecem número** podem virar número. Com `\"abc\"` o tipo (texto) é aceito pelo `int`, mas o **valor** não serve: dá `ValueError`.", conceito: "erro_tipos" },
    { tipo: "prever", conceito: "erro_tipos", itens: [
      { codigo: 'print("Total: " + 10)', erro: "TypeError", resposta: "TypeError", pergunta: "Tipo do erro:", porque: "Texto e número não se somam." },
      { codigo: 'print(float("x"))', erro: "ValueError", resposta: "ValueError", pergunta: "Tipo do erro:", porque: "“x” não vira decimal." },
      { codigo: 'print([1, 2][2])', erro: "IndexError", resposta: "IndexError", pergunta: "Tipo do erro:", porque: "Só existem as posições 0 e 1." },
      { codigo: 'print({"a": 1}["z"])', erro: "KeyError", resposta: "KeyError", pergunta: "Tipo do erro:", porque: "A chave não existe." }] },
    { tipo: "corrigir", texto: "O programa dá `TypeError`. Conserte **uma linha** para mostrar `Total: 15`.", arquivo: "com_defeito.py", dica: "Transforme o número em texto com `str(...)` ou use vírgula no `print`.", conceito: "erro_tipos",
      codigo: `total = 10 + 5
print("Total: " + total)`, esperado: ["Total: 15"],
      solucao: `total = 10 + 5
print("Total: " + str(total))` },
    { tipo: "escrever", texto: "Peça `Idade: ` (texto), converta para número e mostre `Ano que vem: N` (idade mais 1).", arquivo: "meu_programa.py",
      inicial: `idade = input("Idade: ")
# converta e mostre
`, cenarios: [{ entradas: ["30"], esperado: ["Idade: 30", "Ano que vem: 31"] }, { entradas: ["0"], esperado: ["Idade: 0", "Ano que vem: 1"] }, { entradas: ["99"], esperado: ["Idade: 99", "Ano que vem: 100"] }], dica: "`int(idade) + 1`.", conceito: "erro_tipos",
      solucao: `idade = input("Idade: ")
print("Ano que vem:", int(idade) + 1)` },
    { tipo: "aberta", tag: "sec", titulo: "Esconder o erro?", texto: "Para não assustar o usuário, o programa captura **todo e qualquer erro** e mostra só “Algo deu errado”, sem registrar nada.", pergunta: "Por que isso atrapalha quem mantém o sistema? O que registrar (e o que não registrar)?", modelo: "Sem registro, ninguém sabe **o que deu errado, onde e quando**, e o defeito volta sempre. Registre o **tipo do erro, o lugar e o horário**, mas **não grave dados pessoais ou senhas** no registro." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual erro aparece em `\"a\" + 1`?", opcoes: ["ValueError", "TypeError", "KeyError", "IndexError"], correta: 1, porque: "Tipos diferentes que não se somam.", conceito: "erro_tipos" },
      { pergunta: "`ValueError` aparece quando:", opcoes: ["O tipo serve, o valor não", "O nome não existe mais", "Falta um parêntese ali", "A lista está vazia já"], correta: 0, porque: "Ex.: `int(\"abc\")`: aceita texto, mas esse texto não serve.", conceito: "erro_tipos" },
      { pergunta: "Um erro de lógica é um erro que:", opcoes: ["Sempre trava tudo", "Mostra a mensagem", "Dá resultado errado", "Falta parêntese"], correta: 2, porque: "O programa roda, mas o resultado está errado.", conceito: "erro_tipos" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: cite três tipos de erro e a causa típica de cada um.", conceito: "erro_tipos", modelo: "`TypeError`: misturar tipos (texto com número). `ValueError`: valor impossível, como `int(\"abc\")`. `KeyError`: chave inexistente. Também `IndexError` (posição fora da lista) e `NameError` (nome inexistente)." },
  ],
  recuperacao: [
    { p: "Quando acontece um `TypeError`?", regex: "(tipo);;(misturar|somar|texto|diferent|errado)", modelo: "Quando se mistura tipos que não combinam, como somar texto com número.", conceito: "erro_tipos" },
    { p: "Quando acontece um `KeyError`?", regex: "(chave);;(nao existe|inexistente|nao ha|nao encontr)", modelo: "Quando se pede uma chave que não existe no dicionário.", conceito: "erro_tipos" },
    { p: "Por que não esconder todos os erros sem registrar nada?", regex: "(registr|log|saber|descobr|manut|onde|nunca|volta)", modelo: "Porque ninguém descobre o que deu errado; registra-se o tipo e o lugar, sem dados pessoais.", conceito: "erro_tipos" },
  ],
});

// ---------- Aula 45: depurar com print ----------
aulas.push({
  id: "0045", modulo: 6, n: 3, slug: "depurar-com-print", titulo: "Quando não há erro, mas o resultado está errado",
  resumo: "O pior defeito é o que roda sem avisar. A técnica mais simples: mostrar os valores no meio do caminho.",
  objetivos: ["Reconhecer um erro de lógica.", "Usar `print` para espiar valores intermediários.", "Achar a linha onde o valor sai do esperado."],
  conceitos: [["depurar_print", "Depurar espiando valores"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O programa roda sem nenhuma mensagem vermelha, mas o total da compra está errado. Como descobrir **em qual passo** o valor deixou de estar certo?", modelo: "Mostrando os valores **no meio do caminho**: depois de cada passo importante, um `print` com o valor. O primeiro ponto em que o valor não é o esperado indica **onde** está o defeito." },
    { tipo: "exemplo", arquivo: "espiando.py", texto: "Clique em cada linha.",
      codigo: [["preco = 4.5", "O preço de uma unidade."], ["qtd = 3", "A quantidade."], ["subtotal = preco + qtd", "Defeito: deveria ser `preco * qtd`."], ["print(\"subtotal:\", subtotal)", "O `print` de espiar mostra `7.5`, mas o esperado era `13.5`: o defeito está na linha de cima."], ["total = subtotal - 2", "O desconto de 2 reais."], ["print(total)", "O resultado final sai errado por causa do passo anterior."]],
      termos: [["Depurar", "procurar e corrigir defeitos."], ["Valor intermediário", "um valor no meio do caminho, entre a entrada e o resultado final."]] },
    { tipo: "executar", texto: "Rode, compare com o esperado (13.5) e conserte a conta.", arquivo: "espiando.py (pode editar)", codigo: `preco = 4.5
qtd = 3
subtotal = preco + qtd
print("subtotal:", subtotal)`,
      prever: { enunciado: "Antes de testar:", conceito: "depurar_print", itens: [{ codigo: `a = 2
b = 3
print(a + b)`, resposta: "5", porque: "Soma de 2 e 3." }, { codigo: `a = 2
b = 3
print(a * b)`, resposta: "6", porque: "Multiplicação de 2 por 3." }] } },
    { tipo: "descobrir", texto: "O programa calcula um valor com um defeito.", arquivo: "defeito.py", codigo: `print(p + q)`,
      execucoes: [{ prefixo: "p, q = 2, 2", saida: ["4"] }, { prefixo: "p, q = 2, 3", saida: ["5"] }, { prefixo: "p, q = 10, 0", saida: ["10"] }], colunas: ["Valores", "O que aparece"],
      pergunta: "Se o objetivo era o **produto** (p × q), qual valor engana, porque dá o resultado certo por coincidência? O que isso ensina sobre testar com um valor só?", dicas: ["Calcule p × q em cada linha e compare com o que apareceu.", "Em qual linha somar e multiplicar dão o mesmo resultado?"],
      explicacao: "Com `p, q = 2, 2` a soma e o produto dão **4**, e o defeito passa despercebido. Nas outras linhas o resultado está errado (5 em vez de 6; 10 em vez de 0). A lição: um **único** valor de teste pode esconder o defeito, por isso se testam **vários** valores.", conceito: "depurar_print" },
    { tipo: "prever", conceito: "depurar_print", itens: [
      { codigo: `n = 5
n = n + 1
n = n * 2
print(n)`, resposta: "12", porque: "5 + 1 = 6; 6 × 2 = 12." },
      { codigo: `x = 10
x = x - 3
print(x)`, resposta: "7", porque: "10 − 3." },
      { codigo: `t = 0
for i in range(3):
    t = t + i
print(t)`, resposta: "3", porque: "0 + 1 + 2." }] },
    { tipo: "corrigir", texto: "O total do pedido de 3 cafés a 4.5 deveria ser 13.5, mas o programa mostra outro valor. Ache e conserte **uma linha**.", arquivo: "com_defeito.py", dica: "Use um `print` de espiar depois de cada passo.", conceito: "depurar_print",
      codigo: `preco = 4.5
qtd = 3
total = preco + qtd
print(total)`, esperado: ["13.5"],
      solucao: `preco = 4.5
qtd = 3
total = preco * qtd
print(total)` },
    { tipo: "escrever", texto: "Calcule o preço de `qtd = 4` itens de `preco = 2.5` com desconto de 10% e mostre `Total: 9.0`. Mostre também, antes, `Subtotal: 10.0` (espiando o valor intermediário).", arquivo: "meu_programa.py",
      inicial: `preco = 2.5
qtd = 4
# mostre o subtotal e depois o total com 10% de desconto
`, esperado: ["Subtotal: 10.0", "Total: 9.0"], dica: "`subtotal = preco * qtd` e `total = subtotal * 0.9`.", conceito: "depurar_print",
      solucao: `preco = 2.5
qtd = 4
subtotal = preco * qtd
print("Subtotal:", subtotal)
total = subtotal * 0.9
print("Total:", total)` },
    { tipo: "aberta", tag: "sec", titulo: "O print que ficou", texto: "Durante a depuração, o programador imprimiu o **cartão e a senha** do cliente para conferir. Esqueceu de apagar o `print`, e o programa subiu para produção assim.", pergunta: "O que pode acontecer? Que cuidado ter ao depurar com dados reais?", modelo: "Os dados saem em **registros e telas** que outras pessoas leem. Depure com **dados fictícios**, nunca imprima segredos e **revise o código antes de publicar**, removendo os `print` de depuração." },
    { tipo: "quiz", itens: [
      { pergunta: "O que é um erro de lógica?", opcoes: ["Parar com mensagem", "Dar resultado errado", "Faltar um parêntese", "Usar nome sem criar"], correta: 1, porque: "O programa roda, mas o resultado não é o esperado.", conceito: "depurar_print" },
      { pergunta: "Para que serve um `print` no meio do programa?", opcoes: ["Espiar valores intermediários", "Deixar o código rápido", "Evitar todos os erros", "Apagar variáveis antigas"], correta: 0, porque: "Mostra o valor naquele ponto e ajuda a achar onde ele sai errado.", conceito: "depurar_print" },
      { pergunta: "Como achar a linha do defeito com `print`?", opcoes: ["Imprimir só o final", "Imprimir só o começo", "Ver o primeiro valor errado", "Imprimir tudo sempre"], correta: 2, porque: "O primeiro ponto com valor errado indica o defeito.", conceito: "depurar_print" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como achar um defeito quando o programa roda sem erro, mas dá resultado errado?", conceito: "depurar_print", modelo: "Mostrando os valores intermediários com `print` depois de cada passo e comparando com o esperado; o primeiro valor errado aponta a linha do defeito." },
  ],
  recuperacao: [
    { p: "O que é um erro de lógica?", regex: "(resultado errado|errado|sem aviso|sem erro|nao esperado)", modelo: "O programa roda, mas dá o resultado errado.", conceito: "depurar_print" },
    { p: "Como o `print` ajuda a achar um defeito?", regex: "(valor|intermediar|meio|espi|passo)", modelo: "Mostra os valores no meio do caminho, e o primeiro errado indica o defeito.", conceito: "depurar_print" },
    { p: "Por que não depurar com dados reais de clientes?", regex: "(fictici|vaza|expoe|sensiv|esquec|producao|registro|dados reais)", modelo: "Porque os dados podem vazar em registros ou na produção; use dados fictícios.", conceito: "depurar_print" },
  ],
});

// ---------- Aula 46: assert ----------
aulas.push({
  id: "0046", modulo: 6, n: 4, slug: "testes-com-assert", titulo: "O programa se confere sozinho: assert",
  resumo: "Em vez de olhar o resultado com os olhos, você escreve a resposta certa no código, e o programa avisa se não bate.",
  objetivos: ["Escrever `assert` para conferir um resultado.", "Ler uma falha de `assert`.", "Testar uma função pequena."],
  conceitos: [["assert_teste", "Testar com assert"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você tem uma função que calcula o preço com desconto. Em vez de rodar e conferir o resultado olhando, como fazer o **próprio programa** dizer se o resultado está certo?", modelo: "Escrevendo, no código, **o que deveria dar** (a resposta certa) e pedindo ao programa para comparar. Se não bater, ele **para e avisa**. Em Python isso é o `assert`." },
    { tipo: "exemplo", arquivo: "assert.py", texto: "Clique em cada linha.",
      codigo: [["def com_desconto(preco):", "Uma função: recebe um preço."], ["    return preco * 0.9", "Devolve o preço com 10% de desconto."], ["assert com_desconto(100) == 90", "Afirma que `com_desconto(100)` é `90`. Se for, nada acontece."], ["assert com_desconto(0) == 0", "Mais um caso: preço zero."], ["print(\"tudo certo\")", "Só chega aqui se **todos** os asserts passaram."]],
      termos: [["assert", "“afirmo que isto é verdade”: se for falso, o programa para com `AssertionError`."], ["Caso de teste", "um exemplo com entrada e resposta esperada."]] },
    { tipo: "executar", texto: "Rode e depois troque o `90` por `91` para ver o teste falhar.", arquivo: "assert.py (pode editar)", codigo: `def com_desconto(preco):
    return preco * 0.9

assert com_desconto(100) == 90
print("tudo certo")`,
      prever: { enunciado: "Antes de testar:", conceito: "assert_teste", itens: [{ codigo: `assert 2 + 2 == 4
print("ok")`, resposta: "ok", porque: "A afirmação é verdadeira." }, { codigo: "assert 2 + 2 == 5", erro: "AssertionError", resposta: "AssertionError", pergunta: "Tipo do erro:", porque: "A afirmação é falsa." }] } },
    { tipo: "descobrir", texto: "O programa testa um valor com `assert` e depois mostra uma mensagem.", arquivo: "teste.py", codigo: `assert x > 0
print("passou")`,
      execucoes: [{ prefixo: "x = 1", saida: ["passou"] }, { prefixo: "x = 99", saida: ["passou"] }], colunas: ["Valor de x", "O que aparece"],
      pergunta: "O que aconteceria com `x = 0`? Por que o `print` seria pulado?", dicas: ["`0 > 0` é verdadeiro ou falso?", "O que o `assert` faz quando a afirmação é falsa?"],
      explicacao: "Com `x = 0`, a afirmação `x > 0` é falsa e o `assert` **interrompe** o programa com `AssertionError`; por isso o `print` não roda.", conceito: "assert_teste" },
    { tipo: "prever", conceito: "assert_teste", itens: [
      { codigo: `def dobro(n):
    return n * 2
assert dobro(3) == 6
print("ok")`, resposta: "ok", porque: "3 × 2 é 6." },
      { codigo: `def dobro(n):
    return n + 2
assert dobro(3) == 6`, erro: "AssertionError", resposta: "AssertionError", pergunta: "Tipo do erro:", porque: "A função soma em vez de multiplicar; `3 + 2` é 5." },
      { codigo: `def eh_par(n):
    return n % 2 == 0
assert eh_par(4)
assert not eh_par(5)
print("ok")`, resposta: "ok", porque: "4 é par e 5 não é." }] },
    { tipo: "corrigir", texto: "O teste falha porque a função está errada. Conserte **a função** (não o teste).", arquivo: "com_defeito.py", dica: "O dobro é multiplicar por 2.", conceito: "assert_teste",
      codigo: `def dobro(n):
    return n + 2

assert dobro(5) == 10
print("passou")`, esperado: ["passou"],
      solucao: `def dobro(n):
    return n * 2

assert dobro(5) == 10
print("passou")` },
    { tipo: "escrever", texto: "Escreva a função `desconto(preco)`, que devolve o preço com 10% de desconto, e três `assert`: `desconto(100) == 90`, `desconto(0) == 0` e `desconto(50) == 45`. Mostre `passou` no fim.", arquivo: "meu_programa.py",
      inicial: `# escreva a função e os três asserts
`, esperado: ["passou"], testes: [["desconto(200)", "180.0"], ["desconto(10)", "9.0"]], dica: "`return preco * 0.9` e depois `assert desconto(100) == 90`.", conceito: "assert_teste",
      solucao: `def desconto(preco):
    return preco * 0.9

assert desconto(100) == 90
assert desconto(0) == 0
assert desconto(50) == 45
print("passou")` },
    { tipo: "aberta", tag: "sec", titulo: "Teste que nunca falha", texto: "Um programador escreve um teste em que o resultado esperado é **calculado pela própria função** (`assert f(3) == f(3)`).", pergunta: "Por que esse teste não prova nada? De onde deve vir a resposta esperada?", modelo: "Esse teste **sempre passa**, mesmo que a função esteja errada. A resposta esperada deve vir de **fora do código testado**: uma conta feita à mão, uma regra do negócio ou um exemplo conhecido." },
    { tipo: "quiz", itens: [
      { pergunta: "O que o `assert` faz com uma afirmação falsa?", opcoes: ["Ignora a linha", "Interrompe com erro", "Corrige o valor", "Mostra um aviso só"], correta: 1, porque: "Levanta `AssertionError` e para o programa.", conceito: "assert_teste" },
      { pergunta: "Onde deve vir a resposta esperada do teste?", opcoes: ["Da própria função", "De fora do código", "De um sorteio", "Do último teste"], correta: 1, porque: "Uma conta à mão ou a regra do negócio.", conceito: "assert_teste" },
      { pergunta: "O que é um caso de teste?", opcoes: ["Um erro de sintaxe", "Uma função a mais", "Entrada e resposta certa", "Um comentário no código"], correta: 2, porque: "Um exemplo com a entrada e o resultado esperado.", conceito: "assert_teste" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que é `assert` e para que serve num teste?", conceito: "assert_teste", modelo: "`assert` afirma que algo é verdadeiro; se for falso, o programa para com `AssertionError`. Serve para escrever, no código, a resposta esperada e deixar o programa conferir sozinho." },
  ],
  recuperacao: [
    { p: "O que o `assert` faz quando a afirmação é falsa?", regex: "(para|interrompe|erro|assertionerror|falha)", modelo: "Interrompe o programa com `AssertionError`.", conceito: "assert_teste" },
    { p: "O que é um caso de teste?", regex: "(entrada);;(esperad|resposta|resultado)", modelo: "Uma entrada com a resposta esperada.", conceito: "assert_teste" },
    { p: "Por que a resposta esperada não pode vir da função testada?", regex: "(sempre passa|nao prova|nada|fora|independente|conta a mao|regra)", modelo: "Porque o teste sempre passaria, mesmo com a função errada.", conceito: "assert_teste" },
  ],
});

// ---------- Aula 47: casos de teste ----------
aulas.push({
  id: "0047", modulo: 6, n: 5, slug: "casos-de-teste", titulo: "Que casos testar: normal, limite e esquisito",
  resumo: "Um teste só não basta. Três tipos de caso pegam quase todos os defeitos: o caso comum, o limite e o inesperado.",
  objetivos: ["Escolher casos normais, de limite e inválidos.", "Testar uma regra de desconto nas fronteiras.", "Transformar uma regra do negócio em asserts."],
  conceitos: [["casos_teste", "Escolher casos de teste"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "A regra: “frete grátis para compras de 100 reais ou mais”. Quais valores você testaria para ter certeza de que a regra funciona? Pense em pelo menos três tipos de valor.", modelo: "Um valor **comum** abaixo (50), um **comum** acima (150) e, principalmente, os **limites**: exatamente 100 e 99.99. Também vale um valor **esquisito**, como 0 ou negativo. O defeito mais comum mora na fronteira (`>` no lugar de `>=`)." },
    { tipo: "exemplo", arquivo: "casos.py", texto: "Clique em cada linha.",
      codigo: [["def frete_gratis(total):", "A regra do negócio."], ["    return total >= 100", "100 **ou mais**."], ["assert frete_gratis(150) == True", "Caso **normal** acima."], ["assert frete_gratis(50) == False", "Caso **normal** abaixo."], ["assert frete_gratis(100) == True", "Caso de **limite**: exatamente 100 já vale."], ["assert frete_gratis(99.99) == False", "Caso de **limite**: um pouquinho abaixo não vale."], ["print(\"regra ok\")", "Todos passaram."]],
      termos: [["Caso de limite", "o valor exatamente na fronteira da regra (100) e vizinhos (99.99)."], ["Caso inválido", "um valor que não deveria existir (negativo, vazio), para ver como o programa reage."]] },
    { tipo: "executar", texto: "Rode e depois troque `>=` por `>` para ver qual teste denuncia o defeito.", arquivo: "casos.py (pode editar)", codigo: `def frete_gratis(total):
    return total >= 100

assert frete_gratis(100) == True
print("regra ok")`,
      prever: { enunciado: "Antes de testar:", conceito: "casos_teste", itens: [{ codigo: `def f(t):
    return t > 100
print(f(100))`, resposta: "False", porque: "100 não é maior que 100." }, { codigo: `def f(t):
    return t >= 100
print(f(100))`, resposta: "True", porque: "100 é maior ou igual a 100." }] } },
    { tipo: "descobrir", texto: "A função `maior_de_idade(i)` devolve `True` ou `False`.", arquivo: "idade.py", codigo: `def maior_de_idade(i):
    return i > 18
print(maior_de_idade(n))`,
      execucoes: [{ prefixo: "n = 30", saida: ["True"] }, { prefixo: "n = 10", saida: ["False"] }, { prefixo: "n = 18", saida: ["False"] }], colunas: ["Valor de n", "O que aparece"],
      pergunta: "Qual valor revela que a regra está errada (se maior de idade é 18 **ou mais**)? Que tipo de caso é esse?", dicas: ["Compare o resultado com o que a regra exige para 18.", "É o valor exatamente na fronteira da regra."],
      explicacao: "O valor **18** revela o defeito: a regra diz “18 ou mais”, mas a função deu `False` porque usa `>`. É um **caso de limite**: o tipo de caso que mais pega defeitos.", conceito: "casos_teste" },
    { tipo: "prever", conceito: "casos_teste", itens: [
      { codigo: `def ok(n):
    return n >= 0
print(ok(0))`, resposta: "True", porque: "0 é maior ou igual a 0." },
      { codigo: `def ok(n):
    return n > 0
print(ok(0))`, resposta: "False", porque: "0 não é maior que 0." },
      { codigo: `def ok(n):
    return 1 <= n <= 5
print(ok(5), ok(6))`, resposta: "True False", porque: "5 está no intervalo e 6 não." }] },
    { tipo: "corrigir", texto: "O teste de limite falha. Conserte **a função** para valer a partir de 100.", arquivo: "com_defeito.py", dica: "O limite diz “100 ou mais”.", conceito: "casos_teste",
      codigo: `def frete_gratis(total):
    return total > 100

assert frete_gratis(100) == True
print("regra ok")`, esperado: ["regra ok"],
      solucao: `def frete_gratis(total):
    return total >= 100

assert frete_gratis(100) == True
print("regra ok")` },
    { tipo: "escrever", texto: "A regra: desconto de 10% para compras de **200 ou mais**. Escreva `desconto(total)` (devolve o desconto em reais, ou 0) e os asserts: `desconto(200) == 20`, `desconto(199) == 0`, `desconto(0) == 0`. Mostre `passou`.", arquivo: "meu_programa.py",
      inicial: `# escreva desconto(total) e os asserts de limite
`, esperado: ["passou"], testes: [["desconto(500)", "50.0"], ["desconto(100)", "0"]], dica: "`if total >= 200: return total * 0.1` e senão `return 0`.", conceito: "casos_teste",
      solucao: `def desconto(total):
    if total >= 200:
        return total * 0.1
    return 0

assert desconto(200) == 20
assert desconto(199) == 0
assert desconto(0) == 0
print("passou")` },
    { tipo: "aberta", tag: "sec", titulo: "Testar com dados reais", texto: "Para testar o cadastro, a equipe copia uma planilha de **clientes de verdade** (nomes, CPFs, e-mails) para o ambiente de testes.", pergunta: "Por que isso é arriscado? O que usar no lugar?", modelo: "O ambiente de testes costuma ter **menos proteção** e mais gente com acesso, e o dado real pode vazar ou ser usado sem necessidade. Use **dados fictícios** (gerados) que imitam o formato, como CPF `000.000.000-00`." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual é o caso que mais revela defeitos numa regra com `>=`?", opcoes: ["O limite exato", "Um valor enorme", "Um valor aleatório", "O número zero só"], correta: 0, porque: "A fronteira é onde `>` e `>=` se confundem.", conceito: "casos_teste" },
      { pergunta: "Para a regra “18 ou mais”, quais valores testar?", opcoes: ["Só 30, bem acima", "Só 10, bem abaixo", "17, 18 e 19, em volta", "Só valores bem altos"], correta: 2, porque: "Os valores de cada lado da fronteira e ela mesma.", conceito: "casos_teste" },
      { pergunta: "Que dados usar em testes?", opcoes: ["Os dados reais", "Dados fictícios", "Dados do chefe", "Dados do mês"], correta: 1, porque: "Evita expor pessoas reais.", conceito: "casos_teste" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: que tipos de caso testar numa regra e por quê?", conceito: "casos_teste", modelo: "Casos normais (acima e abaixo), casos de limite (exatamente na fronteira e ao lado) e casos inválidos. O limite é onde moram os defeitos mais comuns, como `>` no lugar de `>=`." },
  ],
  recuperacao: [
    { p: "O que é um caso de limite?", regex: "(fronteira|limite|exatamente|borda|extremo)", modelo: "O valor exatamente na fronteira da regra (e seus vizinhos).", conceito: "casos_teste" },
    { p: "Por que o limite revela tantos defeitos?", regex: "(>=|maior ou igual|maior que|confund|fronteira|ou mais)", modelo: "Porque é fácil trocar `>` por `>=`; o limite expõe a confusão.", conceito: "casos_teste" },
    { p: "Por que usar dados fictícios em testes?", regex: "(fictici|vaza|expoe|privacid|real|sensiv|protecao)", modelo: "Para não expor pessoas reais; o ambiente de testes tem menos proteção.", conceito: "casos_teste" },
  ],
});

// ---------- Aula 48: try/except ----------
aulas.push({
  id: "0048", modulo: 6, n: 6, slug: "try-except", titulo: "Prever o erro e responder: try e except",
  resumo: "Alguns erros não são defeitos, são fatos da vida: a pessoa digitou “abc”. Hoje o programa aprende a lidar sem travar.",
  objetivos: ["Usar `try` e `except` para tratar um erro esperado.", "Capturar um tipo específico (`ValueError`).", "Explicar por que não se deve capturar tudo."],
  conceitos: [["try_except", "try e except"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O programa pede a idade e a pessoa digita `abc`. O `int(...)` dá erro e o programa para. Esse erro é um defeito do programa ou algo que **vai acontecer** de vez em quando? O que o programa deveria fazer?", modelo: "É algo que **vai acontecer**: dados vindos de pessoas são imprevisíveis. O programa deveria **tentar converter** e, se não der, **avisar** e pedir de novo, sem travar. É o `try`/`except`." },
    { tipo: "exemplo", arquivo: "tentar.py", entradas: ["abc"], texto: "Clique em cada linha.",
      codigo: [["texto = input(\"Idade: \")", "Lê o que a pessoa digitou."], ["try:", "**Tente** fazer o que está recuado abaixo."], ["    idade = int(texto)", "Pode dar `ValueError`."], ["    print(\"Idade:\", idade)", "Só roda se a conversão deu certo."], ["except ValueError:", "**Se** acontecer um `ValueError`, faça o que está abaixo."], ["    print(\"Digite só números\")", "Avisa, sem travar o programa."]],
      termos: [["try", "bloco que você tenta executar."], ["except", "o que fazer se aquele tipo de erro acontecer."]] },
    { tipo: "executar", texto: "Rode com um número e depois com um texto (use o campo de entradas).", arquivo: "tentar.py (pode editar)", entradas: ["abc"], codigo: `texto = input("Idade: ")
try:
    idade = int(texto)
    print("Idade:", idade)
except ValueError:
    print("Digite só números")`,
      prever: { enunciado: "Antes de testar:", conceito: "try_except", itens: [{ codigo: `try:
    print(int("12"))
except ValueError:
    print("erro")`, resposta: "12", porque: "A conversão deu certo; o `except` não roda." }, { codigo: `try:
    print(int("x"))
except ValueError:
    print("erro")`, resposta: "erro", porque: "A conversão falhou e o `except` respondeu." }] } },
    { tipo: "descobrir", texto: "O programa tenta converter o texto de `t`.", arquivo: "converter.py", codigo: `try:
    print(int(t) * 2)
except ValueError:
    print("inválido")`,
      execucoes: [{ prefixo: 't = "4"', saida: ["8"] }, { prefixo: 't = "abc"', saida: ["inválido"] }, { prefixo: 't = ""', saida: ["inválido"] }], colunas: ["Valor de t", "O que aparece"],
      pergunta: "Quando o `except` roda? O que acontece com o `print` do bloco `try` quando o erro ocorre?", dicas: ["Para quais valores o `int(t)` falha?", "A linha do erro é executada até o fim?"],
      explicacao: "O `except` roda **só quando** o `int(t)` falha. Quando o erro ocorre, o resto do bloco `try` é **pulado** e o programa segue pelo `except`.", conceito: "try_except" },
    { tipo: "prever", conceito: "try_except", itens: [
      { codigo: `try:
    x = 10 / 0
except ZeroDivisionError:
    x = 0
print(x)`, resposta: "0", porque: "A divisão falhou e o `except` definiu `x = 0`." },
      { codigo: `try:
    print("a")
    print(int("z"))
    print("b")
except ValueError:
    print("c")`, resposta: "c", porque: "Mostra `a`, o erro acontece e o `b` é pulado; por fim `c`. A última linha mostrada é `c`." },
      { codigo: `d = {"a": 1}
try:
    print(d["b"])
except KeyError:
    print("sem chave")`, resposta: "sem chave", porque: "A chave “b” não existe; o `except KeyError` responde." }] },
    { tipo: "corrigir", texto: "O programa trava com `abc`. Faça-o mostrar `Número inválido`.", arquivo: "com_defeito.py", dica: "Envolva o `int(...)` num `try` com `except ValueError:`.", conceito: "try_except",
      codigo: `texto = "abc"
numero = int(texto)
print(numero)`, esperado: ["Número inválido"],
      solucao: `texto = "abc"
try:
    numero = int(texto)
    print(numero)
except ValueError:
    print("Número inválido")` },
    { tipo: "escrever", texto: "Peça `Quantidade: `. Se der para converter, mostre `Total: N` (o dobro). Se não, mostre `Quantidade inválida`.", arquivo: "meu_programa.py",
      inicial: `texto = input("Quantidade: ")
# converta com try/except
`, cenarios: [{ entradas: ["5"], esperado: ["Quantidade: 5", "Total: 10"] }, { entradas: ["abc"], esperado: ["Quantidade: abc", "Quantidade inválida"] }, { entradas: [""], esperado: ["Quantidade: ", "Quantidade inválida"] }], dica: "`try:` com `n = int(texto)` e `except ValueError:`.", conceito: "try_except",
      solucao: `texto = input("Quantidade: ")
try:
    n = int(texto)
    print("Total:", n * 2)
except ValueError:
    print("Quantidade inválida")` },
    { tipo: "aberta", tag: "sec", titulo: "Capturar tudo", texto: "Para o programa nunca travar, o autor escreve `except:` (sem tipo), que captura **qualquer** erro e segue em silêncio. Num sistema de pagamentos, uma falha na gravação do pedido também é engolida.", pergunta: "Por que isso é perigoso? Qual é a alternativa?", modelo: "Defeitos de verdade ficam **escondidos**: o pedido não foi gravado, mas ninguém percebe. Capture **só o erro esperado** (`except ValueError:`) e deixe os outros aparecerem ou sejam **registrados e tratados** com cuidado." },
    { tipo: "quiz", itens: [
      { pergunta: "Quando o `except ValueError:` roda?", opcoes: ["Sempre, a cada execução", "Quando ocorre ValueError", "Quando não há erro algum", "Só na primeira linha"], correta: 1, porque: "Só se acontecer esse tipo de erro no `try`.", conceito: "try_except" },
      { pergunta: "O que acontece com o resto do `try` após um erro?", opcoes: ["Continua do mesmo jeito", "É repetido duas vezes", "É pulado até o except", "É apagado do arquivo"], correta: 2, porque: "O programa salta para o `except`.", conceito: "try_except" },
      { pergunta: "Por que evitar `except:` sem tipo?", opcoes: ["Esconde defeitos reais", "Deixa o código lento", "Não funciona no Python", "Dá erro de sintaxe"], correta: 0, porque: "Captura qualquer erro, inclusive defeitos importantes.", conceito: "try_except" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como o programa lida com um erro que já se espera, como a pessoa digitar texto no lugar de número?", conceito: "try_except", modelo: "Com `try:` (tenta converter) e `except ValueError:` (avisa e pede de novo), capturando só o tipo esperado e deixando os outros erros aparecerem." },
  ],
  recuperacao: [
    { p: "Quando o bloco `except` roda?", regex: "(erro);;(acontece|ocorre|falha|der)", modelo: "Quando acontece o erro esperado dentro do `try`.", conceito: "try_except" },
    { p: "O que acontece com o resto do `try` depois do erro?", regex: "(pula|pulad|salta|interrompe|nao roda|nao executa|deixa de)", modelo: "É pulado: o programa vai para o `except`.", conceito: "try_except" },
    { p: "Por que evitar capturar qualquer erro sem dizer o tipo?", regex: "(esconde|escond|silencio|defeito|nao percebe|engole|real)", modelo: "Porque esconde defeitos reais.", conceito: "try_except" },
  ],
});

// ---------- Aula 49: conferir código de IA ----------
aulas.push({
  id: "0049", modulo: 6, n: 7, slug: "conferir-codigo-da-ia", titulo: "Não confie, confira: testando o código que a IA escreveu",
  resumo: "A IA escreve código que parece certo. A diferença entre confiar e conferir é o teste que VOCÊ escreveu antes.",
  objetivos: ["Escrever testes a partir da regra, antes de ver o código.", "Rodar os testes contra um código pronto.", "Decidir se o código pode ser aceito."],
  conceitos: [["conferir_ia", "Conferir código gerado"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você pediu a uma IA uma função de “preço com frete: grátis acima de 100”. Ela devolveu um código que parece certo. Como saber se ele **realmente** segue a regra, sem depender da sua impressão?", modelo: "Escrevendo **antes** os casos de teste a partir da **regra** (inclusive os limites) e rodando o código contra eles. Se algum falhar, o código **não é aceito**, por mais bonito que pareça." },
    { tipo: "exemplo", arquivo: "conferir.py", texto: "Clique em cada linha. Os testes vêm da **regra**, não do código.",
      codigo: [["def preco_final(total):", "Este é o código “da IA” (pode ter defeito)."], ["    if total > 100:", "Defeito escondido: a regra diz “acima de 100” ou “100 ou mais”? Os testes dirão."], ["        return total", "Sem frete."], ["    return total + 15", "Com frete de 15."], ["assert preco_final(150) == 150", "Caso normal acima."], ["assert preco_final(50) == 65", "Caso normal abaixo."], ["print(\"passou\")", "Se a regra fosse “100 ou mais”, faltaria o teste do limite `preco_final(100) == 100`."]],
      termos: [["Conferir", "verificar com testes que você escreveu a partir da regra."], ["Confiar", "aceitar porque parece certo; é o que se evita com código gerado."]] },
    { tipo: "executar", texto: "Rode e acrescente o teste do limite que falta.", arquivo: "conferir.py (pode editar)", codigo: `def preco_final(total):
    if total > 100:
        return total
    return total + 15

assert preco_final(150) == 150
assert preco_final(50) == 65
print("passou")`,
      prever: { enunciado: "Antes de testar:", conceito: "conferir_ia", itens: [{ codigo: `def f(t):
    if t > 100:
        return t
    return t + 15
print(f(100))`, resposta: "115", porque: "100 não é maior que 100; entra o frete." }, { codigo: `def f(t):
    if t >= 100:
        return t
    return t + 15
print(f(100))`, resposta: "100", porque: "100 é “100 ou mais”: sem frete." }] } },
    { tipo: "descobrir", texto: "O código gerado devolve o resultado para vários totais.", arquivo: "gerado.py", codigo: `def preco_final(total):
    if total > 100:
        return total
    return total + 15
print(preco_final(n))`,
      execucoes: [{ prefixo: "n = 50", saida: ["65"] }, { prefixo: "n = 150", saida: ["150"] }, { prefixo: "n = 100", saida: ["115"] }], colunas: ["Valor de n", "O que aparece"],
      pergunta: "Se a regra é “grátis a partir de 100”, qual linha mostra o defeito? Que tipo de teste teria pego?", dicas: ["Compare o resultado para `n = 100` com o que a regra pede.", "É o caso exatamente na fronteira."],
      explicacao: "Com `n = 100` a função cobrou frete (115), mas a regra pede frete grátis (100). O teste de **limite** teria pego o defeito, e por isso os testes vêm **da regra** e não do código.", conceito: "conferir_ia" },
    { tipo: "prever", conceito: "conferir_ia", itens: [
      { codigo: `def f(t):
    return t * 2
assert f(3) == 6
assert f(0) == 0
print("ok")`, resposta: "ok", porque: "Os dois testes passam." },
      { codigo: `def media(a, b):
    return a + b / 2
print(media(4, 6))`, resposta: "7.0", porque: "Por precedência, `b / 2` primeiro: 4 + 3 = 7. O correto seria `(a + b) / 2 = 5.0`: o teste (esperado 5) pegaria." },
      { codigo: `def media(a, b):
    return (a + b) / 2
assert media(4, 6) == 5
print("ok")`, resposta: "ok", porque: "A versão correta passa." }] },
    { tipo: "corrigir", texto: "O código gerado falha no teste de limite. Conserte **a função**.", arquivo: "com_defeito.py", dica: "A regra é “100 ou mais”.", conceito: "conferir_ia",
      codigo: `def preco_final(total):
    if total > 100:
        return total
    return total + 15

assert preco_final(100) == 100
assert preco_final(50) == 65
print("passou")`, esperado: ["passou"],
      solucao: `def preco_final(total):
    if total >= 100:
        return total
    return total + 15

assert preco_final(100) == 100
assert preco_final(50) == 65
print("passou")` },
    { tipo: "escrever", texto: "A regra: “média de duas notas; aprovado se for 6 ou mais”. Escreva `situacao(a, b)` (devolve `\"aprovado\"` ou `\"reprovado\"`) e os asserts: `situacao(6, 6) == \"aprovado\"`, `situacao(5, 6) == \"reprovado\"` e `situacao(10, 0) == \"reprovado\"`. Mostre `passou`.", arquivo: "meu_programa.py",
      inicial: `# escreva situacao(a, b) e os asserts da regra
`, esperado: ["passou"], testes: [["situacao(7, 7)", "'aprovado'"], ["situacao(4, 4)", "'reprovado'"]], dica: "`media = (a + b) / 2` e depois `if media >= 6:`.", conceito: "conferir_ia",
      solucao: `def situacao(a, b):
    media = (a + b) / 2
    if media >= 6:
        return "aprovado"
    return "reprovado"

assert situacao(6, 6) == "aprovado"
assert situacao(5, 6) == "reprovado"
assert situacao(10, 0) == "reprovado"
print("passou")` },
    { tipo: "aberta", tag: "sec", titulo: "Colar dados reais na IA", texto: "Para a IA “entender melhor”, um programador cola no chat um trecho com **nomes e CPFs de clientes** reais e um token de acesso do sistema.", pergunta: "Qual é o risco? O que fazer antes de pedir ajuda?", modelo: "Os dados saem do ambiente da empresa e podem ser guardados ou vistos por quem não deveria; o token pode ser usado para **entrar no sistema**. Antes de colar, **substitua por dados fictícios** e **retire segredos**, e siga a política da empresa sobre o que pode ser enviado." },
    { tipo: "quiz", itens: [
      { pergunta: "De onde devem vir os testes de um código gerado?", opcoes: ["Da regra do negócio", "Do próprio código", "Do que a IA disse", "De um palpite rápido"], correta: 0, porque: "A regra é a fonte de verdade; o código é o que se confere.", conceito: "conferir_ia" },
      { pergunta: "O teste do limite falhou. O que fazer?", opcoes: ["Aceitar mesmo assim", "Apagar o teste logo", "Corrigir e testar outra vez", "Ignorar e seguir adiante"], correta: 2, porque: "Código que não passa nos testes da regra não é aceito.", conceito: "conferir_ia" },
      { pergunta: "“Parece certo” é prova de que o código funciona?", opcoes: ["Sim, quase sempre", "Não, só os testes", "Sim, se for da IA", "Sim, se rodar sem erro"], correta: 1, porque: "Rodar sem erro não garante que o resultado está certo.", conceito: "conferir_ia" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como conferir um código que a IA escreveu para você?", conceito: "conferir_ia", modelo: "Escrevendo os testes a partir da regra (normais e de limite) antes de confiar, rodando o código contra eles e só aceitando se todos passarem; se algum falhar, corrige-se e testa-se de novo." },
  ],
  recuperacao: [
    { p: "De onde devem vir os testes do código gerado pela IA?", regex: "(regra)", modelo: "Da regra do negócio, e não do código.", conceito: "conferir_ia" },
    { p: "Rodar sem erro prova que o código está certo?", regex: "(nao);;(resultado|certo|errado|teste|logica)", modelo: "Não: pode rodar sem erro e dar o resultado errado; só os testes provam.", conceito: "conferir_ia" },
    { p: "O que fazer antes de colar código com dados de clientes numa IA?", regex: "(fictici|substitu|retir|anonimiz|segredo|politica|sensiv)", modelo: "Trocar por dados fictícios e retirar segredos, seguindo a política da empresa.", conceito: "conferir_ia" },
  ],
});

// ---------- Aula 50: mini-projeto ----------
aulas.push({
  id: "0050", modulo: 6, n: 8, slug: "mini-projeto", titulo: "Mini-projeto: consertar o caixa e provar com testes",
  resumo: "Um script de caixa com três defeitos plantados. Você acha, conserta e escreve os testes que provam. Depois, o mesmo método num problema novo.",
  minutos: 45,
  objetivos: ["Achar defeitos usando mensagens, `print` e testes.", "Escrever asserts de caso normal e de limite.", "Aplicar o método num problema novo."],
  conceitos: [],
  secoes: [
    { tipo: "aquecimento", titulo: "Planeje a caça", pergunta: "Você recebe um script de caixa que “quase funciona”. Em que ordem você agiria: rodar, ler o erro, espiar valores, escrever testes? Por que escrever os testes **antes** de mexer no código?", minimo: 40, modelo: "Rodar e **ler** a mensagem (se houver), **espiar** valores onde o resultado sai errado, escrever **testes da regra** (normal e limite) e só então **corrigir**, testando de novo. Os testes antes provam que o defeito existe e depois provam que ele sumiu." },
    { tipo: "exemplo", titulo: "Um esqueleto de referência", arquivo: "esqueleto.py", texto: "Mesma estrutura (função, testes, resultado), com uma regra menor. Use como mapa.",
      codigo: [["def total(preco, qtd):", "Uma função de uma regra só."], ["    return preco * qtd", "O cálculo."], ["assert total(2, 3) == 6", "Caso normal."], ["assert total(5, 0) == 0", "Caso de limite: quantidade zero."], ["print(\"passou\")", "Só aparece se todos passaram."]] },
    { tipo: "corrigir", titulo: "Exercício final (sem dica)", final: true, minutos: 15, texto: "O caixa deve: calcular `subtotal(preco, qtd)` (preço vezes quantidade); aplicar `desconto(valor)` de 10% se o valor for **200 ou mais** (devolve o valor final); e `troco(pago, total)` que devolve a diferença. O script abaixo tem **três defeitos**. Conserte todos para que passem nos testes e mostre `caixa ok`.", arquivo: "caixa.py", dica: "Um defeito está numa conta (preço e quantidade), outro num limite (200 ou mais) e outro na ordem de uma subtração.",
      codigo: `def subtotal(preco, qtd):
    return preco + qtd

def desconto(valor):
    if valor > 200:
        return valor * 0.9
    return valor

def troco(pago, total):
    return total - pago

assert subtotal(4.5, 2) == 9
assert desconto(200) == 180
assert desconto(100) == 100
assert troco(50, 30) == 20
print("caixa ok")`, esperado: ["caixa ok"], testes: [["subtotal(10, 3)", "30"], ["desconto(300)", "270.0"], ["desconto(199.99)", "199.99"], ["troco(100, 99.5)", "0.5"]],
      conceito: ["erro_ler", "depurar_print", "assert_teste", "casos_teste"],
      solucao: `def subtotal(preco, qtd):
    return preco * qtd

def desconto(valor):
    if valor >= 200:
        return valor * 0.9
    return valor

def troco(pago, total):
    return pago - total

assert subtotal(4.5, 2) == 9
assert desconto(200) == 180
assert desconto(100) == 100
assert troco(50, 30) == 20
print("caixa ok")` },
    { tipo: "escrever", titulo: "Problema novo: reajuste de preço", transfer: true, minutos: 12, texto: "Outro contexto, o mesmo método. A regra: o preço sobe **5%** para produtos de **R$ 100 ou mais** e **10%** para os de menos de 100. Escreva `reajuste(preco)` (devolve o novo preço) e os asserts que provam a regra, incluindo o limite (`reajuste(100) == 105`, `reajuste(99) == 108.9`, `reajuste(0) == 0`). Mostre `passou`.", arquivo: "reajuste.py",
      inicial: `# escreva reajuste(preco) e os asserts da regra
`, esperado: ["passou"], testes: [["reajuste(200)", "210.0"], ["reajuste(50)", "55.0"], ["reajuste(100)", "105.0"]],
      dica: "`if preco >= 100: return preco * 1.05` e, senão, `return preco * 1.1`. Cuidado: compare números decimais com `round(..., 2)`.", conceito: ["assert_teste", "casos_teste", "conferir_ia"],
      solucao: `def reajuste(preco):
    if preco >= 100:
        return round(preco * 1.05, 2)
    return round(preco * 1.1, 2)

assert reajuste(100) == 105
assert reajuste(99) == 108.9
assert reajuste(0) == 0
print("passou")` },
    { tipo: "aberta", tag: "sec", titulo: "Teste aprovado, mundo real reprovado", texto: "Todos os testes do caixa passam. Mesmo assim, ao usar de verdade, um cliente digita a quantidade `-3` e o total sai **negativo** (a loja “paga” o cliente).", pergunta: "O que faltou? O que isso diz sobre o que os testes provam?", modelo: "Faltou o **caso inválido** (quantidade negativa). Testes só provam o que foi **testado**: passar não é sinônimo de “sem defeito”. Valide as entradas (`qtd >= 0`) e acrescente testes para os casos esquisitos." },
    { tipo: "quiz", itens: [
      { pergunta: "Por que escrever os testes antes de consertar?", opcoes: ["Provam o defeito e a cura", "Deixam o código mais veloz", "Evitam ler o erro todo", "Dispensam usar o print"], correta: 0, porque: "Primeiro falham (defeito), depois passam (corrigido).", conceito: "assert_teste" },
      { pergunta: "O caso `desconto(200)` testa:", opcoes: ["Um valor qualquer", "Um valor inválido", "O limite da regra", "Uma média comum"], correta: 2, porque: "É o valor exatamente na fronteira “200 ou mais”.", conceito: "casos_teste" },
      { pergunta: "Todos os testes passam. Isso garante:", opcoes: ["Zero defeitos no código", "Só o que foi testado", "Que a IA está certa", "Que é seguro usar"], correta: 1, porque: "Os testes só cobrem os casos escritos.", conceito: "conferir_ia" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: descreva o seu método para achar e provar a correção de um defeito.", conceito: "assert_teste", modelo: "Ler a mensagem de erro (se houver), espiar valores com `print`, escrever testes da regra (normais e de limite), corrigir e rodar os testes de novo até todos passarem; depois pensar em casos inválidos que ainda faltam." },
  ],
  recuperacao: [
    { p: "Que passos usar para achar um defeito?", regex: "(ler|mensagem|erro);;(print|espiar|valor|teste)", modelo: "Ler a mensagem, espiar os valores com `print` e escrever testes.", conceito: "assert_teste" },
    { p: "Por que testar o limite da regra?", regex: "(limite|fronteira|>=|maior ou igual|onde);;(defeito|erro|falha|confund)", modelo: "Porque é onde os defeitos mais aparecem, como `>` no lugar de `>=`.", conceito: "casos_teste" },
    { p: "Se todos os testes passam, o código está livre de defeitos?", regex: "(nao);;(testado|cobre|casos|so o que)", modelo: "Não: só se garante o que foi testado.", conceito: "conferir_ia" },
  ],
});

export default aulas;
