Verificado em 2026-10-16

# Fatos oficiais: Claude Code, Skills, MCP, Hooks e Subagentes

Regras de uso: so afirme nas aulas o que esta marcado [CONFIRMADO]. Tudo esta parafraseado em portugues. Fontes: somente paginas oficiais (code.claude.com, platform.claude.com, support.claude.com, modelcontextprotocol.io). Observacao: a documentacao do Claude Code e em ingles; os nomes de comandos e menus abaixo estao no original.

Abreviacoes de URL: CC = https://code.claude.com/docs/en/

---

## 1. Claude Code: o que e e como instalar

1. [CONFIRMADO] Claude Code e uma ferramenta de programacao "agentica": le o seu codigo, edita arquivos, roda comandos e se integra a ferramentas de desenvolvimento. Roda no terminal, em IDEs (VS Code, JetBrains), no app desktop e no navegador. URL: https://code.claude.com/docs/en/overview
2. [CONFIRMADO] Instalacao recomendada (nativa), macOS/Linux/WSL: `curl -fsSL https://claude.ai/install.sh | bash`. URL: https://code.claude.com/docs/en/setup
3. [CONFIRMADO] Instalacao nativa no Windows PowerShell: `irm https://claude.ai/install.ps1 | iex`. URL: https://code.claude.com/docs/en/setup
4. [CONFIRMADO] Instalacao nativa no Windows CMD: `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd`. Se aparecer erro de `&&` voce esta no PowerShell; se aparecer erro de `irm` voce esta no CMD. URL: https://code.claude.com/docs/en/setup
5. [CONFIRMADO] Alternativas: Homebrew (`brew install --cask claude-code`), WinGet (`winget install Anthropic.ClaudeCode`) e npm (`npm install -g @anthropic-ai/claude-code`, exige Node.js 22 ou superior). Homebrew e WinGet nao se atualizam sozinhos; a instalacao nativa se atualiza em segundo plano. URL: https://code.claude.com/docs/en/setup
6. [CONFIRMADO] Nao use `sudo npm install -g` (risco de problemas de permissao e seguranca). URL: https://code.claude.com/docs/en/setup
7. [CONFIRMADO] Requisitos de sistema: macOS 13.0+; Windows 10 1809+ ou Windows Server 2019+; Ubuntu 20.04+; Debian 10+; Alpine 3.19+; 4 GB+ de RAM; processador x64 ou ARM64; internet obrigatoria; shell Bash, Zsh, PowerShell ou CMD; pais precisa estar na lista de paises suportados pela Anthropic. URL: https://code.claude.com/docs/en/setup
8. [CONFIRMADO] Windows: roda nativamente ou no WSL. Nao precisa de Administrador. Git for Windows e opcional/recomendado: com ele o Claude Code usa o Git Bash como ferramenta Bash; sem ele usa PowerShell. Sandboxing nao e suportado no Windows nativo (so no WSL 2). URL: https://code.claude.com/docs/en/setup
9. [CONFIRMADO] Depois de instalar, abra um terminal novo e rode `claude --version` para conferir; `claude doctor` mostra diagnostico da instalacao. URL: https://code.claude.com/docs/en/setup
10. [CONFIRMADO] Para iniciar numa pasta: `cd sua-pasta` e depois `claude`. No primeiro uso ele pede login (no navegador). URL: https://code.claude.com/docs/en/quickstart
11. [CONFIRMADO] Conta necessaria: Pro, Max, Team, Enterprise ou Console (API); o plano gratuito do claude.ai nao inclui o Claude Code. Tambem funciona com Amazon Bedrock, Google Cloud e Microsoft Foundry. URL: https://code.claude.com/docs/en/setup
12. [CONFIRMADO] O Claude Code funciona em qualquer pasta, inclusive pastas de notas ou documentos sem codigo. URL: https://code.claude.com/docs/en/common-workflows
13. [CONFIRMADO] Comandos de shell uteis: `claude` (modo interativo), `claude "tarefa"` (abre com um pedido inicial), `claude -p "pergunta"` (consulta unica e sai), `claude -c` (continua a ultima conversa da pasta), `claude -r` (escolhe conversa anterior). URL: https://code.claude.com/docs/en/quickstart

