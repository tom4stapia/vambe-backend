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
      
      // Análisis de enums del sistema
      business_sector: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Análisis de BusinessSector basado en la reunión'
      },
      company_size: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Análisis de CompanySize basado en la reunión'
      },
      region: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Análisis de Region basado en la reunión'
      },
      lead_source: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Análisis de LeadSource basado en la reunión'
      },
      vambe_product: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Análisis de VambeProduct basado en la reunión'
      },
      use_case: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Análisis de UseCase basado en la reunión'
      },
      primary_pain_point: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Análisis de PrimaryPainPoint basado en la reunión'
      },
      urgency: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        comment: 'Análisis de Urgency basado en la reunión'
      },
      decision_maker_role: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Análisis de DecisionMakerRole basado en la reunión'
      },
      purchase_stage: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Análisis de PurchaseStage basado en la reunión'
      },
      language: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Análisis de Language basado en la reunión'
      },
      lost_client_bad_meeting: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        comment: 'Cliente perdido por mala reunión'
      },
      
      // Campos mantenidos
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
