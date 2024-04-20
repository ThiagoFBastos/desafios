import { ListagemAgendaController } from '../controllers/listagem-agenda-controller';
import ListagemAgendaView from '../views/listagem-agenda-view';

export default class ListagemAgendaPresenter {
    private controller: ListagemAgendaController;
    private view: ListagemAgendaView;

    constructor(controller: ListagemAgendaController) {
        this.controller = controller;
        this.view = new ListagemAgendaView();
    }

    async run(): Promise<void> {
        const { dataInicio, dataFim } = this.view.receive();

        let response = await this.controller.listarAgenda(dataInicio, dataFim);

        this.view.show(response);
    } 
}
