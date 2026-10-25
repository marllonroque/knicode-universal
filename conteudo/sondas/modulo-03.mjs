// Sondas da recuperação do Módulo 3 (aulas 0017 a 0024): respostas certas, com outras palavras, devem passar;
// respostas erradas, vagas ou que apenas ecoam a pergunta devem falhar. Rodam em `node test-conteudo.mjs`.
export default [
  // 0017: for e range
  { aula: "0017", q: 1,
    passa: ["4", "quatro", "4 vezes", "roda 4 vezes", "4 voltas, com i de 0 a 3"],
    falha: ["5 vezes, de 0 a 4", "5", "cinco vezes", "10", "não sei"] },
  { aula: "0017", q: 2,
    passa: ["0", "zero", "do zero", "começa do 0, não do 1", "começa no zero"],
    falha: ["10", "não começa do 0", "1", "do um"] },
  { aula: "0017", q: 3,
    passa: ["expõe dados de cada pessoa", "multiplica o vazamento: mil clientes expostos", "o laço repete e vaza os dados de todos", "mostra os dados pessoais de muitas pessoas na tela"],
    falha: ["vaza", "log", "porque é feio", "porque sim"] },
  // 0018: range com início, fim e passo
  { aula: "0018", q: 2,
    passa: ["range(5, 0, -1)", "range(5,0,-1)", "range com início 5, fim 0 e passo -1", "passo negativo, com fim em 0"],
    falha: ["-1", "range(5, 1, -1)", "range(5,1,-1)", "passo negativo", "range(1, 5)"] },
  // 0019: acumuladores
  { aula: "0019", q: 2,
    passa: ["porque o zero não altera a soma", "zero somado a qualquer número não muda", "é o elemento neutro da soma", "se começasse em 5 o total ficaria errado"],
    falha: ["porque começa do zero", "porque é o primeiro", "para ficar bonito"] },
  { aula: "0019", q: 3,
    passa: ["volta a 0", "ele volta a 0 a cada volta", "o total é zerado a cada volta", "recomeça do zero toda volta", "perderia o total anterior"],
    falha: ["porque não", "porque é errado", "para o programa rodar mais rápido"] },
  // 0020: while
  { aula: "0020", q: 2,
    passa: ["laço que roda pra sempre porque a condição nunca fica falsa", "while que nunca termina porque nada muda a condição", "loop infinito, a condição sempre verdadeira e nunca atualizada", "um laço que nunca para porque a variável da condição não muda"],
    falha: ["laço que nunca roda porque a condição é falsa", "um while", "nunca"] },
  { aula: "0020", q: 3,
    passa: ["para o atacante não prender o servidor para sempre", "se o fim nunca chegar o sistema fica preso e gasta recursos", "o programa pode travar e negar serviço a outros clientes"],
    falha: ["nunca", "para ficar bonito", "porque sim", "para não dar erro"] },
  // 0021: break e continue
  { aula: "0021", q: 1,
    passa: ["encerra o laço", "sai do laço de vez", "interrompe a repetição imediatamente", "para o laço"],
    falha: ["pula o resto da volta e vai para a próxima", "pula a volta atual", "continua o laço", "mostra o número"] },
  { aula: "0021", q: 2,
    passa: ["pula o resto da volta e vai para a próxima", "pula só esta volta", "ignora o resto do bloco e segue para a próxima volta"],
    falha: ["pula o laço inteiro", "encerra o laço", "para tudo", "pula o laço"] },
  { aula: "0021", q: 3,
    passa: ["registrar o que foi pulado para não esconder uma fraude", "pode ser um erro e ninguém fica sabendo"],
    falha: ["logo", "porque sim"] },
  // 0022: laço de validação
  { aula: "0022", q: 2,
    passa: ["enquanto não for válida", "enquanto a resposta for inválida", "enquanto ainda não serve", "enquanto estiver errada"],
    falha: ["válida ou inválida", "enquanto for válida", "enquanto a resposta for válida ou inválida", "enquanto"] },
  { aula: "0022", q: 3,
    passa: ["contando as tentativas e bloqueando depois de 3 erros", "limitando as tentativas com um contador e parando no limite", "com um contador de tentativas e um break", "usando contador e sair do laço depois de 3 vezes"],
    falha: ["limitar as tentativas", "tentando de novo", "com um contador", "porque sim"] },
  // 0023: padrões de laço
  { aula: "0023", q: 2,
    passa: ["só soma 1 quando uma condição é verdadeira", "só aumenta se a condição for verdadeira", "conta apenas os itens que atendem à condição", "soma 1 somente quando o if é verdadeiro"],
    falha: ["um contador que soma", "é um contador com if", "conta tudo", "variável que guarda um número"] },
  { aula: "0023", q: 3,
    passa: ["se nenhum valor superar o inicial, ele vira o resultado", "com só números negativos o 0 vence", "o zero ganha mesmo sem estar na lista", "o inicial pode ser maior que todos os valores"],
    falha: ["o valor inicial", "porque o valor inicial pode dar resultado errado", "porque o inicial", "zero"] },
];
