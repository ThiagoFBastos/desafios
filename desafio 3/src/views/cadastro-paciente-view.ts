import Input from '../utils/input';
import { nomeValidation, cpfValidation, nascimentoValidation } from '../utils/validations';
import { DateTime } from 'luxon';
import { Status, Errors } from '../utils/status';
import { Response } from '../utils/response';

export default class CadastroPacienteView {

    receive(): {cpf: string, nome: string, nascimento: DateTime} {
        let cpf: string = Input.readString('\nCPF: ', [cpfValidation()]);
        let nome: string = Input.readString('Nome: ', [nomeValidation]);
        let nascimento: DateTime = Input.readDate('Data de nascimento: ', [nascimentoValidation]);
        return {cpf, nome, nascimento};
    }

    show(response: Response<any>): void {
        if(response.status == Status.SUCCESS)
            console.log('\nPaciente cadastrado com sucesso');
        else if (response.errors) {
            console.log('\nOs seguintes erros foram retornados: ');
            for(const error of response.errors) {
                switch(error) {
                    case Errors.CPF_EXISTS:
                        console.log('\tO cpf informado já está cadastrado no sistema');
                        break;
                    case Errors.INTERNAL_ERROR:
                        console.log('\tErro interno no sistema');
                        break;
                }
            }
        }
    }
}
