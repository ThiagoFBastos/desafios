import Paciente from '../database/models/Paciente';
import Agendamento from '../database/models/Agendamento';
import { ModelStatic, Op } from 'sequelize';
import { DateTime } from 'luxon';

export default class PacienteService {
    private model: ModelStatic<Paciente> = Paciente;

    async createPaciente(cpf: string, nome: string, nascimento: DateTime): Promise<void> {
        await this.model.create({
            cpf,
            nome,
            nascimento: nascimento.toJSDate()
        });
    }

    async findPaciente(cpf: string): Promise<Paciente | null> {
        return await this.model.findOne({where: {cpf}});
    }

    async existsPaciente(cpf: string): Promise<boolean> {
        let paciente: Paciente | null = await this.findPaciente(cpf);
        return paciente != null;
    }

    async removePaciente(cpf: string): Promise<void> {
        await this.model.destroy({where: {cpf}});
    }

    async getPacientesPorNome(): Promise<Paciente[]> {
        let pacientes: Paciente[] = await this.model.findAll({
            order: [['nome', 'asc']],
            include: [{
                model: Agendamento,
                where: {
                    dataInicio: {[Op.gte]: DateTime.now().toJSDate()}
                },
                required: false
            }]
        });
        return pacientes;
    }

    async getPacientesPorCPF(): Promise<Paciente[]> {
        let pacientes: Paciente[] = await this.model.findAll({
            order: [['cpf', 'asc']],
            include: [{
                model: Agendamento,
                where: {
                    dataInicio: {[Op.gte]: DateTime.now().toJSDate()}
                },
                required: false
            }]
        });
        return pacientes;
    }

    async checkPacienteAgendado(cpf: string): Promise<boolean> {
        let paciente: Paciente | null = await this.model.findOne({
            where: {cpf},
            include: [{
                model: Agendamento,
                where: {dataInicio: {[Op.gte]: DateTime.now().toJSDate()}},
                required: true
            }]
        });
        return paciente != null;
    }
}
