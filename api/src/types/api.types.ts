export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ClientModel {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateClientRequest {
  name: string;
  email?: string;
  phone?: string;
}

export interface UpdateClientRequest {
  name?: string;
  email?: string;
  phone?: string;
}

export interface SellerModel {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateSellerRequest {
  name: string;
  email: string;
  phone?: string;
  active?: boolean;
}

export interface UpdateSellerRequest {
  name?: string;
  email?: string;
  phone?: string;
  active?: boolean;
}

// Meeting Types
export interface MeetingModel {
  id: number;
  client_id: number;
  seller_id: number;
  meeting_at: Date;
  closed: boolean;
  transcript: string | null;
  created_at: Date;
  updated_at: Date;
  client?: ClientModel;
  seller?: SellerModel;
  classifications?: MeetingClassificationModel[];
}

export interface CreateMeetingRequest {
  client_id: number;
  seller_id: number;
  meeting_at: Date;
  transcript?: string;
}

export interface UpdateMeetingRequest {
  client_id?: number;
  seller_id?: number;
  meeting_at?: Date;
  closed?: boolean;
  transcript?: string;
}

// Meeting Classification Types
export interface MeetingClassificationModel {
  id: number;
  meeting_id: number;
  business_sector?: string;
  company_size?: string;
  region?: string;
  lead_source?: string;
  vambe_product?: string;
  use_case?: string;
  primary_pain_point?: string;
  urgency?: boolean;
  decision_maker_role?: string;
  purchase_stage?: string;
  language?: string;
  lost_client_bad_meeting?: boolean;
  categories: string[];
  confidence_score: number;
  sentiment: "positive" | "neutral" | "negative";
  key_topics: string[];
  action_items: string[];
  next_steps?: string;
  summary?: string;
  model_used: string;
  processed_at: Date;
  processing_time_ms?: number;
  created_at: Date;
  updated_at: Date;
  meeting?: MeetingModel;
}

export interface CreateMeetingClassificationRequest {
  meeting_id: number;
  business_sector?: string;
  company_size?: string;
  region?: string;
  lead_source?: string;
  vambe_product?: string;
  use_case?: string;
  primary_pain_point?: string;
  urgency?: boolean;
  decision_maker_role?: string;
  purchase_stage?: string;
  language?: string;
  lost_client_bad_meeting?: boolean;
  categories: string[];
  confidence_score: number;
  sentiment: "positive" | "neutral" | "negative";
  key_topics: string[];
  action_items: string[];
  next_steps?: string;
  summary?: string;
  model_used: string;
  processing_time_ms?: number;
}

// Worker Types
export interface WorkerTask {
  id: string;
  type: string;
  data: any;
  status: "pending" | "processing" | "completed" | "failed";
  created_at: Date;
  updated_at: Date;
  result?: any;
  error?: string;
}