## 2. Permissoes e modos

14. [CONFIRMADO] Um "modo de permissao" define o que o Claude pode fazer sem perguntar antes. Troca-se com Shift+Tab no terminal. URL: https://code.claude.com/docs/en/permission-modes
15. [CONFIRMADO] Nomes exatos dos modos (valor de configuracao): `default` (aparece como "Manual": so leituras sem perguntar), `acceptEdits` (leituras, edicoes de arquivo e comandos comuns de arquivo como mkdir/mv/cp sem perguntar), `plan` (explora sem editar), `auto` (um modelo "classificador" revisa as acoes no seu lugar), `dontAsk` (nega tudo que exigiria confirmacao; para CI), `bypassPermissions` (nao pergunta nada; so para containers/VMs isolados). URL: https://code.claude.com/docs/en/permission-modes
16. [CONFIRMADO] No modo Manual o Claude Code pede confirmacao antes da maioria das acoes que editam arquivos, rodam comandos de shell ou acessam a rede. URL: https://code.claude.com/docs/en/permission-modes
17. [CONFIRMADO] Com a versao v2.1.283 ou superior, o modo `auto` e o modo inicial padrao em sessoes interativas de terminal e VS Code (em versoes anteriores, so em planos Pro, Max e Team). Ou seja: o modo inicial que o aluno ve pode NAO ser o Manual. URL: https://code.claude.com/docs/en/permission-modes
18. [CONFIRMADO] Ciclo do Shift+Tab: a partir de `auto` vai para `default`, depois `acceptEdits`, depois `plan`. A barra de status mostra "manual mode on", "accept edits on", "plan mode on", "auto mode on", etc. `bypassPermissions` so entra no ciclo se iniciado com flag especifica. URL: https://code.claude.com/docs/en/permission-modes
19. [CONFIRMADO] Modo plano: o Claude le arquivos e propoe um plano sem editar nada. Entra-se com Shift+Tab, com `/plan` ou iniciando com `claude --permission-mode plan`. Ao final o Claude oferece opcoes como "Yes, manually approve edits" (aprova e revisa cada edicao) e "No, keep planning" (continua planejando). URL: https://code.claude.com/docs/en/permission-modes
20. [CONFIRMADO] Regras de permissao (permitir/perguntar/negar ferramentas especificas) ficam em camada sobre os modos e sao gerenciadas com `/permissions`; regras de negacao valem em todos os modos. URL: https://code.claude.com/docs/en/permission-modes
21. [CONFIRMADO] Por padrao, o Claude Code pede aprovacao antes de leituras/escritas fora da pasta onde foi iniciado (modo Manual). Isso e um aviso, nao uma barreira: um comando Bash aprovado ainda pode escrever onde sua conta de usuario pode. Para limitar de verdade, use sandbox. URL: https://code.claude.com/docs/en/security

## 3. Comandos de barra para iniciantes

Observacao: digitar `/` mostra os comandos disponiveis. URL geral: https://code.claude.com/docs/en/commands

