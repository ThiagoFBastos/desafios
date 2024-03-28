export default class ValidacaoEstadoCivil {
    static valida(estado_civil) {
        const re = /^[cCsSvVdD]$/;
        return typeof(estado_civil) == 'string' && re.test(estado_civil);
    }
}
