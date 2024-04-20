'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('agendamento', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        data_inicio: {
            type: Sequelize.DATE,
            allowNull: false
        },
        data_fim: {
            type: Sequelize.DATE,
            allowNull: false
        },
        paciente_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'paciente',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('agendamento');
  }
};
