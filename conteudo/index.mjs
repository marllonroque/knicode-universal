// Índice do conteúdo: reúne os módulos, dá a cada aula o nome do arquivo e garante ids únicos e em ordem.
import m01, { meta as meta01 } from "./modulo-01.mjs";
import m02, { meta as meta02 } from "./modulo-02.mjs";
import m03, { meta as meta03 } from "./modulo-03.mjs";
import m04, { meta as meta04 } from "./modulo-04.mjs";
import m05, { meta as meta05 } from "./modulo-05.mjs";
import m06, { meta as meta06 } from "./modulo-06.mjs";
import m07, { meta as meta07 } from "./modulo-07.mjs";
import m08, { meta as meta08 } from "./modulo-08.mjs";

const MODULOS = [[1, m01, meta01], [2, m02, meta02], [3, m03, meta03], [4, m04, meta04], [5, m05, meta05], [6, m06, meta06], [7, m07, meta07], [8, m08, meta08]];

export const META = {};
export const AULAS = [];
for (const [n, aulas, meta] of MODULOS) {
  META[n] = meta;
  for (const a of aulas) {
    if (a.modulo !== n) throw new Error(`aula ${a.id}: está no arquivo do módulo ${n}, mas declara módulo ${a.modulo}`);
    a.arquivo = a.arquivo || `${a.id}-${a.slug}.html`;
    AULAS.push(a);
  }
}
AULAS.sort((x, y) => x.id.localeCompare(y.id));
const ids = AULAS.map((a) => a.id);
if (new Set(ids).size !== ids.length) throw new Error("ids de aula repetidos: " + ids.filter((x, i) => ids.indexOf(x) !== i).join(", "));
