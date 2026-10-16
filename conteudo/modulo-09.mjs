// Módulo 9: Engenharia de prompts: fundamentos (universal). Fio condutor: transformar pedidos vagos em pedidos bons e conferir as respostas.
// Prompts não rodam na página: o aluno classifica, compara e escreve pedidos; o Python entra para montar e conferir textos.
// Fatos usados: só os [CONFIRMADO] de conteudo/fontes/FATOS-chat-artifacts-projects-prompts.md.
export const meta = {
  final: "Mini-projeto: reescrever 5 pedidos vagos e planejar como conferir cada resposta",
  transfer: "Reescrever um pedido vago de estudo",
};
const aulas = [];
const AVISO = "Ferramentas mudam: reconfira na documentação oficial.";
const FONTE_BOAS = `guia oficial de boas práticas de prompts (platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices). ${AVISO}`;
const FONTE_INICIO = `como começar a usar o Claude (support.claude.com/en/articles/8114491-get-started-with-claude) e guia oficial de boas práticas de prompts (platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices). ${AVISO}`;
const FONTE_ERROS = `quando o Claude erra (support.claude.com/en/articles/8525154-claude-is-providing-incorrect-or-misleading-responses-what-s-going-on) e o guia oficial de boas práticas de prompts. ${AVISO}`;
const FONTE_SENSIVEL = `dados sensíveis em chats com o Claude (support.claude.com/en/articles/8325621-i-would-like-to-input-sensitive-data-into-my-chats-with-claude-who-can-view-my-conversations). ${AVISO}`;

