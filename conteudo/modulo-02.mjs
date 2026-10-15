// Módulo 2: Decisões, conferir antes de agir (universal). Fio condutor: o robô de café confere água e café; regras de loja e de estoque.
export const meta = {
  final: "Mini-projeto: o robô confere e decide se pode passar o café",
  transfer: "Aplicar as mesmas decisões ao desconto de uma loja virtual",
};
const aulas = [];

// ---------- Aula 9: comparações ----------
aulas.push({
  id: "0009", modulo: 2, n: 1, slug: "comparacoes", titulo: "Verdadeiro ou falso: comparações",
  resumo: "Antes de decidir qualquer coisa, o robô precisa fazer perguntas cuja resposta é sim ou não. Hoje você aprende a fazer essas perguntas em Python.",
  objetivos: ["Usar `==`, `!=`, `<`, `>`, `<=` e `>=`.", "Explicar que uma comparação devolve `True` ou `False`.", "Diferenciar `=` (guardar) de `==` (perguntar)."],
  conceitos: [["comparacao", "Comparações: perguntas de verdadeiro ou falso"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O robô precisa saber se a água já passou de 90 graus. Como o programa poderia “perguntar” isso ao valor da temperatura? Que tipo de resposta essa pergunta tem?", modelo: "É uma pergunta com resposta de **sim ou não**: a temperatura passou de 90 ou não passou. Em programação, essas respostas são os valores `True` (verdadeiro) e `False` (falso), e a pergunta se chama **comparação**." },
    { tipo: "exemplo", arquivo: "agua.py", texto: "Clique em cada linha.",
      codigo: [["temperatura = 95", "Guarda 95 na variável `temperatura`. Aqui o `=` significa “guarde”."], ["print(temperatura > 90)", "**Pergunta**: 95 é maior que 90? A resposta, `True`, é mostrada na tela."], ["print(temperatura == 100)", "`==` (dois sinais) pergunta “é **igual** a?”. 95 é igual a 100? `False`."], ["print(temperatura != 100)", "`!=` pergunta “é **diferente** de?”. 95 é diferente de 100? `True`."], ["print(temperatura <= 95)", "`<=` é “menor ou igual”. 95 é menor ou igual a 95? `True`."]],
      termos: [["Comparação", "uma pergunta sobre dois valores, cuja resposta é `True` ou `False`."], ["bool", "o tipo dos valores `True` e `False`."]] },
    { tipo: "executar", texto: "Rode e depois mude o `agua` para outros valores.", arquivo: "agua.py (pode editar)", codigo: `agua = 300
print(agua >= 250)
print(agua == 250)
print(agua < 250)`,
      prever: { enunciado: "Antes de testar:", conceito: "comparacao", itens: [{ codigo: "print(5 > 3)", resposta: "True", porque: "5 é maior que 3." }, { codigo: "print(3 != 4)", resposta: "True", porque: "3 e 4 são diferentes." }, { codigo: 'print("Lia" == "lia")', resposta: "False", porque: "Para o Python, maiúsculas e minúsculas contam: “Lia” e “lia” são textos diferentes." }] } },
    { tipo: "descobrir", texto: "O programa abaixo compara `x` de três jeitos. A tabela mostra o resultado real com três valores diferentes de `x`.", arquivo: "comparar.py", codigo: `print(x == 7)
print(x == "7")
print(x < 10)`,
      execucoes: [{ prefixo: "x = 7", saida: ["True", "False", "True"] }, { prefixo: "x = 8", saida: ["False", "False", "True"] }, { prefixo: "x = 12", saida: ["False", "False", "False"] }], colunas: ["Valor de x", "As três linhas mostram"],
      pergunta: "Por que `x == \"7\"` deu `False` mesmo quando `x` vale 7? E o que as outras duas linhas perguntam?", dicas: ["Compare `7` (sem aspas) com `\"7\"` (com aspas). São o mesmo tipo de valor?", "A primeira linha pergunta se x é igual a 7; a terceira, se x é menor que 10."],
      explicacao: "`x == \"7\"` compara um **número** com um **texto**: são tipos diferentes, então nunca são iguais (`False`). `x == 7` pergunta se x vale 7 e `x < 10` pergunta se é menor que 10: cada comparação devolve `True` ou `False`.", conceito: "comparacao" },
    { tipo: "prever", conceito: "comparacao", itens: [
      { codigo: "print(2 + 2 == 5)", resposta: "False", porque: "2 + 2 é 4, que não é igual a 5." },
      { codigo: `x = 4
print(x % 2 == 0)`, resposta: "True", porque: "`4 % 2` é 0 (resto da divisão), e 0 é igual a 0: o número é par." },
      { codigo: 'print(5 == "5")', resposta: "False", porque: "Número e texto são tipos diferentes." },
      { codigo: "print(10 // 3 == 3)", resposta: "True", porque: "`10 // 3` é 3 (divisão inteira), igual a 3." },
      { codigo: `idade = 17
print(idade >= 18)`, resposta: "False", porque: "17 não é maior nem igual a 18." }] },
    { tipo: "corrigir", texto: "O robô queria guardar se a água está pronta (a partir de 90 graus), mas guardou a própria temperatura. Conserte **uma linha**.", arquivo: "com_defeito.py",
      codigo: `temperatura = 95
pronta = temperatura = 90
print(pronta)`, esperado: ["True"], dica: "Para **perguntar** (em vez de guardar) use um operador de comparação, não o `=`.", conceito: "comparacao",
      solucao: `temperatura = 95
pronta = temperatura >= 90
print(pronta)` },
    { tipo: "escrever", texto: "Com `agua_ml = 180` e `cafe_g = 14`, crie `tem_agua` (a água é pelo menos 150) e `tem_cafe` (o café é pelo menos 15) e mostre `Tem água? True` e `Tem café? False`.", arquivo: "meu_programa.py",
      inicial: `agua_ml = 180
cafe_g = 14
# crie tem_agua e tem_cafe e mostre o resultado
`, esperado: ["Tem água? True", "Tem café? False"], testes: [["tem_agua", "True"], ["tem_cafe", "False"]], dica: "`tem_agua = agua_ml >= 150` e depois `print(\"Tem água?\", tem_agua)`.", conceito: "comparacao",
      solucao: `agua_ml = 180
cafe_g = 14
tem_agua = agua_ml >= 150
tem_cafe = cafe_g >= 15
print("Tem água?", tem_agua)
print("Tem café?", tem_cafe)` },
    { tipo: "aberta", tag: "sec", titulo: "E se a resposta der pistas?", texto: "O programa compara a senha digitada com a senha correta. Se der errado, mostra: “A senha correta tem 6 letras e começa com A”.", pergunta: "Qual é o problema dessa mensagem? Como ela deveria ser?", conceito: "privacidade", modelo: "A mensagem entrega pistas: quem quer invadir descobre o tamanho e a primeira letra da senha. A mensagem deve ser genérica, como “usuário ou senha inválidos”, sem revelar nada sobre o que estava certo ou errado." },
    { tipo: "quiz", itens: [
      { pergunta: "O que `5 > 3` produz?", opcoes: ["True, pois 5 é maior", "False, pois 5 é menor", "5, o maior dos dois", "3, o menor dos dois"], correta: 0, porque: "Uma comparação devolve `True` ou `False`; 5 é maior que 3.", conceito: "comparacao" },
      { pergunta: "Qual operador pergunta se dois valores são iguais?", opcoes: ["= , um sinal de igual", "== , dois sinais iguais", "=> , igual com seta", "!= , ponto e igual"], correta: 1, porque: "`==` pergunta “é igual?”; o `=` sozinho guarda um valor.", conceito: "comparacao" },
      { pergunta: "O que `5 == \"5\"` produz?", opcoes: ["True, pois parecem iguais", "Erro, pois os tipos diferem", "5, o valor dos dois lados", "False, tipos diferentes"], correta: 3, porque: "Número e texto são tipos diferentes, então a comparação é `False` (sem erro).", conceito: "comparacao" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que é uma comparação e qual a diferença entre `=` e `==`?", conceito: "comparacao", modelo: "Comparação é uma pergunta sobre valores que responde `True` ou `False`. O `=` **guarda** um valor numa variável; o `==` **pergunta** se dois valores são iguais." },
  ],
  recuperacao: [
    { p: "Que valores uma comparação pode devolver?", regex: "(true|verdadeir);;(false|fals)", modelo: "`True` (verdadeiro) ou `False` (falso).", conceito: "comparacao" },
    { p: "Qual a diferença entre `=` e `==`?", regex: "(guard|atribu|armazen|valor);;(compar|pergunt|igual)", modelo: "O `=` guarda um valor numa variável; o `==` compara dois valores e responde `True` ou `False`.", conceito: "comparacao" },
    { p: "Por que `5 == \"5\"` dá `False`?", regex: "(tipo|texto|numero|string|aspas)", modelo: "Porque um é número e o outro é texto: tipos diferentes nunca são iguais.", conceito: "comparacao" },
  ],
});

// ---------- Aula 10: if ----------
aulas.push({
  id: "0010", modulo: 2, n: 2, slug: "if", titulo: "Decidindo com if: só faz se for verdade",
  resumo: "O robô aprende a executar um passo somente quando uma condição é verdadeira, e a usar a indentação para dizer quais linhas fazem parte da decisão.",
  objetivos: ["Escrever um `if` com condição, dois-pontos e bloco indentado.", "Dizer quais linhas só rodam quando a condição é verdadeira.", "Combinar `if` com `input()` para reagir ao que a pessoa digita."],
  conceitos: [["if_basico", "Decidir com if"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Se a água está quente, o robô passa o café. Escreva essa regra em português claro, em passos. E o que deve acontecer se a água **não** estiver quente e você não escreveu nada para esse caso?", modelo: "“Se a temperatura for pelo menos 90, passe o café.” Se a condição for falsa e não houver mais nada escrito, o robô simplesmente **não faz nada** e segue em frente. Essa estrutura “se… então…” é o `if`." },
    { tipo: "exemplo", arquivo: "checagem.py", texto: "Clique em cada linha.",
      codigo: [["temperatura = 95", "A temperatura que o robô mediu."], ["if temperatura >= 90:", "**`if`** significa “se”. Depois vem a **condição** (uma comparação) e os **dois-pontos**. Se for `True`, o bloco abaixo roda."], ["    print(\"Água pronta: pode passar o café\")", "Esta linha tem **4 espaços** no começo (indentação). Isso diz ao Python que ela pertence ao `if`: só roda se a condição for verdadeira."], ["print(\"Fim da checagem\")", "Sem indentação: está **fora** do `if` e roda sempre."]],
      termos: [["Condição", "a pergunta (comparação) que o `if` avalia."], ["Bloco", "o conjunto de linhas indentadas que só roda se a condição for verdadeira."], ["Indentação", "os espaços no começo da linha (use 4) que mostram a quem a linha pertence."]] },
    { tipo: "executar", texto: "Rode com 95 e depois troque a temperatura por 80.", arquivo: "checagem.py (pode editar)", codigo: `temperatura = 95
if temperatura >= 90:
    print("Água pronta: pode passar o café")
print("Fim da checagem")`,
      prever: { enunciado: "Antes de testar, qual é a **primeira linha** exibida em cada caso?", conceito: "if_basico", itens: [{ codigo: `temperatura = 95
if temperatura >= 90:
    print("Água pronta: pode passar o café")
print("Fim da checagem")`, linha: 0, resposta: "Água pronta: pode passar o café", porque: "95 é pelo menos 90: a condição é verdadeira e o bloco roda." }, { codigo: `temperatura = 80
if temperatura >= 90:
    print("Água pronta: pode passar o café")
print("Fim da checagem")`, linha: 0, resposta: "Fim da checagem", porque: "80 não é pelo menos 90: o bloco é pulado e a primeira (e única) linha exibida é a de fora do `if`." }] } },
    { tipo: "descobrir", texto: "Observe quais linhas aparecem conforme o valor de `x`.", arquivo: "indentacao.py", codigo: `if x > 5:
    print("grande")
    print("de verdade")
print("fim")`,
      execucoes: [{ prefixo: "x = 3", saida: ["fim"] }, { prefixo: "x = 8", saida: ["grande", "de verdade", "fim"] }, { prefixo: "x = 5", saida: ["fim"] }], colunas: ["Valor de x", "O que aparece"],
      pergunta: "Quais linhas só rodam quando `x > 5`? O que diz ao Python que elas fazem parte do `if`? E por que `x = 5` não mostrou “grande”?", dicas: ["Compare o que aparece com `x = 3` e com `x = 8`: quais linhas sumiram?", "Olhe o começo de cada linha: quais têm espaços a mais?"],
      explicacao: "Só rodam as linhas **indentadas** logo abaixo do `if` (“grande” e “de verdade”); a indentação diz que elas pertencem ao bloco. “fim” não tem espaços, então roda sempre. Com `x = 5`, a condição `x > 5` é falsa (5 não é maior que 5), então o bloco é pulado.", conceito: "if_basico" },
    { tipo: "prever", texto: "Preveja a linha pedida em cada programa.", conceito: "if_basico", itens: [
      { codigo: `n = 3
if n > 5:
    print("A")
print("B")`, resposta: "B", porque: "3 não é maior que 5: o bloco do `if` é pulado e só roda o `print(\"B\")`." },
      { codigo: `n = 8
if n > 5:
    print("A")
    print("B")`, linha: 0, resposta: "A", porque: "8 é maior que 5: as duas linhas do bloco rodam, e a primeira exibida é “A”." },
      { codigo: `if 1 == 2:
    print("X")
print("Y")`, resposta: "Y", porque: "1 não é igual a 2: o bloco é pulado." }] },
    { tipo: "corrigir", texto: "Este programa tem dois defeitos de escrita no `if`. Leia a mensagem do Python e conserte.", arquivo: "com_defeito.py",
      codigo: `temperatura = 95
if temperatura >= 90
print("Água pronta")`, cenarios: [{ esperado: ["Água pronta"] }, { esperado: ["Água pronta"] }], dica: "Faltam os dois-pontos depois da condição e a indentação (4 espaços) na linha do bloco.", conceito: "if_basico",
      solucao: `temperatura = 95
if temperatura >= 90:
    print("Água pronta")` },
    { tipo: "escrever", texto: "Peça `Água (ml): ` (um número inteiro). Se for **menor que 150**, mostre `Falta água!`. No fim, **sempre**, mostre `Checagem concluída`.", arquivo: "meu_programa.py",
      inicial: `agua = int(input("Água (ml): "))
# se faltar água, avise
# no fim, sempre mostre a checagem
`, cenarios: [{ entradas: ["120"], esperado: ["Água (ml): 120", "Falta água!", "Checagem concluída"] }, { entradas: ["200"], esperado: ["Água (ml): 200", "Checagem concluída"] }, { entradas: ["150"], esperado: ["Água (ml): 150", "Checagem concluída"] }], dica: "Um `if agua < 150:` com o aviso indentado; o `print` final fica sem indentação.", conceito: "if_basico",
      solucao: `agua = int(input("Água (ml): "))
if agua < 150:
    print("Falta água!")
print("Checagem concluída")` },
    { tipo: "aberta", tag: "sec", titulo: "Quem pode apagar?", texto: "Um sistema só deixa apagar pedidos se o usuário for administrador: `if perfil == \"admin\":`. Para “proteger”, o programador só escondeu o botão de apagar na tela dos outros usuários.", pergunta: "Isso é suficiente? Onde a checagem do `if` precisa acontecer?", modelo: "Não basta esconder o botão: alguém pode chamar a função de apagar de outro jeito. A checagem precisa ser feita **no sistema, onde o dado é apagado**, sempre que o pedido chegar. Esconder opções na tela é conforto, não segurança." },
    { tipo: "quiz", itens: [
      { pergunta: "O que faz o bloco de um `if` rodar?", opcoes: ["A condição ser verdadeira", "A condição ser falsa", "A linha estar sem espaços", "O programa estar no fim"], correta: 0, porque: "O bloco indentado só roda quando a condição é `True`.", conceito: "if_basico" },
      { pergunta: "O que precisa vir depois da condição do `if`?", opcoes: ["Um ponto e vírgula (;)", "Um ponto final (.)", "Dois-pontos (:)", "Uma vírgula (,)"], correta: 2, porque: "Os dois-pontos abrem o bloco do `if`.", conceito: "if_basico" },
      { pergunta: "Qual linha NÃO pertence ao bloco do `if`?", opcoes: ["A que tem 4 espaços", "A que tem 8 espaços", "A logo abaixo do if", "A que não tem espaços"], correta: 3, porque: "Só as linhas indentadas fazem parte do bloco; a sem espaços roda sempre.", conceito: "if_basico" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como o `if` decide quais linhas rodar, e o que as marca como parte da decisão?", conceito: "if_basico", modelo: "O `if` avalia uma condição (`True` ou `False`). Se for verdadeira, roda o **bloco**: as linhas indentadas logo abaixo, depois dos dois-pontos. As linhas sem indentação rodam sempre." },
  ],
  recuperacao: [
    { p: "O que o `if` faz?", regex: "(se |condic|verdad|true);;(roda|executa|faz|bloco|linhas)", modelo: "Executa um bloco de linhas somente se a condição for verdadeira.", conceito: "if_basico" },
    { p: "O que marca quais linhas pertencem ao bloco do `if`?", regex: "(indent|espaco|recuo|tabul)", modelo: "A indentação: os 4 espaços no começo das linhas.", conceito: "if_basico" },
    { p: "O que acontece se a condição do `if` for falsa e não houver mais nada?", regex: "(nada|pula|ignor|nao roda|nao executa|segue)", modelo: "O bloco é pulado e o programa segue para a próxima linha sem indentação.", conceito: "if_basico" },
  ],
});

// ---------- Aula 11: else ----------
aulas.push({
  id: "0011", modulo: 2, n: 3, slug: "else", titulo: "Dois caminhos: else",
  resumo: "E se a condição for falsa? O `else` dá ao robô um segundo caminho, e exatamente um dos dois sempre roda.",
  objetivos: ["Escrever `if` com `else`.", "Explicar que exatamente um dos dois blocos roda.", "Escolher entre dois resultados a partir de um valor digitado."],
  conceitos: [["else_caminhos", "else: o segundo caminho"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Se a água está quente o robô passa o café; **senão**, avisa para esperar. Escreva em português claro. Em quantos dos dois casos o robô faz alguma coisa?", modelo: "“Se a água estiver quente, passe o café; senão, avise para esperar.” Em **qualquer** caso o robô faz algo: um caminho ou o outro, nunca os dois e nunca nenhum. É o `if` com `else`." },
    { tipo: "exemplo", arquivo: "dois_caminhos.py", texto: "Clique em cada linha.",
      codigo: [["temperatura = 80", "O robô mediu 80 graus."], ["if temperatura >= 90:", "A pergunta: está quente o bastante?"], ["    print(\"Pode passar o café\")", "Caminho 1: roda só se a condição for verdadeira."], ["else:", "**`else`** significa “senão”. Fica na mesma altura do `if` e também termina com dois-pontos."], ["    print(\"Esperar a água esquentar\")", "Caminho 2: roda só se a condição for falsa."], ["print(\"Fim\")", "Roda sempre."]],
      termos: [["else", "o caminho alternativo: roda quando a condição do `if` é falsa."]] },
    { tipo: "executar", texto: "Rode com 80 e depois com 95 e com 90.", arquivo: "dois_caminhos.py (pode editar)", codigo: `temperatura = 80
if temperatura >= 90:
    print("Pode passar o café")
else:
    print("Esperar a água esquentar")
print("Fim")`,
      prever: { enunciado: "Antes de testar, qual é a **primeira linha** exibida?", conceito: "else_caminhos", itens: [{ codigo: `temperatura = 90
if temperatura >= 90:
    print("Pode passar o café")
else:
    print("Esperar a água esquentar")`, linha: 0, resposta: "Pode passar o café", porque: "`>=` inclui o 90: a condição é verdadeira." }, { codigo: `temperatura = 89
if temperatura >= 90:
    print("Pode passar o café")
else:
    print("Esperar a água esquentar")`, linha: 0, resposta: "Esperar a água esquentar", porque: "89 não é pelo menos 90: roda o `else`." }] } },
    { tipo: "descobrir", texto: "Veja o que aparece para três idades.", arquivo: "idade.py", codigo: `if idade >= 18:
    print("pode")
else:
    print("não pode")`,
      execucoes: [{ prefixo: "idade = 17", saida: ["não pode"] }, { prefixo: "idade = 18", saida: ["pode"] }, { prefixo: "idade = 30", saida: ["pode"] }], colunas: ["Valor de idade", "O que aparece"],
      pergunta: "Quantos dos dois blocos rodam a cada execução? O que decide qual deles roda?", dicas: ["Em cada linha da tabela aparece uma palavra só: “pode” ou “não pode”.", "A condição `idade >= 18` é verdadeira ou falsa em cada caso?"],
      explicacao: "**Exatamente um** dos dois: se a condição for verdadeira, roda o bloco do `if`; se for falsa, roda o do `else`. Nunca os dois, nunca nenhum.", conceito: "else_caminhos" },
    { tipo: "prever", conceito: "else_caminhos", itens: [
      { codigo: `n = 7
if n % 2 == 0:
    print("par")
else:
    print("ímpar")`, resposta: "ímpar", porque: "7 dividido por 2 deixa resto 1, que não é 0: roda o `else`." },
      { codigo: `saldo = 50
compra = 80
if saldo >= compra:
    print("compra aprovada")
else:
    print("saldo insuficiente")`, resposta: "saldo insuficiente", porque: "50 não cobre 80: roda o `else`." },
      { codigo: `nome = ""
if nome == "":
    print("sem nome")
else:
    print("com nome")`, resposta: "sem nome", porque: "O texto vazio `\"\"` é igual a `\"\"`: a condição é verdadeira." }] },
    { tipo: "corrigir", texto: "Falta algo na linha do `else`. Leia a mensagem do Python e conserte.", arquivo: "com_defeito.py", dica: "O `else` também termina com dois-pontos.", conceito: "else_caminhos",
      codigo: `saldo = int(input("Saldo: "))
compra = 80
if saldo >= compra:
    print("Compra aprovada")
else
    print("Saldo insuficiente")`, cenarios: [{ entradas: ["50"], esperado: ["Saldo: 50", "Saldo insuficiente"] }, { entradas: ["100"], esperado: ["Saldo: 100", "Compra aprovada"] }],
      solucao: `saldo = int(input("Saldo: "))
compra = 80
if saldo >= compra:
    print("Compra aprovada")
else:
    print("Saldo insuficiente")` },
    { tipo: "escrever", texto: "Peça `Estoque: ` (inteiro). Se for **maior que 0**, mostre `Disponível`; senão, mostre `Esgotado`.", arquivo: "meu_programa.py",
      inicial: `estoque = int(input("Estoque: "))
# mostre Disponível ou Esgotado
`, cenarios: [{ entradas: ["0"], esperado: ["Estoque: 0", "Esgotado"] }, { entradas: ["5"], esperado: ["Estoque: 5", "Disponível"] }, { entradas: ["1"], esperado: ["Estoque: 1", "Disponível"] }], dica: "`if estoque > 0:` com `Disponível` e depois `else:` com `Esgotado`.", conceito: "else_caminhos",
      solucao: `estoque = int(input("Estoque: "))
if estoque > 0:
    print("Disponível")
else:
    print("Esgotado")` },
    { tipo: "aberta", tag: "sec", titulo: "O que dizer ao negar?", texto: "Na tela de login, o `else` mostra a mensagem de erro. Um programador escreveu duas versões: “Senha errada para o usuário lia” e “Usuário ou senha inválidos”.", pergunta: "Qual é mais segura e por quê?", modelo: "A segunda. A primeira confirma que o usuário “lia” **existe**, o que ajuda quem tenta adivinhar contas. Mensagens iguais para qualquer falha não entregam informação útil a um atacante." },
    { tipo: "quiz", itens: [
      { pergunta: "Quantos blocos de um if/else rodam por vez?", opcoes: ["Sempre os dois juntos", "Exatamente um deles", "Nenhum, só testa", "Depende do else"], correta: 1, porque: "Ou roda o bloco do `if` (condição verdadeira) ou o do `else` (condição falsa).", conceito: "else_caminhos" },
      { pergunta: "O `else` roda quando a condição do `if` é:", opcoes: ["verdadeira, o valor True", "falsa, o valor False", "um número maior que 0", "um texto sem espaços"], correta: 1, porque: "`else` significa “senão”: roda quando a condição é falsa.", conceito: "else_caminhos" },
      { pergunta: "Como o `else` deve ser escrito?", opcoes: ["else seguido de dois-pontos, alinhado ao if", "else com uma condição, dentro do if", "else sem dois-pontos, alinhado ao if", "else com espaços, mais fundo que o if"], correta: 0, porque: "Alinhado ao `if` e terminando com dois-pontos.", conceito: "else_caminhos" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: para que serve o `else` e quantos dos dois blocos rodam?", conceito: "else_caminhos", modelo: "O `else` é o caminho “senão”: roda quando a condição do `if` é falsa. Exatamente um dos dois blocos roda a cada execução." },
  ],
  recuperacao: [
    { p: "Para que serve o `else`?", regex: "(senao|caso contrario|falsa|false|alternativ|outro caminho)", modelo: "É o caminho alternativo: roda quando a condição do `if` é falsa.", conceito: "else_caminhos" },
    { p: "Quantos blocos de um `if`/`else` rodam em cada execução?", regex: "(um|1|apenas um|so um|exatamente)", naoRegex: "(dois|2|ambos)", modelo: "Exatamente um: o do `if` ou o do `else`.", conceito: "else_caminhos" },
    { p: "Por que não mostrar “senha errada para o usuário lia” ao negar o acesso?", regex: "(existe|conta|pista|atacante|invas|revel|informac|generic)", modelo: "Porque confirma que o usuário existe e ajuda quem tenta invadir; a mensagem deve ser genérica.", conceito: "privacidade" },
  ],
});

// ---------- Aula 12: elif ----------
aulas.push({
  id: "0012", modulo: 2, n: 4, slug: "elif", titulo: "Vários caminhos: elif e a ordem das regras",
  resumo: "Quando há mais de dois resultados, o `elif` encadeia as perguntas. Mas a ordem em que você pergunta pode mudar a resposta.",
  objetivos: ["Encadear perguntas com `if`, `elif` e `else`.", "Explicar que a primeira condição verdadeira vence e as outras são ignoradas.", "Corrigir uma regra com perguntas na ordem errada."],
  conceitos: [["elif_ordem", "elif e a ordem das regras"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O robô classifica a água: abaixo de 60 graus é “fria”, de 60 a 89 é “morna” e de 90 em diante é “quente”. Em que ordem você faria as perguntas? Faz diferença começar pela mais fácil?", modelo: "Uma boa ordem começa pela condição **mais restrita**: primeiro “90 ou mais?”, depois “60 ou mais?”, e o que sobrar é “fria”. A ordem importa porque o programa para na **primeira** pergunta verdadeira." },
    { tipo: "exemplo", arquivo: "classificar.py", texto: "Clique em cada linha.",
      codigo: [["temperatura = 75", "A temperatura medida."], ["if temperatura >= 90:", "Primeira pergunta: quente? 75 não é pelo menos 90, então pula."], ["    print(\"quente\")", "Só roda se for quente."], ["elif temperatura >= 60:", "**`elif`** é “senão, se”: só é perguntado se a anterior foi falsa. 75 é pelo menos 60: verdadeiro!"], ["    print(\"morna\")", "Roda, e o Python **ignora o resto** da cadeia."], ["else:", "O “senão” final: roda se nenhuma pergunta acima foi verdadeira."], ["    print(\"fria\")", "Não roda neste caso."]],
      termos: [["elif", "“senão, se”: uma pergunta extra, feita só se as anteriores foram falsas."]] },
    { tipo: "executar", texto: "Rode e depois troque a temperatura por 95 e por 40.", arquivo: "classificar.py (pode editar)", codigo: `temperatura = 75
if temperatura >= 90:
    print("quente")
elif temperatura >= 60:
    print("morna")
else:
    print("fria")`,
      prever: { enunciado: "Antes de testar:", conceito: "elif_ordem", itens: [{ codigo: `temperatura = 95
if temperatura >= 90:
    print("quente")
elif temperatura >= 60:
    print("morna")
else:
    print("fria")`, resposta: "quente", porque: "95 é pelo menos 90: a primeira condição já é verdadeira." }, { codigo: `temperatura = 40
if temperatura >= 90:
    print("quente")
elif temperatura >= 60:
    print("morna")
else:
    print("fria")`, resposta: "fria", porque: "40 falha nas duas perguntas: roda o `else`." }] } },
    { tipo: "descobrir", texto: "Agora as perguntas estão em outra ordem. Compare com o resultado real.", arquivo: "ordem_trocada.py", codigo: `if temperatura >= 60:
    print("morna")
elif temperatura >= 90:
    print("quente")
else:
    print("fria")`,
      execucoes: [{ prefixo: "temperatura = 95", saida: ["morna"] }, { prefixo: "temperatura = 75", saida: ["morna"] }, { prefixo: "temperatura = 40", saida: ["fria"] }], colunas: ["Valor de temperatura", "O que aparece"],
      pergunta: "Por que 95 graus saiu “morna”? O que a ordem das perguntas tem a ver com isso? Como você corrigiria?", dicas: ["95 é pelo menos 60? E o que o Python faz depois que acha uma condição verdadeira?", "A pergunta mais restrita (`>= 90`) deveria vir antes ou depois da mais larga (`>= 60`)?"],
      explicacao: "95 é pelo menos 60, e como esta é a **primeira** pergunta verdadeira, o Python roda “morna” e **ignora o resto**: o `elif temperatura >= 90` nem é lido. A correção é colocar a pergunta mais restrita (90 ou mais) **primeiro**.", conceito: "elif_ordem" },
    { tipo: "prever", conceito: "elif_ordem", itens: [
      { codigo: `nota = 7
if nota >= 9:
    print("A")
elif nota >= 7:
    print("B")
else:
    print("C")`, resposta: "B", porque: "7 não é pelo menos 9, mas é pelo menos 7: roda o `elif`." },
      { codigo: `nota = 9
if nota >= 9:
    print("A")
elif nota >= 7:
    print("B")
else:
    print("C")`, resposta: "A", porque: "9 já satisfaz a primeira pergunta." },
      { codigo: `nota = 6.9
if nota >= 9:
    print("A")
elif nota >= 7:
    print("B")
else:
    print("C")`, resposta: "C", porque: "6.9 falha nas duas perguntas: roda o `else`." },
      { codigo: `x = 15
if x > 5:
    print("maior que 5")
elif x > 10:
    print("maior que 10")`, resposta: "maior que 5", porque: "15 é maior que 5, e essa é a primeira pergunta verdadeira: o `elif` nunca é lido." }] },
    { tipo: "corrigir", texto: "A loja dá 10% de desconto a partir de 200 e 5% a partir de 100, mas as compras grandes estão ganhando só 5%. Conserte a **ordem**.", arquivo: "com_defeito.py", dica: "Pergunte primeiro pela regra mais restrita (200 ou mais).", conceito: "elif_ordem",
      codigo: `compra = int(input("Compra: "))
if compra >= 100:
    desconto = 5
elif compra >= 200:
    desconto = 10
else:
    desconto = 0
print("Desconto:", desconto)`, cenarios: [{ entradas: ["250"], esperado: ["Compra: 250", "Desconto: 10"] }, { entradas: ["150"], esperado: ["Compra: 150", "Desconto: 5"] }, { entradas: ["50"], esperado: ["Compra: 50", "Desconto: 0"] }],
      solucao: `compra = int(input("Compra: "))
if compra >= 200:
    desconto = 10
elif compra >= 100:
    desconto = 5
else:
    desconto = 0
print("Desconto:", desconto)` },
    { tipo: "escrever", texto: "Peça `Estoque: ` (inteiro) e mostre: `Esgotado` se for 0, `Estoque baixo` se for de 1 a 5, e `Estoque ok` se for maior que 5.", arquivo: "meu_programa.py",
      inicial: `estoque = int(input("Estoque: "))
# classifique o estoque
`, cenarios: [{ entradas: ["0"], esperado: ["Estoque: 0", "Esgotado"] }, { entradas: ["3"], esperado: ["Estoque: 3", "Estoque baixo"] }, { entradas: ["5"], esperado: ["Estoque: 5", "Estoque baixo"] }, { entradas: ["8"], esperado: ["Estoque: 8", "Estoque ok"] }], dica: "`if estoque == 0`, `elif estoque <= 5`, `else`.", conceito: "elif_ordem",
      solucao: `estoque = int(input("Estoque: "))
if estoque == 0:
    print("Esgotado")
elif estoque <= 5:
    print("Estoque baixo")
else:
    print("Estoque ok")` },
    { tipo: "aberta", tag: "sec", titulo: "Negar por padrão", texto: "Um sistema decide o acesso com `if perfil == \"admin\": ... elif perfil == \"cliente\": ... else: liberar tudo`.", pergunta: "Qual é o perigo desse `else` final? Qual deveria ser o comportamento padrão?", modelo: "Se aparecer um perfil novo, errado ou vazio, ele cai no `else` e ganha **acesso total**. O padrão deve ser **negar**: liberar só quando uma regra confirmar. Em segurança isso se chama “negar por padrão”." },
    { tipo: "quiz", itens: [
      { pergunta: "O que o `elif` significa?", opcoes: ["Senão, se (outra pergunta)", "Sempre, e depois testa", "Fim do bloco de decisão", "Repete a pergunta do if"], correta: 0, porque: "`elif` é “senão, se”: uma nova pergunta, feita só se as anteriores foram falsas.", conceito: "elif_ordem" },
      { pergunta: "Se duas condições são verdadeiras, quantos blocos da cadeia rodam?", opcoes: ["Os dois blocos juntos", "Apenas o primeiro deles", "Apenas o último deles", "Nenhum dos blocos"], correta: 1, porque: "O Python para na **primeira** condição verdadeira e ignora o resto.", conceito: "elif_ordem" },
      { pergunta: "Qual pergunta deve vir primeiro numa cadeia?", opcoes: ["A mais restrita (>= 90)", "A mais larga (>= 60)", "A que for mais curta", "A que tiver menos letras"], correta: 0, porque: "Se a larga vier antes, ela captura casos que deveriam cair na restrita.", conceito: "elif_ordem" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: por que a ordem das perguntas num `if/elif/else` importa?", conceito: "elif_ordem", modelo: "Porque o Python executa só o bloco da **primeira** condição verdadeira e ignora o resto. Se uma pergunta larga vier antes de uma restrita, ela captura casos que deveriam ser tratados pela restrita." },
  ],
  recuperacao: [
    { p: "O que o `elif` significa e quando ele é perguntado?", regex: "(senao,? se|outra pergunta|outra condicao|encade);;(anterior|falsa|nao foi|so se)", modelo: "“Senão, se”: é perguntado só se as condições anteriores foram falsas.", conceito: "elif_ordem" },
    { p: "Se várias condições de uma cadeia forem verdadeiras, qual bloco roda?", regex: "(primeir)", modelo: "Só o da primeira condição verdadeira; as outras são ignoradas.", conceito: "elif_ordem" },
    { p: "Por que o `else` final de uma regra de acesso não deve liberar tudo?", regex: "(negar|padrao|seguro|acesso total|qualquer|novo|inesperad)", modelo: "Porque casos inesperados cairiam nele e ganhariam acesso total; o padrão seguro é negar.", conceito: "elif_ordem" },
  ],
});

// ---------- Aula 13: and, or, not ----------
aulas.push({
  id: "0013", modulo: 2, n: 5, slug: "logica", titulo: "Combinando condições: and, or, not",
  resumo: "O robô só passa o café se tiver água **e** café. Hoje você junta várias perguntas numa só.",
  objetivos: ["Combinar condições com `and`, `or` e `not`.", "Dizer quando cada operador dá `True`.", "Escolher entre `and` e `or` numa regra de negócio."],
  conceitos: [["logica", "Combinar condições: and, or, not"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O robô só deve passar o café se tiver água suficiente **e** café suficiente. Quando ele deve avisar que falta algo? Quando basta **uma** das duas coisas estar certa?", modelo: "Para passar o café, **as duas** condições precisam ser verdadeiras (“e”). Para avisar que falta algo, basta **uma** ser falsa (“ou” falta uma). Em Python: `and` (as duas) e `or` (pelo menos uma)." },
    { tipo: "exemplo", arquivo: "conferir.py", texto: "Clique em cada linha.",
      codigo: [["agua_ml = 200", "Água disponível."], ["cafe_g = 20", "Café disponível."], ["if agua_ml >= 150 and cafe_g >= 15:", "**`and`**: as duas condições precisam ser verdadeiras. 200 ≥ 150 e 20 ≥ 15: verdadeiro."], ["    print(\"Pode passar o café\")", "Roda."], ["else:", "Roda se **pelo menos uma** das duas for falsa."], ["    print(\"Falta algo\")", "Não roda aqui."]],
      termos: [["and", "verdadeiro só se **as duas** condições forem verdadeiras."], ["or", "verdadeiro se **pelo menos uma** for verdadeira."], ["not", "inverte: `not True` é `False`."]] },
    { tipo: "executar", texto: "Rode e depois mude os valores para ver quando cai no `else`.", arquivo: "conferir.py (pode editar)", codigo: `agua_ml = 200
cafe_g = 20
if agua_ml >= 150 and cafe_g >= 15:
    print("Pode passar o café")
else:
    print("Falta algo")`,
      prever: { enunciado: "Antes de testar:", conceito: "logica", itens: [{ codigo: "print(True and False)", resposta: "False", porque: "`and` precisa das duas verdadeiras." }, { codigo: "print(True or False)", resposta: "True", porque: "`or` basta uma verdadeira." }, { codigo: "print(not True)", resposta: "False", porque: "`not` inverte o valor." }] } },
    { tipo: "descobrir", texto: "O programa mostra `and`, `or` e `not` para vários valores de `a` e `b`.", arquivo: "tabela.py", codigo: `print(a and b)
print(a or b)
print(not a)`,
      execucoes: [{ prefixo: "a = True\nb = True", saida: ["True", "True", "False"] }, { prefixo: "a = True\nb = False", saida: ["False", "True", "False"] }, { prefixo: "a = False\nb = False", saida: ["False", "False", "True"] }], colunas: ["Valores", "and · or · not a"],
      pergunta: "Quando `and` dá `True`? Quando `or` dá `True`? E o que `not` faz?", dicas: ["Olhe a primeira coluna de resultados: em quais linhas ela é `True`?", "Compare a segunda coluna (`or`) com a primeira (`and`) na linha em que `a` é `True` e `b` é `False`."],
      explicacao: "`and` só dá `True` quando **as duas** são verdadeiras. `or` dá `True` se **pelo menos uma** for verdadeira (só dá `False` quando as duas são falsas). `not` **inverte**: `True` vira `False` e vice-versa.", conceito: "logica" },
    { tipo: "prever", conceito: "logica", itens: [
      { codigo: `x = 7
print(x > 5 and x < 10)`, resposta: "True", porque: "7 é maior que 5 **e** menor que 10: as duas são verdadeiras." },
      { codigo: `x = 7
print(x < 5 or x == 7)`, resposta: "True", porque: "A primeira é falsa, mas a segunda é verdadeira: `or` basta uma." },
      { codigo: `x = 7
print(not x > 5)`, resposta: "False", porque: "`x > 5` é `True`; `not` inverte para `False`." },
      { codigo: `a = 3
b = 8
print(a > 5 or b > 5)`, resposta: "True", porque: "`b > 5` é verdadeira, e `or` basta uma." }] },
    { tipo: "corrigir", texto: "Só pessoas de 18 a 65 anos são elegíveis, mas o programa está liberando pessoas de 70. Conserte **uma palavra**.", arquivo: "com_defeito.py", dica: "As duas condições precisam valer ao mesmo tempo: troque o operador que as junta.", conceito: "logica",
      codigo: `idade = int(input("Idade: "))
if idade >= 18 or idade <= 65:
    print("Elegível")
else:
    print("Não elegível")`, cenarios: [{ entradas: ["17"], esperado: ["Idade: 17", "Não elegível"] }, { entradas: ["30"], esperado: ["Idade: 30", "Elegível"] }, { entradas: ["70"], esperado: ["Idade: 70", "Não elegível"] }],
      solucao: `idade = int(input("Idade: "))
if idade >= 18 and idade <= 65:
    print("Elegível")
else:
    print("Não elegível")` },
    { tipo: "escrever", texto: "A loja abre às 8h e fecha às 18h (às 18h já está fechada). Peça `Hora: ` (inteiro) e mostre `Aberto` ou `Fechado`.", arquivo: "meu_programa.py",
      inicial: `hora = int(input("Hora: "))
# mostre Aberto ou Fechado
`, cenarios: [{ entradas: ["7"], esperado: ["Hora: 7", "Fechado"] }, { entradas: ["8"], esperado: ["Hora: 8", "Aberto"] }, { entradas: ["17"], esperado: ["Hora: 17", "Aberto"] }, { entradas: ["18"], esperado: ["Hora: 18", "Fechado"] }], dica: "Aberto quando `hora >= 8 and hora < 18`.", conceito: "logica",
      solucao: `hora = int(input("Hora: "))
if hora >= 8 and hora < 18:
    print("Aberto")
else:
    print("Fechado")` },
    { tipo: "aberta", tag: "sec", titulo: "Duas chaves", texto: "Para liberar uma transferência de dinheiro, o sistema exige `senha_correta and codigo_sms_correto`.", pergunta: "Por que juntar duas condições com `and` aumenta a segurança? O que aconteceria com `or`?", modelo: "Com `and`, o atacante precisa acertar **as duas** coisas (algo que a pessoa sabe e algo que ela tem). Com `or`, bastaria acertar **uma**, e a proteção ficaria tão fraca quanto a mais fácil das duas. É a ideia da autenticação em duas etapas." },
    { tipo: "quiz", itens: [
      { pergunta: "Quando `a and b` é `True`?", opcoes: ["Quando só a for True", "Quando só b for True", "Quando as duas forem True", "Quando as duas forem False"], correta: 2, porque: "`and` exige as duas verdadeiras.", conceito: "logica" },
      { pergunta: "Quando `a or b` é `False`?", opcoes: ["Quando as duas forem False", "Quando só a for False", "Quando só b for False", "Quando as duas forem True"], correta: 0, porque: "`or` só dá `False` se as duas forem falsas.", conceito: "logica" },
      { pergunta: "O que `not False` produz?", opcoes: ["False, o mesmo valor", "True, o valor invertido", "Erro, falta um valor", "None, nenhum valor"], correta: 1, porque: "`not` inverte: `not False` é `True`.", conceito: "logica" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: qual a diferença entre `and` e `or`?", conceito: "logica", modelo: "`and` é verdadeiro só quando as **duas** condições são verdadeiras; `or` é verdadeiro quando **pelo menos uma** é. `not` inverte o valor." },
  ],
  recuperacao: [
    { p: "Quando `and` devolve `True`?", regex: "(duas|ambas|todas|as dois)", modelo: "Somente quando as duas condições são verdadeiras.", conceito: "logica" },
    { p: "Quando `or` devolve `False`?", regex: "(duas|ambas|todas);;(falsa|false)", modelo: "Somente quando as duas condições são falsas.", conceito: "logica" },
    { p: "Para aceitar só idades de 18 a 65, uso `and` ou `or`? Por quê?", regex: "(and|e );;(duas|ambas|ao mesmo tempo|juntas)", modelo: "`and`: as duas condições (>= 18 e <= 65) precisam valer ao mesmo tempo.", conceito: "logica" },
  ],
});

// ---------- Aula 14: limites ----------
aulas.push({
  id: "0014", modulo: 2, n: 6, slug: "limites", titulo: "Limites: o erro de um único valor",
  resumo: "`>` ou `>=`? Um símbolo a mais ou a menos muda o resultado justo no valor da borda. Hoje você aprende a caçar e testar esses limites.",
  objetivos: ["Diferenciar `>` de `>=` e `<` de `<=` na borda.", "Escolher os valores certos para testar uma regra (antes, na borda e depois).", "Corrigir um erro de limite."],
  conceitos: [["limites", "Limites e casos de borda"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Uma loja dá desconto “para compras de 100 reais ou mais”. Uma compra de **exatamente** 100 ganha desconto? Que pequeno descuido ao escrever a regra no programa poderia mudar isso?", modelo: "“100 ou mais” inclui o 100: no Python, é `>= 100`. Se alguém escrever `> 100` por descuido, quem compra exatamente 100 **perde o desconto**. Esse erro só aparece no valor da borda." },
    { tipo: "exemplo", arquivo: "desconto.py", texto: "Clique em cada linha.",
      codigo: [["compra = 100", "Uma compra de exatamente 100."], ["if compra >= 100:", "**`>=`** inclui o próprio 100: “100 ou mais”."], ["    print(\"Tem desconto\")", "Roda para 100, 101, 250..."], ["else:", "Roda para 99, 50, 0..."], ["    print(\"Sem desconto\")", "Não roda para 100."]],
      termos: [["Limite (borda)", "o valor exato em que a regra muda de um resultado para outro."]] },
    { tipo: "executar", texto: "Troque `>=` por `>` e rode: o que acontece com 100?", arquivo: "desconto.py (pode editar)", codigo: `compra = 100
if compra >= 100:
    print("Tem desconto")
else:
    print("Sem desconto")`,
      prever: { enunciado: "Antes de testar:", conceito: "limites", itens: [{ codigo: `n = 18
print(n > 18)`, resposta: "False", porque: "18 não é maior que 18." }, { codigo: `n = 18
print(n >= 18)`, resposta: "True", porque: "18 é maior **ou igual** a 18." }] } },
    { tipo: "descobrir", texto: "Duas regras quase iguais, testadas com três valores.", arquivo: "borda.py", codigo: `print(compra > 100)
print(compra >= 100)`,
      execucoes: [{ prefixo: "compra = 99", saida: ["False", "False"] }, { prefixo: "compra = 100", saida: ["False", "True"] }, { prefixo: "compra = 101", saida: ["True", "True"] }], colunas: ["Valor de compra", "`> 100` · `>= 100`"],
      pergunta: "Em qual valor as duas regras discordam? Por que só esse valor revela a diferença?", dicas: ["Compare as duas colunas de resultado linha por linha.", "Em 99 e em 101 as duas regras dão a mesma resposta?"],
      explicacao: "Discordam **só em 100**, justo na borda: `>` exclui o 100 e `>=` inclui. Em 99 e em 101 as duas dão a mesma resposta, por isso um teste com valores “comuns” não revelaria o erro.", conceito: "limites" },
    { tipo: "prever", conceito: "limites", itens: [
      { codigo: `idade = 17
print(idade >= 18)`, resposta: "False", porque: "17 está logo abaixo da borda." },
      { codigo: `x = 5
print(x >= 1 and x <= 5)`, resposta: "True", porque: "5 está dentro do intervalo: `<= 5` inclui o 5." },
      { codigo: `x = 5
print(x > 1 and x < 5)`, resposta: "False", porque: "`< 5` exclui o 5." },
      { codigo: `n = 0
print(n > 0)`, resposta: "False", porque: "0 não é maior que 0." }] },
    { tipo: "corrigir", texto: "O frete é grátis “a partir de 150 reais”, mas quem compra exatamente 150 está pagando frete. Conserte **um símbolo**.", arquivo: "com_defeito.py", dica: "“A partir de 150” inclui o 150. Qual operador inclui o valor?", conceito: "limites",
      codigo: `compra = int(input("Compra: "))
if compra > 150:
    print("Frete grátis")
else:
    print("Frete cobrado")`, cenarios: [{ entradas: ["149"], esperado: ["Compra: 149", "Frete cobrado"] }, { entradas: ["150"], esperado: ["Compra: 150", "Frete grátis"] }, { entradas: ["151"], esperado: ["Compra: 151", "Frete grátis"] }],
      solucao: `compra = int(input("Compra: "))
if compra >= 150:
    print("Frete grátis")
else:
    print("Frete cobrado")` },
    { tipo: "escrever", texto: "Regra: compras de **100 ou mais** têm desconto. Peça `Compra: ` (inteiro) e mostre `Com desconto` ou `Sem desconto`.", arquivo: "meu_programa.py",
      inicial: `compra = int(input("Compra: "))
# aplique a regra
`, cenarios: [{ entradas: ["99"], esperado: ["Compra: 99", "Sem desconto"] }, { entradas: ["100"], esperado: ["Compra: 100", "Com desconto"] }, { entradas: ["101"], esperado: ["Compra: 101", "Com desconto"] }], dica: "Os três cenários testam antes, na borda e depois: `compra >= 100`.", conceito: "limites",
      solucao: `compra = int(input("Compra: "))
if compra >= 100:
    print("Com desconto")
else:
    print("Sem desconto")` },
    { tipo: "aberta", titulo: "Onde testar?", texto: "Você acabou de ver que os três cenários do exercício eram 99, 100 e 101.", pergunta: "Por que testar justo os valores ao redor da borda, e não só um valor qualquer como 500?", conceito: "limites", modelo: "Porque erros como `>` no lugar de `>=` só mudam o resultado **na borda**. Um valor qualquer (como 500) passa nas duas versões da regra e esconde o defeito. Testar antes, na borda e depois é o jeito mais barato de achar esse erro." },
    { tipo: "aberta", tag: "sec", titulo: "Limite de tentativas", texto: "Um sistema de login permite tentar a senha quantas vezes a pessoa quiser.", pergunta: "Por que colocar um limite (por exemplo, bloquear depois de 5 tentativas erradas) protege contas?", modelo: "Sem limite, um programa pode tentar milhares de senhas por minuto até acertar (ataque de força bruta). Com um limite, o atacante é bloqueado cedo. O limite também é uma regra com borda: o que acontece na 5ª e na 6ª tentativa?" },
    { tipo: "quiz", itens: [
      { pergunta: "“100 ou mais” em Python se escreve:", opcoes: ["x > 100, maior que 100", "x >= 100, maior ou igual", "x < 100, menor que 100", "x == 100, igual a 100"], correta: 1, porque: "`>=` inclui o próprio 100.", conceito: "limites" },
      { pergunta: "Qual valor revela a diferença entre `> 100` e `>= 100`?", opcoes: ["99, abaixo da borda", "100, exatamente na borda", "101, acima da borda", "500, bem acima da borda"], correta: 1, porque: "As duas regras só discordam no valor exato da borda.", conceito: "limites" },
      { pergunta: "Quanto vale `n >= 18` se n for 18?", opcoes: ["False, pois 18 não passa", "Erro, pois 18 é inteiro", "True, pois 18 é igual", "18, o valor de n"], correta: 2, porque: "`>=` aceita o igual.", conceito: "limites" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: por que erros de `>` e `>=` são tão fáceis de passar despercebidos e como você os encontra?", conceito: "limites", modelo: "Porque só mudam o resultado no valor exato da borda; com valores comuns as duas regras dão a mesma resposta. Encontra-se testando antes, na borda e depois (por exemplo, 99, 100 e 101)." },
  ],
  recuperacao: [
    { p: "Qual a diferença entre `>` e `>=`?", regex: "(igual|inclui|incluso);;", modelo: "`>=` aceita o valor igual (inclui a borda); `>` não.", conceito: "limites" },
    { p: "Quais valores você testaria para uma regra “100 ou mais”?", regex: "99;;100;;101", modelo: "99, 100 e 101: antes, na borda e depois.", conceito: "limites" },
    { p: "Por que um limite de tentativas protege uma conta?", regex: "(forca bruta|adivinh|muitas tentativas|bloque|tentar varias|milhares)", modelo: "Impede que alguém tente milhares de senhas até acertar.", conceito: "limites" },
  ],
});

// ---------- Aula 15: validação ----------
aulas.push({
  id: "0015", modulo: 2, n: 7, slug: "validacao", titulo: "Validando o que a pessoa digita",
  resumo: "Pessoas digitam “abc”, deixam em branco e colocam números negativos. Hoje o robô aprende a conferir a entrada antes de confiar nela.",
  objetivos: ["Conferir uma entrada com `.isdigit()`, `.strip()` e `.lower()`.", "Aceitar só valores dentro de um intervalo.", "Explicar por que nunca se deve confiar na entrada."],
  conceitos: [["validacao", "Validar entradas antes de confiar"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O robô pergunta quantos cafés a pessoa quer. O que pode dar errado se ela digitar “abc”, “-2”, “1000” ou deixar em branco? O que o programa deveria fazer em cada caso?", modelo: "“abc” e em branco não são números; “-2” e “1000” são números, mas não fazem sentido para um pedido. O programa deve **conferir** antes de usar e responder com uma mensagem clara, em vez de travar ou aceitar qualquer coisa." },
    { tipo: "exemplo", arquivo: "validar.py", entradas: ["3"], texto: "Clique em cada linha.",
      codigo: [["qtd_texto = input(\"Quantos cafés? \")", "Lê a resposta como **texto**."], ["if qtd_texto.isdigit():", "`.isdigit()` responde `True` se o texto tem **só dígitos** (0 a 9). “abc”, “-2” e “” dão `False`."], ["    qtd = int(qtd_texto)", "Só aqui, com o texto já conferido, é seguro converter."], ["    print(\"Anotado:\", qtd)", "Caminho de sucesso."], ["else:", "Qualquer outra coisa."], ["    print(\"Digite só números\")", "Mensagem clara, sem travar o programa."]],
      termos: [["Validar", "conferir se um dado é aceitável antes de usá-lo."], ["`.isdigit()`", "pergunta se o texto tem só dígitos."], ["`.strip()` e `.lower()`", "tiram espaços das pontas e deixam o texto em minúsculas."]] },
    { tipo: "executar", texto: "Rode e depois mude a entrada para `abc`, `-2` e deixe em branco.", arquivo: "validar.py (pode editar)", entradas: ["abc"], codigo: `qtd_texto = input("Quantos cafés? ")
if qtd_texto.isdigit():
    qtd = int(qtd_texto)
    print("Anotado:", qtd)
else:
    print("Digite só números")`,
      prever: { enunciado: "Antes de testar, qual é a **última linha** exibida em cada caso?", conceito: "validacao", itens: [{ codigo: `qtd_texto = input("Quantos cafés? ")
if qtd_texto.isdigit():
    print("Anotado:", int(qtd_texto))
else:
    print("Digite só números")`, entradas: ["3"], resposta: "Anotado: 3", porque: "“3” tem só dígitos." }, { codigo: `qtd_texto = input("Quantos cafés? ")
if qtd_texto.isdigit():
    print("Anotado:", int(qtd_texto))
else:
    print("Digite só números")`, entradas: ["-2"], resposta: "Digite só números", porque: "O sinal de menos não é um dígito: `.isdigit()` dá `False`." }, { codigo: `qtd_texto = input("Quantos cafés? ")
if qtd_texto.isdigit():
    print("Anotado:", int(qtd_texto))
else:
    print("Digite só números")`, entradas: [""], resposta: "Digite só números", porque: "O texto vazio não tem dígitos." }] } },
    { tipo: "descobrir", texto: "O programa mostra duas perguntas sobre um texto.", arquivo: "textos.py", codigo: `print(texto.isdigit())
print(texto.strip().lower())`,
      execucoes: [{ prefixo: 'texto = "12"', saida: ["True", "12"] }, { prefixo: 'texto = " Lia "', saida: ["False", "lia"] }, { prefixo: 'texto = "1 2"', saida: ["False", "1 2"] }], colunas: ["Valor de texto", "`isdigit()` · `strip().lower()`"],
      pergunta: "O que `.isdigit()` aceita? E o que `.strip().lower()` faz com o texto?", dicas: ["Em qual dos três o texto só tem dígitos? O que tem de diferente nos outros?", "Compare ` Lia ` (com espaços e maiúscula) com o resultado `lia`."],
      explicacao: "`.isdigit()` só aceita texto feito **só de dígitos** (o espaço no meio de “1 2” já reprova). `.strip()` tira os espaços das pontas e `.lower()` deixa tudo em minúsculas, o que ajuda a comparar o que a pessoa digitou sem se importar com esses detalhes.", conceito: "validacao" },
    { tipo: "prever", conceito: "validacao", itens: [
      { codigo: 'print("  Café ".strip())', resposta: "Café", porque: "`.strip()` remove os espaços das pontas." },
      { codigo: 'print("ABC".lower())', resposta: "abc", porque: "`.lower()` deixa em minúsculas." },
      { codigo: 'print("123".isdigit())', resposta: "True", porque: "Só dígitos." },
      { codigo: 'print("12a".isdigit())', resposta: "False", porque: "A letra “a” não é dígito." }] },
    { tipo: "corrigir", texto: "Se a pessoa digitar “dois”, o programa trava com um erro. Faça-o **conferir antes de converter**.", arquivo: "com_defeito.py", dica: "Use `.isdigit()` antes de chamar `int(...)`, e um `else` com `Digite só números`.", conceito: "validacao",
      codigo: `qtd_texto = input("Quantos cafés? ")
qtd = int(qtd_texto)
print("Total:", qtd * 4.5)`, cenarios: [{ entradas: ["dois"], esperado: ["Quantos cafés? dois", "Digite só números"] }, { entradas: ["2"], esperado: ["Quantos cafés? 2", "Total: 9.0"] }],
      solucao: `qtd_texto = input("Quantos cafés? ")
if qtd_texto.isdigit():
    qtd = int(qtd_texto)
    print("Total:", qtd * 4.5)
else:
    print("Digite só números")` },
    { tipo: "escrever", texto: "Peça `Quantos cafés? `. Se não forem só dígitos, mostre `Digite só números`. Se for número, aceite só de **1 a 10**: mostre `Anotado: N` ou `Quantidade inválida`.", arquivo: "meu_programa.py",
      inicial: `qtd_texto = input("Quantos cafés? ")
# valide: só dígitos, e entre 1 e 10
`, cenarios: [{ entradas: ["abc"], esperado: ["Quantos cafés? abc", "Digite só números"] }, { entradas: ["0"], esperado: ["Quantos cafés? 0", "Quantidade inválida"] }, { entradas: ["1"], esperado: ["Quantos cafés? 1", "Anotado: 1"] }, { entradas: ["10"], esperado: ["Quantos cafés? 10", "Anotado: 10"] }, { entradas: ["11"], esperado: ["Quantos cafés? 11", "Quantidade inválida"] }], dica: "Um `if` dentro do `else`: primeiro `.isdigit()`; só depois converta e confira o intervalo.", conceito: ["validacao", "limites"],
      solucao: `qtd_texto = input("Quantos cafés? ")
if not qtd_texto.isdigit():
    print("Digite só números")
else:
    qtd = int(qtd_texto)
    if qtd >= 1 and qtd <= 10:
        print("Anotado:", qtd)
    else:
        print("Quantidade inválida")` },
    { tipo: "aberta", tag: "sec", titulo: "Nunca confie na entrada", texto: "Um site limita a quantidade de cafés a 10 usando só um campo na tela. O servidor soma o total com o número que recebe.", pergunta: "Por que o servidor precisa validar a quantidade de novo, mesmo que a tela já limite? O que um atacante poderia fazer?", conceito: "validacao", modelo: "A tela é controlada por quem a usa: alguém pode enviar a quantidade que quiser direto ao servidor (por exemplo, -5 para gerar crédito ou 1 milhão para derrubar o sistema). Por isso o sistema **sempre valida a entrada no seu próprio lado**. A validação da tela é só conforto." },
    { tipo: "quiz", itens: [
      { pergunta: "O que `\"-2\".isdigit()` devolve?", opcoes: ["True, pois é um número", "False, tem um sinal", "2, o valor positivo", "Erro, pois é texto"], correta: 1, porque: "O sinal de menos não é um dígito.", conceito: "validacao" },
      { pergunta: "Por que validar antes de usar `int(...)`?", opcoes: ["Para o código ficar curto", "Para evitar que o programa trave", "Para o texto ficar bonito", "Para somar mais rápido"], correta: 1, porque: "`int(\"abc\")` causa um erro; conferir antes evita travar.", conceito: "validacao" },
      { pergunta: "Quem deve validar a entrada de um sistema?", opcoes: ["Só a tela do usuário", "Só quem digita no campo", "O sistema no seu lado", "Só o navegador usado"], correta: 2, porque: "O que vem de fora nunca é confiável: o sistema valida por conta própria.", conceito: "validacao" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: por que um programa deve validar o que a pessoa digita, e como?", conceito: "validacao", modelo: "Porque a entrada pode ser vazia, errada ou maliciosa. Valida-se conferindo o tipo (`.isdigit()`), o intervalo (mínimo e máximo) e só então usando o valor. E o sistema sempre valida no seu lado, sem confiar na tela." },
  ],
  recuperacao: [
    { p: "O que `.isdigit()` pergunta?", regex: "(so|apenas|somente);;(digito|numero)", modelo: "Se o texto é feito só de dígitos (0 a 9).", conceito: "validacao" },
    { p: "Por que conferir a entrada antes de chamar `int(...)`?", regex: "(erro|trav|quebr|abc|texto|nao for numero|valueerror)", modelo: "Porque `int(\"abc\")` dá erro e trava o programa; conferindo antes dá para responder com uma mensagem.", conceito: "validacao" },
    { p: "Se a tela já limita a quantidade, por que o servidor valida de novo?", regex: "(tela|navegador|cliente|usuario);;(alter|burl|contorn|enviar direto|controla|nao confi)", modelo: "Porque quem usa controla o que envia e pode burlar a tela; o servidor não confia na entrada.", conceito: "validacao" },
  ],
});

// ---------- Aula 16: mini-projeto ----------
aulas.push({
  id: "0016", modulo: 2, n: 8, slug: "mini-projeto", titulo: "Mini-projeto: o robô confere e decide",
  resumo: "Hora de juntar as decisões: o robô confere água e café, diz o que falta e só passa o café quando tudo está certo. Depois, o mesmo raciocínio no desconto de uma loja.",
  minutos: 40,
  objetivos: ["Combinar `if`, `elif`, `else`, `and` e limites num programa só.", "Resolver o exercício final sem usar a dica.", "Aplicar as mesmas decisões a um problema novo (desconto de loja)."],
  conceitos: [],
  secoes: [
    { tipo: "aquecimento", titulo: "Planeje as regras", pergunta: "Para passar o café o robô precisa de pelo menos 150 ml de água **e** 15 g de café. Liste os casos possíveis e o que o robô deve dizer em cada um. Quais são os valores de borda?", minimo: 40, modelo: "Quatro casos: falta água **e** café; falta só água; falta só café; tem os dois (pode passar). As bordas são 150 ml e 15 g (que **bastam**). Listar os casos antes de escrever é o que evita esquecer um deles." },
    { tipo: "exemplo", titulo: "Um esqueleto de referência", arquivo: "esqueleto.py", entradas: ["5"], texto: "Mesma estrutura (ler, decidir em ordem, avisar), com outro tema. Use como mapa, não como cola.",
      codigo: [["estoque = int(input(\"Estoque: \"))", "Lê e converte."], ["if estoque == 0:", "A regra mais restrita primeiro."], ["    print(\"Esgotado\")", "Resposta do caso 1."], ["elif estoque <= 5:", "Depois a intermediária."], ["    print(\"Baixo\")", "Resposta do caso 2."], ["else:", "O que sobrou."], ["    print(\"Ok\")", "Resposta do caso 3."]] },
    { tipo: "escrever", titulo: "Exercício final (sem dica)", final: true, minutos: 12, texto: "Peça `Água (ml): ` e `Café (g): ` (inteiros). Mostre `Faltam água e café` se faltam as duas coisas, `Falta água` se só falta água, `Falta café` se só falta café e `Pode passar o café` se tem os dois. Água suficiente: **150 ml ou mais**. Café suficiente: **15 g ou mais**.", arquivo: "robo.py",
      inicial: `# Planeje os quatro casos, na ordem certa
`, cenarios: [{ entradas: ["120", "10"], esperado: ["Água (ml): 120", "Café (g): 10", "Faltam água e café"] }, { entradas: ["120", "20"], esperado: ["Água (ml): 120", "Café (g): 20", "Falta água"] }, { entradas: ["200", "10"], esperado: ["Água (ml): 200", "Café (g): 10", "Falta café"] }, { entradas: ["150", "15"], esperado: ["Água (ml): 150", "Café (g): 15", "Pode passar o café"] }, { entradas: ["149", "15"], esperado: ["Água (ml): 149", "Café (g): 15", "Falta água"] }],
      dica: "Defina `falta_agua = agua < 150` e `falta_cafe = cafe < 15`, e use `if falta_agua and falta_cafe`, `elif falta_agua`, `elif falta_cafe`, `else`.", conceito: ["if_basico", "else_caminhos", "elif_ordem", "logica", "limites"],
      solucao: `agua = int(input("Água (ml): "))
cafe = int(input("Café (g): "))
falta_agua = agua < 150
falta_cafe = cafe < 15
if falta_agua and falta_cafe:
    print("Faltam água e café")
elif falta_agua:
    print("Falta água")
elif falta_cafe:
    print("Falta café")
else:
    print("Pode passar o café")` },
    { tipo: "escrever", titulo: "Problema novo: o desconto da loja", transfer: true, minutos: 10, texto: "Outro contexto, as mesmas decisões. Peça `Compra: ` (inteiro) e `Cliente VIP (s/n): `. Regras: VIP **e** compra de 100 ou mais: `Desconto: 15%`; só compra de 100 ou mais: `Desconto: 10%`; só VIP: `Desconto: 5%`; nenhum dos dois: `Desconto: 0%`.", arquivo: "loja.py",
      inicial: `# Leia a compra e se é VIP (s ou n), e decida o desconto
`, cenarios: [{ entradas: ["150", "s"], esperado: ["Compra: 150", "Cliente VIP (s/n): s", "Desconto: 15%"] }, { entradas: ["150", "n"], esperado: ["Compra: 150", "Cliente VIP (s/n): n", "Desconto: 10%"] }, { entradas: ["50", "s"], esperado: ["Compra: 50", "Cliente VIP (s/n): s", "Desconto: 5%"] }, { entradas: ["50", "n"], esperado: ["Compra: 50", "Cliente VIP (s/n): n", "Desconto: 0%"] }, { entradas: ["100", "n"], esperado: ["Compra: 100", "Cliente VIP (s/n): n", "Desconto: 10%"] }], dica: "`vip = input(\"Cliente VIP (s/n): \") == \"s\"` e `grande = compra >= 100`; depois `if vip and grande`, `elif grande`, `elif vip`, `else`.", conceito: ["if_basico", "elif_ordem", "logica", "limites"],
      solucao: `compra = int(input("Compra: "))
vip = input("Cliente VIP (s/n): ") == "s"
grande = compra >= 100
if vip and grande:
    print("Desconto: 15%")
elif grande:
    print("Desconto: 10%")
elif vip:
    print("Desconto: 5%")
else:
    print("Desconto: 0%")` },
    { tipo: "aberta", tag: "sec", titulo: "Quem decide o desconto?", texto: "Na loja, o campo “Cliente VIP” é preenchido por quem compra.", pergunta: "Por que o sistema não deveria confiar nessa resposta? Como ele deveria saber se alguém é VIP?", modelo: "Quem compra pode escrever “s” mesmo sem ser VIP. O sistema deve **consultar o cadastro** (um dado que ele mesmo guarda e controla) e decidir com base nisso, nunca na resposta de quem se beneficia dela." },
    { tipo: "quiz", itens: [
      { pergunta: "Como organizar as regras de desconto na ordem certa?", opcoes: ["Da mais restrita para a geral", "Da mais geral para a restrita", "Em ordem alfabética dos nomes", "Em ordem aleatória, tanto faz"], correta: 0, porque: "A cadeia para na primeira verdadeira; as restritas vêm antes.", conceito: "elif_ordem" },
      { pergunta: "Água precisa de “150 ou mais”. Qual condição está certa?", opcoes: ["agua > 150, só os maiores", "agua >= 150, inclui o 150", "agua == 150, só o exato", "agua < 150, os menores"], correta: 1, porque: "“150 ou mais” inclui o 150: `>=`.", conceito: "limites" },
      { pergunta: "Para exigir água E café, você usa:", opcoes: ["or, basta uma delas", "not, inverte uma delas", "and, as duas juntas", "elif, a segunda tenta"], correta: 2, porque: "`and` exige as duas condições verdadeiras.", conceito: "logica" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: descreva como o seu programa do robô decide, passo a passo.", conceito: "elif_ordem", modelo: "Lê água e café; calcula se faltam; pergunta primeiro pelo caso mais restrito (faltam os dois), depois só água, depois só café, e por último o caso em que tem tudo. Os limites (150 e 15) usam `<`, então 150 e 15 **bastam**." },
  ],
  recuperacao: [
    { p: "Em que ordem escrever as condições de uma cadeia com `elif`?", regex: "(restrit|especific|mais exigent)", modelo: "Da mais restrita para a mais geral, porque só a primeira verdadeira roda.", conceito: "elif_ordem" },
    { p: "Como exigir que duas condições sejam verdadeiras ao mesmo tempo?", regex: "(and)", modelo: "Com `and`.", conceito: "logica" },
    { p: "Por que o sistema não deve confiar no campo “VIP” preenchido por quem compra?", regex: "(cadastro|consult|proprio|controla|qualquer um|beneficia|mentir|falso)", modelo: "Porque quem compra pode mentir; o sistema deve consultar o cadastro que ele controla.", conceito: "validacao" },
  ],
});

export default aulas;
