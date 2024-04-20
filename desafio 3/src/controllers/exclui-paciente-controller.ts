import { Response } from '../utils/response';
import { Status, Errors } from '../utils/status';
import PacienteService from '../services/paciente-service';

export type ExcluiPacienteResponse = Response<void>;

export class ExcluiPacienteController {
    private pacienteService: PacienteService;

    constructor() {
        this.pacienteService = new PacienteService();
    }

    async exclui(cpf: string): Promise<ExcluiPacienteResponse> {
        try {
            let exists: boolean = await this.pacienteService.existsPaciente(cpf);

            if(!exists) {
                return {
                    status: Status.ERROR,
                    errors: [Errors.CPF_NOT_FOUND]
                };
            }

            await this.pacienteService.removePaciente(cpf);

            return {status: Status.SUCCESS};
        } catch(e) {
            return {
                status: Status.ERROR,
                errors: [Errors.INTERNAL_ERROR]
            }
        }
    }
}
