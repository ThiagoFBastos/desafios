import Input from '../utils/input';
import { cpfValidation } from '../utils/validations';
import { ExcluiPacienteResponse } from '../controllers/exclui-paciente-controller';
import { Status, Errors } from '../utils/status';
import { Response } from '../utils/response';

export default class ExcluiPacienteView {
    
    receive(): string {
        return Input.readString('\nCPF: ', [cpfValidation()]);
    }

    show(response: Response<any>): void {
        if(response.status == Status.SUCCESS)
            console.log('\nPaciente excluído com sucesso');
        else if(response.errors) {
            console.log('\nOs seguintes erros foram retornados:');
            for(const error of response.errors) {
                switch(error) {
                    case Errors.CPF_NOT_FOUND:
                        console.log('\tO paciente não foi encontrado');
                        break;
                    case Errors.INTERNAL_ERROR:
                        console.log('\tAconteceu um erro interno no sistema');
                        break;
                }
            }
        }
    }
}
