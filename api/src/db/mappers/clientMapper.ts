import { ClientData, ClientCSVRow } from '../types';

export class ClientMapper {

  static mapFromCSV(csvRow: ClientCSVRow): ClientData {
    return {
      name: this.sanitizeName(csvRow['Nombre']),
      email: this.sanitizeEmail(csvRow['Correo Electronico']),
      phone: this.sanitizePhone(csvRow['Numero de Telefono']),
      created_at: new Date(),
      updated_at: new Date()
    };
  }

  static sanitizeName(name: string | null): string {
    if (!name || typeof name !== 'string') {
      throw new Error('Client name is required');
    }
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      throw new Error('Client name cannot be empty');
    }
    return trimmedName;
  }

  static sanitizeEmail(email: string | null): string | null {
    if (!email || typeof email !== 'string') {
      return null;
    }
    
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailRegex.test(cleanEmail) ? cleanEmail : null;
  }

  static sanitizePhone(phone: string | null): string | null {
    if (!phone || typeof phone !== 'string') {
      return null;
    }
    
    const cleanPhone = phone.trim().replace(/[^\d+]/g, '');
    
    
    if (cleanPhone.length >= 8 && cleanPhone.length <= 15) {
      return cleanPhone;
    }
    
    return null;
  }

  static validate(clientData: ClientData): boolean {
    if (!clientData.name || clientData.name.trim().length === 0) {
      throw new Error('Client name cannot be empty');
    }
    
    if (clientData.email && !this.sanitizeEmail(clientData.email)) {
      throw new Error('Invalid email format');
    }
    
    return true;
  }
}
