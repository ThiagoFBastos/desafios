import Input from '../utils/input';
import { rangeValidation } from '../utils/validations';

export default class MenuPacienteView {
    receive(): number {
        console.log('\nMenu do Cadastro de Pacientes\n1-Cadastrar novo paciente\n2-Excluir paciente\n3-Listar pacientes (ordenado por CPF)\n4-Listar pacientes (ordenado por nome)\n5-Voltar p/ menu principal');
        return Input.readInt('', [rangeValidation(1, 5)]);
    }
}
