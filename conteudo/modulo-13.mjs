// Módulo 13: Claude Artifacts (universal). Fio condutor: uma calculadora/conversor pequeno que o Claude gera e que o aluno aprende a pedir, ler, testar e compartilhar com cuidado.
// O uso do Claude acontece fora da página: cada aula traz um roteiro do que fazer lá + exercícios aqui (previsões, perguntas e Python).
// Fatos sobre a ferramenta: somente o que está [CONFIRMADO] em conteudo/fontes/FATOS-chat-artifacts-projects-prompts.md (verificado em 2026-10-16).
export const meta = {
  final: "Mini-projeto: calculadora de parcelas (juros simples) com tabela e validação",
  transfer: "Conversor de moeda que recebe texto digitado e trata entradas inválidas",
};
const aulas = [];
const FONTE_ART = "Anthropic, artigo de ajuda “What are artifacts and how do I use them” (support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them). Ferramentas mudam: reconfira na documentação oficial.";
const FONTE_SHARE = "Anthropic, artigo de ajuda “Share artifacts” (support.claude.com/en/articles/9547008-share-artifacts). As opções variam por plano e mudam: reconfira na documentação oficial.";

// Código de referência usado em várias aulas (equivalente em Python do que o artifact faz em JavaScript).
const CONVERTER = `def converter(valor, taxa):
    return round(valor / taxa, 2)
`;
const FRETE = `def frete(peso):
    if peso <= 0:
        raise ValueError("peso inválido")
    if peso <= 1:
        return 10.0
    if peso <= 5:
        return 18.0
    return 30.0
`;
const LER_VALOR = `def ler_valor(texto):
    try:
        v = float(texto.replace(",", "."))
    except ValueError:
        return None
    if v < 0:
        return None
    return v
`;

