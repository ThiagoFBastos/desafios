import { MenuPacienteController } from '../controllers/menu-paciente-controller';
import MenuPacienteView from '../views/menu-paciente-view';

export default class MenuPacientePresenter {
    private controller: MenuPacienteController;
    private view: MenuPacienteView;

    constructor(controller: MenuPacienteController) {
        this.controller = controller;
        this.view = new MenuPacienteView();
    }

    async run(): Promise<void> {
        while(true) {
            let option: number = this.view.receive();

            if(option == 1)
                await this.controller.cadastrarPaciente();
            else if(option == 2)
                await this.controller.excluirPaciente();
            else if(option == 3)
                await this.controller.listarPacientesPorCPF();
            else if(option == 4)
                await this.controller.listarPacientesPorNome();
            else
                break;
        }
    }
}
