// Módulo 14: Claude Projects (universal). Fio condutor: montar um Projeto de estudo (instruções + materiais) e provar que ele responde de forma consistente.
// O uso do Claude acontece fora da página: cada aula traz um roteiro do que fazer lá + exercícios aqui (previsões, perguntas e Python).
// Fatos sobre a ferramenta: somente o que está [CONFIRMADO] em conteudo/fontes/FATOS-chat-artifacts-projects-prompts.md (verificado em 2026-10-16).
export const meta = {
  final: "Mini-projeto: Projeto de estudo com instruções, lista de materiais e perguntas de teste",
  transfer: "Medir a consistência das respostas de um Projeto",
};
const aulas = [];
const FONTE_PROJ = "Anthropic, artigo de ajuda “What are projects?” (support.claude.com/en/articles/9517075-what-are-projects). Ferramentas mudam: reconfira na documentação oficial.";
const FONTE_GERIR = "Anthropic, artigo de ajuda “How can I create and manage projects?” (support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects). Ferramentas mudam: reconfira na documentação oficial.";

// ---------- Aula 105: o que é um Project ----------
aulas.push({
  id: "0105", modulo: 14, n: 1, slug: "o-que-e-um-project", titulo: "O que é um Project: um espaço de trabalho com memória própria",
  resumo: "Um chat solto começa do zero. Um Project junta instruções, materiais e conversas num mesmo lugar, para você trabalhar num assunto ao longo do tempo.",
  semCodigo: true,
  objetivos: ["Explicar o que é um Project e do que ele é feito.", "Diferenciar chat solto, Project e instruções da conta.", "Saber o que a documentação confirma e o que mudar de nome ou limite pede conferência."],
  conceitos: [["pj_o_que", "O que é um Project"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você está estudando Python há semanas e, a cada conversa nova, precisa explicar de novo o seu nível, o seu objetivo e como gosta de aprender. Como seria resolver isso uma vez só?", modelo: "Deixando as **instruções e os materiais num lugar fixo**, que valha para todas as conversas daquele assunto. É a ideia de um Project." },
    { tipo: "texto", titulo: "O que a documentação confirma", blocos: [
      "A documentação oficial descreve os **Projects** como espaços de trabalho **autocontidos**, com **histórico de chats** e **base de conhecimento** próprios.",
      "As **instruções do projeto** orientam como o Claude responde (tom, papel) e valem para **todos os chats daquele projeto**. As “Instructions for Claude” da conta, por outro lado, valem para **todas as suas conversas**. A distinção entre as duas é uma leitura dos textos da documentação: confira no app como cada uma aparece.",
      "A **base de conhecimento** é feita dos documentos, textos e códigos que você envia na página do projeto: eles servem de contexto em todos os chats dele. Os **chats do projeto não compartilham contexto entre si**, a não ser que a informação esteja na base.",
      "A documentação diz que Projects estão disponíveis para todos, inclusive no plano Free (com máximo de 5 projetos). Existe também uma **versão beta nova** de projetos, liberada em etapas. Limites e regras mudam: reconfira na documentação oficial." ],
      tabela: { cab: ["", "Chat solto", "Project", "Instruções da conta"], linhas: [["Vale para", "só aquela conversa", "todos os chats do projeto", "todas as conversas"], ["Tem materiais próprios?", "só anexos daquele chat", "sim, base de conhecimento", "não"], ["Serve para", "uma pergunta pontual", "um assunto de longo prazo", "preferências gerais"]] },
      termos: [["Project", "espaço de trabalho com instruções, materiais e chats próprios."], ["Instruções do projeto", "orientações que valem para todos os chats do projeto."], ["Base de conhecimento", "os arquivos e textos que você envia como contexto do projeto."]],
      fonte: FONTE_PROJ },
    { tipo: "prever", texto: "Responda com um número, sim ou não.", conceito: "pj_o_que", itens: [
      { pergunta: "No plano Free, qual é o máximo de projetos, segundo a documentação lida? (um número)", rotulo: "Item 1", resposta: "5", porque: "A documentação lida diz máximo de 5 no Free. Esse número pode mudar: reconfira." },
      { pergunta: "Duas conversas do mesmo projeto sabem o que a outra falou? (sim ou não)", rotulo: "Item 2", resposta: ["não", "nao"], porque: "Os chats não compartilham contexto entre si, a menos que a informação esteja na base de conhecimento." },
      { pergunta: "As instruções do projeto valem para todos os chats dele? (sim ou não)", rotulo: "Item 3", resposta: "sim", porque: "Essa é a função das instruções do projeto: orientar todos os chats daquele projeto." }] },
    { tipo: "descobrir", texto: "Três situações de estudo e onde cada uma cabe melhor.", tabela: { cab: ["Situação", "Onde cabe melhor", "Por quê"], linhas: [["Perguntar o significado de uma palavra uma vez só", "chat solto", "pontual, sem precisar de contexto"], ["Estudar Python por três meses, com apostila e exercícios", "Project", "assunto longo, com materiais e regras fixas"], ["Pedir sempre respostas curtas em todo lugar", "instruções da conta", "preferência geral para todas as conversas"]] }, dicas: ["Que palavra aparece nas situações de Project: “por três meses”, “materiais”...?", "Quando uma preferência vale para qualquer assunto, onde ela fica?"],
      pergunta: "Qual critério ajuda a escolher entre chat solto, Project e instruções da conta?", explicacao: "O **alcance**: pontual (chat solto), um **assunto duradouro com materiais e regras** (Project) ou uma **preferência geral** (instruções da conta).", conceito: "pj_o_que" },
    { tipo: "aberta", titulo: "Roteiro: conheça um Project", texto: "No Claude, procure a área de Projects e **crie um projeto de teste** chamado, por exemplo, “Estudo de Python (teste)”. Ainda não escreva instruções. Apenas observe: o que o projeto tem (campos, áreas) e quais opções aparecem. Menus mudam: se não achar, confira na documentação oficial.", pergunta: "Descreva o que você viu na página do projeto e diga que assunto de longo prazo você gostaria de colocar em um Project.", minimo: 60, conceito: "pj_o_que", modelo: "Uma boa resposta lista o que apareceu (um lugar para **instruções**, outro para **materiais**, e um para **conversas**) e escolhe um **assunto duradouro**, como estudar Python ou organizar as finanças pessoais, em vez de uma pergunta pontual." },
    { tipo: "aberta", tag: "sec", titulo: "O projeto de teste com dados reais", texto: "Para “testar de verdade”, alguém coloca no projeto o extrato do próprio banco e a lista de senhas “para o Claude me lembrar”.", pergunta: "Por que isso é um erro? O que usar no lugar?", modelo: "A documentação recomenda **cautela com dados financeiros, senhas e documentos confidenciais** em chats. No lugar, use **dados inventados** e **nunca coloque senhas** em instruções ou materiais." },
    { tipo: "quiz", itens: [
      { pergunta: "O que é um Project?", opcoes: ["Um espaço com chats e materiais", "Um tipo de arquivo de áudio", "Uma conta nova no Claude", "Um modelo de apresentação"], correta: 0, porque: "É um espaço de trabalho autocontido, com histórico de chats e base de conhecimento próprios.", conceito: "pj_o_que" },
      { pergunta: "Chats do mesmo projeto:", opcoes: ["Dividem tudo entre si", "Se apagam sozinhos", "Não dividem contexto", "Mudam as instruções"], correta: 2, porque: "Não compartilham contexto entre si, a menos que a informação esteja na base.", conceito: "pj_o_que" },
      { pergunta: "As instruções do projeto valem:", opcoes: ["Para todas as suas contas", "Para os chats do projeto", "Só para a primeira pergunta", "Só para o Claude Desktop"], correta: 1, porque: "Valem para todos os chats daquele projeto.", conceito: "pj_o_que" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que é um Project e quando vale a pena usar um em vez de um chat solto?", conceito: "pj_o_que", modelo: "É um espaço de trabalho autocontido, com **instruções**, **base de conhecimento** e **chats** próprios. Vale a pena para um **assunto de longo prazo**, com materiais e regras fixas; para uma pergunta pontual, um chat solto basta. Limites e regras mudam: confira na documentação oficial." },
  ],
  recuperacao: [
    { p: "O que é um Project?", regex: "(espaco|area|lugar);;(chat|instruc|conhecimento|material)", modelo: "Um espaço de trabalho com instruções, base de conhecimento e chats próprios.", conceito: "pj_o_que" },
    { p: "Dois chats do mesmo projeto compartilham o que foi dito?", regex: "(nao);;(contexto|base|compartilh|sabem|a menos)", modelo: "Não: os chats não compartilham contexto, a menos que a informação esteja na base de conhecimento.", conceito: "pj_o_que" },
    { p: "Por que não colocar senhas ou extratos reais num projeto?", regex: "(senha|sensiv|financeir|real|confidenc|cautela|expor|inventad)", modelo: "Porque a documentação recomenda cautela com dados sensíveis; use dados inventados.", conceito: "pj_o_que" },
  ],
});

// ---------- Aula 106: instruções do projeto ----------
aulas.push({
  id: "0106", modulo: 14, n: 2, slug: "instrucoes-do-projeto", titulo: "Escrever boas instruções: papel, objetivo, formato, regras",
  resumo: "As instruções são o que o Claude lê antes de cada conversa do projeto. Cinco partes fazem a diferença: papel, objetivo, formato, regras e o que não fazer.",
  semCodigo: true,
  objetivos: ["Escrever instruções com papel, objetivo, formato, regras e o que não fazer.", "Reconhecer instruções vagas e consertá-las.", "Escrever uma função em Python que confere quais partes faltam num texto de instruções."],
  conceitos: [["pj_instrucoes", "Instruções do projeto"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você vai contratar uma pessoa para ajudar nos seus estudos de Python. O que precisa dizer a ela no primeiro dia para ela ajudar do jeito que você quer?", modelo: "Quem ela é para você (**papel**), o que você quer alcançar (**objetivo**), como quer as respostas (**formato**), as **regras** do estudo e o que ela **não deve fazer** (por exemplo, entregar a resposta pronta)." },
    { tipo: "texto", titulo: "As cinco partes", blocos: [
      "A documentação oficial de dicas para o Claude diz: **seja claro e direto**, **dê o contexto** (explicar o motivo da instrução ajuda o Claude a generalizar) e **dê um papel**: uma frase já foca o comportamento e o tom. A regra de ouro: se um colega sem contexto ficaria confuso com o texto, o Claude também ficaria.",
      "Para o projeto de estudo, organize as instruções em cinco partes. Elas valem para todos os chats do projeto, então escreva o que **não muda de uma conversa para outra**.",
      "Não coloque senhas, chaves nem dados pessoais nas instruções. Ferramentas mudam: reconfira na documentação oficial." ],
      tabela: { cab: ["Parte", "O que diz", "Exemplo (estudo de Python)"], linhas: [["Papel", "quem o Claude é aqui", "Papel: tutor atencioso de Python para iniciantes"], ["Objetivo", "o que você quer alcançar", "Objetivo: aprender a automatizar tarefas simples em 8 semanas"], ["Formato", "como quer as respostas", "Formato: passos curtos, um exemplo e uma pergunta de conferência"], ["Regras", "o que sempre fazer", "Regras: usar só o material enviado quando houver; dizer quando não souber"], ["Não fazer", "o que evitar", "Nao fazer: entregar o exercício resolvido antes da minha tentativa"]] },
      termos: [["Instruções", "o texto que orienta o Claude em todos os chats do projeto."], ["Papel", "o personagem ou função que o Claude assume (tutor, revisor)."]],
      fonte: "Anthropic, “Prompting best practices” (platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices). Ferramentas e páginas mudam: reconfira na documentação oficial." },
    { tipo: "executar", texto: "Um programa pequeno confere se um texto de instruções tem a parte “papel”. Rode e depois troque o texto.", arquivo: "confere_papel.py (pode editar)", codigo: `def tem_papel(texto):
    return "papel:" in texto.lower()

print(tem_papel("Papel: tutor de Python"))`,
      prever: { enunciado: "Antes de testar, o que aparece?", conceito: "pj_instrucoes", itens: [
        { codigo: `def tem_papel(texto):
    return "papel:" in texto.lower()

print(tem_papel("Objetivo: estudar"))`, resposta: "False", porque: "O texto não contém “papel:”." },
        { codigo: `def tem_papel(texto):
    return "papel:" in texto.lower()

print(tem_papel("PAPEL: tutor"))`, resposta: "True", porque: "O `lower()` deixa tudo minúsculo, então “PAPEL:” é encontrado." }] } },
    { tipo: "descobrir", texto: "Duas versões de instruções para o mesmo projeto, e o que cada uma produziu num teste (“me explique listas”).", tabela: { cab: ["", "Instruções vagas", "Instruções com cinco partes"], linhas: [["Texto", "“Ajude a estudar Python”", "papel, objetivo, formato, regras e o que não fazer"], ["Tamanho da resposta", "muito longa, sem exemplo", "curta, com exemplo e pergunta"], ["Pediu a minha tentativa?", "não", "sim"], ["Deu o exercício resolvido?", "sim", "não"]] }, dicas: ["Compare as duas últimas linhas: qual parte das instruções causou a diferença?", "O que acontece quando a regra “não fazer” não existe?"],
      pergunta: "O que as cinco partes mudaram na resposta, e por que “o que não fazer” importa?", explicacao: "Formato e papel controlam **como** a resposta vem; a parte **“não fazer”** impede o comportamento que atrapalha o estudo (a resposta pronta). Sem ela, o Claude assume o que parece útil, e não necessariamente o que você quer.", conceito: "pj_instrucoes" },
    { tipo: "escrever", texto: "Escreva `faltam(texto)`: devolve a lista das partes que **não** aparecem no texto, na ordem `[\"papel\", \"objetivo\", \"formato\", \"regras\", \"nao fazer\"]`. Cada parte conta como presente se o texto (em minúsculas) tiver `parte:` (por exemplo, `papel:`).", arquivo: "meu_programa.py",
      inicial: `PARTES = ["papel", "objetivo", "formato", "regras", "nao fazer"]

def faltam(texto):
    return []
`, testes: [["faltam('Papel: tutor. Objetivo: ensinar')", "['formato', 'regras', 'nao fazer']"], ["faltam('Papel: a. Objetivo: b. Formato: c. Regras: d. Nao fazer: e')", "[]"], ["faltam('')", "['papel', 'objetivo', 'formato', 'regras', 'nao fazer']"]], dica: "Use uma lista com laço: `[p for p in PARTES if p + \":\" not in texto.lower()]`.", conceito: "pj_instrucoes",
      solucao: `PARTES = ["papel", "objetivo", "formato", "regras", "nao fazer"]

def faltam(texto):
    t = texto.lower()
    return [p for p in PARTES if p + ":" not in t]` },
    { tipo: "aberta", titulo: "Roteiro: escreva as instruções", texto: "No Claude, abra o seu projeto de teste e escreva as instruções para estudar Python (ou finanças pessoais) com as cinco partes. Depois, abra um chat do projeto e faça uma pergunta de iniciante, como “o que é uma lista?”. Observe se a resposta seguiu o formato e as regras.", pergunta: "Cole as suas instruções (sem dados pessoais) e diga se a resposta seguiu cada uma das cinco partes.", minimo: 120, conceito: "pj_instrucoes", modelo: "As instruções devem ter **papel**, **objetivo**, **formato**, **regras** e **não fazer**, cada uma com uma frase concreta. Na resposta, confira parte por parte: o papel apareceu no tom? O formato foi seguido? A regra de “não fazer” foi respeitada? Se alguma falhou, ajuste a frase correspondente." },
    { tipo: "aberta", tag: "sec", titulo: "A senha nas instruções", texto: "Para o Claude acessar o seu painel de estudos, alguém escreve nas instruções do projeto o usuário e a senha, “já que as instruções são só minhas”.", pergunta: "Por que isso é arriscado? O que fazer?", modelo: "Instruções e materiais podem ser **vistos por quem tiver acesso** ao projeto e aparecem em muitos contextos. **Nunca escreva senhas** ali; a documentação recomenda cautela com senhas e dados confidenciais. Se precisar acessar algo, **entre você mesmo**." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual parte diz o que evitar?", opcoes: ["O papel do Claude", "O objetivo do estudo", "O que não fazer", "O formato do texto"], correta: 2, porque: "A parte “não fazer” proíbe comportamentos, como entregar a resposta pronta.", conceito: "pj_instrucoes" },
      { pergunta: "O que o papel define?", opcoes: ["O tamanho do arquivo", "Quem o Claude é aqui", "A cor da resposta", "O limite de projetos"], correta: 1, porque: "Uma frase de papel já orienta comportamento e tom.", conceito: "pj_instrucoes" },
      { pergunta: "Instruções com “Ajude a estudar”:", opcoes: ["Funcionam melhor", "Mudam a conta toda", "Ficam vagas demais", "Bloqueiam o projeto"], correta: 2, porque: "Sem papel, formato e regras, o Claude precisa adivinhar o que você quer.", conceito: "pj_instrucoes" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: quais são as partes de boas instruções e por que o “não fazer” importa?", conceito: "pj_instrucoes", modelo: "**Papel, objetivo, formato, regras e o que não fazer.** O “não fazer” importa porque impede comportamentos que atrapalham (como entregar a resposta pronta), que o Claude faria por parecerem úteis. Nada de senhas ou dados pessoais nas instruções." },
  ],
  recuperacao: [
    { p: "Cite quatro partes de boas instruções de projeto.", regex: "(papel);;(objetivo);;(formato);;(regra|nao fazer)", modelo: "Papel, objetivo, formato, regras e o que não fazer.", conceito: "pj_instrucoes" },
    { p: "Por que incluir o que o Claude não deve fazer?", regex: "(evit|impede|atrapalh|nao);;(resposta pronta|comportamento|atrapalh|errad|assume|adivinh|util)", modelo: "Porque impede comportamentos que atrapalham, como entregar a resposta pronta.", conceito: "pj_instrucoes" },
    { p: "Por que não colocar senhas nas instruções?", regex: "(senha|sensiv|confidenc|expor|acesso|ver|cautela)", modelo: "Porque podem ser vistas por quem tiver acesso; nunca se escrevem senhas ali.", conceito: "pj_instrucoes" },
  ],
});

// ---------- Aula 107: materiais ----------
aulas.push({
  id: "0107", modulo: 14, n: 3, slug: "materiais-do-projeto", titulo: "Materiais do projeto: o que enviar e o que nunca enviar",
  resumo: "Os arquivos que você manda viram contexto de todos os chats do projeto. Escolher bem (e deixar de fora o que é sensível) importa tanto quanto as instruções.",
  semCodigo: true,
  objetivos: ["Escolher materiais úteis, pequenos e atualizados para um projeto.", "Reconhecer o que não deve ser enviado: segredos e dados pessoais.", "Escrever em Python uma triagem simples de uma lista de materiais."],
  conceitos: [["pj_materiais", "Materiais de conhecimento do projeto"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você tem 12 arquivos sobre Python: apostilas, anotações, um PDF enorme e uma planilha com os dados de contato dos colegas de turma. Como decidir o que entra no projeto?", modelo: "Entra o que **ajuda a responder** ao assunto: apostila e anotações organizadas. Fica fora o que for **sensível** (a planilha com contatos) e o que for **grande demais ou repetido**." },
    { tipo: "texto", titulo: "O que a documentação confirma", blocos: [
      "O que você envia para a **base de conhecimento** (documentos, textos e códigos) serve de contexto em **todos os chats do projeto**. Quanto mais relevante e enxuto, melhor.",
      "Segundo a documentação, os arquivos de projeto podem ter **até 30 MB cada**, em número ilimitado, mas o **conteúdo total deve caber na janela de contexto**; só o texto é extraído (com exceção de PDFs multimodais). Em planos pagos, quando a base se aproxima do limite, um recurso chamado RAG (busca de trechos) pode ampliar a capacidade em até 10 vezes. Esses números mudam: reconfira na documentação oficial.",
      "A documentação sobre limites de uso sugere **remover arquivos que você não está usando**. Cuide também da **atualização**: troque o material antigo pelo novo, em vez de acumular versões repetidas.",
      "O que **nunca** enviar: **senhas e chaves**, **documentos de identidade**, **dados financeiros e de saúde**, e **dados pessoais de terceiros**. A Anthropic recomenda cautela com dados financeiros, senhas e documentos confidenciais." ],
      tabela: { cab: ["Material", "Tamanho", "Decisão", "Motivo"], linhas: [["apostila_python.pdf", "8 MB", "enviar", "conteúdo do assunto"], ["anotacoes_semana1.txt", "1 MB", "enviar", "pequeno e seu"], ["contatos_da_turma.csv", "1 MB", "não enviar", "dados pessoais de terceiros"], ["aulas_gravadas.pdf", "120 MB", "dividir ou resumir", "passa do limite por arquivo"], ["senhas.txt", "1 MB", "nunca enviar", "segredos"]] },
      termos: [["Base de conhecimento", "os arquivos e textos enviados como contexto do projeto."], ["Janela de contexto", "a quantidade de texto que o Claude consegue considerar de uma vez."], ["RAG", "técnica que busca só os trechos relevantes de uma base grande, em vez de usar tudo."]],
      fonte: "Anthropic, “Upload files to Claude” (support.claude.com/en/articles/8241126-upload-files-to-claude) e “How do usage and length limits work” (support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work). Ferramentas mudam: reconfira na documentação oficial." },
    { tipo: "executar", texto: "A soma dos tamanhos dos materiais dá uma ideia do total. Rode.", arquivo: "soma_materiais.py (pode editar)", codigo: `materiais = [("resumo.pdf", 2), ("exercicios.txt", 1), ("livro.pdf", 25)]
total = 0
for nome, mb in materiais:
    total = total + mb
print(total)`,
      prever: { enunciado: "Antes de testar, o que aparece?", conceito: "pj_materiais", itens: [
        { codigo: `materiais = [("a.pdf", 8), ("b.txt", 1)]
total = 0
for nome, mb in materiais:
    total = total + mb
print(total)`, resposta: "9", porque: "8 + 1." },
        { codigo: `LIMITE_MB = 30
print(45 <= LIMITE_MB)`, resposta: "False", porque: "45 é maior que 30, então não cabe no limite por arquivo (supondo 30 MB)." }] } },
    { tipo: "descobrir", texto: "Duas bases para o mesmo projeto de estudo.", tabela: { cab: ["", "Base A (despejou tudo)", "Base B (curada)"], linhas: [["Arquivos", "40, com versões repetidas", "6, uma versão de cada"], ["Material sensível", "contatos e senhas incluídos", "nenhum"], ["Respostas com a fonte certa", "às vezes citava a versão antiga", "sempre a versão atual"]] }, dicas: ["Que diferença há entre 40 arquivos repetidos e 6 organizados?", "O que a Base A tem que ninguém deveria ver?"],
      pergunta: "Por que a base curada é melhor para o estudo e mais segura?", explicacao: "Menos arquivos, **sem repetição**, evitam respostas baseadas em material **desatualizado**, e deixar de fora o que é **sensível** elimina o risco de expor esses dados. Quantidade não é qualidade.", conceito: "pj_materiais" },
    { tipo: "corrigir", texto: "A função deve aceitar arquivos de **até** 30 MB (30 incluído), mas está recusando o de 30. **Conserte uma linha.**", arquivo: "com_defeito.py", dica: "Para “até 30”, o limite inclui o 30: troque `<` por `<=`.", conceito: "pj_materiais",
      codigo: `LIMITE_MB = 30

def cabe(mb):
    return mb < LIMITE_MB

assert cabe(10) == True
assert cabe(30) == True
assert cabe(31) == False
print("passou")`, esperado: ["passou"],
      solucao: `LIMITE_MB = 30

def cabe(mb):
    return mb <= LIMITE_MB

assert cabe(10) == True
assert cabe(30) == True
assert cabe(31) == False
print("passou")` },
    { tipo: "escrever", texto: "Escreva `triagem(materiais)`, que recebe uma lista de tuplas `(nome, mb, tem_dado_pessoal)` e devolve a lista dos **nomes** aprovados: tamanho de até 30 MB **e** sem dado pessoal.", arquivo: "meu_programa.py",
      inicial: `LIMITE_MB = 30

def triagem(materiais):
    return []
`, testes: [["triagem([('aula.pdf', 2, False), ('contatos.csv', 1, True), ('livro.pdf', 45, False)])", "['aula.pdf']"], ["triagem([('a.txt', 30, False), ('b.txt', 31, False)])", "['a.txt']"], ["triagem([])", "[]"]], dica: "Percorra com `for nome, mb, pessoal in materiais:` e adicione `nome` à lista se `mb <= LIMITE_MB and not pessoal`.", conceito: "pj_materiais",
      solucao: `LIMITE_MB = 30

def triagem(materiais):
    aprovados = []
    for nome, mb, pessoal in materiais:
        if mb <= LIMITE_MB and not pessoal:
            aprovados.append(nome)
    return aprovados` },
    { tipo: "aberta", titulo: "Roteiro: monte a base", texto: "No Claude, no seu projeto de teste, envie **dois ou três materiais seus que não tenham nada sensível** (por exemplo, anotações de estudo escritas por você). Depois, num chat do projeto, pergunte algo que só os materiais respondem e veja se a resposta usa o que você enviou.", pergunta: "Liste os materiais que você enviou (nome e motivo), um que você deixou de fora e por quê, e como a resposta mostrou (ou não) que usou a base.", minimo: 100, conceito: "pj_materiais", modelo: "A lista traz **2 ou 3 materiais com o motivo** (relevantes, pequenos, atualizados), **um deixado de fora** (sensível, grande ou repetido) e uma **observação sobre a resposta**: se citou ou usou o conteúdo enviado. Se não usou, vale reconferir a pergunta ou o arquivo (por exemplo, se o texto foi extraído)." },
    { tipo: "aberta", tag: "sec", titulo: "A planilha de contatos", texto: "Alguém envia para o projeto de estudo a planilha da turma, com nome, telefone e e-mail de 30 colegas, “para o Claude montar grupos de estudo”.", pergunta: "O que há de errado? Como atingir o mesmo objetivo sem expor os colegas?", modelo: "São **dados pessoais de terceiros**, que as pessoas não autorizaram a enviar. Use **apelidos ou números** no lugar de nomes e contatos (por exemplo, “colega 1”) e **remova telefone e e-mail** da planilha antes de enviar." },
    { tipo: "quiz", itens: [
      { pergunta: "O que NÃO enviar ao projeto?", opcoes: ["Anotações de estudo suas", "A apostila do assunto", "Senhas e dados pessoais", "Exercícios resolvidos"], correta: 2, porque: "Segredos e dados pessoais não devem ir para materiais.", conceito: "pj_materiais" },
      { pergunta: "O que fazer com um material antigo?", opcoes: ["Acumular versões", "Trocar pelo novo", "Mandar duplicado", "Esconder o novo"], correta: 1, porque: "Versões repetidas confundem; mantenha uma versão atual de cada.", conceito: "pj_materiais" },
      { pergunta: "O limite de contexto exige:", opcoes: ["Enviar o máximo possível", "Duplicar os arquivos", "Dividir em mil pastas", "Escolher o essencial"], correta: 3, porque: "O conteúdo total deve caber na janela de contexto: escolha o que é relevante.", conceito: "pj_materiais" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como escolher os materiais de um projeto e o que deixar de fora?", conceito: "pj_materiais", modelo: "Enviar o que é **relevante, enxuto e atualizado**, com cada arquivo dentro do limite e o total dentro da janela de contexto. Deixar de fora **segredos, senhas, documentos de identidade, dados financeiros e dados pessoais de terceiros**, e remover o que não é usado." },
  ],
  recuperacao: [
    { p: "Cite dois cuidados ao escolher materiais para um projeto.", regex: "(relevant|util|enxut|atualiz|pequen|limite|tamanho|sensiv|repetid)", modelo: "Enviar só o que é relevante e atualizado, dentro do limite de tamanho, e sem dados sensíveis.", conceito: "pj_materiais" },
    { p: "O que nunca se deve enviar como material?", regex: "(senha|segredo|chave|pessoal|identidade|financeir|sensiv)", modelo: "Senhas e chaves, dados pessoais (próprios e de terceiros), documentos de identidade e dados financeiros.", conceito: "pj_materiais" },
    { p: "Por que não acumular versões repetidas de um material?", regex: "(desatualiz|antig|confund|repet|versao|atual)", modelo: "Porque as respostas podem usar a versão antiga; mantenha uma versão atual de cada.", conceito: "pj_materiais" },
  ],
});

// ---------- Aula 108: conversas e consistência ----------
aulas.push({
  id: "0108", modulo: 14, n: 4, slug: "conversas-e-consistencia", titulo: "Conversas dentro do projeto: o que fica e o que não fica",
  resumo: "Cada chat do projeto parte das mesmas instruções e da mesma base, mas não sabe o que foi dito em outro chat. Entender isso evita surpresas e dá consistência.",
  semCodigo: true,
  objetivos: ["Explicar o que os chats de um projeto compartilham e o que não compartilham.", "Decidir o que colocar na base e o que deixar para a conversa.", "Usar a memória do projeto com consciência."],
  conceitos: [["pj_conversas", "Conversas e consistência no projeto"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Na segunda-feira você contou ao Claude, num chat do projeto, que está estudando para uma prova de Python no dia 20. Na quarta, abre um chat novo do mesmo projeto e pergunta “quantos dias faltam para a minha prova?”. O que você espera? E o que a documentação diz?", modelo: "Você talvez espere que ele saiba, mas **os chats do projeto não compartilham contexto entre si**, a menos que a informação esteja na base. A data da prova precisa estar na **base** ou ser repetida no chat." },
    { tipo: "texto", titulo: "O que a documentação confirma", blocos: [
      "Cada chat do projeto usa as **mesmas instruções** e a **mesma base de conhecimento**, mas **não** o que foi falado em outros chats. Para uma informação durar (a data da prova, o seu nível), coloque-a na **base** ou nas **instruções**.",
      "A documentação diz que cada projeto tem uma **memória própria**. Para separar da memória da conta, dá para desligar “Use account memory” nas configurações do projeto. Chats existentes podem ser movidos para um projeto pelo menu do chat. Temas sensíveis ficam fora da memória por padrão, e alguns dados (como documentos de identidade e contas financeiras) nunca são salvos.",
      "A documentação sobre limites de uso recomenda **um chat novo para um assunto novo**: conversas muito longas consomem mais. Menus e nomes mudam: confira na documentação oficial.",
      "Consistência vem de **instruções e base estáveis**: mude uma coisa de cada vez e teste de novo (aula 6)." ],
      tabela: { cab: ["Informação", "Onde colocar", "Por quê"], linhas: [["Nível e objetivo de estudo", "instruções", "valem para todos os chats"], ["Apostila e exercícios", "base de conhecimento", "contexto de todos os chats"], ["A dúvida de hoje", "o chat", "só importa agora"], ["Data da prova", "instruções ou base", "para durar entre chats"]] },
      termos: [["Memória do projeto", "informações que o Claude guarda a partir das conversas daquele projeto."], ["Chat novo", "uma conversa que começa sem o que foi dito em outras."]],
      fonte: FONTE_GERIR },
    { tipo: "prever", texto: "Responda com sim ou não.", conceito: "pj_conversas", itens: [
      { pergunta: "Um chat novo do projeto lê as instruções do projeto? (sim ou não)", rotulo: "Item 1", resposta: "sim", porque: "As instruções valem para todos os chats do projeto." },
      { pergunta: "Um chat novo sabe o que você disse em outro chat do mesmo projeto? (sim ou não)", rotulo: "Item 2", resposta: ["não", "nao"], porque: "Não compartilham contexto entre si, a menos que a informação esteja na base." },
      { pergunta: "É boa ideia abrir um chat novo para um assunto novo? (sim ou não)", rotulo: "Item 3", resposta: "sim", porque: "A documentação sugere: conversas longas consomem mais; um chat novo para um assunto novo ajuda." }] },
    { tipo: "descobrir", texto: "Três chats do mesmo projeto de estudo e o que cada um “sabia” sobre a prova do dia 20.", tabela: { cab: ["Chat", "O que foi feito antes", "Sabia da prova no dia 20?"], linhas: [["Chat 1", "você contou a data da prova", "sim, nessa conversa"], ["Chat 2", "nada; chat novo", "não"], ["Chat 3", "a data está nas instruções do projeto", "sim"]] }, dicas: ["O que o Chat 1 e o Chat 3 têm de diferente do Chat 2?", "Onde estava escrita a data no Chat 3?"],
      pergunta: "Por que o Chat 3 sabia da prova e o Chat 2 não?", explicacao: "O Chat 3 **leu a data nas instruções**, que valem para todos os chats do projeto. O Chat 2 só teria a data se ela estivesse na **base ou nas instruções**, ou se você a repetisse. O Chat 1 sabia por causa da própria conversa.", conceito: "pj_conversas" },
    { tipo: "aberta", titulo: "Roteiro: o teste do chat novo", texto: "No Claude, no seu projeto: (1) num chat, conte uma informação inventada, como “minha prova é dia 20”; (2) abra um chat novo do mesmo projeto e pergunte quando é a sua prova; (3) coloque a informação nas instruções e pergunte de novo num chat novo. Anote o que aconteceu em cada passo.", pergunta: "Descreva o que o chat novo respondeu antes e depois de a informação estar nas instruções, e o que isso mostra sobre onde guardar informações duradouras.", minimo: 80, conceito: "pj_conversas", modelo: "Antes, o chat novo **não sabia** (os chats não compartilham contexto). Depois, com a informação nas **instruções**, ele passou a **responder corretamente**. Isso mostra que o que deve **durar entre conversas** vai para as **instruções ou a base**, e não só para o chat." },
    { tipo: "aberta", tag: "sec", titulo: "Contar tudo para o projeto “lembrar”", texto: "Para o projeto “lembrar de mim”, uma pessoa conta nos chats o número do documento, o endereço e o salário exato.", pergunta: "Por que isso é um problema, mesmo com a memória do projeto? O que fazer?", modelo: "Mesmo que algo seja salvo ou não, **você não controla totalmente** onde esses dados aparecem. A documentação recomenda cautela com dados financeiros e pessoais. Conte **só o necessário para estudar** e, se preferir, **desligue a memória da conta** nas configurações do projeto." },
    { tipo: "quiz", itens: [
      { pergunta: "Onde guardar o que deve durar entre chats?", opcoes: ["Nas instruções ou na base", "Só no primeiro chat", "Num chat bem longo", "Na barra de endereço"], correta: 0, porque: "Instruções e base valem para todos os chats do projeto.", conceito: "pj_conversas" },
      { pergunta: "Chats do projeto compartilham:", opcoes: ["Tudo o que foi dito", "Instruções e base", "Apenas o seu nome", "Os arquivos apagados"], correta: 1, porque: "Compartilham instruções e base de conhecimento, mas não o conteúdo dos chats.", conceito: "pj_conversas" },
      { pergunta: "Para um assunto novo, o ideal é:", opcoes: ["Reaproveitar o chat velho", "Apagar o projeto inteiro", "Abrir um chat novo agora", "Trocar de conta no app"], correta: 2, porque: "Um chat novo evita conversas longas e mistura de assuntos.", conceito: "pj_conversas" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que os chats de um projeto compartilham e onde guardar uma informação que deve durar?", conceito: "pj_conversas", modelo: "Compartilham as **instruções** e a **base de conhecimento**, mas **não** o conteúdo dos chats. O que deve durar vai para as **instruções ou a base**. Um chat novo para cada assunto novo ajuda, e a memória do projeto pode ser separada da da conta." },
  ],
  recuperacao: [
    { p: "O que os chats de um mesmo projeto compartilham?", regex: "(instruc);;(base|conhecimento|material)", modelo: "As instruções do projeto e a base de conhecimento.", conceito: "pj_conversas" },
    { p: "Onde guardar uma informação que deve durar entre chats?", regex: "(instruc|base|conhecimento)", modelo: "Nas instruções ou na base de conhecimento.", conceito: "pj_conversas" },
    { p: "Por que não contar dados sensíveis nos chats para o projeto “lembrar”?", regex: "(sensiv|pessoal|financeir|cautela|controla|expor|necessari)", modelo: "Porque não se controla totalmente onde aparecem; conte só o necessário para estudar.", conceito: "pj_conversas" },
  ],
});

// ---------- Aula 109: compartilhar ----------
aulas.push({
  id: "0109", modulo: 14, n: 5, slug: "compartilhar-com-cuidado", titulo: "Compartilhar um projeto com cuidado",
  resumo: "Compartilhar um projeto dá a outras pessoas acesso às suas instruções e materiais. Hoje você aprende a revisar o projeto antes e a escolher o nível de acesso.",
  semCodigo: true,
  objetivos: ["Dizer quem pode compartilhar projetos e os dois níveis de acesso da documentação.", "Revisar instruções e materiais antes de compartilhar.", "Escolher o menor acesso que resolve."],
  conceitos: [["pj_compartilhar", "Compartilhar um projeto"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você montou um bom projeto de estudo de finanças pessoais e quer compartilhá-lo com dois amigos. Que perguntas você faria a si mesmo antes?", modelo: "**O que há dentro** (materiais, instruções, dados pessoais)? **Quem** vai ver? Eles precisam **só conversar** com o projeto ou **mudar** as instruções e os materiais? Dá para compartilhar uma **cópia limpa**?" },
    { tipo: "texto", titulo: "O que a documentação confirma", blocos: [
      "Segundo a documentação, **compartilhar projetos é possível só nos planos Team e Enterprise**, com dois níveis: **“Can view”** (conversar com o projeto) e **“Can edit”** (mudar as instruções e o conhecimento). O administrador pode desativar o compartilhamento. Esses detalhes mudam: reconfira na documentação oficial.",
      "A documentação também diz que **arquivar** um projeto concluído mantém membros, permissões e conhecimento, e que é preciso **desarquivar antes de excluir**.",
      "Regra de precaução do curso (nossa, não da documentação): **assuma que quem tem acesso pode se beneficiar de tudo o que está na base e nas instruções**, mesmo que o nível seja só “ver”. Por isso, revise os materiais **antes** de compartilhar e compartilhe só o necessário.",
      "Se você usa um plano individual, a documentação não prevê compartilhar projetos: não envie o seu material a outras pessoas por outros caminhos sem pensar nos mesmos cuidados." ],
      tabela: { cab: ["Nível", "O que a pessoa pode fazer", "Quando dar"], linhas: [["Can view", "conversar com o projeto", "colega que só vai estudar"], ["Can edit", "mudar instruções e conhecimento", "quem mantém o projeto com você"], ["(sem acesso)", "nada", "todo o resto"]] },
      termos: [["Can view", "nível de acesso para conversar com o projeto."], ["Can edit", "nível de acesso para mudar as instruções e a base."], ["Arquivar", "guardar um projeto concluído sem apagá-lo."]],
      fonte: FONTE_GERIR },
    { tipo: "prever", texto: "Responda com sim, não ou uma palavra.", conceito: "pj_compartilhar", itens: [
      { pergunta: "O plano Free pode compartilhar projetos, segundo a documentação lida? (sim ou não)", rotulo: "Item 1", resposta: ["não", "nao"], porque: "A documentação lida diz que compartilhar é só para Team e Enterprise. Reconfira, pois as regras mudam." },
      { pergunta: "Qual nível permite mudar as instruções: view ou edit?", rotulo: "Item 2", resposta: "edit", porque: "“Can edit” permite mudar instruções e conhecimento; “Can view” só conversar." },
      { pergunta: "Antes de excluir um projeto arquivado, o que é preciso fazer? (uma palavra: desarquivar)", rotulo: "Item 3", resposta: "desarquivar", porque: "A documentação diz que é preciso desarquivar antes de excluir." }] },
    { tipo: "descobrir", texto: "Três projetos prontos para compartilhar e a decisão tomada.", tabela: { cab: ["Projeto", "O que tem dentro", "Decisão"], linhas: [["A", "apostila e exercícios, instruções limpas", "compartilhar, nível view"], ["B", "o A mais planilha pessoal de gastos reais", "limpar antes de compartilhar"], ["C", "anotações com a senha do e-mail", "não compartilhar; trocar a senha"]] }, dicas: ["O que B e C têm além do que o estudo precisa?", "No C, só tirar a senha basta?"],
      pergunta: "Que passos antes de compartilhar o B e o C faltam no A?", explicacao: "O A não tem nada sensível. No B é preciso **tirar os dados reais** (ou usar dados inventados); no C, **remover a senha e trocá-la**, já que ela esteve num arquivo. Só então vale compartilhar, com o **menor acesso**.", conceito: "pj_compartilhar" },
    { tipo: "aberta", titulo: "Roteiro: a lista de revisão", texto: "No Claude, abra o seu projeto de teste e releia as instruções e a lista de materiais **como se fosse outra pessoa vendo pela primeira vez**. Se o seu plano tiver a opção de compartilhar, apenas observe as opções, sem convidar ninguém. Menus mudam: confira na documentação oficial.", pergunta: "Escreva uma lista de revisão de 5 itens para fazer antes de compartilhar um projeto e diga que nível de acesso daria a um colega que só vai estudar.", minimo: 80, conceito: "pj_compartilhar", modelo: "Itens possíveis: **sem senhas ou chaves**, **sem dados pessoais** (seus e de terceiros), **instruções claras e sem informação privada**, **materiais só os necessários** e **nível de acesso mínimo**. Para quem só estuda, o nível adequado é **“Can view”**, se o seu plano o oferecer." },
    { tipo: "aberta", tag: "sec", titulo: "Compartilhar para “ajudar o time”", texto: "Para ajudar a turma, uma pessoa compartilha com todos o projeto de estudo com o nível de edição, e nele ficaram anotações com o telefone do professor e o login da plataforma de estudos.", pergunta: "O que há de errado? O que mudar?", modelo: "Deu um acesso **maior do que o necessário** (edição) e deixou **dados pessoais e credenciais** no material. Use o nível **view**, **remova o telefone e o login** (e troque a senha, se ela esteve ali) antes de compartilhar." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual nível permite só conversar?", opcoes: ["Can view", "Can edit", "Can delete", "Can hide"], correta: 0, porque: "“Can view” permite conversar; “Can edit” muda instruções e conhecimento.", conceito: "pj_compartilhar" },
      { pergunta: "O que revisar antes de compartilhar?", opcoes: ["A cor do ícone do projeto", "Materiais e instruções", "O tamanho da tela usada", "O nome do seu plano atual"], correta: 1, porque: "Quem tem acesso pode se beneficiar de tudo na base e nas instruções.", conceito: "pj_compartilhar" },
      { pergunta: "Qual nível dar a quem só estuda?", opcoes: ["O de editar", "O de dono", "O de ver", "Nenhum nível"], correta: 2, porque: "O menor acesso que resolve reduz o risco.", conceito: "pj_compartilhar" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que conferir antes de compartilhar um projeto e que nível de acesso escolher?", conceito: "pj_compartilhar", modelo: "Conferir que **instruções e materiais** não têm senhas, chaves nem dados pessoais, e escolher o **menor nível** (view, para quem só estuda). A documentação lida diz que compartilhar é para **Team e Enterprise**, e essas regras mudam: reconfira." },
  ],
  recuperacao: [
    { p: "Quais são os dois níveis de acesso citados para projetos compartilhados?", regex: "(view|ver|conversar);;(edit|editar|mudar)", modelo: "“Can view” (conversar) e “Can edit” (mudar instruções e conhecimento).", conceito: "pj_compartilhar" },
    { p: "O que revisar antes de compartilhar um projeto?", regex: "(material|arquivo|instruc|base);;(senha|sensiv|pessoal|dado|segredo|chave)", modelo: "Instruções e materiais, para remover senhas, chaves e dados pessoais.", conceito: "pj_compartilhar" },
    { p: "Por que dar o menor nível de acesso?", regex: "(risco|menor|minimo|necessari|exposic|expor|mudar|danific|estrag)", modelo: "Porque reduz o risco: a pessoa só pode fazer o necessário (por exemplo, só conversar).", conceito: "pj_compartilhar" },
  ],
});

// ---------- Aula 110: avaliar e mini-projeto ----------
aulas.push({
  id: "0110", modulo: 14, n: 6, slug: "avaliar-e-mini-projeto", titulo: "Avaliar o projeto com perguntas de teste e fechar o mini-projeto",
  resumo: "Um projeto bom responde de forma consistente. Para saber se o seu faz isso, você cria perguntas de teste, repete e compara. Depois fecha o mini-projeto de estudo.",
  semCodigo: true,
  objetivos: ["Escrever perguntas de teste (normal, fora do escopo, de borda) para um projeto.", "Medir a consistência das respostas ao repetir uma pergunta.", "Fechar um Projeto de estudo com instruções, materiais e perguntas de teste."],
  conceitos: [["pj_avaliar", "Avaliar o projeto com perguntas de teste"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você montou o projeto de estudo. Como saber se ele está bom, além de “parece que funciona”?", modelo: "Fazendo **perguntas de teste** com respostas esperadas, repetindo-as e **comparando**: o projeto segue o formato? Respeita as regras? Responde igual quando a pergunta se repete?" },
    { tipo: "texto", titulo: "Testar um projeto", blocos: [
      "A documentação oficial de avaliação diz que bons critérios de sucesso são **específicos, mensuráveis, alcançáveis e relevantes**, que os testes devem incluir **casos de borda**, e que, sempre que possível, vale **automatizar** a conferência. Também diz que nem todo problema se resolve com texto: às vezes o certo é mudar o material ou o próprio modelo.",
      "Para o projeto de estudo, crie 5 a 8 **perguntas de teste** de três famílias: **normais** (o assunto do projeto), **fora do escopo** (o que as regras de “não fazer” proíbem, como pedir a resposta pronta) e **de borda** (perguntas ambíguas ou sobre algo que não está nos materiais).",
      "Para cada pergunta, escreva **antes** o que seria uma boa resposta (critério). Depois **repita a pergunta em chats novos** (aula 4) e compare: o formato se repete? A regra foi respeitada em todas as vezes? Quando falhar, mude **uma coisa** (uma frase das instruções ou um material) e teste de novo.",
      "A conferência é sua: o Claude pode errar, e a documentação lembra de não o tratar como fonte única. Ferramentas mudam: reconfira na documentação oficial." ],
      tabela: { cab: ["Pergunta de teste", "Família", "Critério (o que seria bom)"], linhas: [["“Explique o que é uma lista, com um exemplo.”", "normal", "curta, com um exemplo e uma pergunta de conferência"], ["“Resolva o exercício 3 para mim.”", "fora do escopo", "não entrega a resposta; pede a minha tentativa"], ["“O que diz a apostila sobre classes?”", "borda", "se a apostila não trata do tema, diz isso em vez de inventar"], ["“Explique de novo, mais curto.”", "normal", "mantém o formato, mais curto"]] },
      termos: [["Pergunta de teste", "uma pergunta com resposta esperada, usada para avaliar o projeto."], ["Consistência", "dar respostas parecidas e dentro das regras quando a pergunta se repete."], ["Caso de borda", "uma situação no limite do que o projeto cobre."]],
      fonte: "Anthropic, “Define success criteria and build evaluations” (platform.claude.com/docs/en/test-and-evaluate/develop-tests) e “Claude is providing incorrect or misleading responses” (support.claude.com/en/articles/8525154-claude-is-providing-incorrect-or-misleading-responses-what-s-going-on). Ferramentas mudam: reconfira na documentação oficial." },
    { tipo: "prever", texto: "Responda com um número (sem o símbolo %).", conceito: "pj_avaliar", itens: [
      { pergunta: "Você repetiu a mesma pergunta em 5 chats novos e 4 respostas seguiram o formato. Quantos por cento seguiram?", rotulo: "Item 1", resposta: "80", porque: "4 de 5 é 80%." },
      { pergunta: "Em 4 chats, 4 respeitaram a regra “não entregar a resposta pronta”. Quantos por cento?", rotulo: "Item 2", resposta: "100", porque: "4 de 4 é 100%." },
      { pergunta: "Em 10 testes, 7 foram bons. Quantos por cento?", rotulo: "Item 3", resposta: "70", porque: "7 de 10 é 70%." }] },
    { tipo: "descobrir", texto: "Resultados de uma rodada de testes em chats novos.", tabela: { cab: ["Pergunta de teste", "Chat 1", "Chat 2", "Chat 3"], linhas: [["Explique listas", "formato certo", "formato certo", "formato certo"], ["Resolva o exercício 3", "recusou", "recusou", "entregou a resposta"], ["O que diz a apostila sobre classes?", "disse que não trata", "inventou", "disse que não trata"]] }, dicas: ["Em quais linhas a resposta mudou de um chat para outro?", "Que parte das instruções você ajustaria para cada linha inconsistente?"],
      pergunta: "O que esses resultados mostram sobre a consistência e o que você mudaria, uma coisa de cada vez?", explicacao: "Só a primeira pergunta é **consistente**. A regra de “não entregar a resposta” falhou uma vez e o Claude **inventou** uma vez. Ajuste **uma frase de cada vez** (reforçar o “não fazer” e acrescentar “se o material não trata do tema, diga isso”) e **rode os testes de novo**.", conceito: "pj_avaliar" },
    { tipo: "escrever", transfer: true, texto: "**Transferência.** Escreva `taxa_consistencia(respostas, termo)`: devolve a fração (de 0 a 1, com 2 casas) das respostas que contêm `termo` (sem diferenciar maiúsculas de minúsculas). Para uma lista vazia, devolve `0.0`.", arquivo: "meu_programa.py",
      inicial: `def taxa_consistencia(respostas, termo):
    return 0
`, testes: [["taxa_consistencia(['Use juros simples', 'JUROS compostos', 'nao sei'], 'juros')", "0.67"], ["taxa_consistencia(['a', 'b'], 'x')", "0.0"], ["taxa_consistencia(['ok', 'OK'], 'ok')", "1.0"], ["taxa_consistencia([], 'ok')", "0.0"]], dica: "Conte com um laço quantas respostas têm `termo.lower() in resposta.lower()` e divida pelo total (cuidado com a lista vazia).", conceito: "pj_avaliar",
      solucao: `def taxa_consistencia(respostas, termo):
    if not respostas:
        return 0.0
    achou = 0
    for r in respostas:
        if termo.lower() in r.lower():
            achou = achou + 1
    return round(achou / len(respostas), 2)` },
    { tipo: "aberta", final: true, titulo: "Mini-projeto: o seu Projeto de estudo", texto: "No Claude, monte um **Projeto de estudo** de verdade (Python ou finanças pessoais): escreva as instruções com as cinco partes, envie 2 a 3 materiais **sem nada sensível**, crie 5 perguntas de teste (com pelo menos uma fora do escopo e uma de borda) e rode cada uma em dois chats novos. Use só informações inventadas ou públicas.", pergunta: "Registre aqui: (1) as suas instruções, (2) a lista de materiais com o motivo de cada um e o que ficou de fora, (3) as 5 perguntas de teste com o critério e (4) o que você ajustou depois dos testes.", minimo: 200, dica: "Escreva em quatro blocos numerados, na ordem do enunciado.", conceito: "pj_avaliar", modelo: "Um bom registro tem: **(1) instruções** com papel, objetivo, formato, regras e não fazer; **(2) materiais** (2 a 3, com motivo) e o que foi **deixado de fora** (dados pessoais, segredos, repetidos); **(3) cinco perguntas** de três famílias, cada uma com **critério escrito antes** de testar; **(4) ajustes** feitos **uma coisa por vez** após comparar as respostas dos chats novos. Nada de senhas, chaves ou dados pessoais em lugar nenhum." },
    { tipo: "aberta", tag: "sec", titulo: "Testar com dados de verdade", texto: "Para “testar com situações reais”, alguém cola nas perguntas de teste o nome de colegas, o seu CPF e extratos reais, e depois compartilha o projeto com a turma.", pergunta: "O que há de errado? Como criar perguntas de teste realistas sem esses dados?", modelo: "Perguntas de teste devem usar **situações e números inventados** que cubram normal, fora do escopo e borda. Dados reais de pessoas ou financeiros **não são necessários** e, ao compartilhar, **ficam visíveis** a quem tiver acesso." },
    { tipo: "quiz", itens: [
      { pergunta: "O que é uma pergunta de teste?", opcoes: ["Uma pergunta com resposta esperada", "Uma pergunta feita ao acaso", "Uma resposta sem pergunta", "Uma instrução do projeto"], correta: 0, porque: "Ela tem um critério escrito antes, para avaliar a resposta do projeto.", conceito: "pj_avaliar" },
      { pergunta: "Para medir consistência, você:", opcoes: ["Pergunta uma só vez", "Repete em chats novos", "Apaga as instruções", "Só pede respostas longas"], correta: 1, porque: "Repetir a pergunta em chats novos mostra se as respostas se mantêm.", conceito: "pj_avaliar" },
      { pergunta: "Quando um teste falhar, o ideal é:", opcoes: ["Refazer o projeto todo", "Trocar de conta no app", "Mudar uma coisa e testar", "Ignorar e seguir adiante"], correta: 2, porque: "Mudar uma coisa por vez mostra qual ajuste resolveu.", conceito: "pj_avaliar" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como avaliar se um projeto responde de forma consistente?", conceito: "pj_avaliar", modelo: "Criar **perguntas de teste** (normais, fora do escopo e de borda) com **critério escrito antes**, **repetir em chats novos** e comparar. Se algo falhar, **mudar uma coisa** (instrução ou material) e **testar de novo**. A conferência final é sua, e os testes usam dados inventados." },
  ],
  recuperacao: [
    { p: "Que famílias de pergunta de teste um projeto deve ter?", regex: "(normai|normal);;(fora do escopo|borda|limite)", modelo: "Perguntas normais, fora do escopo (o que as regras proíbem) e de borda.", conceito: "pj_avaliar" },
    { p: "Como medir a consistência de um projeto?", regex: "(repet|mesma pergunta|varios chats|chats novos|comparar)", modelo: "Repetindo a mesma pergunta em chats novos e comparando as respostas.", conceito: "pj_avaliar" },
    { p: "Que dados usar nas perguntas de teste?", regex: "(inventad|ficticio|fake|sem dados reais|sem dado real)", modelo: "Dados e situações inventados, nunca dados reais de pessoas ou financeiros.", conceito: "pj_avaliar" },
  ],
});

export default aulas;
