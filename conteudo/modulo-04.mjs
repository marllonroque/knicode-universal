// Módulo 4: Funções, receitas com nome (universal). Fio condutor: o caixa e o estoque da cafeteria do robô.
export const meta = {
  final: "Mini-projeto: o caixa da cafeteria com funções",
  transfer: "Aplicar funções ao controle de estoque",
};
const aulas = [];

// ---------- Aula 25: def ----------
aulas.push({
  id: "0025", modulo: 4, n: 1, slug: "def", titulo: "Receitas com nome: definir e chamar funções",
  resumo: "O robô usa o mesmo passo a passo em vários lugares. Em vez de copiar, ele dá um nome ao passo a passo e o chama quando precisar.",
  objetivos: ["Definir uma função com `def`.", "Chamar a função quantas vezes quiser.", "Explicar a diferença entre **definir** e **chamar**."],
  conceitos: [["funcao_def", "Definir e chamar funções"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O robô tem um passo a passo de boas-vindas que usa em vários momentos do dia. Em vez de copiar essas linhas em todo lugar, como você daria um **nome** a esse passo a passo e o chamaria quando precisasse?", modelo: "Como uma receita guardada no caderno: você a escreve **uma vez**, dá um nome e depois só diz “faça a receita X”. Em programação isso é uma **função**: um bloco com nome que pode ser chamado quantas vezes for preciso." },
    { tipo: "exemplo", arquivo: "funcao.py", texto: "Clique em cada linha.",
      codigo: [["def saudar():", "**`def`** define uma função chamada `saudar`. Os parênteses ficam vazios por enquanto e a linha termina com dois-pontos. **Definir não executa nada**: só guarda a receita."], ["    print(\"Olá! Bem-vindo ao café\")", "O corpo da função: indentado, como num `if` ou num `for`."], ["    print(\"O que vai ser hoje?\")", "Outra linha do corpo."], ["saudar()", "**Chamar** a função: os parênteses fazem ela rodar agora, executando as duas linhas."], ["saudar()", "Chamar de novo: roda tudo outra vez, sem copiar o código."]],
      termos: [["Função", "um bloco de instruções com nome, que pode ser executado quando chamado."], ["Definir", "escrever a função com `def` (só guarda a receita)."], ["Chamar", "usar o nome seguido de parênteses para executar a função."]] },
    { tipo: "executar", texto: "Rode e depois chame `servir()` mais uma vez.", arquivo: "funcao.py (pode editar)", codigo: `def servir():
    print("Servindo")
servir()
servir()`,
      prever: { enunciado: "Antes de testar, qual é a **última linha** exibida?", conceito: "funcao_def", itens: [{ codigo: `def oi():
    print("oi")
print("antes")`, resposta: "antes", porque: "A função foi só **definida**, nunca chamada: o `print(\"oi\")` não roda." }, { codigo: `def a():
    print("x")
print("y")
a()`, resposta: "x", porque: "Primeiro aparece “y”; depois a chamada `a()` executa o corpo e mostra “x”." }] } },
    { tipo: "descobrir", texto: "O programa define uma função e a chama duas vezes.", arquivo: "chamadas.py", codigo: `def chamar():
    print("rodei")
print("início")
chamar()
chamar()
print("fim")`,
      execucoes: [{ rotulo: "o programa acima", saida: ["início", "rodei", "rodei", "fim"] }],
      pergunta: "Quantas vezes “rodei” aparece e quantas vezes o corpo da função foi escrito? O que a linha do `def` faz sozinha?", dicas: ["Conte quantas linhas “rodei” aparecem e quantas linhas `print(\"rodei\")` existem no código.", "Existe alguma linha “rodei” **antes** de “início”? O que isso diz sobre o `def`?"],
      explicacao: "“rodei” aparece **duas vezes**, mas o corpo foi escrito **uma só**: é o ganho da função. A linha do `def` **não executa nada**, só guarda a receita; o corpo roda a cada **chamada** (`chamar()`).", conceito: "funcao_def" },
    { tipo: "prever", conceito: "funcao_def", itens: [
      { codigo: `def a():
    print("x")
a()
a()
a()`, resposta: "x", porque: "Cada chamada mostra “x”; a última linha exibida é “x”." },
      { codigo: `def a():
    print("1")
    print("2")
a()`, resposta: "2", porque: "O corpo roda inteiro: mostra 1 e depois 2." },
      { codigo: `print("A")
def b():
    print("B")
print("C")`, resposta: "C", porque: "O `def` não executa nada; aparecem só “A” e “C”." },
      { codigo: `def cumprimentar():
    print("bom dia")
for i in range(3):
    cumprimentar()`, resposta: "bom dia", porque: "A função é chamada 3 vezes dentro do laço." }] },
    { tipo: "corrigir", texto: "O robô definiu a função de boas-vindas, mas nada aparece. Conserte **uma linha**.", arquivo: "com_defeito.py", dica: "Definir só guarda a receita. O que falta para ela rodar?", conceito: "funcao_def",
      codigo: `def saudar():
    print("Olá")`, esperado: ["Olá"],
      solucao: `def saudar():
    print("Olá")
saudar()` },
    { tipo: "escrever", texto: "Defina uma função `cartao()` que mostra duas linhas: `*** CAFÉ ***` e `Obrigado!`. Depois **chame-a duas vezes**.", arquivo: "meu_programa.py",
      inicial: `# defina cartao() e chame duas vezes
`, esperado: ["*** CAFÉ ***", "Obrigado!", "*** CAFÉ ***", "Obrigado!"], testes: [["callable(cartao)", "True"]], dica: "`def cartao():` com os dois `print` indentados, e `cartao()` duas vezes, sem indentação.", conceito: "funcao_def",
      solucao: `def cartao():
    print("*** CAFÉ ***")
    print("Obrigado!")
cartao()
cartao()` },
    { tipo: "aberta", tag: "sec", titulo: "Um conserto, muitos lugares", texto: "Uma função `mostrar_cliente()` é usada em 20 telas do sistema. Um dia descobre-se que ela mostra o CPF inteiro, quando deveria mostrar só os últimos dígitos.", pergunta: "Que vantagem a função traz para corrigir esse problema de privacidade? E o que aconteceria se o código tivesse sido copiado em cada tela?", modelo: "Com a função, o conserto é feito em **um único lugar** e vale para as 20 telas. Com código copiado, seria preciso achar e corrigir 20 cópias, e esquecer uma delas deixaria o vazamento aberto. Reaproveitar código também reaproveita as correções de segurança." },
    { tipo: "quiz", itens: [
      { pergunta: "O que a linha `def saudar():` faz sozinha?", opcoes: ["Executa o corpo da função agora", "Apenas guarda a função com nome", "Repete a função duas vezes", "Mostra a palavra saudar na tela"], correta: 1, porque: "Definir só guarda a receita; nada roda até a chamada.", conceito: "funcao_def" },
      { pergunta: "Como chamar a função `saudar`?", opcoes: ["saudar, só com o nome", "def saudar, com a palavra def", "saudar(), com parênteses", "print saudar, com o print"], correta: 2, porque: "Os parênteses executam a função.", conceito: "funcao_def" },
      { pergunta: "Qual é a principal vantagem de uma função?", opcoes: ["Escrever uma vez e reusar", "Deixar o código mais lento", "Evitar usar variáveis", "Impedir qualquer erro"], correta: 0, porque: "O mesmo código pode ser chamado várias vezes, e corrigido num lugar só.", conceito: "funcao_def" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: qual a diferença entre definir e chamar uma função?", conceito: "funcao_def", modelo: "**Definir** (com `def`) só guarda a função com um nome, sem executar nada. **Chamar** (nome com parênteses) executa o corpo da função, quantas vezes for preciso." },
  ],
  recuperacao: [
    { p: "Qual a diferença entre definir e chamar uma função?", regex: "(defin|def );;(guard|nao executa|nao roda|receita)", modelo: "Definir guarda a função sem executar; chamar (com parênteses) executa o corpo.", conceito: "funcao_def" },
    { p: "Como se chama uma função de nome `servir`?", regex: "(servir\\(\\)|parentes)", modelo: "Com `servir()`: o nome seguido de parênteses.", conceito: "funcao_def" },
    { p: "Por que uma função ajuda a corrigir um problema de segurança?", regex: "(um (so )?lugar|so um lugar|unico lugar|todos os lugares|centraliz|uma vez|copias)", modelo: "Porque o conserto é feito em um só lugar e vale para todas as chamadas.", conceito: "funcao_def" },
  ],
});

// ---------- Aula 26: parâmetros ----------
aulas.push({
  id: "0026", modulo: 4, n: 2, slug: "parametros", titulo: "Funções com informações: parâmetros",
  resumo: "A função de boas-vindas dizia sempre a mesma coisa. Agora o robô a usa para cumprimentar cada cliente pelo nome, passando a informação por parâmetros.",
  objetivos: ["Criar funções com parâmetros.", "Passar valores na chamada (argumentos), na ordem certa.", "Explicar o que acontece quando a ordem ou a quantidade está errada."],
  conceitos: [["funcao_parametros", "Parâmetros e argumentos"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "A função `saudar()` sempre diz a mesma coisa. Como você faria o robô cumprimentar cada cliente **pelo nome**, sem criar uma função diferente para cada nome?", modelo: "A função precisa de um “buraco” que seja preenchido a cada chamada: o **nome**. Esse buraco se chama **parâmetro**, e o valor que entra nele, **argumento**." },
    { tipo: "exemplo", arquivo: "parametro.py", texto: "Clique em cada linha.",
      codigo: [["def saudar(nome):", "`nome` é o **parâmetro**: um nome que a função usa para receber uma informação."], ["    print(\"Olá,\", nome)", "Dentro da função, `nome` funciona como uma variável."], ["saudar(\"Lia\")", "Na chamada, `\"Lia\"` é o **argumento**: entra no parâmetro `nome`. Mostra `Olá, Lia`."], ["saudar(\"Teo\")", "Outra chamada, outro valor: `Olá, Teo`."]],
      termos: [["Parâmetro", "o nome que a função usa para receber uma informação (na definição)."], ["Argumento", "o valor entregue na chamada."]] },
    { tipo: "executar", texto: "Rode e depois chame `saudar` com seu nome.", arquivo: "parametro.py (pode editar)", codigo: `def saudar(nome):
    print("Olá,", nome)
saudar("Lia")
saudar("Teo")`,
      prever: { enunciado: "Antes de testar, o que aparece?", conceito: "funcao_parametros", itens: [{ codigo: `def dobro(n):
    print(n * 2)
dobro(5)`, resposta: "10", porque: "`n` recebe 5; `5 * 2` é 10." }, { codigo: `def soma(a, b):
    print(a + b)
soma(2, 3)`, resposta: "5", porque: "`a` recebe 2 e `b` recebe 3." }] } },
    { tipo: "descobrir", texto: "A função calcula o troco. Veja o que acontece com os valores em ordens diferentes.", arquivo: "troco.py", codigo: `def troco(pago, total):
    print(pago - total)
troco(x, y)`,
      execucoes: [{ prefixo: "x, y = 20, 13.5", saida: ["6.5"] }, { prefixo: "x, y = 13.5, 20", saida: ["-6.5"] }, { prefixo: "x, y = 50, 50", saida: ["0"] }], colunas: ["Valores de x, y", "O que aparece"],
      pergunta: "O que acontece quando trocamos a ordem dos valores na chamada? Como o Python sabe qual valor vai para qual parâmetro?", dicas: ["Compare as duas primeiras linhas: os mesmos números, em ordens diferentes.", "O primeiro valor da chamada vai para o primeiro parâmetro, e assim por diante."],
      explicacao: "Os valores entram nos parâmetros **pela posição**: o primeiro argumento vai para `pago` e o segundo para `total`. Trocar a ordem troca o significado: 20 − 13.5 dá 6.5, mas 13.5 − 20 dá −6.5. Por isso a ordem dos argumentos importa.", conceito: "funcao_parametros" },
    { tipo: "prever", conceito: "funcao_parametros", itens: [
      { codigo: `def ola(nome):
    print("Oi", nome)
ola("Ana")`, resposta: "Oi Ana", porque: "O argumento “Ana” entra no parâmetro `nome`." },
      { codigo: `def sub(a, b):
    print(a - b)
sub(10, 3)`, resposta: "7", porque: "`a` é 10 e `b` é 3." },
      { codigo: `def sub(a, b):
    print(a - b)
sub(3, 10)`, resposta: "-7", porque: "`a` é 3 e `b` é 10: a ordem mudou o resultado." },
      { codigo: `def repetir(texto, vezes):
    print(texto * vezes)
repetir("ha", 3)`, resposta: "hahaha", porque: "“ha” repetido 3 vezes." }] },
    { tipo: "corrigir", texto: "Chamaram a função com argumentos de menos e o Python reclamou. Conserte **a chamada** para somar 2 e 3.", arquivo: "com_defeito.py", dica: "A função tem dois parâmetros, então a chamada precisa de dois valores.", conceito: "funcao_parametros",
      codigo: `def soma(a, b):
    print(a + b)
soma(2)`, esperado: ["5"],
      solucao: `def soma(a, b):
    print(a + b)
soma(2, 3)` },
    { tipo: "escrever", texto: "Defina `area(largura, altura)` que mostra `Área: X` (largura vezes altura). Chame `area(3, 4)` e `area(5, 2)`.", arquivo: "meu_programa.py",
      inicial: `# defina area(largura, altura) e chame duas vezes
`, esperado: ["Área: 12", "Área: 10"], testes: [["callable(area)", "True"]], dica: "`def area(largura, altura):` com `print(\"Área:\", largura * altura)`.", conceito: "funcao_parametros",
      solucao: `def area(largura, altura):
    print("Área:", largura * altura)
area(3, 4)
area(5, 2)` },
    { tipo: "aberta", tag: "sec", titulo: "Passe só o que a função precisa", texto: "Uma função `enviar_recibo(cliente)` recebe o cadastro completo do cliente (nome, CPF, endereço, telefone), mas só usa o primeiro nome e o valor.", pergunta: "Qual é o problema de passar o cadastro inteiro? O que seria melhor?", modelo: "A função passa a ter acesso (e a poder vazar ou registrar) dados de que **não precisa**. É melhor receber só os parâmetros necessários (`primeiro_nome`, `valor`). Dar a cada parte do programa o mínimo de informação reduz o estrago de um erro ou ataque." },
    { tipo: "quiz", itens: [
      { pergunta: "Em `def saudar(nome):`, o que é `nome`?", opcoes: ["O argumento da chamada", "O parâmetro da função", "O texto que sai na tela", "O nome do arquivo todo"], correta: 1, porque: "O parâmetro é o nome na definição; o valor na chamada é o argumento.", conceito: "funcao_parametros" },
      { pergunta: "Como o Python liga argumentos a parâmetros?", opcoes: ["Pela ordem em que aparecem", "Pelo tamanho dos valores", "Pela ordem alfabética", "Pelo tipo dos valores"], correta: 0, porque: "O primeiro argumento vai para o primeiro parâmetro, e assim por diante.", conceito: "funcao_parametros" },
      { pergunta: "O que acontece ao chamar `soma(2)` se ela exige dois?", opcoes: ["Usa 0 no segundo valor", "Soma 2 mais 2 sozinho", "Mostra um erro de tipo", "Ignora a chamada toda"], correta: 2, porque: "Falta um argumento: o Python para com um `TypeError`.", conceito: "funcao_parametros" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que são parâmetros e argumentos e por que a ordem importa?", conceito: "funcao_parametros", modelo: "Parâmetros são os nomes que a função usa para receber informações; argumentos são os valores passados na chamada. Eles se ligam **pela posição**, então trocar a ordem troca o significado (como em `troco(20, 13.5)` e `troco(13.5, 20)`)." },
  ],
  recuperacao: [
    { p: "Qual a diferença entre parâmetro e argumento?", regex: "(parametro);;(argumento);;(chamada|definicao|valor|nome)", modelo: "Parâmetro é o nome na definição da função; argumento é o valor passado na chamada.", conceito: "funcao_parametros" },
    { p: "Como o Python liga os argumentos aos parâmetros?", regex: "(ordem|posicao|sequencia)", modelo: "Pela ordem (posição): o primeiro argumento vai para o primeiro parâmetro.", conceito: "funcao_parametros" },
    { p: "Por que passar só o necessário para uma função?", regex: "(minimo|necessari|menos dados|vaz|exposic|precisa)", modelo: "Para reduzir o acesso a dados desnecessários e o estrago caso algo vaze ou erre.", conceito: "funcao_parametros" },
  ],
});

// ---------- Aula 27: return ----------
aulas.push({
  id: "0027", modulo: 4, n: 3, slug: "return", titulo: "Devolver resultados: return",
  resumo: "Mostrar um valor na tela e **devolver** um valor são coisas diferentes. Hoje o robô aprende a calcular o total e entregá-lo a quem chamou.",
  objetivos: ["Usar `return` para devolver um resultado.", "Explicar a diferença entre `print` e `return`.", "Reconhecer por que uma função só com `print` devolve `None`."],
  conceitos: [["funcao_return", "return: devolver um resultado"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Uma função que só **mostra** o resultado na tela serve para conversar com a pessoa. E se outro trecho do programa precisar **usar** esse resultado para continuar uma conta? O que a função precisaria fazer?", modelo: "Precisa **entregar** o resultado a quem a chamou, para que ele possa ser guardado numa variável e usado em outras contas. Isso é o **`return`**: ele “devolve” um valor ao ponto do programa onde a função foi chamada." },
    { tipo: "exemplo", arquivo: "devolver.py", texto: "Clique em cada linha.",
      codigo: [["def total(preco, qtd):", "Uma função com dois parâmetros."], ["    return preco * qtd", "**`return`** calcula e **devolve** o valor, e a função termina aqui. Nada aparece na tela ainda."], ["valor = total(4.5, 3)", "A chamada **vale** o que a função devolveu (13.5), e esse valor fica guardado em `valor`."], ["print(\"Valor:\", valor)", "Agora sim, quem chamou decide mostrar: `Valor: 13.5`."]],
      termos: [["return", "devolve um valor a quem chamou a função e encerra a função."], ["None", "o valor “nada” que uma função devolve quando não tem `return`."]] },
    { tipo: "executar", texto: "Rode e depois troque os números da chamada.", arquivo: "devolver.py (pode editar)", codigo: `def total(preco, qtd):
    return preco * qtd
valor = total(4.5, 3)
print("Valor:", valor)`,
      prever: { enunciado: "Antes de testar, qual é a **última linha** exibida?", conceito: "funcao_return", itens: [{ codigo: `def dobro(n):
    return n * 2
print(dobro(4) + 1)`, resposta: "9", porque: "`dobro(4)` devolve 8, e 8 + 1 é 9." }, { codigo: `def f(n):
    print(n)
x = f(3)
print(x)`, resposta: "None", porque: "A função só **mostra** o 3 e não devolve nada, então `x` vale `None`." }] } },
    { tipo: "descobrir", texto: "Duas funções fazem a mesma conta, uma com `print` e outra com `return`.", arquivo: "print_ou_return.py", codigo: `def com_print(n):
    print(n * 2)
def com_return(n):
    return n * 2
a = com_print(3)
b = com_return(3)
print(a)
print(b)`,
      execucoes: [{ rotulo: "o programa acima", saida: ["6", "None", "6"] }],
      pergunta: "Por que `a` vale `None` e `b` vale 6? O que cada função faz com o resultado da conta?", dicas: ["A primeira linha “6” aparece **antes** de qualquer `print(a)`. Quem a mostrou?", "O que a função com `print` entrega de volta para quem a chamou?"],
      explicacao: "A função com `print` **mostra** o 6 na hora (a primeira linha), mas não devolve nada: `a` fica `None`. A função com `return` **entrega** o 6 a quem chamou, e `b` o guarda. Só um valor devolvido pode ser usado em outras contas.", conceito: "funcao_return" },
    { tipo: "prever", conceito: "funcao_return", itens: [
      { codigo: `def a():
    return 5
x = a() + a()
print(x)`, resposta: "10", porque: "Cada chamada devolve 5; 5 + 5 = 10." },
      { codigo: `def nome():
    return "Lia"
print("Olá,", nome())`, resposta: "Olá, Lia", porque: "A chamada vale o que foi devolvido: “Lia”." },
      { codigo: `def f(n):
    return n + 1
    print("nunca")
print(f(1))`, resposta: "2", porque: "O `return` encerra a função: o `print` depois dele nunca roda." },
      { codigo: `def media(a, b):
    return (a + b) / 2
print(media(4, 7))`, resposta: "5.5", porque: "(4 + 7) / 2 = 5.5." }] },
    { tipo: "corrigir", texto: "A função deveria **devolver** o dobro para a soma funcionar, mas só o mostra e dá erro. Conserte **uma palavra**.", arquivo: "com_defeito.py", dica: "Troque o que a função faz com o resultado: em vez de mostrar, devolver.", conceito: "funcao_return",
      codigo: `def dobro(n):
    print(n * 2)
resultado = dobro(5) + 1
print(resultado)`, esperado: ["11"],
      solucao: `def dobro(n):
    return n * 2
resultado = dobro(5) + 1
print(resultado)` },
    { tipo: "escrever", texto: "Defina `troco(pago, total)` que **devolve** o troco (`pago - total`). Depois mostre `Troco: 6.5` usando `troco(20, 13.5)`.", arquivo: "meu_programa.py",
      inicial: `# defina troco(pago, total) com return e mostre o troco de 20 para 13.5
`, esperado: ["Troco: 6.5"], testes: [["troco(20, 13.5)", "6.5"], ["troco(10, 10)", "0"], ["troco(5, 3)", "2"]], dica: "`return pago - total` e `print(\"Troco:\", troco(20, 13.5))`.", conceito: "funcao_return",
      solucao: `def troco(pago, total):
    return pago - total
print("Troco:", troco(20, 13.5))` },
    { tipo: "aberta", tag: "sec", titulo: "Devolva só o necessário", texto: "Uma função `buscar_cliente(id)` devolve o cadastro completo (nome, CPF, endereço), mesmo quando quem chamou só quer mostrar o primeiro nome.", pergunta: "Que risco existe em devolver mais do que o necessário? O que seria melhor?", modelo: "Quem chama passa a receber dados que não precisa, e eles podem acabar em telas, registros ou arquivos. É melhor a função devolver **só o necessário** (por exemplo, `primeiro_nome`) ou existirem funções separadas para cada necessidade, com controle de quem pode pedir cada uma." },
    { tipo: "quiz", itens: [
      { pergunta: "O que o `return` faz?", opcoes: ["Devolve um valor e encerra", "Mostra o valor na tela", "Repete a função de novo", "Apaga a variável usada"], correta: 0, porque: "Entrega o valor a quem chamou e termina a função.", conceito: "funcao_return" },
      { pergunta: "Uma função sem `return` devolve:", opcoes: ["0, o número zero", "None, o valor nada", "\"\", o texto vazio", "False, o falso"], correta: 1, porque: "Sem `return`, a função devolve `None`.", conceito: "funcao_return" },
      { pergunta: "Para usar o resultado de uma função numa conta, ela precisa:", opcoes: ["mostrar com print", "devolver com return", "ter muitos parâmetros", "ficar no fim do código"], correta: 1, porque: "Só o valor devolvido pode ser usado em outras contas.", conceito: "funcao_return" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: qual a diferença entre `print` e `return` dentro de uma função?", conceito: "funcao_return", modelo: "`print` **mostra** um valor na tela e não o entrega a ninguém (a função devolve `None`). `return` **devolve** o valor a quem chamou, que pode guardá-lo ou usá-lo em outras contas, e encerra a função." },
  ],
  recuperacao: [
    { p: "O que o `return` faz?", regex: "(devolve|entrega|retorna|valor);;(chamou|funcao|encerra|termina|resultado)", modelo: "Devolve um valor a quem chamou a função e encerra a função.", conceito: "funcao_return" },
    { p: "O que uma função sem `return` devolve?", regex: "(none|nada|nenhum)", modelo: "`None`, o valor “nada”.", conceito: "funcao_return" },
    { p: "Qual a diferença entre `print` e `return`?", regex: "(print|mostra|tela);;(return|devolve|entrega|usar|guardar)", modelo: "`print` mostra na tela; `return` devolve o valor para ser usado e guardado.", conceito: "funcao_return" },
  ],
});

// ---------- Aula 28: valores padrão ----------
aulas.push({
  id: "0028", modulo: 4, n: 4, slug: "padrao-nomeados", titulo: "Valores padrão e argumentos nomeados",
  resumo: "O café custa 4.5 quase sempre. Hoje a função aprende a assumir um valor “normal” quando ninguém informa, e a receber argumentos pelo nome.",
  objetivos: ["Definir parâmetros com valor padrão.", "Chamar funções com argumentos nomeados.", "Explicar por que os parâmetros com padrão ficam por último."],
  conceitos: [["funcao_padrao", "Valores padrão e argumentos nomeados"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O café custa 4.5 quase sempre, e só às vezes o preço muda. Como a função de calcular o total poderia usar 4.5 se ninguém informar o preço, mas aceitar outro quando informarem?", modelo: "A função pode ter um **valor padrão**: um valor que o parâmetro assume quando a chamada não dá nenhum. Em Python: `def total(qtd, preco=4.5):`." },
    { tipo: "exemplo", arquivo: "padrao.py", texto: "Clique em cada linha.",
      codigo: [["def total(qtd, preco=4.5):", "`preco=4.5` define o **valor padrão**: se a chamada não informar o preço, vale 4.5. `qtd` não tem padrão: é obrigatório."], ["    return qtd * preco", "Usa os dois valores."], ["print(total(2))", "Só `qtd`: o preço padrão é usado. `2 * 4.5 = 9.0`."], ["print(total(2, 5))", "Preço informado por posição: `2 * 5 = 10`."], ["print(total(preco=3, qtd=4))", "**Argumentos nomeados**: dá para informar pelo nome, em qualquer ordem. `4 * 3 = 12`."]],
      termos: [["Valor padrão", "o valor que um parâmetro assume quando a chamada não informa nenhum."], ["Argumento nomeado", "um argumento passado como `nome=valor`."]] },
    { tipo: "executar", texto: "Rode e depois chame `total(3)` e `total(3, preco=6)`.", arquivo: "padrao.py (pode editar)", codigo: `def total(qtd, preco=4.5):
    return qtd * preco
print(total(2))
print(total(2, 5))
print(total(preco=3, qtd=4))`,
      prever: { enunciado: "Antes de testar:", conceito: "funcao_padrao", itens: [{ codigo: `def total(qtd, preco=4.5):
    return qtd * preco
print(total(4))`, resposta: "18.0", porque: "Usa o preço padrão: 4 × 4.5 = 18.0." }, { codigo: `def total(qtd, preco=4.5):
    return qtd * preco
print(total(qtd=2, preco=10))`, resposta: "20", porque: "Os dois informados pelo nome: 2 × 10 = 20." }] } },
    { tipo: "descobrir", texto: "A função é chamada de duas formas com o mesmo `a`.", arquivo: "tabela.py", codigo: `def total(qtd, preco=4.5):
    return qtd * preco
print(total(a))
print(total(a, 10))`,
      execucoes: [{ prefixo: "a = 2", saida: ["9.0", "20"] }, { prefixo: "a = 4", saida: ["18.0", "40"] }, { prefixo: "a = 0", saida: ["0.0", "0"] }], colunas: ["Valor de a", "Primeira · segunda chamada"],
      pergunta: "Em qual chamada o preço é 4.5 e em qual é 10? De onde vem cada um?", dicas: ["A primeira chamada dá só um valor à função. A segunda dá dois.", "Compare os resultados com `a = 2`: 9.0 e 20."],
      explicacao: "Na primeira chamada só a quantidade é informada, então o preço é o **padrão** (4.5: `2 × 4.5 = 9.0`). Na segunda, o 10 foi informado e **substitui** o padrão (`2 × 10 = 20`).", conceito: "funcao_padrao" },
    { tipo: "prever", conceito: "funcao_padrao", itens: [
      { codigo: `def saudar(nome, saudacao="Olá"):
    return saudacao + ", " + nome
print(saudar("Lia"))`, resposta: "Olá, Lia", porque: "Sem o segundo argumento, a saudação padrão é “Olá”." },
      { codigo: `def saudar(nome, saudacao="Olá"):
    return saudacao + ", " + nome
print(saudar("Lia", "Oi"))`, resposta: "Oi, Lia", porque: "O “Oi” substitui o padrão." },
      { codigo: `def saudar(nome, saudacao="Olá"):
    return saudacao + ", " + nome
print(saudar(saudacao="E aí", nome="Teo"))`, resposta: "E aí, Teo", porque: "Pelo nome, a ordem não importa." }] },
    { tipo: "corrigir", texto: "O Python reclama da definição da função (um parâmetro obrigatório depois de um com padrão). Conserte **a definição**, trocando a ordem dos parâmetros.", arquivo: "com_defeito.py", dica: "Os parâmetros com valor padrão ficam por último.", conceito: "funcao_padrao",
      codigo: `def total(preco=4.5, qtd):
    return qtd * preco
print(total(2))`, esperado: ["9.0"],
      solucao: `def total(qtd, preco=4.5):
    return qtd * preco
print(total(2))` },
    { tipo: "escrever", texto: "Defina `saudar(nome, idioma=\"pt\")` que **devolve** `Olá, NOME` quando o idioma é `pt` e `Hello, NOME` quando é `en`.", arquivo: "meu_programa.py",
      inicial: `# defina saudar(nome, idioma="pt") com return
`, testes: [["saudar('Lia')", "'Olá, Lia'"], ["saudar('Lia', 'en')", "'Hello, Lia'"], ["saudar(nome='Teo')", "'Olá, Teo'"], ["saudar('Teo', idioma='en')", "'Hello, Teo'"]], dica: "Um `if idioma == \"en\":` devolvendo `\"Hello, \" + nome`; senão devolve `\"Olá, \" + nome`.", conceito: "funcao_padrao",
      solucao: `def saudar(nome, idioma="pt"):
    if idioma == "en":
        return "Hello, " + nome
    return "Olá, " + nome` },
    { tipo: "aberta", tag: "sec", titulo: "O padrão seguro", texto: "Uma função tem o parâmetro `def abrir_acesso(usuario, nivel=\"total\")`.", pergunta: "Qual é o perigo desse valor padrão? Qual deveria ser o padrão?", modelo: "Quem esquecer de informar o nível ganha **acesso total** sem querer. O padrão deve ser o **mais restrito** (por exemplo, `nivel=\"leitura\"`): o acesso maior precisa ser pedido de propósito. É o “privilégio mínimo”." },
    { tipo: "quiz", itens: [
      { pergunta: "O que `preco=4.5` faz na definição da função?", opcoes: ["Obriga a informar o preço", "Define um valor se faltar", "Troca o preço por texto", "Impede mudar o preço"], correta: 1, porque: "É o valor padrão: usado quando a chamada não informa o preço.", conceito: "funcao_padrao" },
      { pergunta: "O que é um argumento nomeado?", opcoes: ["Um valor sem nenhum nome", "Um nome sem nenhum valor", "Um valor passado com nome=valor", "Uma função dentro da função"], correta: 2, porque: "Passa-se `nome=valor`, e a ordem deixa de importar.", conceito: "funcao_padrao" },
      { pergunta: "Onde ficam os parâmetros com valor padrão?", opcoes: ["Por último, após os obrigatórios", "Primeiro, antes dos obrigatórios", "No meio, sem ordem definida", "Fora dos parênteses, na chamada"], correta: 0, porque: "Python exige os obrigatórios antes dos que têm padrão.", conceito: "funcao_padrao" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: para que servem valores padrão e argumentos nomeados?", conceito: "funcao_padrao", modelo: "Valores padrão fazem um parâmetro assumir um valor quando a chamada não informa nenhum, deixando a função mais fácil de usar. Argumentos nomeados (`nome=valor`) deixam a chamada clara e permitem qualquer ordem." },
  ],
  recuperacao: [
    { p: "O que é o valor padrão de um parâmetro?", regex: "(quando|se );;(nao informa|nao passa|nao for dado|faltar|sem valor|nao dado)", modelo: "O valor que o parâmetro assume quando a chamada não informa nenhum.", conceito: "funcao_padrao" },
    { p: "Como se escreve um argumento nomeado?", regex: "(nome ?= ?valor|nome=|com o nome|igual)", modelo: "Como `nome=valor` na chamada, por exemplo `total(qtd=2)`.", conceito: "funcao_padrao" },
    { p: "Por que o valor padrão de um acesso deve ser o mais restrito?", regex: "(restrit|minimo|seguro|esquec|sem querer|acesso total)", modelo: "Para que esquecer de informar não dê acesso total sem querer: privilégio mínimo.", conceito: "funcao_padrao" },
  ],
});

// ---------- Aula 29: funções que decidem ----------
aulas.push({
  id: "0029", modulo: 4, n: 5, slug: "funcoes-que-decidem", titulo: "Funções que respondem sim ou não",
  resumo: "“É maior de idade?”, “tem estoque?”, “o café está pronto?”: perguntas repetidas viram funções que devolvem `True` ou `False`.",
  objetivos: ["Escrever funções que devolvem `True` ou `False`.", "Usar essas funções direto num `if`.", "Garantir que a função devolve um valor em todos os caminhos."],
  conceitos: [["funcao_bool", "Funções que devolvem verdadeiro ou falso"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Perguntas como “é maior de idade?” ou “tem estoque suficiente?” aparecem em vários pontos do programa. Como transformar cada pergunta numa função que responde sim ou não, e onde ficaria a regra?", modelo: "Uma função que **devolve `True` ou `False`**, com o nome em forma de pergunta (`maior_de_idade`, `tem_estoque`). A regra fica escrita num lugar só e o `if` fica curto e claro: `if maior_de_idade(idade):`." },
    { tipo: "exemplo", arquivo: "pergunta.py", texto: "Clique em cada linha.",
      codigo: [["def maior_de_idade(idade):", "O nome já diz a pergunta."], ["    return idade >= 18", "A comparação **já é** `True` ou `False`: dá para devolver direto, sem `if` dentro."], ["if maior_de_idade(20):", "A chamada vale `True` ou `False`, então serve de condição."], ["    print(\"Pode entrar\")", "Roda se a função devolver `True`."], ["else:", "Senão..."], ["    print(\"Não pode\")", "...roda se devolver `False`."]],
      termos: [["Função de checagem", "função que devolve `True` ou `False` e responde a uma pergunta sobre os dados."]] },
    { tipo: "executar", texto: "Rode e depois troque a idade.", arquivo: "pergunta.py (pode editar)", codigo: `def maior_de_idade(idade):
    return idade >= 18
if maior_de_idade(20):
    print("Pode entrar")
else:
    print("Não pode")`,
      prever: { enunciado: "Antes de testar:", conceito: "funcao_bool", itens: [{ codigo: `def par(n):
    return n % 2 == 0
print(par(4))`, resposta: "True", porque: "4 dividido por 2 deixa resto 0." }, { codigo: `def par(n):
    return n % 2 == 0
print(par(7))`, resposta: "False", porque: "7 dividido por 2 deixa resto 1." }] } },
    { tipo: "descobrir", texto: "Uma função de validação de quantidade, testada com quatro valores.", arquivo: "valido.py", codigo: `def valido(qtd):
    return qtd >= 1 and qtd <= 10
print(valido(n))`,
      execucoes: [{ prefixo: "n = 0", saida: ["False"] }, { prefixo: "n = 1", saida: ["True"] }, { prefixo: "n = 10", saida: ["True"] }, { prefixo: "n = 11", saida: ["False"] }], colunas: ["Valor de n", "valido(n)"],
      pergunta: "Para quais valores a função responde `True`? Qual a vantagem de a regra “de 1 a 10” estar escrita só dentro da função?", dicas: ["Olhe os dois valores de borda (1 e 10) e os dois logo fora (0 e 11).", "Se a regra mudasse para 1 a 20, em quantos lugares do código você mexeria?"],
      explicacao: "Responde `True` de **1 a 10** (bordas incluídas) e `False` fora disso. A vantagem de ter a regra dentro da função é mudar em **um só lugar**: se virar “1 a 20”, todo o programa que usa `valido(...)` passa a seguir a nova regra.", conceito: "funcao_bool" },
    { tipo: "prever", conceito: "funcao_bool", itens: [
      { codigo: `def ok(x):
    return x > 0 and x < 10
print(ok(5))`, resposta: "True", porque: "5 está entre 0 e 10." },
      { codigo: `def ok(x):
    return x > 0 and x < 10
print(ok(10))`, resposta: "False", porque: "10 não é menor que 10." },
      { codigo: `def vazio(texto):
    return texto == ""
print(vazio("café"))`, resposta: "False", porque: "“café” não é o texto vazio." },
      { codigo: `def eh_vip(compra):
    return compra >= 500
if eh_vip(300):
    print("VIP")
else:
    print("comum")`, resposta: "comum", porque: "300 não chega a 500." }] },
    { tipo: "corrigir", texto: "A função só devolve algo quando a pessoa é maior de idade; para menores devolve `None`. Conserte **para devolver `False`** também.", arquivo: "com_defeito.py", dica: "Todo caminho da função precisa devolver um valor. Basta devolver a própria comparação.", conceito: "funcao_bool",
      codigo: `def pode_entrar(idade):
    if idade >= 18:
        return True
print(pode_entrar(16))`, testes: [["pode_entrar(16)", "False"], ["pode_entrar(18)", "True"], ["pode_entrar(40)", "True"]],
      solucao: `def pode_entrar(idade):
    return idade >= 18
print(pode_entrar(16))` },
    { tipo: "escrever", texto: "Defina `tem_estoque(qtd, disponivel)` que devolve `True` se há pelo menos `qtd` unidades disponíveis. Depois, com `tem_estoque(3, 2)`, mostre `Vender` ou `Esgotado`.", arquivo: "meu_programa.py",
      inicial: `# defina tem_estoque e use num if
`, esperado: ["Esgotado"], testes: [["tem_estoque(3, 5)", "True"], ["tem_estoque(5, 5)", "True"], ["tem_estoque(6, 5)", "False"]], dica: "`return disponivel >= qtd` e um `if tem_estoque(3, 2):` com `Vender`, senão `Esgotado`.", conceito: "funcao_bool",
      solucao: `def tem_estoque(qtd, disponivel):
    return disponivel >= qtd
if tem_estoque(3, 2):
    print("Vender")
else:
    print("Esgotado")` },
    { tipo: "aberta", tag: "sec", titulo: "Uma regra, um lugar", texto: "A regra “só administradores podem apagar” está copiada em 12 telas, cada uma com um `if perfil == \"admin\"` escrito à mão. Uma delas foi esquecida.", pergunta: "O que isso causa? Como uma função `pode_apagar(usuario)` ajudaria na segurança?", modelo: "A tela esquecida deixa qualquer um apagar dados: uma **falha de controle de acesso**. Com `pode_apagar(usuario)` a regra fica **num único lugar**, é fácil de revisar e de testar, e se mudar vale para todas as telas de uma vez." },
    { tipo: "quiz", itens: [
      { pergunta: "O que uma função de checagem devolve?", opcoes: ["Um texto explicando", "True ou False", "Um número de 0 a 10", "Nada, só mostra"], correta: 1, porque: "Responde sim ou não: `True` ou `False`.", conceito: "funcao_bool" },
      { pergunta: "Qual função devolve `True` para números pares?", opcoes: ["return n % 2 == 1", "return n // 2 == 0", "return n % 2 == 0", "return n * 2 == 0"], correta: 2, porque: "Par: o resto da divisão por 2 é 0.", conceito: "funcao_bool" },
      { pergunta: "Por que todo caminho da função deve devolver algo?", opcoes: ["Para devolver None sempre", "Para o código ser curto", "Para evitar o resultado None", "Para rodar mais rápido"], correta: 2, porque: "Um caminho sem `return` devolve `None`, e isso confunde quem usa a função.", conceito: "funcao_bool" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como uma função de checagem deixa o programa melhor?", conceito: "funcao_bool", modelo: "Ela devolve `True` ou `False` e dá nome à pergunta, deixando o `if` curto e claro. A regra fica em um único lugar, o que facilita mudar, testar e revisar (inclusive a parte de segurança)." },
  ],
  recuperacao: [
    { p: "O que devolve uma função de checagem?", regex: "(true|verdadeir);;(false|fals)", modelo: "`True` ou `False`.", conceito: "funcao_bool" },
    { p: "Por que dar à função um nome de pergunta, como `maior_de_idade`?", regex: "(claro|legivel|entend|le |pergunta|facil)", modelo: "Porque o `if` fica claro: `if maior_de_idade(idade):` se lê como uma frase.", conceito: "funcao_bool" },
    { p: "Por que centralizar a regra de acesso numa função ajuda a segurança?", regex: "(um (so )?lugar|so um lugar|unico lugar|esquec|revisar|testar|todas as telas|todos os lugares)", modelo: "Porque a regra fica em um só lugar, fácil de revisar e testar, e nenhuma tela é esquecida.", conceito: "funcao_bool" },
  ],
});

// ---------- Aula 30: escopo ----------
aulas.push({
  id: "0030", modulo: 4, n: 6, slug: "escopo", titulo: "Cada função no seu quadrado: variáveis locais",
  resumo: "As variáveis criadas dentro de uma função não existem fora dela. Isso protege o programa, mas pede cuidado: só o que a função **devolve** sai de lá.",
  objetivos: ["Explicar o que é uma variável local.", "Prever o que acontece quando o mesmo nome existe dentro e fora da função.", "Recuperar um resultado de dentro da função com `return`."],
  conceitos: [["escopo", "Variáveis locais e escopo"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Se dentro da função da cozinha eu crio uma variável `temperatura`, o caixa (outra parte do programa) consegue ver essa temperatura? Cada parte do programa enxerga tudo?", modelo: "Não precisa: cada função tem o **seu espaço**, e o que ela cria por dentro fica lá. Isso evita que uma função bagunce, sem querer, as variáveis das outras. O que ela quer entregar para fora ela devolve com `return`." },
    { tipo: "exemplo", arquivo: "escopo.py", texto: "Clique em cada linha.",
      codigo: [["x = 5", "Uma variável **de fora** (global): vale no programa todo."], ["def mudar():", "Uma função."], ["    x = 10", "Dentro da função, isto cria **outra** variável `x`, só dela (**local**). A de fora não é tocada."], ["    print(\"dentro:\", x)", "Mostra `dentro: 10`."], ["mudar()", "Chama a função."], ["print(\"fora:\", x)", "A variável de fora continua 5: `fora: 5`."]],
      termos: [["Variável local", "criada dentro de uma função: só existe ali, enquanto a função roda."], ["Escopo", "a região do programa onde um nome existe."]] },
    { tipo: "executar", titulo: "Quando a variável não existe fora", texto: "A variável `resultado` é criada **dentro** da função. Rode e leia o erro: fora da função, o nome não existe.", arquivo: "local.py (pode editar)", erroEsperado: "NameError", codigo: `def calcular():
    resultado = 10
    print(resultado)
calcular()
print(resultado)`,
      prever: { enunciado: "Qual é o **tipo** do erro? (uma palavra)", conceito: "escopo", itens: [{ codigo: `def calcular():
    resultado = 10
calcular()
print(resultado)`, erro: "NameError", resposta: "NameError", pergunta: "Tipo do erro:", porque: "`resultado` só existia dentro da função: fora dela o nome é desconhecido." }] } },
    { tipo: "descobrir", texto: "A função cria um `valor` local; fora dela existe outro `valor`.", arquivo: "dois_valores.py", codigo: `def f():
    valor = 1
    return valor
valor = 99
print(f())
print(valor)`,
      execucoes: [{ rotulo: "o programa acima", saida: ["1", "99"] }],
      pergunta: "Por que o `valor` de fora continuou 99 mesmo depois de a função criar um `valor = 1`? O que a função teve de fazer para o 1 sair dela?", dicas: ["Há duas variáveis chamadas `valor`. Em qual “espaço” cada uma vive?", "Como o número 1 chegou até o `print(f())`?"],
      explicacao: "São **duas variáveis diferentes** com o mesmo nome: a local (dentro de `f`) e a de fora. A função não mexe na de fora. O 1 só saiu porque a função o **devolveu** com `return`, e a chamada `f()` passou a valer 1.", conceito: "escopo" },
    { tipo: "prever", conceito: "escopo", itens: [
      { codigo: `n = 0
def f():
    n = n + 1
f()`, erro: "UnboundLocalError", resposta: "UnboundLocalError", pergunta: "Tipo do erro:", porque: "Como a função atribui `n`, o Python o trata como local, mas ele é lido antes de receber valor." },
      { codigo: `x = 3
def f():
    x = 7
f()
print(x)`, resposta: "3", porque: "A `x` de dentro é outra variável; a de fora continua 3." },
      { codigo: `def dobrar(n):
    resultado = n * 2
    return resultado
print(dobrar(4))`, resposta: "8", porque: "O resultado local foi devolvido com `return`." },
      { codigo: `nome = "Lia"
def f(nome):
    nome = "Teo"
    return nome
print(f(nome), nome)`, resposta: "Teo Lia", porque: "A função devolve “Teo”, mas a variável de fora continua “Lia”." }] },
    { tipo: "corrigir", texto: "A função calcula o total, mas o `print` de fora diz que `total` não existe. Conserte fazendo a função **devolver** o resultado.", arquivo: "com_defeito.py", dica: "Devolva o valor com `return` e guarde o que ela devolve numa variável de fora.", conceito: "escopo",
      codigo: `def calcular_total(preco, qtd):
    total = preco * qtd
calcular_total(4.5, 2)
print(total)`, esperado: ["9.0"],
      solucao: `def calcular_total(preco, qtd):
    total = preco * qtd
    return total
total = calcular_total(4.5, 2)
print(total)` },
    { tipo: "escrever", texto: "Defina `com_frete(valor)` que usa uma variável **local** `total` (valor mais 8 de frete) e a **devolve**. Mostre `Total: 18` para `com_frete(10)`. Não deve existir nenhuma variável global `total`.", arquivo: "meu_programa.py",
      inicial: `# defina com_frete(valor) com uma variável local total
`, esperado: ["Total: 18"], testes: [["com_frete(10)", "18"], ["com_frete(0)", "8"], ["'total' in globals()", "False"]], dica: "Dentro da função: `total = valor + 8` e `return total`. Fora: `print(\"Total:\", com_frete(10))`.", conceito: "escopo",
      solucao: `def com_frete(valor):
    total = valor + 8
    return total
print("Total:", com_frete(10))` },
    { tipo: "aberta", tag: "sec", titulo: "Segredos no menor espaço possível", texto: "Um programa guarda `senha_admin = \"...\"` numa variável de fora, visível para todas as funções, inclusive as que montam mensagens de erro e registros.", pergunta: "Qual é o risco? Que princípio o escopo local ajuda a seguir?", modelo: "Qualquer função (e qualquer erro de uma delas) pode ler ou registrar a senha. O escopo local ajuda no princípio do **menor acesso**: manter cada informação no menor espaço possível, entregue só a quem realmente precisa. Segredos nem devem ficar escritos no código." },
    { tipo: "quiz", itens: [
      { pergunta: "Onde existe uma variável criada dentro de uma função?", opcoes: ["Só dentro dessa função", "No programa inteiro todo", "Só fora da função", "Em outro arquivo qualquer"], correta: 0, porque: "É uma variável local: existe só enquanto a função roda.", conceito: "escopo" },
      { pergunta: "Como tirar um resultado de dentro da função?", opcoes: ["Imprimindo o resultado", "Escrevendo fora dela", "Usando o mesmo nome", "Devolvendo com return"], correta: 3, porque: "Só o que a função devolve sai dela.", conceito: "escopo" },
      { pergunta: "`x = 3` fora e `x = 7` dentro da função: quanto vale `x` fora depois?", opcoes: ["7, o último valor", "10, a soma dos dois", "3, continua igual", "Dá erro de nome"], correta: 2, porque: "A de dentro é outra variável; a de fora não muda.", conceito: "escopo" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que é uma variável local e como um valor sai de dentro de uma função?", conceito: "escopo", modelo: "Variável local é a criada dentro de uma função: só existe ali. Um valor só sai da função se ela o **devolver com `return`** e quem chamou o guardar." },
  ],
  recuperacao: [
    { p: "O que é uma variável local?", regex: "(dentro|so existe|apenas);;(funcao)", modelo: "Uma variável criada dentro de uma função, que só existe ali.", conceito: "escopo" },
    { p: "Como um valor sai de dentro da função?", regex: "(return|devolve|retorna)", modelo: "Com `return`, e quem chamou guarda o valor devolvido.", conceito: "escopo" },
    { p: "Por que manter dados sensíveis no menor escopo possível?", regex: "(menor acesso|so quem precisa|minimo|vazar|ler|registr|exposic|qualquer funcao)", modelo: "Para que só quem precisa os enxergue; assim menos partes do programa podem ler, registrar ou vazar o dado.", conceito: "escopo" },
  ],
});

// ---------- Aula 31: composição ----------
aulas.push({
  id: "0031", modulo: 4, n: 7, slug: "composicao", titulo: "Funções que usam funções (e deixam recados)",
  resumo: "Funções pequenas se ajudam: a do total usa a do desconto. Hoje você aprende a dividir um problema em peças e a documentar cada uma.",
  objetivos: ["Fazer uma função chamar outra.", "Dividir um problema em funções pequenas.", "Documentar uma função com uma descrição (docstring)."],
  conceitos: [["funcao_composicao", "Funções que chamam funções"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O total do pedido depende do desconto, e o desconto depende do valor. Que vantagem existe em ter uma função para o desconto e outra para o total, em vez de uma função gigante que faz tudo?", modelo: "Funções **pequenas e com um objetivo só** são mais fáceis de entender, testar e reaproveitar. A do total simplesmente **chama** a do desconto, e se a regra de desconto mudar, só uma função é alterada." },
    { tipo: "exemplo", arquivo: "composicao.py", texto: "Clique em cada linha.",
      codigo: [["def desconto(valor):", "Uma função com **uma só tarefa**: aplicar a regra de desconto."], ["    if valor >= 100:", "Compras de 100 ou mais..."], ["        return valor * 0.9", "...pagam 90% (10% de desconto)."], ["    return valor", "Sem desconto: devolve o valor igual. Não precisa de `else`: se o `return` de cima rodou, a função já terminou."], ["def total_pedido(qtd, preco):", "Outra função, que **usa** a primeira."], ["    \"\"\"Calcula o total do pedido, já com desconto.\"\"\"", "Uma **docstring**: um texto entre aspas triplas logo no começo, que explica o que a função faz."], ["    return desconto(qtd * preco)", "Calcula o valor bruto e entrega para `desconto`, devolvendo o que ela devolver."], ["print(total_pedido(30, 4))", "30 × 4 = 120; com 10% de desconto: `108.0`."]],
      termos: [["Docstring", "texto entre aspas triplas no começo da função que explica o que ela faz."], ["Composição", "montar uma função usando outras."]] },
    { tipo: "executar", texto: "Rode e mude a quantidade para ficar abaixo de 100.", arquivo: "composicao.py (pode editar)", codigo: `def desconto(valor):
    if valor >= 100:
        return valor * 0.9
    return valor
def total_pedido(qtd, preco):
    return desconto(qtd * preco)
print(total_pedido(30, 4))`,
      prever: { enunciado: "Antes de testar:", conceito: "funcao_composicao", itens: [{ codigo: `def desconto(valor):
    if valor >= 100:
        return valor * 0.9
    return valor
def total_pedido(qtd, preco):
    return desconto(qtd * preco)
print(total_pedido(10, 4))`, resposta: "40", porque: "10 × 4 = 40, abaixo de 100: sem desconto." }, { codigo: `def desconto(valor):
    if valor >= 100:
        return valor * 0.9
    return valor
def total_pedido(qtd, preco):
    return desconto(qtd * preco)
print(total_pedido(25, 4))`, resposta: "90.0", porque: "25 × 4 = 100 (a borda), que já tem desconto: 100 × 0.9 = 90.0." }] } },
    { tipo: "descobrir", texto: "A função de desconto, testada com três valores.", arquivo: "desconto.py", codigo: `def desconto(valor):
    if valor >= 100:
        return valor * 0.9
    return valor
print(desconto(x))`,
      execucoes: [{ prefixo: "x = 50", saida: ["50"] }, { prefixo: "x = 100", saida: ["90.0"] }, { prefixo: "x = 200", saida: ["180.0"] }], colunas: ["Valor de x", "desconto(x)"],
      pergunta: "O que a função decide? Por que o segundo `return` não precisa de um `else`?", dicas: ["Em que valor o resultado deixa de ser igual ao valor de entrada?", "O que acontece com a função assim que o primeiro `return` roda?"],
      explicacao: "A função decide se há desconto: de 100 em diante devolve 90% do valor; abaixo disso, devolve o valor igual. Não precisa de `else` porque o **`return` encerra a função**: se o primeiro rodou, o segundo nunca é alcançado.", conceito: "funcao_composicao" },
    { tipo: "prever", conceito: "funcao_composicao", itens: [
      { codigo: `def dobro(n):
    return n * 2
def quadruplo(n):
    return dobro(dobro(n))
print(quadruplo(3))`, resposta: "12", porque: "`dobro(3)` é 6 e `dobro(6)` é 12." },
      { codigo: `def soma(a, b):
    return a + b
def media(a, b):
    return soma(a, b) / 2
print(media(4, 6))`, resposta: "5.0", porque: "`soma(4, 6)` é 10, e 10 / 2 é 5.0." },
      { codigo: `def frete(valor):
    if valor >= 150:
        return 0
    return 15
def final(valor):
    return valor + frete(valor)
print(final(100))`, resposta: "115", porque: "100 não chega a 150: frete 15; total 115." }] },
    { tipo: "corrigir", texto: "O total do pedido não está aplicando o desconto (deveria dar 108.0). Conserte **uma linha**, fazendo a função usar `desconto`.", arquivo: "com_defeito.py", dica: "A função `total_pedido` precisa **chamar** `desconto` com o valor bruto.", conceito: "funcao_composicao",
      codigo: `def desconto(valor):
    if valor >= 100:
        return valor * 0.9
    return valor
def total_pedido(qtd, preco):
    return qtd * preco
print(total_pedido(30, 4))`, esperado: ["108.0"],
      solucao: `def desconto(valor):
    if valor >= 100:
        return valor * 0.9
    return valor
def total_pedido(qtd, preco):
    return desconto(qtd * preco)
print(total_pedido(30, 4))` },
    { tipo: "escrever", texto: "Escreva `frete(valor)` (frete grátis a partir de 150: devolve 0; senão, 15) e `total_final(valor)`, que devolve `valor + frete(valor)`.", arquivo: "meu_programa.py",
      inicial: `# defina frete(valor) e total_final(valor)
`, testes: [["frete(100)", "15"], ["frete(150)", "0"], ["total_final(100)", "115"], ["total_final(150)", "150"], ["total_final(200)", "200"]], dica: "`total_final` só precisa fazer `return valor + frete(valor)`.", conceito: "funcao_composicao",
      solucao: `def frete(valor):
    if valor >= 150:
        return 0
    return 15
def total_final(valor):
    return valor + frete(valor)` },
    { tipo: "aberta", tag: "sec", titulo: "Pequenas peças, revisão melhor", texto: "Uma função com 300 linhas valida o usuário, calcula o preço, grava no banco e envia e-mail. Outra equipe tem 10 funções de 30 linhas, cada uma com um objetivo.", pergunta: "Qual é mais fácil de revisar quanto à segurança e por quê?", modelo: "As 10 funções pequenas: cada uma pode ser lida, testada e auditada isoladamente, e é fácil ver **que dados entram e saem**. Numa função gigante, falhas (como uma validação esquecida) se escondem no meio de tudo. Código pequeno e claro é código mais seguro." },
    { tipo: "quiz", itens: [
      { pergunta: "O que é uma docstring?", opcoes: ["Um erro dentro da função", "Um valor padrão do parâmetro", "Uma descrição da função", "Um nome de variável longo"], correta: 2, porque: "É um texto entre aspas triplas que explica o que a função faz.", conceito: "funcao_composicao" },
      { pergunta: "Por que dividir em funções pequenas?", opcoes: ["Para o programa rodar mais rápido", "Para facilitar entender e testar", "Para gastar menos memória", "Para evitar o uso de variáveis"], correta: 1, porque: "Cada peça tem um objetivo, é fácil de testar e de reaproveitar.", conceito: "funcao_composicao" },
      { pergunta: "Se `total_pedido` chama `desconto`, qual roda primeiro?", opcoes: ["desconto, que é chamada de dentro", "total_pedido, e só termina depois", "Nenhuma das duas, por conflito", "As duas ao mesmo tempo, em paralelo"], correta: 0, porque: "`desconto` é chamada dentro de `total_pedido` e termina antes de ela devolver o resultado.", conceito: "funcao_composicao" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: por que dividir um problema em funções pequenas que chamam umas às outras?", conceito: "funcao_composicao", modelo: "Cada função fica com um objetivo só: mais fácil de entender, testar, reaproveitar e revisar (inclusive em segurança). Se uma regra mudar, só uma função muda." },
  ],
  recuperacao: [
    { p: "O que é uma docstring?", regex: "(texto|descricao|explic|comentario|documenta);;(funcao|aspas)", modelo: "Um texto entre aspas triplas no começo da função que explica o que ela faz.", conceito: "funcao_composicao" },
    { p: "O que acontece depois que um `return` roda?", regex: "(encerra|termina|para|acaba|nao roda|ignora)", modelo: "A função termina na hora: as linhas seguintes não rodam.", conceito: "funcao_composicao" },
    { p: "Por que funções pequenas são melhores para a segurança?", regex: "(revis|audit|test|isolad|entender|ler|clar|pequen)", modelo: "Porque são fáceis de ler, testar e auditar, e falhas não se escondem no meio de um código enorme.", conceito: "funcao_composicao" },
  ],
});

// ---------- Aula 32: mini-projeto ----------
aulas.push({
  id: "0032", modulo: 4, n: 8, slug: "mini-projeto", titulo: "Mini-projeto: o caixa com funções",
  resumo: "Hora de montar um caixa de verdade em funções pequenas e testáveis. Depois, as mesmas peças num problema novo: o controle de estoque.",
  minutos: 40,
  objetivos: ["Dividir um problema em funções com `return`.", "Resolver o exercício final sem usar a dica.", "Reaproveitar o raciocínio num problema novo (estoque)."],
  conceitos: [],
  secoes: [
    { tipo: "aquecimento", titulo: "Planeje as peças", pergunta: "Para o caixa da cafeteria, quais funções você criaria? Pense: uma para o preço de cada item, uma para o desconto e o que mais? Quais receberiam parâmetros e quais devolveriam valores?", minimo: 40, modelo: "Uma boa divisão: `preco_item(nome)` devolve o preço (e 0.0 se o item não existe), `desconto(total)` devolve o total já com o desconto, e o programa principal lê o pedido, usa as duas e mostra o resultado. Todas **devolvem** valores (não só mostram), para poderem ser combinadas e testadas." },
    { tipo: "exemplo", titulo: "Um esqueleto de referência", arquivo: "esqueleto.py", entradas: ["suco", "2"], texto: "Mesma estrutura (funções que devolvem, programa principal que usa), com outro tema.",
      codigo: [["def preco(nome):", "Devolve o preço de um item."], ["    if nome == \"suco\":", "Decide pelo nome."], ["        return 6.0", "Devolve o preço do suco."], ["    return 0.0", "Qualquer outro item: 0.0 (desconhecido)."], ["item = input(\"Item: \")", "O programa principal lê o item."], ["qtd = int(input(\"Quantidade: \"))", "E a quantidade."], ["print(f\"Total: R$ {preco(item) * qtd:.2f}\")", "Usa a função e mostra formatado."]] },
    { tipo: "escrever", titulo: "Exercício final (sem dica)", final: true, minutos: 12, texto: "Defina `preco_item(nome)` (café `\"cafe\"` custa 4.5, pão `\"pao\"` custa 3.0, qualquer outro devolve 0.0) e `desconto(total)` (10% de desconto a partir de 20; senão, o mesmo total). Depois peça `Item: ` e `Quantidade: ` e mostre `Total: R$ X.XX`; se o item for desconhecido, mostre `Item desconhecido`.", arquivo: "caixa.py",
      inicial: `# defina preco_item e desconto, depois leia o pedido e mostre o total
`, testes: [["preco_item('cafe')", "4.5"], ["preco_item('pao')", "3.0"], ["preco_item('suco')", "0.0"], ["desconto(10)", "10"], ["desconto(20)", "18.0"], ["desconto(30)", "27.0"]],
      cenarios: [{ entradas: ["cafe", "2"], esperado: ["Item: cafe", "Quantidade: 2", "Total: R$ 9.00"] }, { entradas: ["pao", "10"], esperado: ["Item: pao", "Quantidade: 10", "Total: R$ 27.00"] }, { entradas: ["suco", "1"], esperado: ["Item: suco", "Quantidade: 1", "Item desconhecido"] }],
      dica: "As duas funções devolvem valores. No programa principal: `preco = preco_item(item)`; se `preco == 0.0`, avise; senão mostre `desconto(preco * qtd)` com `:.2f`.", conceito: ["funcao_def", "funcao_parametros", "funcao_return", "funcao_composicao"],
      solucao: `def preco_item(nome):
    if nome == "cafe":
        return 4.5
    elif nome == "pao":
        return 3.0
    return 0.0

def desconto(total):
    if total >= 20:
        return total * 0.9
    return total

item = input("Item: ")
qtd = int(input("Quantidade: "))
preco = preco_item(item)
if preco == 0.0:
    print("Item desconhecido")
else:
    print(f"Total: R$ {desconto(preco * qtd):.2f}")` },
    { tipo: "escrever", titulo: "Problema novo: o controle de estoque", transfer: true, minutos: 10, texto: "Outro contexto, as mesmas peças. Defina `tem_estoque(pedido, disponivel)` (devolve `True` se há o bastante) e `restante(disponivel, pedido)` (devolve o que sobra). Depois peça `Disponível: ` e `Pedido: `: se houver estoque, mostre `Venda ok. Restam: N`; senão, `Estoque insuficiente`.", arquivo: "estoque.py",
      inicial: `# defina tem_estoque e restante, depois leia e decida
`, testes: [["tem_estoque(3, 5)", "True"], ["tem_estoque(5, 5)", "True"], ["tem_estoque(6, 5)", "False"], ["restante(10, 3)", "7"]],
      cenarios: [{ entradas: ["5", "3"], esperado: ["Disponível: 5", "Pedido: 3", "Venda ok. Restam: 2"] }, { entradas: ["5", "6"], esperado: ["Disponível: 5", "Pedido: 6", "Estoque insuficiente"] }, { entradas: ["5", "5"], esperado: ["Disponível: 5", "Pedido: 5", "Venda ok. Restam: 0"] }],
      dica: "`return disponivel >= pedido` e `return disponivel - pedido`; o programa usa a primeira dentro de um `if`.", conceito: ["funcao_bool", "funcao_return", "funcao_composicao"],
      solucao: `def tem_estoque(pedido, disponivel):
    return disponivel >= pedido

def restante(disponivel, pedido):
    return disponivel - pedido

disponivel = int(input("Disponível: "))
pedido = int(input("Pedido: "))
if tem_estoque(pedido, disponivel):
    print("Venda ok. Restam:", restante(disponivel, pedido))
else:
    print("Estoque insuficiente")` },
    { tipo: "aberta", tag: "sec", titulo: "Funções que mexem em dinheiro", texto: "As funções `desconto` e `preco_item` decidem quanto o cliente paga. Se alguém alterar o código delas, o preço muda para todos os pedidos.", pergunta: "Que cuidados de segurança e qualidade você teria com funções que calculam dinheiro?", modelo: "**Testá-las** (como os testes do exercício, incluindo as bordas), restringir **quem pode alterar** o código (revisão por outra pessoa antes de publicar), e **registrar** mudanças. Funções pequenas e testáveis tornam fácil perceber quando um preço foi alterado por engano ou má-fé." },
    { tipo: "quiz", itens: [
      { pergunta: "Por que as funções do caixa devem usar `return`?", opcoes: ["Para poderem ser combinadas", "Para escreverem na tela", "Para rodarem mais rápido", "Para evitar parâmetros"], correta: 0, porque: "Um valor devolvido pode ser usado em outras contas e funções.", conceito: "funcao_return" },
      { pergunta: "O que `preco_item(\"suco\")` devolve no exercício?", opcoes: ["4.5, o preço do café", "3.0, o preço do pão", "0.0, item desconhecido", "None, sem retorno algum"], correta: 2, porque: "Qualquer item que não seja café ou pão devolve 0.0.", conceito: "funcao_return" },
      { pergunta: "Qual é a vantagem de testar cada função separada?", opcoes: ["Achar o erro mais fácil", "Escrever menos linhas", "Usar menos variáveis", "Não precisar de parâmetros"], correta: 0, porque: "Quando um teste falha, você sabe em qual peça está o problema.", conceito: "funcao_composicao" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como você dividiu o caixa em funções e por que cada uma devolve um valor?", conceito: "funcao_composicao", modelo: "Uma função devolve o preço de cada item, outra devolve o total com desconto e o programa principal lê o pedido, usa as duas e mostra o resultado. Todas devolvem valores para serem combinadas e testadas separadamente." },
  ],
  recuperacao: [
    { p: "Por que as funções do caixa devolvem valores em vez de só mostrá-los?", regex: "(combin|usar|reaprove|testar|outras contas|calcul);;", modelo: "Para o valor poder ser usado em outras contas e testado.", conceito: "funcao_return" },
    { p: "Quais cuidados ter com funções que calculam dinheiro?", regex: "(test|revis|registr|quem altera|auditoria|controle)", modelo: "Testá-las (inclusive nas bordas), revisar mudanças e registrar quem alterou o quê.", conceito: "funcao_composicao" },
    { p: "Para que serve uma função que devolve `True` ou `False` num `if`?", regex: "(claro|curto|regra|um lugar|legivel|pergunta)", modelo: "Deixa o `if` claro e curto e mantém a regra em um só lugar.", conceito: "funcao_bool" },
  ],
});

export default aulas;
