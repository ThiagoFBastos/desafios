import { cpfValidation, 
         dataConsultaValidation, 
         dataOpenValidation, 
         dataCloseValidation, 
         dataRuleValidation,
         dataCompareValidation,
         dataFutureValidation
       } from '../utils/validations';
import Input from '../utils/input';
import { DateTime } from 'luxon';
import { Response } from '../utils/response';
import { Status, Errors } from '../utils/status';

export default class AgendaConsultaView {

    receive(): {cpf: string, horaInicio: DateTime, horaFim: DateTime} {
        let cpf: string = Input.readString('\nCPF: ', [cpfValidation()]);

        let data: DateTime = Input.readDate('Data da consulta: ', [dataConsultaValidation]);

        let horaInicio: DateTime = Input.readHour('Hora inicial: ', [
            dataOpenValidation(data), 
            dataRuleValidation,
            dataFutureValidation(data),
            dataCloseValidation(data)
        ]);

        let horaFim: DateTime = Input.readHour('Hora final: ', [
            dataOpenValidation(data),
            dataCloseValidation(data), 
            dataRuleValidation, 
            dataCompareValidation(horaInicio),
            dataFutureValidation(data)
        ]);
    
        horaInicio = data.set({hour: horaInicio.hour, minute: horaInicio.minute, second: 0, millisecond: 0});
        horaFim = data.set({hour: horaFim.hour, minute: horaFim.minute, second: 0, millisecond: 0});

        return {cpf, horaInicio, horaFim};
    }

    show(response: Response<any>): void {
        if(response.status == Status.SUCCESS)
            console.log('\nO agendamento foi confirmado com suceso');
        else if(response.errors) {
            console.log('\nOs seguintes erros foram retornados:');
            for(const error of response.errors) {
                switch(error) {
                    case Errors.PATIENT_ALREDY_SCHEDULED:
                        console.log('\tO paciente já tem um agendamento marcado');
                        break;
                    case Errors.SCHEDULE_OVERLAP:
                        console.log('\tExiste um agendamento que conflita com o horário marcado');
                        break;
                    case Errors.INTERNAL_ERROR:
                        console.log('\tAconteceu um erro interno no sistema');
                        break;
                }
            }
        }
    }
}
