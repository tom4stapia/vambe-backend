export interface CSVRow {
  [key: string]: string | null;
}

export interface ClientData {
  name: string;
  email: string | null;
  phone: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface SellerData {
  name: string;
  email: string;
  phone: string | null;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface MeetingData {
  client_id: number;
  seller_id: number;
  meeting_at: Date;
  closed: boolean;
  transcript: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface PopulationResult {
  inserted: number;
  skipped?: number;
}

export interface PopulationSummary {
  clients: PopulationResult;
  sellers: PopulationResult;
  meetings: PopulationResult;
  total: number;
}

export interface DatabaseRecord {
  id: number;
  name: string;
}

export interface ClientCSVRow extends CSVRow {
  'Nombre': string;
  'Correo Electronico': string;
  'Numero de Telefono': string;
  'Fecha de la Reunion': string;
  'Vendedor asignado': string;
  'closed': string;
  'Transcripcion': string;
}
