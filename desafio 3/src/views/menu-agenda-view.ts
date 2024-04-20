import Input from '../utils/input';
import { rangeValidation } from '../utils/validations';

export default class MenuAgendaView {
    
    receive(): number {
        console.log('\nAgenda\n1-Agendar consulta\n2-Cancelar agendamento\n3-Listar agenda\n4-Voltar p/ menu principal');
        return Input.readInt('', [rangeValidation(1, 4)]);
    }
}
