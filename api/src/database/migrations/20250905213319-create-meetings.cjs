'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('meetings', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'clients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      seller_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sellers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

      meeting_at: { type: Sequelize.DATE, allowNull: false }, 
      closed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }, 
      transcript: { type: Sequelize.TEXT, allowNull: true },

      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
      updated_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('now') }
    });

    await queryInterface.addIndex('meetings', ['client_id']);
    await queryInterface.addIndex('meetings', ['seller_id']);
    await queryInterface.addIndex('meetings', ['meeting_at']);
    await queryInterface.addIndex('meetings', ['closed']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('meetings');
  }
};
