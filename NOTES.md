# Notas de autoria (convenções do projeto)

## Fluxo
- Escrever em `fonte/` e rodar `node build.mjs`. O build embute `assets/estilo.css` e os scripts em cada página (arquivos únicos, funcionam em qualquer navegador), injeta a guarda de entrada, as metatags do PWA e o registro do service worker, e gera `sw.js`. Nunca editar `lessons/`, `index.html` (raiz) nem `sw.js` à mão.
- Rodar `node test-curso.mjs` depois de qualquer mudança nas regras de progresso, na guarda ou no service worker.

## Currículo (fonte única)
- A trilha vive em `CURRICULO` e `CONCEITOS` dentro de `assets/curso.js`. Dali saem o motor de progresso, os cartões do painel (`fonte/index.html` tem o marcador `<!--MODULOS-->`, trocado pelo build) e `CURRICULO.md`. Para criar ou editar um módulo, mexer só lá e rodar `node build.mjs`.
- A trilha é aberta (sem limite de módulos). Módulos de ferramentas que mudam rápido levam `verificar: true` (aparecem como "fonte oficial a conferir").
- O Cowork (Módulo 17) e o conteúdo de Claude Chat, Artifacts e Projects ainda não têm fonte oficial verificada neste projeto: localizar e confirmar antes de escrever aulas, sem afirmar nada de memória.
- Exemplos sempre de domínio público: robô que passa café, tarefas da semana, carrinho de compras, finanças pessoais, gerenciador de tarefas.

## Público e tom
- Iniciante absoluto. Não pressupor nada: nem `print`, aspas, indentação, `:`, símbolos de comparação, "executar".
- Um conceito novo por aula (~25 min). Degraus: ler e prever, mudar uma coisa, completar, só então escrever.
- Começar pelo exemplo, descoberta guiada com dicas progressivas, depois uma tarefa. Feedback específico (o que acertou, qual foi o erro, por quê).
- Dados sempre fictícios. Privacidade e segurança na prática de código ("e se esse dado vazar?").
- Termos técnicos explicados na primeira aparição; uma ferramenta por vez.
- Não depender de uma pessoa tutora: textos falam em "o Claude (ou quem te acompanha)".

## Conteúdo sobre ferramentas
- Nunca ensinar recurso do Claude, Claude Code, MCP, API etc. de memória: confirmar na documentação oficial antes (ver RESOURCES.md) e citar a fonte na aula.

## Vídeos
- Sempre complemento opcional, de fonte confiável e conferida antes de indicar: título e canal reais, duração, disponibilidade, data e descrição. Registrar o que NÃO foi conferido (ex.: não assistido, minutagem desconhecida). Nunca inventar minutos nem conteúdo.
- Todo vídeo vem com a regra: antes (o que espera aprender), durante (prever), depois sem rever (escrever do que lembra e refazer algo no editor). Componente `.video` em `assets/estilo.css`.

## Progresso
- Motor em `assets/curso.js` (regras em PLANO.md). Estado em `localStorage` (`knicode.universal.v1`), por aparelho; não sincroniza entre aparelhos.
- Cada aula nova precisa de: `<meta name="curso-aula" content="NNNN">`, `data-concept` e `data-level` nos exercícios que dão evidência, uma recuperação com 3 perguntas e o registro em `COURSE.lessons`.
- Alguns navegadores tratam cada arquivo local como origem separada (ex.: Firefox), e o painel não enxerga o progresso das aulas. Chrome e Edge compartilham. Em site hospedado (https) isso não ocorre.
- No console do navegador: `Curso.debug.advanceDays(3)` avança o relógio do curso; `Curso.debug.reset()` zera tudo.

## Entrada e navegação
- Abrir qualquer arquivo do curso (carregamento novo, vindo de fora) leva ao painel. Seguir um link do curso, recarregar (F5) e voltar/avançar não mudam de página, para não perder atividade. Implementado em `assets/guarda.js` e em `assets/curso.js`.

## App (PWA)
- Ícone: urso robô (`assets/knicode-original.png`, 1254x1254), com versões 192, 512, maskable e iPhone.
- Instalar exige https (ou localhost). Android/Chrome: menu ⋮ → Instalar app. iPhone/Safari: Compartilhar → Adicionar à Tela de Início.
- O service worker guarda as páginas e, depois da primeira vez, o Python (Pyodide) e as fontes vindos de CDN, para funcionar offline.

## Estado do conteúdo (Partes 1 e 2)
- Módulos 1 a 6 (Python) têm todo exemplo, previsão, correção e solução executados em `test-conteudo.mjs` com o mesmo código de verificação do navegador (Pyodide).
- Módulos 7 e 8 (ágil e plano) não têm código na maior parte; a aula 0063 liga critérios de aceite a `assert`. Fontes conferidas: Manifesto Ágil (agilemanifesto.org/iso/ptbr/manifesto.html), Guia do Scrum (scrumguides.org), LGPD (Lei 13.709/2018) e Guia do Kanban (kanbanguides.org). Ainda vale reler essas fontes antes de publicar para o público.
- Recuperação de cada aula usa palavras-chave tolerantes; se um aluno escrever certo de outro jeito, a autoavaliação continua disponível.
