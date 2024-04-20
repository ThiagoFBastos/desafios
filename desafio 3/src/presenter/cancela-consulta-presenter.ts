import { CancelaConsultaController } from '../controllers/cancela-consulta-controller';
import CancelaConsultaView from '../views/cancela-consulta-view';
import { DateTime } from 'luxon';

export default class CancelaConsultaPresenter {
    private controller: CancelaConsultaController;
    private view: CancelaConsultaView;

    constructor(controller: CancelaConsultaController) {
        this.controller = controller;
        this.view = new CancelaConsultaView();
    }

    async run(): Promise<void> {
        const {cpf, dataInicio} = this.view.receive();

        let response = await this.controller.cancelar(cpf, dataInicio);

        this.view.show(response);
    }
}
