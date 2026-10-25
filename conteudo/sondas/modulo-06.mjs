// Sondas da recuperação do módulo 6: respostas certas (com outras palavras) devem passar; respostas erradas ou vagas devem falhar.
export default [
  // 0043: ler o erro
  { aula: "0043", q: 1,
    passa: ["pela última linha", "de baixo para cima", "do fim para o começo", "pelo final da mensagem"],
    falha: ["pela primeira linha", "pelo começo", "não pela última", "por qualquer uma"] },
  { aula: "0043", q: 2,
    passa: ["o nome usado não existe", "a variável não existe", "variável que nunca foi criada", "um nome digitado errado", "usou um nome que não foi definido"],
    falha: ["o nome da pessoa está errado", "um erro de tipo", "a lista está vazia", "o nome é muito longo"] },
  { aula: "0043", q: 3,
    passa: ["pode conter senhas", "expõe o caminho da pasta do usuário", "pode revelar dados sensíveis", "tem token e chave de acesso"],
    falha: ["porque é muito grande", "porque o chat é lento", "porque tem muito texto"] },

  // 0044: tipos de erro
  { aula: "0044", q: 1,
    passa: ["quando soma texto com número", "mistura tipos diferentes", "quando o tipo está errado", "texto + numero"],
    falha: ["erro de tipo", "quando falta um parêntese", "quando a lista está vazia"] },
  { aula: "0044", q: 2,
    passa: ["a chave não está no dicionário", "a chave não existe", "pediu uma chave inexistente", "a chave não foi encontrada"],
    falha: ["o nome não existe", "a posição não existe", "a chave está escrita errada"] },

  // 0045: depurar com print
  { aula: "0045", q: 2,
    passa: ["mostra os valores intermediários", "mostra o valor de cada variável a cada passo", "imprime o valor no meio do programa", "espia os valores depois de cada etapa"],
    falha: ["mostra o valor final", "mostra o resultado", "deixa o código mais rápido"] },
  { aula: "0045", q: 3,
    passa: ["os dados podem vazar", "podem ficar expostos nos registros", "dá para esquecer o print na produção", "use dados fictícios para não expor"],
    falha: ["pode depurar com dados reais", "dados reais são mais fáceis", "porque é mais fácil"] },

  // 0046: assert
  { aula: "0046", q: 1,
    passa: ["interrompe o programa com AssertionError", "dá erro", "o programa para", "falha"],
    falha: ["ignora e segue para a próxima linha", "nada acontece", "não dá erro"] },

  // 0047: casos de teste
  { aula: "0047", q: 1,
    passa: ["o valor exatamente na fronteira da regra", "o limite da regra", "o valor exato onde a regra muda"],
    falha: ["o limite de memória", "um valor bem grande", "limite"] },
  { aula: "0047", q: 3,
    passa: ["para não expor pessoas reais", "para não vazar dados", "o ambiente de teste tem menos proteção", "dados fictícios protegem a privacidade"],
    falha: ["dados reais são mais confiáveis", "porque é mais fácil"] },

  // 0048: try/except
  { aula: "0048", q: 1,
    passa: ["quando acontece o erro esperado", "se der erro no try", "quando ocorre um ValueError", "quando a conversão falha"],
    falha: ["quando der certo, sem erro", "quando não acontece erro", "sempre", "quando der certo"] },
  { aula: "0048", q: 2,
    passa: ["é pulado", "pula para o except", "sai do try e vai para o except", "o programa interrompe o bloco e salta para o except"],
    falha: ["continua executando normalmente", "roda tudo", "repete duas vezes"] },

  // 0049: conferir código de IA
  { aula: "0049", q: 2,
    passa: ["não, pode dar o resultado errado", "Não: só os testes provam", "não, a lógica pode estar errada", "não, o código pode rodar sem erro e dar a conta errada"],
    falha: ["sem erro está certo, não precisa testar", "sim, se roda sem erro é certo", "não, mas dá para confiar"] },
];
