// Sondas da recuperação do Módulo 4 (aulas 0025 a 0032): respostas certas, com outras palavras, devem passar;
// respostas erradas, vagas, trocadas ou que apenas ecoam a pergunta devem falhar. Rodam em `node test-conteudo.mjs`.
export default [
  // 0025: def
  { aula: "0025", q: 1,
    passa: ["definir cria, chamar roda", "definir só guarda a receita; chamar executa", "o def escreve a função e a chamada faz ela rodar"],
    falha: ["definir executa e chamar guarda", "definir é o mesmo que chamar", "def", "chamar chama"] },
  { aula: "0025", q: 2,
    passa: ["servir()", "chamando servir()", "o nome com parênteses: servir()", "escrevendo servir() sem o def"],
    falha: ["def servir()", "def servir():", "servir"] },
  // 0026: parâmetros
  { aula: "0026", q: 1,
    passa: ["nome é o parâmetro e \"Lia\" é o argumento", "parâmetro é o nome na definição; argumento é o valor passado na chamada", "o parâmetro nome recebe o argumento Lia", "parâmetro: nome; argumento: \"Lia\""],
    falha: ["\"Lia\" é o parâmetro e nome é o argumento", "parâmetro é o valor da chamada e argumento é o nome na definição", "argumento é nome e parâmetro é Lia", "são a mesma coisa", "nome é o parâmetro"] },
  { aula: "0026", q: 3,
    passa: ["para não expor dados que ela não precisa", "a função ganha acesso a dados desnecessários", "se vazar, vaza tudo", "privacidade e menos estrago se der erro"],
    falha: ["porque é necessário", "porque sim", "porque é mais bonito"] },
  // 0027: return
  { aula: "0027", q: 1,
    passa: ["devolve um valor a quem chamou a função", "entrega o resultado para quem chamou", "retorna o valor e encerra a função"],
    falha: ["o return mostra o valor da função", "mostra na tela", "return"] },
  { aula: "0027", q: 3,
    passa: ["print mostra na tela e return devolve o valor", "o print só exibe; o return entrega o valor para eu guardar em uma variável", "print imprime, return devolve para usar em outras contas"],
    falha: ["os dois mostram na tela", "o return mostra e o print devolve", "print mostra", "return devolve"] },
  // 0028: valores padrão e argumentos nomeados
  { aula: "0028", q: 1,
    passa: ["quando o valor não for informado", "o valor que vale se a chamada não informar", "valor usado na falta de um argumento"],
    falha: ["um valor", "o valor do parâmetro", "padrão"] },
  { aula: "0028", q: 2,
    passa: ["nome=valor", "passando qtd=2", "total(qtd=2, preco=3)", "com o nome do parâmetro, um igual e o valor"],
    falha: ["igual", "um valor qualquer", "qtd == 2"] },
  { aula: "0028", q: 3,
    passa: ["para que quem esquecer não ganhe acesso total", "privilégio mínimo", "é mais seguro", "sem querer ninguém recebe permissão demais"],
    falha: ["porque é restrito", "porque o mais restrito é o padrão", "porque sim"] },
  // 0029: funções que respondem sim ou não
  { aula: "0029", q: 1,
    passa: ["True ou False", "verdadeiro ou falso", "sim ou não", "um valor booleano"],
    falha: ["um texto", "True", "um número", "nada"] },
  { aula: "0029", q: 2,
    passa: ["o if fica fácil de ler", "se lê como uma frase", "fica claro o que ela checa"],
    falha: ["porque vale a pena", "porque é uma pergunta", "ele é bonito", "porque sim"] },
  // 0030: escopo
  { aula: "0030", q: 1,
    passa: ["variável criada dentro da função que só existe ali", "só existe dentro da função", "uma variável que não existe fora da função em que foi criada"],
    falha: ["variável global que vale dentro e fora da função", "uma variável do programa todo", "qualquer variável"] },
  // 0031: composição e docstring
  { aula: "0031", q: 2,
    passa: ["a função termina", "encerra a função na hora", "as linhas depois não rodam", "a função para de rodar"],
    falha: ["devolve o valor para quem chamou", "devolve o valor", "mostra na tela"] },
  { aula: "0031", q: 3,
    passa: ["são fáceis de revisar e testar", "dá para ler e auditar cada uma", "as falhas não se escondem"],
    falha: ["porque são pequenas", "porque é pequeno", "pequenas funções valem a pena"] },
];
