import { Response } from '../utils/response';
import PacienteService from '../services/paciente-service';
import { Status, Errors } from '../utils/status';
import Paciente from '../database/models/Paciente';

export type ListagemPacienteResponse = Response<Paciente[]>;

export class ListagemPacienteController {
    private pacienteService: PacienteService;

    constructor() {
        this.pacienteService = new PacienteService();
    }

    async listagemPorNome(): Promise<ListagemPacienteResponse> {
        try {
            let pacientes: Paciente[] = await this.pacienteService.getPacientesPorNome();

            return {
                status: Status.SUCCESS,
                data: pacientes
            };
        } catch(e) {
            return {
                status: Status.ERROR,
                errors: [Errors.INTERNAL_ERROR]
            };
        }
    }

    async listagemPorCPF(): Promise<ListagemPacienteResponse> {
        try {
            let pacientes: Paciente[] = await this.pacienteService.getPacientesPorCPF();

            return {
                status: Status.SUCCESS,
                data: pacientes
            };
        } catch(e) {
            return {
                status: Status.ERROR,
                errors: [Errors.INTERNAL_ERROR]
            };
        }
    }
}
