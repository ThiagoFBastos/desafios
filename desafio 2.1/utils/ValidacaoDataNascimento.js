import {DateTime, Interval} from 'luxon';

export default class ValidacaoDataNascimento {
    static validaFormato(dt_nascimento) {
        const re = /^\d{2}\d{2}\d{4}$/;
        return typeof(dt_nascimento) == 'string' && re.test(dt_nascimento);
    }

    static validaIdade(dt_nascimento) {
        const dia = dt_nascimento.substr(0, 2);
        const mes = dt_nascimento.substr(2, 2);
        const ano = dt_nascimento.substr(4, 4);
  
        const agora = DateTime.now();
        const nascimento = DateTime.fromObject({day: dia, month: mes, year: ano});
        const diff = Interval.fromDateTimes(nascimento, agora);

        return diff.length('years') >= 18;   
    }
}
