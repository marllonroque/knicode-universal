// Sondas da recuperação do módulo 16 (Skills, MCP e conectores).
// Cada sonda: { aula, q (pergunta, a partir de 1), passa: [respostas certas], falha: [respostas erradas ou vagas] }.
export default [
  // 0121: skills
  { aula: "0121", q: 3,
    passa: ["Usar só fontes confiáveis e ler todos os arquivos antes de instalar", "Só instalar de uma fonte confiável e auditar tudo, como se fosse instalar um software", "Confiar na origem e revisar o SKILL.md e os scripts antes de usar"],
    falha: ["instalar sem ler nada; confio na fonte", "Instalo direto, sem revisar nada, porque a fonte é confiável", "não preciso ler, confio no autor"] },

  // 0122: carregamento progressivo
  { aula: "0122", q: 1,
    passa: ["só o título e a descrição", "O nome e a descrição de cada skill", "name e description, que ficam sempre no contexto"],
    falha: ["o corpo do SKILL.md", "todos os arquivos e scripts da skill"] },
  { aula: "0122", q: 2,
    passa: ["Só quando a skill é acionada", "Quando o Claude escolhe a skill ou eu chamo com /nome", "quando a skill é usada, e não antes", "Só quando a skill é necessária para o pedido"],
    falha: ["lido sempre, ao abrir a sessão, porque é necessário", "sempre, desde o início da conversa", "toda vez que eu abro o Claude"] },
  { aula: "0122", q: 3,
    passa: ["lê a descrição para saber se serve para o pedido", "Porque o Claude compara o pedido com a descrição e decide se usa a skill", "ele escolhe a skill que combina com o pedido olhando a description"],
    falha: ["porque é obrigatório ter 1024 caracteres", "para o nome ficar bonito", "porque o corpo é muito longo"] },

  // 0123: frontmatter
  { aula: "0123", q: 1,
    passa: ["64 para o name e 1024 para a description", "O name tem até 64 caracteres e a description até 1024", "name 64 caracteres, description 1024", "description até 1024 caracteres e name até 64", "64 e 1024, respectivamente"],
    falha: ["64 para a description e 1024 para o name", "description 64 e name 1024", "o name pode ter 1024 e a description 64"] },
  { aula: "0123", q: 3,
    passa: ["Todos os campos são opcionais", "Não é obrigatório preencher; o name assume o nome da pasta", "No Claude Code os campos ficam opcionais, só a description é recomendada"],
    falha: ["tudo é obrigatório, nada é opcional", "Todos os campos são obrigatórios", "nada muda, tudo é obrigatório do mesmo jeito"] },

  // 0124: escrever uma boa skill
  { aula: "0124", q: 2,
    passa: ["Impede o Claude de acionar a skill sozinho; só eu chamo com /nome", "A skill não é acionada automaticamente, só manualmente", "bloqueia o acionamento automático: só roda quando eu chamo"],
    falha: ["faz ser acionada automaticamente", "o Claude aciona sozinho", "faz a skill ser usada sozinha sempre"] },
  { aula: "0124", q: 3,
    passa: ["podem enviar e-mail ou apagar sem você ver; só rodam quando você chama", "Agem no mundo, então uso disable-model-invocation e reviso antes", "podem mandar e-mail sem querer; deixo só manual"],
    falha: ["porque são lentas", "porque efeito colateral precisa de cuidado extra", "elas ocupam muito espaço"] },

  // 0125: o que é MCP
  { aula: "0125", q: 1,
    passa: ["tools são funções que o Claude executa; resources são dados de contexto; prompts são modelos de pedido", "funções (tools), dados para ler (resources) e modelos prontos (prompts)", "tool executa uma ação, resource é um arquivo de contexto, prompt é um modelo reutilizável"],
    falha: ["tools são dados, resources são prompts", "tools são modelos, resources são funções e prompts são dados", "tudo é a mesma coisa"] },
  { aula: "0125", q: 2,
    passa: ["Local usa stdio e remoto usa Streamable HTTP", "stdio para local e http para remoto", "o servidor local usa stdio, o remoto usa http", "http no remoto, stdio no local"],
    falha: ["local usa http e remoto usa stdio", "o remoto usa stdio e o local usa http", "http para local e stdio para remoto", "local é http, remoto é stdio", "local: http, remoto: stdio", "remoto usa stdio e local usa http"] },
  { aula: "0125", q: 3,
    passa: ["o texto pode ter ordens escondidas e o Claude obedecer", "alguém pode embutir instruções no texto", "é uma injeção de prompt: texto malicioso tentando virar ordem"],
    falha: ["porque o conteúdo é externo", "porque pode ser lento", "porque a internet é grande"] },

  // 0126: adicionar um servidor MCP
  { aula: "0126", q: 1,
    passa: ["claude mcp add --transport http loja https://mcp.exemplo.invalid/mcp", "mcp add --transport http nome url"],
    falha: ["claude mcp add --transport sse https://mcp.exemplo.invalid/mcp", "claude mcp add --transport stdio loja -- npx loja", "claude mcp add https://mcp.exemplo.invalid/mcp"] },
  { aula: "0126", q: 3,
    passa: ["porque há servidores em outros escopos, conectores do claude.ai e plugins", "tem conectores e plugins que não aparecem nesse arquivo", "o arquivo só vale para o escopo project; existem servidores nos escopos local e user"],
    falha: ["Porque o .mcp.json mostra tudo", "porque o arquivo está desatualizado", "porque o mcp é lento"] },

  // 0127: permissões mínimas e riscos
  { aula: "0127", q: 1,
    passa: ["Não, ela só revisa os do diretório; a responsabilidade é sua", "Não audita; só revisa os conectores do Directory contra critérios", "não faz auditoria de segurança nem gerencia servidor MCP"],
    falha: ["Sim, audita e verifica; não precisa se preocupar", "Sim, todos os servidores são auditados", "sim, ela garante a segurança"] },
  { aula: "0127", q: 2,
    passa: ["o que eu não liberei de propósito fica bloqueado", "tudo que não foi liberado é proibido", "só o que eu libero explicitamente funciona; o resto fica negado", "uma ação fora da lista é negada", "não liberar tudo; o que não está na lista fica fechado"],
    falha: ["liberar tudo e só negar o que está na lista", "tudo liberado por padrão", "deixar tudo aberto e bloquear só depois"] },

  // 0128: mini-projeto
  { aula: "0128", q: 2,
    passa: ["Conta como risco", "trato como se a conexão fizesse aquilo, o pior caso", "soma os pontos de risco, assume que ela escreve"],
    falha: ["Conta como seguro", "ignora a pergunta", "não conta ponto nenhum"] },
];
