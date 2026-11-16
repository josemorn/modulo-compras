# Registro de defectos

Fuente: `evidencias/pruebas-iniciales.txt` (12 de 18 pruebas fallan sobre el código inicial). Los defectos se agrupan por causa raíz.

| ID | Requisito | Severidad | Casos que lo evidencian | Estado |
|----|-----------|-----------|-------------------------|--------|
| D-01 | RF-03 | Media | CP-07, CP-08 | Corregido |
| D-02 | RF-04 | Alta | CP-09, CP-10, CP-11, CP-12, CP-13 | Corregido |
| D-03 | RF-05 | Alta | CP-14, CP-15, CP-16, CP-17, CP-18 | Corregido |

## D-01 – El total no se redondea a dos decimales

- **Requisito:** RF-03.
- **Severidad:** Media. El monto cobrado difiere del monto calculable en centavos y puede arrastrar diferencias contables.
- **Pasos para reproducir:**
  1. `const { calcularTotal } = require("./src/compras");`
  2. `calcularTotal(19.99, 3, 15)`
- **Resultado esperado:** `50.97`
- **Resultado real:** `50.9745`
- **Evidencia:** CP-07 y CP-08 en `evidencias/pruebas-iniciales.txt` (con `33.33, 3, 7` devuelve `92.99069999999999`).
- **Causa raíz:** la función devuelve `subtotal - valorDescuento` sin redondear.

## D-02 – No se validan los rangos de entrada

- **Requisito:** RF-04.
- **Severidad:** Alta. Permite totales negativos, descuentos mayores que el precio y ventas con cantidad 0.
- **Pasos para reproducir:**
  1. `calcularTotal(-1, 1, 0)`
  2. `calcularTotal(10, 0, 0)`
  3. `calcularTotal(10, 1, 100.01)`
- **Resultado esperado:** `RangeError` en los tres casos.
- **Resultado real:** `-1`, `0` y `-0.0009999999999994458`, sin ningún error.
- **Evidencia:** CP-09 a CP-13 en `evidencias/pruebas-iniciales.txt`.
- **Causa raíz:** la función no comprueba precio >= 0, cantidad > 0 ni descuento entre 0 y 100.

## D-03 – No se validan los tipos ni los valores no finitos

- **Requisito:** RF-05.
- **Severidad:** Alta. Los valores inválidos se convierten en silencio (texto a número, `null` a 0) o propagan `NaN` e infinitos hasta el cobro.
- **Pasos para reproducir:**
  1. `calcularTotal("10", 2, 0)`
  2. `calcularTotal(10, NaN, 0)`
  3. `calcularTotal(10, null, 0)`
  4. `calcularTotal(10, 1, Infinity)`
- **Resultado esperado:** `TypeError` en los cuatro casos.
- **Resultado real:** `20`, `NaN`, `0` y `-Infinity`, sin ningún error.
- **Evidencia:** CP-14 a CP-18 en `evidencias/pruebas-iniciales.txt`.
- **Causa raíz:** la función no comprueba `typeof` ni `Number.isFinite`; los operadores aritméticos de JavaScript aplican coerción implícita.

## Orden de corrección

D-03 (tipos) -> D-02 (rangos) -> D-01 (redondeo). Se corrige primero la validación de tipos porque la validación de rangos depende de que las entradas sean números. Tras cada corrección se ejecuta toda la suite (ver `evidencias/regresion-incremental.txt`).
