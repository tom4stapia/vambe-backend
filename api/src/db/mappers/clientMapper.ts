import { ClientData, ClientCSVRow } from '../types';

export class ClientMapper {
  /**
   * Transform CSV row to client database format
   * @param csvRow - Raw CSV row data
   * @returns Client data for database insertion
   */
  static mapFromCSV(csvRow: ClientCSVRow): ClientData {
    return {
      name: this.sanitizeName(csvRow['Nombre']),
      email: this.sanitizeEmail(csvRow['Correo Electronico']),
      phone: this.sanitizePhone(csvRow['Numero de Telefono']),
      created_at: new Date(),
      updated_at: new Date()
    };
  }

  /**
   * Sanitize and validate name field
   * @param name - Raw name from CSV
   * @returns Sanitized name
   */
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

  /**
   * Sanitize and validate email field
   * @param email - Raw email from CSV
   * @returns Sanitized email or null if invalid
   */
  static sanitizeEmail(email: string | null): string | null {
    if (!email || typeof email !== 'string') {
      return null;
    }
    
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailRegex.test(cleanEmail) ? cleanEmail : null;
  }

  /**
   * Sanitize and validate phone field
   * @param phone - Raw phone from CSV
   * @returns Sanitized phone or null if invalid
   */
  static sanitizePhone(phone: string | null): string | null {
    if (!phone || typeof phone !== 'string') {
      return null;
    }
    
    // Remove all non-numeric characters except +
    const cleanPhone = phone.trim().replace(/[^\d+]/g, '');
    
    // Validate phone format (basic validation)
    if (cleanPhone.length >= 8 && cleanPhone.length <= 15) {
      return cleanPhone;
    }
    
    return null;
  }

  /**
   * Validate client data before insertion
   * @param clientData - Client data to validate
   * @returns True if valid
   */
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
