// Módulo 1: Primeiros passos, algoritmos e Python (universal). Fio condutor: um robô de café.
// A aula 1 é escrita à mão em fonte/ (manual: true). As demais são geradas por conteudo/modelo.mjs.
// Cada exercício traz `solucao` (usada só nos testes; não vai para o navegador) e é executado por test-python.mjs.
export const meta = {
  final: "Mini-projeto: o robô anota o pedido de café",
  transfer: "Aplicar os mesmos conceitos a organizar as horas de estudo da semana",
};

const aulas = [];

// ---------- Aula 1 (manual) ----------
aulas.push({
  id: "0001", modulo: 1, n: 1, manual: true, arquivo: "0001-o-computador-segue-instrucoes.html",
  titulo: "Ensinando um robô a passar café: seu primeiro algoritmo",
  conceitos: [["programa", "Algoritmo e programa: instruções exatas, em ordem"], ["print_aspas", "print e texto entre aspas"], ["aspas_calculo", "Aspas x cálculo"], ["ler_erro", "Ler uma mensagem de erro"], ["privacidade", "Privacidade: usar só o dado necessário"]],
});

// ---------- Aula 2: variáveis ----------
aulas.push({
  id: "0002", modulo: 1, n: 2, slug: "variaveis", titulo: "O robô ganha memória: variáveis",
  resumo: "Hoje o robô aprende a guardar informações com nome (quantas xícaras, quanta água) e a reutilizá-las, em vez de repetir números pelo programa inteiro.",
  objetivos: ["Explicar o que é uma variável com suas palavras.", "Criar variáveis e usá-las no `print`.", "Prever o que acontece quando o valor de uma variável muda."],
  conceitos: [["variaveis", "Variáveis: dar nome a um valor"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O robô vai fazer café para 3 pessoas e cada xícara leva 100 ml de água. Onde ele poderia guardar essas duas informações para usá-las em vários passos, sem repetir os números toda hora? Explique com suas palavras.", modelo: "Ele precisa de uma “memória com etiqueta”: um nome (`xicaras`) ligado a um valor (3). Em programação isso se chama **variável**. Se amanhã forem 5 xícaras, muda-se um só lugar." },
    { tipo: "exemplo", arquivo: "robo_cafe.py", texto: "Clique em cada linha para ver o que ela faz.",
      codigo: [["xicaras = 3", "Cria uma **variável**: o nome `xicaras` ligado ao valor 3. Aqui o `=` significa “guarde”, não “é igual a”."], ["ml_por_xicara = 100", "Outra variável: cada xícara leva 100 ml. O nome pode ter letras, números e `_`, mas não espaços nem começar com número."], ["total_ml = xicaras * ml_por_xicara", "O computador calcula `3 * 100` (o `*` multiplica) e guarda o resultado 300 na variável `total_ml`."], ["print(\"Água necessária (ml):\", total_ml)", "O `print` mostra o texto e, sem aspas, o **valor** guardado em `total_ml`: 300."]],
      termos: [["Variável", "um nome ligado a um valor guardado na memória."], ["Atribuição", "guardar um valor numa variável com o sinal `=`."]] },
    { tipo: "executar", texto: "Rode o programa. Depois **troque o 3 por 5** na primeira linha e rode de novo.",
      arquivo: "robo_cafe.py (pode editar)", codigo: `xicaras = 3
ml_por_xicara = 100
total_ml = xicaras * ml_por_xicara
print("Água necessária (ml):", total_ml)`,
      prever: { enunciado: "Antes de testar: com `xicaras = 5`, qual é a linha exibida?", conceito: "variaveis", itens: [{ codigo: `xicaras = 5
ml_por_xicara = 100
total_ml = xicaras * ml_por_xicara
print("Água necessária (ml):", total_ml)`, resposta: "Água necessária (ml): 500", porque: "5 * 100 = 500. Mudou só uma variável e todo o resto se ajustou.", dica: "texto exato da linha" }] } },
    { tipo: "descobrir", texto: "Três programas pequenos. Compare o que muda de um para o outro.",
      tabela: { cab: ["Linha 1", "Linha 2", "Linha 3", "O que aparece"], linhas: [["`cafe = \"curto\"`", "`print(cafe)`", "—", "`curto`"], ["`cafe = \"curto\"`", "`print(\"cafe\")`", "—", "`cafe`"], ["`cafe = \"curto\"`", "`cafe = \"longo\"`", "`print(cafe)`", "`longo`"]] },
      pergunta: "O que muda quando `cafe` aparece entre aspas dentro do `print`? E o que acontece quando damos um novo valor à mesma variável?",
      dicas: ["Compare as linhas 1 e 2: só as aspas mudaram. Em qual delas o `print` mostra o que está guardado?", "Na terceira, a variável recebeu dois valores em sequência. Qual deles o `print` mostra?"],
      explicacao: "Sem aspas, `cafe` é o **nome da variável** e o `print` mostra o valor guardado. Com aspas, é só o texto “cafe”. Dar um novo valor a uma variável **substitui** o antigo: o robô esquece o valor anterior.", conceito: "variaveis" },
    { tipo: "prever", texto: "Preveja a linha exibida em cada programa.", conceito: "variaveis", itens: [
      { codigo: `agua = 200
agua = agua + 50
print(agua)`, resposta: "250", porque: "`agua` valia 200; a segunda linha calcula 200 + 50 e guarda 250 no mesmo nome." },
      { codigo: `nome = "Lia"
print("Café para", nome)`, resposta: "Café para Lia", porque: "`nome` está sem aspas no `print`, então aparece o valor guardado: Lia." },
      { codigo: `a = 4
b = a
a = 9
print(b)`, resposta: "4", porque: "`b = a` copia o valor que `a` tinha naquele momento (4). Mudar `a` depois não muda `b`." }] },
    { tipo: "corrigir", texto: "O robô tentou usar `total_ml` antes de criá-la. Execute, leia a mensagem e conserte **mudando só a ordem** das linhas.",
      arquivo: "com_defeito.py", codigo: `print("Água necessária (ml):", total_ml)
xicaras = 3
total_ml = xicaras * 100`, esperado: ["Água necessária (ml): 300"], dica: "O Python lê de cima para baixo: a variável precisa existir antes de ser usada.", conceito: "variaveis",
      solucao: `xicaras = 3
total_ml = xicaras * 100
print("Água necessária (ml):", total_ml)` },
    { tipo: "escrever", texto: "Crie as variáveis `xicaras` (valor 4) e `cafe_g_por_xicara` (valor 7), calcule `cafe_total_g` multiplicando as duas e mostre `Café necessário (g): 28`.",
      arquivo: "meu_programa.py", inicial: `# Crie as variáveis e mostre o resultado
`, esperado: ["Café necessário (g): 28"], testes: [["xicaras", "4"], ["cafe_g_por_xicara", "7"], ["cafe_total_g", "28"]], conceito: "variaveis",
      dica: "Três linhas de variáveis e um print: `cafe_total_g = xicaras * cafe_g_por_xicara`.",
      solucao: `xicaras = 4
cafe_g_por_xicara = 7
cafe_total_g = xicaras * cafe_g_por_xicara
print("Café necessário (g):", cafe_total_g)` },
    { tipo: "aberta", tag: "sec", titulo: "E se vazar?", texto: "Uma variável guarda o que você der a ela. Imagine que o robô guarda `cpf_cliente = ...` e, quando algo dá errado, o programa imprime **todas** as variáveis num registro de erros.", pergunta: "Qual é o risco? Que cuidado você teria com variáveis que guardam dados pessoais?", conceito: "privacidade", modelo: "O CPF acabaria escrito em registros (logs) que muita gente pode ler, e vazamentos de log são comuns. O cuidado é guardar só o necessário, não registrar dados pessoais e, quando precisar mostrar, **mascarar** (por exemplo, só os últimos dígitos)." },
    { tipo: "quiz", itens: [
      { pergunta: "O que faz a linha `total = 3 * 100`?", opcoes: ["Mostra o número 300 na tela agora", "Guarda o resultado 300 no nome total", "Compara se 3 vezes é igual a 100", "Cria o texto escrito 3 * 100 mesmo"], correta: 1, porque: "O `=` guarda. A conta é feita (300) e o resultado fica no nome `total`; nada aparece na tela sem um `print`.", conceito: "variaveis" },
      { pergunta: "Depois de `x = 5` e depois `x = 8`, quanto vale `x`?", opcoes: ["5, porque foi o primeiro valor", "13, porque os valores se somam", "8, porque é o último guardado", "Dá erro, porque x já existe aí"], correta: 2, porque: "Um novo valor **substitui** o antigo. Não há soma nem erro.", conceito: "variaveis" },
      { pergunta: "Qual nome de variável o Python aceita?", opcoes: ["total_ml, com sublinhado no meio", "total ml, com espaço no meio", "1_xicara, começando por número", "total-ml, com hífen no meio"], correta: 0, porque: "Nomes usam letras, números e `_`, não têm espaços ou hífens e não começam com número.", conceito: "variaveis" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima, em uma ou duas frases: o que é uma variável e o que acontece quando damos um novo valor a ela?", conceito: "variaveis", modelo: "Variável é um nome ligado a um valor guardado na memória. Quando damos um novo valor ao mesmo nome, ele substitui o valor antigo." },
  ],
  recuperacao: [
    { p: "O que é uma variável? Explique com suas palavras.", regex: "(nome|etiqueta|rotulo|gaveta|caixa|guard|armazen|memoria)", modelo: "Um nome ligado a um valor guardado na memória; dá para usar o nome no lugar de repetir o valor.", conceito: "variaveis" },
    { p: "Depois de `x = 5` e `x = 8`, quanto vale `x`, e por quê?", regex: "8;;(substitu|novo|ultim|sobrescrev|troc|esquec|perd|atual)", modelo: "8, porque um novo valor substitui o antigo.", conceito: "variaveis" },
    { p: "Por que dá erro usar uma variável antes de criá-la?", regex: "(nao existe|nao foi criad|nao conhec|nao defin|ainda nao|antes|ordem|de cima)", modelo: "Porque o Python lê de cima para baixo: se a variável ainda não existe quando a linha é lida, ele não conhece o nome (NameError).", conceito: "variaveis" },
  ],
});

// ---------- Aula 3: tipos ----------
aulas.push({
  id: "0003", modulo: 1, n: 3, slug: "tipos", titulo: "Números e texto não são a mesma coisa: tipos",
  resumo: "O robô descobre que 3 (número) e \"3\" (texto) se comportam de jeitos diferentes, e aprende a converter de um para o outro.",
  objetivos: ["Reconhecer os tipos `int`, `float`, `str` e `bool`.", "Explicar por que `\"3\" + \"4\"` dá 34 e `3 + 4` dá 7.", "Converter valores com `int()`, `float()` e `str()`."],
  conceitos: [["tipos", "Número x texto (tipos)"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O robô guarda `xicaras = 3` e `nome = \"Lia\"`. Você acha que o computador trata o 3 e o “Lia” do mesmo jeito? O que dá para fazer com o 3 que não dá com o “Lia”?", modelo: "Com o número dá para fazer contas (somar, multiplicar). Com o texto, não: ele só pode ser mostrado, juntado a outro texto ou comparado. Os computadores guardam cada valor com um **tipo**." },
    { tipo: "exemplo", arquivo: "tipos.py", texto: "O `type()` mostra o tipo de um valor. Clique em cada linha.",
      codigo: [["xicaras = 3", "O 3 sem aspas é um número inteiro: tipo **`int`**."], ["preco = 4.5", "Com ponto decimal é um número fracionário: tipo **`float`**. (No Python o separador decimal é o ponto, não a vírgula.)"], ["nome = \"Lia\"", "Entre aspas é texto: tipo **`str`** (de *string*, “cadeia de caracteres”)."], ["pronto = True", "`True` ou `False`, com letra maiúscula, são valores lógicos: tipo **`bool`**."], ["print(type(xicaras), type(preco), type(nome), type(pronto))", "Mostra os quatro tipos: `<class 'int'> <class 'float'> <class 'str'> <class 'bool'>`."]],
      termos: [["int", "número inteiro (3, 10, -2)."], ["float", "número com parte decimal (4.5, 0.25)."], ["str", "texto, sempre entre aspas."], ["bool", "verdadeiro ou falso (`True` ou `False`)."]] },
    { tipo: "executar", texto: "Rode e observe: o mesmo símbolo `+` (e o `*`) faz coisas diferentes com texto e com número.", arquivo: "tipos2.py (pode editar)",
      codigo: `print("3" + "4")
print(3 + 4)
print("ha" * 3)`,
      prever: { enunciado: "Antes de testar: o que aparece em cada caso?", conceito: "tipos", itens: [{ codigo: 'print(int("3") + 4)', resposta: "7", porque: "`int(\"3\")` converte o texto em número 3; depois 3 + 4 = 7." }, { codigo: 'print(str(3) + "4")', resposta: "34", porque: "`str(3)` converte o número em texto \"3\"; depois o `+` junta os textos: 34." }] } },
    { tipo: "descobrir", tabela: { cab: ["Código", "Resultado"], linhas: [["`3 + 4`", "`7`"], ["`\"3\" + \"4\"`", "`34`"], ["`\"3\" + 4`", "erro (`TypeError`)"]] },
      pergunta: "Por que `\"3\" + \"4\"` dá 34 e `3 + 4` dá 7? E por que `\"3\" + 4` dá erro?",
      dicas: ["Olhe as aspas: em qual dos dois o `+` está juntando textos e em qual está somando números?", "No terceiro, um lado é texto e o outro é número. Existe uma resposta óbvia para juntar os dois?"],
      explicacao: "Com aspas é **texto**: o `+` junta (34). Sem aspas é **número**: o `+` soma (7). Misturar texto com número não tem resposta óbvia, então o Python para com `TypeError` em vez de adivinhar.", conceito: "tipos" },
    { tipo: "prever", conceito: "tipos", itens: [
      { codigo: 'print(int("12") + 1)', resposta: "13", porque: "Converte \"12\" em 12 e soma 1." },
      { codigo: 'print("12" + "1")', resposta: "121", porque: "São textos: o `+` junta." },
      { codigo: 'print(float("2.5") * 2)', resposta: "5.0", porque: "`float` dá 2.5; vezes 2 dá 5.0 (o resultado continua sendo float, por isso o .0)." },
      { codigo: 'print(str(5) + "0")', resposta: "50", porque: "`str(5)` vira o texto \"5\"; juntar com \"0\" dá \"50\"." }] },
    { tipo: "corrigir", texto: "O robô guardou a quantidade como texto e tentou somar um número. Conserte **uma linha**.", arquivo: "com_defeito.py",
      codigo: `xicaras = "3"
extra = 1
print("Xícaras:", xicaras + extra)`, esperado: ["Xícaras: 4"], dica: "O valor entre aspas é texto. Converta com `int()`.", conceito: "tipos",
      solucao: `xicaras = int("3")
extra = 1
print("Xícaras:", xicaras + extra)` },
    { tipo: "escrever", texto: "O preço do café chegou como texto: `preco_texto = \"4.50\"`. Converta com `float()`, calcule o preço de 2 cafés e mostre `Total: 9.0`.", arquivo: "meu_programa.py",
      inicial: `preco_texto = "4.50"
# converta, multiplique por 2 e mostre
`, esperado: ["Total: 9.0"], dica: "`preco = float(preco_texto)` e depois `print(\"Total:\", preco * 2)`.", conceito: "tipos",
      solucao: `preco_texto = "4.50"
preco = float(preco_texto)
print("Total:", preco * 2)` },
    { tipo: "aberta", tag: "sec", titulo: "CPF é número ou texto?", texto: "Um CPF como 012.345.678-90 e um telefone como 0912345678 começam com zero.", pergunta: "Você guardaria isso como número ou como texto? Por quê? (Dica: pense em fazer contas com eles e no zero da frente.)", conceito: "tipos", modelo: "Como **texto**: nunca fazemos contas com CPF ou telefone, e como número o zero da frente sumiria (012 viraria 12). Além disso, são dados pessoais: guardar e mostrar só o necessário continua valendo." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual é o tipo do valor `4.5`?", opcoes: ["int, número inteiro", "str, um texto qualquer", "bool, verdadeiro ou falso", "float, número com decimal"], correta: 3, porque: "Número com ponto decimal é `float`.", conceito: "tipos" },
      { pergunta: "O que `print(\"2\" + \"5\")` mostra?", opcoes: ["7, a soma dos dois", "25, os textos juntos", "Dá erro de tipo mesmo", "2 + 5, do jeito escrito"], correta: 1, porque: "Entre aspas são textos; o `+` junta: 25.", conceito: "tipos" },
      { pergunta: "Para somar um valor lido como texto, você usa:", opcoes: ["int() para virar número", "str() para virar texto", "type() para mostrar tipo", "print() para mostrar tudo"], correta: 0, porque: "`int()` (ou `float()`) converte o texto em número, e aí a soma funciona.", conceito: "tipos" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: qual é a diferença entre `3` e `\"3\"` e como converter de um para o outro?", conceito: "tipos", modelo: "`3` é número (dá para fazer contas); `\"3\"` é texto (o `+` junta). Converte-se com `int()` ou `float()` (texto para número) e `str()` (número para texto)." },
  ],
  recuperacao: [
    { p: "O que `print(\"3\" + \"4\")` mostra, e por quê?", regex: "34;;(texto|aspas|junt|string|str|concaten)", modelo: "34: entre aspas são textos e o `+` junta os textos.", conceito: "tipos" },
    { p: "Qual a diferença entre `int` e `str`?", regex: "(inteiro|numero|conta);;(texto|aspas|string|palavra)", modelo: "`int` é número inteiro (dá para fazer contas); `str` é texto, sempre entre aspas.", conceito: "tipos" },
    { p: "Como transformar o texto \"12\" em um número para somar?", regex: "(int|float)", modelo: "Com `int(\"12\")` (ou `float`), que converte o texto em número.", conceito: "tipos" },
  ],
});

// ---------- Aula 4: operadores ----------
aulas.push({
  id: "0004", modulo: 1, n: 4, slug: "operadores", titulo: "Contas com Python: operadores",
  resumo: "O robô passa a calcular total, troco, bandejas e sobras: as operações do Python e a ordem em que elas acontecem.",
  objetivos: ["Usar `+ - * /` e também `//`, `%` e `**`.", "Explicar a ordem das operações e quando usar parênteses.", "Calcular totais e trocos em programas pequenos."],
  conceitos: [["operadores", "Operadores aritméticos e ordem das contas"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O robô vende cafés a R$ 4,50. Uma cliente leva 3 e paga com R$ 20. Que contas o robô precisa fazer? Que outras contas você imagina que um programa precisa saber fazer?", modelo: "Multiplicar (3 × 4,50) para o total e subtrair (20 − total) para o troco. Programas também dividem, calculam sobras e potências: tudo isso são **operadores**." },
    { tipo: "exemplo", arquivo: "caixa.py", texto: "Clique em cada linha.",
      codigo: [["preco = 4.5", "Variável com o preço de um café."], ["qtd = 3", "Variável com a quantidade."], ["total = preco * qtd", "Multiplica: 4.5 × 3 = 13.5 e guarda em `total`."], ["pago = 20", "Quanto a cliente entregou."], ["troco = pago - total", "Subtrai: 20 − 13.5 = 6.5."], ["print(\"Total:\", total)", "Mostra `Total: 13.5`."], ["print(\"Troco:\", troco)", "Mostra `Troco: 6.5`."]],
      termos: [["Operador", "símbolo que faz uma conta ou comparação: `+`, `-`, `*`, `/`."]] },
    { tipo: "executar", texto: "Rode e confira cada resultado: os operadores novos são `//`, `%` e `**`.", arquivo: "operadores.py (pode editar)", codigo: `print(7 + 2, 7 - 2, 7 * 2, 7 / 2, 7 // 2, 7 % 2, 7 ** 2)`,
      prever: { enunciado: "Antes de testar:", conceito: "operadores", itens: [{ codigo: "print(17 // 5)", resposta: "3", porque: "`//` é a divisão inteira: quantas vezes 5 cabe em 17 (3 vezes)." }, { codigo: "print(17 % 5)", resposta: "2", porque: "`%` é o resto: depois de 3 grupos de 5 sobram 2." }, { codigo: "print(2 ** 3)", resposta: "8", porque: "`**` é potência: 2 × 2 × 2 = 8." }] } },
    { tipo: "descobrir", texto: "Pense em dividir 10 balas entre 4 crianças.", tabela: { cab: ["Código", "Resultado"], linhas: [["`10 / 4`", "`2.5`"], ["`10 // 4`", "`2`"], ["`10 % 4`", "`2`"]] },
      pergunta: "O que cada um dos três operadores responde sobre as 10 balas e as 4 crianças?", dicas: ["`/` dá o valor exato, com decimal. Já `//` e `%` falam de balas inteiras.", "Cada criança recebe 2 balas inteiras. Quantas balas sobram?"],
      explicacao: "`/` é a divisão exata (2.5 balas por criança); `//` é quantas balas **inteiras** cada uma recebe (2); `%` é quanto **sobra** (2 balas).", conceito: "operadores" },
    { tipo: "prever", texto: "Atenção à ordem: multiplicação e potência acontecem antes de soma e subtração, e parênteses mandam em tudo.", conceito: "operadores", itens: [
      { codigo: "print(2 + 3 * 4)", resposta: "14", porque: "Primeiro 3 × 4 = 12; depois 2 + 12 = 14." },
      { codigo: "print((2 + 3) * 4)", resposta: "20", porque: "Os parênteses forçam 2 + 3 = 5 primeiro; depois 5 × 4 = 20." },
      { codigo: "print(10 - 2 - 3)", resposta: "5", porque: "Da esquerda para a direita: 10 − 2 = 8; depois 8 − 3 = 5." },
      { codigo: "print(2 ** 3 * 2)", resposta: "16", porque: "Potência primeiro: 2 ** 3 = 8; depois 8 × 2 = 16." }] },
    { tipo: "corrigir", texto: "Queremos a **média** entre o preço do café e do pão, mas o resultado saiu errado. Conserte **uma linha** (sem mudar os preços).", arquivo: "com_defeito.py",
      codigo: `preco_cafe = 4
preco_pao = 3
media = preco_cafe + preco_pao / 2
print("Média:", media)`, esperado: ["Média: 3.5"], dica: "A divisão acontece antes da soma. Use parênteses para somar primeiro.", conceito: "operadores",
      solucao: `preco_cafe = 4
preco_pao = 3
media = (preco_cafe + preco_pao) / 2
print("Média:", media)` },
    { tipo: "escrever", texto: "O robô tem 17 xícaras e cada bandeja leva 5. Mostre `Bandejas cheias: 3` e `Sobram: 2`, usando `//` e `%`.", arquivo: "meu_programa.py",
      inicial: `xicaras = 17
por_bandeja = 5
# mostre as bandejas cheias e as xícaras que sobram
`, esperado: ["Bandejas cheias: 3", "Sobram: 2"], testes: [["xicaras // por_bandeja", "3"], ["xicaras % por_bandeja", "2"]], dica: "`xicaras // por_bandeja` para as bandejas e `xicaras % por_bandeja` para as que sobram.", conceito: "operadores",
      solucao: `xicaras = 17
por_bandeja = 5
print("Bandejas cheias:", xicaras // por_bandeja)
print("Sobram:", xicaras % por_bandeja)` },
    { tipo: "aberta", tag: "sec", titulo: "Em quem confiar?", texto: "Num app de pedidos, o preço aparece na tela do cliente e o programa calcula o total.", pergunta: "Por que o total que será cobrado não deveria ser calculado só com o que vem da tela do cliente?", modelo: "Porque a tela do cliente pode ser alterada: alguém poderia mandar um preço falso. O cálculo importante deve ser refeito ou validado no lado do sistema, que o cliente não controla." },
    { tipo: "quiz", itens: [
      { pergunta: "Quanto vale `17 % 5`?", opcoes: ["3, quantas vezes cabe", "2, o resto da divisão", "3.4, a divisão exata", "85, a multiplicação"], correta: 1, porque: "`%` devolve o **resto**: 17 = 3 × 5 + 2.", conceito: "operadores" },
      { pergunta: "Quanto vale `2 + 3 * 4`?", opcoes: ["14, multiplica primeiro", "20, soma primeiro", "24, tudo em sequência", "9, soma tudo junto"], correta: 0, porque: "A multiplicação acontece antes da soma, a menos que haja parênteses.", conceito: "operadores" },
      { pergunta: "Qual operador calcula a potência de um número?", opcoes: ["// , divisão inteira", "% , resto da divisão", "* , multiplicação", "** , dois asteriscos"], correta: 3, porque: "`**` eleva à potência: `2 ** 3` é 8.", conceito: "operadores" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: para que servem `//` e `%` e quando os parênteses mudam o resultado de uma conta?", conceito: "operadores", modelo: "`//` dá a parte inteira da divisão e `%` dá o resto. Parênteses mudam a ordem: o que está dentro é calculado primeiro (por exemplo, `(2 + 3) * 4` dá 20, enquanto `2 + 3 * 4` dá 14)." },
  ],
  recuperacao: [
    { p: "O que `%` calcula? Dê um exemplo.", regex: "(resto|sobra)", modelo: "O resto da divisão: `17 % 5` é 2.", conceito: "operadores" },
    { p: "Quanto vale `2 + 3 * 4` e por quê?", regex: "14;;(multiplic|antes|primeiro|ordem|prioridade)", modelo: "14: a multiplicação acontece antes da soma.", conceito: "operadores" },
    { p: "Como fazer a soma acontecer antes da multiplicação?", regex: "(parentes)", modelo: "Com parênteses: `(2 + 3) * 4`.", conceito: "operadores" },
  ],
});

// ---------- Aula 5: input ----------
aulas.push({
  id: "0005", modulo: 1, n: 5, slug: "entrada", titulo: "Falando com o robô: perguntas com input()",
  resumo: "Até agora os valores estavam escritos no programa. Hoje o robô pergunta à pessoa, e você descobre por que a resposta sempre chega como texto.",
  objetivos: ["Usar `input()` para pedir dados.", "Explicar por que a resposta do `input()` é sempre texto.", "Converter a resposta para número antes de fazer contas."],
  conceitos: [["entrada", "Entrada de dados (input)"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Num café de verdade, quem diz quantos cafés o cliente quer? Como o programa do robô poderia perguntar isso a uma pessoa?", modelo: "A informação vem da pessoa, em tempo de uso, e não está escrita no programa. Em Python, a função **`input()`** faz a pergunta e espera a resposta." },
    { tipo: "exemplo", arquivo: "pergunta.py", entradas: ["Lia"], texto: "Clique em cada linha. Quando o programa roda, as respostas vêm da caixa de entradas.",
      codigo: [["nome = input(\"Qual é o seu nome? \")", "`input` mostra a pergunta, **espera** a pessoa digitar e devolve o que ela digitou. O valor fica guardado em `nome`."], ["print(\"Olá,\", nome)", "Usa o que a pessoa digitou. Se digitar Lia, mostra `Olá, Lia`."]],
      termos: [["input()", "pede um dado à pessoa e devolve o que ela digitou, **sempre como texto**."]] },
    { tipo: "executar", texto: "Rode. As respostas vêm da caixa **Entradas** (uma por linha, na ordem das perguntas). Mude os valores e rode de novo.", arquivo: "pedido.py (pode editar)", entradas: ["Lia", "2"],
      codigo: `nome = input("Nome do cliente: ")
qtd = input("Quantos cafés? ")
print(nome, "pediu", qtd, "cafés")`,
      prever: { enunciado: "Antes de testar: com as entradas Lia e 2, qual é a **última linha** exibida?", conceito: "entrada", itens: [{ codigo: `nome = input("Nome do cliente: ")
qtd = input("Quantos cafés? ")
print(nome, "pediu", qtd, "cafés")`, entradas: ["Lia", "2"], resposta: "Lia pediu 2 cafés", porque: "As duas respostas ficam guardadas e o `print` junta tudo com espaços." }] } },
    { tipo: "descobrir", texto: "O programa guarda a resposta em `qtd` e depois faz `qtd + qtd`. A pessoa digitou 2.", tabela: { cab: ["Como lemos", "Resultado de `qtd + qtd`"], linhas: [["`qtd = input()`", "`22`"], ["`qtd = int(input())`", "`4`"]] },
      pergunta: "Por que a primeira versão dá 22 e a segunda dá 4?", dicas: ["O que você aprendeu na aula passada sobre `\"2\" + \"2\"`?", "O que o `int(...)` faz com o que o `input()` devolve?"],
      explicacao: "O `input()` devolve **texto**: \"2\" + \"2\" junta e dá \"22\". Com `int(input())` a resposta é convertida em número antes da conta, então 2 + 2 = 4.", conceito: "entrada" },
    { tipo: "prever", conceito: "entrada", itens: [
      { codigo: `n = input("n: ")
print(n * 2)`, entradas: ["3"], resposta: "33", porque: "`n` é o texto \"3\"; texto vezes 2 repete: \"33\"." },
      { codigo: `n = int(input("n: "))
print(n * 2)`, entradas: ["3"], resposta: "6", porque: "`int` converte para o número 3; 3 × 2 = 6." },
      { codigo: `a = int(input())
b = int(input())
print(a + b)`, entradas: ["4", "5"], resposta: "9", porque: "Duas respostas convertidas em número: 4 + 5 = 9." }] },
    { tipo: "corrigir", texto: "O robô pergunta a quantidade, mas a conta dá erro. Conserte **uma linha**.", arquivo: "com_defeito.py", entradas: ["3"],
      codigo: `qtd = input("Quantos cafés? ")
total = qtd * 4.5
print("Total:", total)`, esperado: ["Quantos cafés? 3", "Total: 13.5"], dica: "A resposta do `input()` é texto. Converta com `int(...)` antes de multiplicar.", conceito: "entrada",
      solucao: `qtd = int(input("Quantos cafés? "))
total = qtd * 4.5
print("Total:", total)` },
    { tipo: "escrever", texto: "Faça o programa pedir `Nome: ` e `Quantidade: ` (exatamente assim, com os dois-pontos e o espaço) e mostrar `Lia: 2 cafés = R$ 9.0`. O café custa 4.5.", arquivo: "meu_programa.py", entradas: ["Lia", "2"],
      inicial: `nome = input("Nome: ")
# peça a quantidade, calcule e mostre
`, esperado: ["Nome: Lia", "Quantidade: 2", "Lia: 2 cafés = R$ 9.0"], dica: "`qtd = int(input(\"Quantidade: \"))` e depois `print(nome + \":\", qtd, \"cafés = R$\", qtd * 4.5)`.", conceito: "entrada",
      solucao: `nome = input("Nome: ")
qtd = int(input("Quantidade: "))
print(nome + ":", qtd, "cafés = R$", qtd * 4.5)` },
    { tipo: "aberta", tag: "sec", titulo: "O que não perguntar", texto: "Para anotar um pedido de café, o robô poderia pedir nome, CPF, endereço e até a senha do cliente.", pergunta: "O que o robô realmente precisa perguntar? E por que uma senha digitada num `input()` é uma má ideia?", conceito: "privacidade", modelo: "Só o necessário para preparar e entregar o pedido (por exemplo, o tipo de café e um nome para chamar). O `input()` mostra o que a pessoa digita, então uma senha ficaria visível na tela. Pedir menos dados também reduz o dano se algo vazar." },
    { tipo: "quiz", itens: [
      { pergunta: "O que o `input()` devolve?", opcoes: ["Um número inteiro sempre", "Um texto, sempre (str)", "Um valor True ou False", "Nada, só mostra a pergunta"], correta: 1, porque: "Tudo o que a pessoa digita chega como **texto**.", conceito: "entrada" },
      { pergunta: "Qual linha lê um número inteiro digitado?", opcoes: ["n = str(input())", "n = input(int())", "n = int(input())", "n = input() + 0"], correta: 2, porque: "`int(input())` converte o texto digitado em número.", conceito: "entrada" },
      { pergunta: "Com a resposta 4 digitada, `n = input()` e `print(n + n)` mostram:", opcoes: ["8, a soma dos números", "44, os textos juntos", "Um erro de tipo mesmo", "n + n, do jeito escrito"], correta: 1, porque: "\"4\" + \"4\" junta textos: 44. Seria 8 só com `int`.", conceito: "entrada" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que faz o `input()` e por que quase sempre usamos `int()` ou `float()` junto?", conceito: "entrada", modelo: "`input()` pergunta algo à pessoa e devolve o que ela digitou, sempre como texto. Para fazer contas com a resposta, convertemos com `int()` ou `float()`." },
  ],
  recuperacao: [
    { p: "O que o `input()` faz?", regex: "(pergunt|pede|le |ler|recebe|digit|espera)", modelo: "Mostra uma pergunta, espera a pessoa digitar e devolve o que ela digitou.", conceito: "entrada" },
    { p: "Que tipo de valor o `input()` devolve?", regex: "(texto|str|string)", modelo: "Sempre texto (str), mesmo que a pessoa digite um número.", conceito: "entrada" },
    { p: "Como somar dois números lidos com `input()`?", regex: "(int|float)", modelo: "Convertendo cada resposta com `int(...)` (ou `float`) antes de somar.", conceito: "entrada" },
  ],
});

// ---------- Aula 6: f-strings ----------
aulas.push({
  id: "0006", modulo: 1, n: 6, slug: "formatacao", titulo: "Montando frases: f-strings e valores bonitos",
  resumo: "O robô aprende a escrever mensagens com valores no meio, e a mostrar dinheiro com duas casas decimais.",
  objetivos: ["Montar frases com `f\"...\"` e chaves.", "Mostrar números com casas decimais fixas (`:.2f`).", "Evitar o erro mais comum: esquecer o `f`."],
  conceitos: [["formatacao", "f-strings e formatação de números"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Misturar texto e valores com vírgulas no `print` funciona, mas fica estranho para dinheiro (13.5 em vez de 13,50). Como você gostaria de montar a frase `Pedido de Lia: R$ 13.50`?", modelo: "Queremos escrever a frase com “buracos” que são preenchidos com valores e controlar o formato do número. É para isso que servem as **f-strings**." },
    { tipo: "exemplo", arquivo: "cupom.py", texto: "Clique em cada linha.",
      codigo: [["nome = \"Lia\"", "Uma variável de texto."], ["total = 13.5", "Uma variável numérica."], ["print(f\"Pedido de {nome}: R$ {total:.2f}\")", "O **f** antes das aspas liga o modo especial: tudo entre `{ }` é calculado e entra na frase. `:.2f` mostra o número com 2 casas decimais: `13.50`."]],
      termos: [["f-string", "texto com `f` antes das aspas, em que `{valor}` é substituído pelo valor."], ["`:.2f`", "formato que mostra um número com 2 casas decimais."]] },
    { tipo: "executar", texto: "Rode e depois mude `total` para `7` e `:.2f` para `:.1f`.", arquivo: "cupom.py (pode editar)", codigo: `nome = "Lia"
total = 13.5
print(f"Pedido de {nome}: R$ {total:.2f}")`,
      prever: { enunciado: "Antes de testar:", conceito: "formatacao", itens: [{ codigo: 'print(f"{2 + 3} xícaras")', resposta: "5 xícaras", porque: "Dentro das chaves cabe uma conta: 2 + 3 vira 5." }, { codigo: `x = 7
print(f"{x:.2f}")`, resposta: "7.00", porque: "`:.2f` sempre mostra duas casas decimais: 7.00." }] } },
    { tipo: "descobrir", tabela: { cab: ["Código", "O que aparece"], linhas: [["`print(\"Total:\", 13.5)`", "`Total: 13.5`"], ["`print(f\"Total: {13.5:.2f}\")`", "`Total: 13.50`"], ["`print(\"Total: {13.5}\")`", "`Total: {13.5}`"]] },
      pergunta: "O que o `f` muda? E o que acontece com as chaves quando esquecemos o `f`?", dicas: ["Compare as duas últimas linhas: só o `f` mudou.", "Sem o `f`, o Python trata as chaves como texto comum?"],
      explicacao: "Com o `f`, o que está entre chaves é substituído pelo valor (e pode ser formatado). Sem o `f`, as chaves são só texto e aparecem como estão.", conceito: "formatacao" },
    { tipo: "prever", conceito: "formatacao", itens: [
      { codigo: `nome = "Teo"
print(f"Olá, {nome}!")`, resposta: "Olá, Teo!", porque: "O valor de `nome` entra no lugar das chaves." },
      { codigo: `preco = 4.5
qtd = 3
print(f"R$ {preco * qtd:.2f}")`, resposta: "R$ 13.50", porque: "Dentro das chaves vale a conta 4.5 × 3 = 13.5, formatada com 2 casas." },
      { codigo: `print(f"{10 / 4:.1f}")`, resposta: "2.5", porque: "10 / 4 = 2.5; com 1 casa decimal continua 2.5." }] },
    { tipo: "corrigir", texto: "O robô queria dar bom dia pelo nome, mas as chaves apareceram na tela. Conserte **mudando uma coisa**.", arquivo: "com_defeito.py",
      codigo: `nome = "Lia"
print("Olá, {nome}!")`, esperado: ["Olá, Lia!"], dica: "Falta algo antes das aspas para ativar as chaves.", conceito: "formatacao",
      solucao: `nome = "Lia"
print(f"Olá, {nome}!")` },
    { tipo: "escrever", texto: "Com `qtd = 6` e `preco = 4.5`, use uma f-string para mostrar `Total: R$ 27.00`.", arquivo: "meu_programa.py",
      inicial: `qtd = 6
preco = 4.5
# mostre o total com 2 casas decimais
`, esperado: ["Total: R$ 27.00"], dica: "`print(f\"Total: R$ {qtd * preco:.2f}\")`", conceito: "formatacao",
      solucao: `qtd = 6
preco = 4.5
print(f"Total: R$ {qtd * preco:.2f}")` },
    { tipo: "aberta", tag: "sec", titulo: "O que vai no cupom?", texto: "O robô imprime um cupom para cada pedido, e o cupom fica na bancada.", pergunta: "Que dados do cliente você colocaria no cupom e quais evitaria? Por quê?", modelo: "Colocaria só o necessário para identificar o pedido (número, itens, valor, talvez um primeiro nome). Evitaria CPF, endereço e telefone: um cupom na bancada pode ser lido por qualquer pessoa, e dados pessoais devem aparecer o mínimo possível.", conceito: "privacidade" },
    { tipo: "quiz", itens: [
      { pergunta: "O que o `f` antes das aspas faz?", opcoes: ["Troca `{}` pelos valores", "Deixa o texto mais rápido", "Transforma tudo em float", "Impede que haja erros"], correta: 0, porque: "Liga a substituição do que está entre chaves pelo valor.", conceito: "formatacao" },
      { pergunta: "O que `f\"{3.14159:.2f}\"` produz?", opcoes: ["3.14159, sem mudar nada", "3.1, só uma casa decimal", "3, só a parte inteira", "3.14, com duas casas"], correta: 3, porque: "`:.2f` arredonda para duas casas decimais: 3.14.", conceito: "formatacao" },
      { pergunta: "Por que `print(\"Olá, {nome}\")` mostra as chaves?", opcoes: ["A variável nome não existe", "Esqueceu o f antes das aspas", "O print não aceita chaves", "O texto precisa de vírgula"], correta: 1, porque: "Sem o `f`, as chaves são texto comum.", conceito: "formatacao" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como você mostra o valor 13.5 como `R$ 13.50` dentro de uma frase?", conceito: "formatacao", modelo: "Com uma f-string e o formato de duas casas: `print(f\"R$ {total:.2f}\")`." },
  ],
  recuperacao: [
    { p: "Para que serve o `f` antes das aspas de um texto?", regex: "(substitu|valor|chaves|variavel|\\{)", modelo: "Para que o que está entre chaves seja substituído pelo valor (f-string).", conceito: "formatacao" },
    { p: "O que significa `:.2f` dentro das chaves?", regex: "(2|duas);;(casa|decimal|virgula|float)", modelo: "Mostrar o número com 2 casas decimais.", conceito: "formatacao" },
    { p: "O que aparece se esquecermos o `f` em `print(\"Olá, {nome}\")`?", regex: "(chaves|literal|do jeito|como esta|igual|texto);;", modelo: "As chaves aparecem do jeito que estão: `Olá, {nome}`.", conceito: "formatacao" },
  ],
});

// ---------- Aula 7: erros e comentários ----------
aulas.push({
  id: "0007", modulo: 1, n: 7, slug: "erros-e-comentarios", titulo: "Quando o robô trava: ler erros e deixar comentários",
  resumo: "Erros são conversa, não castigo: o Python diz o tipo do problema e a linha. Hoje você aprende a ler isso e a deixar recados para humanos.",
  objetivos: ["Ler o tipo e a linha de uma mensagem de erro.", "Reconhecer `SyntaxError`, `NameError` e `TypeError`.", "Usar comentários (`#`) para explicar o código."],
  conceitos: [["comentarios", "Comentários no código"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Quando uma máquina trava, que informação você gostaria que ela desse? Pense num caixa eletrônico que falha: o que ajudaria quem precisa consertar?", modelo: "Ajuda saber **o que** deu errado e **onde**. O Python faz isso: diz o tipo do erro, descreve em uma frase e aponta a linha. Ler isso com calma resolve a maioria dos problemas." },
    { tipo: "exemplo", arquivo: "comentarios.py", texto: "Comentários começam com `#`: o Python ignora, e as pessoas leem. Clique em cada linha.",
      codigo: [["# Preço de um café, em reais", "Uma linha começada por `#` é só um recado para humanos. O Python pula."], ["preco = 4.5", "Variável com o preço."], ["qtd = 3  # quantidade pedida", "Também dá para comentar no fim da linha."], ["print(\"Total:\", preco * qtd)", "Mostra `Total: 13.5`."]],
      termos: [["Comentário", "texto depois de `#` que o Python ignora e serve para explicar o código a quem lê."]] },
    { tipo: "executar", texto: "Este programa tem um defeito de propósito. Rode e **leia** a mensagem na caixa vermelha: ela diz o tipo, a explicação e a linha.", arquivo: "erro.py (pode editar)", codigo: `xicaras = 3
print(Xicaras)`,
      erroEsperado: "NameError",
      prever: { enunciado: "Qual é o **tipo** do erro? (uma palavra)", conceito: "ler_erro", itens: [{ codigo: `xicaras = 3
print(Xicaras)`, erro: "NameError", resposta: "NameError", pergunta: "Tipo do erro:", porque: "O nome `Xicaras` (com X maiúsculo) não existe: o Python diferencia maiúsculas de minúsculas, então é outro nome." }] } },
    { tipo: "descobrir", tabela: { cab: ["Erro", "Exemplo de causa"], linhas: [["`SyntaxError`", "aspas ou parênteses faltando"], ["`NameError`", "nome escrito diferente ou usado antes de criar"], ["`TypeError`", "misturar texto com número"]] },
      pergunta: "Se a mensagem diz `TypeError`, o que você olharia primeiro no código? E se disser `SyntaxError`?", dicas: ["O nome do erro é uma pista da **categoria** do problema.", "`TypeError` fala de tipos; `SyntaxError` fala da escrita da linha."],
      explicacao: "`TypeError`: procurar onde se mistura texto com número (falta converter com `int()`/`str()`). `SyntaxError`: procurar a linha com aspas, parênteses ou dois-pontos faltando. O nome do erro diz **por onde começar**.", conceito: "ler_erro" },
    { tipo: "prever", texto: "Para cada programa, diga o tipo do erro que o Python mostra (uma palavra).", conceito: "ler_erro", itens: [
      { codigo: 'print("olá)', erro: "SyntaxError", resposta: "SyntaxError", pergunta: "Tipo do erro:", porque: "A aspa de fechar está faltando: o Python não entende a linha." },
      { codigo: 'total = "3" + 4', erro: "TypeError", resposta: "TypeError", pergunta: "Tipo do erro:", porque: "Somar texto com número não tem resposta óbvia." },
      { codigo: "print(preco)", erro: "NameError", resposta: "NameError", pergunta: "Tipo do erro:", porque: "A variável `preco` nunca foi criada." }] },
    { tipo: "corrigir", texto: "Há **um** erro neste programa. Leia a mensagem, ache a linha e conserte.", arquivo: "com_defeito.py",
      codigo: `# Total do pedido
preco = 4.5
qtd = 2
print("Total:", Preco * qtd)`, esperado: ["Total: 9.0"], dica: "Compare o nome da variável na última linha com o da segunda linha.", conceito: "ler_erro",
      solucao: `# Total do pedido
preco = 4.5
qtd = 2
print("Total:", preco * qtd)` },
    { tipo: "escrever", texto: "Mostre `Preço do café: 4.5` usando uma variável `preco`, e coloque **um comentário** acima da variável explicando o que ela guarda. (O comentário não aparece na tela.)", arquivo: "meu_programa.py",
      inicial: `# escreva aqui
`, esperado: ["Preço do café: 4.5"], testes: [["preco", "4.5"]], dica: "Uma linha `# ...`, depois `preco = 4.5` e o `print`.", conceito: "comentarios",
      solucao: `# Preço do café, em reais
preco = 4.5
print("Preço do café:", preco)` },
    { tipo: "aberta", tag: "sec", titulo: "O que o erro pode vazar?", texto: "Quando um sistema falha, a mensagem de erro às vezes mostra nomes de arquivos, de variáveis e até dados que estavam sendo usados.", pergunta: "O que **não** deveria aparecer numa mensagem de erro mostrada ao cliente? E onde essas informações detalhadas deveriam ir?", conceito: "privacidade", modelo: "Não deve aparecer senha, dado pessoal, caminho de pastas nem detalhes internos do sistema: ajudam quem quer atacar. O cliente vê uma mensagem simples; os detalhes vão para um registro (log) interno, sem dados pessoais." },
    { tipo: "quiz", itens: [
      { pergunta: "O que um comentário (`#`) faz?", opcoes: ["O Python ignora, humanos leem", "O Python mostra na tela agora", "O Python guarda como variável", "O Python executa como conta"], correta: 0, porque: "É um recado para quem lê o código.", conceito: "comentarios" },
      { pergunta: "`print(Preco)` quando só existe `preco` causa:", opcoes: ["SyntaxError, linha mal escrita", "TypeError, tipos misturados", "ZeroDivisionError, divisão por 0", "NameError, nome desconhecido"], correta: 3, porque: "O nome com P maiúsculo é outro nome, que não existe.", conceito: "ler_erro" },
      { pergunta: "Numa mensagem de erro, o que ajuda a achar o problema?", opcoes: ["O tipo do erro e a linha", "Só a cor vermelha da letra", "A hora em que o erro ocorreu", "O tamanho do arquivo do código"], correta: 0, porque: "O tipo diz a categoria; a linha diz onde procurar.", conceito: "ler_erro" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que você olha primeiro numa mensagem de erro do Python?", conceito: "ler_erro", modelo: "O **tipo** do erro (SyntaxError, NameError, TypeError...) e a **linha** indicada, depois a explicação. Isso diz por onde começar a procurar." },
  ],
  recuperacao: [
    { p: "Para que serve um comentário com `#`?", regex: "(ignor|humano|explic|recado|nota|lembrete|nao executa|pessoas)", modelo: "Para explicar o código a quem lê: o Python ignora a linha.", conceito: "comentarios" },
    { p: "O que significa um `NameError`?", regex: "(nome|variavel);;(nao existe|nao conhec|nao foi|nao defin|diferente|escrit)", modelo: "O Python não conhece o nome: foi escrito diferente (maiúsculas contam) ou a variável não foi criada.", conceito: "ler_erro" },
    { p: "Que duas informações de uma mensagem de erro ajudam a achar o problema?", regex: "(tipo|nome do erro);;(linha)", modelo: "O tipo do erro (por exemplo, TypeError) e a linha onde ele aconteceu.", conceito: "ler_erro" },
  ],
});

// ---------- Aula 8: mini-projeto ----------
aulas.push({
  id: "0008", modulo: 1, n: 8, slug: "mini-projeto", titulo: "Mini-projeto: o robô anota o pedido",
  resumo: "Hora de juntar tudo: o robô pergunta, calcula e mostra o pedido de café e pão, sem receita pronta. Depois, o mesmo raciocínio num problema novo.",
  minutos: 40,
  objetivos: ["Combinar variáveis, tipos, `input()`, operadores e f-strings num programa só.", "Resolver o exercício final sem usar a dica.", "Aplicar os mesmos conceitos a um problema novo (horas de estudo da semana)."],
  conceitos: [],
  secoes: [
    { tipo: "aquecimento", titulo: "Planeje antes de escrever", pergunta: "Liste, em ordem, o que o robô precisa fazer para anotar um pedido de café e pão: o que pergunta, o que calcula e o que mostra.", minimo: 40, modelo: "Uma boa lista: (1) perguntar o nome; (2) perguntar quantos cafés; (3) perguntar quantos pães; (4) converter as respostas em números; (5) calcular o valor dos cafés, dos pães e o total; (6) mostrar tudo formatado. Planejar em passos antes de codar é o seu **algoritmo**." },
    { tipo: "exemplo", titulo: "Um esqueleto de referência", arquivo: "esqueleto.py", entradas: ["Estudar", "3"], texto: "Este esqueleto mostra a estrutura (perguntar, converter, calcular, mostrar) com outro tema. Use como mapa, não como cola.",
      codigo: [["tarefa = input(\"Tarefa: \")", "Pergunta algo e guarda como texto."], ["horas = int(input(\"Horas: \"))", "Pergunta e **converte** para número, tudo na mesma linha."], ["custo = horas * 20", "Calcula usando um operador."], ["print(f\"{tarefa}: {horas} h = R$ {custo:.2f}\")", "Mostra o resultado formatado com f-string."]] },
    { tipo: "escrever", titulo: "Exercício final (sem dica)", final: true, texto: "Escreva o programa. Ele deve perguntar `Nome: `, `Cafés: ` e `Pães: ` (exatamente assim). O café custa 4.5 e o pão custa 3. Com as entradas Lia, 2 e 1, a saída deve ser exatamente:\n\n`Nome: Lia` · `Cafés: 2` · `Pães: 1` · `Pedido de Lia` · `Cafés: R$ 9.00` · `Pães: R$ 3.00` · `Total: R$ 12.00`.", arquivo: "pedido.py", entradas: ["Lia", "2", "1"], minutos: 12,
      inicial: `# Planeje: perguntar, converter, calcular, mostrar
`, esperado: ["Nome: Lia", "Cafés: 2", "Pães: 1", "Pedido de Lia", "Cafés: R$ 9.00", "Pães: R$ 3.00", "Total: R$ 12.00"],
      dica: "Três `input`, dois deles com `int(...)`. Calcule `cafes * 4.5` e `paes * 3`, some, e mostre cada linha com f-string e `:.2f`.", conceito: ["variaveis", "tipos", "entrada", "operadores", "formatacao"],
      solucao: `nome = input("Nome: ")
cafes = int(input("Cafés: "))
paes = int(input("Pães: "))
valor_cafes = cafes * 4.5
valor_paes = paes * 3
total = valor_cafes + valor_paes
print(f"Pedido de {nome}")
print(f"Cafés: R$ {valor_cafes:.2f}")
print(f"Pães: R$ {valor_paes:.2f}")
print(f"Total: R$ {total:.2f}")` },
    { tipo: "escrever", titulo: "Problema novo: as horas de estudo da semana", transfer: true, texto: "Agora outro contexto, mesmos conceitos. Peça `Segunda: `, `Terça: ` e `Quarta: ` (horas estudadas, números inteiros). Com as entradas 2, 3 e 1, mostre `Total de horas: 6` e `Média por dia: 2.0`.", arquivo: "semana.py", entradas: ["2", "3", "1"], minutos: 10,
      inicial: `# Pergunte as horas de cada dia, some e calcule a média
`, esperado: ["Segunda: 2", "Terça: 3", "Quarta: 1", "Total de horas: 6", "Média por dia: 2.0"], dica: "Três `int(input(...))`, a soma e a média (soma dividida por 3 com `/`).", conceito: ["variaveis", "entrada", "operadores"],
      solucao: `seg = int(input("Segunda: "))
ter = int(input("Terça: "))
qua = int(input("Quarta: "))
total = seg + ter + qua
print("Total de horas:", total)
print("Média por dia:", total / 3)` },
    { tipo: "aberta", tag: "sec", titulo: "Onde ficam os pedidos?", texto: "O robô agora anota nome e pedido de cada cliente. Se um dia o programa guardar esses pedidos num arquivo, o arquivo passa a ter dados pessoais.", pergunta: "Que cuidados você teria com esse arquivo (quem pode abrir, o que guardar, por quanto tempo)?", conceito: "privacidade", modelo: "Guardar só o necessário (por exemplo, só um primeiro nome), deixar o arquivo acessível apenas a quem precisa, apagar depois que o pedido terminar e nunca enviar o arquivo por canais abertos. Quanto menos dado pessoal guardado, menor o estrago se algo vazar." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual é a melhor ordem para o programa do pedido?", opcoes: ["Calcular, perguntar, converter e mostrar", "Mostrar, perguntar, calcular e converter", "Perguntar, converter, calcular e mostrar", "Converter, mostrar, perguntar e calcular"], correta: 2, porque: "Primeiro obtém-se o dado, converte-se em número, calcula-se e só depois mostra-se.", conceito: "entrada" },
      { pergunta: "Por que o `int()` vem antes de multiplicar a quantidade?", opcoes: ["Porque o input devolve texto", "Porque o int deixa mais rápido", "Porque o Python pede sempre", "Porque números ficam bonitos"], correta: 0, porque: "O `input()` devolve texto; sem converter, a conta dá erro ou repete o texto.", conceito: "tipos" },
      { pergunta: "O que `f\"{total:.2f}\"` faz com `total = 12`?", opcoes: ["Mostra 12 sem decimais", "Mostra 12.0 com um decimal", "Dá erro, pois 12 é inteiro", "Mostra 12.00 com dois decimais"], correta: 3, porque: "`:.2f` sempre mostra duas casas decimais.", conceito: "formatacao" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: descreva em passos o que o seu programa do pedido faz, do início ao fim.", conceito: "programa", modelo: "Pergunta o nome, os cafés e os pães; converte as quantidades em números; calcula o valor de cada item e o total; mostra tudo formatado. É um algoritmo: passos exatos, em ordem." },
  ],
  recuperacao: [
    { p: "Em que ordem fica um programa que pergunta quantidades e calcula um total?", regex: "(pergunt|input|le );;(convert|int);;(calcul|conta);;(mostr|print)", modelo: "Pergunta, converte para número, calcula e mostra.", conceito: "programa" },
    { p: "Por que a quantidade lida com `input()` precisa de `int()` antes da conta?", regex: "(texto|string|str)", modelo: "Porque o `input()` devolve texto; `int()` converte em número para a conta funcionar.", conceito: "entrada" },
    { p: "Qual formato mostra um valor em reais com duas casas decimais?", regex: "(2f|duas casas|f-string|f\"|\\.2)", modelo: "Uma f-string com `:.2f`, por exemplo `f\"R$ {total:.2f}\"`.", conceito: "formatacao" },
  ],
});

export default aulas;
