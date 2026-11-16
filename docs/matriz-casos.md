# Matriz de casos de prueba

Función bajo prueba: `calcularTotal(precio, cantidad, descuento)`. Cada caso se automatiza en `tests/compras.test.js` con el mismo ID en el nombre de la prueba.

| ID | Requisito | Técnica | Datos (precio, cantidad, descuento) | Resultado esperado | Prioridad | Estado inicial | Estado final |
|----|-----------|---------|------|------|------|------|------|
| CP-01 | RF-01 | Partición válida | `10, 3, 0` | 30 | Alta | Automatizado: Pasó | — |
| CP-02 | RF-01 | Partición válida (decimal) | `19.99, 2, 0` | 39.98 | Media | Automatizado: Pasó | — |
| CP-03 | RF-01 | Valor límite (precio = 0) | `0, 5, 10` | 0 | Media | Automatizado: Pasó | — |
| CP-04 | RF-02 | Partición válida | `100, 1, 10` | 90 | Alta | Automatizado: Pasó | — |
| CP-05 | RF-02 | Valor límite inferior (0 %) | `50, 2, 0` | 100 | Alta | Automatizado: Pasó | — |
| CP-06 | RF-02, RF-03 | Valor límite superior (100 %) | `100, 1, 100` | 0 | Alta | Automatizado: Pasó | — |
| CP-07 | RF-03 | Partición válida (redondeo) | `19.99, 3, 15` | 50.97 | Alta | Automatizado: Falló | — |
| CP-08 | RF-03 | Partición válida (decimales) | `33.33, 3, 7` | 92.99 (máx. 2 decimales) | Media | Automatizado: Falló | — |
| CP-09 | RF-04 | Partición inválida (precio < 0) | `-1, 1, 0` | RangeError | Alta | Automatizado: Falló | — |
| CP-10 | RF-04 | Valor límite (cantidad = 0) | `10, 0, 0` | RangeError | Alta | Automatizado: Falló | — |
| CP-11 | RF-04 | Partición inválida (cantidad < 0) | `10, -2, 0` | RangeError | Alta | Automatizado: Falló | — |
| CP-12 | RF-04 | Valor límite (descuento -0.01) | `10, 1, -0.01` | RangeError | Alta | Automatizado: Falló | — |
| CP-13 | RF-04 | Valor límite (descuento 100.01) | `10, 1, 100.01` | RangeError | Alta | Automatizado: Falló | — |
| CP-14 | RF-05 | Dato inválido (texto) | `"10", 2, 0` | TypeError | Alta | Automatizado: Falló | — |
| CP-15 | RF-05 | Dato inválido (NaN) | `10, NaN, 0` | TypeError | Alta | Automatizado: Falló | — |
| CP-16 | RF-05 | Dato inválido (Infinity) | `10, 1, Infinity` | TypeError | Media | Automatizado: Falló | — |
| CP-17 | RF-05 | Dato inválido (null) | `10, null, 0` | TypeError | Media | Automatizado: Falló | — |
| CP-18 | RF-05 | Dato inválido (omitido) | `10, 1, (sin tercer argumento)` | TypeError | Media | Automatizado: Falló | — |

## Cobertura de técnicas

- **Partición de equivalencia:** clases válidas (precio, cantidad y descuento positivos o en rango) e inválidas (precio < 0, cantidad < 0).
- **Análisis de valores límite:** descuento 0 y 100 (válidos); -0.01 y 100.01 (inválidos); cantidad 0 (inválida); precio 0 (válido, supuesto A-01).
- **Datos inválidos / adivinanza de errores:** texto, NaN, Infinity, null y parámetro omitido.

## Cobertura por requisito

| Requisito | Casos |
|-----------|-------|
| RF-01 | CP-01, CP-02, CP-03 |
| RF-02 | CP-04, CP-05, CP-06 |
| RF-03 | CP-06, CP-07, CP-08 |
| RF-04 | CP-09, CP-10, CP-11, CP-12, CP-13 |
| RF-05 | CP-14, CP-15, CP-16, CP-17, CP-18 |
| RNF-01 | Medición exploratoria (`scripts/rendimiento.js`), sin caso automatizado |
