# Módulo de cálculo de compras – Pruebas dinámicas (VVS, Unidad 2)

Laboratorio de evaluación dinámica: diseño de casos, automatización con Jest y gestión de defectos sobre `calcularTotal(precio, cantidad, descuento)`.

## Estructura

```
src/            Código bajo prueba (compras.js)
tests/          Pruebas Jest (compras.test.js, 18 casos)
docs/           plan-pruebas.md, matriz-casos.md, registro-defectos.md, reporte-pruebas.md
evidencias/     pruebas-iniciales, regresion-incremental, pruebas-finales, cobertura, rendimiento
scripts/        rendimiento.js (medición exploratoria)
```

## Cómo ejecutar

```bash
npm install
npm test               # jest --runInBand
npm run test:coverage  # con cobertura
npm run perf           # medición exploratoria (RNF-01)
```

Requiere Node.js 18 o superior.

## Historial para reproducir el antes y el después

| Commit | Contenido | Resultado de `npm test` |
|--------|-----------|-------------------------|
| `test: configurar Jest...` | Código inicial con defectos | 12 fallan, 6 pasan |
| `fix(D-03)` | Validación de tipos | 7 fallan |
| `fix(D-02)` | Validación de rangos | 2 fallan |
| `fix(D-01)` | Redondeo a dos decimales | 18 pasan |

Para ver el código inicial: `git checkout <hash del commit de tests>` y `npm test`; volver con `git checkout main`.

## Resultado

3 defectos confirmados y corregidos; 18/18 pruebas; cobertura 100 %. Detalle en `docs/reporte-pruebas.md`.
