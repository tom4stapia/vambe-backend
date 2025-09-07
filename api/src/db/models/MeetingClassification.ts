import { Sequelize, DataTypes, Model } from 'sequelize';

export interface MeetingClassificationAttributes {
  id?: number;
  meeting_id: number;
  categories: string[];
  confidence_score: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  key_topics: string[];
  action_items: string[];
  next_steps?: string;
  summary?: string;
  model_used: string;
  processed_at: Date;
  processing_time_ms?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface MeetingClassificationCreationAttributes extends Omit<MeetingClassificationAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class MeetingClassification extends Model<MeetingClassificationAttributes, MeetingClassificationCreationAttributes>
  implements MeetingClassificationAttributes {
  public id!: number;
  public meeting_id!: number;
  public categories!: string[];
  public confidence_score!: number;
  public sentiment!: 'positive' | 'neutral' | 'negative';
  public key_topics!: string[];
  public action_items!: string[];
  public next_steps?: string;
  public summary?: string;
  public model_used!: string;
  public processed_at!: Date;
  public processing_time_ms?: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public readonly meeting?: any;

  public static associate(models: any) {
    MeetingClassification.belongsTo(models.Meeting, {
      foreignKey: 'meeting_id',
      as: 'meeting'
    });
  }
}

export function initMeetingClassification(sequelize: Sequelize): typeof MeetingClassification {
  MeetingClassification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      meeting_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'meetings',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      categories: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
      },
      confidence_score: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false,
        defaultValue: 0.0
      },
      sentiment: {
        type: DataTypes.ENUM('positive', 'neutral', 'negative'),
        allowNull: false
      },
      key_topics: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
      },
      action_items: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
      },
      next_steps: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      model_used: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      processed_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      processing_time_ms: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      modelName: 'MeetingClassification',
      tableName: 'meetings_classifications',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      indexes: [
        {
          unique: true,
          fields: ['meeting_id'],
          name: 'meetings_classifications_meeting_id_unique'
        },
        {
          fields: ['processed_at'],
          name: 'meetings_classifications_processed_at_index'
        }
      ]
    }
  );

  return MeetingClassification;
}
