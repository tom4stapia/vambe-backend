import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Client } from "./../models/client.model";
import { Seller } from "./../models/seller.model";
import { MeetingClassification } from "./../models/meeting-classification.model";

@Table({
  tableName: "meetings",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  indexes: [
    {
      fields: ["client_id"],
    },
    {
      fields: ["seller_id"],
    },
    {
      fields: ["meeting_at"],
    },
    {
      fields: ["closed"],
    },
  ],
})
export class Meeting extends Model<Meeting> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: "clients",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  client_id: number;

  @ForeignKey(() => Seller)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: "sellers",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  seller_id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      notEmpty: true,
    },
  })
  meeting_at: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  closed: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  transcript: string;

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

  @BelongsTo(() => Client, { foreignKey: "client_id", as: "client" })
  client: Client;

  @BelongsTo(() => Seller, { foreignKey: "seller_id", as: "seller" })
  seller: Seller;

  @HasMany(() => MeetingClassification, {
    foreignKey: "meeting_id",
    as: "classifications",
  })
  classifications: MeetingClassification[];
}
