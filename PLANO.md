# KNICode: método e regras

Formação aberta para quem parte do **zero absoluto** e quer chegar a construir, proteger e publicar projetos reais, unindo **gestão de projetos**, **programação em Python com vibe coding** e o **ecossistema Claude**. A matriz completa de módulos, com exercício e critério de cada um, está em [CURRICULO.md](CURRICULO.md) (gerada a partir de `assets/curso.js`).

## Trilha aberta

Não há limite de módulos. A trilha tem seis partes e cresce por acréscimo de módulos:

1. **Lógica e Python:** algoritmos, variáveis, decisões, repetições, funções, listas, erros e testes.
2. **Gestão de projetos e mentalidade ágil:** backlog, prioridades, entregas pequenas, requisitos e critérios de aceite.
3. **Vibe coding e engenharia de prompts:** pedir bem, encadear passos e dirigir a IA com responsabilidade.
4. **Ecossistema Claude:** Claude Chat, Artifacts, Projects, Claude Code, skills, MCP e conectores, agentes e orquestração, e a API.
5. **No ar, com segurança:** Git e GitHub, hospedagem na nuvem, segurança de dados e LGPD para desenvolvedores.
6. **Projetos e carreira:** projeto integrador e portfólio.

**Sobre "nível profissional".** Nenhum curso sozinho garante isso. A formação cobre as práticas que um profissional usa, e o nível vem de projetos reais: o projeto integrador e o portfólio existem para isso. A trilha não promete emprego nem certificação.

## Método

- **Exemplo antes da definição.** Cada aula começa mostrando algo funcionando e perguntando o que muda se uma entrada mudar.
- **Metáforas do cotidiano.** Um robô que passa café, a organização das tarefas da semana, um carrinho de compras. Os exemplos são sempre de domínio público e fáceis de entender.
- **Descoberta guiada.** Dois ou três exemplos com uma diferença pequena; você encontra o padrão, com dicas progressivas.
- **Prática com feedback na hora.** O Python roda no navegador, e cada exercício diz o que acertou, o que errou e por quê.
- **Recuperação ativa e revisão espaçada.** Toda aula começa recuperando a anterior sem consultar.
- **Vibe coding responsável.** Você descreve, a IA gera, e você **lê, testa e ajusta**: especificar, gerar, ler, testar, ajustar. A IA escreve; quem responde pelo resultado é você.
- **Privacidade e segurança na prática.** "E se esse dado vazar?" aparece desde a aula 1.
- **Um conceito novo por aula** (cerca de 25 minutos), sem pressupor nenhum conhecimento prévio.

**Dados fictícios, sempre.** Nenhum exercício usa dados reais de pessoas.

**Ferramentas mudam rápido.** Antes de cada aula sobre uma ferramenta, o conteúdo é conferido na documentação oficial (ver [RESOURCES.md](RESOURCES.md)). Módulos nessa situação aparecem marcados como "fonte oficial a conferir".

---

## Regra de avanço (implementada em `assets/curso.js`, testada em `test-curso.mjs`)

**Entre aulas.** Para liberar a próxima aula: recuperação do começo, sem consulta, com pelo menos **2 de 3** perguntas certas. Errou: não é reprovação; reveja o ponto e tente de novo.

**Níveis por conceito.** Compreensão, execução (sem dica; com dica conta só como "com apoio"), retenção (acerta 3 ou mais dias depois, sem rever) e transferência (aplica em cenário novo). Status: Não compreendido, Em aprendizagem, Executa com apoio, Executa sozinho, Retido, Transferido.

**Módulo concluído** (`[CONCLUÍDO]`): todos os conceitos centrais com compreensão e "Executa sozinho" (ou melhor), pelo menos 60% retidos, transferência aprovada e exercício final entregue sem apoio.

**Quase lá.** Com o exercício final sem apoio e pelo menos 80% dos conceitos "Executa sozinho", o módulo seguinte abre e o anterior ganha `[REVISÃO PENDENTE]` com os pontos fracos.

**Revisões espaçadas.** 1, 3, 7, 14 e 30 dias após a aula. Errou: antecipa para o dia seguinte.

**Estado inicial e armazenamento.** O progresso fica no `localStorage` do navegador, neste aparelho. Com o armazenamento vazio, o curso começa no marco zero: **Módulo 1 `[EM ANDAMENTO]`** e todos os outros `[BLOQUEADO]`.
