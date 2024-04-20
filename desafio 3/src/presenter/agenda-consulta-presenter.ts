import { AgendaConsultaController } from '../controllers/agenda-consulta-controller';
import AgendaConsultaView from '../views/agenda-consulta-view';

export default class AgendaConsultaPresenter {
    private controller: AgendaConsultaController;
    private view: AgendaConsultaView;

    constructor(controller: AgendaConsultaController) {
        this.controller = controller;
        this.view = new AgendaConsultaView();
    }

    async run(): Promise<void> {
        const {cpf, horaInicio, horaFim} = this.view.receive();

        const response = await this.controller.agendar(cpf, horaInicio, horaFim);

        this.view.show(response);
    }
}
