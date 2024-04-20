import { CadastroPacienteController } from './cadastro-paciente-controller';
import CadastroPacientePresenter from '../presenter/cadastro-paciente-presenter';
import { ExcluiPacienteController } from './exclui-paciente-controller';
import ExcluiPacientePresenter from '../presenter/exclui-paciente-presenter';
import { ListagemPacienteController } from './listagem-paciente-controller';
import ListagemPacienteCPFPresenter from '../presenter/listagem-paciente-cpf-presenter';
import ListagemPacienteNomePresenter from '../presenter/listagem-paciente-nome-presenter';

export class MenuPacienteController {
    
    async cadastrarPaciente(): Promise<void> {
        let controller: CadastroPacienteController = new CadastroPacienteController();
        let presenter: CadastroPacientePresenter = new CadastroPacientePresenter(controller);
        await presenter.run();
    }

    async excluirPaciente(): Promise<void> {
        let controller: ExcluiPacienteController = new ExcluiPacienteController();
        let presenter: ExcluiPacientePresenter = new ExcluiPacientePresenter(controller);
        await presenter.run();
    }

    async listarPacientesPorCPF(): Promise<void> {
        let controller: ListagemPacienteController = new ListagemPacienteController();
        let presenter: ListagemPacienteCPFPresenter = new ListagemPacienteCPFPresenter(controller);
        await presenter.run();
    }

    async listarPacientesPorNome(): Promise<void> {
        let controller: ListagemPacienteController = new ListagemPacienteController();
        let presenter: ListagemPacienteNomePresenter = new ListagemPacienteNomePresenter(controller);
        await presenter.run();
    }
}