22. [CONFIRMADO] `/help`: mostra ajuda e comandos disponiveis. URL: https://code.claude.com/docs/en/commands
23. [CONFIRMADO] `/clear`: comeca uma conversa nova com contexto vazio (aliases `/reset`, `/new`); a conversa anterior pode ser retomada com `/resume`. URL: https://code.claude.com/docs/en/commands
24. [CONFIRMADO] `/compact [instrucoes]`: resume a conversa ate agora para liberar contexto, aceitando instrucoes de foco. URL: https://code.claude.com/docs/en/commands
25. [CONFIRMADO] `/memory`: edita arquivos CLAUDE.md, liga/desliga a memoria automatica e mostra entradas dela. URL: https://code.claude.com/docs/en/commands
26. [CONFIRMADO] `/init`: inicializa o projeto com um guia `CLAUDE.md` (analisa o codigo e gera arquivo inicial; se ja existir, sugere melhorias em vez de sobrescrever). URL: https://code.claude.com/docs/en/commands e https://code.claude.com/docs/en/memory
27. [CONFIRMADO] `/model`: troca o modelo e salva como padrao para novas sessoes. URL: https://code.claude.com/docs/en/commands
28. [CONFIRMADO] `/permissions`: gerencia regras de permitir/perguntar/negar. URL: https://code.claude.com/docs/en/commands
29. [CONFIRMADO] `/rewind` (aliases `/checkpoint`, `/undo`): volta conversa e/ou codigo a um ponto anterior. URL: https://code.claude.com/docs/en/commands
30. [CONFIRMADO] `/resume`: retoma uma conversa por nome/ID ou abre o seletor de sessoes. URL: https://code.claude.com/docs/en/commands
31. [CONFIRMADO] `/mcp`: lista servidores MCP e status, autentica servidores remotos e liga/desliga servidores. URL: https://code.claude.com/docs/en/mcp
32. [CONFIRMADO] `/agents`: na versao atual imprime um lembrete para pedir ao Claude que crie/gerencie subagentes ou editar `.claude/agents/` (em v2.1.197 e anteriores abria uma interface interativa). URL: https://code.claude.com/docs/en/commands
33. [CONFIRMADO] `/hooks`: mostra as configuracoes de hooks. URL: https://code.claude.com/docs/en/commands
34. [CONFIRMADO] `/skills`: lista as skills disponiveis. URL: https://code.claude.com/docs/en/commands
35. [CONFIRMADO] `/context`: mostra o uso do contexto como grade colorida, com sugestoes. URL: https://code.claude.com/docs/en/commands
36. [CONFIRMADO] `/usage`: mostra custo da sessao, limites do plano e estatisticas; `/cost` e `/stats` sao aliases. URL: https://code.claude.com/docs/en/commands e https://code.claude.com/docs/en/costs
37. [CONFIRMADO] `/status`: abre as configuracoes na aba Status (versao, modelo, conta, conectividade). URL: https://code.claude.com/docs/en/commands
38. [CONFIRMADO] `/config`: abre a interface de configuracoes (tema, modelo, estilo de saida etc.). URL: https://code.claude.com/docs/en/commands
39. [CONFIRMADO] `/diff`: revisa as mudancas na arvore de trabalho, inclusive as edicoes feitas pelo Claude. URL: https://code.claude.com/docs/en/commands
40. [CONFIRMADO] `/plan [descricao]`: entra no modo plano direto do prompt. URL: https://code.claude.com/docs/en/commands
41. [CONFIRMADO] `/exit` (alias `/quit`): sai do Claude Code; Ctrl+D duas vezes tambem sai. URL: https://code.claude.com/docs/en/commands e https://code.claude.com/docs/en/quickstart
42. [CONFIRMADO] `/login`: entra na conta Anthropic (tambem serve para trocar de conta). URL: https://code.claude.com/docs/en/commands
43. [CONFIRMADO] `/security-review`: analisa as mudancas do branch atual em busca de vulnerabilidades (precisa de remoto `origin`). URL: https://code.claude.com/docs/en/commands
44. [CONFIRMADO] `/review` existe como comando (linha com niveis de esforco low/medium...); a descricao completa nao foi lida. Para aula, diga so que existe uma revisao de codigo embutida e peca ao aluno para conferir com `/help`. URL: https://code.claude.com/docs/en/commands
45. [CONFIRMADO] Ha tambem `/doctor` (diagnostico da configuracao, incluindo CLAUDE.md, com proposta de correcoes) e `/sandbox` (liga/desliga sandbox em plataformas suportadas). URL: https://code.claude.com/docs/en/commands

## 4. CLAUDE.md e memoria

