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
} from "sequelize-typescript";
import { Meeting } from "./meeting.model";

@Table({
  tableName: "meetings_classifications",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  indexes: [
    {
      unique: true,
      fields: ["meeting_id"],
      name: "meetings_classifications_meeting_id_unique",
    },
    {
      fields: ["processed_at"],
      name: "meetings_classifications_processed_at_index",
    },
  ],
})
export class MeetingClassification extends Model<MeetingClassification> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Meeting)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: "meetings",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  meeting_id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: "Análisis de BusinessSector basado en la reunión",
  })
  business_sector: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: "Análisis de CompanySize basado en la reunión",
  })
  company_size: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: "Análisis de Region basado en la reunión",
  })
  region: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: "Análisis de LeadSource basado en la reunión",
  })
  lead_source: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: "Análisis de VambeProduct basado en la reunión",
  })
  vambe_product: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: "Análisis de UseCase basado en la reunión",
  })
  use_case: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: "Análisis de PrimaryPainPoint basado en la reunión",
  })
  primary_pain_point: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: "Análisis de Urgency basado en la reunión",
  })
  urgency: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: "Análisis de DecisionMakerRole basado en la reunión",
  })
  decision_maker_role: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: "Análisis de PurchaseStage basado en la reunión",
  })
  purchase_stage: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: "Análisis de Language basado en la reunión",
  })
  language: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    comment: "Cliente perdido por mala reunión",
  })
  lost_client_bad_meeting: boolean;

  // Campos mantenidos
  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: [],
  })
  categories: string[];

  @Column({
    type: DataType.DECIMAL(3, 2),
    allowNull: false,
    defaultValue: 0.0,
  })
  confidence_score: number;

  @Column({
    type: DataType.ENUM("positive", "neutral", "negative"),
    allowNull: false,
  })
  sentiment: "positive" | "neutral" | "negative";

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: [],
  })
  key_topics: string[];

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: [],
  })
  action_items: string[];

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  next_steps: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  summary: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  model_used: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  processed_at: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  processing_time_ms: number;

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
  @BelongsTo(() => Meeting, { foreignKey: "meeting_id", as: "meeting" })
  meeting: Meeting;
}
