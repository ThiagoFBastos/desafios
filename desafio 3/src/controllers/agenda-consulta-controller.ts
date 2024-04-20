import { Response } from '../utils/response';
import { DateTime } from 'luxon';
import { Status, Errors } from '../utils/status';
import AgendaService from '../services/agenda-service';

export type AgendaConsultaResponse = Response<void>;

export class AgendaConsultaController {
    private agendaService: AgendaService;

    constructor() {
        this.agendaService = new AgendaService();
    }

    async agendar(cpf: string, dataInicio: DateTime, dataFim: DateTime): Promise<AgendaConsultaResponse> {
        try {
            let errors: Errors[] = [];

            let checagemPacienteJaAgendado: boolean = await this.agendaService.checkPacienteJaAgendado(cpf);

            if(checagemPacienteJaAgendado)
                errors.push(Errors.PATIENT_ALREDY_SCHEDULED);

            let checagemAgendamentoSobreposto: boolean = await this.agendaService.checkAgendamentoSobreposto(dataInicio, dataFim);

            if(checagemAgendamentoSobreposto)
                errors.push(Errors.SCHEDULE_OVERLAP);

            if(errors.length > 0) {
                return {
                    status: Status.ERROR,
                    errors
                };
            }

            await this.agendaService.createAgendamento(cpf, dataInicio, dataFim);

            return {status: Status.SUCCESS};
        } catch(e) {
            return {
                status: Status.ERROR,
                errors: [Errors.INTERNAL_ERROR]
            };
        }
    }
}
