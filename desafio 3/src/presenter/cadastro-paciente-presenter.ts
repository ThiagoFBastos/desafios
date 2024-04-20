import { CadastroPacienteController } from '../controllers/cadastro-paciente-controller';
import CadastroPacienteView from '../views/cadastro-paciente-view';
import { DateTime } from 'luxon';

export default class CadastroPacientePresenter {
    private controller: CadastroPacienteController;
    private view: CadastroPacienteView;

    constructor(controller: CadastroPacienteController) {
        this.controller = controller;
        this.view = new CadastroPacienteView();
    }

    async run(): Promise<void> {
        const {cpf, nome, nascimento} = this.view.receive();

        let resposta = await this.controller.cadastrar(cpf, nome, nascimento);
        
        this.view.show(resposta);
    }
}
