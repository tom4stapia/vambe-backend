import { Request, Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
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

export interface CreateMeetingRequest {
  client_id: number;
  seller_id: number;
  meeting_at: string; 
  transcript?: string;
}

export interface UpdateMeetingRequest {
  client_id?: number;
  seller_id?: number;
  meeting_at?: string;
  closed?: boolean;
  transcript?: string;
}

export type ControllerMethod = (req: Request, res: Response) => Promise<void>;

export interface ClientModel {
  id?: number;
  name: string;
  email: string | null;
  phone: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface SellerModel {
  id?: number;
  name: string;
  email: string;
  phone: string | null;
  active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface MeetingModel {
  id: number;
  client_id: number;
  seller_id: number;
  meeting_at: Date;
  closed: boolean;
  transcript: string | null;
  created_at: Date;
  updated_at: Date;
}