// ---------- Aula 97: o que são artifacts ----------
aulas.push({
  id: "0097", modulo: 13, n: 1, slug: "o-que-sao-artifacts", titulo: "O que é um artifact: algo que abre ao lado da conversa",
  resumo: "Às vezes o Claude responde com um texto; outras vezes cria uma coisa pronta para usar, que abre ao lado do chat. Hoje você aprende a diferença e o que a documentação oficial confirma.",
  semCodigo: true,
  objetivos: ["Explicar o que é um artifact com suas palavras.", "Dizer quando um pedido tende a virar artifact e quando não.", "Separar o que a documentação confirma do que é só costume antigo."],
  conceitos: [["ar_o_que", "O que é um artifact"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você pede ao Claude “um conversor de reais para dólares”. De um lado, ele escreve a conta em um parágrafo. Do outro, entrega uma pequena ferramenta que você abre e usa várias vezes. Qual a diferença prática entre as duas respostas?", modelo: "No parágrafo você **lê** a conta; na ferramenta você **usa**: digita valores novos e vê o resultado, sem pedir de novo. A segunda é um conteúdo que dá para **reutilizar**." },
    { tipo: "texto", titulo: "O que a documentação confirma", blocos: [
      "Segundo a documentação oficial, um **artifact** é um conteúdo **autocontido** que o Claude cria e abre **ao lado da conversa**: pode ser um documento, um design, uma apresentação, um painel ou uma pequena ferramenta interativa.",
      "Em geral isso acontece quando o conteúdo é **substancial** (o artigo cita, como referência, mais de 15 linhas), **autocontido** (faz sentido sozinho) e **reutilizável**. Uma resposta de duas linhas continua sendo só texto na conversa.",
      "A documentação atual cita modelos como **Docs**, **Slides**, **Design**, **Dashboards** (beta) e **Motion** (beta). Além deles, aparecem trechos de código, diagramas, sites de página única e imagens. **Não use a lista antiga** (código, HTML, SVG, React) como se fosse a lista oficial de hoje, porque a documentação atual não a usa.",
      "Artifacts **começam privados**. O compartilhamento é uma escolha sua, feita depois (aula 7).",
      "Execução de código na nuvem e criação de arquivos precisam estar ativadas nas configurações (a documentação cita Settings > Capabilities). Se algo não aparecer, comece conferindo isso. Menus mudam: confira na documentação oficial." ],
      tabela: { cab: ["Tipo citado", "Para que serve neste curso"], linhas: [["Docs", "texto longo para ler e editar (relatório, roteiro)"], ["Slides", "apresentação (a documentação cita exportar para PowerPoint ou PDF)"], ["Design", "peças visuais e protótipos"], ["Dashboards (beta)", "painéis com números"], ["Pequena ferramenta interativa", "o que vamos construir: conversor e calculadora"]] },
      termos: [["Artifact", "conteúdo pronto que o Claude cria e abre ao lado da conversa."], ["Autocontido", "que funciona sozinho, sem depender do resto do chat."], ["Beta", "versão em teste, que pode mudar ou ter limites."]],
      fonte: FONTE_ART },
    { tipo: "prever", texto: "Responda com uma palavra (sim, não) ou a palavra pedida.", conceito: "ar_o_que", itens: [
      { pergunta: "Você pergunta “quanto é 10% de 50?”. Em geral isso vira um artifact? (sim ou não)", rotulo: "Item 1", resposta: ["não", "nao"], porque: "É uma resposta curta. Artifacts costumam ser conteúdos substanciais, autocontidos e reutilizáveis." },
      { pergunta: "Uma calculadora de parcelas que você vai abrir toda semana faz sentido como artifact? (sim ou não)", rotulo: "Item 2", resposta: "sim", porque: "É uma ferramenta autocontida e reutilizável: o caso típico." },
      { pergunta: "Um artifact recém-criado começa privado ou público?", rotulo: "Item 3", resposta: ["privado", "privados"], porque: "A documentação diz que artifacts começam privados; você decide depois se compartilha." }] },
    { tipo: "descobrir", texto: "Quatro pedidos e o que eles tendem a gerar.", tabela: { cab: ["Pedido", "Tamanho", "Vai ser reaproveitado?", "Tende a virar artifact?"], linhas: [["“Quanto é 15% de 80?”", "1 linha", "não", "não"], ["“Monte uma calculadora de frete”", "dezenas de linhas", "sim", "sim"], ["“Escreva o roteiro de um vídeo de 5 minutos”", "longo", "sim, em edições", "sim (um documento)"], ["“Qual a capital da França?”", "1 linha", "não", "não"]] }, dicas: ["Compare as colunas “Tamanho” e “Vai ser reaproveitado?” das linhas com resposta “sim”.", "O que as respostas “não” têm em comum?"],
      pergunta: "Que características fazem um pedido tender a virar artifact?", explicacao: "Conteúdo **grande o bastante** para valer uma janela própria, que **funciona sozinho** e que você vai **reutilizar ou editar**. Perguntas curtas e pontuais ficam como texto no chat.", conceito: "ar_o_que" },
    { tipo: "aberta", titulo: "Roteiro: veja um artifact nascer", texto: "No Claude (fora desta página), abra uma conversa nova e peça: “Crie uma calculadora simples de gorjeta: eu digito o valor da conta e a porcentagem, e ela mostra a gorjeta e o total.” Observe o que aparece ao lado da conversa. Se nada abrir como artifact, não é falha sua: tente pedir de novo com “crie como um artifact” e confira na documentação oficial o que pode estar desligado.", pergunta: "Descreva o que apareceu: o que você via ao lado da conversa, e o que dava para fazer ali que um texto no chat não permitiria?", minimo: 60, conceito: "ar_o_que", modelo: "Uma boa resposta diz que **abriu uma área ao lado do chat** com a ferramenta pronta e que dava para **digitar valores novos e ver o resultado**, sem pedir a conta outra vez. Se nada apareceu, registre o que o Claude respondeu e o que você conferiu." },
    { tipo: "aberta", tag: "sec", titulo: "Antes de pedir, pense no que vai escrever", texto: "Você quer uma planilha de gastos e pensa em colar no pedido o extrato real do seu banco, com o número da conta e os nomes de quem recebeu os pagamentos.", pergunta: "Que dados do extrato você trocaria por dados fictícios antes de pedir? Por quê?", modelo: "Troque **número da conta, nomes de pessoas, documentos e valores reais**. A documentação oficial recomenda cautela com dados financeiros e sensíveis. Para criar a ferramenta, **dados inventados** com o mesmo formato bastam." },
    { tipo: "quiz", itens: [
      { pergunta: "O que é um artifact?", opcoes: ["Conteúdo que abre ao lado do chat", "Uma mensagem apagada do chat", "Um anexo enviado por e-mail", "Um erro mostrado pelo Claude"], correta: 0, porque: "É um conteúdo autocontido criado pelo Claude e aberto ao lado da conversa.", conceito: "ar_o_que" },
      { pergunta: "Os artifacts começam como:", opcoes: ["Públicos para qualquer pessoa", "Enviados para a sua equipe", "Privados, só para você", "Abertos a todos os usuários"], correta: 2, porque: "Começam privados; o compartilhamento é uma escolha posterior.", conceito: "ar_o_que" },
      { pergunta: "A lista de tipos de artifact:", opcoes: ["Nunca muda, é sempre a mesma", "Muda: confira na documentação", "Só tem código, HTML e SVG", "É igual em todos os planos"], correta: 1, porque: "Os tipos e as regras por plano mudam; por isso se reconfere na documentação oficial.", conceito: "ar_o_que" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que é um artifact e que tipo de pedido tende a gerar um?", conceito: "ar_o_que", modelo: "É um conteúdo autocontido (documento, design, apresentação, painel ou pequena ferramenta) que o Claude cria e abre **ao lado da conversa**. Tende a surgir quando o conteúdo é **substancial, autocontido e reutilizável**. Começa **privado**, e a lista de tipos muda: confira na documentação oficial." },
  ],
  recuperacao: [
    { p: "O que é um artifact?", regex: "(conteudo|ferramenta|documento|pagina);;(ao lado|chat|conversa|autoconti|reutiliz)", modelo: "Conteúdo autocontido que o Claude cria e abre ao lado da conversa, como um documento ou uma pequena ferramenta.", conceito: "ar_o_que" },
    { p: "Um artifact novo começa privado ou público?", regex: "(privad)", modelo: "Começa privado.", conceito: "ar_o_que" },
    { p: "Por que se diz “confira na documentação oficial” sobre os tipos de artifact?", regex: "(muda|mudam|atualiz|reorganiz|reconfer|confira|novo|mudou)", modelo: "Porque a lista de tipos e as regras mudam; é preciso reconferir na documentação oficial.", conceito: "ar_o_que" },
  ],
});

// ---------- Aula 98: como pedir ----------
aulas.push({
  id: "0098", modulo: 13, n: 2, slug: "como-pedir", titulo: "Como pedir: a especificação do que a ferramenta deve fazer",
  resumo: "Um pedido vago faz o Claude adivinhar. Um pedido com especificação (entradas, saída, regras) quase sempre acerta de primeira.",
  semCodigo: true,
  objetivos: ["Escrever um pedido com entradas, saída, regras e um exemplo.", "Reconhecer o que falta num pedido vago.", "Usar um exemplo numérico para o Claude e você terem o mesmo alvo."],
  conceitos: [["ar_pedir", "Pedir com especificação"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você diz a um colega: “faz uma calculadora aí”. Que perguntas ele provavelmente vai fazer de volta antes de começar?", modelo: "Calculadora **de quê**? O que a pessoa **digita**? O que aparece como **resposta**? E se digitarem algo estranho? Um pedido bom já responde a essas perguntas." },
    { tipo: "texto", titulo: "As seis partes de um bom pedido", blocos: [
      "A documentação oficial de dicas do Claude pede o básico: falar naturalmente, **ser específico** e **refinar** com perguntas de acompanhamento. Na prática, especificar uma ferramenta é responder a seis perguntas.",
      "A mais poderosa é a do **exemplo com números**: “100 reais com taxa 5 dão 20 dólares”. Com ele, você tem um caso para **conferir** o resultado depois (aula 5).",
      "Conte também **o que fazer com erro** (ex.: “se a taxa for zero, avise e não calcule”) e o **idioma e o formato** da tela. Não coloque senhas, chaves nem dados reais no pedido." ],
      tabela: { cab: ["Parte", "Pergunta que responde", "Exemplo (conversor)"], linhas: [["Objetivo", "Para que serve?", "converter reais em dólares"], ["Entradas", "O que a pessoa digita?", "valor em reais e taxa (reais por dólar)"], ["Saída", "O que aparece?", "valor em dólares com 2 casas decimais"], ["Regras", "Como se calcula?", "dólares = reais dividido pela taxa"], ["Erros", "E se digitarem errado?", "taxa zero ou texto: mostrar aviso, sem calcular"], ["Exemplo", "Qual caso confere?", "100 reais com taxa 5 dão 20.00 dólares"]] },
      termos: [["Especificação", "a descrição exata do que a ferramenta deve fazer."], ["Entrada / saída", "o que a pessoa fornece e o que o programa devolve."]],
      fonte: "Anthropic, artigo de ajuda “Get started with Claude” (support.claude.com/en/articles/8114491-get-started-with-claude). Ferramentas mudam: reconfira na documentação oficial." },
    { tipo: "prever", texto: "Use o pedido do conversor da tabela. Responda com número ou sim/não.", conceito: "ar_pedir", itens: [
      { pergunta: "No pedido “faz uma calculadora aí”, as entradas estão ditas? (sim ou não)", rotulo: "Item 1", resposta: ["não", "nao"], porque: "Ele não diz o que a pessoa digita nem o que aparece." },
      { pergunta: "Quantas partes tem um bom pedido, segundo a tabela?", rotulo: "Item 2", resposta: "6", porque: "Objetivo, entradas, saída, regras, erros e exemplo: seis." },
      { pergunta: "Com 100 reais e taxa 5, quanto o exemplo do pedido espera em dólares?", rotulo: "Item 3", resposta: ["20", "20.00", "20,00"], porque: "100 dividido por 5 dá 20, e o pedido pede duas casas decimais." }] },
    { tipo: "descobrir", texto: "O mesmo desejo, com dois pedidos. A tabela mostra o que cada artifact fez ao ser testado com 100 reais e taxa 5.", tabela: { cab: ["", "Pedido vago", "Pedido com especificação"], linhas: [["Texto do pedido", "“faz um conversor de moeda”", "“converter reais em dólares: digito valor e taxa; mostre dólares com 2 casas; avise se a taxa for zero”"], ["Taxa", "fixa dentro do código", "digitada pela pessoa"], ["Resultado com 100 e taxa 5", "19.35", "20.00"], ["Taxa zero", "não havia como testar", "mostra o aviso"]] }, dicas: ["Olhe a linha “Taxa”: quem decidiu o valor da taxa em cada caso?", "Por que o resultado de 19.35 não serve para quem já sabe que o certo é 20.00?"],
      pergunta: "O que o pedido vago deixou o Claude decidir sozinho, e qual foi o custo para você?", explicacao: "Ele **inventou uma taxa fixa** (e nada garante que seja a de hoje). Sem exemplo e sem regras de erro, você só descobre o problema **depois**. A especificação coloca **você** no controle das decisões.", conceito: "ar_pedir" },
    { tipo: "aberta", titulo: "Roteiro: peça com as seis partes", texto: "No Claude, escreva um pedido com as seis partes para uma calculadora de **parcelas de compra** (você digita o valor total, o número de parcelas e o juros simples por mês). Inclua um exemplo numérico que você mesmo calculou à mão. Use só valores inventados.", pergunta: "Cole aqui o pedido que você escreveu (sem dados reais) e diga qual das seis partes foi a mais difícil de escrever.", minimo: 100, conceito: "ar_pedir", modelo: "Um bom pedido tem **objetivo** (parcelas de uma compra), **entradas** (total, número de parcelas, juros por mês), **saída** (valor de cada parcela com 2 casas), **regras** (a fórmula de juros simples), **erros** (parcelas menor que 1 ou texto) e um **exemplo** calculado à mão. A parte mais difícil costuma ser o exemplo, porque exige fazer a conta antes." },
    { tipo: "aberta", tag: "sec", titulo: "O exemplo que revela demais", texto: "Para dar um exemplo “realista” ao Claude, uma pessoa digita no pedido o seu salário exato, o nome do banco e o saldo da conta.", pergunta: "Como dar um exemplo realista sem expor nada de verdade?", modelo: "Use **números redondos e inventados** com a mesma ordem de grandeza (por exemplo, 3.000 em vez do salário exato) e **sem nome de banco ou de pessoas**. O objetivo do exemplo é conferir a conta, e não representar a sua vida." },
    { tipo: "quiz", itens: [
      { pergunta: "Qual parte do pedido permite conferir o resultado depois?", opcoes: ["O exemplo com números", "O tom de voz usado", "O nome da ferramenta", "A cor da tela inicial"], correta: 0, porque: "Com um caso calculado à mão você compara o resultado do artifact.", conceito: "ar_pedir" },
      { pergunta: "Por que dizer o que fazer com entrada errada?", opcoes: ["Para a tela ficar bonita", "Para evitar resultados falsos", "Para o código ficar curto", "Para pedir menos vezes"], correta: 1, porque: "Sem a regra de erro, a ferramenta pode calcular algo sem sentido (taxa zero, texto).", conceito: "ar_pedir" },
      { pergunta: "Um pedido “faz uma calculadora aí”:", opcoes: ["Já está completo e claro", "Dá o mesmo que um pedido bom", "Só funciona em celular", "Deixa o Claude adivinhar"], correta: 3, porque: "Faltam objetivo, entradas, saída, regras e exemplo: o Claude precisa adivinhar.", conceito: "ar_pedir" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: quais partes um pedido de ferramenta deve ter e qual delas permite conferir o resultado?", conceito: "ar_pedir", modelo: "Objetivo, entradas, saída, regras, o que fazer com erro e um **exemplo com números**. O exemplo calculado à mão é o que permite **conferir** o resultado. Tudo com dados inventados, sem segredos." },
  ],
  recuperacao: [
    { p: "Cite pelo menos três partes de um bom pedido de ferramenta.", regex: "(entrada|saida|regra|exemplo|objetivo|erro)", modelo: "Objetivo, entradas, saída, regras, erros e exemplo.", conceito: "ar_pedir" },
    { p: "Para que serve o exemplo com números no pedido?", regex: "(conferir|testar|comparar|verificar|alvo|conta)", modelo: "Para conferir se o resultado da ferramenta bate com a conta feita à mão.", conceito: "ar_pedir" },
    { p: "Por que usar dados inventados no pedido?", regex: "(inventad|ficticio|segredo|sensiv|pessoal|expor|privacid|real)", modelo: "Para não expor dados reais ou segredos; para conferir a conta, números inventados bastam.", conceito: "ar_pedir" },
  ],
});

// ---------- Aula 99: iterar e versionar ----------
aulas.push({
  id: "0099", modulo: 13, n: 3, slug: "iterar-e-versionar", titulo: "Ajustar aos poucos: uma mudança por vez",
  resumo: "O primeiro artifact raramente é o final. A boa prática é pedir uma mudança pequena, conferir, e só então pedir a próxima.",
  semCodigo: true,
  objetivos: ["Pedir uma mudança de cada vez e conferir depois de cada uma.", "Manter um caderno simples das versões e dos testes.", "Descobrir em que versão um defeito apareceu."],
  conceitos: [["ar_iterar", "Iterar e versionar"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você pede ao Claude, numa mensagem só, seis mudanças na calculadora. O resultado agora está errado, e você não sabe qual das seis causou o problema. O que você faria diferente da próxima vez?", modelo: "Pediria **uma mudança por vez** e **conferiria depois de cada uma**. Assim, se algo quebra, você sabe que foi a última mudança." },
    { tipo: "texto", titulo: "Pedir, conferir, anotar", blocos: [
      "A documentação oficial diz que, para editar um artifact, você pode **pedir ao Claude** a mudança (ou, em alguns modelos, usar a edição direta; em documentos, selecionar um trecho e usar “Edit with Claude”). Quando houver erro, existe a opção “Try fixing with Claude”, **sem garantia** de que resolva.",
      "A documentação também diz que **editar uma mensagem anterior** cria uma **versão diferente do chat**, com os seus próprios artifacts. Isso é útil para testar um caminho alternativo sem perder o anterior.",
      "Além disso, crie o seu **caderno de versões**: uma linha por rodada, com o que você pediu e o resultado dos seus testes. É um hábito do curso (não um recurso do Claude), e é ele que mostra **onde** o defeito entrou.",
      "Menus e nomes de botões mudam: confira na documentação oficial." ],
      tabela: { cab: ["Versão", "O que pedi", "Teste: 100 reais, taxa 5", "Teste: taxa 0"], linhas: [["v1", "criar o conversor", "20.00", "erro na tela"], ["v2", "mostrar 2 casas decimais", "20.00", "erro na tela"], ["v3", "avisar se a taxa for zero", "20.00", "aviso na tela"], ["v4", "trocar as cores", "0.20", "aviso na tela"]] },
      termos: [["Iterar", "repetir um ciclo de pedir, conferir e ajustar."], ["Versão", "uma fotografia do artifact depois de uma rodada de mudança."], ["Regressão", "quando uma mudança nova estraga algo que já funcionava."]],
      fonte: FONTE_ART },
    { tipo: "prever", texto: "Use o caderno de versões acima.", conceito: "ar_iterar", itens: [
      { pergunta: "Em que versão o resultado do teste principal deixou de ser 20.00?", rotulo: "Item 1", resposta: ["v4", "4"], porque: "Na v4 o resultado virou 0.20: a mudança de cores estragou a conta." },
      { pergunta: "Qual foi a última mudança pedida antes de o defeito aparecer?", rotulo: "Item 2", resposta: ["trocar as cores", "cores", "trocar cores"], porque: "A v4 pediu a troca de cores, e foi nela que o defeito entrou." },
      { pergunta: "Quantas mudanças devem ser pedidas por rodada, segundo o curso?", rotulo: "Item 3", resposta: "1", porque: "Uma por vez: assim a causa de um problema novo fica óbvia." }] },
    { tipo: "descobrir", texto: "Dois jeitos de pedir ajustes para o mesmo resultado final.", tabela: { cab: ["", "Tudo de uma vez", "Uma mudança por rodada"], linhas: [["Mensagens enviadas", "1", "5"], ["Defeitos achados", "1 (de causa desconhecida)", "1 (achado na rodada 4)"], ["Tempo para achar a causa", "longo", "curto"], ["Volta para a versão anterior", "difícil", "fácil: você sabe qual é"]] }, dicas: ["Qual coluna tem a causa do defeito identificada?", "O que “custa” mais: mandar 5 mensagens ou procurar uma causa sem pista?"],
      pergunta: "Por que mandar mais mensagens pode ser mais rápido no total?", explicacao: "Cada rodada pequena tem uma **causa óbvia** se algo quebrar. Procurar um defeito entre seis mudanças misturadas costuma custar muito mais do que as mensagens a mais.", conceito: "ar_iterar" },
    { tipo: "aberta", titulo: "Roteiro: duas rodadas e um caderno", texto: "No Claude, com a calculadora de gorjeta da aula 1 (ou outra), faça duas rodadas: (1) peça para arredondar o resultado em duas casas; (2) peça uma mensagem de aviso se a porcentagem for negativa. Depois de cada rodada, teste com um caso que você calculou à mão e anote.", pergunta: "Escreva o seu caderno: para cada rodada, o que pediu, o caso que testou, o resultado esperado e o que apareceu.", minimo: 80, conceito: "ar_iterar", modelo: "Uma boa resposta tem **duas linhas** (uma por rodada), cada uma com **o pedido**, **o caso testado** (por exemplo, conta de 80 com 10%), **o resultado esperado** (8 de gorjeta, 88 de total) e **o que apareceu**. Se algo falhou, diz em qual rodada." },
    { tipo: "aberta", tag: "sec", titulo: "Colar dados reais para “ajustar a tabela”", texto: "Para pedir um ajuste na tabela, alguém cola no pedido as 40 linhas reais da planilha da empresa, com nomes de clientes e valores.", pergunta: "Qual a alternativa segura? Que parte dos dados o Claude realmente precisa ver?", modelo: "O Claude precisa ver só o **formato**: poucas linhas com **dados inventados** e as mesmas colunas. Evite colar dados reais de pessoas ou da empresa; a documentação oficial recomenda cautela com dados sensíveis." },
    { tipo: "quiz", itens: [
      { pergunta: "Quantas mudanças pedir por rodada?", opcoes: ["Todas de uma só vez", "Uma e conferir depois", "Sempre exatamente três", "Nenhuma: refaça do zero"], correta: 1, porque: "Uma por vez deixa claro qual mudança causou um defeito.", conceito: "ar_iterar" },
      { pergunta: "O que o caderno de versões mostra?", opcoes: ["Onde um defeito entrou", "A cor mais bonita", "O preço da ferramenta", "O nome do modelo usado"], correta: 0, porque: "Cada linha liga um pedido a um resultado de teste.", conceito: "ar_iterar" },
      { pergunta: "“Try fixing with Claude”:", opcoes: ["Conserta tudo sempre", "Apaga o artifact atual", "Troca o seu idioma", "Tenta, sem garantia"], correta: 3, porque: "A documentação diz que a tentativa não tem garantia: confira o resultado.", conceito: "ar_iterar" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como ajustar um artifact aos poucos e o que anotar?", conceito: "ar_iterar", modelo: "Pedir **uma mudança por vez**, **testar com um caso conhecido** e anotar, num caderno de versões, o pedido e o resultado. Assim se acha **onde** um defeito entrou. A documentação cita ainda que editar uma mensagem anterior cria outra versão do chat." },
  ],
  recuperacao: [
    { p: "Quantas mudanças é melhor pedir por rodada e por quê?", regex: "(uma|1);;(causa|achar|saber|onde|qual|defeito|quebr)", modelo: "Uma de cada vez, para saber qual mudança causou um defeito.", conceito: "ar_iterar" },
    { p: "O que se anota num caderno de versões?", regex: "(pedid|mudanca|pediu);;(teste|resultado)", modelo: "O que foi pedido e o resultado do teste de cada rodada.", conceito: "ar_iterar" },
    { p: "Por que colar dados reais para pedir um ajuste é arriscado?", regex: "(sensiv|pessoa|expor|fictici|inventad|real|privacid|cliente)", modelo: "Porque expõe dados de pessoas ou da empresa; basta o formato com dados inventados.", conceito: "ar_iterar" },
  ],
});

// ---------- Aula 100: ler o código ----------
aulas.push({
  id: "0100", modulo: 13, n: 4, slug: "ler-o-codigo-gerado", titulo: "Ler o código que o artifact gerou",
  resumo: "Você não precisa escrever tudo, mas precisa entender o que a ferramenta faz. Hoje você lê, linha a linha, uma calculadora e o seu equivalente em Python.",
  objetivos: ["Ler uma função de conversão e dizer o que ela devolve.", "Reconhecer entrada, cálculo, arredondamento e aviso de erro no código.", "Escrever em Python uma função equivalente com testes."],
  conceitos: [["ar_ler", "Ler o código gerado"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "O artifact mostra “20.00” para 100 reais com taxa 5. Como você sabe que ele não está “chutando” números? O que você poderia fazer para ter certeza?", modelo: "Lendo o **código**: a conta está lá, escrita. Quem lê o código consegue ver **a fórmula, o arredondamento e o que acontece com entradas ruins**, em vez de só confiar no resultado." },
    { tipo: "texto", titulo: "O mesmo cálculo em JavaScript e em Python", blocos: [
      "Uma calculadora pequena feita como artifact costuma ser uma página com HTML (a tela), JavaScript (a lógica) e um estilo. A documentação atual não prende os artifacts a uma lista fixa de linguagens, então o código que você receber pode variar. Esta aula usa um exemplo **ilustrativo**; você aprende a ler a **ideia**, que é a mesma em qualquer linguagem.",
      "Abaixo, a lógica de um conversor escrita em JavaScript, com o equivalente em Python (que você vai executar aqui). O JavaScript está só para **leitura**: não roda nesta página.",
      "Ler é sempre a mesma pergunta: **o que entra, o que sai e o que acontece no meio?**" ],
      tabela: { cab: ["Linha em JavaScript (leitura)", "O que faz", "Em Python"], linhas: [["`function converter(valor, taxa) {`", "define a função com duas entradas", "`def converter(valor, taxa):`"], ["`return Math.round(valor / taxa * 100) / 100;`", "divide, arredonda em 2 casas e devolve", "`return round(valor / taxa, 2)`"], ["`const valor = Number(campo.value);`", "lê o texto digitado e o transforma em número", "`valor = float(texto)`"], ["`if (isNaN(valor)) { aviso(); return; }`", "se não for número, avisa e para", "`try ... except ValueError`"], ["`resultado.textContent = converter(valor, taxa);`", "mostra o resultado na tela", "`print(converter(valor, taxa))`"]] },
      termos: [["Função", "um bloco de código com nome, que recebe entradas e devolve um resultado."], ["Arredondar", "cortar as casas decimais em excesso (aqui, para 2 casas)."], ["Variável", "um nome que guarda um valor."]],
      fonte: "Conteúdo de exemplo escrito para este curso. A estrutura do código real de um artifact varia: leia o que o Claude gerou para você." },
    { tipo: "exemplo", arquivo: "conversor.py", texto: "Este programa está correto e é o equivalente em Python do código que o artifact usaria. Clique em cada linha.",
      codigo: [["def converter(valor, taxa):", "Define a função `converter`, com duas entradas: o valor em reais e a taxa."], ["    return round(valor / taxa, 2)", "Divide o valor pela taxa e arredonda para 2 casas. O `return` devolve o resultado para quem chamou."], ["valor = 100", "Cria a variável `valor` (a entrada da pessoa)."], ["taxa = 5", "Cria a variável `taxa`. Num artifact, esse número viria de um campo digitado."], ["resultado = converter(valor, taxa)", "Chama a função e guarda o resultado."], ["print(\"Resultado:\", resultado)", "Mostra `Resultado: 20.0`. Num artifact, isso apareceria na tela."]] },
    { tipo: "executar", texto: "Rode e depois troque a taxa para `4`. Antes de rodar, tente calcular de cabeça.", arquivo: "conversor.py (pode editar)", codigo: `${CONVERTER}
print(converter(100, 5))`,
      prever: { enunciado: "Antes de testar, o que aparece?", conceito: "ar_ler", itens: [
        { codigo: `${CONVERTER}print(converter(50, 5))`, resposta: "10.0", porque: "50 dividido por 5 é 10, e o `round` mantém `10.0`." },
        { codigo: `${CONVERTER}print(converter(10, 4))`, resposta: "2.5", porque: "10 dividido por 4 é 2.5." },
        { codigo: `${CONVERTER}print(converter(1, 3))`, resposta: "0.33", porque: "1 dividido por 3 dá 0.333…, e o `round` com 2 casas deixa `0.33`." }] } },
    { tipo: "descobrir", texto: "O programa mostra o resultado arredondado.", arquivo: "arredonda.py", codigo: `print(round(v / t, 2))`,
      execucoes: [{ prefixo: "v, t = 100, 5", saida: ["20.0"] }, { prefixo: "v, t = 10, 3", saida: ["3.33"] }, { prefixo: "v, t = 7, 7", saida: ["1.0"] }], colunas: ["Valores", "O que aparece"],
      pergunta: "O que o `2` dentro de `round(..., 2)` controla? O que apareceria com `round(10 / 3)`, sem o 2?", dicas: ["Conte as casas depois do ponto nos resultados da tabela.", "Sem o segundo número, o `round` não deixa casas decimais."],
      explicacao: "O `2` é o **número de casas decimais** do resultado. Sem ele, `round(10 / 3)` daria `3`, sem casas. Em dinheiro, quase sempre se quer 2 casas.", conceito: "ar_ler" },
    { tipo: "corrigir", texto: "Alguém trocou uma operação na função. Com 100 reais e taxa 5, o resultado deveria ser `20.0`. **Conserte uma linha.**", arquivo: "com_defeito.py", dica: "Para converter reais em dólares, divida pela taxa em vez de multiplicar.", conceito: "ar_ler",
      codigo: `def converter(valor, taxa):
    return round(valor * taxa, 2)

print(converter(100, 5))`, esperado: ["20.0"],
      solucao: `def converter(valor, taxa):
    return round(valor / taxa, 2)

print(converter(100, 5))` },
    { tipo: "escrever", texto: "Escreva a função `parcela(total, n)`, que devolve o valor de cada parcela (total dividido por n) com 2 casas. Mostre `parcela(100, 4)`.", arquivo: "meu_programa.py",
      inicial: `# escreva a função parcela e mostre parcela(100, 4)
`, esperado: ["25.0"], testes: [["parcela(90, 3)", "30.0"], ["parcela(10, 3)", "3.33"]], dica: "Use `def parcela(total, n):` e `return round(total / n, 2)`.", conceito: "ar_ler",
      solucao: `def parcela(total, n):
    return round(total / n, 2)

print(parcela(100, 4))` },
    { tipo: "aberta", tag: "sec", titulo: "A chave esquecida no código", texto: "Lendo o código que o Claude gerou, você acha uma linha como `chave = \"abc123-segredo\"` copiada de um exemplo da internet, e a página será compartilhada com o time.", pergunta: "Por que isso é um problema? O que fazer antes de compartilhar?", modelo: "Uma chave no código **vai junto** com a página para quem tiver acesso. **Remova-a**, não use chaves reais em artifacts compartilhados e, se alguma chave real já foi exposta, **troque-a** no serviço de origem. Leia o código **antes** de compartilhar." },
    { tipo: "quiz", itens: [
      { pergunta: "O que a função `converter` devolve?", opcoes: ["O texto da tela inicial", "A conta já arredondada", "O nome de quem digitou", "A taxa que valia ontem"], correta: 1, porque: "Ela divide o valor pela taxa e arredonda: é o resultado da conversão.", conceito: "ar_ler" },
      { pergunta: "O que o `2` em `round(x, 2)` controla?", opcoes: ["A quantidade de casas", "O valor da taxa usada", "O número de entradas", "A cor do resultado"], correta: 0, porque: "O segundo número do `round` é a quantidade de casas decimais.", conceito: "ar_ler" },
      { pergunta: "Por que ler o código gerado?", opcoes: ["Para deixá-lo mais lento", "Para trocar de idioma", "Para o nome ficar maior", "Para entender o que ele faz"], correta: 3, porque: "Quem lê vê a fórmula, o arredondamento e o tratamento de erros, em vez de apenas confiar.", conceito: "ar_ler" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que você procura ao ler o código de uma calculadora gerada?", conceito: "ar_ler", modelo: "Três coisas: **o que entra** (as entradas), **o que sai** (o resultado e o formato) e **o que acontece no meio** (a fórmula, o arredondamento e o tratamento de entrada inválida). E também **segredos esquecidos** no código." },
  ],
  recuperacao: [
    { p: "Que perguntas se faz ao ler o código de uma calculadora?", regex: "(entra|entrada);;(sai|saida|resultado)", modelo: "O que entra, o que sai e o que acontece no meio.", conceito: "ar_ler" },
    { p: "O que o segundo número do `round(x, 2)` indica?", regex: "(casa|decimal)", modelo: "A quantidade de casas decimais do resultado.", conceito: "ar_ler" },
    { p: "O que fazer ao achar uma chave ou senha no código gerado?", regex: "(remov|apag|tirar|troc|nao compartilh|nao usar|nao deixar)", modelo: "Remover antes de compartilhar e trocar a chave se ela for real e já tiver sido exposta.", conceito: "ar_ler" },
  ],
});

// ---------- Aula 101: testar com casos ----------
aulas.push({
  id: "0101", modulo: 13, n: 5, slug: "testar-com-casos", titulo: "Testar a ferramenta: normal, limite e inválido",
  resumo: "Um resultado certo não prova que a ferramenta está certa. Três tipos de caso pegam quase todos os defeitos: o comum, o limite e o inválido.",
  objetivos: ["Escolher casos normais, de limite e inválidos para uma regra.", "Escrever asserts que conferem os limites de uma regra de frete.", "Escrever uma função que classifica por faixas sem errar nas fronteiras."],
  conceitos: [["ar_testar", "Testar com casos"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "A regra do frete: “até 1 kg paga 10; de mais de 1 até 5 kg paga 18; acima disso paga 30”. Que pesos você testaria, e por que não bastam 0,5 kg e 3 kg?", modelo: "Teste os **limites** (1 e 5), os **vizinhos** (1,01 e 5,01) e um valor **inválido** (0 ou negativo). O defeito mais comum fica na **fronteira** (`<` no lugar de `<=`), e 0,5 e 3 não passam por ela." },
    { tipo: "texto", titulo: "Três famílias de casos", blocos: [
      "**Caso normal**: um valor no meio de cada faixa (0,5 kg; 3 kg; 10 kg). **Caso de limite**: o valor exato da fronteira (1 kg e 5 kg) e os vizinhos. **Caso inválido**: algo que não deveria existir (0, negativo, texto).",
      "A documentação oficial de avaliação pede critérios **específicos e mensuráveis**, incluir **casos de borda** e **automatizar** a conferência quando possível. Um `assert` faz exatamente isso: você escreve a resposta certa e o programa confere sozinho.",
      "Para um artifact, a prática é: peça ao Claude para criar a ferramenta, **anote os casos num papel** e confira um a um na tela. Se quiser, peça a ele que escreva a mesma lógica em Python, e rode aqui os asserts." ],
      tabela: { cab: ["Peso (kg)", "Tipo do caso", "Frete esperado"], linhas: [["0.5", "normal", "10.0"], ["1", "limite", "10.0"], ["1.01", "vizinho do limite", "18.0"], ["5", "limite", "18.0"], ["5.01", "vizinho do limite", "30.0"], ["0", "inválido", "recusar com erro"]] },
      termos: [["Caso de limite", "o valor exato em que a regra muda."], ["Caso inválido", "uma entrada que a regra não aceita."], ["Assert", "uma afirmação no código: se for falsa, o programa para com `AssertionError`."]],
      fonte: "Anthropic, “Define success criteria and build evaluations” (platform.claude.com/docs/en/test-and-evaluate/develop-tests). Ferramentas e páginas mudam: reconfira na documentação oficial." },
    { tipo: "exemplo", arquivo: "testes_frete.py", texto: "Este programa está correto: todos os asserts passam. Clique em cada linha.",
      codigo: [["def frete(peso):", "A regra de frete."], ["    if peso <= 0:", "Caso inválido: peso zero ou negativo."], ["        raise ValueError(\"peso inválido\")", "Recusa com erro, em vez de calcular algo sem sentido."], ["    if peso <= 1:", "Até 1 kg **inclusive**: o `<=` cuida do limite."], ["        return 10.0", "Faixa 1."], ["    if peso <= 5:", "Mais de 1 e até 5 kg."], ["        return 18.0", "Faixa 2."], ["    return 30.0", "Acima de 5 kg."], ["assert frete(0.5) == 10.0", "Caso normal da faixa 1."], ["assert frete(1) == 10.0", "Caso de **limite**: 1 kg ainda é faixa 1."], ["assert frete(1.01) == 18.0", "Vizinho do limite: já é faixa 2."], ["assert frete(5) == 18.0", "Limite da faixa 2."], ["assert frete(5.01) == 30.0", "Vizinho: faixa 3."], ["print(\"todos os testes passaram\")", "Só aparece se **todos** os asserts passaram."]] },
    { tipo: "executar", texto: "Rode e depois troque o `<=` da primeira faixa por `<`. Qual assert denuncia?", arquivo: "testes_frete.py (pode editar)", codigo: `${FRETE}
assert frete(1) == 10.0
print("ok")`,
      prever: { enunciado: "Antes de testar, o que aparece ou qual erro?", conceito: "ar_testar", itens: [
        { codigo: `${FRETE}print(frete(1))`, resposta: "10.0", porque: "1 kg está no limite e ainda é a faixa 1." },
        { codigo: `${FRETE}print(frete(1.01))`, resposta: "18.0", porque: "Passou de 1 kg: faixa 2." },
        { codigo: `${FRETE}print(frete(5))`, resposta: "18.0", porque: "5 kg ainda é a faixa 2, porque a regra usa `<=`." },
        { codigo: `${FRETE}print(frete(0))`, erro: "ValueError", resposta: "ValueError", pergunta: "Qual o tipo do erro?", porque: "Peso zero é um caso inválido e a função levanta `ValueError`." }] } },
    { tipo: "descobrir", texto: "O programa mostra o frete de um peso `p`.", arquivo: "frete_p.py", codigo: `${FRETE}print(frete(p))`,
      execucoes: [{ prefixo: "p = 0.5", saida: ["10.0"] }, { prefixo: "p = 1", saida: ["10.0"] }, { prefixo: "p = 1.5", saida: ["18.0"] }, { prefixo: "p = 5", saida: ["18.0"] }, { prefixo: "p = 6", saida: ["30.0"] }], colunas: ["Valor de p", "O que aparece"],
      pergunta: "Em que pesos o frete muda de faixa? Por que testar exatamente esses valores é melhor que testar 0.5 e 6?", dicas: ["Procure as linhas em que o resultado muda de uma linha para a seguinte.", "O defeito mais comum está na fronteira: `<` ou `<=`?"],
      explicacao: "O frete muda **logo depois** de 1 kg e **logo depois** de 5 kg. Testar 0.5 e 6 não passa pela fronteira, então um `<` no lugar de `<=` passaria despercebido. Os limites (1 e 5) e os vizinhos mostram o defeito.", conceito: "ar_testar" },
    { tipo: "corrigir", texto: "O teste do limite falha. Conserte a **função** (não o teste).", arquivo: "com_defeito.py", dica: "Um peso de exatamente 1 kg deve pagar 10: troque `<` por `<=`.", conceito: "ar_testar",
      codigo: `def frete(peso):
    if peso < 1:
        return 10.0
    return 18.0

assert frete(0.5) == 10.0
assert frete(1) == 10.0
print("passou")`, esperado: ["passou"],
      solucao: `def frete(peso):
    if peso <= 1:
        return 10.0
    return 18.0

assert frete(0.5) == 10.0
assert frete(1) == 10.0
print("passou")` },
    { tipo: "escrever", texto: "Escreva `classifica(peso)`, que devolve `\"leve\"` (até 1 kg), `\"medio\"` (mais de 1 até 5 kg) ou `\"pesado\"` (acima de 5). Cuide dos limites.", arquivo: "meu_programa.py",
      inicial: `# escreva a função classifica(peso)
`, testes: [["classifica(0.5)", "'leve'"], ["classifica(1)", "'leve'"], ["classifica(1.5)", "'medio'"], ["classifica(5)", "'medio'"], ["classifica(5.5)", "'pesado'"]], dica: "Use `if peso <= 1:`, depois `if peso <= 5:` e por fim `return \"pesado\"`.", conceito: "ar_testar",
      solucao: `def classifica(peso):
    if peso <= 1:
        return "leve"
    if peso <= 5:
        return "medio"
    return "pesado"` },
    { tipo: "aberta", tag: "sec", titulo: "Testar com os dados de verdade", texto: "Para “testar de verdade”, alguém cola na calculadora os pedidos reais da loja, com nome, endereço e CPF dos clientes, e publica o resultado para a equipe ver.", pergunta: "O que há de errado? Que dados usar para testar?", modelo: "Teste com **dados inventados** que cubram normal, limite e inválido. Não é preciso nenhum dado de cliente para conferir uma regra de frete, e **publicar** o resultado com dados reais **expõe** pessoas." },
    { tipo: "quiz", itens: [
      { pergunta: "O que é um caso de limite?", opcoes: ["O valor onde a regra muda", "O valor mais bonito da lista", "Um valor escolhido ao acaso", "O último valor digitado"], correta: 0, porque: "É o valor exato da fronteira, onde um `<` errado costuma se esconder.", conceito: "ar_testar" },
      { pergunta: "Qual teste entrega um `<` no lugar de `<=`?", opcoes: ["O valor do meio da faixa", "O valor exato da fronteira", "Um valor bem grande", "Um valor bem pequeno"], correta: 1, porque: "Só o valor exato da fronteira diferencia `<` de `<=`.", conceito: "ar_testar" },
      { pergunta: "O que fazer com um peso negativo?", opcoes: ["Calcular normalmente", "Dobrar o valor do frete", "Recusar com aviso ou erro", "Usar o último peso salvo"], correta: 2, porque: "É um caso inválido: o certo é recusar e avisar, em vez de calcular algo sem sentido.", conceito: "ar_testar" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: que tipos de caso testar numa regra com faixas e por que os limites importam?", conceito: "ar_testar", modelo: "Teste o caso **normal** (meio da faixa), o **limite** (valor exato da fronteira e os vizinhos) e o **inválido** (zero, negativo, texto). Os limites importam porque o defeito mais comum fica na fronteira (`<` no lugar de `<=`)." },
  ],
  recuperacao: [
    { p: "Quais três tipos de caso testar numa regra com faixas?", regex: "(normal);;(limite);;(invalid)", modelo: "Normal, limite e inválido.", conceito: "ar_testar" },
    { p: "Por que o caso de limite é importante?", regex: "(fronteira|exato|limite|`<`|menor);;(defeito|erro|falha|esconde|mud)", modelo: "Porque o defeito mais comum fica na fronteira, como `<` no lugar de `<=`.", conceito: "ar_testar" },
    { p: "Que dados usar para testar uma calculadora?", regex: "(inventad|ficticio|fake|sem dados reais)", modelo: "Dados inventados, que cubram normal, limite e inválido; nunca dados reais de clientes.", conceito: "ar_testar" },
  ],
});

// ---------- Aula 102: entrada inválida ----------
aulas.push({
  id: "0102", modulo: 13, n: 6, slug: "entrada-invalida-e-correcao", titulo: "Entradas inválidas: o que a ferramenta faz com “abc”?",
  resumo: "Quem usa uma calculadora digita de tudo: vírgula, texto, espaço, vazio. Hoje você vê como tratar isso com try/except e como pedir a correção ao Claude.",
  objetivos: ["Tratar uma entrada digitada com try/except ValueError.", "Aceitar vírgula decimal e recusar texto, negativos e valores como nan.", "Pedir uma correção ao Claude descrevendo o defeito e o caso que falhou."],
  conceitos: [["ar_invalida", "Entradas inválidas e correção"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Numa calculadora de parcelas, uma pessoa digita “12,50” (com vírgula), outra digita “abc” e outra deixa em branco. O que você gostaria que a ferramenta fizesse em cada caso?", modelo: "“12,50”: **aceitar** (entender a vírgula). “abc” e em branco: **avisar** de forma clara e **não calcular**. A ferramenta nunca deve mostrar um resultado inventado." },
    { tipo: "texto", titulo: "Texto digitado é só texto", blocos: [
      "Tudo o que a pessoa digita chega como **texto**. Antes de calcular, é preciso **converter** com `float(...)`. Se o texto não for um número, o Python levanta `ValueError`.",
      "Com `try` e `except ValueError`, o programa **tenta** converter e, se falhar, faz outra coisa (como avisar). É a versão em Python do `isNaN` que aparece em JavaScript.",
      "Atenção a surpresas: `float(\"nan\")` e `float(\"inf\")` são aceitos, mas não são valores úteis. Um caso de teste esquisito como esse é o que mostra o defeito.",
      "Para pedir a correção ao Claude, descreva: **o que você digitou**, **o que esperava** e **o que apareceu**. A documentação cita “Try fixing with Claude” para erros, sem garantia: confira o resultado depois. Ferramentas mudam: reconfira na documentação oficial." ],
      termos: [["try / except", "tentar um comando e, se der um erro de um tipo conhecido, executar outra coisa."], ["ValueError", "o erro de quando o tipo é certo, mas o valor não serve (como converter “abc” em número)."], ["nan", "“not a number”: um valor especial que não é um número útil."]],
      fonte: FONTE_ART },
    { tipo: "exemplo", arquivo: "ler_valor.py", texto: "Este programa está correto. Clique em cada linha.",
      codigo: [["def ler_valor(texto):", "Recebe o texto digitado."], ["    try:", "Tenta fazer a conversão."], ["        v = float(texto.replace(\",\", \".\"))", "Troca a vírgula por ponto e converte em número."], ["    except ValueError:", "Se a conversão falhar..."], ["        return None", "...devolve `None` (nada), um sinal de “entrada inválida”."], ["    if v < 0:", "Valores negativos também não servem."], ["        return None", "Mesmo sinal de entrada inválida."], ["    return v", "Entrada boa: devolve o número."], ["print(ler_valor(\"12,50\"))", "Mostra `12.5`."], ["print(ler_valor(\"abc\"))", "Mostra `None`."], ["print(ler_valor(\"-3\"))", "Mostra `None`."]] },
    { tipo: "executar", texto: "Rode e depois teste outros textos: um vazio (`\"\"`) e `\"1,5\"`.", arquivo: "ler_valor.py (pode editar)", codigo: `${LER_VALOR}
print(ler_valor("12,50"))`,
      prever: { enunciado: "Antes de testar, o que aparece?", conceito: "ar_invalida", itens: [
        { codigo: `${LER_VALOR}print(ler_valor("0"))`, resposta: "0.0", porque: "“0” é um número válido (não é negativo)." },
        { codigo: `${LER_VALOR}print(ler_valor(""))`, resposta: "None", porque: "Texto vazio não vira número: `ValueError`, então devolve `None`." },
        { codigo: `${LER_VALOR}print(ler_valor("1,5"))`, resposta: "1.5", porque: "A vírgula vira ponto: 1.5." },
        { codigo: `${LER_VALOR}print(ler_valor("1.000,50"))`, resposta: "None", porque: "Depois da troca fica “1.000.50”, com dois pontos, que não é um número: `None`." }] } },
    { tipo: "descobrir", texto: "O programa mostra o que `ler_valor` devolve para um texto `t`.", arquivo: "testa_valor.py", codigo: `${LER_VALOR}print(ler_valor(t))`,
      execucoes: [{ prefixo: 't = "10"', saida: ["10.0"] }, { prefixo: 't = "dez"', saida: ["None"] }, { prefixo: 't = "-2"', saida: ["None"] }, { prefixo: 't = "nan"', saida: ["nan"] }], colunas: ["Valor de t", "O que aparece"],
      pergunta: "Qual linha da tabela mostra um defeito da função? O que você pediria ao Claude (ou escreveria) para corrigir?", dicas: ["Uma das saídas não é nem um número útil nem `None`.", "`nan` passa pela conversão e não é menor que zero."],
      explicacao: "O `\"nan\"` passa e a função devolve `nan`, que não serve para calcular. A correção é **recusar valores que não são finitos** (por exemplo, com `math.isfinite`). Esse caso esquisito só aparece quando você **testa** entradas estranhas.", conceito: "ar_invalida" },
    { tipo: "corrigir", texto: "A função não entende a vírgula: `ler_valor(\"12,50\")` deveria dar `12.5`. **Conserte uma linha.**", arquivo: "com_defeito.py", dica: "Troque a vírgula por ponto antes da conversão: `texto.replace(\",\", \".\")`.", conceito: "ar_invalida",
      codigo: `def ler_valor(texto):
    try:
        v = float(texto)
    except ValueError:
        return None
    return v

print(ler_valor("12,50"))`, esperado: ["12.5"],
      solucao: `def ler_valor(texto):
    try:
        v = float(texto.replace(",", "."))
    except ValueError:
        return None
    return v

print(ler_valor("12,50"))` },
    { tipo: "escrever", texto: "Complete a função: `ler_valor` também deve devolver `None` para `\"nan\"` e `\"inf\"`. Dica: `import math` e `math.isfinite(v)`.", arquivo: "meu_programa.py",
      inicial: `def ler_valor(texto):
    try:
        v = float(texto.replace(",", "."))
    except ValueError:
        return None
    if v < 0:
        return None
    return v
`, testes: [["ler_valor('nan')", "None"], ["ler_valor('inf')", "None"], ["ler_valor('12,5')", "12.5"], ["ler_valor('-1')", "None"], ["ler_valor('abc')", "None"]], dica: "Depois da conversão, `if not math.isfinite(v): return None`.", conceito: "ar_invalida",
      solucao: `import math

def ler_valor(texto):
    try:
        v = float(texto.replace(",", "."))
    except ValueError:
        return None
    if v < 0 or not math.isfinite(v):
        return None
    return v` },
    { tipo: "aberta", titulo: "Roteiro: peça uma correção", texto: "No Claude, abra a sua calculadora de gorjeta (ou de parcelas), digite um valor com vírgula e outro com texto, e veja o que acontece. Se algo estiver errado, peça a correção.", pergunta: "Escreva a mensagem que você mandaria ao Claude para corrigir um defeito: o que digitou, o que esperava e o que apareceu. Se tudo funcionou, escreva a mensagem para o caso “nan”.", minimo: 60, conceito: "ar_invalida", modelo: "Uma boa mensagem diz **o que foi digitado** (“12,50”), **o que se esperava** (aceitar e calcular com 12.5) e **o que apareceu** (um aviso de erro ou um resultado sem sentido). Para o “nan”: “se eu digitar nan, a ferramenta calcula algo sem sentido; avise que não é um número válido”." },
    { tipo: "aberta", tag: "sec", titulo: "O registro que guarda o que foi digitado", texto: "Para investigar defeitos, a ferramenta grava num arquivo de registro tudo o que as pessoas digitam em cada campo, inclusive documentos e e-mails digitados por engano.", pergunta: "Qual o risco? O que registrar no lugar?", modelo: "O registro vira uma **cópia de dados pessoais** que muita gente pode ler. Registre só o **tipo do erro e o lugar** (por exemplo, “valor inválido no campo taxa”), **sem o conteúdo digitado**." },
    { tipo: "quiz", itens: [
      { pergunta: "O que `float(\"abc\")` causa?", opcoes: ["Um ValueError", "O número zero", "O texto “abc”", "O número 3"], correta: 0, porque: "O texto “abc” não é um número: o Python levanta `ValueError`.", conceito: "ar_invalida" },
      { pergunta: "Para que serve o `try`/`except`?", opcoes: ["Acelerar o programa", "Tratar um erro previsto", "Apagar variáveis antigas", "Mudar o tipo de letra"], correta: 1, porque: "Ele tenta um comando e, se falhar com o erro previsto, faz outra coisa.", conceito: "ar_invalida" },
      { pergunta: "Por que testar “nan”?", opcoes: ["Porque é uma moeda", "Porque é muito comum", "Porque passa e engana", "Porque é um comando"], correta: 2, porque: "O `float` aceita “nan”, mas ele não é um valor útil; só um teste esquisito mostra isso.", conceito: "ar_invalida" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: como uma calculadora deve tratar o que a pessoa digita e como pedir uma correção ao Claude?", conceito: "ar_invalida", modelo: "Converter o texto digitado, tratar o erro com `try`/`except ValueError`, aceitar a vírgula, recusar texto, negativo e `nan`, e avisar sem calcular. Para pedir correção, descrever **o que digitou, o que esperava e o que apareceu**." },
  ],
  recuperacao: [
    { p: "Que erro o Python levanta ao converter “abc” em número com `float`?", regex: "(valueerror|value error)", modelo: "ValueError.", conceito: "ar_invalida" },
    { p: "Para que serve o `try`/`except`?", regex: "(tenta|tentar|trata|tratar|captur|erro);;(erro|falh|avis|outra coisa)", modelo: "Tentar um comando e, se falhar com um erro previsto, tratar o erro (por exemplo, avisando).", conceito: "ar_invalida" },
    { p: "O que dizer ao Claude ao pedir a correção de um defeito?", regex: "(digitei|digitou|digitad|entrada);;(esperava|esperado);;(apareceu|resultado|mostrou)", modelo: "O que foi digitado, o que se esperava e o que apareceu.", conceito: "ar_invalida" },
  ],
});

// ---------- Aula 103: segurança ao compartilhar ----------
aulas.push({
  id: "0103", modulo: 13, n: 7, slug: "compartilhar-com-seguranca", titulo: "Compartilhar com segurança: o que um artifact expõe",
  resumo: "Um artifact começa privado, mas quando você o compartilha, outras pessoas passam a ver o que está dentro dele. Hoje você aprende a conferir isso antes.",
  semCodigo: true,
  objetivos: ["Explicar que artifacts começam privados e que compartilhar é uma decisão.", "Listar o que revisar antes de compartilhar (código, dados, armazenamento).", "Escolher o nível de acesso mais restrito que resolve."],
  conceitos: [["ar_seguro", "Compartilhar um artifact com segurança"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você terminou sua calculadora de parcelas e quer mandar o link para três colegas. Antes de enviar, o que você conferiria dentro do artifact?", modelo: "Conferiria se há **dados reais** (nomes, valores de verdade), **segredos** no código, e se os colegas precisam só **ver e usar** ou também editar. Também pensaria em quem consegue abrir o link." },
    { tipo: "texto", titulo: "O que a documentação confirma sobre compartilhar", blocos: [
      "Artifacts **começam privados**. O compartilhamento é feito pelo menu **Share** (na web e no Desktop; os apps móveis não mudam o compartilhamento). Nos planos Pro e Max, a documentação cita as opções “Only you” e “Anyone with the link”, além de convites por e-mail; em Team e Enterprise há convidados, a organização ou link (o link só se o dono ativar compartilhamento externo).",
      "Em geral, **quem abre precisa de conta Claude**. A documentação cita uma exceção para artifacts “legados” publicados a partir de um chat (Free, Pro, Max), que qualquer pessoa com o link pode ver. Há níveis de acesso: **ver**, **comentar** e **editar**. Os detalhes das opções por plano variam entre as páginas lidas: reconfira na documentação oficial.",
      "Artifacts que **conectam apps** ou **usam o Claude** não podem usar “Anyone with the link”, e quem abre usa as **suas próprias** conexões. O **armazenamento compartilhado** é visível para **todos** que abrirem o artifact; os dados pessoais ficam privados por pessoa. O armazenamento aceita até 20 MB por artifact, só texto.",
      "Despublicar um artifact **legado** apaga de forma permanente os dados armazenados nele.",
      "Regra de precaução do curso (que é nossa, não da documentação): trate **tudo** o que estiver dentro do artifact (texto, código, dados) como **visível** para quem tiver acesso. Por isso, **nada de segredos nem dados pessoais reais**." ],
      tabela: { cab: ["Antes de compartilhar", "O que conferir"], linhas: [["Código", "há chaves, senhas ou endereços internos?"], ["Dados", "há nomes, documentos ou valores reais?"], ["Armazenamento", "o que foi digitado vai ficar visível a quem abrir?"], ["Acesso", "ver, comentar ou editar: o mínimo que resolve"], ["Quem", "pessoas convidadas ou qualquer pessoa com o link?"]] },
      termos: [["Link público", "um endereço que dá acesso a quem o receber."], ["Nível de acesso", "o que a pessoa pode fazer: ver, comentar ou editar."], ["Armazenamento compartilhado", "dados guardados pelo artifact, visíveis a todos que o abrirem."]],
      fonte: FONTE_SHARE },
    { tipo: "prever", texto: "Responda com sim, não ou a palavra pedida.", conceito: "ar_seguro", itens: [
      { pergunta: "O artifact começa privado? (sim ou não)", rotulo: "Item 1", resposta: "sim", porque: "A documentação diz que artifacts começam privados." },
      { pergunta: "Dados digitados num armazenamento compartilhado ficam visíveis a todos que abrirem? (sim ou não)", rotulo: "Item 2", resposta: "sim", porque: "A documentação diz que os dados compartilhados são vistos por todos que abrirem." },
      { pergunta: "Posso colocar uma chave de acesso no código “só para facilitar”? (sim ou não)", rotulo: "Item 3", resposta: ["não", "nao"], porque: "Tudo que está no artifact deve ser tratado como visível a quem tiver acesso: nada de segredos." }] },
    { tipo: "descobrir", texto: "Três artifacts prontos para compartilhar.", tabela: { cab: ["Artifact", "O que tem dentro", "Pode compartilhar?"], linhas: [["A", "calculadora com taxa digitada e dados inventados", "sim, para ver e usar"], ["B", "planilha com gastos reais e nomes de pessoas", "não, sem limpar antes"], ["C", "chave de acesso escrita no código", "não, até remover e trocar a chave"]] }, dicas: ["O que os artifacts B e C têm que o A não tem?", "Qual dos três só tem informação que você aceitaria ver num cartaz?"],
      pergunta: "Qual é o critério que separa o artifact que pode ser compartilhado dos outros?", explicacao: "Só vale compartilhar o que você **aceitaria mostrar** a quem receber: sem dados reais de pessoas e sem segredos. No B e no C há exposição, e a solução é **limpar antes** (e trocar a chave).", conceito: "ar_seguro" },
    { tipo: "aberta", titulo: "Roteiro: a lista antes do Share", texto: "No Claude, abra um artifact seu (ou a calculadora de gorjeta) e, SEM compartilhar, abra o menu de compartilhamento só para ver quais opções aparecem para o seu plano. Anote o que viu, sem clicar em nada que envie o link. Menus mudam: se não achar, confira na documentação oficial.", pergunta: "Escreva a sua lista de conferência de 5 itens antes de compartilhar um artifact e diga qual nível de acesso (ver, comentar ou editar) você daria a um colega que só precisa usar a calculadora.", minimo: 80, conceito: "ar_seguro", modelo: "A lista deve ter pelo menos: **código sem chaves**, **sem dados reais**, **atenção ao armazenamento compartilhado**, **nível de acesso mínimo** e **só as pessoas certas**. Para quem só usa a calculadora, o nível é **ver** (usar, sem editar), conforme as opções que o seu plano mostrar." },
    { tipo: "aberta", tag: "sec", titulo: "“Qualquer pessoa com o link”", texto: "Para facilitar, alguém escolhe “Anyone with the link” para uma planilha-ferramenta com dados reais de pagamentos de clientes, pensando que “só quem sabe o link” vai achar.", pergunta: "Por que um link não é um segredo? Que cuidado alternativo existe?", modelo: "Um link pode ser **encaminhado, copiado ou exposto**; quem o tiver, tem o acesso. Prefira **convidar pessoas** específicas, dar o **menor nível de acesso** e **nunca** colocar dados reais de clientes em artifacts compartilhados." },
    { tipo: "quiz", itens: [
      { pergunta: "O que fazer com uma chave no código?", opcoes: ["Deixar, só o time vê", "Esconder com uma cor", "Remover e trocar a chave", "Mandar o link a todos"], correta: 2, porque: "Quem tiver acesso vê o código: remova a chave e troque-a se foi exposta.", conceito: "ar_seguro" },
      { pergunta: "Qual acesso dar a quem só usa?", opcoes: ["O de editar tudo", "O de ver e usar", "O de apagar tudo", "O de ser dono"], correta: 1, porque: "Dar o menor nível que resolve reduz o risco.", conceito: "ar_seguro" },
      { pergunta: "O que não deve ir num artifact?", opcoes: ["Exemplos com dados fictícios", "A fórmula do cálculo feito", "O texto da tela inicial", "Dados reais de clientes"], correta: 3, porque: "Dados de pessoas reais ficam visíveis a quem tiver acesso: use dados inventados.", conceito: "ar_seguro" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: o que conferir antes de compartilhar um artifact?", conceito: "ar_seguro", modelo: "Que o **código não tenha chaves**, que **não haja dados reais de pessoas**, o que o **armazenamento compartilhado** vai mostrar, o **nível de acesso mínimo** (ver, comentar ou editar) e **quem** vai receber. Artifacts começam privados, e as opções por plano mudam: confira na documentação oficial." },
  ],
  recuperacao: [
    { p: "Um artifact novo começa privado ou público?", regex: "(privad)", modelo: "Privado.", conceito: "ar_seguro" },
    { p: "Cite duas coisas a conferir antes de compartilhar um artifact.", regex: "(chave|senha|segredo|dado|nome|acesso|nivel|armazen)", modelo: "Se há chaves ou segredos no código, se há dados reais de pessoas e qual nível de acesso dar.", conceito: "ar_seguro" },
    { p: "Por que “qualquer pessoa com o link” é arriscado?", regex: "(encaminh|copi|qualquer|expost|segredo|nao e segredo|vaza)", modelo: "Porque o link pode ser encaminhado ou exposto: quem o tiver, tem acesso; um link não é segredo.", conceito: "ar_seguro" },
  ],
});

// ---------- Aula 104: mini-projeto ----------
aulas.push({
  id: "0104", modulo: 13, n: 8, slug: "mini-projeto-calculadora", titulo: "Mini-projeto: a calculadora de parcelas",
  resumo: "Hora de juntar tudo: especificar, ler, testar e tratar entradas inválidas numa calculadora de parcelas com juros simples, e depois um conversor de moeda.",
  objetivos: ["Escrever a especificação de uma calculadora de parcelas e conferir a conta à mão.", "Implementar em Python a mesma lógica, com tabela e testes.", "Aplicar tudo num conversor que recebe texto e trata entradas inválidas."],
  conceitos: [["ar_mini", "Mini-projeto: calculadora com artifacts"]],
  secoes: [
    { tipo: "aquecimento", pergunta: "Você vai pedir ao Claude uma calculadora de parcelas e ler o que ele gerou. Em ordem, que passos você seguiria, da especificação até compartilhar (ou não) a ferramenta?", modelo: "**Especificar** (seis partes, com exemplo à mão), **pedir**, **ler o código**, **testar** (normal, limite, inválido), **corrigir uma coisa por vez** e **conferir** o que há dentro antes de compartilhar." },
    { tipo: "texto", titulo: "A especificação do projeto", blocos: [
      "O **juros simples** é a regra mais fácil: sobre o valor da compra, a cada mês de prazo se soma uma porcentagem fixa do valor original. Total com juros = total × (1 + juros × meses). Parcela = total com juros dividido pelo número de parcelas.",
      "Exemplo à mão: compra de 1.000 reais, juros de 2% ao mês (0,02), 3 parcelas. Total com juros = 1.000 × (1 + 0,02 × 3) = 1.060. Cada parcela = 1.060 ÷ 3 = 353,33.",
      "Você vai (1) escrever o pedido ao Claude com as seis partes, usando esse exemplo; (2) ler o que ele gerar; e (3) fazer aqui a versão em Python com tabela de parcelas e testes. Seu critério de sucesso: **a tabela do artifact bate com a sua conta à mão**." ],
      tabela: { cab: ["Parcelas", "Total com juros (1.000, 2%)", "Valor de cada parcela"], linhas: [["1", "1020.00", "1020.00"], ["2", "1040.00", "520.00"], ["3", "1060.00", "353.33"], ["4", "1080.00", "270.00"]] },
      termos: [["Juros simples", "juros calculados sempre sobre o valor original, sem “juros sobre juros”."], ["Parcela", "cada pagamento em que o total é dividido."]],
      fonte: "Conteúdo escrito para este curso. As contas da tabela foram conferidas aqui; os valores reais de uma compra dependem das regras de cada loja." },
    { tipo: "exemplo", arquivo: "parcelas.py", texto: "Este programa está correto. Clique em cada linha.",
      codigo: [["def valor_parcela(total, n, juros):", "Recebe o total, o número de parcelas e o juros mensal (0.02 = 2%)."], ["    total_com_juros = total * (1 + juros * n)", "Juros simples: o prazo (n meses) multiplica a taxa."], ["    return round(total_com_juros / n, 2)", "Divide em n parcelas e arredonda em 2 casas."], ["for n in [1, 2, 3, 4]:", "Repete o cálculo para 1, 2, 3 e 4 parcelas."], ["    print(n, \"x de\", valor_parcela(1000, n, 0.02))", "Mostra cada linha da tabela."]] },
    { tipo: "executar", texto: "Rode e confira com a tabela da aula (a de 3 parcelas deve dar 353.33).", arquivo: "parcelas.py (pode editar)", codigo: `def valor_parcela(total, n, juros):
    total_com_juros = total * (1 + juros * n)
    return round(total_com_juros / n, 2)

for n in [1, 2, 3, 4]:
    print(n, "x de", valor_parcela(1000, n, 0.02))`,
      prever: { enunciado: "Antes de testar, o que aparece para:", conceito: "ar_mini", itens: [
        { codigo: `def valor_parcela(total, n, juros):
    total_com_juros = total * (1 + juros * n)
    return round(total_com_juros / n, 2)

print(valor_parcela(1000, 2, 0.02))`, resposta: "520.0", porque: "1.000 × 1,04 = 1.040; dividido por 2 dá 520." },
        { codigo: `def valor_parcela(total, n, juros):
    total_com_juros = total * (1 + juros * n)
    return round(total_com_juros / n, 2)

print(valor_parcela(1000, 4, 0))`, resposta: "250.0", porque: "Sem juros: 1.000 dividido por 4." },
        { codigo: `def valor_parcela(total, n, juros):
    total_com_juros = total * (1 + juros * n)
    return round(total_com_juros / n, 2)

print(valor_parcela(300, 3, 0.01))`, resposta: "103.0", porque: "300 × 1,03 = 309; dividido por 3 dá 103." }] } },
    { tipo: "escrever", final: true, texto: "**Exercício final do módulo.** Escreva `valor_parcela(total, n, juros)` (juros simples) e depois, com um laço, mostre a tabela para `total = 600`, `juros = 0.01` e `n` de 1 a 3, no formato `1x de 606.00` (duas casas, use f-string com `:.2f`).", arquivo: "meu_programa.py",
      inicial: `# 1) escreva a função valor_parcela(total, n, juros)
# 2) com um laço, mostre a tabela de 1 a 3 parcelas para total=600 e juros=0.01
`, esperado: ["1x de 606.00", "2x de 306.00", "3x de 206.00"], testes: [["valor_parcela(1000, 3, 0.02)", "353.33"], ["valor_parcela(600, 2, 0.01)", "306.0"]], dica: "A função: `total * (1 + juros * n)` dividido por `n`, com `round(..., 2)`. O laço: `for n in [1, 2, 3]:` com `print(f\"{n}x de {valor_parcela(600, n, 0.01):.2f}\")`.", conceito: "ar_mini",
      solucao: `def valor_parcela(total, n, juros):
    total_com_juros = total * (1 + juros * n)
    return round(total_com_juros / n, 2)

for n in [1, 2, 3]:
    print(f"{n}x de {valor_parcela(600, n, 0.01):.2f}")` },
    { tipo: "escrever", transfer: true, texto: "**Transferência.** Agora um conversor de moeda que recebe **texto** digitado. Escreva `converter_texto(valor, taxa)`: aceita vírgula decimal, devolve o resultado como texto com 2 casas (`\"20.00\"`), e devolve `\"valor inválido\"` ou `\"taxa inválida\"` se o texto não for um número (ou se a taxa for zero ou negativa).", arquivo: "meu_programa.py",
      inicial: `# escreva converter_texto(valor, taxa): valor e taxa chegam como texto
`, testes: [["converter_texto('100', '5')", "'20.00'"], ["converter_texto('100', '5,0')", "'20.00'"], ["converter_texto('abc', '5')", "'valor inválido'"], ["converter_texto('100', 'x')", "'taxa inválida'"], ["converter_texto('100', '0')", "'taxa inválida'"]], dica: "Converta cada texto com `float(texto.replace(\",\", \".\"))` dentro de `try`/`except ValueError`. Depois confira `taxa <= 0` e devolva `f\"{valor / taxa:.2f}\"`.", conceito: "ar_mini",
      solucao: `def converter_texto(valor, taxa):
    try:
        v = float(valor.replace(",", "."))
    except ValueError:
        return "valor inválido"
    try:
        t = float(taxa.replace(",", "."))
    except ValueError:
        return "taxa inválida"
    if t <= 0:
        return "taxa inválida"
    return f"{v / t:.2f}"` },
    { tipo: "aberta", titulo: "Roteiro: a prova no Claude", texto: "No Claude, peça a calculadora de parcelas com a sua especificação e o exemplo (1.000, 2%, 3 parcelas = 353,33). Leia o código gerado, teste os casos da tabela (1, 2, 3 e 4 parcelas) e um caso inválido (parcelas igual a zero, texto).", pergunta: "Registre: o pedido que você fez (resumo), os resultados que conferiu, um defeito encontrado (ou o caso inválido que testou) e o que você pediu para corrigir.", minimo: 100, conceito: "ar_mini", modelo: "Uma boa resposta traz **o pedido resumido** (com as seis partes e o exemplo de 353,33), **a conferência** (as quatro parcelas da tabela), **um defeito ou caso inválido** (por exemplo, zero parcelas) e **a mensagem de correção** (digitou, esperava, apareceu). Tudo com dados inventados." },
    { tipo: "aberta", tag: "sec", titulo: "Antes de mandar o link", texto: "A calculadora ficou pronta. Para a demonstração, o autor usou no exemplo o valor real de uma compra de um cliente e deixou no código uma chave de um serviço de cotação de moedas. Ele pretende mandar o link a todo o grupo.", pergunta: "Liste três coisas que ele deve corrigir antes de compartilhar.", modelo: "(1) **Trocar o valor real por um inventado**; (2) **remover a chave do código** e trocar a chave no serviço, já que ela foi exposta; (3) escolher o **menor nível de acesso** (ver) e **convidar só quem precisa**, em vez de um link aberto." },
    { tipo: "quiz", itens: [
      { pergunta: "Como se confere a tabela da calculadora?", opcoes: ["Comparando com a conta à mão", "Olhando se é bonita", "Confiando no resultado", "Mudando de navegador"], correta: 0, porque: "O exemplo calculado à mão é o alvo: se a tabela bate, a lógica está certa.", conceito: "ar_mini" },
      { pergunta: "Qual é a fórmula do juros simples?", opcoes: ["total × (1 + juros × n)", "total ÷ (1 + juros)", "total + n + juros", "total × juros ÷ n"], correta: 0, porque: "O juros simples soma, sobre o valor original, a taxa vezes o número de meses.", conceito: "ar_mini" },
      { pergunta: "O que fazer com parcelas igual a zero?", opcoes: ["Calcular com 1 parcela", "Dividir por zero", "Mostrar o valor zero", "Recusar e avisar"], correta: 3, porque: "É um caso inválido: dividiria por zero. O certo é recusar com um aviso claro.", conceito: "ar_mini" }] },
    { tipo: "fechar", pergunta: "Sem olhar acima: descreva, em ordem, o caminho de ponta a ponta para fazer e usar uma calculadora feita com artifacts.", conceito: "ar_mini", modelo: "**Especificar** com seis partes e um exemplo à mão, **pedir** ao Claude, **ler** o código, **testar** com casos normais, de limite e inválidos, **corrigir** uma coisa por vez e **conferir** que não há segredos nem dados reais antes de compartilhar com o menor acesso possível." },
  ],
  recuperacao: [
    { p: "Qual é a fórmula da parcela com juros simples?", regex: "(total|valor);;(juros|taxa);;(dividi|/|parcela)", modelo: "Total vezes (1 + juros vezes meses), dividido pelo número de parcelas.", conceito: "ar_mini" },
    { p: "Como conferir se a tabela da calculadora está certa?", regex: "(conta|calcul);;(mao|exemplo|conferir|comparar)", modelo: "Comparando com um exemplo calculado à mão.", conceito: "ar_mini" },
    { p: "O que revisar antes de compartilhar a calculadora?", regex: "(chave|segredo|senha|dado|real|acesso|nivel)", modelo: "Remover chaves e dados reais e dar o menor nível de acesso possível.", conceito: "ar_mini" },
  ],
});

export default aulas;
