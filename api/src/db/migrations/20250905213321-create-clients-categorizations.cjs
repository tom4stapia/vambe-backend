'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clients_categorizations', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'clients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      model: { type: Sequelize.STRING, allowNull: false },    
      labels: { type: Sequelize.JSONB, allowNull: true },     
      result: { type: Sequelize.JSONB, allowNull: false },    
      confidence: { type: Sequelize.DECIMAL(5, 4), allowNull: true }, 
      rationale: { type: Sequelize.TEXT, allowNull: true },
      meta: { type: Sequelize.JSONB, allowNull: true },         

      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
      updated_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('now') }
    });

    await queryInterface.addIndex('clients_categorizations', ['client_id']);
    await queryInterface.addIndex('clients_categorizations', ['model']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('clients_categorizations');
  }
};
