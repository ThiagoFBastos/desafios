import { AgendaConsultaController } from './agenda-consulta-controller';
import AgendaConsultaPresenter from '../presenter/agenda-consulta-presenter';
import { CancelaConsultaController } from './cancela-consulta-controller';
import CancelaConsultaPresenter from '../presenter/cancela-consulta-presenter';
import { ListagemAgendaController } from './listagem-agenda-controller';
import ListagemAgendaPresenter from '../presenter/listagem-agenda-presenter';

export class MenuAgendaController {
    
    async agendarConsulta(): Promise<void> {
        let controller: AgendaConsultaController = new AgendaConsultaController();
        let presenter: AgendaConsultaPresenter = new AgendaConsultaPresenter(controller);
        await presenter.run();
    }

    async cancelarAgendamento(): Promise<void> {
        let controller: CancelaConsultaController = new CancelaConsultaController();
        let presenter: CancelaConsultaPresenter = new CancelaConsultaPresenter(controller);
        await presenter.run();
    }

    async listarAgenda(): Promise<void> {
        let controller: ListagemAgendaController = new ListagemAgendaController();
        let presenter: ListagemAgendaPresenter = new ListagemAgendaPresenter(controller);
        await presenter.run();
    }
}
