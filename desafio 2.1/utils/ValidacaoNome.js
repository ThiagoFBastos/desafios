export default class ValidacaoNome {
    static valida(nome) {
        return typeof(nome) == 'string' && nome.length >= 5 && nome.length <= 60;
    }
}
