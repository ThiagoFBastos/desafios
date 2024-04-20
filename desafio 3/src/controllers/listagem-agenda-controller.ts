import { Status, Errors } from '../utils/status';
import { Response } from '../utils/response';
import { DateTime } from 'luxon';
import AgendaService from '../services/agenda-service';
import Agendamento from '../database/models/Agendamento';

export type ListagemAgendaResponse = Response<Agendamento[]>;

export class ListagemAgendaController {
    private agendaService: AgendaService;

    constructor() {
        this.agendaService = new AgendaService();
    }

    async listarAgenda(dataInicio: DateTime, dataFim: DateTime): Promise<ListagemAgendaResponse> {
        try {
            let agendamentos: Agendamento[] = await this.agendaService.getAgendamentos(dataInicio, dataFim);

            return {
                status: Status.SUCCESS,
                data: agendamentos
            };
        } catch(e) {
            return {
                status: Status.ERROR,
                errors: [Errors.INTERNAL_ERROR]
            };
        }
    }
}
