import Input from '../utils/input';
import { rangeValidation } from '../utils/validations';

export default class MenuView {
    receive(): number {
        console.log('\nMenu Principal\n1-Cadastro de pacientes\n2-Agenda\n3-Fim');
        return Input.readInt('', [rangeValidation(1, 3)]);
    }
}
