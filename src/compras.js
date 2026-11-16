function validarNumero(valor) {
  if (typeof valor !== "number" || !Number.isFinite(valor)) {
    throw new TypeError("Los argumentos deben ser números finitos");
  }
}

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
  return subtotal - valorDescuento;
}
module.exports = { calcularTotal };
