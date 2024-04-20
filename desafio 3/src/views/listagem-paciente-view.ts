import { Response } from '../utils/response';
import { Status, Errors } from '../utils/status';

export default class ListagemPacienteView {

    show(response: Response<any>): void {
        if(response.status == Status.SUCCESS) {
            if(response.data?.length) {
                let trailing: number = 25;

                for(const paciente of response.data)
                    trailing = Math.max(trailing, paciente.nome.length);

                console.log('-'.repeat(trailing + 29));
                console.log('CPF'.padEnd(11), 'Nome'.padEnd(trailing), 'Dt.Nasc.'.padEnd(10), 'Idade');
                console.log('-'.repeat(trailing + 29));

                for(const paciente of response.data) {
                    const cpf: string = paciente.cpf;
                    const nome: string = paciente.nome.padEnd(trailing);
                    const data: string = paciente.nascimento.toLocaleDateString('pt-BR');
                    const idade: string = paciente.idade.toString().padStart(5);

                    console.log(cpf, nome, data, idade);

                    for(const agendamento of paciente.Agendamentos) {
                        const dataConsulta: string = agendamento.dataInicio.toLocaleDateString('pt-BR');
                        const horaInicio: string = agendamento.dataInicio.toLocaleTimeString('pt-BR');
                        const horaFim: string = agendamento.dataFim.toLocaleTimeString('pt-BR');

                        console.log(' '.repeat(11), 'Agendado para:', dataConsulta);
                        console.log(' '.repeat(11), horaInicio, 'às', horaFim);
                    }
                }

                console.log('-'.repeat(trailing + 29));
            } else
                console.log('\nNão existem pacientes cadastrados');
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
