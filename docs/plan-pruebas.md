# Plan de pruebas – Módulo de cálculo de compras

## 1. Alcance

**Dentro del alcance:** la función `calcularTotal(precio, cantidad, descuento)` de `src/compras.js` frente a RF-01 a RF-05, y una exploración limitada de rendimiento (RNF-01).

**Fuera del alcance:** interfaz de usuario, base de datos, impuestos, moneda, pruebas de seguridad y carga sostenida.

## 2. Especificación y supuestos

| ID | Requisito |
|----|-----------|
| RF-01 | subtotal = precio x cantidad para números positivos |
| RF-02 | descuento de 0 a 100 % |
| RF-03 | total con dos decimales (100 % produce 0) |
| RF-04 | `RangeError` para precio negativo, cantidad <= 0 o descuento fuera de rango |
| RF-05 | `TypeError` para entradas no numéricas o no finitas |
| RNF-01 | exploración limitada de rendimiento |

Los puntos que la especificación no define se tratan como supuestos explícitos, **sin modificar los requisitos**:

| ID | Supuesto | Efecto |
|----|----------|--------|
| A-01 | Precio 0 es válido (RF-04 solo rechaza precio negativo); el total es 0 | CP-03 |
| A-02 | Cantidad no entera (por ejemplo 1.5) no está especificada | No se prueba; riesgo residual |
| A-03 | Solo `typeof` igual a `number` es válido; el texto numérico (`"10"`) se rechaza con `TypeError` | CP-14 |
| A-04 | Si una entrada incumple tipo y rango a la vez, prevalece `TypeError` | Orden de validación |
| A-05 | El redondeo a dos decimales es el habitual (mitad hacia arriba) | CP-07, CP-08 |

## 3. Riesgos y priorización

| ID | Riesgo | Probabilidad | Impacto | Pruebas |
|----|--------|--------------|---------|---------|
| RI-01 | Un descuento fuera de rango produce totales negativos o cobros indebidos | Alta | Alto | CP-12, CP-13 |
| RI-02 | Valores negativos o cantidad 0 generan ventas con total incorrecto | Alta | Alto | CP-09, CP-10, CP-11 |
| RI-03 | Texto, `null` o `NaN` se convierten en silencio y propagan errores | Alta | Alto | CP-14 a CP-18 |
| RI-04 | Totales con muchos decimales por coma flotante | Alta | Medio | CP-07, CP-08 |
| RI-05 | Degradación de rendimiento en cálculos masivos | Baja | Medio | Exploración RNF-01 |

## 4. Tipos y niveles de prueba

| Dimensión | Decisión |
|-----------|----------|
| Nivel | Prueba unitaria (una función aislada) |
| Tipo | Funcional (RF-01 a RF-05), no funcional exploratoria (RNF-01, ISO/IEC 25010: eficiencia de desempeño) y de regresión tras cada corrección |
| Enfoque | Caja negra: los casos salen de la especificación, no del código |
| Técnicas | Partición de equivalencia, valores límite y adivinanza de errores |
| Automatización | Jest, con ejecución secuencial (`--runInBand`) |

## 5. Ambiente

- Node.js (versión registrada en el reporte) y Jest instalado como dependencia de desarrollo.
- Comandos: `npm test`, `npm run test:coverage` y `npm run perf`.
- Sin servicios externos: las pruebas son deterministas y no dependen del reloj ni de la red.

## 6. Criterios de entrada y salida

**Entrada:** código inicial disponible en `src/compras.js`; especificación aprobada; Jest instalado y ejecutando; matriz de casos diseñada.

**Salida:** 100 % de los casos automatizados ejecutados; cero fallas de severidad alta abiertas; cada defecto con regresión completa en verde; evidencias inicial y final guardadas; riesgos residuales documentados.

**Suspensión:** si la suite no puede ejecutarse (error de configuración), se detiene la ejecución hasta resolverlo.

## 7. Estrategia de defectos y regresión

Cada defecto se registra en `docs/registro-defectos.md` con pasos, esperado, real, severidad y evidencia. Se corrige de a uno por commit, sin tocar los requisitos ni las pruebas, y tras cada corrección se vuelve a ejecutar **toda** la suite para detectar regresiones.
