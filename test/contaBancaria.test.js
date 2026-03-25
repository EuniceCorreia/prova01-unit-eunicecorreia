const ContaBancaria = require('../src/contaBancaria');

describe('ContaBancaria', () => {
  let conta;
  let contaBancaria;

  beforeEach(() => {
    conta = {
      id: 1,
      titular: 'João',
      saldo: 100,
      limite: 50,
      status: 'ativa',
      atualizadaEm: null,
    };

    contaBancaria = new ContaBancaria(conta);
  });

  test('deve obter dados básicos', () => {
    expect(contaBancaria.obterSaldo()).toBe(100);
    expect(contaBancaria.obterTitular()).toBe('João');
    expect(contaBancaria.obterStatus()).toBe('ativa');
    expect(contaBancaria.estaAtiva()).toBe(true);
    expect(contaBancaria.obterLimite()).toBe(50);
  });

  test('depositar valor válido', () => {
    const result = contaBancaria.depositar(50);
    expect(result).toBe(true);
    expect(conta.saldo).toBe(150);
    expect(conta.atualizadaEm).toBeInstanceOf(Date);
  });

  test('não deve depositar valor inválido', () => {
    expect(contaBancaria.depositar(0)).toBe(false);
    expect(contaBancaria.depositar(-10)).toBe(false);
  });

  test('sacar valor válido', () => {
    const result = contaBancaria.sacar(120);
    expect(result).toBe(true);
    expect(conta.saldo).toBe(-20);
  });

  test('não deve sacar valor inválido ou acima do limite', () => {
    expect(contaBancaria.sacar(0)).toBe(false);
    expect(contaBancaria.sacar(-10)).toBe(false);
    expect(contaBancaria.sacar(1000)).toBe(false);
  });

  test('alterar titular', () => {
    expect(contaBancaria.alterarTitular('Maria')).toBe(true);
    expect(conta.titular).toBe('Maria');

    expect(contaBancaria.alterarTitular(null)).toBe(false);
  });

  test('bloquear conta', () => {
    expect(contaBancaria.bloquearConta()).toBe(true);
    expect(conta.status).toBe('bloqueada');

    expect(contaBancaria.bloquearConta()).toBe(false);
  });

  test('ativar conta', () => {
    conta.status = 'bloqueada';
    expect(contaBancaria.ativarConta()).toBe(true);
    expect(conta.status).toBe('ativa');

    expect(contaBancaria.ativarConta()).toBe(false);
  });

  test('encerrar conta', () => {
    expect(contaBancaria.encerrarConta()).toBe(false);

    conta.saldo = 0;
    expect(contaBancaria.encerrarConta()).toBe(true);
    expect(conta.status).toBe('encerrada');
  });

  test('pode sacar', () => {
    expect(contaBancaria.podeSacar(100)).toBe(true);
    expect(contaBancaria.podeSacar(200)).toBe(false);
    expect(contaBancaria.podeSacar(0)).toBe(false);
  });

  test('aplicar tarifa', () => {
    expect(contaBancaria.aplicarTarifa(10)).toBe(true);
    expect(conta.saldo).toBe(90);

    expect(contaBancaria.aplicarTarifa(0)).toBe(false);
  });

  test('ajustar limite', () => {
    expect(contaBancaria.ajustarLimite(100)).toBe(true);
    expect(conta.limite).toBe(100);

    expect(contaBancaria.ajustarLimite(-1)).toBe(false);
  });

  test('saldo negativo', () => {
    conta.saldo = -10;
    expect(contaBancaria.saldoNegativo()).toBe(true);

    conta.saldo = 10;
    expect(contaBancaria.saldoNegativo()).toBe(false);
  });

  test('transferir com sucesso', () => {
    const destino = new ContaBancaria({
      id: 2,
      titular: 'Maria',
      saldo: 0,
      limite: 0,
      status: 'ativa',
    });

    const result = contaBancaria.transferir(50, destino);
    expect(result).toBe(true);
    expect(conta.saldo).toBe(50);
    expect(destino.obterSaldo()).toBe(50);
  });

  test('falha ao transferir', () => {
    const destino = new ContaBancaria({
      id: 2,
      titular: 'Maria',
      saldo: 0,
      limite: 0,
      status: 'ativa',
    });

    expect(contaBancaria.transferir(1000, destino)).toBe(false);
  });

  test('calcular saldo disponível', () => {
    expect(contaBancaria.calcularSaldoDisponivel()).toBe(150);
  });

  test('gerar resumo', () => {
    const resumo = contaBancaria.gerarResumo();

    expect(resumo).toEqual({
      titular: 'João',
      saldo: 100,
      limite: 50,
      disponivel: 150,
      status: 'ativa',
    });
  });

  test('validar conta', () => {
    expect(contaBancaria.validarConta()).toBe(true);

    conta.id = null;
    expect(contaBancaria.validarConta()).toBe(false);

    conta.id = 1;
    conta.titular = null;
    expect(contaBancaria.validarConta()).toBe(false);

    conta.titular = 'João';
    conta.saldo = 'abc';
    expect(contaBancaria.validarConta()).toBe(false);

    conta.saldo = 100;
    conta.limite = -1;
    expect(contaBancaria.validarConta()).toBe(false);

    conta.limite = 10;
    conta.status = 'invalido';
    expect(contaBancaria.validarConta()).toBe(false);
  });

  test('resetar conta', () => {
    contaBancaria.resetarConta();

    expect(conta.saldo).toBe(0);
    expect(conta.limite).toBe(0);
    expect(conta.status).toBe('ativa');
    expect(conta.atualizadaEm).toBeInstanceOf(Date);
  });
});