import { Model, DataTypes } from 'sequelize';
import db from '.';
import Paciente from './Paciente';

class Agendamento extends Model {
    declare id: number;
    declare dataInicio: Date;
    declare dataFim: Date;
    declare pacienteId: number;
}

Agendamento.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    dataInicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dataFim: {
        type: DataTypes.DATE,
        allowNull: false
    },
    pacienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'paciente',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    sequelize: db,
    tableName: 'agendamento',
    timestamps: false,
    underscored: true
});

Paciente.hasMany(Agendamento, {
    foreignKey: 'pacienteId'
});

Agendamento.belongsTo(Paciente, {
    foreignKey: 'pacienteId'
});

export default Agendamento;
