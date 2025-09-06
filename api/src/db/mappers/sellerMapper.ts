import { SellerData, ClientCSVRow } from '../types';

export class SellerMapper {
  /**
   * Extract unique sellers from CSV data
   * @param csvData - Array of CSV rows
   * @returns Array of unique seller data
   */
  static extractSellersFromCSV(csvData: ClientCSVRow[]): SellerData[] {
    const sellersMap = new Map<string, SellerData>();
    
    csvData.forEach(row => {
      const sellerName = this.sanitizeName(row['Vendedor asignado']);
      if (sellerName && !sellersMap.has(sellerName)) {
        sellersMap.set(sellerName, this.createSellerData(sellerName));
      }
    });
    
    return Array.from(sellersMap.values());
  }

  /**
   * Create seller data object
   * @param name - Seller name
   * @returns Seller data for database insertion
   */
  static createSellerData(name: string): SellerData {
    return {
      name: name,
      email: this.generateEmail(name),
      phone: null, // No phone data in CSV
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    };
  }

  /**
   * Generate email based on seller name
   * @param name - Seller name
   * @returns Generated email
   */
  static generateEmail(name: string): string {
    const cleanName = name.toLowerCase()
      .replace(/[^a-z\s]/g, '')
      .replace(/\s+/g, '.');
    
    return `${cleanName}@vambe.com`;
  }

  /**
   * Sanitize seller name
   * @param name - Raw name from CSV
   * @returns Sanitized name or null if invalid
   */
  static sanitizeName(name: string | null): string | null {
    if (!name || typeof name !== 'string') {
      return null;
    }
    
    const cleanName = name.trim();
    return cleanName.length > 0 ? cleanName : null;
  }

  /**
   * Validate seller data
   * @param sellerData - Seller data to validate
   * @returns True if valid
   */
  static validate(sellerData: SellerData): boolean {
    if (!sellerData.name || sellerData.name.trim().length === 0) {
      throw new Error('Seller name cannot be empty');
    }
    
    if (!sellerData.email || sellerData.email.trim().length === 0) {
      throw new Error('Seller email cannot be empty');
    }
    
    return true;
  }
}
