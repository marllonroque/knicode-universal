/* Guarda de entrada. Roda no <head> de toda página que não é o painel (o build troca __HOME__ pelo caminho do painel).
   Regra: ABRIR o arquivo (carregamento novo, vindo de fora do curso) leva ao painel dos módulos.
          Seguir um link do próprio curso, RECARREGAR (F5) ou voltar/avançar no navegador NÃO muda de página,
          para não perder exercício em andamento. O curso.js marca "curso.interno" quando o aluno clica num link do curso. */
(function () {
  try {
    if (!/^(file|https?):$/.test(location.protocol)) return;
    var nav = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || {};
    var type = nav.type || (performance.navigation && ["navigate", "reload", "back_forward"][performance.navigation.type]) || "navigate";
    var ss = window.sessionStorage;
    var interno = ss.getItem("curso.interno") === "1";
    ss.removeItem("curso.interno");
    if (type === "navigate" && !interno) location.replace(__HOME__);
  } catch (e) { /* sem sessionStorage ou performance: não redireciona (mais seguro que perder trabalho) */ }
})();
