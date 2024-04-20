import Input from '../utils/input';
import { cpfValidation } from '../utils/validations';
import { DateTime } from 'luxon';
import { Status, Errors } from '../utils/status';
import { Response } from '../utils/response';

export default class CancelaConsultaView {

    receive(): {cpf: string, dataInicio: DateTime} {
        let cpf: string = Input.readString('CPF: ', [cpfValidation()]);
        let data: DateTime = Input.readDate('data da consulta: ');
        let horario: DateTime = Input.readHour('hora da consulta: ');
        let dataInicio = data.set({hour: horario.hour, minute: horario.minute, second: horario.second, millisecond: horario.millisecond})
        return {cpf, dataInicio};
    }
    
    show(response: Response<any>): void {
        if(response.status == Status.SUCCESS)
            console.log('\nConsulta desmarcada com sucesso');
        else if(response.errors) {
            console.log('\nOs seguintes erros foram retornados:');
            for(const error of response.errors) {
                switch(error) {
                    case Errors.SCHEDULE_NOT_FOUND:
                        console.log('\tConsulta não encontrada');
                        break;
                    case Errors.INTERNAL_ERROR:
                        console.log('\tAconteceu um erro interno no sistema');
                        break;
                }
            }
        }
    }
}
