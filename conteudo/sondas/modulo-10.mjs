// Sondas da recuperação do Módulo 10 (aulas 0075 a 0082): respostas certas devem passar; respostas erradas ou vagas devem falhar.
// q = número da pergunta na recuperação, a partir de 1.
export default [
  // 0076: cadeia
  { aula: "0076", q: 2,
    passa: ["Passar a entrada original em todos os passos", "Usar sempre a mesma entrada, em vez do resultado anterior", "Não usar o resultado do passo anterior", "Esquecer de passar a saída do passo anterior", "Reaproveitar a entrada inicial em cada passo"],
    falha: ["Usar o resultado anterior em cada passo", "Usar a saída do passo anterior como entrada do próximo", "Conferir cada passo", "Ter poucos passos"] },
  { aula: "0076", q: 3,
    passa: ["Removendo ou trocando os dados pessoais no primeiro passo", "apagando nome e telefone antes", "Tirando o nome do cliente antes de enviar", "Enviando só o necessário em cada passo", "Mascarando os dados no começo da cadeia"],
    falha: ["Confiando que o Claude não vaza", "Usando mais passos", "Copiando o e-mail completo em todos os passos", "Não fazendo nada"] },

  // 0077: papéis e instruções de sistema
  { aula: "0077", q: 1,
    passa: ["Dizer quem ele deve ser na tarefa, para focar o comportamento", "Dar uma função a ele, como revisor, para definir o tom", "Pedir que ele atue como um tutor de matemática"],
    falha: ["É dar um nome ao chat", "Trocar o idioma do chat", "Pedir uma senha"] },
  { aula: "0077", q: 3,
    passa: ["Senhas e chaves", "credenciais", "Tokens de acesso e dados pessoais", "Números de cartão", "Informações confidenciais"],
    falha: ["O nome do assistente", "O tom de voz", "Exemplos de resposta"] },

  // 0078: tags
  { aula: "0078", q: 3,
    passa: ["Não, não garantem; é preciso revisar o resultado", "Não protegem totalmente, ajudam a separar", "Não garantem, são só um apoio", "Nem sempre, só ajudam a separar as partes"],
    falha: ["Sim, protegem totalmente, não precisa fazer mais nada", "Sim, protegem totalmente", "Protegem totalmente", "Sim, as tags bastam"] },

  // 0079: raciocínio e formato rígido
  { aula: "0079", q: 3,
    passa: ["Porque o formato certo não garante que o conteúdo esteja certo", "O número pode estar errado mesmo bem formatado", "Não garante que o valor esteja correto", "Nem sempre o conteúdo está certo"],
    falha: ["o formato certo garante o conteúdo", "Sim, dá para confiar", "Porque o formato é bonito", "Para a linha ficar curta"] },

  // 0080: avaliação
  { aula: "0080", q: 2,
    passa: ["Um caso pode ser sorte", "Porque um caso fácil não mostra onde o prompt falha", "Precisa de vários casos, incluindo os de borda", "Pode ter dado certo por coincidência", "Os casos difíceis revelam erros"],
    falha: ["Porque um caso só basta", "Um caso é suficiente", "Para o teste ser mais bonito", "Para o prompt ficar maior"] },

  // 0081: instruções escondidas
  { aula: "0081", q: 2,
    passa: ["Separar instruções e dados e pedir confirmação humana", "Limitar o acesso da tarefa e revisar a saída", "usar tags e testar com ataques fictícios", "Confirmação humana e menor poder", "Separar o texto com tags e revisar o resultado"],
    falha: ["Separar", "tags", "Revisar", "Confiar no tom da mensagem", "Separar com tags e separar o texto do pedido", "Colar o texto sem ler"] },
  { aula: "0081", q: 3,
    passa: ["O atacante pode escrever de outro jeito", "Dá para trocar as palavras por sinônimos", "Basta reescrever a ordem com outras palavras", "Dá para contornar o filtro com outro idioma", "É só um alerta, não garante", "Pode disfarçar a ordem"],
    falha: ["Porque não basta", "Porque é lento", "Porque o Claude não lê filtros", "Resolve tudo sozinho"] },

  // 0082: mini-projeto
  { aula: "0082", q: 1,
    passa: ["Gerar, extrair o código, testar e relatar", "pedir a função, separar o código, rodar os casos", "Gerar a função, extrair da tag e testar", "criar o código, isolar o trecho e executar os testes"],
    falha: ["Só testar", "Gerar e testar", "gerar, apagar, imprimir", "Ler e esquecer"] },
  { aula: "0082", q: 2,
    passa: ["O erro é capturado com try/except e contado como falha", "Conta como falha e o programa continua", "Vira falha, sem parar o programa", "Captura o erro, conta como falha e registra"],
    falha: ["Conta como falha, e o programa para", "O programa para", "Ignora o caso", "Muda o resultado esperado"] },
  { aula: "0082", q: 3,
    passa: ["Ler e revisar antes, e rodar em ambiente isolado", "Revisar o código antes de rodar", "Rodar sem acesso a segredos, num ambiente isolado", "Só usar código de fonte confiável"],
    falha: ["É seguro, pode rodar", "Fazer um teste rápido", "Nenhum, o Claude é confiável", "Rodar direto"] },
];