46. [CONFIRMADO] Cada sessao comeca com a janela de contexto vazia; dois mecanismos levam conhecimento entre sessoes: arquivos CLAUDE.md (instrucoes que voce escreve) e memoria automatica (notas que o Claude escreve). URL: https://code.claude.com/docs/en/memory
47. [CONFIRMADO] Locais do CLAUDE.md: projeto `./CLAUDE.md` ou `./.claude/CLAUDE.md` (compartilhado com a equipe via controle de versao); usuario `~/.claude/CLAUDE.md` (so voce, todos os projetos); local `./CLAUDE.local.md` (pessoal do projeto; colocar no .gitignore); politica gerenciada pela organizacao (Windows: `C:\Program Files\ClaudeCode\CLAUDE.md`). URL: https://code.claude.com/docs/en/memory
48. [CONFIRMADO] O Claude trata CLAUDE.md como contexto, nao como regra imposta; para bloquear uma acao de forma garantida, use um hook PreToolUse. URL: https://code.claude.com/docs/en/memory
49. [CONFIRMADO] Boas praticas: manter curto e legivel, incluir comandos que o Claude nao adivinha, regras de estilo diferentes do padrao e como rodar testes; excluir o que ele descobre lendo o codigo. CLAUDE.md inchado faz o Claude ignorar regras. Pode versionar no git. URL: https://code.claude.com/docs/en/best-practices
50. [CONFIRMADO] Se o repositorio so tem `AGENTS.md` (sem CLAUDE.md), o Claude Code pode le-lo no lugar. URL: https://code.claude.com/docs/en/memory

## 5. Revisar, desfazer e fluxo de trabalho

51. [CONFIRMADO] Checkpoints: o Claude Code registra automaticamente o estado do codigo antes de cada prompt que inicia um turno. Abre-se o menu de rewind com `/rewind` ou Esc duas vezes (com o campo de texto vazio). URL: https://code.claude.com/docs/en/checkpointing
52. [CONFIRMADO] Opcoes do menu de rewind: restaurar codigo e conversa; restaurar so a conversa; restaurar so o codigo; "Summarize from here" / "Summarize up to here" (resumir conversa); "Never mind". URL: https://code.claude.com/docs/en/checkpointing
53. [CONFIRMADO] Limite importante: checkpoints NAO rastreiam arquivos alterados por comandos Bash (rm, mv, cp), nem mudancas externas feitas por voce fora da sessao. Nao substituem o Git. URL: https://code.claude.com/docs/en/checkpointing
54. [CONFIRMADO] Fluxo recomendado em quatro fases: Explorar (modo plano, ler sem mudar) -> Planejar (pedir plano detalhado) -> Implementar -> Commit. Para mudancas pequenas e claras o plano pode ser pulado. URL: https://code.claude.com/docs/en/best-practices
55. [CONFIRMADO] Verificar: dar ao Claude uma forma de checar o proprio trabalho (testes, build, linter, captura de tela) e pedir evidencia (saida dos testes). "Se voce nao pode verificar, nao entregue." URL: https://code.claude.com/docs/en/best-practices
56. [CONFIRMADO] Dar contexto especifico: citar arquivos (com `@arquivo`), restricoes, padroes existentes; descrever o sintoma. Pode colar imagens e usar `@` para referenciar arquivos. URL: https://code.claude.com/docs/en/best-practices
57. [CONFIRMADO] Gerenciar contexto: `/clear` entre tarefas nao relacionadas; depois de duas correcoes falhas na mesma questao, limpar e reescrever o pedido; auto-compactacao acontece perto do limite. URL: https://code.claude.com/docs/en/best-practices
58. [CONFIRMADO] Corrigir cedo: Esc interrompe o Claude mantendo o contexto. URL: https://code.claude.com/docs/en/best-practices
59. [CONFIRMADO] Rodar testes por ele: basta pedir (exemplos oficiais: "run the new tests and fix any failures"); ele segue o estilo dos testes existentes. URL: https://code.claude.com/docs/en/common-workflows
60. [CONFIRMADO] Git conversacional: ele pode listar arquivos alterados, criar commit com mensagem, criar branch, mostrar commits, ajudar com conflitos e criar pull request (para PR a ferramenta `gh` ajuda). Revise o PR antes de enviar. URL: https://code.claude.com/docs/en/quickstart , https://code.claude.com/docs/en/common-workflows e https://code.claude.com/docs/en/best-practices
61. [CONFIRMADO] Ao propor uma edicao no modo Manual, o Claude mostra a mudanca e pergunta; selecione Yes para aprovar. URL: https://code.claude.com/docs/en/quickstart
62. [NAO CONFIRMADO] Aparencia exata do diff no terminal (cores, layout da tela de aprovacao). A pagina de quickstart so diz que ele "mostra a mudanca"; o detalhe visual nao foi lido. Nao descreva a tela em detalhe; use `/diff` e git diff como caminho seguro.

