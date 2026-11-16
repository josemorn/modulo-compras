function validarNumero(valor) {
  if (typeof valor !== "number" || !Number.isFinite(valor)) {
    throw new TypeError("Los argumentos deben ser números finitos");
  }
}

function redondear2(valor) {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

/**
 * Calcula el total de una compra con descuento porcentual.
 * @param {number} precio Precio unitario (>= 0).
 * @param {number} cantidad Cantidad de unidades (> 0).
 * @param {number} descuento Porcentaje de descuento (0 a 100).
 * @returns {number} Total con dos decimales.
 * @throws {TypeError} Si algún argumento no es un número finito.
 * @throws {RangeError} Si precio, cantidad o descuento están fuera de rango.
 */
function calcularTotal(precio, cantidad, descuento) {
  validarNumero(precio);
  validarNumero(cantidad);
  validarNumero(descuento);
  if (precio < 0) {
    throw new RangeError("El precio no puede ser negativo");
  }
  if (cantidad <= 0) {
    throw new RangeError("La cantidad debe ser mayor que cero");
  }
  if (descuento < 0 || descuento > 100) {
    throw new RangeError("El descuento debe estar entre 0 y 100");
  }
  const subtotal = precio * cantidad;
  const valorDescuento = subtotal * descuento / 100;
  return redondear2(subtotal - valorDescuento);
}

module.exports = { calcularTotal };