// ---------- Aula 67: o prompt e o objetivo ----------
aulas.push({
  id: "0067", modulo: 9, n: 1, slug: "o-prompt-e-o-objetivo", titulo: "O prompt: o resultado depende do pedido",
  resumo: "O Claude responde ao que está escrito. Hoje você aprende a trocar um pedido vago por um pedido com objetivo claro.",
  semCodigo: true,
  objetivos: ["Explicar o que é um prompt e por que o resultado depende dele.", "Reconhecer um pedido vago.", "Escrever um pedido com ação, assunto e finalidade."],
  conceitos: [["pf_objetivo", "Prompt e objetivo claro"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você pede a um desconhecido: “Me ajuda com a loja.” Ele consegue ajudar de verdade? O que ele precisaria perguntar de volta?", modelo: "Não consegue: não sabe **qual** loja, **que** ajuda nem **para quê**. Teria de perguntar. Um pedido claro já traz essas respostas, e com o Claude é igual." },
    { tipo: "texto", titulo: "Prompt é o pedido que você escreve", blocos: [
      "**Prompt** é o texto que você escreve para o Claude: a pergunta, a tarefa, tudo o que você envia. O Claude trabalha **a partir do que está escrito**. Se faltar informação, ele precisa adivinhar, e a resposta pode sair bonita e inútil.",
      "A orientação oficial é falar naturalmente, como com um colega, ser específico e refinar com perguntas de acompanhamento. Um teste simples: mostre o pedido a uma pessoa sem contexto. Se ela ficaria confusa, o Claude também ficaria.",
      "Um pedido com **objetivo claro** tem três partes: a **ação** (verbo: escreva, compare, resuma), o **assunto** (sobre o quê) e a **finalidade** (para quê vai servir)." ],
      tabela: { cab: ["Pedido", "O que falta"], linhas: [["Fale sobre café.", "Ação, finalidade, tudo."], ["Escreva uma descrição do café Serra Alta (fictício).", "Para onde vai e para quem."], ["Escreva 3 frases sobre o café Serra Alta (fictício) para a página do produto da minha loja virtual, para atrair quem busca presente.", "Quase nada: está claro."]] },
      termos: [["Prompt", "o texto que você envia ao Claude."], ["Pedido vago", "um pedido em que o Claude precisa adivinhar o que você quer."], ["Finalidade", "para que a resposta vai servir."]], fonte: FONTE_INICIO },
    { tipo: "prever", texto: "Responda com uma palavra. O pedido é **vago** ou **claro**?", conceito: "pf_objetivo", itens: [
      { pergunta: "“Me ajuda com minhas finanças.”", rotulo: "Pedido 1", resposta: "vago", porque: "Não diz o que fazer, com quais dados nem para quê." },
      { pergunta: "“Liste 5 gastos que costumam sobrar no cartão de crédito de quem está começando a se organizar, para eu revisar este mês.”", rotulo: "Pedido 2", resposta: "claro", porque: "Tem ação (liste), assunto (gastos no cartão) e finalidade (revisar este mês)." },
      { pergunta: "Qual é a **ação** (o verbo) em “Compare dois planos de internet para uma casa com 4 pessoas”?", rotulo: "Pedido 3", resposta: "compare", porque: "O verbo diz o que o Claude deve fazer." }] },
    { tipo: "descobrir", texto: "Compare os dois pedidos para a mesma tarefa.", tabela: { cab: ["", "Pedido fraco", "Pedido forte"], linhas: [["Texto", "Escreva um e-mail para o cliente.", "Escreva um e-mail de 4 linhas avisando que o pedido 123 atrasou 2 dias."], ["O Claude precisa adivinhar", "Assunto, tamanho, motivo.", "Quase nada."], ["Resposta provável", "Genérica, longa, com campos inventados.", "Curta, no assunto, fácil de conferir."]] }, dicas: ["Olhe a linha “O Claude precisa adivinhar”.", "Quanto menos o Claude adivinha, mais fácil é conferir a resposta."],
      pergunta: "Por que o pedido forte gera uma resposta mais fácil de conferir?", explicacao: "O pedido forte diz **o que** deve aparecer (aviso do atraso do pedido 123, 4 linhas). Com o objetivo escrito, você compara a resposta com ele. No pedido fraco, não há o que comparar.", conceito: "pf_objetivo" },
    { tipo: "aberta", titulo: "Reescreva o pedido", texto: "Pedido vago: “Me ajuda com minhas finanças.”", pergunta: "Reescreva em uma ou duas frases, com **ação**, **assunto** e **finalidade**. Use números fictícios, se precisar.", minimo: 60, conceito: "pf_objetivo", modelo: "Um bom exemplo: “Monte uma lista de 6 categorias para organizar meus gastos mensais de uma pessoa que mora sozinha, para eu começar uma planilha hoje.” Tem ação (monte), assunto (categorias de gastos) e finalidade (começar a planilha)." },
    { tipo: "aberta", tag: "sec", titulo: "O que não colar no pedido", texto: "Para pedir ajuda com as finanças, uma pessoa cola no chat o extrato inteiro, com CPF, número da conta e a senha do aplicativo do banco.", pergunta: "Qual é o risco? O que fazer no lugar?", modelo: "A Anthropic recomenda cautela com **dados financeiros e senhas**. Troque por dados **fictícios** (valores e nomes inventados) e descreva o problema com palavras. Quanto menos dado pessoal, melhor.", conceito: "pf_objetivo" },
    { tipo: "quiz", itens: [
      { pergunta: "O que é um prompt?", opcoes: ["O texto que você envia", "Uma senha do chat", "Um tipo de programa", "A resposta do Claude"], correta: 0, porque: "Prompt é o pedido escrito que você envia ao Claude.", conceito: "pf_objetivo" },
      { pergunta: "O que torna um pedido vago?", opcoes: ["Ser muito longo", "Ter muitos verbos", "Obrigar a adivinhar", "Citar números"], correta: 2, porque: "Quando faltam informações, o Claude precisa adivinhar.", conceito: "pf_objetivo" },
      { pergunta: "Qual pedido tem objetivo claro?", opcoes: ["Me ajuda com a minha loja hoje", "Fale sobre preços de produtos", "Escreva algo legal para mim", "Resuma esta avaliação em 2 linhas"], correta: 3, porque: "Tem ação (resuma), assunto (a avaliação) e tamanho definido.", conceito: "pf_objetivo" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que é um prompt e quais são as três partes de um pedido com objetivo claro?", conceito: "pf_objetivo", modelo: "Prompt é o texto que você envia ao Claude. Um pedido claro tem **ação** (verbo), **assunto** (sobre o quê) e **finalidade** (para quê). Sem isso, o Claude adivinha." },
  ],
  recuperacao: [
    { p: "O que é um prompt?", regex: "(texto|pedido|instrucao|mensagem|pergunta)", modelo: "É o texto (o pedido) que a pessoa envia ao Claude.", conceito: "pf_objetivo" },
    { p: "Quais são as três partes de um pedido com objetivo claro?", regex: "(acao|verbo);;(assunto|o que|sobre);;(finalidade|para que|objetivo)", modelo: "Ação (verbo), assunto (sobre o quê) e finalidade (para quê).", conceito: "pf_objetivo" },
    { p: "Por que não colar senhas ou CPF no pedido?", regex: "(sensiv|senha|financ|dados|fictici|risco|cautela)", modelo: "Porque são dados sensíveis; use dados fictícios.", conceito: "pf_objetivo" },
  ],
});

// ---------- Aula 68: contexto, público e tom ----------
aulas.push({
  id: "0068", modulo: 9, n: 2, slug: "contexto-publico-tom", titulo: "Contexto: conte a situação, o público e o tom",
  resumo: "O Claude não sabe quem você é, onde a resposta vai aparecer nem quem vai ler. Contar isso muda o resultado.",
  objetivos: ["Dar contexto suficiente para o Claude não adivinhar.", "Dizer quem vai ler a resposta (público).", "Pedir um tom (formal, simples, amigável)."],
  conceitos: [["pf_contexto", "Contexto, público e tom"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você pede “explique juros compostos” duas vezes: uma para uma criança de 10 anos e outra para um contador. As respostas deveriam ser iguais? Por quê?", modelo: "Não. O **público** muda as palavras, os exemplos e o nível de detalhe. Por isso o pedido deve dizer **para quem** é a resposta." },
    { tipo: "texto", titulo: "Situação, público e tom", blocos: [
      "**Contexto** é a situação por trás do pedido: quem você é, onde a resposta será usada e por que a tarefa existe. O guia oficial recomenda explicar o motivo da instrução, porque isso ajuda o Claude a acertar também nos detalhes que você não escreveu.",
      "**Público** é quem vai ler. **Tom** é o jeito de falar: formal, simples, amigável, direto. Dizer “para clientes de uma loja virtual, em tom simpático e curto” já elimina muitos erros.",
      "Cuidado com o excesso: contexto serve para **orientar**, não para despejar tudo o que você sabe. Inclua só o que muda a resposta." ],
      termos: [["Contexto", "a situação por trás do pedido."], ["Público", "a pessoa que vai ler a resposta."], ["Tom", "o jeito de falar do texto."]], fonte: FONTE_BOAS },
    { tipo: "prever", texto: "Veja uma função que monta o pedido a partir de partes. Preveja a **segunda linha** da saída.", conceito: "pf_contexto", itens: [
      { codigo: `def montar(objetivo, publico):
    return "Objetivo: " + objetivo + "\\nPúblico: " + publico

print(montar("explicar juros", "criança de 10 anos"))`, linha: 1, resposta: "Público: criança de 10 anos", pergunta: "Segunda linha:", porque: "O `\\n` quebra a linha, e a segunda linha traz o público." },
      { codigo: `partes = ["Objetivo", "Público", "Tom"]
print(len(partes))`, resposta: "3", pergunta: "O que aparece?", porque: "A lista tem 3 itens." }] },
    { tipo: "descobrir", texto: "O mesmo objetivo, com contextos diferentes.", tabela: { cab: ["Pedido", "Resposta esperada"], linhas: [["Explique o que é o boleto.", "Definição geral, sem foco em ninguém."], ["Explique o que é o boleto para quem nunca comprou online, em tom simples, em 3 frases.", "Texto curto, palavras do dia a dia, sem termos técnicos."], ["Explique o que é o boleto para o FAQ da minha loja virtual, em tom simpático.", "Texto no estilo de perguntas frequentes, com cara de loja."]] }, dicas: ["O que mudou entre a primeira e a segunda linha?", "Compare o que cada pedido diz sobre quem lê."],
      pergunta: "O que o contexto e o público mudaram na resposta esperada?", explicacao: "Mudaram o **vocabulário**, o **tamanho** e o **estilo**. O assunto era o mesmo; o contexto disse **onde** a resposta aparece e **quem** lê.", conceito: "pf_contexto" },
    { tipo: "corrigir", texto: "A função deveria montar as três linhas (`Objetivo`, `Contexto`, `Público`), mas esqueceu o contexto. Conserte a função.", arquivo: "montar_prompt.py", dica: "Falta uma linha entre objetivo e público, usando `contexto`.", conceito: "pf_contexto",
      codigo: `def montar_prompt(objetivo, contexto, publico):
    return "Objetivo: " + objetivo + "\\nPúblico: " + publico

print(montar_prompt("Explicar juros compostos", "App de finanças para iniciantes", "Pessoas sem estudo em finanças"))`,
      esperado: ["Objetivo: Explicar juros compostos", "Contexto: App de finanças para iniciantes", "Público: Pessoas sem estudo em finanças"],
      solucao: `def montar_prompt(objetivo, contexto, publico):
    return "Objetivo: " + objetivo + "\\nContexto: " + contexto + "\\nPúblico: " + publico

print(montar_prompt("Explicar juros compostos", "App de finanças para iniciantes", "Pessoas sem estudo em finanças"))` },
    { tipo: "aberta", titulo: "Dê contexto ao pedido", texto: "Pedido seco: “Escreva um aviso sobre a troca de produtos.”", pergunta: "Reescreva incluindo contexto (que loja, que situação), público e tom.", minimo: 60, conceito: "pf_contexto", modelo: "Exemplo: “Escreva um aviso de 3 linhas sobre a política de troca de uma loja virtual de roupas (fictícia), para clientes que acabaram de comprar, em tom simpático e direto.” Tem situação, público e tom." },
    { tipo: "aberta", tag: "sec", titulo: "Contexto demais", texto: "Para “dar contexto”, uma pessoa cola no chat a conversa inteira com um cliente, com nome completo, endereço e telefone.", pergunta: "O que há de errado? Como dar contexto sem expor ninguém?", modelo: "O contexto deve orientar, **não expor**. Resuma a situação com palavras (“cliente reclamou de atraso de 2 dias”) e use nomes e dados **fictícios**. Só inclua o que muda a resposta.", conceito: "pf_contexto" },
    { tipo: "quiz", itens: [
      { pergunta: "Para que serve dizer o público no pedido?", opcoes: ["Para ajustar a linguagem", "Para a resposta ficar maior", "Para economizar palavras", "Para o Claude ficar quieto"], correta: 0, porque: "O público define vocabulário, exemplos e nível de detalhe.", conceito: "pf_contexto" },
      { pergunta: "O que é tom?", opcoes: ["O tamanho da resposta", "O jeito de falar do texto", "A língua do pedido", "O nome do assunto"], correta: 1, porque: "Tom é o estilo: formal, simples, simpático, direto.", conceito: "pf_contexto" },
      { pergunta: "Qual contexto é o mais útil?", opcoes: ["Tudo que sei da empresa", "O nome de todos os clientes", "Só o que muda a resposta", "Nenhum, por segurança"], correta: 2, porque: "Contexto orienta; o excesso confunde e pode expor dados.", conceito: "pf_contexto" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que são contexto, público e tom, e por que incluí-los?", conceito: "pf_contexto", modelo: "Contexto é a situação do pedido; público, quem vai ler; tom, o jeito de falar. Incluí-los evita que o Claude adivinhe e deixa a resposta pronta para o uso real." },
  ],
  recuperacao: [
    { p: "Para que serve dizer o público de uma resposta?", regex: "(ler|leitor|quem|linguagem|nivel|vocabulario|ajust)", modelo: "Para ajustar a linguagem e o nível de detalhe a quem vai ler.", conceito: "pf_contexto" },
    { p: "O que é o tom de um texto?", regex: "(jeito|estilo|forma|formal|simpatic|falar)", modelo: "É o jeito de falar do texto: formal, simpático, direto.", conceito: "pf_contexto" },
    { p: "Por que não colar dados de clientes como contexto?", regex: "(sensiv|pessoa|expoe|privacidade|fictici|resum|dados)", modelo: "Porque expõe dados pessoais; resuma e use dados fictícios.", conceito: "pf_contexto" },
  ],
});

// ---------- Aula 69: formato de saída ----------
aulas.push({
  id: "0069", modulo: 9, n: 3, slug: "formato-de-saida", titulo: "Formato de saída: diga como quer a resposta",
  resumo: "Lista, tabela, 3 frases ou um número só: quem define o formato recebe uma resposta pronta para usar e fácil de conferir.",
  objetivos: ["Pedir um formato de saída (lista, tabela, tamanho).", "Explicar por que o formato facilita a conferência.", "Conferir com Python se a resposta respeitou o formato."],
  conceitos: [["pf_formato", "Formato de saída"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você pede ideias de nomes para sua loja e recebe um texto de 4 parágrafos. O que você preferiria receber para escolher rápido?", modelo: "Uma **lista curta e numerada**, por exemplo 5 nomes, um por linha. O formato certo economiza tempo e deixa a resposta fácil de conferir." },
    { tipo: "texto", titulo: "Formato é parte do pedido", blocos: [
      "Se você não diz o formato, o Claude escolhe um. O guia oficial tem uma seção inteira sobre controlar o formato das respostas: dizer **o que fazer** (“responda em 3 itens com hífen”) costuma funcionar melhor do que só dizer o que não fazer.",
      "Formatos úteis: **lista** (um item por linha), **tabela** (colunas definidas), **tamanho** (3 frases, até 50 palavras), **campos fixos** (`Nome:` e `Preço:`) e **resposta curta** (só um número).",
      "Um formato claro também permite **conferir por código**: contar linhas, ver se o campo existe, checar se é número." ],
      termos: [["Formato de saída", "o jeito como a resposta deve vir: lista, tabela, tamanho, campos."], ["Campos fixos", "linhas com nomes combinados, como `Nome:` e `Preço:`."]], fonte: FONTE_BOAS },
    { tipo: "prever", texto: "Preveja o que a função devolve.", conceito: "pf_formato", itens: [
      { codigo: `resposta = "- Pão\\n- Leite\\n- Café"
print(len(resposta.split("\\n")))`, resposta: "3", pergunta: "O que aparece?", porque: "`split(\"\\n\")` separa por linha: 3 linhas." },
      { codigo: `linha = "- Pão"
print(linha.startswith("- "))`, resposta: "True", pergunta: "O que aparece?", porque: "A linha começa com hífen e espaço." },
      { codigo: `linha = "Pão"
print(linha.startswith("- "))`, resposta: "False", pergunta: "O que aparece?", porque: "Não começa com hífen e espaço." }] },
    { tipo: "descobrir", texto: "O mesmo pedido, com e sem formato.", tabela: { cab: ["Pedido", "Resposta esperada"], linhas: [["Sugira nomes para minha loja de plantas.", "Parágrafo longo com explicações misturadas."], ["Sugira 5 nomes para minha loja de plantas, em lista, um por linha, só os nomes.", "5 linhas, cada uma com um nome."], ["Sugira 5 nomes e responda em tabela com as colunas Nome e Motivo (até 8 palavras).", "Tabela de 5 linhas e 2 colunas."]] }, dicas: ["Conte quantas linhas você esperaria em cada resposta.", "Qual das respostas dá para conferir em 5 segundos?"],
      pergunta: "Como o formato ajuda a conferir se o Claude fez o que você pediu?", explicacao: "Com o formato combinado, você sabe **o que contar**: 5 linhas, 2 colunas, até 8 palavras. Se a resposta não bate, você percebe na hora.", conceito: "pf_formato" },
    { tipo: "escrever", texto: "Escreva `tem_tres_itens(resposta)`: devolve `True` se a resposta tiver **exatamente 3 linhas** começando com `- ` e `False` caso contrário.", arquivo: "confere_formato.py", dica: "Percorra `resposta.split(\"\\n\")` com `for`, conte as linhas que `startswith(\"- \")` e compare o contador com 3.", conceito: "pf_formato",
      inicial: `def tem_tres_itens(resposta):
    # conte as linhas que começam com "- " e devolva True se forem 3
    return False

print(tem_tres_itens("- Pão\\n- Leite\\n- Café"))
print(tem_tres_itens("Pão, leite e café"))
print(tem_tres_itens("- a\\n- b\\n- c\\n- d"))`,
      esperado: ["True", "False", "False"],
      solucao: `def tem_tres_itens(resposta):
    contador = 0
    for linha in resposta.split("\\n"):
        if linha.startswith("- "):
            contador = contador + 1
    return contador == 3

print(tem_tres_itens("- Pão\\n- Leite\\n- Café"))
print(tem_tres_itens("Pão, leite e café"))
print(tem_tres_itens("- a\\n- b\\n- c\\n- d"))` },
    { tipo: "aberta", titulo: "Defina o formato", texto: "Você quer saber os 3 principais cuidados ao comprar um celular usado.", pergunta: "Escreva o pedido definindo o formato (quantidade, lista ou tabela, tamanho de cada item).", minimo: 50, conceito: "pf_formato", modelo: "Exemplo: “Liste os 3 principais cuidados ao comprar um celular usado, um por linha, começando com hífen, cada um com até 12 palavras.”" },
    { tipo: "aberta", tag: "sec", titulo: "Tabela com dados de verdade", texto: "Para pedir uma tabela de gastos, uma pessoa cola no chat as linhas reais do extrato, com nomes de estabelecimentos e valores.", pergunta: "O que fazer para ter a mesma tabela sem expor os dados?", modelo: "Use **exemplos fictícios** com a mesma forma (“Mercado X, 120,00”) e peça o formato. Depois aplique o modelo, **no seu computador**, aos dados reais. A Anthropic recomenda cautela com dados financeiros.", conceito: "pf_formato" },
    { tipo: "quiz", itens: [
      { pergunta: "Por que pedir um formato de saída?", opcoes: ["Para a resposta vir mais bonita", "Para a resposta ser mais longa", "Para o Claude pensar menos", "Para usar e conferir fácil"], correta: 3, porque: "O formato deixa a resposta pronta para o uso e fácil de conferir.", conceito: "pf_formato" },
      { pergunta: "Qual pedido define melhor o formato?", opcoes: ["Responda bem e rápido", "Liste 3 itens, um por linha", "Escreva bastante texto", "Seja criativo e original"], correta: 1, porque: "Diz quantidade e como organizar.", conceito: "pf_formato" },
      { pergunta: "Como conferir uma lista de 3 itens por código?", opcoes: ["Ler tudo com calma", "Pedir de novo e de novo", "Contar linhas com hífen", "Confiar no que ele disse"], correta: 2, porque: "O formato combinado permite contar as linhas.", conceito: "pf_formato" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: por que dizer o formato da resposta e que formatos você pode pedir?", conceito: "pf_formato", modelo: "Porque a resposta já vem pronta e fica fácil de conferir. Dá para pedir **lista**, **tabela**, **tamanho**, **campos fixos** ou uma **resposta curta**." },
  ],
  recuperacao: [
    { p: "Por que vale pedir um formato de saída?", regex: "(conferir|usar|pronta|facil|verific|organiz)", modelo: "Porque a resposta vem pronta para usar e é fácil de conferir.", conceito: "pf_formato" },
    { p: "Cite dois formatos que você pode pedir.", regex: "(lista|tabela|tamanho|frases|campos|curta|numero)", modelo: "Lista e tabela (também tamanho, campos fixos).", conceito: "pf_formato" },
    { p: "Como expor menos dados ao pedir uma tabela de gastos?", regex: "(fictici|exemplo|inventad|sem dados|nao colar|nao cole)", modelo: "Usando exemplos fictícios com a mesma forma.", conceito: "pf_formato" },
  ],
});

// ---------- Aula 70: exemplos (few-shot) ----------
aulas.push({
  id: "0070", modulo: 9, n: 4, slug: "exemplos-few-shot", titulo: "Mostre exemplos: o poder de mostrar em vez de explicar",
  resumo: "Dois ou três exemplos de entrada e saída ensinam o padrão melhor do que um parágrafo de explicação.",
  objetivos: ["Explicar o que é pedir com exemplos (few-shot).", "Escolher exemplos variados e bem marcados.", "Montar um pedido com exemplos usando Python."],
  conceitos: [["pf_exemplos", "Pedir com exemplos (few-shot)"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Como você ensinaria a um colega novo a classificar avaliações de clientes como positivas ou negativas: só explicando a regra ou mostrando alguns casos?", modelo: "Mostrar casos costuma ensinar mais rápido: o colega **vê o padrão**. Com o Claude acontece o mesmo." },
    { tipo: "texto", titulo: "Few-shot: ensinar pelo exemplo", blocos: [
      "Pedir **com exemplos** (em inglês, *few-shot* ou *multishot*) é incluir no pedido alguns pares de entrada e saída antes do caso novo. O Claude copia o padrão: formato, tamanho e critério.",
      "O guia oficial recomenda exemplos **relevantes** (parecidos com o uso real), **variados** (inclua casos diferentes e até um de borda) e **bem estruturados**, envolvidos em marcas como `<example>`. Ele sugere de 3 a 5 exemplos.",
      "Cuidado: se todos os exemplos forem parecidos, o Claude aprende só aquele jeito. E exemplos errados ensinam o erro." ],
      termos: [["Few-shot", "pedir com poucos exemplos de entrada e saída."], ["Caso de borda", "um caso difícil ou incomum, como uma avaliação neutra."], ["Tag", "marca entre sinais de menor e maior, como `<example>`, para separar partes do pedido."]], fonte: FONTE_BOAS },
    { tipo: "prever", texto: "Preveja a saída.", conceito: "pf_exemplos", itens: [
      { codigo: `exemplos = [("Chegou rápido", "positivo"), ("Veio quebrado", "negativo")]
for entrada, saida in exemplos:
    print(entrada, "->", saida)`, linha: 1, resposta: "Veio quebrado -> negativo", pergunta: "Segunda linha:", porque: "O laço percorre os dois pares; a segunda linha é o segundo par." },
      { codigo: `exemplos = [("a", "1"), ("b", "2"), ("c", "3")]
print(len(exemplos))`, resposta: "3", pergunta: "O que aparece?", porque: "A lista tem 3 pares." }] },
    { tipo: "descobrir", texto: "Dois pedidos para classificar a mesma avaliação.", tabela: { cab: ["Pedido", "Resposta esperada"], linhas: [["Classifique a avaliação: “Produto ok.”", "Um texto explicando, às vezes com parágrafo."], ["Classifique em positivo, negativo ou neutro, no formato dos exemplos.\n<example>Chegou rápido, adorei -> positivo</example>\n<example>Veio quebrado -> negativo</example>\nAvaliação: “Produto ok.”", "Uma palavra só: neutro."]] }, dicas: ["O que os exemplos mostram sem precisar explicar?", "Qual resposta já vem no formato certo?"],
      pergunta: "O que os exemplos ensinaram ao Claude além da regra?", explicacao: "Ensinaram o **formato** (uma palavra, minúscula) e o **critério** (como decidir). Mostrar poupa explicação e deixa a resposta no padrão que você quer.", conceito: "pf_exemplos" },
    { tipo: "escrever", texto: "Escreva `montar_few_shot(exemplos, novo)`: devolve um texto com, para cada exemplo, as linhas `Entrada: ...` e `Saída: ...` e, no fim, `Entrada: <novo>` e `Saída:` (sem nada depois).", arquivo: "few_shot.py", dica: "Crie uma lista `linhas`, use `for entrada, saida in exemplos` para adicionar as duas linhas de cada par, adicione as duas finais e devolva `\"\\n\".join(linhas)`.", conceito: "pf_exemplos",
      inicial: `def montar_few_shot(exemplos, novo):
    # monte as linhas de cada exemplo e as duas linhas finais
    return ""

exemplos = [("Chegou rápido, adorei", "positivo"), ("Veio quebrado", "negativo")]
print(montar_few_shot(exemplos, "Produto ok"))`,
      esperado: ["Entrada: Chegou rápido, adorei", "Saída: positivo", "Entrada: Veio quebrado", "Saída: negativo", "Entrada: Produto ok", "Saída:"],
      solucao: `def montar_few_shot(exemplos, novo):
    linhas = []
    for entrada, saida in exemplos:
        linhas.append("Entrada: " + entrada)
        linhas.append("Saída: " + saida)
    linhas.append("Entrada: " + novo)
    linhas.append("Saída:")
    return "\\n".join(linhas)

exemplos = [("Chegou rápido, adorei", "positivo"), ("Veio quebrado", "negativo")]
print(montar_few_shot(exemplos, "Produto ok"))` },
    { tipo: "aberta", titulo: "Escolha os exemplos", texto: "Você quer que o Claude classifique mensagens de clientes de uma loja virtual em: dúvida, reclamação ou elogio.", pergunta: "Escreva um pedido com 3 exemplos variados (um de cada categoria) e a mensagem nova no final.", minimo: 80, conceito: "pf_exemplos", modelo: "Exemplo: “Classifique em dúvida, reclamação ou elogio, respondendo só com a palavra. <example>Quando chega meu pedido? -> dúvida</example> <example>Veio errado e ninguém responde -> reclamação</example> <example>Atendimento ótimo! -> elogio</example> Mensagem: ‘O produto veio com a caixa amassada.’” Os três exemplos cobrem categorias diferentes." },
    { tipo: "aberta", tag: "sec", titulo: "Exemplos com dados reais", texto: "Para montar os exemplos, alguém copia 3 mensagens reais de clientes, com nome e telefone, e cola no pedido.", pergunta: "Qual é o risco? Como criar bons exemplos sem usar dados reais?", modelo: "O risco é **expor dados pessoais**. Crie exemplos **fictícios** que imitam o jeito das mensagens reais, trocando nomes e números. O padrão ensinado é o mesmo." },
    { tipo: "quiz", itens: [
      { pergunta: "O que é pedir com exemplos (few-shot)?", opcoes: ["Pedir várias vezes seguidas", "Mostrar pares de entrada e saída", "Fazer o pedido em voz alta", "Usar só uma palavra no pedido"], correta: 1, porque: "É incluir exemplos de entrada e saída antes do caso novo.", conceito: "pf_exemplos" },
      { pergunta: "Como devem ser bons exemplos?", opcoes: ["Todos iguais entre si, sempre", "Os mais longos que existirem", "Variados e parecidos com o uso", "Sem nenhum formato definido"], correta: 2, porque: "Variedade mostra o padrão; parecer com o uso real ajuda a acertar.", conceito: "pf_exemplos" },
      { pergunta: "O que um exemplo errado provoca?", opcoes: ["Nada acontece de diferente", "Ensina o erro ao Claude", "O Claude se corrige sozinho", "A resposta fica bem menor"], correta: 1, porque: "O Claude copia o padrão, inclusive os erros dos exemplos.", conceito: "pf_exemplos" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que é pedir com exemplos e o que fazer para escolhê-los bem?", conceito: "pf_exemplos", modelo: "É incluir no pedido pares de entrada e saída para o Claude copiar o padrão. Escolha exemplos **corretos, variados** (com um caso de borda) e **parecidos com o uso real**, separados por marcas como `<example>`." },
  ],
  recuperacao: [
    { p: "O que é pedir com exemplos (few-shot)?", regex: "(exemplo);;(entrada|saida|padrao|par)", modelo: "É incluir exemplos de entrada e saída no pedido para o Claude copiar o padrão.", conceito: "pf_exemplos" },
    { p: "Como devem ser os exemplos que você escolhe?", regex: "(variad|diferent|diverso|relevant|parecid|corret)", modelo: "Corretos, variados e parecidos com o uso real.", conceito: "pf_exemplos" },
    { p: "Como criar exemplos sem expor clientes reais?", regex: "(fictici|inventad|troc|anonim|sem dados)", modelo: "Criando exemplos fictícios que imitam os reais.", conceito: "pf_exemplos" },
  ],
});

// ---------- Aula 71: restrições ----------
aulas.push({
  id: "0071", modulo: 9, n: 5, slug: "restricoes", titulo: "Restrições: o que a resposta deve e não deve ter",
  resumo: "Limites claros (tamanho, palavras a evitar, o que usar como base) deixam a resposta dentro do que você precisa.",
  objetivos: ["Escrever restrições claras e verificáveis.", "Preferir dizer o que fazer a só proibir.", "Conferir com Python se uma resposta respeitou as restrições."],
  conceitos: [["pf_restricoes", "Restrições no pedido"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você pediu um texto para o rótulo de um produto e veio um texto com 200 palavras e promessas que a loja não pode cumprir. Que limites você deveria ter escrito?", modelo: "Um **tamanho máximo** (por exemplo, até 30 palavras), **o que usar** (só as informações que você passou) e **o que evitar** (promessas, números inventados)." },
    { tipo: "texto", titulo: "Limites que dá para conferir", blocos: [
      "**Restrição** é um limite que você coloca na resposta: tamanho, formato, assuntos a evitar, fonte permitida, tom. Quanto mais **mensurável**, melhor: “até 30 palavras” dá para contar; “bem curto” não.",
      "O guia oficial orienta ser claro e direto e dizer **o que fazer**: em vez de só “não use jargão”, escreva “use palavras do dia a dia, como numa conversa”. Explicar o **motivo** da restrição também ajuda o Claude a seguir a regra em casos que você não previu.",
      "Restrições servem para conferir: se a regra é mensurável, um programa pequeno diz se a resposta passou." ],
      termos: [["Restrição", "um limite que a resposta precisa respeitar."], ["Mensurável", "que dá para medir ou contar, como número de palavras."]], fonte: FONTE_BOAS },
    { tipo: "prever", texto: "Preveja a saída.", conceito: "pf_restricoes", itens: [
      { codigo: `texto = "Café forte e aromático"
print(len(texto.split()))`, resposta: "4", pergunta: "O que aparece?", porque: "`split()` separa por espaços: 4 palavras." },
      { codigo: `texto = "Garantia de cura total"
print("garantia" in texto.lower())`, resposta: "True", pergunta: "O que aparece?", porque: "`lower()` deixa tudo minúsculo, e “garantia” está no texto." },
      { codigo: `proibidas = ["grátis", "milagre"]
print("milagre" in proibidas)`, resposta: "True", pergunta: "O que aparece?", porque: "“milagre” é um item da lista." }] },
    { tipo: "descobrir", texto: "Duas versões da mesma restrição.", tabela: { cab: ["Restrição", "Dá para conferir?"], linhas: [["Seja breve e não exagere.", "Não: “breve” e “exagere” não têm medida."], ["Use até 20 palavras e não prometa resultados (evite “garantido” e “milagre”).", "Sim: contar palavras e procurar as duas palavras."], ["Use só as informações abaixo; se faltar algo, diga que não sabe.", "Sim: comparar com as informações enviadas."]] }, dicas: ["Pergunte: eu consigo contar ou procurar isso na resposta?", "Qual restrição um programa simples verificaria?"],
      pergunta: "O que torna uma restrição boa de verdade?", explicacao: "Ser **mensurável** e dizer **o que fazer**. Assim você (ou um programa) confere se foi cumprida. Restrições vagas não podem ser conferidas.", conceito: "pf_restricoes" },
    { tipo: "escrever", texto: "Escreva `respeita(resposta, max_palavras, proibidas)`: devolve `True` se a resposta tem no máximo `max_palavras` palavras **e** nenhuma das palavras proibidas (sem diferenciar maiúsculas de minúsculas).", arquivo: "confere_restricoes.py", dica: "Compare `len(resposta.split())` com `max_palavras`, depois percorra `proibidas` com `for` e veja se `p in resposta.lower()`.", conceito: "pf_restricoes",
      inicial: `def respeita(resposta, max_palavras, proibidas):
    # confira o tamanho e as palavras proibidas
    return False

print(respeita("Café forte e aromático", 5, ["milagre"]))
print(respeita("Café MILAGRE da manhã", 5, ["milagre"]))
print(respeita("Café forte e aromático da serra", 5, ["milagre"]))`,
      esperado: ["True", "False", "False"],
      solucao: `def respeita(resposta, max_palavras, proibidas):
    if len(resposta.split()) > max_palavras:
        return False
    for p in proibidas:
        if p in resposta.lower():
            return False
    return True

print(respeita("Café forte e aromático", 5, ["milagre"]))
print(respeita("Café MILAGRE da manhã", 5, ["milagre"]))
print(respeita("Café forte e aromático da serra", 5, ["milagre"]))` },
    { tipo: "aberta", titulo: "Escreva as restrições", texto: "Você quer um texto curto para anunciar um tênis na sua loja virtual (fictícia).", pergunta: "Escreva o pedido com pelo menos três restrições mensuráveis ou verificáveis, e explique o motivo de uma delas.", minimo: 80, conceito: "pf_restricoes", modelo: "Exemplo: “Escreva um anúncio do tênis Corrida Leve (fictício) com até 30 palavras, usando só as informações abaixo e sem prometer resultados, como ‘o mais confortável do mundo’, porque não posso garantir isso ao cliente.” Tem tamanho, fonte permitida e proibição com motivo." },
    { tipo: "aberta", tag: "sec", titulo: "Restrição que protege", texto: "Você pede ao Claude um resumo de uma conversa com cliente e quer garantir que o resumo não traga dados pessoais.", pergunta: "Que restrição você escreveria? Basta confiar que ele obedeceu?", modelo: "Escreva: “não inclua nomes, telefones nem endereços; troque por ‘o cliente’”. **Não basta confiar**: confira o resultado (leia, ou procure números e nomes) antes de usar ou compartilhar." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual restrição dá para conferir?", opcoes: ["Seja mais ou menos curto", "Escreva bonito e leve", "Use até 20 palavras", "Faça algo bem original"], correta: 2, porque: "Contar palavras é mensurável.", conceito: "pf_restricoes" },
      { pergunta: "Por que explicar o motivo da restrição?", opcoes: ["Para ajudar a seguir a regra", "Para alongar o pedido", "Para o Claude se desculpar", "Para evitar conferência"], correta: 0, porque: "O motivo ajuda o Claude a acertar em casos não previstos.", conceito: "pf_restricoes" },
      { pergunta: "Em vez de “não use jargão”, é melhor:", opcoes: ["Repetir a proibição", "Não escrever restrições", "Pedir palavras do dia a dia", "Usar letras maiúsculas"], correta: 2, porque: "Dizer o que fazer é mais claro que só proibir.", conceito: "pf_restricoes" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que faz uma restrição ser boa?", conceito: "pf_restricoes", modelo: "Ser **mensurável**, dizer **o que fazer** (e não só o que evitar) e vir com o **motivo**. Assim dá para conferir se foi cumprida, até com um pequeno programa." },
  ],
  recuperacao: [
    { p: "O que é uma restrição num pedido?", regex: "(limite|regra|restri|nao pode|deve)", modelo: "Um limite que a resposta precisa respeitar, como tamanho.", conceito: "pf_restricoes" },
    { p: "O que torna uma restrição boa?", regex: "(mensur|conferir|contar|medir|verific|claro)", modelo: "Ser mensurável, dá para conferir.", conceito: "pf_restricoes" },
    { p: "Por que conferir a resposta mesmo com restrições escritas?", regex: "(confer|confir|confiar|errar|nao obedec|verific|garant)", modelo: "Porque o Claude pode não seguir; confira antes de usar.", conceito: "pf_restricoes" },
  ],
});

// ---------- Aula 72: pedir que o Claude pergunte ----------
aulas.push({
  id: "0072", modulo: 9, n: 6, slug: "pedir-que-pergunte", titulo: "Deixe o Claude perguntar o que falta",
  resumo: "Quando você não sabe o que informar, peça que ele pergunte antes de responder.",
  semCodigo: true,
  objetivos: ["Pedir ao Claude que faça perguntas antes de responder.", "Responder as perguntas e refinar o pedido.", "Saber quando perguntar vale a pena."],
  conceitos: [["pf_perguntar", "Pedir que o Claude pergunte o que falta"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você quer montar um plano de estudos, mas não sabe que informações são importantes. Como o pedido poderia ajudar a descobrir isso?", modelo: "Pedindo que o Claude **pergunte primeiro**: “antes de montar, me faça as perguntas de que você precisa”. As perguntas mostram o que faltava no seu pedido." },
    { tipo: "texto", titulo: "Pergunte antes de responder", blocos: [
      "A orientação oficial é conversar naturalmente e **refinar com perguntas de acompanhamento**. Você pode inverter: no começo, **peça** que ele pergunte. Exemplo: “Quero um plano de estudos de inglês. Antes de responder, faça até 5 perguntas de que você precisa. Espere minhas respostas.”",
      "Você responde, o Claude monta a resposta com as informações certas, e as perguntas ajudam você a aprender **o que um bom pedido deve conter** (objetivo, prazo, nível, tempo disponível).",
      "Vale a pena quando a tarefa é **nova ou grande**. Para tarefas simples, um pedido claro basta. Dê um **limite** de perguntas (“até 5”) para a conversa não se alongar demais." ],
      termos: [["Pergunta de acompanhamento", "mensagem seguinte que refina ou corrige a resposta anterior."], ["Limite de perguntas", "um número máximo, como “até 5”, para evitar excesso."]], fonte: FONTE_INICIO },
    { tipo: "prever", texto: "Responda com uma palavra ou número.", conceito: "pf_perguntar", itens: [
      { pergunta: "Plano de estudos de inglês: vale pedir que o Claude pergunte antes? (sim ou não)", rotulo: "Item 1", resposta: ["sim"], porque: "É uma tarefa grande, com muitas informações que mudam o resultado (nível, prazo, horas)." },
      { pergunta: "“Converta 10 km em milhas”: vale pedir perguntas antes? (sim ou não)", rotulo: "Item 2", resposta: ["não", "nao"], porque: "Tarefa simples e completa; perguntas só atrasariam." },
      { pergunta: "No pedido “faça até 5 perguntas”, o número 5 é um...?", rotulo: "Item 3", resposta: ["limite", "maximo", "máximo"], porque: "Ele limita a quantidade de perguntas." }] },
    { tipo: "descobrir", texto: "Veja como as perguntas melhoram o pedido.", tabela: { cab: ["Etapa", "Texto"], linhas: [["Pedido inicial", "Monte um plano de estudos de inglês. Antes, faça até 5 perguntas."], ["Perguntas do Claude (esperadas)", "Qual seu nível? Quantas horas por semana? Qual o prazo? Prefere ouvir, ler ou conversar? Qual é a meta?"], ["Pedido refinado", "Plano de 8 semanas de inglês para iniciante, 4 horas por semana, foco em conversação, com meta de pedir comida e direções."]] }, dicas: ["Compare o pedido inicial com o refinado.", "Que partes vieram das respostas às perguntas?"],
      pergunta: "O que o pedido refinado tem que o inicial não tinha?", explicacao: "Tem **nível, prazo, tempo, foco e meta**. Foram as **perguntas** que revelaram o que faltava. Da próxima vez você já escreve isso no primeiro pedido.", conceito: "pf_perguntar" },
    { tipo: "aberta", titulo: "Peça perguntas", texto: "Você quer ajuda para organizar as finanças de um mês, mas não sabe por onde começar.", pergunta: "Escreva o pedido que pede que o Claude pergunte antes, com limite de perguntas, e liste 3 perguntas que você espera receber.", minimo: 70, conceito: "pf_perguntar", modelo: "Exemplo: “Quero organizar minhas finanças deste mês. Antes de responder, faça até 5 perguntas de que você precisa e espere minhas respostas.” Perguntas esperadas: quais são suas fontes de renda, quais despesas fixas existem, qual é a meta (poupar, quitar dívida) etc." },
    { tipo: "aberta", tag: "sec", titulo: "Responder tudo?", texto: "O Claude pergunta: “Qual é o número da sua conta, sua senha e o seu CPF para eu montar o plano?”", pergunta: "Você deve responder? O que fazer?", modelo: "**Não.** Um plano de finanças não precisa de senha nem de número de conta. A Anthropic recomenda cautela com esses dados. Responda com **faixas ou valores aproximados e fictícios** e diga que não vai informar dados de identificação." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual é a vantagem de pedir que o Claude pergunte?", opcoes: ["Descobrir o que faltava", "Receber respostas curtas", "Pular a conferência final", "Evitar escrever o pedido"], correta: 0, porque: "As perguntas revelam as informações que faltavam no pedido.", conceito: "pf_perguntar" },
      { pergunta: "Quando vale mais a pena pedir perguntas?", opcoes: ["Em contas de somar", "Em tarefas novas e grandes", "Em pedidos de uma palavra", "Quando há pressa total"], correta: 1, porque: "Tarefas grandes têm muitas informações que mudam o resultado.", conceito: "pf_perguntar" },
      { pergunta: "Para que dar um limite de perguntas?", opcoes: ["Para ele não responder", "Para ocultar o assunto", "Para não se alongar", "Para trocar o idioma"], correta: 2, porque: "O limite mantém a conversa objetiva.", conceito: "pf_perguntar" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como e quando pedir que o Claude pergunte o que falta?", conceito: "pf_perguntar", modelo: "Escreva no pedido: “antes de responder, faça até N perguntas de que você precisa e espere minhas respostas”. Vale para tarefas novas ou grandes. Responda sem expor dados sensíveis." },
  ],
  recuperacao: [
    { p: "Como pedir que o Claude pergunte antes de responder?", regex: "(antes);;(pergunt)", modelo: "Escrevendo: antes de responder, faça perguntas de que precisa.", conceito: "pf_perguntar" },
    { p: "Quando vale mais a pena pedir perguntas?", regex: "(grande|nova|complex|muitas informac|nao conhec)", modelo: "Em tarefas novas ou grandes, quando não sei o que informar.", conceito: "pf_perguntar" },
    { p: "O Claude pede sua senha e CPF para ajudar. O que fazer?", regex: "(nao);;(senha|cpf|sensiv|dados|fictici|aproxim)", modelo: "Não informar; usar valores aproximados ou fictícios.", conceito: "pf_perguntar" },
  ],
});

// ---------- Aula 73: verificar a resposta ----------
aulas.push({
  id: "0073", modulo: 9, n: 7, slug: "verificar-a-resposta", titulo: "Nunca confie sem conferir",
  resumo: "O Claude pode errar com muita confiança. Hoje você aprende a conferir contas, fatos e fontes antes de usar uma resposta.",
  objetivos: ["Explicar por que a resposta precisa ser conferida.", "Escolher o jeito de conferir: refazer a conta, abrir a fonte, testar.", "Conferir uma conta com Python."],
  conceitos: [["pf_verificar", "Conferir a resposta"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O Claude respondeu com muita segurança que o total de 3 itens de R$ 19,90 é R$ 57,70. Como você descobre se está certo?", modelo: "Refazendo a conta: 3 × 19,90 = **59,70**. A resposta estava errada, mesmo parecendo segura. **Segurança no tom não é prova.**" },
    { tipo: "texto", titulo: "Confiança não é prova", blocos: [
      "A documentação oficial avisa que o Claude pode errar (as chamadas **alucinações**), inclusive criar citações que parecem autoritativas, e pode ter informação desatualizada em alguns assuntos. Por isso ele **não deve ser tratado como fonte única de verdade**.",
      "Como conferir: **contas** (refaça, ou use uma calculadora ou um programa), **fatos e datas** (procure numa fonte confiável), **citações e links** (abra e leia a fonte; quando houver busca na web, abra as fontes citadas), **código** (rode com testes). Quanto maior o risco da decisão (saúde, dinheiro, lei), mais rigorosa a conferência.",
      "Você também pode ajudar no pedido: “se não tiver certeza, diga; não invente fontes”. Isso **ajuda**, mas não substitui a conferência." ],
      termos: [["Alucinação", "quando o Claude inventa um fato, número ou fonte que parece real."], ["Fonte", "o lugar de onde a informação vem, como um site oficial."]], fonte: FONTE_ERROS },
    { tipo: "prever", texto: "Preveja o que o programa mostra.", conceito: "pf_verificar", itens: [
      { codigo: `preco = 19.9
qtd = 3
print(round(preco * qtd, 2))`, resposta: "59.7", pergunta: "O que aparece?", porque: "19,9 vezes 3 é 59,7." },
      { codigo: `dito = 57.7
certo = round(19.9 * 3, 2)
print(dito == certo)`, resposta: "False", pergunta: "O que aparece?", porque: "57,7 é diferente de 59,7." },
      { codigo: `print(abs(10 - 12))`, resposta: "2", pergunta: "O que aparece?", porque: "`abs` dá a diferença sem sinal: 2." }] },
    { tipo: "descobrir", texto: "Que conferência serve para cada tipo de resposta?", tabela: { cab: ["Resposta do Claude", "Como conferir"], linhas: [["Total de uma compra: R$ 59,70", "Refazer a conta (ou programa)."], ["Lei X diz que o prazo é 30 dias", "Abrir a fonte oficial e ler o trecho."], ["Função que valida e-mails", "Rodar com testes, incluindo casos de borda."], ["Livro Y, página 45, diz...", "Procurar o livro; a citação pode ser inventada."]] }, dicas: ["Para cada linha, pergunte: onde está a prova?", "Contas, fontes e código têm provas diferentes."],
      pergunta: "O que há em comum entre essas conferências?", explicacao: "Todas buscam uma **prova fora da resposta**: uma conta refeita, uma fonte oficial, um teste. Conferir é **comparar** com algo independente.", conceito: "pf_verificar" },
    { tipo: "escrever", texto: "Escreva `confere_total(preco, qtd, total_dito)`: devolve `True` se o total dito pelo Claude é igual (diferença menor que 0.01) a `preco * qtd`, e `False` caso contrário.", arquivo: "confere_conta.py", dica: "Calcule `certo = preco * qtd` e compare `abs(certo - total_dito) < 0.01`.", conceito: "pf_verificar",
      inicial: `def confere_total(preco, qtd, total_dito):
    # refaça a conta e compare
    return False

print(confere_total(19.9, 3, 59.7))
print(confere_total(19.9, 3, 57.7))
print(confere_total(10, 4, 40))`,
      esperado: ["True", "False", "True"],
      solucao: `def confere_total(preco, qtd, total_dito):
    certo = preco * qtd
    return abs(certo - total_dito) < 0.01

print(confere_total(19.9, 3, 59.7))
print(confere_total(19.9, 3, 57.7))
print(confere_total(10, 4, 40))` },
    { tipo: "aberta", titulo: "Plano de conferência", texto: "O Claude respondeu: “Segundo o estudo X, 70% das pessoas poupam menos de 10% da renda.” Você pretende usar o número num trabalho.", pergunta: "Como você conferiria essa resposta? O que faria se não achasse o estudo?", minimo: 60, conceito: "pf_verificar", modelo: "Procuraria o **estudo X** numa fonte confiável e leria o trecho com o número. Se **não achasse**, trataria a informação como **não confirmada**: não usaria o número, ou pediria ao Claude as fontes e abriria cada uma." },
    { tipo: "aberta", tag: "sec", titulo: "Decisão de alto risco", texto: "Alguém vai assinar um contrato de empréstimo baseado só no resumo do Claude, sem ler o contrato.", pergunta: "Qual é o risco? O que fazer?", modelo: "O resumo pode **omitir ou errar** cláusulas importantes. Em decisões de dinheiro, leia o **documento original** e, se preciso, busque ajuda profissional. O Claude é apoio, não a única fonte." },
    { tipo: "quiz", itens: [
      { pergunta: "O que é uma alucinação?", opcoes: ["Resposta bem lenta demais", "Fato inventado que parece real", "Erro de digitação do texto", "Resposta em outro idioma"], correta: 1, porque: "O Claude pode inventar fatos, números e citações.", conceito: "pf_verificar" },
      { pergunta: "Como conferir uma conta do Claude?", opcoes: ["Perguntar se tem certeza", "Pedir uma resposta maior", "Refazer a conta por fora", "Ler com bastante calma"], correta: 2, porque: "A prova está fora da resposta: refazer a conta.", conceito: "pf_verificar" },
      { pergunta: "Qual atitude é mais segura?", opcoes: ["Usar se parecer seguro", "Abrir a fonte citada", "Confiar no tom firme", "Aceitar a primeira resposta"], correta: 1, porque: "Fonte aberta e lida é a conferência de citações.", conceito: "pf_verificar" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: por que conferir a resposta e como conferir contas, fatos e citações?", conceito: "pf_verificar", modelo: "Porque o Claude pode errar e inventar (alucinação) com tom seguro. **Contas**: refazer por fora. **Fatos e citações**: abrir a fonte confiável. **Código**: testar. Quanto maior o risco, mais rigor." },
  ],
  recuperacao: [
    { p: "Por que conferir uma resposta do Claude?", regex: "(errar|erro|inventa|alucin|nao e fonte|incorret|duvid)", modelo: "Porque ele pode errar ou inventar fatos.", conceito: "pf_verificar" },
    { p: "Como conferir uma conta que o Claude fez?", regex: "(refaz|refaz|calculadora|programa|recalcul|conta)", modelo: "Refazendo a conta por fora (calculadora ou programa).", conceito: "pf_verificar" },
    { p: "O que fazer com uma citação que você não acha na fonte?", regex: "(nao usar|nao confi|inventad|nao confirm|descart|duvid|nao use)", modelo: "Tratar como não confirmada e não usar.", conceito: "pf_verificar" },
  ],
});

// ---------- Aula 74: mini-projeto ----------
aulas.push({
  id: "0074", modulo: 9, n: 8, slug: "mini-projeto-reescrever-pedidos", titulo: "Mini-projeto: de pedido vago a pedido bom",
  resumo: "Você reescreve cinco pedidos vagos usando tudo o que aprendeu e planeja como conferir cada resposta.",
  semCodigo: true,
  objetivos: ["Reescrever pedidos vagos com objetivo, contexto, formato e restrições.", "Planejar como conferir cada resposta.", "Reconhecer quando um pedido ainda está fraco."],
  conceitos: [["pf_projeto", "Reescrever pedidos e planejar a conferência"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Sem olhar as aulas: liste o que um bom pedido tem. Quantos itens você lembra?", modelo: "**Objetivo** (ação, assunto, finalidade), **contexto**, **público e tom**, **formato**, **exemplos** quando ajudam e **restrições**. E depois: **conferir** a resposta." },
    { tipo: "texto", titulo: "A receita completa", blocos: [
      "Um bom pedido junta as peças das aulas anteriores, **só as que fazem diferença para a tarefa**. Nem todo pedido precisa de todas.",
      "Roteiro de reescrita: 1) diga a **ação, o assunto e a finalidade**; 2) conte o **contexto** e o **público**; 3) defina o **formato**; 4) coloque **restrições mensuráveis**; 5) se o padrão for difícil de explicar, **mostre exemplos**; 6) pense em **como conferir** a resposta.",
      "Se for tarefa nova e grande, peça que o Claude **pergunte o que falta**. Depois, confira as respostas importantes com uma prova externa." ],
      tabela: { cab: ["Pedido vago", "Qual peça mais falta?"], linhas: [["Escreva uma descrição para meu produto.", "Contexto e formato."], ["Explique investimentos.", "Objetivo, público e formato."], ["Me ajuda a organizar meus estudos.", "Perguntas: peça que ele pergunte."], ["Calcule o frete.", "Dados, formato e conferência."], ["Resuma este texto.", "Para quem, tamanho e o que destacar."]] },
      termos: [["Reescrita", "trocar um pedido fraco por um completo, sem mudar o objetivo."]], fonte: FONTE_BOAS },
    { tipo: "prever", texto: "Responda com uma palavra: a **peça** que mais falta ao pedido.", conceito: "pf_projeto", itens: [
      { pergunta: "“Escreva um e-mail.” Que peça falta primeiro: objetivo ou formato?", rotulo: "Pedido 1", resposta: ["objetivo"], porque: "Sem saber para quê e para quem, formato e tom ficam sem sentido." },
      { pergunta: "“Calcule o total do pedido: 3 itens de R$ 19,90.” Qual é o passo final depois da resposta?", rotulo: "Pedido 2", resposta: ["conferir", "conferencia", "conferência", "verificar"], porque: "Contas devem ser refeitas por fora antes de usar." },
      { pergunta: "“Resuma este texto em 3 linhas.” Já tem restrição de tamanho? (sim ou não)", rotulo: "Pedido 3", resposta: ["sim"], porque: "“3 linhas” é uma restrição mensurável." }] },
    { tipo: "descobrir", texto: "Um pedido vago e sua versão completa.", tabela: { cab: ["Vago", "Completo"], linhas: [["Explique investimentos.", "Explique a diferença entre poupança e CDB (conceitos gerais, sem recomendar produto), para quem nunca investiu, em 5 frases simples, citando o que conferir em fonte oficial. Antes, faça até 3 perguntas, se precisar."]] }, dicas: ["Marque no pedido completo: objetivo, público, formato, restrição.", "Há alguma instrução de conferência?"],
      pergunta: "Quais peças do roteiro aparecem no pedido completo?", explicacao: "**Objetivo** (explicar a diferença), **público** (quem nunca investiu), **formato** (5 frases), **restrição** (sem recomendar produto), **conferência** (fonte oficial) e **perguntas** (até 3). O assunto é o mesmo; o resultado muda muito.", conceito: "pf_projeto" },
    { tipo: "aberta", tag: "sec", titulo: "Antes de enviar", texto: "Ao reescrever o pedido sobre as finanças dela, uma pessoa quer incluir a renda real, o nome do banco e as dívidas verdadeiras para a resposta ser mais precisa.", pergunta: "Isso é necessário? Que alternativa mantém a resposta útil?", modelo: "Raramente é necessário. Use **valores aproximados e fictícios** com a mesma proporção (por exemplo, “renda de 3 mil, dívida de 500”) e **não inclua** nome de banco, conta ou documentos. A Anthropic recomenda cautela com dados financeiros." },
    { tipo: "aberta", titulo: "Mini-projeto: reescreva 5 pedidos", final: true, minutos: 15, texto: "Reescreva os 5 pedidos vagos da tabela da seção 1 (use dados fictícios). Para cada um, escreva: o **pedido completo** (objetivo, contexto/público, formato e uma restrição) e **como você conferiria a resposta**. Numere de 1 a 5.", pergunta: "Escreva os 5 pedidos reescritos e a conferência de cada um.", minimo: 300, conceito: "pf_projeto", dicas: ["Para cada pedido, responda: quem lê, em que formato e com que limite?", "Para a conferência, pense na prova: conta refeita, fonte aberta, contagem de linhas ou leitura final por você."], rotuloModelo: "Exemplo de um dos cinco", modelo: "Pedido 1 (vago: “Escreva uma descrição para meu produto”): “Escreva uma descrição de 3 frases para a vela aromática Lavanda (fictícia), para a página de produto da minha loja virtual, para clientes que buscam presente, em tom simpático, sem prometer efeitos de saúde.” Conferência: contar as frases, procurar promessas de saúde e comparar cada fato com a ficha do produto. Nos demais, repita o raciocínio: objetivo, contexto/público, formato, restrição e prova de conferência." },
    { tipo: "aberta", titulo: "Problema novo: pedido de estudo", transfer: true, minutos: 8, texto: "Outro contexto, o mesmo método. Pedido vago: “Me explica fotossíntese.”", pergunta: "Reescreva para um estudante de 14 anos que tem prova na sexta, e diga como confirmaria que a explicação está correta.", minimo: 80, conceito: "pf_projeto", modelo: "Exemplo: “Explique a fotossíntese para um estudante de 14 anos que tem prova na sexta, em 5 frases simples com um exemplo do dia a dia, e termine com 3 perguntas de revisão (sem as respostas).” Conferência: comparar a explicação com o livro didático da escola e resolver as 3 perguntas sem consultar a resposta do Claude." },
    { tipo: "quiz", itens: [
      { pergunta: "Todo pedido precisa de todas as peças?", opcoes: ["Sim, sempre todas", "Só de algumas, as úteis", "Nunca precisa de nada", "Apenas de exemplos"], correta: 1, porque: "Use as peças que fazem diferença para a tarefa.", conceito: "pf_projeto" },
      { pergunta: "Qual é o passo depois de receber a resposta?", opcoes: ["Enviar para todos", "Apagar o pedido", "Conferir com uma prova", "Pedir mais longa"], correta: 2, porque: "Resposta importante deve ser conferida antes do uso.", conceito: "pf_projeto" },
      { pergunta: "Reescrever um pedido muda o quê?", opcoes: ["Clareza, não o objetivo", "O objetivo, não a clareza", "O assunto por inteiro", "Nada do que escrevi"], correta: 0, porque: "Reescrever esclarece o pedido mantendo o objetivo.", conceito: "pf_projeto" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: descreva o roteiro para transformar um pedido vago em um bom pedido.", conceito: "pf_projeto", modelo: "Ação, assunto e finalidade; contexto e público; formato; restrições mensuráveis; exemplos quando ajudam; perguntas se a tarefa for grande. Depois, **conferir** a resposta com uma prova." },
  ],
  recuperacao: [
    { p: "Cite três peças de um bom pedido.", regex: "(objetivo|contexto|publico|formato|restric|exemplo)", modelo: "Objetivo, contexto e formato.", conceito: "pf_projeto" },
    { p: "O que fazer depois de receber uma resposta importante?", regex: "(conferir|verific|checar|prova|fonte|refaz)", modelo: "Conferir com uma prova externa.", conceito: "pf_projeto" },
    { p: "Por que usar valores fictícios ao reescrever pedidos sobre dinheiro?", regex: "(fictici|sensiv|privacidade|expor|seguranca|dados reais|aproxim)", modelo: "Para não expor dados financeiros reais.", conceito: "pf_projeto" },
  ],
});

export default aulas;
