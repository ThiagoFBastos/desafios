import Agendamento from '../database/models/Agendamento';
import Paciente from '../database/models/Paciente';
import PacienteService from './paciente-service';
import { ModelStatic, Op } from 'sequelize';
import { DateTime } from 'luxon';

export default class AgendaService {
    private model: ModelStatic<Agendamento> = Agendamento;
    private pacienteService : PacienteService;

    constructor() {
        this.pacienteService = new PacienteService();
    }

    async checkPacienteJaAgendado(cpf: string): Promise<boolean> {
        let agendamento: Agendamento | null = await this.getAgendamentoFuturo(cpf);
        return agendamento != null;
    }

    async checkAgendamentoSobreposto(dataInicio: DateTime, dataFim: DateTime): Promise<boolean> {
        let agendamento: Agendamento | null = await this.model.findOne({
            where: {
                [Op.not]: {
                    [Op.or]: {
                        dataFim: {[Op.lte]: dataInicio.toJSDate()},
                        dataInicio: {[Op.gte]: dataFim.toJSDate()}
                    }
                }
            }
        });
        return agendamento != null;
    }

    async createAgendamento(cpf: string, dataInicio: DateTime, dataFim: DateTime): Promise<void> {
        let paciente: Paciente | null = await this.pacienteService.findPaciente(cpf);

        if(paciente != null) {
            await this.model.create({
                dataInicio: dataInicio.toJSDate(),
                dataFim: dataFim.toJSDate(),
                pacienteId: paciente.id
            });
        } else
            throw new Error('Paciente não registrado');
    }

    async getAgendamentos(dataInicio: DateTime, dataFim: DateTime): Promise<Agendamento[]> {
        let agendamentos: Agendamento[] = await this.model.findAll({
            order: [['dataInicio', 'asc']],
            include: [{
                model: Paciente
            }],
            where: {
                [Op.and]: {
                    dataInicio: {[Op.gte]: dataInicio.toJSDate()},
                    dataFim: {[Op.lte]: dataFim.toJSDate()}
                }
            }
        });
        return agendamentos;
    }

    async getAgendamentoFuturo(cpf: string): Promise<Agendamento | null> {
        let agendamento: Agendamento | null = await this.model.findOne({
            include: [{
                model: Paciente,
                required: true,
                where: {cpf}
            }],
            where: {
                dataInicio: {[Op.gte]: DateTime.now().toJSDate()}
            }
        });
        return agendamento;
    }

    async removeAgendamento(id: number): Promise<void> {
        await this.model.destroy({where: {id}});
    }
}
