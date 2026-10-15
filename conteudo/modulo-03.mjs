// Módulo 3: Repetições, fazer de novo sem copiar (universal). Fio condutor: servir várias xícaras, somar vendas e organizar as horas da semana.
export const meta = {
  final: "Mini-projeto: organizar as horas de estudo da semana",
  transfer: "Aplicar as repetições ao caixa de uma cafeteria",
};
const aulas = [];

// ---------- Aula 17: for e range ----------
aulas.push({
  id: "0017", modulo: 3, n: 1, slug: "for", titulo: "Por que repetir? O for e o range",
  resumo: "Servir 5 xícaras é fácil de escrever 5 vezes, mas e 500? Hoje o robô aprende a repetir um passo quantas vezes for preciso.",
  objetivos: ["Escrever um `for` com `range(n)`.", "Dizer quais valores a variável do laço assume.", "Explicar o que acontece com `range(0)`."],
  conceitos: [["for_range", "Repetir com for e range"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O robô precisa servir 5 xícaras. Escrever o mesmo `print` cinco vezes é chato, e com 500 xícaras seria absurdo. Como você pediria ao computador para repetir um passo várias vezes?", modelo: "Em vez de copiar a instrução, dizemos “repita isto N vezes”. Em Python, o **laço `for`** faz isso. Assim, mudar de 5 para 500 xícaras é mudar um número." },
    { tipo: "exemplo", arquivo: "servir.py", texto: "Clique em cada linha.",
      codigo: [["for xicara in range(3):", "**`for`** repete o bloco abaixo. `range(3)` gera os valores 0, 1 e 2 (**3 voltas**). A variável `xicara` recebe um valor novo a cada volta. Termina com dois-pontos, como o `if`."], ["    print(\"Servindo uma xícara\")", "Indentada: pertence ao laço e roda **a cada volta**."], ["print(\"Pronto\")", "Sem indentação: roda **uma vez**, depois que o laço termina."]],
      termos: [["Laço (loop)", "um bloco de instruções que se repete."], ["range(n)", "gera os números de 0 até n-1, ou seja, n valores."], ["Volta (iteração)", "cada execução do bloco do laço."]] },
    { tipo: "executar", texto: "Rode e depois troque o 4 por outros números.", arquivo: "servir.py (pode editar)", codigo: `for i in range(4):
    print("Xícara", i)`,
      prever: { enunciado: "Antes de testar, qual é a **última linha** exibida?", conceito: "for_range", itens: [{ codigo: `for i in range(3):
    print(i * 2)`, resposta: "4", porque: "Os valores de `i` são 0, 1 e 2; o último `i * 2` é 4." }, { codigo: `for i in range(5):
    print(i)`, resposta: "4", porque: "`range(5)` vai de 0 a 4 (5 valores): o 5 não aparece." }] } },
    { tipo: "descobrir", texto: "O programa mostra cada valor de `i`. Veja com `n` diferente.", arquivo: "voltas.py", codigo: `for i in range(n):
    print(i)`,
      execucoes: [{ prefixo: "n = 3", saida: ["0", "1", "2"] }, { prefixo: "n = 1", saida: ["0"] }, { prefixo: "n = 0", saida: [] }], colunas: ["Valor de n", "O que aparece"],
      pergunta: "Quantas vezes o bloco roda com `range(n)`? A partir de qual número começa a contagem? E o que acontece com `n = 0`?", dicas: ["Conte as linhas que aparecem em cada caso e compare com o valor de n.", "Olhe o primeiro valor mostrado em cada linha da tabela."],
      explicacao: "O bloco roda **n vezes**. A contagem começa em **0** e vai até n-1. Com `n = 0` o laço não roda nenhuma vez: nada aparece (e nenhum erro).", conceito: "for_range" },
    { tipo: "prever", conceito: "for_range", itens: [
      { codigo: `for i in range(3):
    print("oi")`, resposta: "oi", porque: "Imprime “oi” 3 vezes; a última linha é “oi”." },
      { codigo: `soma = 0
for i in range(4):
    soma = soma + 1
print(soma)`, resposta: "4", porque: "Soma 1 em cada uma das 4 voltas." },
      { codigo: `for i in range(2):
    print("A")
    print("B")`, resposta: "B", porque: "Cada volta imprime A e B; a última linha da última volta é B." },
      { codigo: `for i in range(0):
    print("nunca")
print("fim")`, resposta: "fim", porque: "`range(0)` não tem valores: o bloco não roda." }] },
    { tipo: "corrigir", texto: "O robô deveria numerar as xícaras de 1 a 3, mas está começando do 0. Conserte **uma linha**.", arquivo: "com_defeito.py", dica: "O `range(3)` começa em 0. Some 1 ao mostrar.", conceito: "for_range",
      codigo: `for i in range(3):
    print("Xícara", i)`, esperado: ["Xícara 1", "Xícara 2", "Xícara 3"],
      solucao: `for i in range(3):
    print("Xícara", i + 1)` },
    { tipo: "escrever", texto: "Peça `Quantas xícaras? ` (inteiro) e mostre `Servindo xícara 1`, `Servindo xícara 2`... até o número pedido.", arquivo: "meu_programa.py",
      inicial: `n = int(input("Quantas xícaras? "))
# repita o servir n vezes
`, cenarios: [{ entradas: ["2"], esperado: ["Quantas xícaras? 2", "Servindo xícara 1", "Servindo xícara 2"] }, { entradas: ["4"], esperado: ["Quantas xícaras? 4", "Servindo xícara 1", "Servindo xícara 2", "Servindo xícara 3", "Servindo xícara 4"] }, { entradas: ["0"], esperado: ["Quantas xícaras? 0"] }], dica: "`for i in range(n):` e dentro `print(\"Servindo xícara\", i + 1)`.", conceito: "for_range",
      solucao: `n = int(input("Quantas xícaras? "))
for i in range(n):
    print("Servindo xícara", i + 1)` },
    { tipo: "aberta", tag: "sec", titulo: "O vazamento multiplicado", texto: "Um programa percorre 1.000 clientes e, dentro do laço, imprime nome, CPF e telefone de cada um “só para conferir”.", pergunta: "O que esse laço faz com o risco de vazamento? Que cuidado você teria?", modelo: "O laço **multiplica** o problema: em vez de uma linha com dados pessoais, são 1.000 numa tela ou num registro (log). O cuidado é não imprimir dados pessoais dentro de laços, mostrar só o necessário (por exemplo, uma contagem) e mascarar quando precisar exibir." },
    { tipo: "quiz", itens: [
      { pergunta: "Quantas voltas dá `for i in range(5)`?", opcoes: ["4 voltas, de 0 até 3", "5 voltas, de 0 até 4", "5 voltas, de 1 até 5", "6 voltas, de 0 até 5"], correta: 1, porque: "`range(5)` gera 5 valores: 0, 1, 2, 3 e 4.", conceito: "for_range" },
      { pergunta: "O que marca as linhas que se repetem no `for`?", opcoes: ["A indentação do bloco", "A palavra range escrita", "O número que vem dentro", "O ponto final da linha"], correta: 0, porque: "O bloco indentado abaixo do `for` é o que repete.", conceito: "for_range" },
      { pergunta: "O que `range(0)` faz?", opcoes: ["Dá erro de valor", "Repete para sempre", "Roda uma vez só", "Não roda nenhuma"], correta: 3, porque: "Não há valores: o bloco não roda nenhuma vez.", conceito: "for_range" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que faz `for i in range(n)` e quais valores `i` assume?", conceito: "for_range", modelo: "Repete o bloco indentado `n` vezes. A variável `i` assume 0, 1, 2... até n-1. Com `n = 0` o bloco não roda." },
  ],
  recuperacao: [
    { p: "Quantas vezes roda o bloco de `for i in range(4)`?", regex: "(4|quatro)", modelo: "4 vezes, com `i` valendo 0, 1, 2 e 3.", conceito: "for_range" },
    { p: "A partir de qual número o `range` começa a contar por padrão?", regex: "(0|zero)", modelo: "Do 0.", conceito: "for_range" },
    { p: "Por que não imprimir dados pessoais dentro de um laço?", regex: "(multipl|muitos|todos|vaza|log|registro|cada cliente)", modelo: "Porque o laço repete a exposição para todos os clientes; mostre só o necessário.", conceito: "for_range" },
  ],
});

// ---------- Aula 18: range com início, fim e passo ----------
aulas.push({
  id: "0018", modulo: 3, n: 2, slug: "range-passos", titulo: "Contando do jeito que você quer: início, fim e passo",
  resumo: "O robô precisa contar de 1 a 5, de 3 em 3 e até em contagem regressiva. Hoje você controla de onde o `range` começa, onde para e quanto anda por vez.",
  objetivos: ["Usar `range(início, fim)` e `range(início, fim, passo)`.", "Explicar que o valor final **não** entra.", "Fazer contagens regressivas com passo negativo."],
  conceitos: [["range_passos", "range com início, fim e passo"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Para contar de 2 em 2 (2, 4, 6...) ou de trás para frente (5, 4, 3, 2, 1), o que você precisaria dizer ao computador além de “repita”?", modelo: "Três informações: **de onde** começa, **onde** para e **quanto** anda a cada volta. Em Python: `range(início, fim, passo)`." },
    { tipo: "exemplo", arquivo: "contar.py", texto: "Clique em cada linha.",
      codigo: [["for n in range(1, 4):", "`range(1, 4)` começa no **1** e para **antes** do 4: gera 1, 2 e 3."], ["    print(n)", "Mostra 1, 2 e 3."], ["for n in range(10, 0, -3):", "O terceiro número é o **passo**. Com `-3`, a contagem anda para trás de 3 em 3: 10, 7, 4, 1 (o 0 não entra)."], ["    print(n)", "Mostra 10, 7, 4 e 1."]],
      termos: [["início", "o primeiro valor (se omitido, é 0)."], ["fim", "o valor em que para: ele **não** entra."], ["passo", "quanto soma a cada volta (se omitido, é 1). Pode ser negativo."]] },
    { tipo: "executar", texto: "Rode e depois mude os números do `range`.", arquivo: "contar.py (pode editar)", codigo: `for n in range(2, 11, 2):
    print(n)`,
      prever: { enunciado: "Antes de testar, qual é a **última linha** exibida?", conceito: "range_passos", itens: [{ codigo: `for n in range(2, 6):
    print(n)`, resposta: "5", porque: "O fim (6) não entra: 2, 3, 4 e 5." }, { codigo: `for n in range(0, 10, 3):
    print(n)`, resposta: "9", porque: "0, 3, 6 e 9; o próximo seria 12, que passa de 10." }, { codigo: `for n in range(5, 0, -1):
    print(n)`, resposta: "1", porque: "Contagem regressiva: 5, 4, 3, 2, 1 (o 0 não entra)." }] } },
    { tipo: "descobrir", texto: "O programa mostra os valores que o `range` gera com três configurações. (O `list(...)` só junta tudo numa lista para a gente ver de uma vez.)", arquivo: "range.py", codigo: `print(list(range(a, b, c)))`,
      execucoes: [{ prefixo: "a, b, c = 0, 5, 1", saida: ["[0, 1, 2, 3, 4]"] }, { prefixo: "a, b, c = 1, 10, 3", saida: ["[1, 4, 7]"] }, { prefixo: "a, b, c = 5, 0, -2", saida: ["[5, 3, 1]"] }], colunas: ["a, b, c", "Valores gerados"],
      pergunta: "O que são os três números do `range`? O valor `b` aparece na lista? Por quê?", dicas: ["Compare `a` com o primeiro valor de cada lista, e o passo `c` com a distância entre os valores.", "Nenhuma das listas contém o próprio `b`. O que isso diz sobre o fim?"],
      explicacao: "`a` é o **início**, `b` é o **fim** (que **não** entra) e `c` é o **passo**. O `range` anda de `c` em `c` a partir de `a` e para antes de chegar em `b`; com passo negativo, anda para trás.", conceito: "range_passos" },
    { tipo: "prever", conceito: "range_passos", itens: [
      { codigo: `soma = 0
for n in range(1, 5):
    soma = soma + n
print(soma)`, resposta: "10", porque: "1 + 2 + 3 + 4 = 10 (o 5 não entra)." },
      { codigo: `for n in range(10, 0, -5):
    print(n)`, resposta: "5", porque: "10 e 5; o próximo seria 0, que não entra." },
      { codigo: `c = 0
for n in range(1, 10, 2):
    c = c + 1
print(c)`, resposta: "5", porque: "Os valores são 1, 3, 5, 7 e 9: cinco voltas." },
      { codigo: `for n in range(3, 3):
    print("nada")
print("fim")`, resposta: "fim", porque: "Início igual ao fim: não há valores." }] },
    { tipo: "corrigir", texto: "O robô deveria mostrar os números pares de 2 a 10, mas o 10 não aparece. Conserte **um número**.", arquivo: "com_defeito.py", dica: "O valor final do `range` não entra. Para incluir o 10, o fim precisa ser maior.", conceito: "range_passos",
      codigo: `for n in range(2, 10, 2):
    print(n)`, esperado: ["2", "4", "6", "8", "10"],
      solucao: `for n in range(2, 11, 2):
    print(n)` },
    { tipo: "escrever", texto: "Faça uma contagem regressiva: peça `Início: ` (inteiro) e mostre de `n` até 1 e, no fim, `Pronto!`.", arquivo: "meu_programa.py",
      inicial: `n = int(input("Início: "))
# conte de n até 1 e termine com Pronto!
`, cenarios: [{ entradas: ["3"], esperado: ["Início: 3", "3", "2", "1", "Pronto!"] }, { entradas: ["1"], esperado: ["Início: 1", "1", "Pronto!"] }, { entradas: ["0"], esperado: ["Início: 0", "Pronto!"] }], dica: "`range(n, 0, -1)` e o `print(\"Pronto!\")` fica **fora** do laço.", conceito: "range_passos",
      solucao: `n = int(input("Início: "))
for i in range(n, 0, -1):
    print(i)
print("Pronto!")` },
    { tipo: "aberta", tag: "sec", titulo: "Números previsíveis", texto: "Um site de pedidos numera os pedidos em sequência (1, 2, 3...) e mostra a página do pedido em `/pedido/57`.", pergunta: "Que risco existe se bastar trocar o 57 por 58 na barra de endereço? Como reduzir esse risco?", modelo: "Alguém poderia **adivinhar** números e ver pedidos de outras pessoas. O sistema deve conferir se o pedido pertence a quem está logado e, de preferência, usar identificadores longos e aleatórios em vez de uma sequência fácil de prever." },
    { tipo: "quiz", itens: [
      { pergunta: "Quais valores gera `range(1, 4)`?", opcoes: ["1, 2, 3, 4 completos", "1, 2 e 3, sem o 4", "0, 1, 2 e 3 juntos", "2, 3 e 4, sem o 1"], correta: 1, porque: "O fim (4) não entra.", conceito: "range_passos" },
      { pergunta: "Qual `range` faz contagem regressiva de 5 até 1?", opcoes: ["range(1, 5, 1)", "range(5, 0, -1)", "range(5, 1, 1)", "range(0, 5, -1)"], correta: 1, porque: "Passo negativo e fim 0 (que não entra) dão 5, 4, 3, 2, 1.", conceito: "range_passos" },
      { pergunta: "No `range(0, 10, 3)`, o 3 é:", opcoes: ["o passo de cada volta", "o início da contagem", "o fim da contagem", "o número de voltas"], correta: 0, porque: "O terceiro número é o passo: 0, 3, 6, 9.", conceito: "range_passos" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que significam os três números de `range(a, b, c)`?", conceito: "range_passos", modelo: "`a` é o início, `b` é o fim (que não entra) e `c` é o passo (quanto soma a cada volta; pode ser negativo para contar para trás)." },
  ],
  recuperacao: [
    { p: "O valor final de um `range` entra na contagem?", regex: "(nao entra|nao inclui|nunca entra|fica de fora|nao e incluido|nao conta|antes do)", modelo: "Não: o `range` para antes do valor final.", conceito: "range_passos" },
    { p: "Como contar de 5 até 1?", regex: "(5, ?0, ?-1|passo negativo|-1)", modelo: "`range(5, 0, -1)`: passo negativo.", conceito: "range_passos" },
    { p: "Por que numerar pedidos 1, 2, 3 pode ser arriscado num site?", regex: "(adivinh|previs|trocar|outro pedido|outras pessoas|acesso|nao pertenc)", modelo: "Alguém pode adivinhar números e ver pedidos de outras pessoas; é preciso conferir o dono do pedido.", conceito: "range_passos" },
  ],
});

// ---------- Aula 19: acumuladores ----------
aulas.push({
  id: "0019", modulo: 3, n: 3, slug: "acumuladores", titulo: "Somando e contando: acumuladores",
  resumo: "Quanto o robô vendeu hoje? Quantos pedidos? Hoje você aprende o padrão que está por trás de totais, contagens e médias.",
  objetivos: ["Criar um acumulador antes do laço e atualizá-lo a cada volta.", "Contar ocorrências com um contador.", "Explicar por que o acumulador começa em um valor neutro (como 0)."],
  conceitos: [["acumulador", "Acumuladores: soma e contagem"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O robô quer saber quanto vendeu no dia e quantos pedidos fez. Como ele poderia ir “somando” a cada pedido? Onde guardaria o total parcial e com que valor começaria?", modelo: "Precisa de uma variável que guarde o **total até agora**, começando em **0** (o valor que não altera uma soma) e crescendo a cada pedido. Esse padrão se chama **acumulador**; para contar pedidos, o mesmo padrão com `+ 1` é um **contador**." },
    { tipo: "exemplo", arquivo: "vendas.py", texto: "A lista `[ ]` reúne valores; vamos estudá-la no Módulo 5. Por enquanto o `for` só percorre cada valor dela. Clique em cada linha.",
      codigo: [["total = 0", "O acumulador **antes** do laço, começando em 0."], ["pedidos = 0", "O contador, também começando em 0."], ["for preco in [4.5, 3.0, 4.5]:", "Percorre cada preço da lista, um por volta."], ["    total = total + preco", "Soma o preço atual ao total parcial."], ["    pedidos = pedidos + 1", "Conta mais um pedido."], ["print(\"Total:\", total)", "Depois do laço: `Total: 12.0`."], ["print(\"Pedidos:\", pedidos)", "E `Pedidos: 3`."]],
      termos: [["Acumulador", "variável que vai juntando um resultado a cada volta (soma, produto...)."], ["Contador", "acumulador que soma 1 a cada vez que algo acontece."]] },
    { tipo: "executar", texto: "Rode e depois mude os preços da lista.", arquivo: "vendas.py (pode editar)", codigo: `total = 0
for preco in [4.5, 3.0, 4.5]:
    total = total + preco
print("Total:", total)`,
      prever: { enunciado: "Antes de testar:", conceito: "acumulador", itens: [{ codigo: `soma = 0
for n in range(1, 4):
    soma = soma + n
print(soma)`, resposta: "6", porque: "1 + 2 + 3 = 6." }, { codigo: `total = 10
for n in range(3):
    total = total + 5
print(total)`, resposta: "25", porque: "Começa em 10 e soma 5 três vezes." }] } },
    { tipo: "descobrir", texto: "O programa soma uma lista de preços. A tabela mostra o resultado com três listas diferentes.", arquivo: "total.py", codigo: `total = 0
for p in precos:
    total = total + p
print(total)`,
      execucoes: [{ prefixo: "precos = [4.5, 3.0, 4.5]", saida: ["12.0"] }, { prefixo: "precos = [10]", saida: ["10"] }, { prefixo: "precos = []", saida: ["0"] }], colunas: ["Lista de preços", "Total"],
      pergunta: "Por que o `total` começa em 0? O que o programa mostra quando a lista está vazia, e por que isso é uma boa resposta?", dicas: ["O que aconteceria com a soma se `total` começasse em outro número, como 5?", "Com a lista vazia o laço não roda nenhuma vez. Qual valor sobra em `total`?"],
      explicacao: "O 0 é o valor **neutro** da soma: não altera o resultado. Com a lista vazia o laço não roda, e o programa mostra 0, que é a resposta certa para “somar nada”. Começar em outro número falsearia todos os totais.", conceito: "acumulador" },
    { tipo: "prever", conceito: "acumulador", itens: [
      { codigo: `x = 1
for i in range(3):
    x = x * 2
print(x)`, resposta: "8", porque: "Dobra três vezes: 2, 4, 8." },
      { codigo: `c = 0
for n in range(1, 8):
    if n % 2 == 0:
        c = c + 1
print(c)`, resposta: "3", porque: "Pares de 1 a 7: 2, 4 e 6." },
      { codigo: `total = 0
for n in [5, 10, 15]:
    total = total + n
print(total / 3)`, resposta: "10.0", porque: "A soma é 30, e 30 / 3 = 10.0 (a média)." }] },
    { tipo: "corrigir", texto: "A soma de 1 a 4 deveria dar 10, mas dá 4. O acumulador está no lugar errado. Conserte **mudando a posição de uma linha**.", arquivo: "com_defeito.py", dica: "O acumulador precisa nascer **uma vez**, antes do laço. Dentro do laço ele é zerado a cada volta.", conceito: "acumulador",
      codigo: `for n in range(1, 5):
    soma = 0
    soma = soma + n
print("Soma:", soma)`, esperado: ["Soma: 10"],
      solucao: `soma = 0
for n in range(1, 5):
    soma = soma + n
print("Soma:", soma)` },
    { tipo: "escrever", texto: "Peça `Venda 1: `, `Venda 2: ` e `Venda 3: ` (inteiros, usando um `for`) e mostre `Total: X`.", arquivo: "meu_programa.py",
      inicial: `total = 0
# leia três vendas com um for e some
`, cenarios: [{ entradas: ["10", "20", "30"], esperado: ["Venda 1: 10", "Venda 2: 20", "Venda 3: 30", "Total: 60"] }, { entradas: ["5", "5", "5"], esperado: ["Venda 1: 5", "Venda 2: 5", "Venda 3: 5", "Total: 15"] }, { entradas: ["0", "0", "7"], esperado: ["Venda 1: 0", "Venda 2: 0", "Venda 3: 7", "Total: 7"] }], dica: "`for i in range(3):` com `valor = int(input(f\"Venda {i + 1}: \"))` e `total = total + valor`.", conceito: "acumulador",
      solucao: `total = 0
for i in range(3):
    valor = int(input(f"Venda {i + 1}: "))
    total = total + valor
print("Total:", total)` },
    { tipo: "aberta", tag: "sec", titulo: "Totais sem nomes", texto: "Um relatório mostra quanto cada cliente gastou, com nome e CPF, e depois o total geral do dia.", pergunta: "Para saber só o total vendido no dia, esses nomes e CPFs são necessários? O que você faria?", modelo: "Não: o total do dia se calcula somando os valores, sem identificar ninguém. O relatório deveria trazer **apenas o agregado** (total e quantidade) e deixar os dados pessoais de fora, pois quanto menos dado pessoal circula, menor o dano se o relatório vazar." },
    { tipo: "quiz", itens: [
      { pergunta: "Com que valor um acumulador de soma deve começar?", opcoes: ["Com 1, o primeiro valor", "Com 10, valor redondo", "Com qualquer valor dado", "Com 0, valor neutro"], correta: 3, porque: "O 0 não altera a soma.", conceito: "acumulador" },
      { pergunta: "Onde o acumulador deve ser criado?", opcoes: ["Dentro do laço, a cada volta", "Antes do laço, uma única vez", "Depois do laço, no final", "No meio do laço, na metade"], correta: 1, porque: "Se for criado dentro do laço, é zerado a cada volta.", conceito: "acumulador" },
      { pergunta: "Qual linha conta mais um item no contador?", opcoes: ["contador = 1, fixa o valor", "contador = contador + 1, soma", "contador == 1, compara", "contador + 1 = contador, soma"], correta: 1, porque: "Pega o valor atual, soma 1 e guarda de volta no mesmo nome.", conceito: "acumulador" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que é um acumulador e onde ele deve começar?", conceito: "acumulador", modelo: "É uma variável que junta um resultado a cada volta do laço (por exemplo, o total de vendas). Ela é criada **antes** do laço, com um valor neutro (0 para somar), e atualizada dentro dele." },
  ],
  recuperacao: [
    { p: "Para que serve um acumulador?", regex: "(total|soma|junt|acumul|resultado);;(volta|laco|a cada|repet)", modelo: "Para juntar um resultado (como um total) a cada volta do laço.", conceito: "acumulador" },
    { p: "Por que a soma começa em 0 e não em outro número?", regex: "(neutro|nao altera|nao muda|comeca do zero|nada somado|falsea)", modelo: "Porque o 0 não altera a soma; outro valor deturparia o total.", conceito: "acumulador" },
    { p: "Por que o acumulador não pode ser criado dentro do laço?", regex: "(zera|reinicia|volta a zero|toda volta|cada volta|perde)", modelo: "Porque seria zerado a cada volta e perderia o total anterior.", conceito: "acumulador" },
  ],
});

// ---------- Aula 20: while ----------
aulas.push({
  id: "0020", modulo: 3, n: 4, slug: "while", titulo: "Repetir até acontecer: o while",
  resumo: "E quando não sabemos quantas voltas serão necessárias, como esperar a água ferver? O `while` repete enquanto uma condição for verdadeira.",
  objetivos: ["Escrever um `while` com condição e bloco.", "Garantir que algo dentro do laço muda a condição.", "Reconhecer e explicar um laço sem fim."],
  conceitos: [["while_laco", "Repetir enquanto: o while"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O robô precisa esperar a água ferver, mas não sabe quanto tempo leva. O `for` repete um número conhecido de vezes. Como você diria “repita até que a água esteja quente”?", modelo: "“**Enquanto** a água não estiver quente, continue esquentando.” A repetição depende de uma **condição**, não de uma contagem. Em Python, isso é o `while`." },
    { tipo: "exemplo", arquivo: "esquentar.py", texto: "Clique em cada linha.",
      codigo: [["temperatura = 20", "A água começa em 20 graus."], ["while temperatura < 90:", "**`while`** significa “enquanto”. O bloco repete **enquanto** a condição for verdadeira, e a condição é conferida **antes de cada volta**."], ["    temperatura = temperatura + 30", "**Atenção:** algo dentro do bloco precisa mudar a condição. Se a temperatura nunca mudasse, o laço nunca terminaria."], ["    print(\"Esquentando:\", temperatura)", "Mostra 50, 80 e 110."], ["print(\"Pronta!\")", "Depois que a condição fica falsa (110 não é menor que 90), o programa segue."]],
      termos: [["while", "repete o bloco enquanto a condição for verdadeira."], ["Laço sem fim", "um `while` cuja condição nunca fica falsa: o programa nunca termina."]] },
    { tipo: "executar", texto: "Rode e depois troque o 30 por 40.", arquivo: "esquentar.py (pode editar)", codigo: `temperatura = 20
while temperatura < 90:
    temperatura = temperatura + 30
    print("Esquentando:", temperatura)
print("Pronta!")`,
      prever: { enunciado: "Antes de testar, o que aparece como **última linha**?", conceito: "while_laco", itens: [{ codigo: `n = 1
while n < 20:
    n = n * 2
print(n)`, resposta: "32", porque: "1, 2, 4, 8, 16 (ainda menor que 20), 32 (para)." }, { codigo: `c = 0
while c < 3:
    c = c + 1
print(c)`, resposta: "3", porque: "Sobe até 3 e para." }] } },
    { tipo: "executar", titulo: "O laço sem fim (e o vigia do robô)", texto: "Este laço **nunca termina**: `n` só cresce e a condição `n > 0` fica sempre verdadeira. Rode e veja o robô parar sozinho depois de um tempo, avisando o motivo.", arquivo: "sem_fim.py (pode editar)", erroEsperado: "RuntimeError", codigo: `n = 1
while n > 0:
    n = n + 1` },
    { tipo: "descobrir", texto: "O programa soma 3 enquanto `n` for menor que 10. Veja com três valores iniciais.", arquivo: "laco.py", codigo: `while n < 10:
    n = n + 3
    print(n)`,
      execucoes: [{ prefixo: "n = 0", saida: ["3", "6", "9", "12"] }, { prefixo: "n = 9", saida: ["12"] }, { prefixo: "n = 20", saida: [] }], colunas: ["Valor inicial de n", "O que aparece"],
      pergunta: "Quantas vezes o bloco roda em cada caso? O que acontece quando a condição já começa falsa? O que impede o laço de rodar para sempre?", dicas: ["Conte as linhas em cada caso. Com `n = 20`, a condição `n < 10` é verdadeira?", "Dentro do bloco, o que acontece com `n` a cada volta?"],
      explicacao: "A condição é conferida **antes** de cada volta: se já começa falsa (como com `n = 20`), o bloco não roda nenhuma vez. O que impede o laço de ser eterno é a linha `n = n + 3`, que **muda `n`** até a condição ficar falsa.", conceito: "while_laco" },
    { tipo: "prever", conceito: "while_laco", itens: [
      { codigo: `x = 10
while x > 0:
    x = x - 4
print(x)`, resposta: "-2", porque: "10, 6, 2 e depois -2 (a condição `x > 0` fica falsa)." },
      { codigo: `n = 5
while n < 5:
    print("nunca")
print("fim")`, resposta: "fim", porque: "A condição já começa falsa: o bloco não roda." },
      { codigo: `soma = 0
n = 1
while n <= 4:
    soma = soma + n
    n = n + 1
print(soma)`, resposta: "10", porque: "1 + 2 + 3 + 4 = 10." }] },
    { tipo: "corrigir", texto: "A contagem regressiva deveria mostrar 3, 2, 1, mas também mostra 0. Conserte **um símbolo**.", arquivo: "com_defeito.py", dica: "Queremos continuar enquanto `n` for **maior que** 0, sem incluir o 0.", conceito: "while_laco",
      codigo: `n = 3
while n >= 0:
    print(n)
    n = n - 1`, esperado: ["3", "2", "1"],
      solucao: `n = 3
while n > 0:
    print(n)
    n = n - 1` },
    { tipo: "escrever", texto: "Peça `Valor inicial: ` (inteiro). Enquanto o valor for **até 100**, dobre-o e mostre cada resultado.", arquivo: "meu_programa.py",
      inicial: `n = int(input("Valor inicial: "))
# dobre enquanto n for menor ou igual a 100
`, cenarios: [{ entradas: ["1"], esperado: ["Valor inicial: 1", "2", "4", "8", "16", "32", "64", "128"] }, { entradas: ["50"], esperado: ["Valor inicial: 50", "100", "200"] }, { entradas: ["200"], esperado: ["Valor inicial: 200"] }], dica: "`while n <= 100:` com `n = n * 2` e `print(n)` dentro do bloco.", conceito: "while_laco",
      solucao: `n = int(input("Valor inicial: "))
while n <= 100:
    n = n * 2
    print(n)` },
    { tipo: "aberta", tag: "sec", titulo: "Quando ninguém manda o fim", texto: "Um servidor lê mensagens num `while` que só para quando chega a mensagem “fim”. Um atacante conecta e simplesmente nunca envia o “fim”.", pergunta: "O que acontece com o servidor? Que proteção você colocaria?", modelo: "O servidor fica preso para sempre, gastando recursos, e pode deixar de atender outros clientes (negação de serviço). A proteção é sempre ter um **limite** (de tempo, de tamanho ou de tentativas) além da condição de parada normal." },
    { tipo: "quiz", itens: [
      { pergunta: "Quando o `while` para de repetir?", opcoes: ["Quando a condição fica falsa", "Quando a condição fica verdadeira", "Depois de exatamente 10 voltas", "Quando o bloco chega ao fim"], correta: 0, porque: "O `while` repete enquanto a condição for verdadeira.", conceito: "while_laco" },
      { pergunta: "O que causa um laço sem fim?", opcoes: ["Usar range com 0", "Nada mudar a condição", "Usar if dentro do while", "Escrever o código longo"], correta: 1, porque: "Se nada dentro do bloco muda a condição, ela fica verdadeira para sempre.", conceito: "while_laco" },
      { pergunta: "Se a condição do `while` já começa falsa, o bloco roda:", opcoes: ["uma única vez, no mínimo", "duas vezes, por precaução", "para sempre, sem parar", "nenhuma vez, é pulado"], correta: 3, porque: "A condição é conferida antes de cada volta, inclusive a primeira.", conceito: "while_laco" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: quando usar `while` em vez de `for`, e qual o cuidado principal?", conceito: "while_laco", modelo: "Use `while` quando não se sabe quantas voltas serão necessárias e a repetição depende de uma condição. O cuidado é garantir que algo dentro do bloco **muda a condição**, senão o laço nunca termina." },
  ],
  recuperacao: [
    { p: "Quando o `while` para?", regex: "(condicao|enquanto);;(falsa|false|deixa de|nao for mais)", modelo: "Quando a condição fica falsa.", conceito: "while_laco" },
    { p: "O que é um laço sem fim e o que o causa?", regex: "(nunca|sempre|para sempre|infinit|eterno);;(condicao|muda|atualiza)", modelo: "Um `while` que nunca termina porque nada dentro dele muda a condição.", conceito: "while_laco" },
    { p: "Por que um laço de leitura de mensagens precisa de um limite?", regex: "(nunca|trava|recurso|negacao|atacante|infinit|preso)", modelo: "Se a condição de parada nunca chegar, o laço prende o sistema e gasta recursos; um limite protege.", conceito: "while_laco" },
  ],
});

// ---------- Aula 21: break e continue ----------
aulas.push({
  id: "0021", modulo: 3, n: 5, slug: "break-continue", titulo: "Parar e pular: break e continue",
  resumo: "Às vezes o robô precisa abandonar o laço assim que acha o que procura, ou pular uma volta sem parar tudo. Hoje você conhece as duas ferramentas.",
  objetivos: ["Usar `break` para sair de um laço.", "Usar `continue` para pular para a próxima volta.", "Escolher entre `break` e `continue`."],
  conceitos: [["break_continue", "break e continue"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O robô confere xícaras numa bandeja. Quando achar uma rachada, deve **parar a conferência**. Já se achar uma xícara suja, só deve **pular essa** e seguir com as outras. Como você descreveria essa diferença?", modelo: "São dois comandos diferentes: **sair do laço de vez** (`break`) e **pular só esta volta** (`continue`). O primeiro encerra a repetição; o segundo volta direto ao começo do bloco para a próxima volta." },
    { tipo: "exemplo", arquivo: "parar_pular.py", texto: "Clique em cada linha.",
      codigo: [["for n in range(1, 10):", "Percorre de 1 a 9."], ["    if n == 4:", "Quando chegar no 4..."], ["        break", "**`break`**: sai do laço **agora**. As voltas que faltavam não acontecem."], ["    print(n)", "Mostra 1, 2 e 3."], ["for n in range(1, 6):", "Outro laço, de 1 a 5."], ["    if n == 3:", "Quando chegar no 3..."], ["        continue", "**`continue`**: pula o resto **desta volta** e vai para a próxima."], ["    print(n)", "Mostra 1, 2, 4 e 5 (o 3 foi pulado)."]],
      termos: [["break", "encerra o laço imediatamente."], ["continue", "pula o resto desta volta e segue para a próxima."]] },
    { tipo: "executar", texto: "Rode e depois troque `break` por `continue` no primeiro laço.", arquivo: "parar_pular.py (pode editar)", codigo: `for n in range(1, 10):
    if n == 4:
        break
    print(n)`,
      prever: { enunciado: "Antes de testar, qual é a **última linha** exibida?", conceito: "break_continue", itens: [{ codigo: `for n in range(1, 6):
    if n == 3:
        continue
    print(n)`, resposta: "5", porque: "O 3 é pulado; os mostrados são 1, 2, 4 e 5." }, { codigo: `for n in range(3):
    if n == 1:
        continue
    print(n)`, resposta: "2", porque: "Mostra 0 e 2 (o 1 é pulado)." }] } },
    { tipo: "descobrir", texto: "O laço para quando encontra o valor `alvo`.", arquivo: "procurar.py", codigo: `for n in range(1, 6):
    if n == alvo:
        break
    print(n)`,
      execucoes: [{ prefixo: "alvo = 3", saida: ["1", "2"] }, { prefixo: "alvo = 1", saida: [] }, { prefixo: "alvo = 9", saida: ["1", "2", "3", "4", "5"] }], colunas: ["Valor de alvo", "O que aparece"],
      pergunta: "O que o `break` faz? O alvo é mostrado? E o que acontece quando o alvo nunca aparece (como 9)?", dicas: ["Em `alvo = 3`, o 3 aparece na lista de saída?", "Com `alvo = 9`, a condição do `if` chega a ser verdadeira?"],
      explicacao: "O `break` sai do laço no momento em que a condição é verdadeira; como ele vem **antes** do `print`, o alvo nem é mostrado. Quando o alvo nunca aparece (9), o `break` nunca roda e o laço percorre tudo.", conceito: "break_continue" },
    { tipo: "prever", conceito: "break_continue", itens: [
      { codigo: `soma = 0
for n in range(1, 10):
    if n > 4:
        break
    soma = soma + n
print(soma)`, resposta: "10", porque: "Soma 1, 2, 3 e 4; no 5 o `break` encerra o laço." },
      { codigo: `c = 0
for n in range(1, 7):
    if n % 2 == 0:
        continue
    c = c + 1
print(c)`, resposta: "3", porque: "Os pares são pulados; contam só 1, 3 e 5." },
      { codigo: `for n in range(5):
    if n == 2:
        break
print(n)`, resposta: "2", porque: "O laço parou com `n` valendo 2, e a variável mantém esse valor." }] },
    { tipo: "corrigir", texto: "Queríamos mostrar 1, 2, 4 e 5 (pulando só o 3), mas o laço está parando no 3. Conserte **uma palavra**.", arquivo: "com_defeito.py", dica: "Você quer **pular só esta volta**, não encerrar o laço.", conceito: "break_continue",
      codigo: `for n in range(1, 6):
    if n == 3:
        break
    print(n)`, esperado: ["1", "2", "4", "5"],
      solucao: `for n in range(1, 6):
    if n == 3:
        continue
    print(n)` },
    { tipo: "escrever", texto: "Peça `Início: ` (inteiro) e procure o **primeiro múltiplo de 7** de `Início` até 50. Mostre `Achei: N` e pare; se não houver nenhum, mostre `Não achei`.", arquivo: "meu_programa.py",
      inicial: `inicio = int(input("Início: "))
# procure o primeiro múltiplo de 7 entre inicio e 50
`, cenarios: [{ entradas: ["20"], esperado: ["Início: 20", "Achei: 21"] }, { entradas: ["30"], esperado: ["Início: 30", "Achei: 35"] }, { entradas: ["44"], esperado: ["Início: 44", "Achei: 49"] }, { entradas: ["50"], esperado: ["Início: 50", "Não achei"] }], dica: "Use um `for n in range(inicio, 51):`, um `if n % 7 == 0:` com `break`, e uma variável `achou` que começa `False`.", conceito: "break_continue",
      solucao: `inicio = int(input("Início: "))
achou = False
for n in range(inicio, 51):
    if n % 7 == 0:
        print("Achei:", n)
        achou = True
        break
if not achou:
    print("Não achei")` },
    { tipo: "aberta", tag: "sec", titulo: "Pular sem deixar rastro", texto: "Um processamento em lote usa `continue` para pular pedidos inválidos e seguir com os outros, sem registrar nada.", pergunta: "Qual é o risco de pular em silêncio? O que seria melhor?", modelo: "Pedidos inválidos podem indicar **erro ou fraude** e ninguém ficaria sabendo. O melhor é **registrar** o que foi pulado (sem dados pessoais desnecessários) e, se for muito, avisar alguém. Pular é aceitável; pular **em silêncio** esconde problemas." },
    { tipo: "quiz", itens: [
      { pergunta: "O que o `break` faz?", opcoes: ["Pula só a volta atual", "Encerra o laço agora", "Reinicia o laço todo", "Mostra o valor atual"], correta: 1, porque: "`break` sai do laço imediatamente.", conceito: "break_continue" },
      { pergunta: "O que o `continue` faz?", opcoes: ["Encerra o laço agora", "Repete a mesma volta", "Pula para a próxima", "Para o programa todo"], correta: 2, porque: "`continue` abandona o resto desta volta e segue para a próxima.", conceito: "break_continue" },
      { pergunta: "Para ignorar só os valores pares num laço, use:", opcoes: ["continue, em cada par", "break, ao ver um par", "while, com o par", "range, com o par"], correta: 0, porque: "`continue` pula a volta dos pares e segue com as outras.", conceito: "break_continue" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: qual a diferença entre `break` e `continue`?", conceito: "break_continue", modelo: "`break` encerra o laço de vez; `continue` só pula o resto da volta atual e segue para a próxima volta." },
  ],
  recuperacao: [
    { p: "O que o `break` faz?", regex: "(para|encerra|sai|interrompe|termina);;(laco|repeticao|loop)?", modelo: "Encerra o laço imediatamente.", conceito: "break_continue" },
    { p: "O que o `continue` faz?", regex: "(pula|ignora|vai para a proxima|proxima volta|resto da volta)", modelo: "Pula o resto da volta atual e vai para a próxima.", conceito: "break_continue" },
    { p: "Por que não pular itens inválidos em silêncio?", regex: "(fraude|erro|registr|log|avis|esconde|ninguem|saber)", modelo: "Porque erros ou fraudes passam despercebidos; é melhor registrar o que foi pulado.", conceito: "break_continue" },
  ],
});

// ---------- Aula 22: laço de validação ----------
aulas.push({
  id: "0022", modulo: 3, n: 6, slug: "perguntar-ate-acertar", titulo: "Perguntar até acertar: laços de validação",
  resumo: "Na aula de decisões o robô validava uma vez e avisava. Agora ele insiste, em um laço, até a pessoa responder direito.",
  objetivos: ["Usar `while` para repetir uma pergunta até a resposta ser válida.", "Entender por que a leitura aparece antes e dentro do laço.", "Perceber o risco de um laço de tentativas sem limite."],
  conceitos: [["laco_validacao", "Perguntar até a entrada ser válida"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Na aula de validação, o programa conferia a resposta uma vez e avisava. Como ele poderia insistir até a pessoa digitar certo? O que precisa se repetir?", modelo: "Precisa **repetir a pergunta** enquanto a resposta for inválida. Isso junta o que você já sabe: um `while` cuja condição é “a resposta ainda não serve”." },
    { tipo: "exemplo", arquivo: "insistir.py", entradas: ["abc", "0", "3"], texto: "Clique em cada linha. O `len(texto)` que você verá em outro exemplo conta quantos caracteres o texto tem.",
      codigo: [["qtd_texto = input(\"Quantos cafés (1 a 10)? \")", "A **primeira** leitura: precisa existir antes de o `while` conferir pela primeira vez."], ["while not qtd_texto.isdigit() or int(qtd_texto) < 1 or int(qtd_texto) > 10:", "Enquanto a resposta for inválida: não é número, **ou** é menor que 1, **ou** maior que 10. O `or` para na primeira verdadeira, então o `int` só roda com texto numérico."], ["    print(\"Valor inválido\")", "Avisa."], ["    qtd_texto = input(\"Quantos cafés (1 a 10)? \")", "A **leitura dentro do laço**: pergunta de novo. Sem ela, a condição nunca mudaria."], ["print(\"Anotado:\", int(qtd_texto))", "Só chega aqui com uma resposta válida."]],
      termos: [["Laço de validação", "um `while` que repete a pergunta enquanto a resposta for inválida."]] },
    { tipo: "executar", texto: "Rode com as entradas da caixa (`abc`, `0`, `3`) e depois mude a ordem ou os valores.", arquivo: "insistir.py (pode editar)", entradas: ["abc", "0", "3"], codigo: `qtd_texto = input("Quantos cafés (1 a 10)? ")
while not qtd_texto.isdigit() or int(qtd_texto) < 1 or int(qtd_texto) > 10:
    print("Valor inválido")
    qtd_texto = input("Quantos cafés (1 a 10)? ")
print("Anotado:", int(qtd_texto))`,
      prever: { enunciado: "Antes de testar, qual é a **última linha** exibida em cada caso?", conceito: "laco_validacao", itens: [{ codigo: `qtd_texto = input("Quantos cafés (1 a 10)? ")
while not qtd_texto.isdigit() or int(qtd_texto) < 1 or int(qtd_texto) > 10:
    print("Valor inválido")
    qtd_texto = input("Quantos cafés (1 a 10)? ")
print("Anotado:", int(qtd_texto))`, entradas: ["x", "5"], resposta: "Anotado: 5", porque: "“x” é inválido; o laço pergunta de novo e “5” serve." }, { codigo: `qtd_texto = input("Quantos cafés (1 a 10)? ")
while not qtd_texto.isdigit() or int(qtd_texto) < 1 or int(qtd_texto) > 10:
    print("Valor inválido")
    qtd_texto = input("Quantos cafés (1 a 10)? ")
print("Anotado:", int(qtd_texto))`, entradas: ["0", "11", "10"], resposta: "Anotado: 10", porque: "0 e 11 estão fora de 1 a 10; o 10 está na borda e vale." }] } },
    { tipo: "descobrir", texto: "O programa repete até a pessoa digitar `ok`.", arquivo: "esperar_ok.py", codigo: `n = input()
while n != "ok":
    print("de novo")
    n = input()
print("fim")`,
      execucoes: [{ entradas: ["ok"], saida: ["ok", "fim"] }, { entradas: ["a", "ok"], saida: ["a", "de novo", "ok", "fim"] }, { entradas: ["a", "b", "ok"], saida: ["a", "de novo", "b", "de novo", "ok", "fim"] }],
      pergunta: "De quê depende quantas vezes “de novo” aparece? Por que `n = input()` aparece **duas vezes** (antes e dentro do laço)?", dicas: ["Compare o número de entradas diferentes de “ok” com o número de “de novo”.", "O que aconteceria se a leitura de dentro do laço fosse apagada?"],
      explicacao: "“de novo” aparece **uma vez para cada resposta diferente de “ok”**. A primeira leitura (fora) dá o valor inicial para o `while` conferir; a de dentro **atualiza** `n` a cada volta. Sem ela, `n` nunca mudaria e o laço não terminaria.", conceito: "laco_validacao" },
    { tipo: "prever", conceito: "laco_validacao", itens: [
      { codigo: `s = input()
while s != "sim":
    s = input()
print("aceito")`, entradas: ["nao", "talvez", "sim"], resposta: "aceito", porque: "Só sai do laço quando digitar “sim”." },
      { codigo: `n = int(input())
while n < 0:
    print("negativo")
    n = int(input())
print(n)`, entradas: ["-3", "-1", "4"], resposta: "4", porque: "Os dois negativos são recusados; o 4 passa." },
      { codigo: `s = input()
while s == "":
    s = input()
print(len(s))`, entradas: ["", "", "café"], resposta: "4", porque: "Os dois vazios são recusados; “café” tem 4 letras (`len` conta os caracteres)." }] },
    { tipo: "corrigir", texto: "A senha precisa ter **pelo menos 6** caracteres, mas o programa aceita a curta e trava na longa. Conserte **um símbolo**.", arquivo: "com_defeito.py", dica: "O laço deve repetir enquanto a senha for **curta** (`len` menor que 6).", conceito: "laco_validacao",
      codigo: `senha = input("Senha: ")
while len(senha) > 6:
    print("Muito curta")
    senha = input("Senha: ")
print("Aceita")`, cenarios: [{ entradas: ["abc", "abcdef"], esperado: ["Senha: abc", "Muito curta", "Senha: abcdef", "Aceita"] }, { entradas: ["abcdefgh"], esperado: ["Senha: abcdefgh", "Aceita"] }],
      solucao: `senha = input("Senha: ")
while len(senha) < 6:
    print("Muito curta")
    senha = input("Senha: ")
print("Aceita")` },
    { tipo: "escrever", texto: "Peça `PIN: ` até a pessoa digitar **exatamente 4 dígitos** (só números). A cada erro mostre `PIN inválido`. No fim, mostre `PIN aceito`.", arquivo: "meu_programa.py",
      inicial: `pin = input("PIN: ")
# repita enquanto o PIN não tiver 4 dígitos
`, cenarios: [{ entradas: ["1234"], esperado: ["PIN: 1234", "PIN aceito"] }, { entradas: ["12", "abcd", "1234"], esperado: ["PIN: 12", "PIN inválido", "PIN: abcd", "PIN inválido", "PIN: 1234", "PIN aceito"] }, { entradas: ["12345", "0007"], esperado: ["PIN: 12345", "PIN inválido", "PIN: 0007", "PIN aceito"] }], dica: "`while not (pin.isdigit() and len(pin) == 4):` e a leitura de novo dentro do laço.", conceito: "laco_validacao",
      solucao: `pin = input("PIN: ")
while not (pin.isdigit() and len(pin) == 4):
    print("PIN inválido")
    pin = input("PIN: ")
print("PIN aceito")` },
    { tipo: "aberta", tag: "sec", titulo: "Insistir sem limite", texto: "O laço do PIN pergunta **sem parar** até a pessoa acertar um PIN de 4 dígitos.", pergunta: "Por que isso é perigoso num sistema de segurança? Como você limitaria as tentativas com o que já aprendeu?", conceito: "laco_validacao", modelo: "Um PIN de 4 dígitos tem só 10.000 combinações: sem limite, um programa tenta todas rapidamente. Use um **contador** de tentativas (um acumulador!) e um `break` ou bloqueio depois de, por exemplo, 3 erros." },
    { tipo: "quiz", itens: [
      { pergunta: "Por que a pergunta aparece também dentro do laço?", opcoes: ["Para atualizar a resposta", "Para o código ficar longo", "Para o laço rodar sempre", "Para o Python não reclamar"], correta: 0, porque: "Sem reler, a condição nunca mudaria e o laço não terminaria.", conceito: "laco_validacao" },
      { pergunta: "O `while` de validação repete enquanto a resposta for:", opcoes: ["válida, aceita pelo programa", "inválida, ainda não aceita", "vazia, sem nada dentro", "numérica, feita só de dígitos"], correta: 1, porque: "Repete a pergunta enquanto a resposta ainda não serve.", conceito: "laco_validacao" },
      { pergunta: "O que `len(\"café\")` devolve?", opcoes: ["3, as letras sem acento", "5, contando o espaço", "4, os caracteres", "1, a palavra inteira"], correta: 2, porque: "`len` conta os caracteres: c, a, f, é.", conceito: "laco_validacao" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como funciona um laço que pergunta até acertar, e que risco ele tem se não tiver limite?", conceito: "laco_validacao", modelo: "Lê a resposta antes do laço e de novo dentro dele, repetindo enquanto ela for inválida. Sem limite de tentativas, serve para testar combinações até acertar (força bruta); por isso se usa um contador e um bloqueio." },
  ],
  recuperacao: [
    { p: "Por que a leitura (`input`) aparece antes do laço e dentro dele?", regex: "(primeira|inicial|antes);;(dentro|atualiz|de novo|muda)", modelo: "A de fora dá o valor para a primeira conferência; a de dentro atualiza a resposta a cada volta.", conceito: "laco_validacao" },
    { p: "O laço de validação repete enquanto a resposta for válida ou inválida?", regex: "(invalid)", modelo: "Enquanto for inválida.", conceito: "laco_validacao" },
    { p: "Como limitar as tentativas de um PIN?", regex: "(contador|conta as|numero de tentativas|limite);;(bloque|break|para|sai|encerr)?", modelo: "Com um contador de tentativas e um bloqueio ou `break` depois de poucos erros.", conceito: "laco_validacao" },
  ],
});

// ---------- Aula 23: padrões ----------
aulas.push({
  id: "0023", modulo: 3, n: 7, slug: "padroes", titulo: "Padrões de laço: maior, menor e contagem",
  resumo: "Achar a maior venda, a menor temperatura e quantos itens passam de um valor são problemas que aparecem o tempo todo e se resolvem com o mesmo desenho.",
  objetivos: ["Encontrar o maior ou o menor valor com um laço.", "Contar só os itens que atendem a uma condição.", "Escolher bem o valor inicial e pensar em casos de borda."],
  conceitos: [["padroes_lacos", "Padrões: maior, menor e contagem condicional"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Numa lista de vendas do dia, como o robô descobriria a **maior** venda? E quantas vendas passaram de R$ 5? Pense em como você faria olhando um papel com os valores.", modelo: "Você guarda “a maior vista até agora” e, para cada valor novo, troca se ele for maior. Para contar, soma 1 a um contador só quando o valor passa de 5. Os dois são **laços com uma decisão dentro**." },
    { tipo: "exemplo", arquivo: "padroes.py", texto: "Clique em cada linha.",
      codigo: [["vendas = [4.5, 12.0, 3.0, 9.5]", "Uma lista com as vendas do dia."], ["maior = 0", "“A maior vista até agora”: começa em 0."], ["contagem = 0", "Um contador condicional."], ["for v in vendas:", "Percorre cada venda."], ["    if v > maior:", "Achou uma venda maior que a maior vista?"], ["        maior = v", "Então ela passa a ser a maior."], ["    if v > 5:", "Esta venda passou de 5?"], ["        contagem = contagem + 1", "Então conta mais uma."], ["print(\"Maior:\", maior)", "`Maior: 12.0`."], ["print(\"Acima de 5:\", contagem)", "`Acima de 5: 3`."]],
      termos: [["Contador condicional", "um contador que só soma quando uma condição é verdadeira."]] },
    { tipo: "executar", texto: "Rode e troque valores da lista.", arquivo: "padroes.py (pode editar)", codigo: `maior = 0
for n in [3, 9, 2, 7]:
    if n > maior:
        maior = n
print(maior)`,
      prever: { enunciado: "Antes de testar:", conceito: "padroes_lacos", itens: [{ codigo: `c = 0
for n in [3, 9, 2, 7]:
    if n % 2 == 1:
        c = c + 1
print(c)`, resposta: "3", porque: "Ímpares: 3, 9 e 7." }, { codigo: `menor = 999
for n in [3, 9, 2, 7]:
    if n < menor:
        menor = n
print(menor)`, resposta: "2", porque: "A cada valor menor que o menor visto, atualiza: termina em 2." }] } },
    { tipo: "descobrir", texto: "O programa procura o maior valor, começando com `maior = 0`.", arquivo: "maior.py", codigo: `maior = 0
for n in lista:
    if n > maior:
        maior = n
print(maior)`,
      execucoes: [{ prefixo: "lista = [3, 9, 2]", saida: ["9"] }, { prefixo: "lista = [-5, -2]", saida: ["0"] }, { prefixo: "lista = []", saida: ["0"] }], colunas: ["Lista", "Maior encontrado"],
      pergunta: "Por que a lista `[-5, -2]` devolveu 0, que nem está na lista? O que você mudaria no valor inicial para o resultado ficar certo?", dicas: ["Algum dos números da lista é maior que 0?", "E se o valor inicial fosse um número muito menor que qualquer valor possível, ou o primeiro valor da lista?"],
      explicacao: "Como nenhum valor é maior que o 0 inicial, o 0 “vence” sem estar na lista: o valor inicial **influencia o resultado** nos casos de borda (aqui, só números negativos). Comece com o **primeiro valor da lista** (ou com um número menor que qualquer valor possível).", conceito: "padroes_lacos" },
    { tipo: "prever", conceito: "padroes_lacos", itens: [
      { codigo: `soma_pares = 0
for n in range(1, 7):
    if n % 2 == 0:
        soma_pares = soma_pares + n
print(soma_pares)`, resposta: "12", porque: "2 + 4 + 6 = 12." },
      { codigo: `contagem = 0
for n in [10, 20, 30, 40]:
    if n >= 30:
        contagem = contagem + 1
print(contagem)`, resposta: "2", porque: "30 e 40 são pelo menos 30." },
      { codigo: `maior = -999
for n in [-5, -2, -9]:
    if n > maior:
        maior = n
print(maior)`, resposta: "-2", porque: "Com um valor inicial muito baixo, o maior dos negativos aparece certo." }] },
    { tipo: "corrigir", texto: "A menor temperatura do dia deveria ser 8, mas o programa mostra 0. Conserte **o valor inicial**.", arquivo: "com_defeito.py", dica: "O valor inicial do “menor” precisa ser maior que qualquer temperatura possível.", conceito: "padroes_lacos",
      codigo: `menor = 0
for t in [12, 8, 15]:
    if t < menor:
        menor = t
print("Menor:", menor)`, esperado: ["Menor: 8"],
      solucao: `menor = 999
for t in [12, 8, 15]:
    if t < menor:
        menor = t
print("Menor:", menor)` },
    { tipo: "escrever", texto: "Peça `Quantas idades? ` e depois essa quantidade de `Idade: `. Mostre `Maiores de idade: X` (18 ou mais) e `Mais velha: Y`.", arquivo: "meu_programa.py",
      inicial: `n = int(input("Quantas idades? "))
# leia as idades; conte as de 18 ou mais e ache a maior
`, cenarios: [{ entradas: ["3", "17", "18", "40"], esperado: ["Quantas idades? 3", "Idade: 17", "Idade: 18", "Idade: 40", "Maiores de idade: 2", "Mais velha: 40"] }, { entradas: ["1", "10"], esperado: ["Quantas idades? 1", "Idade: 10", "Maiores de idade: 0", "Mais velha: 10"] }, { entradas: ["4", "30", "25", "18", "18"], esperado: ["Quantas idades? 4", "Idade: 30", "Idade: 25", "Idade: 18", "Idade: 18", "Maiores de idade: 4", "Mais velha: 30"] }], dica: "Dois `if` dentro do `for`: um para contar `idade >= 18` e outro para atualizar `mais_velha`.", conceito: ["padroes_lacos", "acumulador"],
      solucao: `n = int(input("Quantas idades? "))
maiores = 0
mais_velha = 0
for i in range(n):
    idade = int(input("Idade: "))
    if idade >= 18:
        maiores = maiores + 1
    if idade > mais_velha:
        mais_velha = idade
print("Maiores de idade:", maiores)
print("Mais velha:", mais_velha)` },
    { tipo: "aberta", tag: "sec", titulo: "Estatística sem expor pessoas", texto: "O programa de idades poderia mostrar “Mais velha: 40” ou “Mais velha: Maria Souza, CPF ..., 40 anos”.", pergunta: "Qual versão é melhor para um relatório e por quê? O que você perde com a primeira?", modelo: "A primeira: o relatório responde à pergunta (qual é a maior idade) **sem expor uma pessoa identificável**. O que se perde é poder localizar quem é; se isso for realmente necessário, deve ser uma consulta controlada, com permissão, e não um relatório aberto." },
    { tipo: "quiz", itens: [
      { pergunta: "Para achar o maior valor, o que se faz a cada volta?", opcoes: ["Soma o valor ao total", "Troca se for maior", "Zera o maior visto", "Conta mais um item"], correta: 1, porque: "Compara com o maior visto até agora e atualiza se o novo for maior.", conceito: "padroes_lacos" },
      { pergunta: "Um contador condicional soma 1:", opcoes: ["só quando a condição vale", "a cada volta do laço", "só na primeira volta", "só na última volta"], correta: 0, porque: "O `if` dentro do laço faz o contador crescer apenas nos casos certos.", conceito: "padroes_lacos" },
      { pergunta: "Por que `maior = 0` falha com só números negativos?", opcoes: ["Porque o 0 é texto", "Porque o laço não roda", "Porque dá erro de tipo", "Porque o 0 vence sozinho"], correta: 3, porque: "Nenhum negativo é maior que 0: o valor inicial acaba sendo o resultado.", conceito: "padroes_lacos" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como você acha o menor valor de uma lista com um laço e que cuidado tem com o valor inicial?", conceito: "padroes_lacos", modelo: "Guarda “o menor visto até agora” e, para cada valor, atualiza se ele for menor. O valor inicial precisa ser maior que qualquer valor possível (ou o primeiro valor da lista), senão ele mesmo pode virar o resultado errado." },
  ],
  recuperacao: [
    { p: "Como achar o maior valor de uma lista com um laço?", regex: "(maior|guarda);;(troca|atualiz|compara|substitu)", modelo: "Guarda o maior visto e, a cada valor, atualiza se o novo for maior.", conceito: "padroes_lacos" },
    { p: "O que é um contador condicional?", regex: "(so soma|so conta|somente|apenas|quando);;(condicao|if|se )", modelo: "Um contador que só soma 1 quando uma condição é verdadeira.", conceito: "padroes_lacos" },
    { p: "Por que o valor inicial do “maior” pode dar resultado errado?", regex: "(negativ|nenhum|vence|inicial|nao esta na lista|zero)", modelo: "Porque, se nenhum valor superar o inicial (por exemplo, só negativos), o próprio inicial vira o resultado.", conceito: "padroes_lacos" },
  ],
});

// ---------- Aula 24: mini-projeto ----------
aulas.push({
  id: "0024", modulo: 3, n: 8, slug: "mini-projeto", titulo: "Mini-projeto: organizando a semana",
  resumo: "Juntar tudo: repetir, somar, contar e achar o maior. Você organiza as horas de estudo da semana e, depois, o caixa de uma cafeteria.",
  minutos: 40,
  objetivos: ["Combinar `for`, acumuladores e padrões de laço num programa só.", "Resolver o exercício final sem usar a dica.", "Aplicar o mesmo raciocínio com um `while` num problema novo (o caixa)."],
  conceitos: [],
  secoes: [
    { tipo: "aquecimento", titulo: "Planeje antes de escrever", pergunta: "Para organizar as horas de estudo da semana, o programa deve perguntar quantos dias, ler as horas de cada dia e mostrar total, média, dias com mais de 3 horas e o maior dia. Que variáveis você precisa criar **antes** do laço?", minimo: 40, modelo: "Antes do laço: um **acumulador** para o total (0), um **contador** para os dias com mais de 3 horas (0) e uma variável para o maior dia (0). Dentro do laço, para cada dia: ler, somar, contar se passou de 3 e atualizar o maior. Depois do laço: calcular a média e mostrar." },
    { tipo: "exemplo", titulo: "Um esqueleto de referência", arquivo: "esqueleto.py", entradas: ["2", "5", "7"], texto: "Mesma estrutura, com outro tema (gastos em vez de horas). Use como mapa.",
      codigo: [["n = int(input(\"Quantos gastos? \"))", "Lê quantas voltas serão."], ["total = 0", "O acumulador, antes do laço."], ["maior = 0", "O maior valor visto."], ["for i in range(n):", "Uma volta por gasto."], ["    g = int(input(f\"Gasto {i + 1}: \"))", "Lê e converte."], ["    total = total + g", "Acumula."], ["    if g > maior:", "Atualiza o maior..."], ["        maior = g", "...quando achar um maior."], ["print(\"Total:\", total)", "Mostra o total."]] },
    { tipo: "escrever", titulo: "Exercício final (sem dica)", final: true, minutos: 12, texto: "Peça `Quantos dias? ` e depois `Dia 1: `, `Dia 2: `... (horas, inteiros). Mostre `Total de horas: X`, `Média por dia: Y` (com **1 casa decimal**), `Dias com mais de 3 horas: Z` e `Maior dia: M`.", arquivo: "semana.py",
      inicial: `# Planeje: variáveis antes do laço, leitura e decisões dentro, resultados depois
`, cenarios: [{ entradas: ["3", "2", "4", "1"], esperado: ["Quantos dias? 3", "Dia 1: 2", "Dia 2: 4", "Dia 3: 1", "Total de horas: 7", "Média por dia: 2.3", "Dias com mais de 3 horas: 1", "Maior dia: 4"] }, { entradas: ["2", "5", "5"], esperado: ["Quantos dias? 2", "Dia 1: 5", "Dia 2: 5", "Total de horas: 10", "Média por dia: 5.0", "Dias com mais de 3 horas: 2", "Maior dia: 5"] }, { entradas: ["1", "0"], esperado: ["Quantos dias? 1", "Dia 1: 0", "Total de horas: 0", "Média por dia: 0.0", "Dias com mais de 3 horas: 0", "Maior dia: 0"] }],
      dica: "Crie `total`, `dias_longos` e `maior` antes do `for i in range(n):`. Depois do laço, `media = total / n` e `f\"{media:.1f}\"`.", conceito: ["for_range", "acumulador", "padroes_lacos"],
      solucao: `n = int(input("Quantos dias? "))
total = 0
dias_longos = 0
maior = 0
for i in range(n):
    h = int(input(f"Dia {i + 1}: "))
    total = total + h
    if h > 3:
        dias_longos = dias_longos + 1
    if h > maior:
        maior = h
media = total / n
print("Total de horas:", total)
print(f"Média por dia: {media:.1f}")
print("Dias com mais de 3 horas:", dias_longos)
print("Maior dia:", maior)` },
    { tipo: "escrever", titulo: "Problema novo: o caixa da cafeteria", transfer: true, minutos: 10, texto: "Outro contexto, agora com `while`. Peça `Item: ` (o preço, número com ponto) **até a pessoa digitar `fim`**. Mostre `Itens: N` e `Total: R$ X.XX` (duas casas decimais).", arquivo: "caixa.py",
      inicial: `# Leia preços até a pessoa digitar fim
`, cenarios: [{ entradas: ["4.5", "3", "fim"], esperado: ["Item: 4.5", "Item: 3", "Item: fim", "Itens: 2", "Total: R$ 7.50"] }, { entradas: ["fim"], esperado: ["Item: fim", "Itens: 0", "Total: R$ 0.00"] }, { entradas: ["10", "fim"], esperado: ["Item: 10", "Item: fim", "Itens: 1", "Total: R$ 10.00"] }], dica: "Leia antes do laço e de novo dentro. `while item != \"fim\":` com `float(item)`.", conceito: ["while_laco", "acumulador", "laco_validacao"],
      solucao: `total = 0
itens = 0
item = input("Item: ")
while item != "fim":
    total = total + float(item)
    itens = itens + 1
    item = input("Item: ")
print("Itens:", itens)
print(f"Total: R$ {total:.2f}")` },
    { tipo: "aberta", tag: "sec", titulo: "O caixa e a confiança", texto: "O programa do caixa soma qualquer número digitado, inclusive negativos como -100.", pergunta: "O que um funcionário mal-intencionado poderia fazer com um preço negativo? Que validação faltou?", modelo: "Poderia **abaixar o total** (ou gerar crédito) digitando valores negativos. Faltou **validar o intervalo** de cada preço (por exemplo, só valores maiores que zero) e recusar o resto, como no laço de validação." },
    { tipo: "quiz", itens: [
      { pergunta: "Onde devem ficar o total e o maior valor?", opcoes: ["Dentro do laço, a cada volta", "Antes do laço, uma só vez", "Depois do laço, no final", "Em qualquer lugar, tanto faz"], correta: 1, porque: "Criados antes do laço, sobrevivem a todas as voltas.", conceito: "acumulador" },
      { pergunta: "Quando usar `while` em vez de `for` no caixa?", opcoes: ["Quando o número de itens é desconhecido", "Quando o número de itens é conhecido", "Quando os preços são inteiros", "Quando o total é calculado antes"], correta: 0, porque: "O caixa para quando a pessoa digita “fim”, não depois de um número fixo de voltas.", conceito: "while_laco" },
      { pergunta: "Como mostrar a média com 1 casa decimal?", opcoes: ["print(media), sem formato", "print(f\"{media:.1f}\")", "print(media.1f), com ponto", "print(\"{media}\"), sem o f"], correta: 1, porque: "A f-string com `:.1f` mostra uma casa decimal.", conceito: "padroes_lacos" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: descreva em passos como o seu programa da semana funciona.", conceito: "for_range", modelo: "Lê quantos dias; cria o total, o contador e o maior antes do laço; para cada dia, lê as horas, soma ao total, conta se passou de 3 e atualiza o maior; depois do laço calcula a média e mostra os quatro resultados." },
  ],
  recuperacao: [
    { p: "Quais variáveis você cria antes do laço para somar e achar o maior?", regex: "(total|soma|acumul);;(maior)", modelo: "Um acumulador para o total e uma variável para o maior valor visto.", conceito: "acumulador" },
    { p: "Quando o `while` é melhor que o `for`?", regex: "(desconhec|nao se sabe|nao sabe quantas|ate que|enquanto|depende de uma condicao)", modelo: "Quando não se sabe quantas voltas serão necessárias e a repetição depende de uma condição.", conceito: "while_laco" },
    { p: "Por que validar os preços digitados no caixa?", regex: "(negativ|abaixar|fraude|valor errado|invalid|intervalo)", modelo: "Para impedir valores como negativos, que poderiam reduzir o total ou gerar crédito indevido.", conceito: "laco_validacao" },
  ],
});

export default aulas;
