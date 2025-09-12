import { DataTypes, Model, Sequelize } from 'sequelize';

export interface SellerAttributes {
  id?: number;
  name: string;
  email: string;
  phone?: string | null;
  active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class Seller extends Model<SellerAttributes> implements SellerAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string | null;
  public active!: boolean;
  public created_at!: Date;
  public updated_at!: Date;

  public readonly meetings?: any[];

  static associate(models: any) {
    Seller.hasMany(models.Meeting, {
      foreignKey: 'seller_id',
      as: 'meetings'
    });
  }
}

export function initSeller(sequelize: Sequelize): typeof Seller {
  Seller.init(
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
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [8, 15]
        }
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
      modelName: 'Seller',
      tableName: 'sellers',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      indexes: [
        {
          fields: ['email']
        },
        {
          fields: ['active']
        }
      ]
    }
  );

  return Seller;
}
