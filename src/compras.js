function validarNumero(valor) {
  if (typeof valor !== "number" || !Number.isFinite(valor)) {
    throw new TypeError("Los argumentos deben ser números finitos");
  }
}

function calcularTotal(precio, cantidad, descuento) {
  validarNumero(precio);
  validarNumero(cantidad);
  validarNumero(descuento);
  const subtotal = precio * cantidad;
  const valorDescuento = subtotal * descuento / 100;
  return subtotal - valorDescuento;
}
module.exports = { calcularTotal };
