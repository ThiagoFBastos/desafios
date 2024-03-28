export default class ValidacaoCPF {

    static validaFormato(cpf) {
        return typeof(cpf) == 'string' && ValidacaoCPF.#testaDigitos(cpf) && ValidacaoCPF.#testaDigitosIguais(cpf);
    }

    static #testaDigitos(cpf) {
        const re = /^\d{11}$/;
        return re.test(cpf);
    }

    static #testaDigitosIguais(cpf) {
        let digitos = cpf.split('');
        return !digitos.every(digito => digito == digitos[0]);
    }

    static validaDV(cpf) {
        let digitos = cpf.split('').map(digito => parseInt(digito));
     
        let J = 0, K = 0;

        for(let i = 0; i < 9; ++i) {
            J += (10 - i) * digitos[i];
            K += (11 - i) * digitos[i];
        }

        J %= 11;
        
        if(J <= 1) J = 0;
        else J = 11 - J;

        K += 2 * J;
        K %= 11;
    
        if(K <= 1) K = 0;
        else K = 11 - K;

        return digitos[9] == J && digitos[10] == K;
    }
}
