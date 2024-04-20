import { ListagemPacienteController } from '../controllers/listagem-paciente-controller';
import ListagemPacienteView from '../views/listagem-paciente-view';

export default class ListagemPacienteCPFPresenter {
    private controller: ListagemPacienteController;
    private view: ListagemPacienteView;

    constructor(controller: ListagemPacienteController) {
        this.controller = controller;
        this.view = new ListagemPacienteView();
    }

    async run(): Promise<void> {
        let response = await this.controller.listagemPorCPF();
        this.view.show(response);
    }
}
