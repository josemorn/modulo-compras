// Medición exploratoria de rendimiento (RNF-01). No es una prueba de carga formal.
const os = require("os");
const { performance } = require("perf_hooks");
const { calcularTotal } = require("../src/compras");

const ITERACIONES = 1_000_000;
const REPETICIONES = 7;
const CALENTAMIENTO = 100_000;

function ejecutar(n) {
  let acumulado = 0;
  for (let i = 0; i < n; i++) {
    acumulado += calcularTotal(19.99 + (i % 50), 1 + (i % 9), i % 101);
  }
  return acumulado; // se usa para que el motor no elimine el bucle
}

ejecutar(CALENTAMIENTO);
const tiemposMs = [];
for (let r = 0; r < REPETICIONES; r++) {
  const t0 = performance.now();
  ejecutar(ITERACIONES);
  tiemposMs.push(performance.now() - t0);
}
tiemposMs.sort((a, b) => a - b);
const mediana = tiemposMs[Math.floor(tiemposMs.length / 2)];

console.log("Entorno");
console.log("  Node.js:", process.version);
console.log("  SO:", os.type(), os.release(), os.arch());
console.log("  CPU:", os.cpus()[0].model, "(" + os.cpus().length + " núcleos)");
console.log("  RAM total (GB):", (os.totalmem() / 1024 ** 3).toFixed(1));
console.log("Parámetros");
console.log("  Iteraciones por repetición:", ITERACIONES, "| repeticiones:", REPETICIONES, "| calentamiento:", CALENTAMIENTO);
console.log("Resultados (ms por 1 000 000 de llamadas)");
console.log("  Mínimo:", tiemposMs[0].toFixed(1), "| Mediana:", mediana.toFixed(1), "| Máximo:", tiemposMs[tiemposMs.length - 1].toFixed(1));
console.log("  Tiempo medio por llamada (ns):", ((mediana * 1e6) / ITERACIONES).toFixed(1));
