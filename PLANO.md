# Trilha do KNICode (versão universal)

Para quem nunca programou e quer aprender **lógica de programação** e a trabalhar bem com as ferramentas do ecossistema **Claude**. Um conceito novo por aula, 30 minutos por dia, sempre com prática e feedback.

**Como ler os tempos.** "Aulas" são sessões de cerca de 25 minutos mais 5 de revisão do dia anterior. "Sessão de 1 h" substitui algumas aulas por um mini-projeto ou revisão maior. São estimativas: a trilha se ajusta ao desempenho de quem estuda.

**Dados fictícios, sempre.** Nenhum exercício usa dados reais de pessoas. Privacidade e segurança entram em todos os módulos, não só no módulo dedicado.

**Ferramentas mudam rápido.** Antes de cada aula sobre uma ferramenta do Claude, o conteúdo é conferido na documentação oficial (ver `RESOURCES.md`). Nada é ensinado só de memória.

---

## Módulo 1: Primeiros passos em código (Python)
- **Ensina:** o que é um programa, `print`, texto e aspas, variáveis, tipos (número x texto), entrada de dados (`input`), ler mensagens de erro, privacidade básica.
- **Por que primeiro:** é a base de tudo; sem ler código simples, não dá para revisar o que a IA escreve.
- **Tempo:** 8 aulas + 1 sessão de 1 h.
- **Exercício:** ficha de cadastro simples no terminal.
- **Ao final consegue:** prever a saída de um programa curto, corrigir um erro de escrita e escrever um programa pequeno do zero.

## Módulo 2: Lógica de decisão
- **Ensina:** comparações, verdadeiro e falso, `if`, `else`, `elif`, ordem das regras, limites (`>` x `>=`), `and`/`or`/`not`.
- **Por que agora:** toda regra de um sistema é uma decisão sobre dados.
- **Tempo:** 8 aulas.
- **Exercício:** regras de desconto e de classificação de pedidos.
- **Ao final consegue:** achar erro de ordem ou de limite numa regra e alterar a regra sozinho.

## Módulo 3: Funções
- **Ensina:** funções (`def`), entradas, `return`, reaproveitamento, nomes que explicam.
- **Tempo:** 8 aulas + 1 h.
- **Exercício:** transformar os exercícios anteriores em funções reutilizáveis.
- **Ao final consegue:** quebrar um problema em funções pequenas e ler funções escritas por outra pessoa ou pela IA.

## Módulo 4: Listas, laços e dicionários
- **Ensina:** listas, `for`, dicionários, filtrar e ordenar, ler arquivos simples (texto e CSV).
- **Tempo:** 10 aulas + 1 h.
- **Exercício:** organizar e resumir uma lista de pedidos fictícios.
- **Ao final consegue:** ler um script que percorre uma lista e dizer o que sai; corrigir um laço que pula itens.

## Módulo 5: Erros, testes e depuração
- **Ensina:** tipos de erro, ler o rastreamento, testes simples, depurar com `print`.
- **Por que aqui:** o código da IA falha; revisar é achar o erro e provar a correção.
- **Tempo:** 8 aulas.
- **Exercício:** corrigir um script com defeitos plantados e escrever testes que os revelam.
- **Ao final consegue:** transformar uma regra em casos de teste e usá-los para conferir código gerado.

## Módulo 6: Engenharia de prompts
- **Ensina:** pedir com contexto, dar exemplos, definir o formato da resposta, dividir tarefas, iterar e avaliar o resultado.
- **Tempo:** 8 aulas.
- **Exercício:** escrever e melhorar prompts para tarefas de programação e checar as respostas com testes.
- **Ao final consegue:** escrever pedidos claros e verificáveis e reconhecer quando a resposta da IA não serve.

## Módulo 7: Claude, Projetos e Artifacts
- **Ensina:** organizar conversas e conhecimento em Projetos, instruções persistentes, criar e refinar Artifacts (páginas e ferramentas).
- **Tempo:** 8 aulas + 1 h.
- **Exercício:** montar um Projeto de estudo e um Artifact útil, revisando o código gerado.
- **Ao final consegue:** escolher o recurso certo para cada tarefa e revisar o que o Claude entrega.

## Módulo 8: Segurança e privacidade com IA
- **Ensina:** segredos e chaves, dados pessoais, o que nunca colar numa IA, validação de entrada, revisão de código gerado, riscos comuns.
- **Tempo:** 6 aulas.
- **Exercício:** revisar com um checklist um código gerado pela IA.
- **Ao final consegue:** identificar riscos básicos e priorizar o que corrigir.

## Módulo 9: Claude Code
- **Ensina:** programar com um assistente no terminal: pedir, revisar mudanças, rodar testes, versionar com git.
- **Tempo:** 10 aulas + 2 h.
- **Exercício:** construir e melhorar um pequeno programa, com testes, revisando cada mudança.
- **Ao final consegue:** dirigir o Claude Code com especificações claras e rejeitar mudanças que não passam na revisão.

## Módulo 10: Skills, MCP e conectores
- **Ensina:** o que são skills, como o MCP liga a IA a ferramentas e dados, conectores, e os cuidados de permissão.
- **Tempo:** 8 aulas.
- **Exercício:** criar uma skill simples e avaliar os riscos de uma conexão.
- **Ao final consegue:** estender o Claude de forma útil e segura.

## Módulo 11: API da Anthropic e agentes
- **Ensina:** chamar o Claude por código, ferramentas, o que é um agente, workflow x agente, avaliação e riscos.
- **Tempo:** 8 aulas + 1 h.
- **Exercício:** um programa que usa a API para uma tarefa real e pequena, com limites claros.
- **Ao final consegue:** explicar quando usar um agente e quais cuidados ele exige.

## Módulo 12: Projeto final
- **Entrega:** um app seu, funcional, testado, seguro e publicado, feito com a IA como parceira e você revisando cada parte.
- **Tempo:** 6 sessões de 1 h.
- **Critério:** passa nos seus testes e no checklist de segurança, e você explica cada parte sem consultar.

---

## Regra de avanço (implementada em `assets/curso.js`, testada em `test-curso.mjs`)

**Entre aulas.** Para liberar a próxima aula: recuperação do começo, sem consulta, com pelo menos **2 de 3** perguntas certas. Errou: não é reprovação; reveja o ponto e tente de novo.

**Níveis por conceito.** Compreensão, execução (sem dica; com dica conta só como "com apoio"), retenção (acerta 3 ou mais dias depois, sem rever) e transferência (aplica em cenário novo). Status: Não compreendido, Em aprendizagem, Executa com apoio, Executa sozinho, Retido, Transferido.

**Módulo concluído** (`[CONCLUÍDO]`): todos os conceitos centrais com compreensão e "Executa sozinho" (ou melhor), pelo menos 60% retidos, transferência aprovada e exercício final entregue sem apoio.

**Quase lá.** Com o exercício final sem apoio e pelo menos 80% dos conceitos "Executa sozinho", o módulo seguinte abre e o anterior ganha `[REVISÃO PENDENTE]` com os pontos fracos.

**Revisões espaçadas.** 1, 3, 7, 14 e 30 dias após a aula. Errou: antecipa para o dia seguinte.

**Estado.** O progresso fica no `localStorage` do navegador (neste aparelho). Começa do zero: Módulo 1 aberto, os demais bloqueados.
