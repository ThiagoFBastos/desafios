import { MenuPacienteController } from './menu-paciente-controller';
import MenuPacientePresenter from '../presenter/menu-paciente-presenter';
import { MenuAgendaController } from './menu-agenda-controller';
import MenuAgendaPresenter from '../presenter/menu-agenda-presenter';

export class MenuController {
    
    async menuCadastroPaciente(): Promise<void> {
        let controller: MenuPacienteController = new MenuPacienteController();
        let presenter: MenuPacientePresenter = new MenuPacientePresenter(controller);
        await presenter.run();
    }

    async menuAgenda(): Promise<void> {
        let controller: MenuAgendaController = new MenuAgendaController();
        let presenter: MenuAgendaPresenter = new MenuAgendaPresenter(controller);
        await presenter.run();
    }
}
