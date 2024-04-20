import { DateTime } from 'luxon';

export interface ValidationInput<T> {
    checker: (param: T) => boolean;
    message: string;
}

export const rangeValidation = (min: number, max: number): ValidationInput<number> => {
    return {
        checker: (param: number): boolean => param >= min && param <= max,
        message: `a entrada está fora do intervalo [${min}, ${max}]`
    };
};

export const nomeValidation: ValidationInput<string> = {
    checker: (param: string): boolean => param.length >= 5,
    message: 'o nome deve conter pelo menos 5 caracteres'
};

export const cpfValidation = (): ValidationInput<string> => {
    function testDigits(cpf: string) : boolean {
        const regex: RegExp = /^\d{11}$/;
        return regex.test(cpf);
    }

    function testEqualDigits(cpf: string): boolean {
        let digits: string[] = cpf.split('');
        return !digits.every((digit: string) => digit == digits[0]);
    }

    function testVDDigits(cpf: string): boolean {
        let digits: number[] = cpf.split('').map((digit: string) => parseInt(digit));
        let J : number = 0, K: number = 0;
        for(let i = 0; i < 9; ++i) {
            J += (10 - i) * digits[i];
            K += (11 - i) * digits[i];
        }
        J %= 11;
        if(J <= 1) J = 0;
        else J = 11 - J;
        K += 2 * J;
        K %= 11;
        if(K <= 1) K = 0;
        else K = 11 - K;
        return digits[9] == J && digits[10] == K;
    }

    return {
        checker: (param: string): boolean => testDigits(param) && testEqualDigits(param) && testVDDigits(param),
        message: 'o cpf é inválido'
    }
};


export const nascimentoValidation: ValidationInput<DateTime> = {
    checker: (param: DateTime): boolean => param <= DateTime.now().minus({year: 13}),
    message: 'a idade não pode ser inferior a 13 anos'
};

export const dataOpenValidation = (data: DateTime): ValidationInput<DateTime> => {
    return {
        checker: (param: DateTime): boolean => {
            let dataParam: DateTime = data.set({hour: param.hour, minute: param.minute, second: 0, millisecond: 0});
            let dataAbertura: DateTime = data.set({hour: 8, minute: 0, second: 0, millisecond: 0});
            return dataAbertura <= dataParam;
        },
        message: 'o consultório abre às 08:00'
    }
};

export const dataFutureValidation = (data: DateTime): ValidationInput<DateTime> => {
    return {
        checker: (param: DateTime): boolean => {
            let dataParam: DateTime = data.set({hour: param.hour, minute: param.minute, second: 0, millisecond: 0});
            return dataParam >= DateTime.now();
        },
        message: 'a data de inicio deve acontecer no futuro'
    }
};

export const dataCloseValidation = (data: DateTime): ValidationInput<DateTime> => {
    return {
        checker: (param: DateTime): boolean => {
            let dataParam: DateTime = data.set({hour: param.hour, minute: param.minute, second: 0, millisecond: 0});
            let dataFechamento: DateTime = data.set({hour: 19, minute: 0, second: 0, millisecond: 0});
            return dataParam <= dataFechamento
        },
        message: 'o consultório fecha às 19:00'
    }
};

export const dataCompareValidation = (dataInicio: DateTime): ValidationInput<DateTime> => {
    return {
        checker: (param: DateTime): boolean => dataInicio < dataInicio.set({hour: param.hour, minute: param.minute, second: 0, millisecond: 0}),
        message: 'o horário inicial deve ser antes do horário final'
    };
};

export const dataRuleValidation: ValidationInput<DateTime> = {
    checker: (param: DateTime): boolean => param.minute % 15 == 0,
    message: 'os horários do consultório só funcionam de 15 em 15 minutos'
};

export const dataConsultaValidation: ValidationInput<DateTime> = {
    checker: (param: DateTime): boolean => param >= DateTime.now().set({hour: 0, minute: 0, second: 0, millisecond: 0}),
    message: 'a data da consulta tem que ser no futuro'
};

export const opcaoAgendaValidation: ValidationInput<string> = {
    checker: (param: string): boolean => param == 'P' || param == 'T',
    message: 'as únicas opções são P ou T'
};
