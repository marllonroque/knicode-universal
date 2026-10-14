# KNICode (versão universal)

Curso interativo e gratuito para quem **nunca programou** e quer aprender lógica de programação em Python e a trabalhar bem com as ferramentas do ecossistema Claude (Claude, Projetos, Artifacts, Claude Code, skills, MCP e API).

- Uma ideia nova por aula, cerca de 30 minutos por dia.
- Prática em todas as aulas: o Python roda no próprio navegador, com feedback na hora.
- Recuperação sem consulta entre aulas, revisões espaçadas e progresso por módulo.
- Funciona como app instalável (PWA) e, depois da primeira visita, também offline.
- Dados sempre fictícios. Privacidade e segurança entram desde a primeira aula.

Trilha completa: [PLANO.md](PLANO.md). Fontes: [RESOURCES.md](RESOURCES.md).

## Como usar

Abra `index.html` (o painel dos módulos) no navegador e comece pela aula 1. O progresso fica salvo só no seu aparelho e começa do zero.

Para testar como site e como app (o service worker só funciona em `localhost` ou `https`):

```bash
node serve.mjs
```

e abra `http://localhost:5183/`.

## Estrutura

```
fonte/            páginas escritas à mão (painel, aulas, recuperações)
assets/           estilo.css, aula.js, curso.js (progresso), guarda.js, sw-modelo.js, ícone original
lessons/          aulas prontas, geradas pelo build (não editar à mão)
index.html        painel gerado pelo build
manifest.webmanifest, sw.js, icon*.png   app instalável (sw.js é gerado)
build.mjs         gera lessons/, index.html e sw.js a partir de fonte/ e assets/
serve.mjs         servidor local para testes
test-curso.mjs    testes das regras de avanço, da guarda de entrada e do service worker
PLANO.md, RESOURCES.md, NOTES.md
```

## Como contribuir com uma aula

1. Escrever `fonte/NNNN-nome.html` (veja a aula 1 como modelo) e a recuperação `fonte/recuperacao-NNNN.html`.
2. Registrar a aula em `COURSE.lessons` e os conceitos do módulo em `assets/curso.js`.
3. Rodar `node build.mjs` e `node test-curso.mjs`.

Detalhes e convenções em [NOTES.md](NOTES.md).

## Licença

A definir pelo autor antes da publicação.
