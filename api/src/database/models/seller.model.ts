import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from "sequelize-typescript";
import { Meeting } from "./meeting.model";

@Table({
  tableName: "sellers",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  indexes: [
    {
      fields: ["email"],
    },
    {
      fields: ["active"],
    },
  ],
})
export class Seller extends Model<Seller> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255],
    },
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      len: [8, 15],
    },
  })
  phone: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  active: boolean;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  created_at: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updated_at: Date;

  // Associations
  @HasMany(() => Meeting, { foreignKey: "seller_id", as: "meetings" })
  meetings: Meeting[];
}
