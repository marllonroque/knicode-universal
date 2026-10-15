// Módulo 8: Do problema ao plano (universal). Fio condutor: o plano de um app de finanças pessoais, do problema aos critérios de aceite.
// Quase sem código: a aula 0063 liga critérios de aceite a testes (assert), como no Módulo 6.
export const meta = {
  final: "Mini-projeto: o plano do app de finanças pessoais",
  transfer: "Planejar um app de empréstimo de livros",
};
const aulas = [];
const FONTE_MANIFESTO = "Manifesto para o Desenvolvimento Ágil de Software, agilemanifesto.org/iso/ptbr/manifesto.html";

// ---------- Aula 59: problema ----------
aulas.push({
  id: "0059", modulo: 8, n: 1, slug: "problema-e-usuario", titulo: "Antes da solução, o problema",
  resumo: "Quase todo projeto ruim começa com uma solução (“vamos fazer um app!”) e nenhum problema. Hoje você aprende a descrever o problema e a pessoa que o tem.",
  semCodigo: true,
  objetivos: ["Escrever o problema sem citar a solução.", "Descrever quem tem o problema.", "Dizer como saberemos que o problema melhorou."],
  conceitos: [["problema", "Descrever o problema e o usuário"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Alguém diz: “Preciso de um app de finanças”. Isso é um problema ou uma solução? Que perguntas você faria antes de começar a construir?", modelo: "É uma **solução**. Antes, perguntaria: **quem** tem a dificuldade, **o que** acontece hoje, **por que** isso incomoda e **como saberemos** que melhorou." },
    { tipo: "texto", titulo: "Problema, pessoa e resultado", blocos: [
      "Um bom ponto de partida tem três partes: **quem** é a pessoa, **qual** é o problema (sem dizer como resolver) e **como mediremos** se melhorou.",
      "Exemplo: “**Ana, 28 anos, recebe salário e freelas e chega ao fim do mês sem saber para onde foi o dinheiro**. Hoje ela olha o extrato do banco. Queremos que ela saiba, em menos de 1 minuto, quanto gastou por categoria.”",
      "Repare que o problema **não cita aplicativo**. Pode ser que a melhor solução seja uma planilha. Quem se apaixona pela solução deixa de ouvir o problema." ],
      tabela: { cab: ["Parte", "Exemplo"], linhas: [["Quem", "Ana, 28 anos, com salário e freelas"], ["Problema", "Não sabe para onde foi o dinheiro no mês"], ["Resultado desejado", "Ver o gasto por categoria em menos de 1 minuto"]] },
      termos: [["Usuário", "a pessoa que vai usar o produto."], ["Problema", "a dificuldade que a pessoa tem hoje, sem falar da solução."], ["Resultado", "o que muda para a pessoa e como dá para medir."]] },
    { tipo: "prever", texto: "Use a tabela do exemplo. Responda com uma palavra ou número.", conceito: "problema", itens: [
      { pergunta: "“Fazer um app de finanças” descreve o problema? (sim ou não)", rotulo: "Item 1", resposta: ["não", "nao"], porque: "É uma solução; o problema é não saber para onde foi o dinheiro." },
      { pergunta: "Em quantos minutos Ana quer ver o gasto por categoria?", rotulo: "Item 2", resposta: "1", porque: "O resultado desejado diz “menos de 1 minuto”." },
      { pergunta: "O resultado é mensurável? (sim ou não)", rotulo: "Item 3", resposta: "sim", porque: "Tem um número (1 minuto): dá para medir." }] },
    { tipo: "descobrir", texto: "Duas formas de começar a mesma conversa.", tabela: { cab: ["Começo com solução", "Começo com problema"], linhas: [["Quero um app com gráficos", "Ana não sabe para onde vai o dinheiro"], ["Colocar login e cores", "Ver o gasto por categoria em 1 minuto"]] }, dicas: ["Qual coluna deixa espaço para encontrar a melhor solução?", "Qual delas permite saber se deu certo?"],
      pergunta: "O que o começo pelo problema permite que o começo pela solução não permite?", explicacao: "Permite **escolher a melhor solução** (app, planilha, aviso por mensagem) e **medir se funcionou**. Começando pela solução, só se mede se o app foi construído.", conceito: "problema" },
    { tipo: "aberta", titulo: "Descreva um problema real", texto: "Pense num incômodo do seu dia a dia que um programa poderia ajudar a resolver.", pergunta: "Escreva: quem tem o problema, qual é o problema (sem citar a solução) e como você saberia que melhorou (com um número).", minimo: 70, conceito: "problema", modelo: "Uma boa resposta nomeia a pessoa, descreve a dificuldade **sem citar app**, e traz um resultado mensurável (“sobra meia hora por semana”, “zero faltas esquecidas no mês”)." },
    { tipo: "aberta", tag: "sec", titulo: "Entrevistar usuários", texto: "Para entender o problema, você grava entrevistas com usuários e guarda os áudios numa pasta compartilhada, com nome, telefone e comentários sobre dívidas.", pergunta: "Que cuidados são necessários com esse material?", modelo: "Peça **consentimento** (dizendo para que será usado), guarde só o necessário, **limite o acesso**, **anonimize** (troque o nome por um código) e apague quando a pesquisa acabar. Dados sobre **dívidas** são sensíveis no sentido comum: podem causar constrangimento." },
    { tipo: "quiz", itens: [
      { pergunta: "O que descreve um problema?", opcoes: ["A solução que se quer", "A dificuldade de alguém", "O nome do projeto", "A tecnologia usada"], correta: 1, porque: "É a dificuldade real de uma pessoa, sem falar da solução.", conceito: "problema" },
      { pergunta: "Por que incluir um resultado mensurável?", opcoes: ["Para saber se deu certo", "Para cobrar a equipe", "Para escolher o nome", "Para fechar o prazo"], correta: 0, porque: "Sem número, ninguém sabe se melhorou.", conceito: "problema" },
      { pergunta: "O que é o usuário?", opcoes: ["O dono do sistema", "Quem programa tudo", "Quem vai usar o produto", "Quem paga as contas"], correta: 2, porque: "É a pessoa que usará o produto e tem o problema.", conceito: "problema" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: quais são as partes de um bom ponto de partida de projeto?", conceito: "problema", modelo: "Quem é a pessoa, qual é o problema (sem falar da solução) e qual é o resultado desejado, com algo mensurável. Assim dá para escolher a melhor solução e saber se funcionou." },
  ],
  recuperacao: [
    { p: "Quais são as três partes do ponto de partida de um projeto?", regex: "(quem|pessoa|usuario);;(problema);;(resultado|medir|mensur)", modelo: "A pessoa, o problema e o resultado desejado.", conceito: "problema" },
    { p: "Por que o problema não deve citar a solução?", regex: "(melhor solucao|outras|planilha|escolher|alternativ|espaco|deixa)", modelo: "Para poder escolher a melhor solução, que pode nem ser um app.", conceito: "problema" },
    { p: "Que cuidado ter ao gravar entrevistas com usuários?", regex: "(consentimento|anonim|acesso|necessario|apagar|autoriz)", modelo: "Pedir consentimento, guardar só o necessário, limitar o acesso e anonimizar.", conceito: "problema" },
  ],
});

// ---------- Aula 60: requisitos ----------
aulas.push({
  id: "0060", modulo: 8, n: 2, slug: "requisitos", titulo: "O que o sistema precisa: requisitos",
  resumo: "Requisito é uma necessidade escrita com clareza. Hoje você separa o que o sistema faz do como ele precisa se comportar.",
  semCodigo: true,
  objetivos: ["Distinguir requisito funcional de não funcional.", "Reescrever uma necessidade vaga como requisito claro.", "Classificar requisitos de um app de finanças."],
  conceitos: [["requisitos", "Requisitos funcionais e não funcionais"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Para o app de finanças, “registrar uma despesa” e “funcionar rápido e com segurança” são o mesmo tipo de necessidade? Em que são diferentes?", modelo: "**Não.** A primeira é uma **função** (o que o sistema faz). A segunda é uma **qualidade** (como ele precisa ser): velocidade, segurança, facilidade." },
    { tipo: "texto", titulo: "O que faz e como se comporta", blocos: [
      "**Requisito funcional**: algo que o sistema **faz** (registrar despesa, mostrar o total do mês).",
      "**Requisito não funcional**: uma **qualidade** exigida (abrir em menos de 2 segundos, guardar dados protegidos, funcionar no celular).",
      "Bons requisitos são **claros** e **verificáveis**. “O app tem que ser bom” não é requisito; “a lista abre em menos de 2 segundos com 500 despesas” é." ],
      tabela: { cab: ["Requisito", "Tipo"], linhas: [["Registrar uma despesa com valor e categoria", "Funcional"], ["Mostrar o total gasto por categoria", "Funcional"], ["Abrir a lista em menos de 2 segundos", "Não funcional (desempenho)"], ["Guardar os dados protegidos por senha", "Não funcional (segurança)"]] },
      termos: [["Requisito funcional", "o que o sistema faz."], ["Requisito não funcional", "uma qualidade que o sistema precisa ter."]] },
    { tipo: "prever", texto: "Responda “funcional” ou “não funcional”.", conceito: "requisitos", itens: [
      { pergunta: "“Calcular o saldo do mês”", rotulo: "Item 1", resposta: "funcional", porque: "É algo que o sistema faz." },
      { pergunta: "“Funcionar no celular”", rotulo: "Item 2", resposta: ["não funcional", "nao funcional"], porque: "É uma qualidade exigida (onde e como roda)." },
      { pergunta: "“Exportar as despesas para planilha”", rotulo: "Item 3", resposta: "funcional", porque: "É uma função do sistema." }] },
    { tipo: "descobrir", texto: "Veja como uma necessidade vaga vira requisito.", tabela: { cab: ["Vago", "Requisito claro"], linhas: [["Ser rápido", "Abrir a lista em menos de 2 segundos"], ["Ser seguro", "Exigir senha para abrir o app"], ["Ser simples", "Registrar despesa em no máximo 3 toques"]] }, dicas: ["O que os requisitos claros têm que os vagos não têm?", "Dá para testar cada um da coluna da direita?"],
      pergunta: "O que transforma “ser rápido” em um requisito de verdade?", explicacao: "Um **limite verificável** (2 segundos, 3 toques). Assim duas pessoas concordam sobre se o requisito foi cumprido.", conceito: "requisitos" },
    { tipo: "aberta", titulo: "Escreva requisitos", texto: "App de finanças pessoais.", pergunta: "Escreva 3 requisitos funcionais e 2 não funcionais **claros e verificáveis**, indicando o tipo de cada um.", minimo: 80, conceito: "requisitos", modelo: "Uma boa resposta traz funções concretas (registrar despesa, ver total por categoria, apagar despesa) e qualidades com número ou teste (abre em menos de 2 segundos; exige senha)." },
    { tipo: "aberta", tag: "sec", titulo: "O requisito esquecido", texto: "A lista de requisitos do app tem 15 funções, mas nenhum item sobre **quem pode ver os dados** nem **o que acontece se o celular for perdido**.", pergunta: "Que requisitos não funcionais deveriam existir? Por que não podem ficar de fora?", modelo: "Por exemplo: “exigir senha ou biometria para abrir”, “dados guardados de forma protegida” e “poder apagar a conta e os dados”. Se não estão **escritos**, ninguém constrói nem testa, e o risco só aparece depois do problema." },
    { tipo: "quiz", itens: [
      { pergunta: "O que é um requisito funcional?", opcoes: ["Algo que o sistema faz", "Uma cor da tela", "O nome do sistema", "O prazo da entrega"], correta: 0, porque: "É uma função: o que o sistema faz.", conceito: "requisitos" },
      { pergunta: "“Abrir em menos de 2 segundos” é:", opcoes: ["Funcional", "Não funcional", "Uma opinião", "Uma restrição"], correta: 1, porque: "É uma qualidade (desempenho) com limite verificável.", conceito: "requisitos" },
      { pergunta: "Qual é um requisito bem escrito?", opcoes: ["Ser bem bonito", "Ser muito rápido", "Abrir em até 2 s", "Agradar a todos"], correta: 2, porque: "Tem um limite que dá para verificar.", conceito: "requisitos" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: qual a diferença entre requisito funcional e não funcional?", conceito: "requisitos", modelo: "Funcional é o que o sistema faz (registrar despesa). Não funcional é uma qualidade exigida (rapidez, segurança, funcionar no celular). Ambos devem ser claros e verificáveis." },
  ],
  recuperacao: [
    { p: "O que é um requisito funcional?", regex: "(faz|funcao|acao|comportamento)", modelo: "Algo que o sistema faz.", conceito: "requisitos" },
    { p: "Dê um exemplo de requisito não funcional.", regex: "(rapid|segur|desempenho|celular|protegid|senha|segundos)", modelo: "Por exemplo, abrir em menos de 2 segundos ou exigir senha.", conceito: "requisitos" },
    { p: "Por que escrever requisitos de segurança e privacidade?", regex: "(escrit|ninguem|testa|constru|esquec|risco)", modelo: "Se não estiverem escritos, ninguém constrói nem testa, e o risco aparece depois.", conceito: "requisitos" },
  ],
});

// ---------- Aula 61: histórias de usuário ----------
aulas.push({
  id: "0061", modulo: 8, n: 3, slug: "historias-de-usuario", titulo: "Contar o que a pessoa quer: histórias de usuário",
  resumo: "“Como [pessoa], quero [fazer algo], para [ganhar algo]”. Uma frase que mantém o foco em quem usa.",
  semCodigo: true,
  objetivos: ["Escrever uma história de usuário completa.", "Reconhecer histórias grandes demais e dividi-las.", "Ligar cada história a um valor."],
  conceitos: [["historia", "Histórias de usuário"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Compare: “Criar tabela de despesas no banco de dados” e “Quero anotar o que gastei para saber onde vai meu dinheiro”. Qual deixa mais claro **por que** a funcionalidade existe?", modelo: "A segunda: mostra **quem** quer, **o que** e **por quê**. A primeira fala só da solução técnica e não diz para que serve." },
    { tipo: "texto", titulo: "Como..., quero..., para...", blocos: [
      "Uma **história de usuário** é uma frase curta com três partes: **Como** [tipo de pessoa], **quero** [fazer algo], **para** [ganhar algo].",
      "O **para quê** é o mais importante: ele mostra o valor. Se não houver valor, talvez a história nem precise existir.",
      "Uma boa história é **pequena** (cabe em poucos dias) e **independente**. Se for grande demais (“gerenciar todas as minhas finanças”), divide-se em histórias menores." ],
      tabela: { cab: ["História", "Pequena?"], linhas: [["Como Ana, quero registrar uma despesa, para saber onde gasto", "Sim"], ["Como Ana, quero ver o total por categoria, para cortar gastos", "Sim"], ["Como Ana, quero gerenciar todas as minhas finanças", "Não, é enorme"]] },
      termos: [["História de usuário", "uma frase: como [pessoa], quero [ação], para [valor]."], ["Dividir", "quebrar uma história grande em histórias menores."]], fonte: "Prática comum em métodos ágeis; ver princípios em " + FONTE_MANIFESTO },
    { tipo: "prever", texto: "Responda com uma palavra ou número.", conceito: "historia", itens: [
      { pergunta: "Quantas partes tem uma história de usuário?", rotulo: "Item 1", resposta: "3", porque: "Como, quero e para." },
      { pergunta: "Qual parte mostra o valor? (como, quero ou para)", rotulo: "Item 2", resposta: "para", porque: "O “para” explica o ganho da pessoa." },
      { pergunta: "“Gerenciar todas as minhas finanças” é pequena? (sim ou não)", rotulo: "Item 3", resposta: ["não", "nao"], porque: "É enorme: precisa ser dividida." }] },
    { tipo: "descobrir", texto: "Uma história grande foi dividida.", tabela: { cab: ["História grande", "Histórias menores"], linhas: [["Gerenciar todas as minhas finanças", "Registrar uma despesa"], ["", "Ver o total por categoria"], ["", "Definir um limite por categoria"]] }, dicas: ["Cada história menor entrega algo que já ajuda?", "Dá para fazer cada uma em poucos dias?"],
      pergunta: "O que cada história menor tem que a grande não tem?", explicacao: "Cada uma é **pequena**, entrega **valor sozinha** e dá para **testar**. A grande não cabe num ciclo e não dá para saber quando termina.", conceito: "historia" },
    { tipo: "aberta", titulo: "Escreva histórias", texto: "App de finanças pessoais.", pergunta: "Escreva 4 histórias de usuário no formato “Como..., quero..., para...”, todas pequenas, e diga qual faria primeiro.", minimo: 80, conceito: "historia", modelo: "Uma boa resposta tem 4 frases completas, cada uma com um **para quê** claro (registrar despesa, ver total, definir limite, apagar despesa), todas pequenas, e justifica o primeiro (a que destrava as outras: registrar despesa)." },
    { tipo: "aberta", tag: "sec", titulo: "A história do administrador", texto: "A história diz: “Como administrador, quero ver os dados financeiros de todos os usuários, para ajudar quando alguém tiver dúvida”.", pergunta: "Que preocupação de privacidade essa história levanta? Como reescrevê-la?", modelo: "Dá acesso a **dados sensíveis de todo mundo**, sem limite. Reescreva: “Como administrador, quero ver **apenas o estado da conta** (ativa, bloqueada), sem valores, e **só quando o usuário autorizar** o atendimento”, com registro de quem acessou." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual é o formato de uma história?", opcoes: ["Como, quero, para", "Quando, então, onde", "Quem, o quê, quanto", "Dado, faço, resulta"], correta: 0, porque: "Como [pessoa], quero [ação], para [valor].", conceito: "historia" },
      { pergunta: "O que o “para” da história mostra?", opcoes: ["O prazo previsto", "O valor para a pessoa", "A tecnologia usada", "O custo do projeto"], correta: 1, porque: "Mostra o ganho de quem usa.", conceito: "historia" },
      { pergunta: "Uma história grande demais deve:", opcoes: ["Ir para o fim", "Ficar como está", "Ser dividida", "Virar um requisito"], correta: 2, porque: "Divide-se em histórias pequenas que entregam valor.", conceito: "historia" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como escrever uma boa história de usuário?", conceito: "historia", modelo: "No formato “Como [pessoa], quero [ação], para [valor]”, pequena o bastante para caber num ciclo, e com um “para” que mostre o valor. Histórias grandes são divididas." },
  ],
  recuperacao: [
    { p: "Qual é o formato de uma história de usuário?", regex: "(como);;(quero);;(para)", modelo: "Como [pessoa], quero [ação], para [valor].", conceito: "historia" },
    { p: "O que fazer com uma história grande demais?", regex: "(divid|quebr|menores|separ|partes)", modelo: "Dividir em histórias menores.", conceito: "historia" },
    { p: "Por que dar acesso total a dados no perfil de administrador é problema?", regex: "(sensiv|todos|limite|acesso|privacid|autoriz|registro)", modelo: "Porque expõe dados sensíveis de todos; o acesso deve ser limitado, autorizado e registrado.", conceito: "historia" },
  ],
});

// ---------- Aula 62: critérios de aceite ----------
aulas.push({
  id: "0062", modulo: 8, n: 4, slug: "criterios-de-aceite", titulo: "Como saber que a história ficou pronta: critérios de aceite",
  resumo: "Cada história ganha exemplos concretos, em três passos (dado, quando, então), que dizem o que precisa funcionar.",
  semCodigo: true,
  objetivos: ["Escrever critérios de aceite no formato Dado, Quando, Então.", "Incluir casos de erro e de limite.", "Reconhecer critérios vagos."],
  conceitos: [["aceite", "Critérios de aceite"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Para a história “registrar uma despesa”, que situações concretas você testaria para ter certeza de que está pronta? Pense no caso normal e em pelo menos dois casos esquisitos.", modelo: "O caso **normal** (valor 25,00 e categoria Mercado), um valor **zero ou negativo**, um valor **sem categoria**, um texto no lugar do valor. Os casos esquisitos costumam esconder defeitos." },
    { tipo: "texto", titulo: "Dado, Quando, Então", blocos: [
      "Um **critério de aceite** é um exemplo concreto, em três passos: **Dado** [a situação inicial], **Quando** [a pessoa faz algo], **Então** [o que deve acontecer].",
      "Todo critério deve ser **verificável**: dá para dizer “passou” ou “falhou”. Boas histórias têm critérios para o caso normal **e** para os casos de erro e de limite.",
      "Os critérios de aceite viram **testes** (você já fez isso no Módulo 6)." ],
      tabela: { cab: ["Dado", "Quando", "Então"], linhas: [["Lista vazia", "Registro 25,00 em Mercado", "A lista mostra 1 despesa de 25,00"], ["Lista vazia", "Registro valor 0", "O app avisa “valor deve ser maior que zero” e não grava"], ["Lista vazia", "Registro sem categoria", "O app pede a categoria e não grava"]] },
      termos: [["Critério de aceite", "exemplo concreto, verificável, de como a história deve se comportar."], ["Caso de erro", "situação em que a pessoa faz algo inválido; o sistema deve reagir bem."]] },
    { tipo: "prever", texto: "Use a tabela de critérios. Responda com uma palavra ou número.", conceito: "aceite", itens: [
      { pergunta: "Quantos critérios há na tabela?", rotulo: "Item 1", resposta: "3", porque: "São 3 linhas." },
      { pergunta: "Quantos deles tratam de casos de erro?", rotulo: "Item 2", resposta: "2", porque: "O valor zero e a categoria faltando." },
      { pergunta: "O app grava a despesa de valor 0? (sim ou não)", rotulo: "Item 3", resposta: ["não", "nao"], porque: "O critério diz que ele avisa e não grava." }] },
    { tipo: "descobrir", texto: "Dois critérios para a mesma história.", tabela: { cab: ["Vago", "Verificável"], linhas: [["Deve funcionar bem", "Dado 2 despesas (10 e 15), Quando vejo o total, Então mostra 25"], ["Deve tratar erros", "Dado valor -5, Quando tento gravar, Então avisa e não grava"]] }, dicas: ["Com qual critério dois testadores chegariam à mesma resposta?", "O que a coluna da direita tem que a da esquerda não tem?"],
      pergunta: "O que torna um critério verificável?", explicacao: "Tem **valores concretos** e um **resultado observável** (“mostra 25”, “não grava”). Dá para dizer passou ou falhou, e dá para virar um teste.", conceito: "aceite" },
    { tipo: "aberta", titulo: "Escreva critérios", texto: "História: “Como Ana, quero ver o total por categoria, para cortar gastos”.", pergunta: "Escreva 4 critérios no formato Dado/Quando/Então, incluindo o caso normal, o de **nenhuma despesa** e o de **categoria com várias despesas**.", minimo: 90, conceito: "aceite", modelo: "Uma boa resposta tem critérios concretos: Dado 3 despesas de Mercado (10, 20, 30), Então total Mercado 60; Dado nenhuma despesa, Então mostra 0 ou “sem gastos”; e um caso de duas categorias separadas." },
    { tipo: "aberta", tag: "sec", titulo: "Critério de segurança", texto: "A história “entrar no app” tem só um critério: “Dado um usuário válido, Quando digita a senha certa, Então entra”.", pergunta: "Que critérios de erro e de segurança faltam?", modelo: "Faltam: **senha errada** não entra e não diz qual dado estava errado, **várias tentativas erradas** bloqueiam por um tempo, e a **senha nunca aparece** em tela ou registro. Critérios de segurança também são critérios de aceite." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual é a ordem do critério de aceite?", opcoes: ["Dado, quando, então", "Então, dado, quando", "Quando, dado, então", "Dado, então, quando"], correta: 0, porque: "Situação, ação e resultado esperado.", conceito: "aceite" },
      { pergunta: "O que faz um critério ser verificável?", opcoes: ["Ser longo e técnico", "Ter exemplo concreto", "Ser da equipe toda", "Ter prazo fixado"], correta: 1, porque: "Tem valores e resultado observável.", conceito: "aceite" },
      { pergunta: "Que casos um bom conjunto de critérios cobre?", opcoes: ["Só o caso comum", "Só os casos de erro", "Normal, erro e limite", "Só o primeiro caso"], correta: 2, porque: "Os casos esquisitos escondem os defeitos.", conceito: "aceite" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que é um critério de aceite e como escrever um bom?", conceito: "aceite", modelo: "É um exemplo concreto e verificável no formato Dado, Quando, Então, com valores reais e resultado observável, cobrindo o caso normal, os erros e os limites. Ele vira um teste." },
  ],
  recuperacao: [
    { p: "Qual é o formato de um critério de aceite?", regex: "(dado);;(quando);;(entao)", modelo: "Dado, Quando, Então.", conceito: "aceite" },
    { p: "Que casos um bom conjunto de critérios cobre?", regex: "(normal|comum);;(erro|invalid);;(limite|extremo|fronteira)", modelo: "O caso normal, os casos de erro e os de limite.", conceito: "aceite" },
    { p: "Que critério de segurança faltaria numa história de login?", regex: "(senha errada|bloque|tentativas|nunca aparece|nao aparece|registro)", modelo: "Senha errada não entra, várias tentativas bloqueiam e a senha nunca aparece.", conceito: "aceite" },
  ],
});

// ---------- Aula 63: aceite vira teste ----------
aulas.push({
  id: "0063", modulo: 8, n: 5, slug: "aceite-vira-teste", titulo: "Do critério ao teste: provando de verdade",
  resumo: "Um critério de aceite bem escrito vira um `assert`. Hoje você traduz o plano em código que se confere sozinho.",
  objetivos: ["Traduzir Dado, Quando, Então em um assert.", "Escrever a função que cumpre os critérios.", "Ver o teste como a prova do critério."],
  conceitos: [["aceite_teste", "Critério de aceite como teste"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O critério diz: “Dado 2 despesas (10 e 15), Quando vejo o total, Então mostra 25”. Como você escreveria isso como um teste em Python, usando o que viu no Módulo 6?", modelo: "Com uma função `total(despesas)` e um `assert total([10, 15]) == 25`. O **Dado** é a lista, o **Quando** é a chamada da função e o **Então** é o valor esperado." },
    { tipo: "exemplo", arquivo: "aceite.py", texto: "Clique em cada linha. Um critério virou um teste.",
      codigo: [["def total(despesas):", "A função que a história pede."], ["    return sum(despesas)", "Soma os valores."], ["assert total([10, 15]) == 25", "Dado 2 despesas (10 e 15), Quando calculo o total, Então 25."], ["assert total([]) == 0", "Dado nenhuma despesa, Então o total é 0."], ["print(\"critérios ok\")", "Só aparece se todos os testes passaram."]],
      termos: [["Teste de aceite", "um teste que prova um critério de aceite."]] },
    { tipo: "executar", texto: "Rode e depois troque o 25 por 26 para ver o teste falhar.", arquivo: "aceite.py (pode editar)", codigo: `def total(despesas):
    return sum(despesas)

assert total([10, 15]) == 25
assert total([]) == 0
print("critérios ok")`,
      prever: { enunciado: "Antes de testar:", conceito: "aceite_teste", itens: [{ codigo: `def total(d):
    return sum(d)
print(total([1, 2, 3]))`, resposta: "6", porque: "1 + 2 + 3." }, { codigo: `def total(d):
    return sum(d)
assert total([5]) == 6`, erro: "AssertionError", resposta: "AssertionError", pergunta: "Tipo do erro:", porque: "O total de [5] é 5, e não 6." }] } },
    { tipo: "descobrir", texto: "A função `por_categoria(despesas, cat)` soma só as despesas de uma categoria.", arquivo: "categoria.py", codigo: `def por_categoria(despesas, cat):
    t = 0
    for d in despesas:
        if d["cat"] == cat:
            t = t + d["valor"]
    return t
print(por_categoria(lista, "mercado"))`,
      execucoes: [{ prefixo: 'lista = [{"cat": "mercado", "valor": 10}, {"cat": "lazer", "valor": 5}, {"cat": "mercado", "valor": 20}]', saida: ["30"] }, { prefixo: 'lista = [{"cat": "lazer", "valor": 5}]', saida: ["0"] }, { prefixo: "lista = []", saida: ["0"] }], colunas: ["Lista", "Total de mercado"],
      pergunta: "Que critério de aceite cada linha representa (normal, categoria ausente, nenhuma despesa)?", dicas: ["A primeira linha é o caso comum, com várias despesas.", "As outras duas são casos esquisitos: o que têm de diferente?"],
      explicacao: "A primeira é o **caso normal** (soma só as de mercado: 30); a segunda é a **categoria sem despesas** (0) e a terceira é a **lista vazia** (0). Cada uma pode virar um `assert`.", conceito: "aceite_teste" },
    { tipo: "prever", conceito: "aceite_teste", itens: [
      { codigo: `def total(d):
    return sum(d)
assert total([10, 15]) == 25
print("ok")`, resposta: "ok", porque: "10 + 15 é 25: o teste passa." },
      { codigo: `def valido(v):
    return v > 0
print(valido(0))`, resposta: "False", porque: "Zero não é maior que zero: o critério “valor deve ser maior que zero” rejeita." },
      { codigo: `def valido(v):
    return v > 0
assert valido(25)
assert not valido(-5)
print("ok")`, resposta: "ok", porque: "25 vale e -5 não." }] },
    { tipo: "corrigir", texto: "O critério diz que um valor **zero ou negativo** deve ser recusado, mas o teste falha. Conserte **a função**.", arquivo: "com_defeito.py", dica: "O valor só vale se for **maior que zero**.", conceito: "aceite_teste",
      codigo: `def valido(valor):
    return valor >= 0

assert valido(25)
assert not valido(0)
assert not valido(-5)
print("critérios ok")`, esperado: ["critérios ok"],
      solucao: `def valido(valor):
    return valor > 0

assert valido(25)
assert not valido(0)
assert not valido(-5)
print("critérios ok")` },
    { tipo: "escrever", texto: "Critérios: Dado `[10, 15]`, o saldo de `receitas = 100` menos o total é 75; Dado nenhuma despesa, o saldo é igual às receitas. Escreva `saldo(receitas, despesas)` e dois asserts: `saldo(100, [10, 15]) == 75` e `saldo(100, []) == 100`. Mostre `critérios ok`.", arquivo: "meu_programa.py",
      inicial: `# escreva saldo(receitas, despesas) e os asserts
`, esperado: ["critérios ok"], testes: [["saldo(50, [20])", "30"], ["saldo(0, [])", "0"]], dica: "O saldo é `receitas - sum(despesas)`.", conceito: "aceite_teste",
      solucao: `def saldo(receitas, despesas):
    return receitas - sum(despesas)

assert saldo(100, [10, 15]) == 75
assert saldo(100, []) == 100
print("critérios ok")` },
    { tipo: "aberta", tag: "sec", titulo: "Testar com dados do usuário", texto: "Para testar o app, a equipe importa as **despesas reais** de alguns usuários (com nomes e categorias) para o computador de desenvolvimento.", pergunta: "Qual é o risco? O que usar nos testes de aceite?", modelo: "As despesas reais **revelam a vida das pessoas** e o computador de desenvolvimento tem menos proteção. Use **dados fictícios** que imitam o formato (como as listas dos exemplos desta aula)." },
    { tipo: "quiz", itens: [
      { pergunta: "O que o “Então” do critério vira no teste?", opcoes: ["O valor esperado", "A função testada", "A lista de entrada", "O nome do teste"], correta: 0, porque: "É a resposta esperada do `assert`.", conceito: "aceite_teste" },
      { pergunta: "O que o “Dado” do critério vira no teste?", opcoes: ["A resposta final", "Os dados de entrada", "A mensagem do erro", "O nome da função"], correta: 1, porque: "É a situação inicial, a entrada da função.", conceito: "aceite_teste" },
      { pergunta: "Por que um critério precisa virar teste?", opcoes: ["Para ficar bonito", "Para a IA usar", "Para provar que vale", "Para cobrar prazo"], correta: 2, porque: "O teste prova de verdade que o critério foi cumprido.", conceito: "aceite_teste" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como um critério de aceite vira um teste?", conceito: "aceite_teste", modelo: "O Dado vira a entrada, o Quando vira a chamada da função e o Então vira o valor esperado de um `assert`. Rodar o teste prova se o critério foi cumprido." },
  ],
  recuperacao: [
    { p: "O que o “Então” do critério vira no teste?", regex: "(esperad|resposta|resultado)", modelo: "O valor esperado do assert.", conceito: "aceite_teste" },
    { p: "O que o “Dado” do critério vira no teste?", regex: "(entrada|dados|situacao inicial|lista|argumento)", modelo: "Os dados de entrada.", conceito: "aceite_teste" },
    { p: "Que dados usar nos testes de aceite?", regex: "(fictici|inventad|ficticio|nao reais)", modelo: "Dados fictícios.", conceito: "aceite_teste" },
  ],
});

// ---------- Aula 64: escopo ----------
aulas.push({
  id: "0064", modulo: 8, n: 6, slug: "escopo", titulo: "O que fica de fora: escopo",
  resumo: "Dizer o que o projeto NÃO faz protege o prazo e a qualidade. Hoje você traça a fronteira do primeiro app.",
  semCodigo: true,
  objetivos: ["Definir escopo e fora do escopo.", "Reconhecer o aumento silencioso de escopo.", "Negociar mudanças sem perder o foco."],
  conceitos: [["escopo", "Escopo e fora do escopo"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "No meio do projeto, alguém pede “só mais uma coisinha” (um gráfico novo). Pedem de novo na semana seguinte. O que acontece com o prazo e a qualidade? Como se proteger disso sem ser rude?", modelo: "O prazo estoura e a qualidade cai: cada “coisinha” soma. A proteção é um **escopo escrito**: o que está dentro e o que está **fora**. Pedidos novos entram no **backlog**, para decidir com calma." },
    { tipo: "texto", titulo: "Dentro e fora", blocos: [
      "**Escopo** é a lista do que o projeto entrega. O **fora do escopo** é a lista do que ele **não** entrega **nesta versão**. Escrever o fora evita mal-entendidos.",
      "Quando surge um pedido novo, não se diz sim ou não na hora: ele vai para o **backlog**, recebe valor e esforço e é comparado com o que já está planejado. Se entrar, algo precisa sair ou o prazo muda.",
      "Isso conecta com o princípio ágil de **simplicidade, a arte de maximizar a quantidade de trabalho não realizado**." ],
      tabela: { cab: ["Dentro do escopo (versão 1)", "Fora do escopo (por ora)"], linhas: [["Registrar despesa", "Conectar com o banco"], ["Ver total por categoria", "Gráficos animados"], ["Definir limite por categoria", "Compartilhar com a família"]] },
      termos: [["Escopo", "o que o projeto entrega."], ["Fora do escopo", "o que se decidiu, por escrito, não entregar nesta versão."]], fonte: FONTE_MANIFESTO },
    { tipo: "prever", texto: "Use a tabela de escopo. Responda com uma palavra ou número.", conceito: "escopo", itens: [
      { pergunta: "Conectar com o banco está dentro? (sim ou não)", rotulo: "Item 1", resposta: ["não", "nao"], porque: "Está em “Fora do escopo”." },
      { pergunta: "Quantos itens estão dentro do escopo?", rotulo: "Item 2", resposta: "3", porque: "A primeira coluna tem 3 itens." },
      { pergunta: "Pediram “gráficos animados”. Onde ele vai? (backlog ou escopo)", rotulo: "Item 3", resposta: "backlog", porque: "Pedido novo vai para o backlog, para ser avaliado depois." }] },
    { tipo: "descobrir", texto: "Dois projetos, mesma equipe.", tabela: { cab: ["", "Projeto A", "Projeto B"], linhas: [["Fora do escopo escrito", "Não", "Sim"], ["Pedidos novos", "Entram na hora", "Vão para o backlog"], ["Entrega", "Atrasou 3 meses", "No prazo"]] }, dicas: ["O que o Projeto B faz com os pedidos novos?", "Por que a lista de fora ajuda a dizer não?"],
      pergunta: "O que explica a diferença de prazo entre os projetos?", explicacao: "O Projeto B **escreveu o que ficou de fora** e mandou os pedidos novos para o **backlog**, avaliando antes de aceitar. O A deixou o escopo crescer sem perceber.", conceito: "escopo" },
    { tipo: "aberta", titulo: "Trace a fronteira", texto: "App de finanças pessoais, versão 1.", pergunta: "Escreva 4 itens **dentro** do escopo e 4 **fora** (por ora), e diga o que você responderia a quem pede “um gráfico bonito” no meio do projeto.", minimo: 80, conceito: "escopo", modelo: "Uma boa resposta separa o essencial (registrar, ver totais, limites) do que espera (banco, gráficos, família, exportação) e responde: “Boa ideia, vai para o **backlog** e a gente compara com o resto na próxima priorização”." },
    { tipo: "aberta", tag: "sec", titulo: "O escopo que cresce sozinho", texto: "Para “facilitar”, alguém acrescenta ao app o pedido de **localização em tempo real** e **acesso aos contatos**, sem que ninguém decida isso.", pergunta: "Por que esse tipo de aumento de escopo é arriscado? O que deveria acontecer?", modelo: "Cada dado novo (localização, contatos) é **mais risco e mais responsabilidade**, e o app passa a pedir permissões que não precisa. Todo item novo deve passar pelo backlog, e **dados novos pedem justificativa** (por que preciso e por quanto tempo guardo)." },
    { tipo: "quiz", itens: [
      { pergunta: "O que é o “fora do escopo”?", opcoes: ["O que não se entrega agora", "Um erro de projeto", "O que a equipe esqueceu", "O que o cliente recusou"], correta: 0, porque: "É o que se decidiu, por escrito, não entregar nesta versão.", conceito: "escopo" },
      { pergunta: "Chegou um pedido novo. O que fazer?", opcoes: ["Aceitar na hora", "Avaliar no backlog", "Recusar sem ouvir", "Esconder da equipe"], correta: 1, porque: "Vai para o backlog, com valor e esforço.", conceito: "escopo" },
      { pergunta: "Se um item entra no ciclo cheio:", opcoes: ["O ciclo se estica", "A equipe faz hora extra", "Algo sai ou o prazo muda", "Nada precisa mudar"], correta: 2, porque: "O tempo é fixo: entra um item, sai outro.", conceito: "escopo" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: por que escrever o que fica fora do escopo e o que fazer com pedidos novos?", conceito: "escopo", modelo: "Para evitar mal-entendidos e o crescimento silencioso do projeto. Pedidos novos vão para o backlog, recebem valor e esforço, e só entram se algo sair ou o prazo mudar." },
  ],
  recuperacao: [
    { p: "O que é o fora do escopo?", regex: "(nao);;(entreg|faz|incluid|nesta versao)", modelo: "O que se decidiu não entregar nesta versão.", conceito: "escopo" },
    { p: "O que fazer com um pedido novo no meio do projeto?", regex: "(backlog|avali|prioriz|comparar)", modelo: "Mandar para o backlog e avaliar com valor e esforço.", conceito: "escopo" },
    { p: "Por que dados novos pedem justificativa?", regex: "(risco|responsabil|necessari|permiss|minimiz|justific|finalidade)", modelo: "Porque cada dado novo aumenta o risco; só se coleta o que é necessário e justificado.", conceito: "escopo" },
  ],
});

// ---------- Aula 65: riscos e dados ----------
aulas.push({
  id: "0065", modulo: 8, n: 7, slug: "riscos-e-dados", titulo: "O que pode dar errado e que dados guardar",
  resumo: "Um plano bom lista os riscos antes que eles aconteçam e justifica cada dado pessoal que o app coleta.",
  semCodigo: true,
  objetivos: ["Listar riscos com probabilidade e impacto.", "Justificar cada dado coletado.", "Decidir o que NÃO coletar."],
  conceitos: [["riscos_dados", "Riscos e minimização de dados"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Para o app de finanças, o que poderia dar errado? Pense em pelo menos três coisas (técnicas, de pessoas, de dados). Quais você resolveria antes de construir?", modelo: "Exemplos: **perda de dados**, **vazamento**, **cálculo errado**, **ninguém usar**, **prazo estourar**. Resolve-se antes o que é **provável e grave**, em especial vazamento e cálculo errado, que afetam o dinheiro das pessoas." },
    { tipo: "texto", titulo: "Risco e dados necessários", blocos: [
      "Um **risco** é algo que pode dar errado. Para cada um, estime **probabilidade** (baixa, média, alta) e **impacto** (baixo, médio, alto) e decida uma **resposta**: evitar, reduzir ou aceitar.",
      "A **minimização de dados** é um princípio da LGPD (Lei Geral de Proteção de Dados, Lei 13.709/2018): colete só o que for **necessário** para a finalidade. Para cada dado, responda: **para quê**, **quem vê** e **por quanto tempo**.",
      "Menos dados significa menos risco: o que você não coleta, ninguém pode vazar." ],
      tabela: { cab: ["Risco", "Probabilidade", "Impacto", "Resposta"], linhas: [["Vazamento dos dados", "Média", "Alto", "Reduzir: proteger e coletar menos"], ["Cálculo do total errado", "Baixa", "Alto", "Reduzir: testes de aceite"], ["Ninguém usar o app", "Média", "Médio", "Reduzir: MVP e ouvir usuários"]] },
      termos: [["Risco", "algo que pode dar errado, com probabilidade e impacto."], ["Minimização", "coletar só os dados necessários para a finalidade."]], fonte: "Lei Geral de Proteção de Dados Pessoais (Lei 13.709/2018), princípios da finalidade e da necessidade" },
    { tipo: "prever", texto: "Use a tabela de riscos. Responda com uma palavra ou número.", conceito: "riscos_dados", itens: [
      { pergunta: "Qual risco tem probabilidade média e impacto alto?", rotulo: "Item 1", resposta: ["vazamento dos dados", "vazamento", "vazamento de dados"], porque: "O vazamento tem probabilidade média e impacto alto." },
      { pergunta: "Quantos riscos têm impacto alto?", rotulo: "Item 2", resposta: "2", porque: "Vazamento e cálculo errado." },
      { pergunta: "Coletar menos dados reduz o risco de vazamento? (sim ou não)", rotulo: "Item 3", resposta: "sim", porque: "O que não existe não pode vazar." }] },
    { tipo: "descobrir", texto: "Dados que o app poderia coletar.", tabela: { cab: ["Dado", "Para quê?", "Coletar?"], linhas: [["E-mail", "Entrar e recuperar a conta", "Sim"], ["Nome do apelido", "Mostrar “Olá, Ana”", "Sim"], ["CPF", "Nenhuma função usa", "Não"], ["Localização", "Nenhuma função usa", "Não"]] }, dicas: ["Os dois “Não” têm um motivo em comum.", "O que acontece se um dado inútil vazar?"],
      pergunta: "Qual regra separa os dados coletados dos não coletados?", explicacao: "Só se coleta o que tem **finalidade clara**: uma função que precise dele. CPF e localização não servem a nenhuma função, então **não se coletam**.", conceito: "riscos_dados" },
    { tipo: "aberta", titulo: "Mapeie os riscos e dados", texto: "App de finanças pessoais.", pergunta: "Liste 3 riscos (com probabilidade, impacto e resposta) e 4 dados que o app coletaria, dizendo **para quê** e **por quanto tempo** guardaria cada um. Cite um dado que você **não** coletaria.", minimo: 100, conceito: "riscos_dados", modelo: "Uma boa resposta traz riscos com resposta (vazamento: proteger e coletar menos), dados com finalidade (e-mail para entrar; apelido para exibir; valores e categorias para o total) e prazos (enquanto a conta existir), e recusa dados sem função (CPF, localização)." },
    { tipo: "aberta", tag: "sec", titulo: "Guardar para sempre", texto: "A equipe decide guardar **todas as despesas de todos os usuários para sempre**, “caso um dia seja útil”, mesmo depois que a pessoa apaga a conta.", pergunta: "Que princípios de proteção de dados isso viola? O que seria correto?", modelo: "Viola a **necessidade** (guardar além do preciso) e a **finalidade** (“caso um dia seja útil” não é finalidade), e ignora o **direito de eliminação**. O correto: definir prazo, apagar quando a conta for removida e informar a pessoa." },
    { tipo: "quiz", itens: [
      { pergunta: "O que é minimização de dados?", opcoes: ["Coletar só o necessário", "Guardar tudo possível", "Apagar todos os dados", "Cifrar todos os dados"], correta: 0, porque: "Só se coleta o que a finalidade exige.", conceito: "riscos_dados" },
      { pergunta: "Um risco tem duas notas:", opcoes: ["Custo e prazo", "Chance e impacto", "Valor e esforço", "Dado e finalidade"], correta: 1, porque: "Probabilidade de acontecer e impacto se acontecer.", conceito: "riscos_dados" },
      { pergunta: "Para cada dado coletado, pergunta-se:", opcoes: ["Quanto valem no site", "Quem criou o formato", "Para quê, quem vê, prazo", "Em que tela aparece"], correta: 2, porque: "Finalidade, acesso e prazo de guarda.", conceito: "riscos_dados" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como tratar riscos e dados num plano?", conceito: "riscos_dados", modelo: "Listando riscos com probabilidade, impacto e resposta, e coletando só os dados necessários, com finalidade, acesso e prazo definidos para cada um. O que não se coleta não pode vazar." },
  ],
  recuperacao: [
    { p: "Que duas notas descrevem um risco?", regex: "(probabilidade|chance);;(impacto|gravidade)", modelo: "Probabilidade e impacto.", conceito: "riscos_dados" },
    { p: "O que é minimização de dados?", regex: "(so|apenas|somente);;(necessario|preciso|finalidade)", modelo: "Coletar só o que é necessário para a finalidade.", conceito: "riscos_dados" },
    { p: "Por que “caso um dia seja útil” não justifica guardar dados?", regex: "(finalidade|necessidade|eliminac|prazo|apagar|excess)", modelo: "Porque não é uma finalidade clara; guardar além do necessário viola a LGPD.", conceito: "riscos_dados" },
  ],
});

// ---------- Aula 66: mini-projeto ----------
aulas.push({
  id: "0066", modulo: 8, n: 8, slug: "mini-projeto", titulo: "Mini-projeto: o plano do app de finanças pessoais",
  resumo: "Hora de juntar tudo num plano pronto para ser construído: problema, histórias, critérios, escopo, riscos e dados. Depois, o mesmo método num app de empréstimo de livros.",
  semCodigo: true, minutos: 45,
  objetivos: ["Montar um plano completo, do problema aos critérios.", "Resolver o exercício final sem dica.", "Aplicar o método a um problema novo."],
  conceitos: [],
  secoes: [
    { tipo: "aquecimento", titulo: "Planeje o plano", pergunta: "Liste, em ordem, as peças de um plano pronto para construir (problema, requisitos, histórias, critérios, escopo, riscos). O que cada uma responde?", minimo: 40, modelo: "**Problema**: quem e o quê. **Requisitos**: o que faz e como se comporta. **Histórias**: o que a pessoa quer e por quê. **Critérios**: como provar. **Escopo**: o que entra e o que fica fora. **Riscos e dados**: o que pode dar errado e o que se coleta." },
    { tipo: "texto", titulo: "Um modelo de referência", blocos: ["Um plano pequeno, para um **controle de mesada** de uma criança. Use como mapa, e não como resposta."],
      tabela: { cab: ["Peça", "Exemplo"], linhas: [["Problema", "Beto, 12 anos, gasta a mesada na primeira semana"], ["História", "Como Beto, quero anotar o que gastei, para a mesada durar o mês"], ["Critério", "Dado mesada 100 e gasto 30, Então o saldo mostra 70"], ["Fora do escopo", "Conectar com banco"], ["Risco", "Perder os dados: guardar uma cópia"], ["Dado", "Apenas apelido e valores, sem nome completo"]] },
      termos: [["Plano pronto", "um conjunto que permite começar a construir sem adivinhar."]] },
    { tipo: "prever", titulo: "Exercício final (sem dica)", final: true, minutos: 15, texto: "Plano do app de finanças. Classifique cada item nas categorias: **P** (problema), **R** (requisito não funcional), **H** (história), **C** (critério de aceite) ou **E** (fora do escopo). Responda com a letra.", conceito: ["problema", "requisitos", "historia", "aceite", "escopo"], itens: [
      { pergunta: "“Ana não sabe para onde foi o dinheiro no mês”", rotulo: "Item 1", resposta: ["P", "p"], porque: "Descreve a dificuldade de uma pessoa, sem solução." },
      { pergunta: "“Abrir a lista em menos de 2 segundos”", rotulo: "Item 2", resposta: ["R", "r"], porque: "É uma qualidade verificável do sistema." },
      { pergunta: "“Como Ana, quero ver o total por categoria, para cortar gastos”", rotulo: "Item 3", resposta: ["H", "h"], porque: "Segue o formato como, quero, para." },
      { pergunta: "“Dado 2 despesas (10 e 15), Quando vejo o total, Então mostra 25”", rotulo: "Item 4", resposta: ["C", "c"], porque: "É um critério no formato Dado, Quando, Então." },
      { pergunta: "“Conectar com o banco, por ora não”", rotulo: "Item 5", resposta: ["E", "e"], porque: "Decidiu-se, por escrito, não entregar nesta versão." }] },
    { tipo: "aberta", titulo: "Problema novo: empréstimo de livros", transfer: true, minutos: 12, texto: "Outro contexto, o mesmo método. Uma pequena biblioteca comunitária quer um app para **emprestar livros** aos vizinhos, com controle de quem pegou o quê e quando devolver.", pergunta: "Escreva o plano: o problema (quem, o quê, resultado mensurável), 3 histórias, 2 critérios de aceite (um normal, um de erro), 3 itens fora do escopo, 2 riscos e os dados que coletaria (com finalidade e prazo).", minimo: 150, modelo: "Uma boa resposta traz: problema com número (“reduzir livros não devolvidos a menos de 5%”); histórias com “para” claro (emprestar, ver quem está com um livro, lembrar a devolução); critérios Dado/Quando/Então (um com livro disponível e um com livro já emprestado, que não pode ser emprestado de novo); fora do escopo (multas, pagamentos, leitor digital); riscos (perder o registro, vazamento da lista de leituras) e dados mínimos (apelido e contato, com prazo definido)." },
    { tipo: "aberta", tag: "sec", titulo: "O que se lê diz quem se é", texto: "No app de livros, o histórico de empréstimos de cada vizinho (incluindo temas sensíveis, como saúde ou religião) fica visível para **todos** os usuários.", pergunta: "Qual é o problema? Como o plano deveria tratar isso?", modelo: "O que alguém lê pode revelar **saúde, crenças e opiniões**. O histórico deve ser visível **só para o próprio usuário e para quem administra o empréstimo**, com o mínimo de detalhe, e ser **apagado** após a devolução, depois de um prazo curto." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual é a ordem lógica do plano?", opcoes: ["Problema, histórias, critérios", "Critérios, histórias, problema", "Histórias, critérios, problema", "Critérios, problema, histórias"], correta: 0, porque: "Do porquê, passando pelo quê, até a prova.", conceito: "problema" },
      { pergunta: "Qual peça diz como provar que ficou pronto?", opcoes: ["Só o problema dado", "Os critérios feitos", "O fora do escopo", "Os riscos listados"], correta: 1, porque: "Os critérios de aceite viram testes.", conceito: "aceite" },
      { pergunta: "O que reduz o risco de vazamento?", opcoes: ["Usar mais dados", "Guardar para sempre", "Coletar menos dados", "Mostrar a todos"], correta: 2, porque: "O que não existe não vaza.", conceito: "riscos_dados" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: descreva como você levaria uma ideia do problema a um plano pronto para construir.", conceito: "problema", modelo: "Descreve o problema (quem, o quê, resultado mensurável), levanta requisitos e histórias (como, quero, para), escreve critérios de aceite verificáveis, define o escopo e o que fica fora, lista os riscos e justifica cada dado coletado." },
  ],
  recuperacao: [
    { p: "Que peças formam um plano pronto para construir?", regex: "(problema);;(historia);;(criterio|aceite)", modelo: "Problema, histórias e critérios de aceite, além de escopo e riscos.", conceito: "problema" },
    { p: "Que peça vira testes?", regex: "(criterio|aceite)", modelo: "Os critérios de aceite.", conceito: "aceite" },
    { p: "Por que o histórico de leituras de alguém merece proteção?", regex: "(revela|saude|crenca|religia|opini|sensiv|privacid|exposic)", modelo: "Porque pode revelar saúde, crenças e opiniões; deve ter acesso restrito.", conceito: "riscos_dados" },
  ],
});

export default aulas;
