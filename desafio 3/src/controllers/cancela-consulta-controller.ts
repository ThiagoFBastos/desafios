import { Response } from '../utils/response';
import { DateTime } from 'luxon';
import { Status, Errors } from '../utils/status';
import AgendaService from '../services/agenda-service';
import Agendamento from '../database/models/Agendamento';

export type CancelaConsultaResponse = Response<void>;

export class CancelaConsultaController {
    private agendaService: AgendaService;

    constructor() {
        this.agendaService = new AgendaService();
    }

    async cancelar(cpf: string, dataInicio: DateTime): Promise<CancelaConsultaResponse> {
        try {
            let agendamento: Agendamento | null = await this.agendaService.getAgendamentoFuturo(cpf);

            if(agendamento == null || !dataInicio.equals(DateTime.fromJSDate(agendamento.dataInicio))) {
                return {
                    status: Status.ERROR,
                    errors: [Errors.SCHEDULE_NOT_FOUND]
                };
            }

            await this.agendaService.removeAgendamento(agendamento.id);

            return {status: Status.SUCCESS};
        } catch(e) {
            return {
                status: Status.ERROR,
                errors: [Errors.INTERNAL_ERROR]
            };
        }
    }
}
