# Reporte de pruebas – Módulo de cálculo de compras

## 1. Resumen

| Indicador | Código inicial | Código corregido |
|-----------|----------------|------------------|
| Casos automatizados | 18 | 18 |
| Pasan | 6 | 18 |
| Fallan | 12 | 0 |
| Defectos abiertos | 3 | 0 |
| Cobertura de sentencias, ramas, funciones y líneas | No medida | 100 % |

Se confirmaron tres defectos (D-01, D-02 y D-03). Se corrigieron de uno en uno, ejecutando la suite completa tras cada corrección, sin modificar requisitos ni pruebas.

## 2. Resultados de la ejecución

Evidencias: `evidencias/pruebas-iniciales.txt`, `evidencias/regresion-incremental.txt`, `evidencias/pruebas-finales.txt` y `evidencias/cobertura.txt`.

| Momento | Fallan | Pasan | Observación |
|---------|--------|-------|-------------|
| Código inicial | 12 | 6 | Fallan CP-07 a CP-18 |
| Tras corregir D-03 (tipos) | 7 | 11 | Se resuelven CP-14 a CP-18; no hay regresión en CP-01 a CP-06 |
| Tras corregir D-02 (rangos) | 2 | 16 | Se resuelven CP-09 a CP-13 |
| Tras corregir D-01 (redondeo) | 0 | 18 | Se resuelven CP-07 y CP-08 |

**Regresión:** tras cada corrección se ejecutaron los 18 casos. Los seis casos válidos que pasaban desde el inicio (CP-01 a CP-06) siguieron pasando en las tres ejecuciones, es decir, ninguna corrección rompió el comportamiento previo.

## 3. Defectos

| ID | Requisito | Severidad | Estado | Commit de corrección |
|----|-----------|-----------|--------|----------------------|
| D-01 | RF-03 | Media | Corregido | `fix(D-01)` |
| D-02 | RF-04 | Alta | Corregido | `fix(D-02)` |
| D-03 | RF-05 | Alta | Corregido | `fix(D-03)` |

Detalle (pasos, esperado, real y evidencia) en `docs/registro-defectos.md`.

## 4. Cobertura por requisito

| Requisito | Casos | Resultado final |
|-----------|-------|-----------------|
| RF-01 | CP-01, CP-02, CP-03 | Cubierto, pasa |
| RF-02 | CP-04, CP-05, CP-06 | Cubierto, pasa |
| RF-03 | CP-06, CP-07, CP-08 | Cubierto, pasa |
| RF-04 | CP-09 a CP-13 | Cubierto, pasa |
| RF-05 | CP-14 a CP-18 | Cubierto, pasa |
| RNF-01 | Medición exploratoria | Cubierto de forma limitada |

La cobertura de código es del 100 %, pero **no demuestra ausencia de defectos**: solo indica que cada línea y rama se ejecutó. La confianza proviene de que los casos salen de la especificación (partición y valores límite) y no del código.

## 5. Rendimiento exploratorio (RNF-01)

Evidencia: `evidencias/rendimiento.txt`, generada con `npm run perf`.

- **Método:** 100 000 llamadas de calentamiento y 7 repeticiones de 1 000 000 de llamadas con entradas variadas; se reporta la mediana.
- **Resultado en el entorno de medición:** mediana de alrededor de 10 ms por millón de llamadas, es decir, unos 10 ns por llamada.
- **Lectura:** la validación y el redondeo añadidos no introducen un costo apreciable para este uso.

**Limitaciones:** el valor depende del equipo, de Node.js y de la carga del sistema; no se midió el código inicial para comparar; el RNF-01 no define umbral numérico, por lo que no hay veredicto de cumple o no cumple; no es una prueba de carga ni de estrés, y no incluye memoria ni ejecución concurrente.

## 6. Riesgos residuales

| ID | Riesgo | Mitigación sugerida |
|----|--------|---------------------|
| RR-01 | Con entradas finitas pero enormes (por ejemplo `calcularTotal(1e308, 10, 0)`) el producto desborda y la función devuelve `NaN` sin lanzar error; RF-05 solo exige validar las entradas | Proponer un requisito sobre el resultado no finito y agregar un caso |
| RR-02 | Cantidad no entera (`10, 1.5`) se acepta y no está especificada (A-02) | Confirmar con negocio si la cantidad debe ser entera |
| RR-03 | El redondeo en casos de empate depende de la representación binaria (A-05) | Definir la regla de redondeo y probar casos de empate |
| RR-04 | Solo hay pruebas unitarias; no hay pruebas de integración con facturación ni de interfaz | Ampliar en una siguiente iteración |
| RR-05 | Las pruebas son ejemplos fijos; no se aplicaron pruebas basadas en propiedades | Evaluar una librería de propiedades para el redondeo |

## 7. Conclusión

El módulo cumple RF-01 a RF-05 con las 18 pruebas definidas y sin defectos abiertos. Los criterios de salida del plan se cumplen, con los riesgos residuales de la sección 6 documentados.
