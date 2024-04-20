import { Model, DataTypes } from 'sequelize';
import db from '.';
import { DateTime, Interval } from 'luxon';

class Paciente extends Model {
    declare id: number;
    declare cpf: string;
    declare nome: string;
    declare nascimento: Date;
    declare idade: number;
}

Paciente.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
    },
    nome: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    nascimento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    idade: {
        type: DataTypes.VIRTUAL,
        get(): number {
            let nascimento: DateTime = DateTime.fromJSDate(this.nascimento);
            let agora: DateTime = DateTime.now();
            let diff: Interval = Interval.fromDateTimes(nascimento, agora);
            return Math.floor(diff.length('years'));
        },
        set(value) {
            throw new Error('O campo idade não pode ser atribuido');
        }
    }
}, {
    sequelize: db,
    tableName: 'paciente',
    timestamps: false,
    underscored: true
});

export default Paciente;
