import { ExcluiPacienteController } from '../controllers/exclui-paciente-controller';
import ExcluiPacienteView from '../views/exclui-paciente-view';

export default class ExcluiPacientePresenter {
    private controller: ExcluiPacienteController;
    private view: ExcluiPacienteView;

    constructor(controller: ExcluiPacienteController) {
        this.controller = controller;
        this.view = new ExcluiPacienteView();
    }

    async run(): Promise<void> {
        let cpf: string = this.view.receive();

        let response = await this.controller.exclui(cpf);

        this.view.show(response);
    }
}
