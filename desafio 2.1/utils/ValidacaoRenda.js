export default class ValidacaoRenda {
    static valida(renda) {
        const re = /^\d+,\d{2}$/;
        return typeof(renda) == 'string' && re.test(renda);
    }
}
