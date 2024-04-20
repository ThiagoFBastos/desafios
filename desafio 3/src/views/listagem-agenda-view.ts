import { DateTime, Interval } from 'luxon';
import { Response } from '../utils/response';
import { Status, Errors } from '../utils/status';
import Input from '../utils/input';
import { opcaoAgendaValidation } from '../utils/validations';

export default class ListagemAgendaView {

    receive(): {dataInicio: DateTime, dataFim: DateTime} {
        let opcao: string = Input.readString('\nApresentar a agenda T-Toda ou P-Periodo: ', [opcaoAgendaValidation]);
        let dataInicio: DateTime = DateTime.fromObject({day: 1, month: 1, year: 1});
        let dataFim: DateTime = DateTime.fromObject({day: 31, month: 12, year: 3000});

        if(opcao == 'P') {
            dataInicio = Input.readDate('Data inicial: ');
            dataFim = Input.readDate('Data final: ').set({hour: 23, minute: 59, second: 59, millisecond: 999});
        }

        return {dataInicio, dataFim};
    }

    show(response: Response<any>): void {
        if(response.status == Status.SUCCESS) {
            if(response.data?.length) {
                let trailing: number = 4;

                for(const agendamento of response.data)
                    trailing = Math.max(agendamento.Paciente.nome.length, trailing);
                
                console.log('-'.repeat(trailing + 49));

                console.log('Data'.padEnd(10), 'H.ini'.padEnd(8), 'H.Fim'.padEnd(8), 'Tempo'.padEnd(8), 'Nome'.padEnd(trailing), 'Dt.Nasc.'.padEnd(10))

                for(const agendamento of response.data) {
                    const paciente = agendamento.Paciente;
                    const dataConsulta = agendamento.dataInicio.toLocaleDateString('pt-BR');
                    const horaInicio = agendamento.dataInicio.toLocaleTimeString('pt-BR');
                    const horaFim = agendamento.dataFim.toLocaleTimeString('pt-BR');
                    const tempo = DateTime.fromJSDate(agendamento.dataFim).diff(DateTime.fromJSDate(agendamento.dataInicio)).toFormat('hh:mm:ss');
                    const nome = paciente.nome.padEnd(trailing);
                    const nascimento = paciente.nascimento.toLocaleDateString('pt-BR');

                    console.log(dataConsulta, horaInicio, horaFim, tempo, nome, nascimento); 
                }

                console.log('-'.repeat(trailing + 49));
            } else
                console.log('\nNão foram encontrados agedamentos');
        } else if(response.errors) {
            console.log('\nOs seguintes erros foram retornados:');
            for(const error of response.errors) {
                switch(error) {
                    case Errors.INTERNAL_ERROR:
                        console.log('\tAconteceu um erro interno no sistema');
                        break;
                }
            }
        }
    }
}
