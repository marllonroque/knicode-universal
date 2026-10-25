// Sondas da recuperação do módulo 5: respostas certas (com outras palavras) devem passar; respostas erradas ou vagas devem falhar.
export default [
  // 0033: listas
  { aula: "0033", q: 1,
    passa: ["A posição 0", "A posição 0, não a posição 1", "Começa em 0, não em 1", "A primeira posição é a zero", "posição zero"],
    falha: ["a primeira é 1, nunca zero", "10", "A primeira posição é 1", "Começa em 1, não em 0", "o primeiro item fica na posição um"] },
  { aula: "0033", q: 2,
    passa: ["O último item da lista", "o ultimo", "devolve o último elemento"],
    falha: ["o penúltimo", "o primeiro item", "Não é o último, é o primeiro"] },
  { aula: "0033", q: 3,
    passa: ["Porque expõe os CPFs de todos os clientes", "só enviar o necessário", "qualquer pessoa pode inspecionar a lista inteira", "porque vaza dados de quem não pediu"],
    falha: ["é necessário enviar tudo", "para ficar mais rápido", "porque sim"] },

  // 0034: mudando listas
  { aula: "0034", q: 2,
    passa: ["Com `\"pao\" in fila`", "usando o operador in", "if 'pao' in fila", "percorrendo a lista com um for"],
    falha: ["com `fila.index('pao')`", "usando fila.count", "olhando a lista", "com um método que pergunta"] },

  // 0036: sorted
  { aula: "0036", q: 1,
    passa: ["devolve uma cópia ordenada e a original não muda", "ordena sem mudar a lista original", "cria uma lista nova em ordem crescente e a original continua igual", "Retorna uma nova lista ordenada; a original fica intacta"],
    falha: ["ordena a lista original", "ordena a própria lista", "ordena e muda a original", "devolve uma nova lista e também muda a original", "deixa tudo igual"] },

  // 0037: dicionários
  { aula: "0037", q: 1,
    passa: ["O rótulo do valor", "o nome do campo", "uma etiqueta que identifica a informação", "O rótulo de uma informação"],
    falha: ["um número", "o valor guardado", "uma lista de itens"] },
  { aula: "0037", q: 2,
    passa: ["Dá KeyError", "dá erro de chave", "o programa trava com erro", "key error"],
    falha: ["IndexError", "dá um IndexError", "ValueError", "nada acontece"] },
  { aula: "0037", q: 3,
    passa: ["porque quem acessar lê a senha", "guarda-se um hash", "a senha fica exposta e pode ser reutilizada em outros sites", "pode vazar e ser roubada"],
    falha: ["precisa criptografar", "porque tem que usar criptografia", "para ficar mais bonito"] },

  // 0039: percorrer dicionários
  { aula: "0039", q: 1,
    passa: ["as chaves", "A chave de cada par", "entrega a chave, não o valor", "recebe a chave"],
    falha: ["os valores, não as chaves", "as chaves e os valores", "os pares", "o valor"] },

  // 0040: lista de dicionários
  { aula: "0040", q: 1,
    passa: ["uma lista de dicionários", "uma lista em que cada item é um dicionário", "dicionários dentro de uma lista", "um dicionário por item, todos numa lista"],
    falha: ["um dicionário com listas", "um dicionário de listas", "uma lista só", "só um dicionário"] },

  // 0041: média de lista vazia
  { aula: "0041", q: 2,
    passa: ["dá erro de divisão por zero", "ZeroDivisionError", "erro, porque divide por zero", "dá erro"],
    falha: ["dá zero", "o resultado é zero", "dá 0", "não dá erro", "vale zero"] },

  // 0042: permitidos x proibidos
  { aula: "0042", q: 3,
    passa: ["o que não foi liberado é negado", "o padrão é negar", "uma ação nova ou esquecida fica bloqueada", "com a lista de proibidas, uma ação esquecida ficaria liberada"],
    falha: ["a de proibidas é mais segura", "é mais segura e pronto", "porque é melhor"] },
];