## 6. Seguranca, prompt injection, custos

63. [CONFIRMADO] Prompt injection e uma tecnica em que um atacante tenta sobrescrever as instrucoes do assistente com texto malicioso. Protecoes citadas: sistema de permissoes, comandos que buscam conteudo na web (curl, wget) nao sao aprovados automaticamente por padrao, aprovacao de pedidos de rede, resumo de paginas web por modelo separado, deteccao de injecao de comando. URL: https://code.claude.com/docs/en/security
64. [CONFIRMADO] A documentacao diz que nenhum sistema e totalmente imune, e que voce e responsavel por revisar codigo e comandos antes de aprovar. URL: https://code.claude.com/docs/en/security
65. [CONFIRMADO] Boas praticas com conteudo nao confiavel: revisar comandos antes de aprovar; evitar jogar conteudo nao confiavel direto no Claude; verificar mudancas em arquivos criticos; usar VMs para scripts/chamadas externas; reportar comportamento suspeito com `/feedback`. URL: https://code.claude.com/docs/en/security
66. [CONFIRMADO] Ao iniciar numa pasta nova, aparece um dialogo de confianca do workspace; servidores do `.mcp.json` de um projeto tem aprovacao propria. URL: https://code.claude.com/docs/en/security
67. [CONFIRMADO] Windows: a documentacao recomenda nao habilitar WebDAV nem permitir acesso a caminhos como `\\*`, porque pode burlar o sistema de permissoes. URL: https://code.claude.com/docs/en/security
68. [CONFIRMADO] Custos em termos gerais: o Claude Code consome tokens; o custo varia muito conforme modelo, tamanho do projeto e padrao de uso. Planos Pro/Max/Team/Enterprise tem limites por janela (5 horas e semanal); `/usage` mostra o uso. Para valores, remeta a pagina oficial de precos (claude.com/pricing). URL: https://code.claude.com/docs/en/costs
69. [CONFIRMADO] Formas gerais de gastar menos: `/clear` entre tarefas, `/compact`, pedidos especificos, modo plano em tarefas complexas, escolher modelo mais leve para tarefas simples com `/model`, desativar MCPs nao usados. URL: https://code.claude.com/docs/en/costs

## 7. Skills (Agent Skills)

