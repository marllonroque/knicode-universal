// Módulo 7: Mentalidade ágil e gestão de processos (universal). Sem código: o aluno pratica com quadros, listas e decisões.
// Fio condutor: montar o backlog de um gerenciador de tarefas pessoal.
// Fontes conferidas: Manifesto para o Desenvolvimento Ágil de Software (agilemanifesto.org/iso/ptbr/manifesto.html) e Guia do Scrum (scrumguides.org).
export const meta = {
  final: "Mini-projeto: o backlog do gerenciador de tarefas",
  transfer: "Planejar um evento em ciclos curtos",
};
const aulas = [];
const FONTE_MANIFESTO = "Manifesto para o Desenvolvimento Ágil de Software, agilemanifesto.org/iso/ptbr/manifesto.html";
const FONTE_SCRUM = "Guia do Scrum, scrumguides.org";

// ---------- Aula 51: kanban ----------
aulas.push({
  id: "0051", modulo: 7, n: 1, slug: "quadro-kanban", titulo: "Ver o trabalho: o quadro kanban",
  resumo: "Quem não vê o trabalho não consegue organizá-lo. Hoje você monta um quadro com três colunas e descobre por que limitar o que está em andamento.",
  semCodigo: true,
  objetivos: ["Montar um quadro com A fazer, Fazendo e Feito.", "Explicar por que limitar o trabalho em andamento.", "Decidir qual cartão puxar a seguir."],
  conceitos: [["kanban", "Quadro kanban e limite de trabalho em andamento"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você tem 8 tarefas e começou as 8 ao mesmo tempo. No fim do dia, nenhuma ficou pronta. Por que isso acontece? O que você faria diferente?", modelo: "Trocar de tarefa o tempo todo gasta energia, e cada tarefa fica **meio feita**. É melhor começar **poucas** e **terminar** antes de puxar mais. É essa a ideia do limite de trabalho em andamento." },
    { tipo: "texto", titulo: "Um quadro com três colunas", blocos: [
      "Kanban é um quadro que **mostra o trabalho**. Cada tarefa é um cartão, e o cartão anda pelas colunas: **A fazer**, **Fazendo** e **Feito**.",
      "A regra mais importante é o **limite de trabalho em andamento** (em inglês, WIP): a coluna **Fazendo** aceita no máximo uns poucos cartões, por exemplo 2. Para começar um cartão novo, é preciso **terminar** um antes. Isso faz o trabalho fluir e mostra onde as coisas travam.",
      "O quadro serve para qualquer trabalho, não só para programas: estudar para uma prova, organizar uma festa ou fazer um app." ],
      tabela: { cab: ["A fazer", "Fazendo (limite 2)", "Feito"], linhas: [["Criar tela de login", "Desenhar a lista de tarefas", "Escolher o nome do app"], ["Marcar tarefa como feita", "Escrever a primeira tarefa", "Esboçar no papel"], ["Mudar as cores", "", ""]] },
      termos: [["Cartão", "uma tarefa no quadro."], ["WIP (trabalho em andamento)", "quantidade de cartões que estão sendo feitos ao mesmo tempo."], ["Puxar", "pegar um cartão de A fazer quando há espaço em Fazendo."]], fonte: "Guia do Kanban e conceitos do método Kanban (kanbanguides.org)" },
    { tipo: "prever", texto: "No quadro acima, a coluna **Fazendo** tem limite 2 e já tem 2 cartões. Responda com uma palavra ou um número.", conceito: "kanban", itens: [
      { pergunta: "Posso puxar “Criar tela de login” agora? (sim ou não)", rotulo: "Item 1", resposta: ["não", "nao"], porque: "A coluna está no limite (2 de 2). Primeiro é preciso terminar um cartão." },
      { pergunta: "Terminei “Escrever a primeira tarefa”. Quantos cartões ficam em Fazendo?", rotulo: "Item 2", resposta: "1", porque: "Sai um cartão de Fazendo: sobra 1." },
      { pergunta: "Agora posso puxar um cartão novo? (sim ou não)", rotulo: "Item 3", resposta: "sim", porque: "Há 1 cartão em Fazendo e o limite é 2: cabe mais um." }] },
    { tipo: "descobrir", texto: "Compare dois quadros no fim do dia.", tabela: { cab: ["", "Quadro A (sem limite)", "Quadro B (limite 2)"], linhas: [["Fazendo", "8 cartões", "2 cartões"], ["Feito", "0 cartões", "3 cartões"]] }, dicas: ["Olhe a linha “Feito” nos dois quadros.", "Quem tinha menos coisas começadas terminou mais?"],
      pergunta: "O que a diferença entre os quadros ensina sobre começar muita coisa ao mesmo tempo?", explicacao: "Começar muito atrasa o que **termina**. Com limite de 2, o Quadro B terminou 3 cartões, e o Quadro A, nenhum. Terminar é o que entrega valor.", conceito: "kanban" },
    { tipo: "aberta", titulo: "Monte o seu quadro", texto: "Pense numa tarefa sua dos próximos dias.", pergunta: "Escreva 5 tarefas (de estudo, casa ou trabalho), diga quais ficariam em **A fazer**, **Fazendo** (limite 2) e **Feito**, e qual cartão você puxaria primeiro.", minimo: 60, conceito: "kanban", modelo: "Uma boa resposta lista 5 tarefas, coloca no máximo **2** em Fazendo, deixa o resto em A fazer e justifica o primeiro cartão (o mais importante ou o que destrava os outros)." },
    { tipo: "aberta", tag: "sec", titulo: "O quadro na parede", texto: "O quadro da equipe fica numa parede visível ao público e traz os **nomes completos de clientes** nos cartões (por exemplo, “Ligar para João da Silva sobre o débito”).", pergunta: "Qual é o problema? Como escrever o cartão de outra forma?", modelo: "Quem passa vê **dados de pessoas** e até o motivo do contato. Escreva o cartão sem identificar (por exemplo, “Ligar para cliente do pedido 123”) e guarde os detalhes num sistema com acesso controlado." },
    { tipo: "quiz", itens: [
      { pergunta: "O que é o limite de trabalho em andamento?", opcoes: ["Um teto de cartões abertos", "O prazo final do projeto", "O número total de pessoas", "A quantidade já concluída"], correta: 0, porque: "Limita quantos cartões podem estar em Fazendo ao mesmo tempo.", conceito: "kanban" },
      { pergunta: "Para começar um cartão novo com Fazendo cheio:", opcoes: ["Ignoro o limite um pouco", "Termino um cartão antes", "Apago um cartão pronto", "Troco o nome da coluna"], correta: 1, porque: "Primeiro termina-se algo; depois puxa-se o próximo.", conceito: "kanban" },
      { pergunta: "O que o quadro kanban faz com o trabalho?", opcoes: ["Esconde o que atrasou", "Calcula o lucro do mês", "Deixa o trabalho visível", "Escolhe quem trabalha"], correta: 2, porque: "O quadro torna visível o que está a fazer, em andamento e pronto.", conceito: "kanban" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como funciona um quadro kanban e por que limitar o que está em andamento?", conceito: "kanban", modelo: "Cartões andam por colunas (A fazer, Fazendo, Feito). Limitar o que está em Fazendo faz o trabalho ser **terminado** antes de começar mais, evita tarefas meio feitas e mostra onde o trabalho trava." },
  ],
  recuperacao: [
    { p: "Quais são as três colunas básicas de um quadro kanban?", regex: "(a fazer);;(fazendo);;(feito)", modelo: "A fazer, Fazendo e Feito.", conceito: "kanban" },
    { p: "Para que serve o limite de trabalho em andamento?", regex: "(terminar|concluir|fluir|fluxo|meio feit|foco|travar|menos coisas)", modelo: "Para terminar o que foi começado antes de começar mais, e fazer o trabalho fluir.", conceito: "kanban" },
    { p: "Por que não colocar o nome completo de clientes em cartões visíveis ao público?", regex: "(privacid|expoe|dados|identific|sensiv|publico|pessoas)", modelo: "Porque expõe dados de pessoas; use um identificador sem nome.", conceito: "kanban" },
  ],
});

// ---------- Aula 52: backlog ----------
aulas.push({
  id: "0052", modulo: 7, n: 2, slug: "backlog", titulo: "A lista do que falta: o backlog",
  resumo: "Um produto nunca está “pronto”: sempre há mais ideias do que tempo. O backlog é a lista ordenada que decide o que vem primeiro.",
  semCodigo: true,
  objetivos: ["Explicar o que é um backlog e quem o ordena.", "Escrever itens pequenos e claros.", "Ler um backlog ordenado e dizer o que vem a seguir."],
  conceitos: [["backlog", "Backlog: lista ordenada"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você quer criar um aplicativo de tarefas e já tem 20 ideias (lembretes, cores, login, compartilhar...). Você consegue fazer tudo ao mesmo tempo? Como decidir **por onde começar**?", modelo: "Não dá para fazer tudo de uma vez. É preciso **listar** as ideias, **ordenar** pelo que mais importa e começar pelo **topo**. Essa lista ordenada é o backlog." },
    { tipo: "texto", titulo: "Uma lista viva e ordenada", blocos: [
      "O **backlog** é a lista de tudo o que se pode querer do produto, **ordenada** por importância. O que está no **topo** será feito primeiro e deve ser **pequeno e claro**; o que está no fundo pode ser vago.",
      "A lista **muda**: aparecem ideias novas, outras perdem importância. No Scrum, o Product Backlog é uma lista ordenada e emergente do que é necessário para melhorar o produto.",
      "Um bom item diz **o que** a pessoa consegue fazer e **por quê**, sem dizer como programar. Em vez de “criar tabela no banco”, escreva “Quero anotar uma tarefa para não esquecer”." ],
      tabela: { cab: ["Posição", "Item do backlog"], linhas: [["1", "Quero anotar uma tarefa para não esquecer"], ["2", "Quero ver a lista de tarefas do dia"], ["3", "Quero marcar uma tarefa como feita"], ["4", "Quero escolher a cor do aplicativo"]] },
      termos: [["Backlog", "lista ordenada de tudo o que o produto pode precisar."], ["Item", "uma entrada da lista, descrita pelo que a pessoa consegue fazer."], ["Topo", "o início da lista: o que será feito primeiro."]], fonte: FONTE_SCRUM },
    { tipo: "prever", texto: "Use o backlog da tabela acima. Responda com um número.", conceito: "backlog", itens: [
      { pergunta: "Qual posição será feita primeiro?", rotulo: "Item 1", resposta: "1", porque: "O topo da lista vem primeiro." },
      { pergunta: "Depois de fazer o item 1, qual é o próximo?", rotulo: "Item 2", resposta: "2", porque: "Segue a ordem da lista." },
      { pergunta: "Chegou uma ideia nova, mais importante que todas. Em que posição ela entra?", rotulo: "Item 3", resposta: "1", porque: "O backlog é ordenado por importância; a ideia mais importante vai para o topo." }] },
    { tipo: "descobrir", texto: "Compare dois jeitos de escrever o mesmo item.", tabela: { cab: ["Item vago", "Item claro"], linhas: [["Melhorar tudo", "Quero marcar uma tarefa como feita"], ["Banco de dados", "Quero ver minhas tarefas ao reabrir o app"], ["Tela bonita", "Quero ler o texto sem forçar a vista"]] }, dicas: ["Qual coluna diz o que a pessoa consegue fazer?", "Dá para testar se um item “Melhorar tudo” está pronto?"],
      pergunta: "O que os itens claros têm em comum? Por que são melhores para trabalhar?", explicacao: "Descrevem o que a **pessoa consegue fazer** e podem ser **verificados**: dá para saber se está pronto. “Melhorar tudo” nunca termina.", conceito: "backlog" },
    { tipo: "aberta", titulo: "Escreva o seu backlog", texto: "Imagine um aplicativo de tarefas pessoal.", pergunta: "Escreva 6 itens de backlog no formato “Quero ___ para ___”, em ordem de importância, e diga em uma frase por que o primeiro vem antes do segundo.", minimo: 70, conceito: "backlog", modelo: "Uma boa resposta tem 6 itens pequenos, no formato “quero... para...”, ordenados, com uma razão: por exemplo, não adianta ver a lista (2) antes de conseguir **anotar** uma tarefa (1)." },
    { tipo: "aberta", tag: "sec", titulo: "Ideias que viram dados", texto: "Um item do backlog diz: “Guardar o CPF e o endereço de todos os usuários, por via das dúvidas”.", pergunta: "O que há de errado com esse item? Como ele deveria ser reescrito?", modelo: "Coleta **mais dados do que o necessário**, “por via das dúvidas”, e cria risco sem motivo. Reescreva com a **finalidade**: só pedir um dado quando uma funcionalidade precisar dele, e dizer **para quê** (minimização)." },
    { tipo: "quiz", itens: [
      { pergunta: "O que é um backlog?", opcoes: ["Uma lista ordenada", "Uma tela do app", "Um erro do código", "Um relatório do mês"], correta: 0, porque: "É a lista ordenada do que o produto pode precisar.", conceito: "backlog" },
      { pergunta: "Quem está no topo do backlog?", opcoes: ["O item mais bonito", "O item mais antigo", "O item mais importante", "O item mais longo"], correta: 2, porque: "A ordem é por importância.", conceito: "backlog" },
      { pergunta: "Um bom item de backlog descreve:", opcoes: ["Como programar tudo", "O que a pessoa faz", "O nome do arquivo", "O prazo da equipe"], correta: 1, porque: "Diz o que a pessoa consegue fazer e por quê.", conceito: "backlog" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que é um backlog e como saber o que fazer primeiro?", conceito: "backlog", modelo: "É a lista ordenada de tudo o que o produto pode precisar. Faz-se primeiro o que está no topo (mais importante), com itens pequenos e claros, e a lista muda conforme se aprende." },
  ],
  recuperacao: [
    { p: "O que é um backlog?", regex: "(lista);;(ordenad|prioridade|importan)", modelo: "Uma lista ordenada do que o produto pode precisar.", conceito: "backlog" },
    { p: "O que se faz primeiro no backlog?", regex: "(topo|primeiro|mais importante)", modelo: "O que está no topo, o mais importante.", conceito: "backlog" },
    { p: "Por que não guardar dados “por via das dúvidas”?", regex: "(minimiz|necessari|finalidade|risco|mais dados|desnecess)", modelo: "Porque se coleta mais do que o necessário; só se pede o dado quando uma funcionalidade precisa dele.", conceito: "backlog" },
  ],
});

// ---------- Aula 53: priorizar ----------
aulas.push({
  id: "0053", modulo: 7, n: 3, slug: "priorizar", titulo: "O que primeiro? Valor e esforço",
  resumo: "Tudo parece urgente. Dois critérios simples ajudam a decidir com argumento: quanto vale e quanto custa.",
  semCodigo: true,
  objetivos: ["Classificar itens por valor e esforço.", "Escolher o próximo item justificando.", "Perceber que priorizar é também dizer o que fica de fora."],
  conceitos: [["priorizar", "Priorizar por valor e esforço"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você tem duas tarefas: uma ajuda muito e dá pouco trabalho; a outra ajuda pouco e dá muito trabalho. Qual faz primeiro? Que critérios você está usando?", modelo: "A primeira: **valor alto** e **esforço baixo**. Os dois critérios são o que a tarefa **vale** e o que ela **custa** para fazer." },
    { tipo: "texto", titulo: "Valor e esforço", blocos: [
      "Para ordenar o backlog sem brigar por opinião, dê a cada item uma nota de **valor** (quanto ajuda) e de **esforço** (quanto custa), de 1 a 3, por exemplo.",
      "Em geral, comece pelo que tem **muito valor e pouco esforço**. O que tem pouco valor e muito esforço fica por último, ou **não é feito**. Dizer “não” a um item também é uma decisão de prioridade.",
      "Atenção: as notas são **estimativas**, e a equipe pode mudá-las quando aprender mais." ],
      tabela: { cab: ["Item", "Valor (1-3)", "Esforço (1-3)"], linhas: [["Anotar uma tarefa", "3", "1"], ["Lembrete por e-mail", "2", "3"], ["Marcar como feita", "3", "1"], ["Escolher cor do app", "1", "1"], ["Compartilhar com amigos", "2", "3"]] },
      termos: [["Valor", "o quanto o item ajuda quem usa o produto."], ["Esforço", "o quanto de trabalho o item custa."], ["Prioridade", "a ordem em que os itens serão feitos."]] },
    { tipo: "prever", texto: "Use a tabela de notas. Responda com um número (a nota) ou uma palavra.", conceito: "priorizar", itens: [
      { pergunta: "Qual é o esforço de “Lembrete por e-mail”?", rotulo: "Item 1", resposta: "3", porque: "Está na tabela: valor 2, esforço 3." },
      { pergunta: "Entre “Anotar uma tarefa” e “Lembrete por e-mail”, qual vem primeiro?", rotulo: "Item 2", resposta: ["anotar uma tarefa", "anotar"], porque: "Valor 3 e esforço 1 contra valor 2 e esforço 3: o primeiro rende mais com menos." },
      { pergunta: "Qual item tem valor 1 (o menor)?", rotulo: "Item 3", resposta: ["escolher cor do app", "cor", "escolher cor"], porque: "A cor do app tem valor 1, e por isso não é urgente, embora seja fácil." }] },
    { tipo: "descobrir", texto: "Veja a ordem que saiu para os itens da tabela.", tabela: { cab: ["Ordem", "Item", "Por quê"], linhas: [["1", "Anotar uma tarefa", "Valor 3, esforço 1"], ["2", "Marcar como feita", "Valor 3, esforço 1"], ["3", "Lembrete por e-mail", "Valor 2, esforço 3"], ["4", "Escolher cor do app", "Valor 1, esforço 1"]] }, dicas: ["Os dois primeiros têm o mesmo valor e esforço; a ordem entre eles depende de quê?", "“Compartilhar com amigos” ficou de fora. Por que pode ser uma boa decisão?"],
      pergunta: "O que a lista mostra sobre empates e sobre o que ficou de fora?", explicacao: "Em empate, decide-se pelo que **destrava** o resto (não dá para marcar como feita uma tarefa que não foi anotada). E “Compartilhar” (valor 2, esforço 3) ficou de fora **por enquanto**: priorizar também é adiar ou recusar.", conceito: "priorizar" },
    { tipo: "aberta", titulo: "Priorize você", texto: "Cinco ideias para um app de tarefas: alarme sonoro, categorias coloridas, anotar tarefa, apagar tarefa, exportar para planilha.", pergunta: "Dê notas de valor e esforço (1 a 3) para as cinco, escreva a ordem em que faria e diga qual deixaria **de fora** por enquanto, com o motivo.", minimo: 80, conceito: "priorizar", modelo: "Uma boa resposta dá notas coerentes (anotar tarefa: valor 3, esforço 1), ordena começando pelo que **mais vale e menos custa** e pelo que destrava outros, e deixa de fora algo de **pouco valor e muito esforço** (como exportar para planilha), explicando." },
    { tipo: "aberta", tag: "sec", titulo: "O item que ninguém priorizou", texto: "Num backlog, “corrigir a falha que mostra a lista de tarefas de uma pessoa para outra” está na posição 30, porque tem “pouco valor” (só afeta 1% dos usuários).", pergunta: "O que há de errado com essa conta? Que critério deveria entrar na priorização?", modelo: "A falha **expõe dados de pessoas**: o dano para quem é afetado é alto mesmo que sejam poucos. Além de valor e esforço, **risco de segurança e privacidade** deve entrar na priorização, e falhas assim sobem para o topo." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual item costuma ir primeiro?", opcoes: ["Muito valor, pouco esforço", "Pouco valor, muito esforço", "Pouco valor, pouco esforço", "Muito esforço, muito valor"], correta: 0, porque: "Rende muito e custa pouco.", conceito: "priorizar" },
      { pergunta: "Dizer “não” a um item é:", opcoes: ["Um erro de gestão", "Uma decisão válida", "Uma falta de respeito", "Um sinal de atraso"], correta: 1, porque: "Priorizar inclui decidir o que fica de fora.", conceito: "priorizar" },
      { pergunta: "As notas de valor e esforço são:", opcoes: ["Verdades eternas", "Medidas exatas", "Estimativas que mudam", "Regras do cliente"], correta: 2, porque: "São estimativas e mudam conforme se aprende.", conceito: "priorizar" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como decidir o que fazer primeiro com valor e esforço?", conceito: "priorizar", modelo: "Dá-se nota de valor e de esforço a cada item e começa-se pelo que tem **muito valor e pouco esforço**. O que vale pouco e custa muito fica por último ou de fora. As notas são estimativas e riscos de segurança também entram." },
  ],
  recuperacao: [
    { p: "Que dois critérios simples ajudam a priorizar?", regex: "(valor);;(esforco|custo)", modelo: "Valor e esforço.", conceito: "priorizar" },
    { p: "Que tipo de item costuma vir primeiro?", regex: "(muito valor|alto valor|mais valor);;(pouco esforco|baixo esforco|menos esforco|facil)", modelo: "O que tem muito valor e pouco esforço.", conceito: "priorizar" },
    { p: "Por que riscos de segurança e privacidade devem entrar na priorização?", regex: "(dano|expoe|dados|seguranca|privacid|risco|pessoas)", modelo: "Porque uma falha pode expor dados de pessoas e causar dano mesmo afetando poucos usuários.", conceito: "priorizar" },
  ],
});

// ---------- Aula 54: MVP ----------
aulas.push({
  id: "0054", modulo: 7, n: 4, slug: "entregas-pequenas-mvp", titulo: "Entregar pouco, cedo: a primeira versão (MVP)",
  resumo: "Construir tudo e mostrar no fim é arriscado. Hoje você aprende a entregar a menor versão que já serve e a aprender com ela.",
  semCodigo: true,
  objetivos: ["Definir o MVP de um produto.", "Escolher o que entra na primeira versão e o que espera.", "Explicar por que entregar cedo reduz o risco."],
  conceitos: [["mvp", "Menor versão que já ajuda (MVP)"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você passa seis meses construindo um aplicativo completo e só então mostra para as pessoas. Elas não gostam. O que deu errado? O que você faria para descobrir isso mais cedo?", modelo: "Descobriu tarde demais. Teria sido melhor entregar uma **versão pequena logo**, ver como as pessoas usam e **aprender** antes de investir seis meses." },
    { tipo: "texto", titulo: "A menor versão que já ajuda", blocos: [
      "**MVP** significa produto mínimo viável: a **menor versão** que já resolve **um problema real** para alguém. Não é um produto ruim, é um produto **pequeno e certo**.",
      "Entregar cedo traz **aprendizado**: você descobre o que as pessoas realmente usam antes de gastar tempo no que ninguém quer. Isso reduz o risco.",
      "Para definir o MVP, pergunte: “Qual é o **mínimo** para a pessoa conseguir fazer a coisa principal?”. O resto vai para o backlog." ],
      tabela: { cab: ["Entra no MVP", "Fica para depois"], linhas: [["Anotar uma tarefa", "Cores personalizadas"], ["Ver a lista", "Compartilhar com amigos"], ["Marcar como feita", "Lembrete por e-mail"]] },
      termos: [["MVP", "a menor versão do produto que já ajuda alguém."], ["Entrega pequena", "uma parte do produto que já funciona de ponta a ponta."]], fonte: "Princípios do Manifesto Ágil: entregar software funcionando com frequência (" + FONTE_MANIFESTO + ")" },
    { tipo: "prever", texto: "Use a tabela do MVP. Responda com um número.", conceito: "mvp", itens: [
      { pergunta: "Quantos itens entram no MVP?", rotulo: "Item 1", resposta: "3", porque: "A coluna “Entra no MVP” tem 3 itens." },
      { pergunta: "O MVP já permite anotar e concluir uma tarefa? (sim ou não)", rotulo: "Item 2", resposta: "sim", porque: "Anotar, ver e marcar como feita já resolvem o problema principal." },
      { pergunta: "Quantos itens ficam para depois?", rotulo: "Item 3", resposta: "3", porque: "A segunda coluna tem 3 itens." }] },
    { tipo: "descobrir", texto: "Dois planos para o mesmo aplicativo.", tabela: { cab: ["", "Plano A", "Plano B"], linhas: [["O que entrega", "Tudo, no mês 6", "O mínimo, no mês 1"], ["Quando recebe opinião", "Só no mês 6", "A partir do mês 1"], ["Risco de errar o rumo", "Alto", "Baixo"]] }, dicas: ["Em qual plano você descobre o erro mais cedo?", "O que o Plano B faz com o que aprende?"],
      pergunta: "Por que o Plano B reduz o risco, mesmo entregando menos no começo?", explicacao: "Porque a opinião chega **cedo**, quando mudar custa pouco. No Plano A, um erro de rumo só aparece depois de gastar seis meses.", conceito: "mvp" },
    { tipo: "aberta", titulo: "Corte o seu MVP", texto: "Você quer um aplicativo para dividir despesas entre amigos, com contas, cálculo de quem deve quanto, gráficos, convites e fotos dos recibos.", pergunta: "Defina o MVP: quais 3 itens entram na primeira versão? O que fica para depois? Por quê?", minimo: 70, conceito: "mvp", modelo: "Entra o **mínimo para o problema principal**: registrar uma despesa, dizer quem pagou e calcular quanto cada um deve. Gráficos, fotos e convites esperam. O motivo: dá para usar e **aprender** com o essencial." },
    { tipo: "aberta", tag: "sec", titulo: "Pequeno não é descuidado", texto: "Para entregar o MVP mais rápido, a equipe decide pular a proteção das senhas e “consertar depois”.", pergunta: "Por que isso é um erro? O que **não** pode ser cortado num MVP?", modelo: "Quando as pessoas começam a usar, os dados já estão em risco, e “depois” costuma não chegar. **Segurança e proteção de dados** não são extras: o MVP pode ter **menos funções**, mas não **menos cuidado** com o que já guarda." },
    { tipo: "quiz", itens: [
      { pergunta: "O que é um MVP?", opcoes: ["A menor versão que ajuda", "Uma versão com defeitos", "O produto já completo", "Um protótipo só no papel"], correta: 0, porque: "É a menor versão que já resolve um problema real.", conceito: "mvp" },
      { pergunta: "Por que entregar cedo reduz o risco?", opcoes: ["Cobra menos das pessoas", "Evita que haja opiniões", "Gera aprendizado a tempo", "Dispensa fazer testes"], correta: 2, porque: "A opinião chega cedo, quando mudar é barato.", conceito: "mvp" },
      { pergunta: "O que fica fora do MVP?", opcoes: ["Segurança dos dados", "O que não é o essencial", "A função principal", "O que a pessoa precisa"], correta: 1, porque: "O que não é essencial espera no backlog.", conceito: "mvp" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que é um MVP e por que ele reduz o risco?", conceito: "mvp", modelo: "É a menor versão do produto que já resolve um problema real. Reduz o risco porque a opinião e o aprendizado chegam cedo, quando mudar custa pouco; o que não é essencial espera no backlog, mas a segurança não é cortada." },
  ],
  recuperacao: [
    { p: "O que é um MVP?", regex: "(menor|minim|primeira);;(versao|produto)", modelo: "A menor versão do produto que já ajuda alguém.", conceito: "mvp" },
    { p: "Por que entregar cedo reduz o risco?", regex: "(aprend|opiniao|feedback|cedo|erro|rumo|descobr)", modelo: "Porque se aprende cedo, quando mudar custa pouco.", conceito: "mvp" },
    { p: "Por que a segurança não deve ser cortada do MVP?", regex: "(dados|risco|depois|seguranca|senha|proteg|pessoas)", modelo: "Porque os dados das pessoas já estão em risco desde o primeiro uso.", conceito: "mvp" },
  ],
});

// ---------- Aula 55: ciclos curtos ----------
aulas.push({
  id: "0055", modulo: 7, n: 5, slug: "ciclos-curtos", titulo: "Trabalhar em ciclos curtos",
  resumo: "Planejar o ano inteiro erra. Planejar uma ou duas semanas funciona melhor. Hoje, o ciclo curto: planejar, fazer, mostrar, ajustar.",
  semCodigo: true,
  objetivos: ["Descrever um ciclo curto com tempo fixo.", "Escolher quanto trabalho cabe num ciclo.", "Explicar o que fazer quando algo não cabe."],
  conceitos: [["ciclo", "Ciclos curtos com tempo fixo"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Planejar sozinho tudo o que fará no próximo ano costuma dar certo? E planejar só a próxima semana? Por quê?", modelo: "O plano anual **erra**, porque muita coisa muda e não dá para prever. O plano de uma semana é **mais realista**, e você ajusta o rumo semana a semana." },
    { tipo: "texto", titulo: "Planejar, fazer, mostrar, ajustar", blocos: [
      "Um **ciclo curto** tem **tempo fixo** (por exemplo, uma semana). No começo escolhe-se **quanto trabalho cabe** e, no fim, **mostra-se o que ficou pronto** e **ajusta-se** o plano.",
      "No Scrum, esse ciclo se chama **Sprint** e tem duração fixa de **um mês ou menos**. O que importa para quem está começando é o princípio: tempo fixo e aprendizado a cada volta.",
      "Se o trabalho **não cabe**, o tempo **não estica**: tira-se um item do ciclo (ele volta ao backlog) e a equipe aprende a estimar melhor." ],
      tabela: { cab: ["Dia", "O que acontece"], linhas: [["Segunda", "Planejar: escolher os itens do ciclo"], ["Terça a quinta", "Fazer e ajustar no quadro"], ["Sexta", "Mostrar o que ficou pronto e olhar para trás"]] },
      termos: [["Ciclo (Sprint)", "um período curto de tempo fixo para entregar algo que funciona."], ["Tempo fixo", "o prazo do ciclo não muda; o que cabe nele é que se ajusta."]], fonte: FONTE_SCRUM },
    { tipo: "prever", texto: "O ciclo é de 5 dias úteis (segunda a sexta). Responda com um número ou uma palavra.", conceito: "ciclo", itens: [
      { pergunta: "Em que dia se planeja o ciclo?", rotulo: "Item 1", resposta: ["segunda", "segunda-feira"], porque: "O planejamento acontece no começo, na segunda." },
      { pergunta: "O trabalho não coube no ciclo. O prazo estica? (sim ou não)", rotulo: "Item 2", resposta: ["não", "nao"], porque: "O tempo é fixo: o que não cabe volta ao backlog." },
      { pergunta: "Na sexta, o que se faz além de mostrar o que ficou pronto?", rotulo: "Item 3", resposta: ["olhar para trás", "retrospectiva", "ajustar", "refletir"], porque: "Olha-se para trás para ajustar o jeito de trabalhar." }] },
    { tipo: "descobrir", texto: "Dois ciclos de uma semana, com a mesma pessoa.", tabela: { cab: ["", "Ciclo 1", "Ciclo 2"], linhas: [["Planejou", "6 itens", "4 itens"], ["Terminou", "3 itens", "4 itens"]] }, dicas: ["Compare o que foi planejado com o que foi terminado nos dois ciclos.", "O que a pessoa aprendeu entre o primeiro e o segundo?"],
      pergunta: "O que mudou do ciclo 1 para o 2? Por que o plano menor foi melhor?", explicacao: "A pessoa **aprendeu sua capacidade real** (cabiam uns 3 a 4 itens) e planejou menos, mas terminou tudo. Ciclos curtos servem para **aprender a estimar**.", conceito: "ciclo" },
    { tipo: "aberta", titulo: "Planeje o seu ciclo", texto: "Escolha um objetivo real para a próxima semana (estudar um tema, organizar um espaço, terminar um trabalho).", pergunta: "Liste os itens que você colocaria num ciclo de 5 dias, diga quantos cabem de verdade e o que deixaria no backlog.", minimo: 70, conceito: "ciclo", modelo: "Uma boa resposta escolhe poucos itens (3 a 4), explica por que cabem (tempo diário disponível) e deixa o resto no backlog, sem esticar o prazo." },
    { tipo: "aberta", tag: "sec", titulo: "Mostrar o que ficou pronto", texto: "Na demonstração de sexta, a equipe mostra o sistema usando uma **cópia dos dados reais de clientes**, para ficar mais realista.", pergunta: "Qual é o risco? O que usar na demonstração?", modelo: "Na demonstração há **mais pessoas olhando**, inclusive de fora da equipe, e os dados reais podem ser expostos. Use **dados fictícios** que imitam o formato (nomes inventados, CPF `000.000.000-00`)." },
    { tipo: "quiz", itens: [
      { pergunta: "O que é fixo num ciclo curto?", opcoes: ["O tempo do ciclo", "A quantidade de itens", "A ordem do backlog", "O nome do projeto"], correta: 0, porque: "O tempo é fixo; o que cabe nele é ajustado.", conceito: "ciclo" },
      { pergunta: "O trabalho não coube no ciclo. O que fazer?", opcoes: ["Estender o prazo", "Cortar a revisão", "Devolver ao backlog", "Trabalhar de noite"], correta: 2, porque: "O item volta ao backlog e o tempo não estica.", conceito: "ciclo" },
      { pergunta: "Para que servem os ciclos curtos?", opcoes: ["Para trabalhar mais rápido", "Para aprender e ajustar", "Para evitar reuniões", "Para cobrar a equipe"], correta: 1, porque: "Cada volta traz aprendizado para o próximo plano.", conceito: "ciclo" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como funciona um ciclo curto e o que fazer se algo não cabe?", conceito: "ciclo", modelo: "Tem tempo fixo (por exemplo, uma semana): planeja-se o que cabe, faz-se, mostra-se o que ficou pronto e ajusta-se. O que não cabe volta ao backlog; o tempo não estica." },
  ],
  recuperacao: [
    { p: "O que é fixo num ciclo curto?", regex: "(tempo|prazo|duracao)", modelo: "O tempo (o prazo) do ciclo.", conceito: "ciclo" },
    { p: "O que fazer com um item que não coube no ciclo?", regex: "(backlog|volta|proximo ciclo|adia|deixa)", modelo: "Devolve ao backlog; o tempo não estica.", conceito: "ciclo" },
    { p: "Que dados usar numa demonstração?", regex: "(fictici|inventad|ficticio|nao reais|exemplo)", modelo: "Dados fictícios, não os dados reais de clientes.", conceito: "ciclo" },
  ],
});

// ---------- Aula 56: pronto de verdade ----------
aulas.push({
  id: "0056", modulo: 7, n: 6, slug: "definicao-de-pronto", titulo: "O que é “pronto” de verdade?",
  resumo: "“Está quase pronto” é a frase mais perigosa do trabalho. Hoje você aprende a escrever, antes, o que significa terminar.",
  semCodigo: true,
  objetivos: ["Escrever uma definição de pronto.", "Usar critérios que dá para verificar.", "Recusar o “quase pronto”."],
  conceitos: [["pronto", "Definição de pronto"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Duas pessoas dizem “terminei a tela de login”. Uma só desenhou; a outra desenhou, programou e testou com senha errada e certa. Elas terminaram a mesma coisa? Como evitar essa confusão?", modelo: "**Não.** A palavra “pronto” significa coisas diferentes. Para evitar isso, a equipe combina **antes**, por escrito, o que precisa ser verdade para um item contar como pronto." },
    { tipo: "texto", titulo: "Combinar antes", blocos: [
      "A **definição de pronto** é uma lista de verificações que todo item precisa cumprir para ser considerado terminado. Ela é combinada **antes** do trabalho, e vale para **todos** os itens.",
      "Cada critério deve ser **verificável**: dá para responder sim ou não. “Está bom” não serve; “passou nos testes” serve.",
      "Sem o pronto, o trabalho fica **quase pronto** para sempre e as dívidas se acumulam. O Guia do Scrum chama esse compromisso de Definição de Pronto (Definition of Done)." ],
      tabela: { cab: ["Critério de pronto", "Dá para verificar?"], linhas: [["Funciona com dados certos e errados", "Sim, testando"], ["Tem testes que passam", "Sim, rodando-os"], ["Outra pessoa revisou", "Sim, há registro"], ["Ficou legal", "Não, é opinião"]] },
      termos: [["Definição de pronto", "lista combinada do que precisa ser verdade para um item estar terminado."], ["Verificável", "que dá para checar com sim ou não."]], fonte: FONTE_SCRUM },
    { tipo: "prever", texto: "Use a tabela de critérios. Responda sim ou não.", conceito: "pronto", itens: [
      { pergunta: "“Ficou legal” é um bom critério de pronto?", rotulo: "Item 1", resposta: ["não", "nao"], porque: "É opinião, e não dá para checar com sim ou não." },
      { pergunta: "“Tem testes que passam” é um critério verificável?", rotulo: "Item 2", resposta: "sim", porque: "Basta rodar os testes e ver." },
      { pergunta: "A tela está desenhada, mas sem testes. Está pronta?", rotulo: "Item 3", resposta: ["não", "nao"], porque: "Falta cumprir critérios da definição de pronto." }] },
    { tipo: "descobrir", texto: "Dois jeitos de escrever critérios.", tabela: { cab: ["Critério vago", "Critério verificável"], linhas: [["Rápido", "Abre em menos de 2 segundos"], ["Seguro", "Senha nunca aparece em texto puro"], ["Fácil de usar", "Uma pessoa nova anota uma tarefa em 1 minuto"]] }, dicas: ["Dá para medir ou observar cada item da coluna da direita?", "O que muda quando o critério vira um número ou um teste?"],
      pergunta: "O que os critérios verificáveis têm que os vagos não têm?", explicacao: "Têm um **número** ou algo **observável**, então duas pessoas chegam à mesma resposta (passou ou não passou).", conceito: "pronto" },
    { tipo: "aberta", titulo: "Escreva o seu pronto", texto: "Pense num trabalho seu (um relatório, um app, uma apresentação).", pergunta: "Escreva uma definição de pronto com 4 critérios **verificáveis** para esse trabalho.", minimo: 70, conceito: "pronto", modelo: "Uma boa resposta tem 4 critérios com resposta sim ou não, como “revisado por outra pessoa”, “sem erros de ortografia na ferramenta de revisão”, “testado com dados errados” e “fonte de cada número citada”." },
    { tipo: "aberta", tag: "sec", titulo: "Pronto sem segurança", texto: "A definição de pronto da equipe tem três itens: funciona, tem testes e foi revisado. Não menciona segurança nem privacidade.", pergunta: "Que critério você acrescentaria? Por que ele precisa estar na definição?", modelo: "Por exemplo, “**não tem senha nem chave escrita no código**” e “**guarda só os dados necessários**”. Se não estiver na definição de pronto, ninguém verifica, e o item é entregue com o risco." },
    { tipo: "quiz", itens: [
      { pergunta: "Quando se combina a definição de pronto?", opcoes: ["Antes do trabalho", "Depois da entrega", "Só se houver atraso", "Quando o chefe pedir"], correta: 0, porque: "Combina-se antes, para todos terminarem do mesmo jeito.", conceito: "pronto" },
      { pergunta: "Qual critério é verificável?", opcoes: ["Ficou bem legal", "Está bem rápido", "Tem testes que passam", "O cliente vai gostar"], correta: 2, porque: "Dá para checar com sim ou não.", conceito: "pronto" },
      { pergunta: "“Quase pronto” conta como pronto?", opcoes: ["Sim, em geral", "Não, ainda falta", "Sim, se for o dono", "Sim, na sexta"], correta: 1, porque: "Ou cumpre todos os critérios ou não está pronto.", conceito: "pronto" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que é uma definição de pronto e como escrever bons critérios?", conceito: "pronto", modelo: "É a lista combinada, antes do trabalho, do que precisa ser verdade para um item estar terminado. Cada critério é verificável (sim ou não), e inclui segurança e privacidade." },
  ],
  recuperacao: [
    { p: "O que é uma definição de pronto?", regex: "(lista|criterio|combinad);;(terminad|pronto|conclu)", modelo: "A lista combinada do que precisa ser verdade para um item estar terminado.", conceito: "pronto" },
    { p: "O que torna um critério verificável?", regex: "(sim ou nao|medir|observ|numero|teste|checar|verificar)", modelo: "Dá para responder sim ou não, medindo ou testando.", conceito: "pronto" },
    { p: "Que critério de segurança poderia entrar na definição de pronto?", regex: "(senha|chave|segredo|dados|privacid|minim|codigo)", modelo: "Por exemplo: sem senha ou chave escrita no código.", conceito: "pronto" },
  ],
});

// ---------- Aula 57: retrospectiva ----------
aulas.push({
  id: "0057", modulo: 7, n: 7, slug: "retrospectiva", titulo: "Olhar para trás para melhorar: a retrospectiva",
  resumo: "Ser ágil é aprender o que funcionou e mudar o que não funcionou. A retrospectiva é a conversa curta que faz isso toda semana.",
  semCodigo: true,
  objetivos: ["Conduzir uma retrospectiva com três perguntas.", "Transformar um problema em uma ação concreta.", "Relacionar a retrospectiva com os valores do Manifesto Ágil."],
  conceitos: [["retro", "Retrospectiva: inspecionar e adaptar"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "No fim de cada semana, o que você poderia perguntar a si mesmo (ou à equipe) para trabalhar melhor na próxima? Pense em até três perguntas.", modelo: "Por exemplo: **o que deu certo?**, **o que não deu certo?** e **o que vamos mudar na próxima semana?**. O importante é terminar com **uma mudança concreta**." },
    { tipo: "texto", titulo: "Inspecionar e adaptar", blocos: [
      "A **retrospectiva** é uma conversa curta no fim do ciclo: o que **deu certo**, o que **atrapalhou** e **o que mudar**. No Scrum, é o momento em que o time planeja formas de aumentar a qualidade e a eficácia.",
      "Uma boa retrospectiva termina com **uma ou duas ações pequenas e concretas** (“começar a revisar o código em dupla”), com **responsável**, e não com uma lista de queixas.",
      "Isso conecta com o Manifesto Ágil, que valoriza **indivíduos e interações** mais que processos e ferramentas, **software em funcionamento** mais que documentação abrangente, **colaboração com o cliente** mais que negociação de contratos, e **responder a mudanças** mais que seguir um plano." ],
      tabela: { cab: ["Deu certo", "Atrapalhou", "Vamos mudar"], linhas: [["O quadro ficou claro", "Muitos itens ao mesmo tempo", "Limite de 2 em Fazendo (Bia)"], ["Entregamos o login", "Faltou teste de senha errada", "Todo item passa por teste (Caio)"]] },
      termos: [["Retrospectiva", "conversa curta, ao fim do ciclo, para melhorar o jeito de trabalhar."], ["Ação concreta", "uma mudança pequena, com responsável, que dá para fazer no próximo ciclo."]], fonte: FONTE_MANIFESTO + "; " + FONTE_SCRUM },
    { tipo: "prever", texto: "Use a tabela da retrospectiva. Responda com uma palavra ou número.", conceito: "retro", itens: [
      { pergunta: "Quantas ações de mudança estão na tabela?", rotulo: "Item 1", resposta: "2", porque: "Há duas linhas em “Vamos mudar”." },
      { pergunta: "Quem cuida da ação “Limite de 2 em Fazendo”?", rotulo: "Item 2", resposta: ["bia", "Bia"], porque: "A responsável vem entre parênteses." },
      { pergunta: "“Precisamos nos comunicar melhor” é uma ação concreta? (sim ou não)", rotulo: "Item 3", resposta: ["não", "nao"], porque: "É vaga: ninguém sabe o que fazer na segunda-feira." }] },
    { tipo: "descobrir", texto: "Duas retrospectivas terminaram assim.", tabela: { cab: ["Retro A", "Retro B"], linhas: [["Lista de dez queixas", "Duas ações com responsável"], ["Nada muda", "Testa as ações na semana seguinte"]] }, dicas: ["Qual das duas muda o jeito de trabalhar?", "O que faz uma ação ser possível de cumprir?"],
      pergunta: "O que faz a Retro B funcionar melhor?", explicacao: "Termina com **poucas ações concretas e com responsável**, que podem ser testadas no próximo ciclo. Queixas sem ação não mudam nada.", conceito: "retro" },
    { tipo: "aberta", titulo: "Faça a sua retrospectiva", texto: "Pense na última semana de estudo ou trabalho.", pergunta: "Escreva uma coisa que deu certo, uma que atrapalhou e **uma ação concreta** para a próxima semana (com quando você vai fazer).", minimo: 70, conceito: "retro", modelo: "Uma boa resposta traz um acerto, um problema real e uma ação **pequena, específica e com prazo**: por exemplo, “estudar 30 minutos às 19h, com o celular em outro cômodo”." },
    { tipo: "aberta", tag: "sec", titulo: "Retrospectiva sem caça às bruxas", texto: "Numa retrospectiva, o gerente pergunta de quem foi a culpa pelo vazamento de dados e cobra publicamente a pessoa.", pergunta: "Que efeito isso tem sobre a segurança da equipe? Como conduzir de outro jeito?", modelo: "As pessoas passam a **esconder erros** para não serem expostas, e problemas de segurança ficam sem tratamento. Conduza com foco no **processo**: o que permitiu o erro e que **proteção** impede que se repita." },
    { tipo: "quiz", itens: [
      { pergunta: "Como termina uma boa retrospectiva?", opcoes: ["Com ações concretas", "Com lista de queixas", "Com um culpado só", "Com mais reuniões"], correta: 0, porque: "Termina com poucas ações que dá para fazer.", conceito: "retro" },
      { pergunta: "Qual valor do Manifesto Ágil vem com a retrospectiva?", opcoes: ["Seguir o plano à risca", "Responder a mudanças", "Documentar tudo antes", "Fechar o contrato"], correta: 1, porque: "O Manifesto valoriza responder a mudanças mais que seguir um plano.", conceito: "retro" },
      { pergunta: "O foco da retrospectiva é:", opcoes: ["Achar o culpado", "Medir a velocidade", "Melhorar o processo", "Mostrar o produto"], correta: 2, porque: "Busca-se melhorar o jeito de trabalhar, sem culpar.", conceito: "retro" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como fazer uma retrospectiva útil?", conceito: "retro", modelo: "Pergunta-se o que deu certo, o que atrapalhou e o que mudar; termina com uma ou duas ações concretas, com responsável, para testar no próximo ciclo, com foco no processo e não em culpados." },
  ],
  recuperacao: [
    { p: "Que perguntas a retrospectiva faz?", regex: "(deu certo|funcion);;(atrapalh|nao deu|problema);;(mudar|melhor|proximo)", modelo: "O que deu certo, o que atrapalhou e o que mudar.", conceito: "retro" },
    { p: "Como deve ser uma ação de melhoria?", regex: "(concret|especific|pequen|responsavel|prazo)", modelo: "Concreta, pequena e com responsável.", conceito: "retro" },
    { p: "Por que não culpar pessoas por erros de segurança?", regex: "(esconde|escond|medo|processo|nao relat|expor|proteg)", modelo: "Porque as pessoas passam a esconder erros; o foco deve ser o processo.", conceito: "retro" },
  ],
});

// ---------- Aula 58: mini-projeto ----------
aulas.push({
  id: "0058", modulo: 7, n: 8, slug: "mini-projeto", titulo: "Mini-projeto: o backlog do gerenciador de tarefas",
  resumo: "Hora de juntar tudo: backlog, prioridade, MVP, ciclo e pronto, num gerenciador de tarefas pessoal. Depois, o mesmo método num problema novo: um evento.",
  semCodigo: true, minutos: 45,
  objetivos: ["Montar e ordenar um backlog com critérios.", "Definir o MVP e o primeiro ciclo.", "Aplicar o método a um problema novo."],
  conceitos: [],
  secoes: [
    { tipo: "aquecimento", titulo: "Planeje o planejamento", pergunta: "Você vai montar o plano de um gerenciador de tarefas pessoal. Em que ordem você usaria o que viu: backlog, valor e esforço, MVP, ciclo, definição de pronto?", minimo: 40, modelo: "Primeiro o **backlog** (tudo o que se quer), depois **valor e esforço** para ordenar, o **MVP** para cortar o essencial, o **ciclo** para planejar a primeira semana e a **definição de pronto** para saber quando terminou." },
    { tipo: "texto", titulo: "Um modelo de referência", blocos: ["Um exemplo menor, para um **leitor de livros** pessoal. Use como mapa, e não como resposta."],
      tabela: { cab: ["Ordem", "Item", "Valor", "Esforço", "No MVP?"], linhas: [["1", "Quero registrar um livro que li", "3", "1", "Sim"], ["2", "Quero ver a lista dos meus livros", "3", "1", "Sim"], ["3", "Quero dar uma nota ao livro", "2", "1", "Não, depois"], ["4", "Quero exportar a lista", "1", "3", "Não, fica de fora"]] },
      termos: [["Pronto neste exemplo", "o item funciona com dados certos e errados e tem teste que passa."]] },
    { tipo: "prever", titulo: "Exercício final (sem dica)", final: true, minutos: 15, texto: "Veja este backlog de um gerenciador de tarefas, com valor e esforço (1 a 3): **A** Anotar tarefa (valor 3, esforço 1), **B** Lembrete por e-mail (2, 3), **C** Marcar como feita (3, 1), **D** Cores do app (1, 1), **E** Compartilhar lista (2, 3), **F** Apagar tarefa (2, 1). Responda com letras ou números.", conceito: ["backlog", "priorizar", "mvp", "pronto"], itens: [
      { pergunta: "Quais itens têm valor 3? (duas letras, por exemplo AC, em ordem alfabética)", rotulo: "Valor 3", resposta: "AC", porque: "A e C têm valor 3." },
      { pergunta: "Quais itens têm esforço 3? (duas letras, em ordem alfabética)", rotulo: "Esforço 3", resposta: "BE", porque: "B e E têm esforço 3." },
      { pergunta: "Qual item entra primeiro? (uma letra; em empate, o que destrava o outro)", rotulo: "Primeiro", resposta: "A", porque: "A e C empatam em valor 3 e esforço 1, mas é preciso anotar uma tarefa antes de marcá-la como feita." },
      { pergunta: "Quantos itens você poria no MVP, se ele deve ter só os de valor 2 ou 3 com esforço 1? (um número)", rotulo: "MVP", resposta: "3", porque: "A, C e F têm esforço 1 e valor 2 ou 3." },
      { pergunta: "Qual item você deixaria de fora por enquanto? (uma letra: escolha um dos itens de valor 2 e esforço 3)", rotulo: "De fora", resposta: ["B", "E"], porque: "B e E têm valor 2 e esforço 3: caros para o que entregam." }] },
    { tipo: "aberta", titulo: "Problema novo: planejar um evento", transfer: true, minutos: 12, texto: "Outro contexto, o mesmo método. Você vai organizar uma **festa de aniversário para 20 pessoas** daqui a duas semanas, com orçamento limitado.", pergunta: "Monte um backlog com 6 itens, dê valor e esforço, escolha o que entra no “MVP” da festa (o essencial para ela acontecer), planeje o primeiro ciclo de uma semana e escreva 3 critérios de “pronto” para a semana.", minimo: 100, modelo: "Uma boa resposta tem 6 itens (local, convites, comida, bebida, música, decoração), notas coerentes, um MVP com o essencial (local, convites, comida), um ciclo de uma semana com poucos itens (convites e local) e critérios **verificáveis** (“lista de convidados confirmada por 15 pessoas”, “orçamento de comida somado e dentro do limite”)." },
    { tipo: "aberta", tag: "sec", titulo: "Lista de convidados", texto: "Para a festa, você cria uma planilha com nome, telefone e restrições alimentares (inclusive questões de saúde) de cada convidado e a compartilha num grupo aberto.", pergunta: "Que cuidado de privacidade faltou? O que seria apropriado?", modelo: "Dados de **saúde** (restrições alimentares podem revelar condições) e telefones foram **expostos a muita gente**. Compartilhe só o necessário com quem precisa (o buffet vê as restrições, sem nomes) e **peça a cada pessoa** o que ela aceita informar." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual é a ordem lógica do planejamento?", opcoes: ["Backlog, ordem, MVP, ciclo", "Ciclo, MVP, ordem, backlog", "MVP, ciclo, backlog, ordem", "Ordem, ciclo, MVP, backlog"], correta: 0, porque: "Lista tudo, ordena, corta o essencial e planeja o ciclo.", conceito: "backlog" },
      { pergunta: "O que o MVP contém?", opcoes: ["Tudo o que se imaginou", "O mínimo que já ajuda", "Só o que é bonito", "O que custa menos"], correta: 1, porque: "O essencial para resolver o problema principal.", conceito: "mvp" },
      { pergunta: "Para que serve a definição de pronto?", opcoes: ["Para cobrar a equipe", "Para evitar retrospectiva", "Para saber que terminou", "Para planejar o ciclo"], correta: 2, porque: "Diz o que precisa ser verdade para o item contar como terminado.", conceito: "pronto" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: descreva como você planejaria, do início ao fim, um produto novo com o que aprendeu neste módulo.", conceito: "backlog", modelo: "Lista todas as ideias num backlog, ordena por valor e esforço, corta o MVP, planeja um ciclo curto, escreve a definição de pronto com critérios verificáveis e faz uma retrospectiva para ajustar, sem esquecer segurança e privacidade." },
  ],
  recuperacao: [
    { p: "Que passos formam o planejamento ágil simples?", regex: "(backlog);;(mvp|minim);;(ciclo)", modelo: "Backlog, ordenar por valor e esforço, MVP e ciclo curto.", conceito: "backlog" },
    { p: "O que decide quem entra primeiro em caso de empate?", regex: "(destrava|depende|antes|base|precisa)", modelo: "O item que destrava os outros (do qual os outros dependem).", conceito: "priorizar" },
    { p: "Por que cuidar da privacidade até num plano de festa?", regex: "(saude|dados|exposi|compartilh|necessario|pessoas|permiss)", modelo: "Porque dados de saúde e telefones das pessoas não devem ser expostos além do necessário.", conceito: "pronto" },
  ],
});

export default aulas;
