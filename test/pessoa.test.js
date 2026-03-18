const Pessoa = require('../src/pessoa');

describe('Classe Pessoa', () => {
    let pessoa;

    // antes de cada teste, redefine a instância para um objeto padrão
    beforeEach(() => {
        pessoa = new Pessoa('João', 25);
    });

    test('Deve criar uma pessoa com nome e idade corretos', () => {
        expect(pessoa.nome).toBe('João');
        expect(pessoa.idade).toBe(25);
    });

    test('Método apresentar deve retornar a mensagem correta', () => {
        // reatribui nome/idade para garantir independência do estado
        pessoa.nome = 'Maria';
        pessoa.idade = 30;
        expect(pessoa.apresentar()).toBe('Olá, meu nome é Maria e eu tenho 30 anos.');
    });

    test('Método atualizarIdade deve alterar a idade corretamente', () => {
        pessoa.atualizarIdade(25);
        expect(pessoa.idade).toBe(25);
    });

    test('Deve lidar com idade zero', () => {
        pessoa = new Pessoa('Ana', 0);
        expect(pessoa.idade).toBe(0);
        expect(pessoa.apresentar()).toBe('Olá, meu nome é Ana e eu tenho 0 anos.');
    });
});