70. [CONFIRMADO] Skill e uma pasta com um arquivo `SKILL.md` com instrucoes; o Claude a usa quando e relevante ou voce a chama diretamente com `/nome-da-skill`. URL: https://code.claude.com/docs/en/skills
71. [CONFIRMADO] Estrutura minima: `minha-skill/SKILL.md` (so o SKILL.md e obrigatorio), com frontmatter YAML entre `---` seguido de instrucoes em Markdown. Arquivos de apoio (reference.md, scripts/) podem ficar ao lado; recomenda-se SKILL.md com menos de 500 linhas. URL: https://code.claude.com/docs/en/skills
72. [CONFIRMADO] Campos obrigatorios na plataforma/API e no claude.ai: `name` (ate 64 caracteres, so letras minusculas, numeros e hifens; nao pode conter as palavras reservadas "anthropic" e "claude") e `description` (nao vazia, ate 1024 caracteres, deve dizer o que faz e quando usar). URL: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
73. [CONFIRMADO] No Claude Code, todos os campos do frontmatter sao opcionais; `name` assume o nome da pasta e so `description` e recomendada. Cuidado ao ensinar: as duas fontes diferem; o caminho seguro e sempre preencher name e description. URL: https://code.claude.com/docs/en/skills
74. [CONFIRMADO] Onde ficam no Claude Code: pessoal `~/.claude/skills/<nome>/SKILL.md` (todos os projetos); projeto `.claude/skills/<nome>/SKILL.md` (compartilha via git); dentro de plugins; e corporativo via configuracao gerenciada. Se pessoal e projeto tiverem o mesmo nome, vale a pessoal. URL: https://code.claude.com/docs/en/skills
75. [CONFIRMADO] Carregamento progressivo: nivel 1, nome e descricao ficam sempre no contexto (cerca de 100 tokens por skill); nivel 2, o corpo do SKILL.md so entra quando a skill e acionada; nivel 3, arquivos e scripts so quando referenciados (scripts rodam via bash e so a saida entra no contexto). URL: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
76. [CONFIRMADO] O Claude decide usar uma skill comparando seu pedido com a `description`; por isso ela deve dizer o que a skill faz e quando usar. Pode-se tambem chamar manualmente com `/nome`. URL: https://code.claude.com/docs/en/skills e https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
77. [CONFIRMADO] Exemplo minimo oficial (pagina de skills): frontmatter com `name: summarize-changes` e `description: Summarizes uncommitted changes and flags anything risky...` seguido de instrucoes curtas. URL: https://code.claude.com/docs/en/skills
78. [CONFIRMADO] Campo `disable-model-invocation: true` impede o Claude de acionar a skill sozinho (indicado para fluxos com efeito colateral, como deploy). URL: https://code.claude.com/docs/en/skills e https://code.claude.com/docs/en/best-practices
79. [CONFIRMADO] Skills no claude.ai: envio de arquivo zip em Settings > Features, nos planos Pro, Max, Team e Enterprise com execucao de codigo habilitada; skills personalizadas sao individuais. Skills NAO sincronizam entre superficies (claude.ai, API, Claude Code). URL: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
80. [CONFIRMADO] Seguranca de skills: use apenas skills de fontes confiaveis (suas ou da Anthropic); uma skill maliciosa pode induzir o Claude a rodar ferramentas/codigo de forma diferente do descrito, e pode haver vazamento de dados; audite todos os arquivos da skill; trate como instalar software. URL: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
81. [CONFIRMADO] A Anthropic publica skills de documentos pre-prontas (pptx, xlsx, docx, pdf) no claude.ai e na API; elas NAO estao disponiveis no Claude Code. URL: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
82. [NAO CONFIRMADO] Menu exato de criacao/gestao de skills hoje no claude.ai (a pagina cita Settings > Features, mas a pagina do MCP cita "Customize" para conectores; o rotulo pode ter mudado). Confira na tela antes de gravar.

## 8. MCP (Model Context Protocol)

