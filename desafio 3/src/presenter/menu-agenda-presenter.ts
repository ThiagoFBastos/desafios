import { MenuAgendaController } from '../controllers/menu-agenda-controller';
import MenuAgendaView from '../views/menu-agenda-view';

export default class MenuAgendaPresenter {
    private controller: MenuAgendaController;
    private view: MenuAgendaView;

    constructor(controller: MenuAgendaController) {
        this.controller = controller;
        this.view = new MenuAgendaView();
    }

    async run(): Promise<void> {
        while(true) {
            let option: number = this.view.receive();

            if(option == 1)
                await this.controller.agendarConsulta();
            else if(option == 2)
                await this.controller.cancelarAgendamento();
            else if(option == 3)
                await this.controller.listarAgenda();
            else
                break;    
        }
    }
}
