import { DataTypes, Model, Sequelize } from 'sequelize';

export interface ClientAttributes {
  id?: number;
  name: string;
  email?: string | null;
  phone?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export class Client extends Model<ClientAttributes> implements ClientAttributes {
  public id!: number;
  public name!: string;
  public email!: string | null;
  public phone!: string | null;
  public created_at!: Date;
  public updated_at!: Date;

  // Association methods will be added by Sequelize
  public readonly meetings?: any[];

  static associate(models: any) {
    Client.hasMany(models.Meeting, {
      foreignKey: 'client_id',
      as: 'meetings'
    });
  }
}

export function initClient(sequelize: Sequelize): typeof Client {
  Client.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [8, 15]
        }
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
      modelName: 'Client',
      tableName: 'clients',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      indexes: [
        {
          fields: ['email']
        },
        {
          fields: ['phone']
        }
      ]
    }
  );

  return Client;
}
