import { ListagemPacienteController } from '../controllers/listagem-paciente-controller';
import ListagemPacienteView from '../views/listagem-paciente-view';

export default class ListagemPacienteNomePresenter {
    private controller: ListagemPacienteController;
    private view: ListagemPacienteView;

    constructor(controller: ListagemPacienteController) {
        this.controller = controller;
        this.view = new ListagemPacienteView();
    }

    async run(): Promise<void> {
        let response = await this.controller.listagemPorNome();
        this.view.show(response);
    }
}
