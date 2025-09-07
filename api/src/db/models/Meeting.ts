import { DataTypes, Model, Sequelize } from 'sequelize';

export interface MeetingAttributes {
  id?: number;
  client_id: number;
  seller_id: number;
  meeting_at: Date;
  closed?: boolean;
  transcript?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export class Meeting extends Model<MeetingAttributes> implements MeetingAttributes {
  public id!: number;
  public client_id!: number;
  public seller_id!: number;
  public meeting_at!: Date;
  public closed!: boolean;
  public transcript!: string | null;
  public created_at!: Date;
  public updated_at!: Date;

  public readonly client?: any;
  public readonly seller?: any;
  public readonly classifications?: any;

  static associate(models: any) {
    Meeting.belongsTo(models.Client, {
      foreignKey: 'client_id',
      as: 'client'
    });

    Meeting.belongsTo(models.Seller, {
      foreignKey: 'seller_id',
      as: 'seller'
    });

    Meeting.hasMany(models.MeetingClassification, {
      foreignKey: 'meeting_id',
      as: 'classifications'
    });
  }
}

export function initMeeting(sequelize: Sequelize): typeof Meeting {
  Meeting.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'clients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sellers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      meeting_at: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          notEmpty: true
        }
      },
      closed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      transcript: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Meeting',
      tableName: 'meetings',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      indexes: [
        {
          fields: ['client_id']
        },
        {
          fields: ['seller_id']
        },
        {
          fields: ['meeting_at']
        },
        {
          fields: ['closed']
        }
      ]
    }
  );

  return Meeting;
}
