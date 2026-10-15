// Módulo 5: Listas e dicionários (universal). Fio condutor: a fila de pedidos, o estoque e o carrinho de compras de uma cafeteria.
export const meta = {
  final: "Mini-projeto: o carrinho de compras com total e desconto",
  transfer: "Aplicar dicionários a usuários e permissões",
};
const aulas = [];

// ---------- Aula 33: listas ----------
aulas.push({
  id: "0033", modulo: 5, n: 1, slug: "listas", titulo: "Muitos valores numa só variável: listas",
  resumo: "O robô tem uma fila de pedidos. Hoje ele aprende a guardar vários itens numa única variável e a pedir “o primeiro”, “o último” ou “quantos há”.",
  objetivos: ["Criar uma lista e ler itens pela posição.", "Explicar que a contagem das posições começa em 0.", "Usar `len` e posições negativas."],
  conceitos: [["lista_basica", "Listas: criar e ler pela posição"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "A fila do robô tem três pedidos: café, pão e suco. Como guardar os três numa **única** variável? E como pedir “o primeiro”, “o último” ou “quantos há”?", modelo: "Numa **lista**: uma variável que guarda vários valores em ordem. Cada valor tem uma **posição** (e a primeira posição é a **0**), e `len(lista)` diz quantos itens há." },
    { tipo: "exemplo", arquivo: "fila.py", texto: "Clique em cada linha.",
      codigo: [["fila = [\"cafe\", \"pao\", \"suco\"]", "Uma **lista**: valores entre colchetes, separados por vírgula."], ["print(fila[0])", "`fila[0]` é o item na posição **0**: o primeiro. Mostra `cafe`."], ["print(fila[2])", "Posição 2: o terceiro item, `suco`."], ["print(fila[-1])", "Posição **negativa** conta de trás para a frente: `-1` é o último, `suco`."], ["print(len(fila))", "`len` devolve quantos itens há: `3`."]],
      termos: [["Lista", "uma sequência de valores guardada numa só variável, entre colchetes."], ["Posição (índice)", "o número do item na lista; começa em 0."]] },
    { tipo: "executar", texto: "Rode e depois mude os itens e as posições.", arquivo: "fila.py (pode editar)", codigo: `fila = ["cafe", "pao", "suco"]
print(fila[0])
print(fila[-1])
print(len(fila))`,
      prever: { enunciado: "Antes de testar:", conceito: "lista_basica", itens: [{ codigo: `f = ["a", "b", "c"]
print(f[1])`, resposta: "b", porque: "A posição 1 é o **segundo** item (a primeira é a 0)." }, { codigo: `f = ["a", "b", "c"]
print(f[-2])`, resposta: "b", porque: "`-2` é o penúltimo." }] } },
    { tipo: "descobrir", texto: "O programa mostra o item da posição `i` da fila.", arquivo: "posicao.py", codigo: `print(fila[i])`,
      execucoes: [{ prefixo: 'fila = ["cafe", "pao", "suco"]\ni = 0', saida: ["cafe"] }, { prefixo: 'fila = ["cafe", "pao", "suco"]\ni = 2', saida: ["suco"] }, { prefixo: 'fila = ["cafe", "pao", "suco"]\ni = -1', saida: ["suco"] }], colunas: ["Valores", "O que aparece"],
      pergunta: "Qual é a primeira posição de uma lista? O que significa uma posição negativa como `-1`?", dicas: ["Em qual `i` aparece o primeiro item, “cafe”?", "Compare `i = 2` com `i = -1`: o mesmo item apareceu. Por quê?"],
      explicacao: "A primeira posição é a **0**. Posições negativas contam **de trás para a frente**: `-1` é o último item, `-2` o penúltimo. Numa lista de 3 itens, `2` e `-1` apontam para o mesmo.", conceito: "lista_basica" },
    { tipo: "prever", conceito: "lista_basica", itens: [
      { codigo: `n = [10, 20, 30]
print(n[0] + n[2])`, resposta: "40", porque: "O primeiro (10) mais o terceiro (30)." },
      { codigo: "print(len([5, 6, 7, 8]))", resposta: "4", porque: "A lista tem quatro itens." },
      { codigo: `p = ["a", "b"]
print(p[-1])`, resposta: "b", porque: "O último item." },
      { codigo: `p = ["a", "b"]
print(p[2])`, erro: "IndexError", resposta: "IndexError", pergunta: "Tipo do erro:", porque: "Uma lista de 2 itens só tem as posições 0 e 1; a 2 não existe." }] },
    { tipo: "corrigir", texto: "O robô quer mostrar o **último** pedido, mas dá erro. Conserte **a posição**.", arquivo: "com_defeito.py", dica: "Uma lista de 3 itens vai das posições 0 a 2. Ou use `-1`.", conceito: "lista_basica",
      codigo: `fila = ["cafe", "pao", "suco"]
print(fila[3])`, esperado: ["suco"],
      solucao: `fila = ["cafe", "pao", "suco"]
print(fila[2])` },
    { tipo: "escrever", texto: "Com `precos = [4.5, 3.0, 6.0]`, mostre `Primeiro: 4.5`, `Último: 6.0` e `Quantidade: 3`.", arquivo: "meu_programa.py",
      inicial: `precos = [4.5, 3.0, 6.0]
# mostre o primeiro, o último e a quantidade
`, esperado: ["Primeiro: 4.5", "Último: 6.0", "Quantidade: 3"], testes: [["precos", "[4.5, 3.0, 6.0]"]], dica: "`precos[0]`, `precos[-1]` e `len(precos)`.", conceito: "lista_basica",
      solucao: `precos = [4.5, 3.0, 6.0]
print("Primeiro:", precos[0])
print("Último:", precos[-1])
print("Quantidade:", len(precos))` },
    { tipo: "aberta", tag: "sec", titulo: "O cliente 3, mas só o cliente 3", texto: "Um programa guarda os CPFs de todos os clientes numa lista. Quando alguém pede “o cliente 3”, ele envia **a lista inteira** para a tela e deixa o aplicativo escolher o item 3.", pergunta: "O que há de errado? O que o sistema deveria enviar?", modelo: "A lista inteira com **todos os CPFs** viaja para a tela, mesmo que só um seja usado. Qualquer um pode inspecionar o que chega. O sistema deve escolher o item **no seu lado** e enviar **só o necessário** (e, de preferência, mascarado)." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual é a posição do primeiro item de uma lista?", opcoes: ["Posição 1, o começo", "Posição 0, o zero", "Posição -1, o fim", "Posição len, o total"], correta: 1, porque: "A contagem das posições começa em 0.", conceito: "lista_basica" },
      { pergunta: "O que devolve `len([4, 5, 6])`?", opcoes: ["2, a última posição", "6, o último valor", "3, a quantidade", "15, a soma deles"], correta: 2, porque: "`len` conta quantos itens a lista tem.", conceito: "lista_basica" },
      { pergunta: "O que é `lista[-1]`?", opcoes: ["O último item da lista", "O primeiro item da lista", "Um erro de posição", "A lista sem o último"], correta: 0, porque: "Posições negativas contam de trás para a frente.", conceito: "lista_basica" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que é uma lista e como se lê um item dela?", conceito: "lista_basica", modelo: "Uma lista guarda vários valores em ordem numa só variável, entre colchetes. Lê-se um item pela posição entre colchetes (`lista[0]` é o primeiro); posições negativas contam do fim; `len` diz quantos itens há." },
  ],
  recuperacao: [
    { p: "Qual é a posição do primeiro item de uma lista?", regex: "(0|zero)", naoRegex: "(posicao 1|primeira posicao e 1)", modelo: "A posição 0.", conceito: "lista_basica" },
    { p: "O que `lista[-1]` devolve?", regex: "(ultimo)", modelo: "O último item da lista.", conceito: "lista_basica" },
    { p: "Por que não enviar a lista inteira de CPFs quando só um é pedido?", regex: "(so o necessario|apenas o necessario|todos os cpf|expoe|vaz|minimo|inspecion|necessario)", modelo: "Porque expõe todos os CPFs; deve-se enviar só o item necessário.", conceito: "lista_basica" },
  ],
});

// ---------- Aula 34: mudando listas ----------
aulas.push({
  id: "0034", modulo: 5, n: 2, slug: "mudando-listas", titulo: "A fila anda: adicionar, remover e atender",
  resumo: "Chega um pedido novo, outro é cancelado, o primeiro é atendido. Hoje a lista deixa de ser fixa e passa a mudar.",
  objetivos: ["Adicionar com `append`, remover com `remove` e `pop`.", "Trocar um item pela posição.", "Checar se um item está na lista com `in`."],
  conceitos: [["lista_metodos", "Mudar listas: append, remove, pop e in"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "A fila do robô muda o tempo todo: chega um pedido novo, um pedido é cancelado e o primeiro da fila é atendido. Que operações uma lista precisa oferecer? E como saber se um pedido **está** na fila?", modelo: "Precisa **acrescentar** no fim, **remover** um item específico, **retirar** o primeiro (atender) e **perguntar** se um item está lá. Em Python: `append`, `remove`, `pop` e o operador `in`." },
    { tipo: "exemplo", arquivo: "fila_muda.py", texto: "Clique em cada linha.",
      codigo: [["fila = [\"cafe\", \"pao\"]", "A fila começa com dois pedidos."], ["fila.append(\"suco\")", "**`append`** acrescenta no **fim**: a fila agora é cafe, pao, suco."], ["fila.remove(\"pao\")", "**`remove`** tira o primeiro item igual ao informado: sobram cafe e suco."], ["atendido = fila.pop(0)", "**`pop(0)`** tira o item da posição 0 **e o devolve**: `atendido` vale `cafe`."], ["print(atendido)", "Mostra `cafe`."], ["print(len(fila))", "Sobrou 1 item: `1`."], ["print(\"pao\" in fila)", "**`in`** pergunta se o valor está na lista: `False`."]],
      termos: [["append", "acrescenta um item no fim da lista."], ["remove / pop", "`remove(valor)` tira um valor; `pop(posição)` tira pela posição e devolve o item."], ["in", "pergunta se um valor está na lista (`True` ou `False`)."]] },
    { tipo: "executar", texto: "Rode e depois acrescente mais pedidos.", arquivo: "fila_muda.py (pode editar)", codigo: `fila = ["cafe", "pao"]
fila.append("suco")
print(len(fila))
print("pao" in fila)`,
      prever: { enunciado: "Antes de testar:", conceito: "lista_metodos", itens: [{ codigo: `f = ["a", "b", "c"]
f.remove("b")
print(f[1])`, resposta: "c", porque: "Depois de tirar “b”, a lista é a, c; a posição 1 é “c”." }, { codigo: `f = [1, 2, 3]
x = f.pop()
print(x)`, resposta: "3", porque: "`pop()` sem posição tira e devolve o **último** item." }] } },
    { tipo: "descobrir", texto: "O programa acrescenta um item e depois retira o primeiro.", arquivo: "fila_tamanho.py", codigo: `f.append("x")
f.pop(0)
print(len(f))`,
      execucoes: [{ prefixo: "f = []", saida: ["0"] }, { prefixo: 'f = ["a", "b"]', saida: ["2"] }, { prefixo: 'f = ["a"]', saida: ["1"] }], colunas: ["Lista inicial", "Tamanho final"],
      pergunta: "O que acontece com o tamanho da lista depois de um `append` e um `pop(0)`? Por que, com a lista vazia, o resultado é 0 e não um erro?", dicas: ["O `append` aumenta em 1 e o `pop` diminui em 1. O que sobra?", "Com a lista vazia, o `append` acontece **antes** do `pop`. Ainda tem item para retirar?"],
      explicacao: "O tamanho volta ao que era (+1 do `append`, −1 do `pop`). Com a lista vazia, o `append` coloca “x” **antes** de o `pop(0)` agir, então há um item para retirar: sobra a lista vazia (0), sem erro.", conceito: "lista_metodos" },
    { tipo: "prever", conceito: "lista_metodos", itens: [
      { codigo: `f = ["a", "b"]
f[0] = "z"
print(f[0])`, resposta: "z", porque: "Atribuir a uma posição **troca** o item que estava lá." },
      { codigo: `f = ["a"]
f.append("b")
f.append("c")
print(len(f))`, resposta: "3", porque: "Começa com 1 e acrescenta 2." },
      { codigo: 'print("cafe" in ["cafe", "pao"])', resposta: "True", porque: "“cafe” está na lista." },
      { codigo: `f = ["a", "b"]
f.remove("c")`, erro: "ValueError", resposta: "ValueError", pergunta: "Tipo do erro:", porque: "`remove` dá erro se o valor não está na lista." }] },
    { tipo: "corrigir", texto: "O programa tenta remover “pao”, que não está na fila, e dá erro. Conserte para remover **somente se existir**.", arquivo: "com_defeito.py", dica: "Pergunte antes com `in`: `if \"pao\" in fila:`.", conceito: "lista_metodos",
      codigo: `fila = ["cafe", "suco"]
fila.remove("pao")
print(len(fila))`, esperado: ["2"],
      solucao: `fila = ["cafe", "suco"]
if "pao" in fila:
    fila.remove("pao")
print(len(fila))` },
    { tipo: "escrever", texto: "A fila começa com `fila = [\"Ana\", \"Beto\"]`. Chega `Caio` (acrescente). Atenda o primeiro da fila (retire e mostre `Atendendo: Ana`) e mostre `Na fila: 2`.", arquivo: "meu_programa.py",
      inicial: `fila = ["Ana", "Beto"]
# chegou Caio; atenda o primeiro
`, esperado: ["Atendendo: Ana", "Na fila: 2"], testes: [["fila", "['Beto', 'Caio']"]], dica: "`fila.append(\"Caio\")`, `atendido = fila.pop(0)` e `len(fila)`.", conceito: "lista_metodos",
      solucao: `fila = ["Ana", "Beto"]
fila.append("Caio")
atendido = fila.pop(0)
print("Atendendo:", atendido)
print("Na fila:", len(fila))` },
    { tipo: "aberta", tag: "sec", titulo: "Chamar pelo nome?", texto: "A sala de espera mostra num telão a fila com o **nome completo** de cada pessoa atendida.", pergunta: "Que problema de privacidade isso cria? O que usar no lugar?", modelo: "Qualquer pessoa na sala fica sabendo **quem está sendo atendido** (e, dependendo do lugar, por quê). Use uma **senha ou número** de atendimento, ou só o primeiro nome, que identifica para quem precisa e expõe pouco." },
    { tipo: "quiz", itens: [
      { pergunta: "O que `lista.append(x)` faz?", opcoes: ["Acrescenta x no fim", "Acrescenta x no início", "Remove x da lista", "Troca a lista por x"], correta: 0, porque: "`append` acrescenta no final.", conceito: "lista_metodos" },
      { pergunta: "O que `pop(0)` faz?", opcoes: ["Tira o último e devolve", "Tira o primeiro e devolve", "Mostra o primeiro e fica", "Apaga a lista inteira"], correta: 1, porque: "Retira o item da posição 0 e o devolve.", conceito: "lista_metodos" },
      { pergunta: "Como checar se `\"pao\"` está na lista `fila`?", opcoes: ["fila.has(\"pao\"), um método", "\"pao\" in fila, o operador", "fila.pao, com ponto", "fila(\"pao\"), como função"], correta: 1, porque: "O operador `in` devolve `True` ou `False`.", conceito: "lista_metodos" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como acrescentar, remover e atender o primeiro de uma fila, e como saber se um item está nela?", conceito: "lista_metodos", modelo: "`append` acrescenta no fim, `remove(valor)` tira um valor, `pop(0)` tira e devolve o primeiro (atender) e `valor in lista` responde `True` ou `False`." },
  ],
  recuperacao: [
    { p: "Qual a diferença entre `remove` e `pop`?", regex: "(remove);;(pop);;(posicao|valor|devolve)", modelo: "`remove(valor)` tira um valor; `pop(posição)` tira pela posição e devolve o item.", conceito: "lista_metodos" },
    { p: "Como saber se “pao” está na lista `fila`?", regex: "(in|operador in|\"pao\" in)", modelo: "Com `\"pao\" in fila`, que dá `True` ou `False`.", conceito: "lista_metodos" },
    { p: "Por que não mostrar o nome completo de quem está sendo atendido num telão?", regex: "(privacid|exposic|quem esta|publico|identific|senha|numero)", modelo: "Porque expõe quem está sendo atendido; use senha ou número.", conceito: "lista_metodos" },
  ],
});

// ---------- Aula 35: percorrer listas ----------
aulas.push({
  id: "0035", modulo: 5, n: 3, slug: "percorrer-listas", titulo: "Passar por cada item: percorrer listas",
  resumo: "Somar os pedidos, contar quantos são de café, mostrar um por um: o `for` percorre os itens de uma lista sem precisar saber as posições.",
  objetivos: ["Percorrer os itens com `for item in lista`.", "Combinar `for`, `if` e acumuladores sobre listas.", "Escolher entre percorrer pelos itens e pelas posições."],
  conceitos: [["lista_percorrer", "Percorrer listas com for"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Para somar os valores de todos os pedidos do dia, o robô precisa olhar item por item. Como o `for` poderia fazer isso **sem** que você precise saber as posições?", modelo: "O `for` pode entregar **cada item** da lista, um por volta: `for p in precos:`. Quem escreve o programa só decide o que fazer com cada item." },
    { tipo: "exemplo", arquivo: "percorrer.py", texto: "Clique em cada linha.",
      codigo: [["precos = [4.5, 3.0, 6.0]", "A lista de preços."], ["total = 0", "O acumulador, antes do laço."], ["for p in precos:", "A cada volta, `p` recebe **o próximo item** da lista."], ["    total = total + p", "Acumula."], ["print(total)", "`13.5`."], ["for i in range(len(precos)):", "Se você precisa da **posição**, percorra as posições: `range(len(precos))` gera 0, 1, 2."], ["    print(i, precos[i])", "Mostra a posição e o item: `0 4.5`, `1 3.0`, `2 6.0`."]],
      termos: [["for item in lista", "percorre os itens, um por volta."], ["range(len(lista))", "gera as posições de 0 até o fim da lista."]] },
    { tipo: "executar", texto: "Rode e depois troque os itens.", arquivo: "percorrer.py (pode editar)", codigo: `for n in [1, 2, 3]:
    print(n * n)`,
      prever: { enunciado: "Antes de testar, qual é a **última linha**?", conceito: "lista_percorrer", itens: [{ codigo: `nomes = ["ana", "beto"]
for n in nomes:
    print(n.upper())`, resposta: "BETO", porque: "`.upper()` deixa em maiúsculas; o último nome é “beto”." }, { codigo: `s = 0
for n in [2, 4, 6]:
    s = s + n
print(s)`, resposta: "12", porque: "2 + 4 + 6." }] } },
    { tipo: "descobrir", texto: "O programa mostra só os itens maiores que 5.", arquivo: "filtro.py", codigo: `for n in lista:
    if n > 5:
        print(n)`,
      execucoes: [{ prefixo: "lista = [3, 8, 5, 9]", saida: ["8", "9"] }, { prefixo: "lista = [1, 2]", saida: [] }, { prefixo: "lista = [6]", saida: ["6"] }], colunas: ["Lista", "O que aparece"],
      pergunta: "Como o `if` dentro do `for` decide o que aparece? O que acontece quando nenhum item passa?", dicas: ["Olhe a lista `[3, 8, 5, 9]`: quais itens aparecem? O 5 aparece?", "Com `[1, 2]` o laço roda? E o `print`?"],
      explicacao: "O laço visita **todos** os itens, mas o `if` deixa o `print` rodar só para os maiores que 5 (o 5 não, porque `5 > 5` é falso). Quando nenhum passa, o laço roda normalmente e **nada aparece**.", conceito: "lista_percorrer" },
    { tipo: "prever", conceito: "lista_percorrer", itens: [
      { codigo: 'print("cafe" in ["cafe", "pao"])', resposta: "True", porque: "O `in` percorre a lista por você." },
      { codigo: `c = 0
for n in [1, 2, 3, 4, 5, 6]:
    if n % 3 == 0:
        c = c + 1
print(c)`, resposta: "2", porque: "Múltiplos de 3: 3 e 6." },
      { codigo: `for i in range(len(["a", "b", "c"])):
    print(i)`, resposta: "2", porque: "As posições são 0, 1 e 2; a última exibida é 2." },
      { codigo: `maior = 0
for n in [3, 9, 2]:
    if n > maior:
        maior = n
print(maior)`, resposta: "9", porque: "Guarda o maior visto até agora." }] },
    { tipo: "corrigir", texto: "O total dos preços deveria ser 13.5, mas mostra só o último valor. Conserte **uma linha**.", arquivo: "com_defeito.py", dica: "A cada volta é preciso **somar** ao total, não substituí-lo.", conceito: "lista_percorrer",
      codigo: `precos = [4.5, 3.0, 6.0]
total = 0
for p in precos:
    total = p
print("Total:", total)`, esperado: ["Total: 13.5"],
      solucao: `precos = [4.5, 3.0, 6.0]
total = 0
for p in precos:
    total = total + p
print("Total:", total)` },
    { tipo: "escrever", texto: "Com `pedidos = [\"cafe\", \"pao\", \"cafe\", \"suco\", \"cafe\"]`, conte quantos são `\"cafe\"` e mostre `Cafés: 3`.", arquivo: "meu_programa.py",
      inicial: `pedidos = ["cafe", "pao", "cafe", "suco", "cafe"]
# conte os cafés
`, esperado: ["Cafés: 3"], testes: [["cafes", "3"]], dica: "Um contador `cafes = 0` e um `if pedido == \"cafe\":` dentro do `for`.", conceito: "lista_percorrer",
      solucao: `pedidos = ["cafe", "pao", "cafe", "suco", "cafe"]
cafes = 0
for pedido in pedidos:
    if pedido == "cafe":
        cafes = cafes + 1
print("Cafés:", cafes)` },
    { tipo: "aberta", tag: "sec", titulo: "O erro em massa", texto: "Um laço envia um aviso por e-mail a **todos** os clientes da lista. Um bug faz o aviso de um cliente (com o histórico de compras dele) ser enviado a todos os outros.", pergunta: "Por que laços sobre dados pessoais pedem tanto cuidado? Como testar antes de usar de verdade?", modelo: "Um erro dentro do laço se **multiplica** por todos os itens: o mesmo vazamento acontece milhares de vezes. Teste com **poucos dados fictícios** (e, se possível, com e-mails de teste) e confira o resultado antes de rodar para todos." },
    { tipo: "quiz", itens: [
      { pergunta: "O que `for p in precos:` faz a cada volta?", opcoes: ["Dá o próximo item a p", "Dá a posição atual a p", "Soma todos os preços", "Troca a lista por p"], correta: 0, porque: "A cada volta, `p` recebe o próximo item.", conceito: "lista_percorrer" },
      { pergunta: "Como percorrer as posições de uma lista?", opcoes: ["range(len(lista)), as posições", "len(range(lista)), ao contrário", "for len in lista, direto", "lista(range), sem len"], correta: 0, porque: "`range(len(lista))` gera 0, 1, 2... até a última posição.", conceito: "lista_percorrer" },
      { pergunta: "Com `if n > 5:` dentro do `for`, os itens ignorados:", opcoes: ["são apagados da lista", "são visitados, mas pulados", "dão erro no programa", "somem do próprio laço"], correta: 1, porque: "O laço visita todos; o `if` só decide o que fazer com cada um.", conceito: "lista_percorrer" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como percorrer os itens de uma lista e fazer algo só com alguns deles?", conceito: "lista_percorrer", modelo: "Com `for item in lista:` (um item por volta) e, dentro do laço, um `if` que decide quais itens recebem a ação, por exemplo, contar ou somar." },
  ],
  recuperacao: [
    { p: "O que `for p in precos:` faz?", regex: "(cada item|um item|item por|proximo item|um por vez)", modelo: "Percorre a lista dando um item de cada vez a `p`.", conceito: "lista_percorrer" },
    { p: "Como percorrer as posições de uma lista?", regex: "(range);;(len)", modelo: "Com `range(len(lista))`.", conceito: "lista_percorrer" },
    { p: "Por que um erro num laço sobre clientes é mais grave?", regex: "(multipl|todos|varios|repete|em massa|cada cliente)", modelo: "Porque o erro se repete para todos os itens: o vazamento se multiplica.", conceito: "lista_percorrer" },
  ],
});

// ---------- Aula 36: ordenar e fatias ----------
aulas.push({
  id: "0036", modulo: 5, n: 4, slug: "ordenar-fatias", titulo: "Ranking: ordenar, somar e pegar um pedaço",
  resumo: "As maiores vendas, a menor nota, a média: hoje o robô usa ferramentas prontas da linguagem e aprende a cortar um pedaço da lista.",
  objetivos: ["Usar `sorted`, `max`, `min` e `sum`.", "Cortar uma fatia com `lista[a:b]`.", "Montar um ranking (os 3 maiores)."],
  conceitos: [["lista_ordenar", "sorted, max, min, sum e fatias"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O dono quer o **ranking** das vendas: da maior para a menor, só as 3 primeiras. Que passos o programa precisa fazer? Algum deles você já sabe fazer à mão com um laço?", modelo: "Ordenar, e depois pegar só as 3 primeiras. Achar a maior venda você já faria com um laço, mas o Python tem ferramentas prontas: `sorted`, `max`, `min`, `sum` e **fatias** para cortar um pedaço da lista." },
    { tipo: "exemplo", arquivo: "ranking.py", texto: "Clique em cada linha.",
      codigo: [["vendas = [30, 10, 50, 20]", "Os valores vendidos."], ["print(sorted(vendas))", "**`sorted`** devolve uma lista **nova** em ordem crescente: `[10, 20, 30, 50]`. A original não muda."], ["print(max(vendas), min(vendas), sum(vendas))", "O maior, o menor e a soma: `50 10 110`."], ["print(vendas[:2])", "Uma **fatia**: `[:2]` pega do começo até a posição 2 (sem incluí-la): `[30, 10]`."], ["print(sorted(vendas, reverse=True)[:3])", "`reverse=True` ordena do maior para o menor, e `[:3]` pega os 3 primeiros: `[50, 30, 20]`."]],
      termos: [["sorted", "devolve uma cópia ordenada da lista."], ["Fatia", "um pedaço da lista: `lista[início:fim]` (o fim não entra)."]] },
    { tipo: "executar", texto: "Rode e troque os valores e as fatias.", arquivo: "ranking.py (pode editar)", codigo: `vendas = [30, 10, 50, 20]
print(sorted(vendas))
print(max(vendas), min(vendas), sum(vendas))`,
      prever: { enunciado: "Antes de testar:", conceito: "lista_ordenar", itens: [{ codigo: "print(sum([1, 2, 3]))", resposta: "6", porque: "1 + 2 + 3." }, { codigo: "print(max([4, 9, 2]))", resposta: "9", porque: "O maior valor." }, { codigo: `v = [1, 2, 3, 4, 5]
print(v[1:3])`, resposta: "[2, 3]", porque: "Da posição 1 até a 3, **sem** incluir a 3." }] } },
    { tipo: "descobrir", texto: "O programa corta fatias de uma lista de 5 itens.", arquivo: "fatias.py", codigo: `print(v[a:b])`,
      execucoes: [{ prefixo: "v = [10, 20, 30, 40, 50]\na, b = 1, 3", saida: ["[20, 30]"] }, { prefixo: "v = [10, 20, 30, 40, 50]\na, b = 0, 2", saida: ["[10, 20]"] }, { prefixo: "v = [10, 20, 30, 40, 50]\na, b = 3, 5", saida: ["[40, 50]"] }], colunas: ["Valores", "Fatia"],
      pergunta: "O item da posição `b` entra na fatia? Isso lembra qual outra ferramenta que você já viu?", dicas: ["Com `a, b = 1, 3`, quais posições aparecem? A posição 3 (o 40) está lá?", "Pense no `range(início, fim)`."],
      explicacao: "A posição `b` **não entra**: a fatia vai de `a` até `b - 1`. É a mesma regra do `range(início, fim)`: o fim fica de fora.", conceito: "lista_ordenar" },
    { tipo: "prever", conceito: "lista_ordenar", itens: [
      { codigo: 'print(sorted(["pao", "cafe", "suco"]))', resposta: "['cafe', 'pao', 'suco']", porque: "Textos são ordenados em ordem alfabética." },
      { codigo: "print(sorted([3, 1, 2], reverse=True))", resposta: "[3, 2, 1]", porque: "Do maior para o menor." },
      { codigo: `v = [5, 3, 8]
v.sort()
print(v[-1])`, resposta: "8", porque: "`.sort()` ordena a própria lista; o último é o maior." },
      { codigo: "print(sum([4.5, 3.0, 6.0]) / 3)", resposta: "4.5", porque: "A soma é 13.5, e 13.5 / 3 é 4.5." }] },
    { tipo: "corrigir", texto: "O ranking deveria mostrar as **3 maiores** vendas, mas mostra as 3 menores. Conserte **a ordenação**.", arquivo: "com_defeito.py", dica: "Falta pedir a ordem do maior para o menor.", conceito: "lista_ordenar",
      codigo: `vendas = [30, 10, 50, 20, 40]
top3 = sorted(vendas)[:3]
print(top3)`, esperado: ["[50, 40, 30]"],
      solucao: `vendas = [30, 10, 50, 20, 40]
top3 = sorted(vendas, reverse=True)[:3]
print(top3)` },
    { tipo: "escrever", texto: "Com `notas = [7, 9, 5, 8]`, mostre `Maior: 9`, `Menor: 5` e `Média: 7.25`, usando `max`, `min`, `sum` e `len`.", arquivo: "meu_programa.py",
      inicial: `notas = [7, 9, 5, 8]
# mostre o maior, o menor e a média
`, esperado: ["Maior: 9", "Menor: 5", "Média: 7.25"], dica: "A média é `sum(notas) / len(notas)`.", conceito: "lista_ordenar",
      solucao: `notas = [7, 9, 5, 8]
print("Maior:", max(notas))
print("Menor:", min(notas))
print("Média:", sum(notas) / len(notas))` },
    { tipo: "aberta", tag: "sec", titulo: "Ranking com nomes", texto: "Um site publica o “ranking dos clientes que mais compraram”, com o nome completo e o valor gasto de cada um.", pergunta: "Que riscos de privacidade existem? O que seria uma alternativa que mantém o ranking?", modelo: "Expor o histórico de compra de pessoas identificadas pode ser invasivo e até ser usado por golpistas. Alternativas: mostrar só **apelidos escolhidos pela pessoa** (com consentimento), ou **faixas** em vez de valores exatos, ou rankings agregados sem identificar ninguém." },
    { tipo: "quiz", itens: [
      { pergunta: "O que `sorted(lista)` faz com a lista original?", opcoes: ["Ordena a original mesmo", "Apaga os itens repetidos", "Deixa a original igual", "Inverte a original toda"], correta: 2, porque: "`sorted` devolve uma cópia ordenada; a original não muda.", conceito: "lista_ordenar" },
      { pergunta: "Quais itens tem `v[1:3]` em `[10, 20, 30, 40]`?", opcoes: ["10, 20 e 30 juntos", "20 e 30 apenas", "20, 30 e 40 todos", "10 e 20 apenas"], correta: 1, porque: "Da posição 1 até a 3, sem incluir a 3.", conceito: "lista_ordenar" },
      { pergunta: "Como pegar as 3 maiores vendas?", opcoes: ["sorted(v)[:3], crescente", "sorted(v, reverse=True)[:3]", "max(v)[:3], o maior", "sum(v)[:3], a soma"], correta: 1, porque: "Ordena do maior ao menor e corta os 3 primeiros.", conceito: "lista_ordenar" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como obter as 3 maiores vendas de uma lista?", conceito: "lista_ordenar", modelo: "Ordenando do maior para o menor, `sorted(vendas, reverse=True)`, e pegando os 3 primeiros com uma fatia, `[:3]`." },
  ],
  recuperacao: [
    { p: "O que `sorted` faz e o que acontece com a lista original?", regex: "(ordena|ordem|cresc);;(original|mesma|nao muda|copia|nova|igual)", modelo: "Devolve uma cópia ordenada; a original não muda.", conceito: "lista_ordenar" },
    { p: "O item da posição final de uma fatia `lista[a:b]` entra?", regex: "(fora|anterior|nao entra|nao inclui|sem incluir)", modelo: "Não: a fatia vai até a posição anterior à `b`.", conceito: "lista_ordenar" },
    { p: "Por que não publicar um ranking com nomes e valores gastos?", regex: "(privacid|exposic|identific|golpe|invasiv|dados pessoais|consentimento)", modelo: "Porque expõe o comportamento de pessoas identificáveis; prefira apelidos, faixas ou dados agregados.", conceito: "lista_ordenar" },
  ],
});

// ---------- Aula 37: dicionários ----------
aulas.push({
  id: "0037", modulo: 5, n: 5, slug: "dicionarios", titulo: "Cada informação com seu rótulo: dicionários",
  resumo: "Numa lista você precisa lembrar que a posição 0 é o nome. Num dicionário cada informação tem o seu próprio rótulo: a chave.",
  objetivos: ["Criar um dicionário com chaves e valores.", "Ler um valor pela chave.", "Explicar quando um dicionário é melhor que uma lista."],
  conceitos: [["dict_basico", "Dicionários: chave e valor"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Uma ficha de pedido tem cliente, item e quantidade. Se você guardar os três numa lista, precisa lembrar que a posição 0 é o cliente, a 1 é o item... Como guardar cada informação **com o seu próprio rótulo**?", modelo: "Num **dicionário**: pares de **chave** (o rótulo, como `\"cliente\"`) e **valor** (a informação, como `\"Lia\"`). Em vez de lembrar posições, você pede pelo nome do campo." },
    { tipo: "exemplo", arquivo: "ficha.py", texto: "Clique em cada linha.",
      codigo: [["pedido = {\"cliente\": \"Lia\", \"item\": \"cafe\", \"qtd\": 2}", "Um **dicionário**: entre chaves `{ }`, com pares `chave: valor` separados por vírgula."], ["print(pedido[\"cliente\"])", "Lê o valor pela **chave**: `Lia`."], ["print(pedido[\"qtd\"] * 4.5)", "O valor é um número e dá para fazer contas com ele: `9.0`."], ["print(len(pedido))", "`len` conta os **pares**: `3`."]],
      termos: [["Dicionário", "uma coleção de pares chave-valor, entre chaves."], ["Chave", "o rótulo de uma informação (única no dicionário)."], ["Valor", "a informação guardada sob uma chave."]] },
    { tipo: "executar", texto: "Rode e depois mude os valores e acrescente um campo.", arquivo: "ficha.py (pode editar)", codigo: `pedido = {"cliente": "Lia", "item": "cafe", "qtd": 2}
print(pedido["cliente"])
print(pedido["qtd"] * 4.5)`,
      prever: { enunciado: "Antes de testar:", conceito: "dict_basico", itens: [{ codigo: `d = {"a": 1, "b": 2}
print(d["b"])`, resposta: "2", porque: "O valor guardado sob a chave “b”." }, { codigo: 'print({"x": 10}["x"] + 5)', resposta: "15", porque: "O valor de “x” é 10; mais 5." }] } },
    { tipo: "descobrir", texto: "O programa lê o campo cujo nome está em `chave`.", arquivo: "ler_campo.py", codigo: `print(pedido[chave])`,
      execucoes: [{ prefixo: 'pedido = {"cliente": "Lia", "item": "cafe", "qtd": 2}\nchave = "cliente"', saida: ["Lia"] }, { prefixo: 'pedido = {"cliente": "Lia", "item": "cafe", "qtd": 2}\nchave = "item"', saida: ["cafe"] }, { prefixo: 'pedido = {"cliente": "Lia", "item": "cafe", "qtd": 2}\nchave = "qtd"', saida: ["2"] }], colunas: ["Valores", "O que aparece"],
      pergunta: "O que são chaves e valores? Por que isso costuma ser melhor que uma lista para uma ficha?", dicas: ["Em cada linha, o que mudou: o dicionário ou a chave usada?", "Numa lista, o que você precisaria lembrar para saber o que é `pedido[2]`?"],
      explicacao: "A **chave** é o rótulo do campo e o **valor** é a informação guardada. Para uma ficha, o dicionário é melhor porque você pede pelo **nome** (`pedido[\"qtd\"]`) em vez de lembrar que a posição 2 é a quantidade, e acrescentar um campo novo não bagunça os outros.", conceito: "dict_basico" },
    { tipo: "prever", conceito: "dict_basico", itens: [
      { codigo: `p = {"nome": "Ana", "idade": 30}
print(p["nome"])`, resposta: "Ana", porque: "O valor da chave “nome”." },
      { codigo: `p = {"preco": 4.5, "qtd": 4}
print(p["preco"] * p["qtd"])`, resposta: "18.0", porque: "4.5 × 4." },
      { codigo: `d = {"a": 1, "b": 2, "c": 3}
print(len(d))`, resposta: "3", porque: "Três pares." },
      { codigo: `d = {"a": 1}
print(d["z"])`, erro: "KeyError", resposta: "KeyError", pergunta: "Tipo do erro:", porque: "A chave “z” não existe no dicionário." }] },
    { tipo: "corrigir", texto: "O programa tenta ler o cliente como se o dicionário fosse uma lista e dá erro. Conserte **o que está dentro dos colchetes**.", arquivo: "com_defeito.py", dica: "Num dicionário você pede pela **chave**, não pela posição.", conceito: "dict_basico",
      codigo: `pedido = {"cliente": "Lia", "item": "cafe"}
print(pedido[0])`, esperado: ["Lia"],
      solucao: `pedido = {"cliente": "Lia", "item": "cafe"}
print(pedido["cliente"])` },
    { tipo: "escrever", texto: "Crie `usuario` com as chaves `nome` (`\"Ana\"`), `perfil` (`\"admin\"`) e `ativo` (`True`), e mostre `Ana é admin`.", arquivo: "meu_programa.py",
      inicial: `# crie o dicionário usuario e mostre a frase
`, esperado: ["Ana é admin"], testes: [["usuario['nome']", "'Ana'"], ["usuario['perfil']", "'admin'"], ["usuario['ativo']", "True"]], dica: "`usuario = {\"nome\": \"Ana\", \"perfil\": \"admin\", \"ativo\": True}` e um `print` com os dois valores.", conceito: "dict_basico",
      solucao: `usuario = {"nome": "Ana", "perfil": "admin", "ativo": True}
print(usuario["nome"], "é", usuario["perfil"])` },
    { tipo: "aberta", tag: "sec", titulo: "O que guardar do usuário?", texto: "Um dicionário de usuário guarda `{\"nome\": \"Ana\", \"senha\": \"1234\", \"perfil\": \"admin\"}`, com a senha escrita exatamente como a pessoa digitou.", pergunta: "Qual é o problema de guardar a senha assim? O que se guarda no lugar?", modelo: "Quem acessar o dicionário (ou um arquivo, ou um backup) **lê a senha**, e muita gente reutiliza senhas em outros sites. Em vez da senha guarda-se um **hash**: uma transformação de mão única, que permite conferir se a senha digitada confere, sem poder recuperar a original." },
    { tipo: "quiz", itens: [
      { pergunta: "Como ler o valor da chave `\"qtd\"` do dicionário `p`?", opcoes: ["p.qtd, com ponto", "p(\"qtd\"), com parênteses", "p[\"qtd\"], com colchetes", "p{\"qtd\"}, com chaves"], correta: 2, porque: "Usa-se a chave entre colchetes.", conceito: "dict_basico" },
      { pergunta: "O que `len(d)` conta num dicionário?", opcoes: ["Só as chaves, sem valores", "Só os valores, sem chaves", "As letras de todas as chaves", "Os pares chave e valor"], correta: 3, porque: "Cada par chave-valor conta como um.", conceito: "dict_basico" },
      { pergunta: "Quando um dicionário é melhor que uma lista?", opcoes: ["Quando cada dado tem rótulo", "Quando só há números", "Quando a ordem é a fonte", "Quando os dados são poucos"], correta: 0, porque: "Os rótulos (chaves) dispensam lembrar posições.", conceito: "dict_basico" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que é um dicionário e como se lê um valor dele?", conceito: "dict_basico", modelo: "Um dicionário guarda pares chave-valor entre chaves `{ }`. Lê-se um valor pedindo pela chave entre colchetes: `pedido[\"cliente\"]`. Uma chave que não existe causa `KeyError`." },
  ],
  recuperacao: [
    { p: "O que é uma chave de um dicionário?", regex: "(rotulo|nome do campo|identific|etiqueta|nome|campo)", modelo: "O rótulo de uma informação: o nome pelo qual se pede o valor.", conceito: "dict_basico" },
    { p: "O que acontece ao pedir uma chave que não existe?", regex: "(keyerror|erro|nao existe|falha)", modelo: "Dá `KeyError`.", conceito: "dict_basico" },
    { p: "Por que não guardar a senha como o usuário digitou?", regex: "(hash|le a senha|vaz|expoe|reutiliz|criptograf|outros sites|texto puro|claro)", modelo: "Porque quem acessar os dados lê a senha; guarda-se um hash, que permite conferir sem recuperar a original.", conceito: "dict_basico" },
  ],
});

// ---------- Aula 38: mudar dicionários ----------
aulas.push({
  id: "0038", modulo: 5, n: 6, slug: "mudando-dicionarios", titulo: "Alterar fichas: acrescentar, trocar e checar chaves",
  resumo: "O pedido muda: a quantidade aumenta, ganha uma observação, perde um campo. Hoje você altera dicionários e aprende a ler com segurança um campo que pode não existir.",
  objetivos: ["Acrescentar, trocar e apagar chaves.", "Checar uma chave com `in` e `not in`.", "Ler com valor de reserva usando `.get`."],
  conceitos: [["dict_mudar", "Mudar dicionários e checar chaves"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O pedido muda: aumenta a quantidade, ganha uma observação (“sem açúcar”) e perde um campo. Como alterar um dicionário? E como **ler um campo que talvez nem exista** sem o programa travar?", modelo: "Atribui-se pela chave (`p[\"qtd\"] = 2` troca ou cria), apaga-se com `del` e **pergunta-se antes** com `in`, ou lê-se com `.get(chave, reserva)`, que devolve um valor de reserva em vez de dar erro." },
    { tipo: "exemplo", arquivo: "alterar.py", texto: "Clique em cada linha.",
      codigo: [["p = {\"item\": \"cafe\", \"qtd\": 1}", "Um pedido."], ["p[\"qtd\"] = 2", "Chave que **existe**: troca o valor."], ["p[\"obs\"] = \"sem açúcar\"", "Chave que **não existe**: cria o par."], ["del p[\"item\"]", "`del` apaga o par da chave."], ["print(\"item\" in p)", "`in` pergunta se a chave existe: `False`."], ["print(\"obs\" not in p)", "`not in` é o contrário: `False`, pois “obs” existe."], ["print(p.get(\"item\", \"nenhum\"))", "**`.get`** lê a chave e, se ela não existir, devolve o valor de reserva (`nenhum`), sem erro."], ["print(len(p))", "Sobraram 2 pares: `2`."]],
      termos: [["del", "apaga um par pelo nome da chave."], [".get(chave, reserva)", "lê o valor da chave ou devolve a reserva se ela não existir."]] },
    { tipo: "executar", texto: "Rode e depois mude as chaves.", arquivo: "alterar.py (pode editar)", codigo: `p = {"item": "cafe", "qtd": 1}
p["qtd"] = 2
p["obs"] = "sem açúcar"
print(len(p))
print(p.get("desconto", 0))`,
      prever: { enunciado: "Antes de testar:", conceito: "dict_mudar", itens: [{ codigo: `d = {"a": 1}
d["b"] = 2
print(len(d))`, resposta: "2", porque: "Uma chave nova cria um par." }, { codigo: `d = {"a": 1}
d["a"] = 5
print(d["a"])`, resposta: "5", porque: "Uma chave existente tem o valor trocado." }] } },
    { tipo: "descobrir", texto: "O programa pergunta pela chave `qtd` de duas formas.", arquivo: "get.py", codigo: `print("qtd" in p)
print(p.get("qtd", 0))`,
      execucoes: [{ prefixo: 'p = {"qtd": 3}', saida: ["True", "3"] }, { prefixo: 'p = {"item": "cafe"}', saida: ["False", "0"] }, { prefixo: "p = {}", saida: ["False", "0"] }], colunas: ["Dicionário", "in · get"],
      pergunta: "Para que serve o `.get`? Qual a diferença para ler com `p[\"qtd\"]` quando a chave não existe?", dicas: ["O que `p[\"qtd\"]` faria com `p = {}`?", "O que o `.get(\"qtd\", 0)` devolve quando a chave não existe?"],
      explicacao: "Ler com `p[\"qtd\"]` quando a chave não existe causa **`KeyError`** e o programa para. O `.get(\"qtd\", 0)` devolve o valor de **reserva** (0) e segue em frente. Use `in` ou `.get` sempre que o campo puder faltar.", conceito: "dict_mudar" },
    { tipo: "prever", conceito: "dict_mudar", itens: [
      { codigo: 'print({"a": 1}.get("z", 0))', resposta: "0", porque: "A chave “z” não existe: vale a reserva." },
      { codigo: `d = {"a": 1}
print("a" in d)`, resposta: "True", porque: "A chave “a” existe." },
      { codigo: `d = {"a": 1, "b": 2}
del d["a"]
print(len(d))`, resposta: "1", porque: "Sobrou só o par “b”." },
      { codigo: `p = {"total": 100}
print(p.get("desconto", 10) + p["total"])`, resposta: "110", porque: "Não há “desconto”: vale a reserva 10; 10 + 100." }] },
    { tipo: "corrigir", texto: "O pedido não tem a chave `desconto` e o programa trava. Conserte para usar **0 quando não houver desconto**.", arquivo: "com_defeito.py", dica: "Leia com `.get(\"desconto\", 0)`.", conceito: "dict_mudar",
      codigo: `pedido = {"total": 100}
desconto = pedido["desconto"]
print("Desconto:", desconto)`, esperado: ["Desconto: 0"],
      solucao: `pedido = {"total": 100}
desconto = pedido.get("desconto", 0)
print("Desconto:", desconto)` },
    { tipo: "escrever", texto: "O estoque é `{\"cafe\": 5, \"pao\": 0}`. Peça `Item: `. Se o item **não existe** no estoque, mostre `Item desconhecido`; se a quantidade é 0, mostre `Sem estoque`; senão, diminua 1 e mostre `Restam: N`.", arquivo: "meu_programa.py",
      inicial: `estoque = {"cafe": 5, "pao": 0}
item = input("Item: ")
# decida o que mostrar
`, cenarios: [{ entradas: ["cafe"], esperado: ["Item: cafe", "Restam: 4"] }, { entradas: ["pao"], esperado: ["Item: pao", "Sem estoque"] }, { entradas: ["suco"], esperado: ["Item: suco", "Item desconhecido"] }], dica: "`if item not in estoque:`, depois `elif estoque[item] == 0:`, senão diminua e mostre.", conceito: "dict_mudar",
      solucao: `estoque = {"cafe": 5, "pao": 0}
item = input("Item: ")
if item not in estoque:
    print("Item desconhecido")
elif estoque[item] == 0:
    print("Sem estoque")
else:
    estoque[item] = estoque[item] - 1
    print("Restam:", estoque[item])` },
    { tipo: "aberta", tag: "sec", titulo: "Aceitar tudo o que chega", texto: "O cadastro copia **todos** os campos que chegam do formulário para o dicionário do usuário. Alguém envia, além do nome, o campo `perfil` com o valor `admin`.", pergunta: "O que pode acontecer? Como o programa deveria tratar os campos recebidos?", modelo: "A pessoa pode **dar a si mesma** o perfil de administrador. O programa deve ter uma **lista de campos permitidos** (por exemplo, só `nome` e `email`) e copiar **apenas esses**, ignorando o resto. Nunca confie nos campos que vêm de fora." },
    { tipo: "quiz", itens: [
      { pergunta: "O que `p[\"obs\"] = \"x\"` faz se `obs` não existe?", opcoes: ["Dá erro de chave", "Cria o par obs", "Ignora a linha", "Troca o primeiro par"], correta: 1, porque: "Atribuir a uma chave nova cria o par.", conceito: "dict_mudar" },
      { pergunta: "O que `p.get(\"z\", 0)` devolve se `z` não existe?", opcoes: ["Um erro de chave", "None, o valor vazio", "0, a reserva dada", "O texto \"z\" mesmo"], correta: 2, porque: "`.get` devolve a reserva, sem erro.", conceito: "dict_mudar" },
      { pergunta: "Como perguntar se a chave `\"qtd\"` existe em `p`?", opcoes: ["\"qtd\" in p, com in", "p.has(\"qtd\"), com has", "p.qtd == True, com ponto", "p[\"qtd\"] == None, com None"], correta: 0, porque: "`chave in dicionario` dá `True` ou `False`.", conceito: "dict_mudar" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como ler com segurança um campo que pode não existir?", conceito: "dict_mudar", modelo: "Perguntando antes com `in` (ou `not in`) ou lendo com `.get(chave, reserva)`, que devolve a reserva em vez de causar `KeyError`." },
  ],
  recuperacao: [
    { p: "Para que serve o `.get(chave, reserva)`?", regex: "(reserva|padrao|valor alternativo|default|sem erro|nao existir|nao existe)", modelo: "Para ler uma chave e devolver um valor de reserva se ela não existir, sem causar erro.", conceito: "dict_mudar" },
    { p: "O que acontece ao atribuir a uma chave nova?", regex: "(cria|acrescenta|adiciona|novo par)", modelo: "O par é criado.", conceito: "dict_mudar" },
    { p: "Por que copiar só campos permitidos ao receber dados de um formulário?", regex: "(admin|perfil|permiss|dar a si|permitidos|lista de campos|confia|privilegio)", modelo: "Para ninguém conseguir enviar campos como `perfil: admin` e ganhar privilégios; só se copia o que é permitido.", conceito: "dict_mudar" },
  ],
});

// ---------- Aula 39: percorrer dicionários ----------
aulas.push({
  id: "0039", modulo: 5, n: 7, slug: "percorrer-dicionarios", titulo: "Passar por todas as fichas: percorrer dicionários",
  resumo: "Mostrar o estoque inteiro, somar as quantidades, achar o que acabou: o `for` também percorre dicionários, com `items()` e `values()`.",
  objetivos: ["Percorrer as chaves de um dicionário.", "Usar `items()` para chave e valor juntos e `values()` para os valores.", "Filtrar um dicionário com `for` e `if`."],
  conceitos: [["dict_percorrer", "Percorrer dicionários: items e values"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Para mostrar o estoque inteiro, o robô precisa passar por todos os pares **item e quantidade**. Como o `for` poderia percorrer um dicionário? Ele entrega a chave, o valor ou os dois?", modelo: "Por padrão o `for` entrega as **chaves**. Para ter chave e valor juntos usa-se `.items()`, e para só os valores, `.values()`." },
    { tipo: "exemplo", arquivo: "estoque.py", texto: "Clique em cada linha.",
      codigo: [["estoque = {\"cafe\": 5, \"pao\": 0, \"suco\": 3}", "Itens e quantidades."], ["for item in estoque:", "Percorrer o dicionário dá as **chaves**, uma por volta."], ["    print(item)", "Mostra cafe, pao e suco."], ["for item, qtd in estoque.items():", "**`.items()`** entrega cada par: `item` recebe a chave e `qtd`, o valor."], ["    print(item, qtd)", "Mostra `cafe 5`, `pao 0`, `suco 3`."], ["print(sum(estoque.values()))", "**`.values()`** são só os valores: `5 + 0 + 3 = 8`."]],
      termos: [[".items()", "entrega cada par (chave, valor) para o `for`."], [".values()", "entrega só os valores."]] },
    { tipo: "executar", texto: "Rode e depois acrescente itens ao estoque.", arquivo: "estoque.py (pode editar)", codigo: `estoque = {"cafe": 5, "pao": 0, "suco": 3}
for item, qtd in estoque.items():
    print(item, qtd)`,
      prever: { enunciado: "Antes de testar:", conceito: "dict_percorrer", itens: [{ codigo: `d = {"a": 1, "b": 2}
for k in d:
    print(k)`, resposta: "b", porque: "O `for` dá as chaves; a última é “b”." }, { codigo: `d = {"a": 1, "b": 2}
print(sum(d.values()))`, resposta: "3", porque: "1 + 2." }] } },
    { tipo: "descobrir", texto: "O programa mostra os itens com quantidade maior que zero.", arquivo: "disponiveis.py", codigo: `for k, v in d.items():
    if v > 0:
        print(k)`,
      execucoes: [{ prefixo: 'd = {"cafe": 5, "pao": 0, "suco": 3}', saida: ["cafe", "suco"] }, { prefixo: 'd = {"pao": 0}', saida: [] }, { prefixo: 'd = {"leite": 1}', saida: ["leite"] }], colunas: ["Dicionário", "O que aparece"],
      pergunta: "O que `k` e `v` recebem a cada volta? Por que o “pao” não aparece?", dicas: ["Quantos pares existem em `d`? Quantas voltas o laço dá?", "Qual é o valor de “pao” e o que o `if` pergunta?"],
      explicacao: "A cada volta, `k` recebe a **chave** e `v` o **valor** do par. O “pao” tem valor 0, e o `if v > 0` é falso, então o `print` não roda para ele.", conceito: "dict_percorrer" },
    { tipo: "prever", conceito: "dict_percorrer", itens: [
      { codigo: `estoque = {"cafe": 5, "pao": 0}
c = 0
for k, v in estoque.items():
    if v == 0:
        c = c + 1
print(c)`, resposta: "1", porque: "Só o “pao” tem quantidade 0." },
      { codigo: `d = {"a": 10, "b": 20}
t = 0
for v in d.values():
    t = t + v
print(t)`, resposta: "30", porque: "10 + 20." },
      { codigo: `d = {"x": 1, "y": 2}
for k, v in d.items():
    print(k, v * 2)`, resposta: "y 4", porque: "A última volta tem k = “y” e v = 2; o dobro é 4." }] },
    { tipo: "corrigir", texto: "O total do estoque deveria ser 8, mas o programa dá erro porque está somando as chaves (textos). Conserte **uma linha**.", arquivo: "com_defeito.py", dica: "Para somar as quantidades, percorra os **valores**.", conceito: "dict_percorrer",
      codigo: `estoque = {"cafe": 5, "pao": 0, "suco": 3}
total = 0
for item in estoque:
    total = total + item
print("Total:", total)`, esperado: ["Total: 8"],
      solucao: `estoque = {"cafe": 5, "pao": 0, "suco": 3}
total = 0
for qtd in estoque.values():
    total = total + qtd
print("Total:", total)` },
    { tipo: "escrever", texto: "Com `estoque = {\"cafe\": 5, \"pao\": 0, \"suco\": 0, \"leite\": 2}`, mostre, um por linha, os itens **esgotados** (quantidade 0) e depois `Esgotados: N`.", arquivo: "meu_programa.py",
      inicial: `estoque = {"cafe": 5, "pao": 0, "suco": 0, "leite": 2}
# mostre os esgotados e a contagem
`, esperado: ["pao", "suco", "Esgotados: 2"], dica: "`for item, qtd in estoque.items():` com um `if qtd == 0:` que mostra e conta.", conceito: "dict_percorrer",
      solucao: `estoque = {"cafe": 5, "pao": 0, "suco": 0, "leite": 2}
esgotados = 0
for item, qtd in estoque.items():
    if qtd == 0:
        print(item)
        esgotados = esgotados + 1
print("Esgotados:", esgotados)` },
    { tipo: "aberta", tag: "sec", titulo: "Mostrar a ficha toda", texto: "Para “listar usuários”, o programa percorre o dicionário de cada usuário e imprime **todos** os campos: nome, e-mail, hash da senha e perfil.", pergunta: "Qual é o problema? Como o laço deveria escolher o que mostrar?", modelo: "Mostra campos que não deveriam sair, como o hash da senha. O laço deve usar uma **lista de campos públicos** (por exemplo, só nome e perfil) e mostrar apenas esses. Escolher o que sai é parte da proteção de dados." },
    { tipo: "quiz", itens: [
      { pergunta: "O que o `for k in d:` entrega a cada volta?", opcoes: ["Os valores de d", "As chaves de d", "Os pares de d", "O tamanho de d"], correta: 1, porque: "Percorrer um dicionário dá as chaves.", conceito: "dict_percorrer" },
      { pergunta: "Como obter chave e valor juntos?", opcoes: ["d.values(), os valores", "d.keys(), as chaves", "d.items(), os pares", "d.all(), tudo dele"], correta: 2, porque: "`.items()` entrega cada par (chave, valor).", conceito: "dict_percorrer" },
      { pergunta: "Como somar todas as quantidades de um estoque?", opcoes: ["sum(estoque.values())", "sum(estoque.keys())", "sum(estoque.items())", "sum(estoque.get())"], correta: 0, porque: "As quantidades são os valores.", conceito: "dict_percorrer" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como percorrer um dicionário para usar chave e valor?", conceito: "dict_percorrer", modelo: "Com `for chave, valor in dicionario.items():`. Sem `.items()`, o `for` entrega só as chaves; `.values()` entrega só os valores." },
  ],
  recuperacao: [
    { p: "O que o `for` entrega ao percorrer um dicionário?", regex: "(chave)", modelo: "As chaves.", conceito: "dict_percorrer" },
    { p: "Para que serve o `.items()`?", regex: "(pares|cada par|chave e valor|chave e o valor|chave.valor|os dois|chave, valor)", modelo: "Entrega cada par chave-valor ao `for`.", conceito: "dict_percorrer" },
    { p: "Por que não imprimir todos os campos de cada usuário?", regex: "(hash|senha|sensiv|privad|publico|expo|escolher|campos)", modelo: "Porque campos como o hash da senha não devem sair; mostram-se só os campos públicos.", conceito: "dict_percorrer" },
  ],
});

// ---------- Aula 40: lista de dicionários ----------
aulas.push({
  id: "0040", modulo: 5, n: 8, slug: "lista-de-dicionarios", titulo: "O carrinho de compras: lista de dicionários",
  resumo: "Um carrinho tem vários itens, e cada item tem nome, preço e quantidade. Juntando lista e dicionário, o robô representa dados do mundo real.",
  objetivos: ["Representar vários registros como uma lista de dicionários.", "Percorrer a lista e ler campos de cada item.", "Calcular totais sobre registros."],
  conceitos: [["lista_dicts", "Lista de dicionários (registros)"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Um carrinho de e-commerce tem vários itens, e cada item tem nome, preço e quantidade. Como combinar **lista** e **dicionário** para representar isso? O que cada um faria?", modelo: "A **lista** guarda os itens (vários, em ordem) e cada item é um **dicionário** com seus campos (`nome`, `preco`, `qtd`). Essa combinação, uma lista de dicionários, é a forma mais comum de representar tabelas de dados em Python." },
    { tipo: "exemplo", arquivo: "carrinho.py", texto: "Clique em cada linha.",
      codigo: [["carrinho = [", "Uma lista; os itens vão nas linhas seguintes."], ["    {\"nome\": \"cafe\", \"preco\": 4.5, \"qtd\": 2},", "O primeiro item: um dicionário com três campos."], ["    {\"nome\": \"pao\", \"preco\": 3.0, \"qtd\": 1},", "O segundo item."], ["]", "Fim da lista."], ["total = 0", "O acumulador."], ["for item in carrinho:", "A cada volta, `item` é **um dicionário**."], ["    total = total + item[\"preco\"] * item[\"qtd\"]", "Lê dois campos e acumula: `4.5 * 2 + 3.0 * 1`."], ["print(total)", "`12.0`."]],
      termos: [["Registro", "um conjunto de campos sobre uma coisa (como um item do carrinho), em geral um dicionário."]] },
    { tipo: "executar", texto: "Rode e depois acrescente um item ao carrinho.", arquivo: "carrinho.py (pode editar)", codigo: `carrinho = [
    {"nome": "cafe", "preco": 4.5, "qtd": 2},
    {"nome": "pao", "preco": 3.0, "qtd": 1},
]
total = 0
for item in carrinho:
    total = total + item["preco"] * item["qtd"]
print(total)`,
      prever: { enunciado: "Antes de testar:", conceito: "lista_dicts", itens: [{ codigo: `c = [{"n": "a", "p": 2}, {"n": "b", "p": 5}]
print(c[1]["n"])`, resposta: "b", porque: "`c[1]` é o segundo dicionário; `[\"n\"]` é o nome." }, { codigo: `c = [{"p": 2}, {"p": 5}]
print(len(c))`, resposta: "2", porque: "Dois registros." }] } },
    { tipo: "descobrir", texto: "O programa calcula o total de um carrinho.", arquivo: "total.py", codigo: `total = 0
for item in carrinho:
    total = total + item["preco"] * item["qtd"]
print(total)`,
      execucoes: [{ prefixo: 'carrinho = [{"preco": 4.5, "qtd": 2}, {"preco": 3.0, "qtd": 1}]', saida: ["12.0"] }, { prefixo: 'carrinho = [{"preco": 10, "qtd": 0}]', saida: ["0"] }, { prefixo: "carrinho = []", saida: ["0"] }], colunas: ["Carrinho", "Total"],
      pergunta: "Por que o carrinho vazio e o item com quantidade 0 dão total 0? O que cada `item` é a cada volta?", dicas: ["Com `carrinho = []`, o laço dá quantas voltas?", "Qual é o resultado de `10 * 0`?"],
      explicacao: "Com o carrinho vazio o laço não dá nenhuma volta e o acumulador continua em 0. Com `qtd` 0, a conta `10 * 0` dá 0 e nada é somado. A cada volta, `item` é **um dicionário** inteiro, de onde se leem os campos pelas chaves.", conceito: "lista_dicts" },
    { tipo: "prever", conceito: "lista_dicts", itens: [
      { codigo: `c = [{"nome": "cafe", "qtd": 2}, {"nome": "pao", "qtd": 3}]
t = 0
for item in c:
    t = t + item["qtd"]
print(t)`, resposta: "5", porque: "2 + 3 unidades." },
      { codigo: `c = [{"nome": "cafe", "preco": 4.5}, {"nome": "pao", "preco": 3.0}]
for item in c:
    print(item["nome"])`, resposta: "pao", porque: "A última volta mostra o nome do segundo item." },
      { codigo: `c = [{"preco": 2, "qtd": 3}, {"preco": 4, "qtd": 1}]
print(c[0]["preco"] * c[0]["qtd"])`, resposta: "6", porque: "O primeiro item: 2 × 3." }] },
    { tipo: "corrigir", texto: "O total do carrinho deveria ser 9.0 (4.5 × 2), mas está ignorando a quantidade. Conserte **uma linha**.", arquivo: "com_defeito.py", dica: "Multiplique o preço pela quantidade do mesmo item.", conceito: "lista_dicts",
      codigo: `carrinho = [{"nome": "cafe", "preco": 4.5, "qtd": 2}]
total = 0
for item in carrinho:
    total = total + item["preco"]
print(total)`, esperado: ["9.0"],
      solucao: `carrinho = [{"nome": "cafe", "preco": 4.5, "qtd": 2}]
total = 0
for item in carrinho:
    total = total + item["preco"] * item["qtd"]
print(total)` },
    { tipo: "escrever", texto: "Dado o carrinho abaixo, mostre `Itens: 3`, `Unidades: 6` e `Total: R$ 23.50`.", arquivo: "meu_programa.py",
      inicial: `carrinho = [
    {"nome": "cafe", "preco": 4.5, "qtd": 2},
    {"nome": "pao", "preco": 3.0, "qtd": 3},
    {"nome": "suco", "preco": 5.5, "qtd": 1},
]
# mostre itens, unidades e total
`, esperado: ["Itens: 3", "Unidades: 6", "Total: R$ 23.50"], dica: "`len(carrinho)` para os itens; acumule `item[\"qtd\"]` para as unidades e `preco * qtd` para o total.", conceito: "lista_dicts",
      solucao: `carrinho = [
    {"nome": "cafe", "preco": 4.5, "qtd": 2},
    {"nome": "pao", "preco": 3.0, "qtd": 3},
    {"nome": "suco", "preco": 5.5, "qtd": 1},
]
unidades = 0
total = 0
for item in carrinho:
    unidades = unidades + item["qtd"]
    total = total + item["preco"] * item["qtd"]
print("Itens:", len(carrinho))
print("Unidades:", unidades)
print(f"Total: R$ {total:.2f}")` },
    { tipo: "aberta", tag: "sec", titulo: "O preço vem de quem?", texto: "O navegador do cliente envia ao servidor o carrinho completo, inclusive o campo `preco` de cada item, e o servidor calcula o total com esses preços.", pergunta: "Qual é a fraude possível? De onde o servidor deveria tirar o preço?", modelo: "O cliente pode **alterar o preço** antes de enviar (um café por R$ 0,01). O servidor deve aceitar do cliente só o **identificador do produto e a quantidade**, e buscar o preço na **sua própria tabela de preços**, que o cliente não controla." },
    { tipo: "quiz", itens: [
      { pergunta: "O que é uma lista de dicionários?", opcoes: ["Vários registros em ordem", "Um dicionário com listas", "Uma lista só de números", "Um erro de tipo comum"], correta: 0, porque: "Cada item da lista é um dicionário, que representa um registro.", conceito: "lista_dicts" },
      { pergunta: "Em `for item in carrinho:`, o que é `item`?", opcoes: ["Um número da lista", "Um texto com o nome", "Um dicionário inteiro", "A posição do item"], correta: 2, porque: "Cada volta entrega um dicionário (um registro).", conceito: "lista_dicts" },
      { pergunta: "Como ler o preço do segundo item de `c`?", opcoes: ["c[\"preco\"][1], invertido", "c[1][\"preco\"], posição e chave", "c.preco[1], com ponto", "c(1)(\"preco\"), com parênteses"], correta: 1, porque: "Primeiro a posição na lista, depois a chave no dicionário.", conceito: "lista_dicts" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como representar e percorrer um carrinho com vários itens?", conceito: "lista_dicts", modelo: "Como uma lista de dicionários, um por item (`nome`, `preco`, `qtd`). Percorre-se com `for item in carrinho:` e lêem-se os campos de cada `item` pelas chaves, acumulando totais." },
  ],
  recuperacao: [
    { p: "Como representar vários itens, cada um com vários campos?", regex: "(lista);;(dicionario)", modelo: "Com uma lista de dicionários: um dicionário por item.", conceito: "lista_dicts" },
    { p: "Como ler o preço do segundo item de uma lista `c` de dicionários?", regex: "(c\\[1\\]|posicao 1|segundo);;(preco)", modelo: "`c[1][\"preco\"]`.", conceito: "lista_dicts" },
    { p: "Por que o servidor não deve usar o preço enviado pelo cliente?", regex: "(altera|fraude|falso|adulter|manipul|propria tabela|controla|nao confi)", modelo: "Porque o cliente pode alterar o preço; o servidor consulta a própria tabela de preços.", conceito: "lista_dicts" },
  ],
});

// ---------- Aula 41: filtrar e resumir ----------
aulas.push({
  id: "0041", modulo: 5, n: 9, slug: "filtrar-resumir", titulo: "Filtrar e resumir: listas novas a partir de listas",
  resumo: "Só os pedidos grandes, quantos são, qual a média: hoje o robô monta listas novas só com o que interessa e resume os dados.",
  objetivos: ["Montar uma lista nova com os itens que passam num filtro.", "Resumir com `len`, `sum` e média.", "Cuidar do caso em que nada passa no filtro."],
  conceitos: [["filtrar_resumir", "Filtrar e resumir listas"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Da lista de pedidos do dia, o robô quer só os **acima de R$ 10**, e depois saber quantos são e qual a média deles. Como montar uma lista nova só com os pedidos que passam nesse filtro? O que pode dar problema se **nenhum** passar?", modelo: "Começa com uma lista **vazia**, percorre os pedidos e, com um `if`, usa `append` só nos que passam. Se nenhum passar, a lista fica vazia e uma **média** dividiria por zero: é preciso tratar esse caso." },
    { tipo: "exemplo", arquivo: "filtrar.py", texto: "Clique em cada linha.",
      codigo: [["pedidos = [4.5, 12.0, 9.0, 15.5]", "Os valores do dia."], ["grandes = []", "Uma lista **vazia** que vai receber os escolhidos."], ["for p in pedidos:", "Percorre cada pedido."], ["    if p > 10:", "O **filtro**."], ["        grandes.append(p)", "Só os que passam entram na lista nova."], ["print(len(grandes))", "Quantos passaram: `2`."], ["print(sum(grandes) / len(grandes))", "A média dos escolhidos: `13.75`. (Dividir por `len(grandes)` só funciona se a lista não estiver vazia.)"]],
      termos: [["Filtrar", "criar uma lista nova só com os itens que passam numa condição."], ["Resumir", "reduzir os dados a um número (total, média, contagem)."]] },
    { tipo: "executar", texto: "Rode e depois mude o limite de 10 para 5.", arquivo: "filtrar.py (pode editar)", codigo: `pedidos = [4.5, 12.0, 9.0, 15.5]
grandes = []
for p in pedidos:
    if p > 10:
        grandes.append(p)
print(len(grandes))
print(sum(grandes) / len(grandes))`,
      prever: { enunciado: "Antes de testar:", conceito: "filtrar_resumir", itens: [{ codigo: `nums = [1, 2, 3, 4, 5, 6]
pares = []
for n in nums:
    if n % 2 == 0:
        pares.append(n)
print(len(pares))`, resposta: "3", porque: "Pares: 2, 4 e 6." }, { codigo: `nums = [10, 20, 30]
print(sum(nums) / len(nums))`, resposta: "20.0", porque: "60 / 3." }] } },
    { tipo: "descobrir", texto: "O programa guarda os valores acima de 10 e mostra quantos são.", arquivo: "filtro_conta.py", codigo: `grandes = []
for p in pedidos:
    if p > 10:
        grandes.append(p)
print(len(grandes))`,
      execucoes: [{ prefixo: "pedidos = [5, 20, 30]", saida: ["2"] }, { prefixo: "pedidos = [1, 2]", saida: ["0"] }, { prefixo: "pedidos = [11]", saida: ["1"] }], colunas: ["Pedidos", "Quantos passaram"],
      pergunta: "O que acontece quando nenhum pedido passa no filtro? Por que isso importa se formos calcular uma média?", dicas: ["Com `[1, 2]`, a lista `grandes` fica com quantos itens?", "Qual é o resultado de dividir algo por 0?"],
      explicacao: "A lista `grandes` fica **vazia** (tamanho 0). Se calcularmos `sum(grandes) / len(grandes)`, estaremos dividindo por 0 e o programa dá `ZeroDivisionError`. Por isso é preciso checar se há algum item antes de calcular a média.", conceito: "filtrar_resumir" },
    { tipo: "prever", conceito: "filtrar_resumir", itens: [
      { codigo: `v = [3, 8, 5, 9]
altos = []
for n in v:
    if n >= 5:
        altos.append(n)
print(sum(altos))`, resposta: "22", porque: "8 + 5 + 9." },
      { codigo: `nomes = ["Ana", "Beto", "Alice"]
com_a = []
for n in nomes:
    if n[0] == "A":
        com_a.append(n)
print(len(com_a))`, resposta: "2", porque: "Ana e Alice começam com “A” (`n[0]` é a primeira letra)." },
      { codigo: `v = []
print(len(v))`, resposta: "0", porque: "Uma lista vazia tem tamanho 0." }] },
    { tipo: "corrigir", texto: "Quando não há pedidos grandes, o programa trava com divisão por zero. Faça-o mostrar `Sem pedidos grandes`.", arquivo: "com_defeito.py", dica: "Cheque se a lista `grandes` tem itens (`if grandes:`) antes de dividir.", conceito: "filtrar_resumir",
      codigo: `pedidos = [4.5, 3.0]
grandes = []
for p in pedidos:
    if p > 10:
        grandes.append(p)
print("Média:", sum(grandes) / len(grandes))`, esperado: ["Sem pedidos grandes"],
      solucao: `pedidos = [4.5, 3.0]
grandes = []
for p in pedidos:
    if p > 10:
        grandes.append(p)
if grandes:
    print("Média:", sum(grandes) / len(grandes))
else:
    print("Sem pedidos grandes")` },
    { tipo: "escrever", texto: "Peça `Quantos? ` e depois essa quantidade de `Pedido: ` (inteiros). Guarde numa **lista** só os pedidos **acima de 10** e mostre `Acima de 10: N` e `Soma: S`.", arquivo: "meu_programa.py",
      inicial: `n = int(input("Quantos? "))
# leia os pedidos e guarde numa lista só os acima de 10
`, cenarios: [{ entradas: ["3", "5", "20", "30"], esperado: ["Quantos? 3", "Pedido: 5", "Pedido: 20", "Pedido: 30", "Acima de 10: 2", "Soma: 50"] }, { entradas: ["2", "1", "2"], esperado: ["Quantos? 2", "Pedido: 1", "Pedido: 2", "Acima de 10: 0", "Soma: 0"] }, { entradas: ["1", "11"], esperado: ["Quantos? 1", "Pedido: 11", "Acima de 10: 1", "Soma: 11"] }], dica: "Crie `grandes = []` antes do laço, leia com `int(input(\"Pedido: \"))` e use `append` quando `valor > 10`.", conceito: "filtrar_resumir",
      solucao: `n = int(input("Quantos? "))
grandes = []
for i in range(n):
    valor = int(input("Pedido: "))
    if valor > 10:
        grandes.append(valor)
print("Acima de 10:", len(grandes))
print("Soma:", sum(grandes))` },
    { tipo: "aberta", tag: "sec", titulo: "Excluir de verdade", texto: "Um cliente pede para ter seus dados apagados. O programa o tira da lista de clientes na memória, mas uma cópia dele continua num arquivo de backup e num relatório antigo.", pergunta: "O dado foi realmente eliminado? O que isso mostra sobre filtrar e excluir dados pessoais?", modelo: "**Não**: a lista na memória é só uma das cópias. Excluir de verdade exige remover o dado de **todos os lugares** (banco, arquivos, backups, relatórios), dentro de um prazo e com registro. Filtrar para “não mostrar” é diferente de eliminar." },
    { tipo: "quiz", itens: [
      { pergunta: "Como montar uma lista só com os itens que passam num filtro?", opcoes: ["Lista vazia, if e append", "Lista cheia, if e remove", "Lista vazia, for e sum", "Lista cheia, while e pop"], correta: 0, porque: "Começa-se vazia e acrescenta-se, com `append`, só quem passa no `if`.", conceito: "filtrar_resumir" },
      { pergunta: "O que acontece com `sum([]) / len([])`?", opcoes: ["Dá 0, uma lista vazia", "Dá None, sem valor", "Dá erro, divide por 0", "Dá 1, o neutro mesmo"], correta: 2, porque: "`len([])` é 0, e dividir por 0 causa `ZeroDivisionError`.", conceito: "filtrar_resumir" },
      { pergunta: "Como calcular a média de `v`?", opcoes: ["sum(v) * len(v), vezes", "len(v) / sum(v), invertido", "sum(v) / len(v), soma e tamanho", "max(v) / min(v), extremos"], correta: 2, porque: "A média é a soma dividida pela quantidade.", conceito: "filtrar_resumir" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como filtrar uma lista e por que cuidar do caso em que nada passa?", conceito: "filtrar_resumir", modelo: "Cria-se uma lista vazia e, num laço, acrescenta-se com `append` só o que passa no `if`. Se nada passar, a lista fica vazia, e calcular a média dividiria por zero: por isso se confere antes se há itens." },
  ],
  recuperacao: [
    { p: "Como filtrar uma lista?", regex: "(vazia|nova lista);;(append|acrescent|adiciona);;(if|condicao)", modelo: "Cria-se uma lista vazia e acrescenta-se com `append` só os itens que passam no `if`.", conceito: "filtrar_resumir" },
    { p: "O que dá `sum(v) / len(v)` quando `v` é vazia?", regex: "(zero|erro|zerodivision|divis)", modelo: "Erro de divisão por zero (`ZeroDivisionError`).", conceito: "filtrar_resumir" },
    { p: "Tirar um cliente de uma lista elimina os dados dele de verdade?", regex: "(nao);;(backup|copia|todos os lugares|outros|arquivo)", modelo: "Não: cópias podem existir em backups, arquivos e relatórios; é preciso remover de todos os lugares.", conceito: "filtrar_resumir" },
  ],
});

// ---------- Aula 42: mini-projeto ----------
aulas.push({
  id: "0042", modulo: 5, n: 10, slug: "mini-projeto", titulo: "Mini-projeto: o carrinho de compras",
  resumo: "Hora de juntar listas e dicionários num carrinho de verdade, com catálogo, total e desconto. Depois, os dicionários protegendo um sistema: usuários e permissões.",
  minutos: 45,
  objetivos: ["Combinar catálogo (dicionário), carrinho (lista de dicionários) e laço num programa só.", "Resolver o exercício final sem usar a dica.", "Aplicar dicionários a um problema novo: quem pode fazer o quê."],
  conceitos: [],
  secoes: [
    { tipo: "aquecimento", titulo: "Planeje os dados", pergunta: "O caixa tem um catálogo de preços (café, pão, suco) e vai ler itens até a pessoa digitar `fim`. Que estruturas você criaria (listas, dicionários) e para quê? O que o programa faz com um item que não existe no catálogo?", minimo: 40, modelo: "Um **dicionário** para o catálogo (`nome: preço`), uma **lista** para o carrinho (e cada item pode ser um dicionário com `nome` e `preco`). Para um item desconhecido, o programa avisa (`Item desconhecido`) e **não o coloca** no carrinho. No fim: contar, somar, achar o mais caro e aplicar o desconto se couber." },
    { tipo: "exemplo", titulo: "Um esqueleto de referência", arquivo: "esqueleto.py", entradas: ["suco", "fim"], texto: "Mesma estrutura (catálogo, laço até “fim”, carrinho, resumo), com um tema menor. Use como mapa.",
      codigo: [["catalogo = {\"suco\": 5.5}", "O catálogo: um dicionário de preços."], ["carrinho = []", "A lista de itens escolhidos."], ["item = input(\"Item: \")", "A primeira leitura."], ["while item != \"fim\":", "Repete até “fim”."], ["    if item in catalogo:", "Confere se existe no catálogo."], ["        carrinho.append({\"nome\": item, \"preco\": catalogo[item]})", "Guarda um registro com nome e preço."], ["    else:", "Item que não existe."], ["        print(\"Item desconhecido:\", item)", "Avisa."], ["    item = input(\"Item: \")", "Lê o próximo, dentro do laço."], ["print(\"Itens:\", len(carrinho))", "Resume."]] },
    { tipo: "escrever", titulo: "Exercício final (sem dica)", final: true, minutos: 15, texto: "O catálogo é `{\"cafe\": 4.5, \"pao\": 3.0, \"suco\": 5.5}`. Leia `Item: ` até `fim`. Para item existente, guarde no carrinho (lista de dicionários com `nome` e `preco`); senão mostre `Item desconhecido: NOME`. No fim mostre `Itens: N`, `Total: R$ X.XX` e, se houver itens, `Mais caro: NOME`. Se o total for **20 ou mais**, mostre `Desconto: R$ D.DD` (10%) e `A pagar: R$ P.PP`; senão, só `A pagar: R$ P.PP`.", arquivo: "carrinho.py",
      inicial: `catalogo = {"cafe": 4.5, "pao": 3.0, "suco": 5.5}
# leia os itens até "fim" e mostre o resumo
`, cenarios: [{ entradas: ["cafe", "pao", "fim"], esperado: ["Item: cafe", "Item: pao", "Item: fim", "Itens: 2", "Total: R$ 7.50", "Mais caro: cafe", "A pagar: R$ 7.50"] }, { entradas: ["suco", "suco", "suco", "cafe", "fim"], esperado: ["Item: suco", "Item: suco", "Item: suco", "Item: cafe", "Item: fim", "Itens: 4", "Total: R$ 21.00", "Mais caro: suco", "Desconto: R$ 2.10", "A pagar: R$ 18.90"] }, { entradas: ["agua", "cafe", "fim"], esperado: ["Item: agua", "Item desconhecido: agua", "Item: cafe", "Item: fim", "Itens: 1", "Total: R$ 4.50", "Mais caro: cafe", "A pagar: R$ 4.50"] }, { entradas: ["fim"], esperado: ["Item: fim", "Itens: 0", "Total: R$ 0.00", "A pagar: R$ 0.00"] }],
      dica: "Use `while item != \"fim\":` com `if item in catalogo:`. Guarde `{\"nome\": item, \"preco\": catalogo[item]}`. Para o mais caro, percorra o carrinho guardando o maior preço visto.", conceito: ["dict_basico", "dict_mudar", "lista_dicts", "lista_metodos", "filtrar_resumir"],
      solucao: `catalogo = {"cafe": 4.5, "pao": 3.0, "suco": 5.5}
carrinho = []
item = input("Item: ")
while item != "fim":
    if item in catalogo:
        carrinho.append({"nome": item, "preco": catalogo[item]})
    else:
        print("Item desconhecido:", item)
    item = input("Item: ")
total = 0
mais_caro = None
maior_preco = 0
for c in carrinho:
    total = total + c["preco"]
    if c["preco"] > maior_preco:
        maior_preco = c["preco"]
        mais_caro = c["nome"]
print("Itens:", len(carrinho))
print(f"Total: R$ {total:.2f}")
if mais_caro is not None:
    print("Mais caro:", mais_caro)
if total >= 20:
    print(f"Desconto: R$ {total * 0.1:.2f}")
    print(f"A pagar: R$ {total * 0.9:.2f}")
else:
    print(f"A pagar: R$ {total:.2f}")` },
    { tipo: "escrever", titulo: "Problema novo: quem pode fazer o quê", transfer: true, minutos: 12, texto: "Outro contexto, os mesmos dicionários. Os usuários e as permissões são `usuarios = {\"ana\": \"admin\", \"beto\": \"caixa\", \"caio\": \"estagio\"}` e `permissoes = {\"admin\": [\"ler\", \"editar\", \"apagar\"], \"caixa\": [\"ler\", \"editar\"], \"estagio\": [\"ler\"]}`. Peça `Usuário: ` e `Ação: `. Mostre `Usuário desconhecido` se o usuário não existe, `Permitido` se o perfil dele tem a ação, ou `Negado`.", arquivo: "acesso.py",
      inicial: `usuarios = {"ana": "admin", "beto": "caixa", "caio": "estagio"}
permissoes = {"admin": ["ler", "editar", "apagar"], "caixa": ["ler", "editar"], "estagio": ["ler"]}
# leia o usuário e a ação e decida
`, cenarios: [{ entradas: ["ana", "apagar"], esperado: ["Usuário: ana", "Ação: apagar", "Permitido"] }, { entradas: ["beto", "apagar"], esperado: ["Usuário: beto", "Ação: apagar", "Negado"] }, { entradas: ["caio", "ler"], esperado: ["Usuário: caio", "Ação: ler", "Permitido"] }, { entradas: ["caio", "editar"], esperado: ["Usuário: caio", "Ação: editar", "Negado"] }, { entradas: ["zeca", "ler"], esperado: ["Usuário: zeca", "Ação: ler", "Usuário desconhecido"] }],
      dica: "`perfil = usuarios[usuario]` e depois `if acao in permissoes[perfil]:`. Confira antes se o usuário existe.", conceito: ["dict_basico", "dict_mudar", "lista_metodos"],
      solucao: `usuarios = {"ana": "admin", "beto": "caixa", "caio": "estagio"}
permissoes = {"admin": ["ler", "editar", "apagar"], "caixa": ["ler", "editar"], "estagio": ["ler"]}
usuario = input("Usuário: ")
acao = input("Ação: ")
if usuario not in usuarios:
    print("Usuário desconhecido")
else:
    perfil = usuarios[usuario]
    if acao in permissoes[perfil]:
        print("Permitido")
    else:
        print("Negado")` },
    { tipo: "aberta", tag: "sec", titulo: "Negar por padrão, de novo", texto: "No programa de acesso, uma ação que **não está** na lista do perfil é negada. Um colega propôs inverter: manter uma lista do que cada perfil **não pode** fazer e permitir todo o resto.", pergunta: "Por que a primeira abordagem (listar o permitido) é mais segura que a segunda (listar o proibido)?", modelo: "Com a lista de **permitidos**, qualquer ação nova ou esquecida é **negada** até alguém liberá-la. Com a de **proibidos**, uma ação nova ou esquecida fica **liberada** para todos por engano. Em segurança, o padrão deve ser negar." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual estrutura guarda melhor o catálogo `nome → preço`?", opcoes: ["Um dicionário de preços", "Uma lista só de preços", "Um texto bem grande", "Um número de itens"], correta: 0, porque: "Chave (nome) e valor (preço) são exatamente um dicionário.", conceito: "dict_basico" },
      { pergunta: "Como o carrinho guarda vários itens com campos?", opcoes: ["Um único dicionário grande", "Uma lista de dicionários", "Um único texto longo", "Um dicionário de números"], correta: 1, porque: "Um dicionário por item, todos numa lista.", conceito: "lista_dicts" },
      { pergunta: "Por que checar `item in catalogo` antes de ler o preço?", opcoes: ["Para evitar o KeyError", "Para deixar mais rápido", "Para usar menos memória", "Para o preço ficar float"], correta: 0, porque: "Ler uma chave inexistente causa `KeyError`.", conceito: "dict_mudar" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: descreva como o seu programa do carrinho funciona, do início ao fim.", conceito: "lista_dicts", modelo: "Cria o catálogo (dicionário) e o carrinho (lista). Lê itens até “fim”: se existe no catálogo, guarda um registro com nome e preço; senão avisa. No fim conta os itens, soma o total, acha o mais caro e aplica o desconto de 10% se o total for 20 ou mais." },
  ],
  recuperacao: [
    { p: "Que estruturas o carrinho com catálogo usa?", regex: "(dicionario);;(lista)", modelo: "Um dicionário para o catálogo e uma lista de dicionários para o carrinho.", conceito: "lista_dicts" },
    { p: "Por que conferir se o item existe no catálogo antes de ler o preço?", regex: "(keyerror|erro|nao existe|travar|quebr)", modelo: "Para evitar `KeyError` com itens que não existem.", conceito: "dict_mudar" },
    { p: "Por que a lista de ações permitidas é mais segura que a de proibidas?", regex: "(negar|padrao|esquec|novo|nova acao|liberad|seguro)", modelo: "Porque o que não foi liberado é negado; com a lista de proibidas, uma ação nova ou esquecida ficaria liberada.", conceito: "dict_basico" },
  ],
});

export default aulas;
