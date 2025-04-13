'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      creatore_id: {
        type: Sequelize.UUID
      },
      creatore: {
        type: Sequelize.STRING
      },
      data_inizio: {
        type: Sequelize.DATE
      },
      data_fine: {
        type: Sequelize.DATE
      },
      destinazione: {
        type: Sequelize.STRING
      },
      budget: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Trips');
  }
};