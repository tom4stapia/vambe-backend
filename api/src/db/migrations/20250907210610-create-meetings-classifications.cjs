'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('meetings_classifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      meeting_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      categories: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: []
      },
      confidence_score: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false,
        defaultValue: 0.0
      },
      sentiment: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
          isIn: [['positive', 'neutral', 'negative']]
        }
      },
      key_topics: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: []
      },
      action_items: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: []
      },
      next_steps: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      summary: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      model_used: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      processed_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      processing_time_ms: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add foreign key constraint
    await queryInterface.addConstraint('meetings_classifications', {
      fields: ['meeting_id'],
      type: 'foreign key',
      name: 'meetings_classifications_meeting_id_fkey',
      references: {
        table: 'meetings',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Add indexes for better performance
    await queryInterface.addIndex('meetings_classifications', ['meeting_id'], {
      unique: true,
      name: 'meetings_classifications_meeting_id_unique'
    });

    await queryInterface.addIndex('meetings_classifications', ['processed_at'], {
      name: 'meetings_classifications_processed_at_index'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('meetings_classifications');
  }
};
