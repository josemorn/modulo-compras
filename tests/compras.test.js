const { calcularTotal } = require("../src/compras");

describe("RF-01 Subtotal (precio x cantidad)", () => {
  test("CP-01 partición válida: 10 x 3 sin descuento = 30", () => {
    expect(calcularTotal(10, 3, 0)).toBe(30);
  });
  test("CP-02 precio decimal: 19.99 x 2 sin descuento = 39.98", () => {
    expect(calcularTotal(19.99, 2, 0)).toBe(39.98);
  });
  test("CP-03 precio cero es válido y produce total 0 (supuesto A-01)", () => {
    expect(calcularTotal(0, 5, 10)).toBe(0);
  });
});

describe("RF-02 Descuento de 0 a 100 %", () => {
  test("CP-04 partición válida: 10 % sobre 100 = 90", () => {
    expect(calcularTotal(100, 1, 10)).toBe(90);
  });
  test("CP-05 límite inferior: descuento 0 no altera el subtotal", () => {
    expect(calcularTotal(50, 2, 0)).toBe(100);
  });
  test("CP-06 límite superior: descuento 100 produce total 0", () => {
    expect(calcularTotal(100, 1, 100)).toBe(0);
  });
});

describe("RF-03 Total con dos decimales", () => {
  test("CP-07 redondeo: 19.99 x 3 con 15 % = 50.97", () => {
    expect(calcularTotal(19.99, 3, 15)).toBe(50.97);
  });
  test("CP-08 el resultado nunca tiene más de dos decimales", () => {
    const total = calcularTotal(33.33, 3, 7);
    expect(Math.round(total * 100) / 100).toBe(total);
  });
});

describe("RF-04 RangeError por valores fuera de rango", () => {
  test("CP-09 precio negativo (-1)", () => {
    expect(() => calcularTotal(-1, 1, 0)).toThrow(RangeError);
  });
  test("CP-10 cantidad cero", () => {
    expect(() => calcularTotal(10, 0, 0)).toThrow(RangeError);
  });
  test("CP-11 cantidad negativa (-2)", () => {
    expect(() => calcularTotal(10, -2, 0)).toThrow(RangeError);
  });
  test("CP-12 descuento bajo el límite (-0.01)", () => {
    expect(() => calcularTotal(10, 1, -0.01)).toThrow(RangeError);
  });
  test("CP-13 descuento sobre el límite (100.01)", () => {
    expect(() => calcularTotal(10, 1, 100.01)).toThrow(RangeError);
  });
});

describe("RF-05 TypeError por entradas no numéricas o no finitas", () => {
  test("CP-14 precio como texto numérico (\"10\")", () => {
    expect(() => calcularTotal("10", 2, 0)).toThrow(TypeError);
  });
  test("CP-15 cantidad NaN", () => {
    expect(() => calcularTotal(10, NaN, 0)).toThrow(TypeError);
  });
  test("CP-16 descuento Infinity", () => {
    expect(() => calcularTotal(10, 1, Infinity)).toThrow(TypeError);
  });
  test("CP-17 cantidad null", () => {
    expect(() => calcularTotal(10, null, 0)).toThrow(TypeError);
  });
  test("CP-18 descuento indefinido (parámetro omitido)", () => {
    expect(() => calcularTotal(10, 1)).toThrow(TypeError);
  });
});
