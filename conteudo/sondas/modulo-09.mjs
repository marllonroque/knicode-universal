// Sondas da recuperação do Módulo 9 (aulas 0067 a 0074): respostas certas devem passar; respostas erradas ou vagas devem falhar.
// q = número da pergunta na recuperação, a partir de 1.
export default [
  // 0067: partes do pedido e dados sensíveis
  { aula: "0067", q: 2,
    passa: ["O verbo, o tema e para que serve", "ação, assunto e finalidade", "O verbo, o assunto e o propósito do pedido", "a ação (verbo), o assunto (sobre o quê) e para quê vai servir"],
    falha: ["Só a ação", "o verbo e o assunto", "objetivo claro, clareza e tamanho", "contexto, público e tom"] },
  { aula: "0067", q: 3,
    passa: ["Porque são dados sensíveis", "Podem vazar e ser expostos", "É arriscado, são informações privadas", "Para não expor informações confidenciais"],
    falha: ["Porque o Claude não gosta", "Para o pedido ficar mais curto", "Para ficar bonito", "Para o texto ficar maior", "dados"] },

  // 0068: tom e dados de clientes
  { aula: "0068", q: 1,
    passa: ["Para ajustar a linguagem a quem vai ler", "Para adaptar o vocabulário ao leitor"],
    falha: ["Para a resposta ficar maior", "Para o Claude ficar quieto"] },
  { aula: "0068", q: 2,
    passa: ["É o jeito de falar do texto", "O estilo do texto: formal ou simpático", "A maneira de escrever, mais séria ou mais leve"],
    falha: ["É a informação do texto", "O tamanho do texto", "Uma informação importante", "o assunto do texto"] },
  { aula: "0068", q: 3,
    passa: ["Porque expõe dados pessoais", "É um risco de privacidade", "Os dados sensíveis podem vazar"],
    falha: ["Porque são muitos dados", "Para o texto ficar curto", "dados", "pessoas"] },

  // 0069: formatos e dados de verdade
  { aula: "0069", q: 2,
    passa: ["Lista e tabela", "uma lista e um tamanho de 3 frases", "campos fixos e resposta curta", "tabela, lista"],
    falha: ["Lista", "tabela", "lista e lista", "Nenhum, o Claude escolhe sozinho"] },

  // 0070: few-shot
  { aula: "0070", q: 1,
    passa: ["É incluir exemplos de entrada e saída no pedido", "Mostrar alguns exemplos para o Claude copiar o padrão", "Dar pares de exemplo para ele seguir"],
    falha: ["É dar um exemplo para o Claude", "Pedir várias vezes", "Fazer uma pergunta com exemplo", "Explicar a regra com um exemplo"] },

  // 0071: restrições
  { aula: "0071", q: 1,
    passa: ["Um limite que a resposta precisa respeitar", "Uma regra para a resposta, como o tamanho"],
    falha: ["Uma restrição", "É um pedido", "uma pergunta ao Claude"] },
  { aula: "0071", q: 2,
    passa: ["Ser mensurável", "Ser clara e específica", "Dá para conferir ou contar", "Ser clara e dizer o que fazer"],
    falha: ["Ser bonita", "Ser longa", "Ser criativa"] },
  { aula: "0071", q: 3,
    passa: ["Não garante, ele pode errar e não obedecer", "Nem sempre cumpre; é preciso verificar antes de usar", "Não, ele pode ignorar a regra", "Não garante: o Claude pode não seguir"],
    falha: ["Sim, garante", "Confiar que ele obedeceu", "Sim, ele sempre cumpre, não precisa conferir", "Para ficar bonito", "Escrever a restrição já resolve"] },

  // 0072: perguntar antes e dados de identificação
  { aula: "0072", q: 1,
    passa: ["Antes de responder, faça perguntas de que precisa", "Primeiro me pergunte o que falta e só depois responda"],
    falha: ["Responda rápido", "Faça um resumo curto", "Escreva em lista"] },
  { aula: "0072", q: 2,
    passa: ["Em tarefas grandes ou novas", "Quando a tarefa é complexa", "Quando não sei o que informar"],
    falha: ["Em contas de somar", "Quando tenho pressa", "Sempre que escrevo uma palavra"] },
  { aula: "0072", q: 3,
    passa: ["Não informar e usar valores fictícios", "Recusar e dar só valores aproximados", "Não responder, o plano não precisa de senha", "Nunca passar a senha nem o CPF"],
    falha: ["Pode responder, o CPF é necessário, não tem problema", "Responder tudo, o Claude precisa dos dados", "Informar a senha e o CPF", "Sim, responder"] },

  // 0073: conferir
  { aula: "0073", q: 2,
    passa: ["Refazendo a conta por fora", "Usando uma calculadora", "Recalculando num programa", "Refazer a conta na planilha"],
    falha: ["Perguntar ao próprio Claude se a conta está certa", "Perguntar ao Claude se ele tem certeza", "Pedir para o Claude confirmar a conta", "Confiar no tom seguro"] },
  { aula: "0073", q: 3,
    passa: ["Tratar como não confirmada e não usar", "Não usar a citação", "Descartar, pode ser inventada", "Desconfiar e não citar no trabalho"],
    falha: ["Usar a citação mesmo que seja inventada", "Citar assim mesmo", "Copiar para o trabalho"] },

  // 0074: peças do pedido
  { aula: "0074", q: 1,
    passa: ["Objetivo, contexto e formato", "contexto, público e restrições", "formato, exemplos e conferência"],
    falha: ["objetivo", "Objetivo e objetivo e objetivo", "contexto e formato", "bom, claro e longo"] },
  { aula: "0074", q: 3,
    passa: ["Para não expor dados financeiros reais", "É um risco de privacidade", "Porque os dados sensíveis podem vazar"],
    falha: ["Para o texto ficar mais bonito", "Porque o Claude não entende números", "fictícios"] },
];
