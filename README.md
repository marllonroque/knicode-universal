# KNICode (versão universal)

Formação aberta, interativa e gratuita para quem parte do **zero absoluto** e quer aprender **gestão de projetos**, **programação em Python com vibe coding** e o **ecossistema Claude** (Chat, Artifacts, Projects, Claude Code, skills, MCP, agentes e API), até publicar um app seu, com segurança e respeito à privacidade (LGPD).

- **Trilha aberta, sem limite de módulos:** 24 módulos em 6 partes hoje, e a lista cresce. Veja a [matriz curricular](CURRICULO.md) e o [método e as regras](PLANO.md).
- Uma ideia nova por aula, cerca de 30 minutos por dia, sempre com prática: o Python roda no próprio navegador, com feedback na hora.
- Exemplos do dia a dia e de domínio público (um robô que passa café, tarefas da semana, carrinho de compras, finanças pessoais).
- Recuperação sem consulta entre aulas, revisões espaçadas e progresso por módulo.
- Funciona como app instalável (PWA) e, depois da primeira visita, também offline.
- Dados sempre fictícios. Privacidade e segurança entram desde a primeira aula.
- Honestidade: o curso entrega práticas profissionais e projetos reais; não promete emprego nem certificação.

Estão prontas as **128 aulas dos Módulos 1 a 16**: Python do zero até lógica intermediária (laços compostos, leitura de logs, erros e testes), mentalidade ágil e plano de produto, engenharia de prompts, vibe coding responsável e o ecossistema Claude (Chat, Artifacts, Projects, Claude Code, Skills e MCP). Cada aula termina com quiz, e cada módulo, com exercício final e problema novo. As Partes 5 e 6 vêm depois.

## Como usar

Abra `index.html` (o painel dos módulos) no navegador e comece pela aula 1. O progresso fica salvo só no seu aparelho e começa do zero: Módulo 1 em andamento e os demais bloqueados.

Para testar como site e como app (o service worker só funciona em `localhost` ou `https`):

```bash
node serve.mjs
```

e abra `http://localhost:5183/`.

## Estrutura

```
assets/curso.js    currículo (fonte única da trilha) + motor de progresso + interface
assets/aula.js     componentes das aulas (executor de Python, quiz, anotações)
assets/estilo.css, guarda.js, sw-modelo.js, knicode-original.png
fonte/             páginas escritas à mão (painel, aulas, recuperações)
lessons/           aulas prontas, geradas pelo build (não editar à mão)
index.html         painel gerado pelo build
CURRICULO.md       matriz curricular gerada pelo build
manifest.webmanifest, sw.js, icon*.png   app instalável (sw.js é gerado)
build.mjs          gera lessons/, index.html, CURRICULO.md e sw.js
serve.mjs          servidor local para testes
test-curso.mjs     testes das regras de avanço, do currículo, da tolerância ao teclado e do service worker
PLANO.md, RESOURCES.md, NOTES.md
```

## Como contribuir

- **Uma aula:** escrever `fonte/NNNN-nome.html` (veja a aula 1 como modelo) e a recuperação `fonte/recuperacao-NNNN.html`; registrar em `COURSE.lessons` e os conceitos do módulo em `assets/curso.js`.
- **Um módulo novo:** acrescentar uma linha em `CURRICULO` (`assets/curso.js`). O painel e a matriz se atualizam no build.
- Depois, rodar `node build.mjs` e `node test-curso.mjs`. Detalhes e convenções em [NOTES.md](NOTES.md).

## Licença

[MIT](LICENSE): uso, cópia, modificação e distribuição livres, inclusive para fins comerciais, mantendo o aviso de copyright. Projeto aberto e educacional.
