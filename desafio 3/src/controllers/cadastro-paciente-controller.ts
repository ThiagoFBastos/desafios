import { DateTime } from 'luxon';
import { Response } from '../utils/response';
import { Status, Errors } from '../utils/status';
import PacienteService from '../services/paciente-service';

export type CadastroPacienteResponse = Response<void>;

export class CadastroPacienteController {
    private pacienteService: PacienteService;

    constructor() {
        this.pacienteService = new PacienteService();
    }

    async cadastrar(cpf: string, nome: string, nascimento: DateTime): Promise<CadastroPacienteResponse> {
        try {

            let exists: boolean = await this.pacienteService.existsPaciente(cpf);

            if(exists) return {status: Status.ERROR, errors: [Errors.CPF_EXISTS]};

            await this.pacienteService.createPaciente(cpf, nome, nascimento);

            return {status: Status.SUCCESS};
        } catch(e) {
            return {status: Status.ERROR, errors: [Errors.INTERNAL_ERROR]};
        }
    }
}
