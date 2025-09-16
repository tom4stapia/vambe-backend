'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      
      role: {
        type: Sequelize.ENUM('super_admin', 'admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
      },
      
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      created_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
      updated_at: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('now') }
    });

    await queryInterface.addIndex('users', ['email'], {
      unique: true,
      name: 'users_email_unique'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};
