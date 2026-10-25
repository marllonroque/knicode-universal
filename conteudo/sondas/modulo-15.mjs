// Sondas da recuperação do Módulo 15 (Claude Code): respostas certas, com outras palavras, devem passar; as erradas ou vagas devem falhar.
// aula = id da aula; q = número da pergunta na recuperação (a partir de 1).
export default [
  { aula: "0111", q: 2,
    passa: ["Ele lê meus arquivos, edita e roda comandos", "Age direto no meu computador, mexendo nos arquivos da pasta", "Trabalha dentro da pasta lendo e editando arquivos do projeto", "Executa comandos no computador"],
    falha: ["Ele responde mensagens de forma mais inteligente", "Conversa melhor com o usuário", "É mais rápido e mais educado", "Gera mensagens mais criativas"] },

  { aula: "0112", q: 1,
    passa: ["Só consulta, sem alterar", "Só lê, não edita nada", "Apenas leituras", "Somente leitura; o resto pergunta"],
    falha: ["Edições e leituras", "Ele edita tudo", "Liberar tudo, nunca perguntar", "Leituras e edições de arquivo", "Só edições"] },
  { aula: "0112", q: 3,
    passa: ["Perguntar por padrão", "Negar, na dúvida pergunta", "Não liberar por padrão", "Bloquear a ação"],
    falha: ["Liberar tudo, nunca perguntar", "Liberar por padrão", "Nunca perguntar"] },

  { aula: "0113", q: 1,
    passa: ["/clear começa conversa nova e /compact resume a conversa", "O compact resume; o clear zera tudo", "O compact faz um resumo e o clear começa do zero"],
    falha: ["clear resume, compact começa nova", "/clear resume a conversa e /compact zera tudo", "clear e compact resumem a conversa", "Não sei, os dois fazem a mesma coisa"] },
  { aula: "0113", q: 3,
    passa: ["Porque as senhas ficam expostas", "Expõe credenciais", "Pode vazar segredos", "As chaves ficam expostas na conversa", "Credenciais podem ser roubadas"],
    falha: ["Porque é feio", "Porque o arquivo é grande demais", "Porque gasta contexto"] },

  { aula: "0114", q: 2,
    passa: ["Comandos de teste e regras; fica de fora o que ele descobre lendo o código", "Escreva os comandos e regras fora do padrão e deixe de fora elogios"],
    falha: ["Comandos e regras, e deixar de fora", "Regras e comandos, o resto fica de fora"] },
  { aula: "0114", q: 3,
    passa: ["Não, só orienta", "Não, é só orientação", "Só orienta, nunca garante", "Não garante; para bloquear use hook"],
    falha: ["Sim, garante", "Não, ele garante", "Sim, sempre cumpre", "Garante que a regra seja cumprida"] },

  { aula: "0115", q: 3,
    passa: ["Para recusar passos que eu não pedi", "Evito apagar uma pasta ou instalar pacote desconhecido", "Para corrigir o plano antes de editar", "Porque pode ter passo arriscado"],
    falha: ["Para ler antes de aprovar", "Porque sim", "Para aprovar mais rápido"] },

  { aula: "0116", q: 1,
    passa: ["+ é adicionada e - é removida", "`+` é linha adicionada e `-` é linha removida", "A linha com + foi adicionada e a com - foi removida", "Linha adicionada é +, removida é -", "mais é adicionada, menos é removida"],
    falha: ["+ é removida e - é adicionada", "+ é removida, - é adicionada", "Linha adicionada é -, removida é +", "Mostram o que mudou", "Linhas com + e - mostram mudanças"] },
  { aula: "0116", q: 2,
    passa: ["Comandos Bash como rm, mv e cp", "Alterações feitas no terminal", "Mudanças que eu fiz fora da sessão", "Edições de subagentes", "Arquivos apagados com rm"],
    falha: ["Desfaz tudo, inclusive comandos", "Normalmente tudo é desfeito", "Desfaz tudo"] },
  { aula: "0116", q: 3,
    passa: ["Ler o comando com atenção", "Fazer um backup antes", "Ter um commit"],
    falha: ["Aprovar logo", "Nada, é seguro"] },

  { aula: "0117", q: 2,
    passa: ["Trata a linha ruim sem travar o programa", "Evita que o programa pare", "Impede que o programa quebre por causa de uma linha ruim"],
    falha: ["Serve para deixar o programa mais bonito", "Para apagar o log", "Não sei"] },
  { aula: "0117", q: 3,
    passa: ["Tokens e senhas", "Dados pessoais", "Chaves de API e o arquivo .env", "Credenciais"],
    falha: ["Os arquivos de teste", "Mensagens longas", "Código sem comentário"] },

  { aula: "0118", q: 2,
    passa: ["O hook garante e o CLAUDE.md só orienta", "O CLAUDE.md é orientação e o hook é determinístico", "Hook sempre roda; CLAUDE.md é só um pedido (sugestão)", "CLAUDE.md orienta, hook garante"],
    falha: ["O hook orienta e o CLAUDE.md garante", "O CLAUDE.md garante e o hook só orienta", "São a mesma coisa"] },
  { aula: "0118", q: 3,
    passa: ["É um comando de shell que roda sozinho", "Pode executar algo perigoso sem eu perceber", "Porque é um script que roda automaticamente"],
    falha: ["Para ler antes de confiar", "Porque é um repositório baixado", "Tenho que ler o hook"] },

  { aula: "0119", q: 1,
    passa: ["Comandos escondidos num texto para enganar o assistente", "Texto malicioso que dá ordens ao Claude", "Instruções escondidas em um arquivo"],
    falha: ["Um erro de digitação", "Texto muito grande", "Uma falha do teclado"] },
  { aula: "0119", q: 2,
    passa: ["Eu, antes de aprovar", "Você mesmo", "O usuário"],
    falha: ["O Claude revisa o seu código", "A Anthropic", "O Claude decide sozinho", "Ninguém"] },

  { aula: "0120", q: 3,
    passa: ["Dados inventados", "Fictícios, para não vazar dados de clientes", "Dados falsos de exemplo"],
    falha: ["O log real da loja", "Dados de clientes", "Chaves de produção", "Nada"] },
];