83. [CONFIRMADO] MCP e um padrao aberto (open-source) para conectar aplicacoes de IA a sistemas externos: dados (arquivos, bancos), ferramentas e fluxos. Analogia oficial: uma porta USB-C para IA. URL: https://modelcontextprotocol.io/docs/getting-started/intro
84. [CONFIRMADO] Arquitetura cliente-servidor: o "host" (aplicacao de IA, como Claude Code ou Claude Desktop) cria um "cliente" MCP para cada "servidor" MCP; o servidor fornece contexto. Servidor local usa transporte stdio; servidor remoto usa Streamable HTTP. URL: https://modelcontextprotocol.io/docs/learn/architecture
85. [CONFIRMADO] Tres capacidades que servidores expoem: Tools (funcoes executaveis, como consultar banco ou chamar API), Resources (dados de contexto, como conteudo de arquivo) e Prompts (modelos reutilizaveis de interacao). URL: https://modelcontextprotocol.io/docs/learn/architecture
86. [CONFIRMADO] No Claude Code: resources podem ser citados com `@servidor:protocolo://caminho`; prompts de servidores aparecem como comandos `/mcp__servidor__prompt`. URL: https://code.claude.com/docs/en/mcp
87. [CONFIRMADO] Sintaxe atual para servidor remoto HTTP: `claude mcp add --transport http <nome> <url>` (exemplo oficial: `claude mcp add --transport http notion https://mcp.notion.com/mcp`). URL: https://code.claude.com/docs/en/mcp
88. [CONFIRMADO] Servidor remoto com cabecalho de autorizacao: `claude mcp add --transport http secure-api https://api.example.com/mcp --header "Authorization: Bearer your-token"`. URL: https://code.claude.com/docs/en/mcp
89. [CONFIRMADO] Servidor local (stdio): opcoes ANTES do nome, comando DEPOIS de `--`. Exemplo oficial: `claude mcp add --env AIRTABLE_API_KEY=SUA_CHAVE --transport stdio airtable -- npx -y airtable-mcp-server`. URL: https://code.claude.com/docs/en/mcp
90. [CONFIRMADO] O transporte SSE (`--transport sse`) esta marcado como obsoleto (deprecated); prefira HTTP quando disponivel. URL: https://code.claude.com/docs/en/mcp
91. [CONFIRMADO] Gerenciar: `claude mcp list`, `claude mcp get <nome>`, `claude mcp remove <nome>`, `claude mcp add-json <nome> '<json>'`; dentro da sessao, `/mcp`. URL: https://code.claude.com/docs/en/mcp
92. [CONFIRMADO] Escopos (`--scope` ou `-s`): `local` (padrao; so voce, so este projeto; guardado em `~/.claude.json`), `project` (compartilhado com a equipe; guardado em `.mcp.json` na raiz do projeto), `user` (todos os seus projetos; em `~/.claude.json`). URL: https://code.claude.com/docs/en/mcp
93. [CONFIRMADO] Em sessao interativa, o Claude Code pede aprovacao antes de usar servidores de projeto vindos do `.mcp.json`. URL: https://code.claude.com/docs/en/mcp
94. [CONFIRMADO] Aviso oficial: verifique se confia em cada servidor antes de conectar; servidores que buscam conteudo externo podem expor voce a prompt injection. URL: https://code.claude.com/docs/en/mcp
95. [CONFIRMADO] A Anthropic recomenda escrever seus proprios servidores ou usar de provedores confiaveis; ela revisa conectores do Anthropic Directory contra criterios de listagem, mas NAO faz auditoria de seguranca nem gerencia qualquer servidor MCP. Revisar o `.mcp.json` nao mostra todos os servidores carregados (ha outros escopos, conectores do claude.ai e plugins). URL: https://code.claude.com/docs/en/security
96. [CONFIRMADO] Conectores do claude.ai: se voce faz login com conta claude.ai, os conectores adicionados em claude.ai/customize/connectors ficam disponiveis no Claude Code automaticamente; rode `/mcp` para ver. URL: https://code.claude.com/docs/en/mcp
97. [CONFIRMADO] Conector personalizado (servidor MCP remoto) no claude.ai: Pro/Max vao em Customize > Connectors, "+ Add", "Add custom connector", informam nome e URL; em Team/Enterprise o Owner adiciona em Organization settings > Connectors. Funciona em planos Free (limite de 1), Pro, Max, Team e Enterprise. URL: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp
98. [CONFIRMADO] Avisos do suporte para conectores personalizados: nao sao verificados pela Anthropic; conecte so servidores confiaveis; servidores maliciosos podem esconder instrucoes para o Claude agir sem querer; desenvolvedores podem mudar o comportamento das ferramentas; revise pedidos de aprovacao e desative ferramentas desnecessarias; a funcao Research pode chamar ferramentas de conectores sem aprovacao, entao desative as que escrevem em apps externos. URL: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp
99. [CONFIRMADO] O Claude conecta ao servidor a partir da nuvem da Anthropic, entao conector personalizado precisa estar acessivel pela internet publica. URL: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp
100. [NAO CONFIRMADO] Wrapper `cmd /c npx` para servidores stdio no Windows nativo: a parte lida da pagina de MCP nao trouxe essa orientacao (pagina muito longa, trechos finais lidos sem esse item). Nao afirme nas aulas; peca ao aluno para consultar a pagina de MCP ou usar servidores HTTP remotos.
101. [NAO CONFIRMADO] Lista de "servidores MCP oficiais recomendados para iniciantes": nao foi levantada. Nao recomende servidores especificos como seguros.

## 9. Hooks e subagentes

