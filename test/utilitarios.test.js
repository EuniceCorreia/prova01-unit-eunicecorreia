const Utilitarios = require('../src/utilitarios');

describe('Classe utilitarios', () => {
  let utils;

  beforeEach(() => {
    utils = new Utilitarios();
  });

  // Strings
  test('inverterString', () => {
    expect(utils.inverterString('abc')).toBe('cba');
  });

  test('contarCaracteres', () => {
    expect(utils.contarCaracteres('hello')).toBe(5);
  });

  test('paraMaiusculas', () => {
    expect(utils.paraMaiusculas('abc')).toBe('ABC');
  });

  test('paraMinusculas', () => {
    expect(utils.paraMinusculas('ABC')).toBe('abc');
  });

  test('primeiraLetraMaiuscula', () => {
    expect(utils.primeiraLetraMaiuscula('teste')).toBe('Teste');
  });

  // Matemática
  test('somar', () => {
    expect(utils.somar(2, 3)).toBe(5);
  });

  test('subtrair', () => {
    expect(utils.subtrair(5, 3)).toBe(2);
  });

  test('multiplicar', () => {
    expect(utils.multiplicar(2, 3)).toBe(6);
  });

  test('dividir', () => {
    expect(utils.dividir(6, 2)).toBe(3);
  });

  test('dividir por zero deve lançar erro', () => {
    expect(() => utils.dividir(5, 0)).toThrow('Divisão por zero');
  });

  test('ehPar', () => {
    expect(utils.ehPar(4)).toBe(true);
    expect(utils.ehPar(5)).toBe(false);
  });

  // Arrays
  test('primeiroElemento', () => {
    expect(utils.primeiroElemento([1, 2, 3])).toBe(1);
  });

  test('ultimoElemento', () => {
    expect(utils.ultimoElemento([1, 2, 3])).toBe(3);
  });

  test('tamanhoArray', () => {
    expect(utils.tamanhoArray([1, 2, 3])).toBe(3);
  });

  test('ordenarArray', () => {
    expect(utils.ordenarArray([3, 1, 2])).toEqual([1, 2, 3]);
  });

  test('inverterArray', () => {
    expect(utils.inverterArray([1, 2, 3])).toEqual([3, 2, 1]);
  });

  test('removerDuplicados', () => {
    expect(utils.removerDuplicados([1, 1, 2, 3])).toEqual([1, 2, 3]);
  });

  test('mediaArray', () => {
    expect(utils.mediaArray([2, 4, 6])).toBe(4);
    expect(utils.mediaArray([])).toBe(0);
  });

  // Outros
  test('gerarNumeroAleatorio', () => {
    const num = utils.gerarNumeroAleatorio(10);
    expect(num).toBeGreaterThanOrEqual(0);
    expect(num).toBeLessThan(10);
  });

  test('ehNumero', () => {
    expect(utils.ehNumero(10)).toBe(true);
    expect(utils.ehNumero('10')).toBe(false);
    expect(utils.ehNumero(NaN)).toBe(false);
  });

  test('removerEspacos', () => {
    expect(utils.removerEspacos('  teste  ')).toBe('teste');
  });

  test('repetirTexto', () => {
    expect(utils.repetirTexto('a', 3)).toBe('aaa');
  });

  test('juntarArray', () => {
    expect(utils.juntarArray([1, 2, 3], '-')).toBe('1-2-3');
  });

  test('contarPalavras', () => {
    expect(utils.contarPalavras('olá mundo aqui')).toBe(3);
  });

  test('ehPalindromo', () => {
    expect(utils.ehPalindromo('Ame a ema')).toBe(true);
    expect(utils.ehPalindromo('teste')).toBe(false);
  });

  test('mesclarObjetos', () => {
    expect(utils.mesclarObjetos({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });
});