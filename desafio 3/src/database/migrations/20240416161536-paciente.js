'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('paciente', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cpf: {
            type: Sequelize.STRING(11),
            allowNull: false,
            unique: true
        },
        nome: {
            type: Sequelize.STRING(256),
            allowNull: false
        },
        nascimento: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('paciente');
  }
};
