'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('sellers', 'prompt', {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: ''
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('sellers', 'prompt');
  }
};