102. [CONFIRMADO] Hooks: comandos de shell definidos pelo usuario que o Claude Code executa em pontos especificos do seu ciclo de vida, dando controle deterministico (a acao sempre acontece, em vez de depender da decisao do modelo). URL: https://code.claude.com/docs/en/hooks-guide
103. [CONFIRMADO] Hooks sao configurados em um bloco `hooks` num arquivo de configuracao (por exemplo `.claude/settings.json`); `/hooks` mostra o que esta configurado. URL: https://code.claude.com/docs/en/hooks-guide e https://code.claude.com/docs/en/best-practices
104. [CONFIRMADO] Eventos de exemplo: `SessionStart`, `UserPromptSubmit`, `PreToolUse` (antes de uma ferramenta rodar; pode bloquear), `PostToolUse` (depois que uma ferramenta tem sucesso), `Notification`, `Stop` (quando o Claude termina de responder). URL: https://code.claude.com/docs/en/hooks-guide
105. [CONFIRMADO] Diferenca para CLAUDE.md: CLAUDE.md e orientativo; hooks sao deterministicos e garantem a acao (ex.: rodar formatador depois de cada edicao). URL: https://code.claude.com/docs/en/best-practices
106. [CONFIRMADO] Subagentes: assistentes de IA especializados para os quais o Claude Code delega tarefas; cada um roda na propria janela de contexto, com prompt de sistema proprio, ferramentas e permissoes proprias; so o resumo final volta para a conversa principal. URL: https://code.claude.com/docs/en/sub-agents
107. [CONFIRMADO] Subagentes embutidos: Explore (busca e analise somente leitura), Plan (pesquisa durante o modo plano) e General-purpose (tarefas multi-etapa com todas as ferramentas). URL: https://code.claude.com/docs/en/sub-agents
108. [CONFIRMADO] Subagentes proprios: arquivo Markdown com frontmatter (so `name` e `description` obrigatorios) em `.claude/agents/` (projeto) ou `~/.claude/agents/` (todos os projetos). Pode-se pedir: "Use a subagent to ..." ou citar com `@`. URL: https://code.claude.com/docs/en/sub-agents
109. [CONFIRMADO] Subagentes ajudam a economizar contexto: pesquisa pesada acontece fora da conversa principal. Edicoes feitas por subagentes normalmente nao sao restauradas pelo `/rewind`; use git para reverter. URL: https://code.claude.com/docs/en/best-practices e https://code.claude.com/docs/en/checkpointing

---

## O que mudou ou pode mudar rapido (o aluno deve reconferir)

- Modo de permissao inicial: desde v2.1.283 o `auto` e o padrao no terminal/VS Code; antes era o Manual. Os rotulos da barra de status ("manual mode on", "accept edits on", "plan mode on", "auto mode on") e a ordem do ciclo do Shift+Tab podem mudar.
- Opcoes exibidas ao aprovar um plano (ex.: "Yes, manually approve edits", "No, keep planning") variam conforme o modo `auto` esteja disponivel.
- `/agents`: mudou de interface interativa para apenas um lembrete a partir de v2.1.198; confira no seu `/help`.
- `/cost` e `/stats` agora sao aliases de `/usage`; `/undo` e `/checkpoint` sao aliases de `/rewind`; `/reset` e `/new` sao aliases de `/clear`.
- `/init`: existe fluxo interativo opcional via variavel `CLAUDE_CODE_NEW_INIT=1`; o comportamento padrao pode mudar.
- Comando de instalacao e requisitos (versoes minimas de SO, Node.js 22 para npm, necessidade do Git for Windows) mudam com frequencia; sempre copie da pagina https://code.claude.com/docs/en/setup no dia da aula.
- Planos e acesso: o plano gratuito do claude.ai nao inclui Claude Code (hoje); confira a pagina oficial de precos (claude.com/pricing) para planos e limites. Nao cite valores.
- Menus do claude.ai: "Settings > Features" (skills) e "Customize > Connectors" (conectores) podem ser renomeados.
- MCP: transporte SSE esta obsoleto; a sintaxe `claude mcp add` (ordem de opcoes, `--` antes do comando stdio) e os escopos `local`/`project`/`user` merecem reconferencia. O protocolo MCP tem versoes datadas (a pagina atual cita a revisao 2026-07-28), entao detalhes tecnicos podem mudar.
- Skills: o formato exigido difere entre Claude Code (campos opcionais) e claude.ai/API (name e description obrigatorios, com limites). Skills nao sincronizam entre superficies.
- Recursos "em evolucao" citados nas paginas oficiais como experimentais ou previa (agent teams, agent view, dynamic workflows, `/goal`): evite ensinar a iniciantes.
- Numeros de versao citados na documentacao (por exemplo v2.1.283) avancam rapido; `claude --version` e `claude update` sao o caminho para conferir/atualizar.
