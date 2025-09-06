import * as fs from 'fs';
import { CSVRow } from '../types';

export class CSVParser {
  /**
   * Parse CSV file and return array of objects
   * @param filePath - Path to CSV file
   * @returns Parsed CSV data
   */
  static async parseFile(filePath: string): Promise<CSVRow[]> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return this.parseContent(content);
    } catch (error) {
      throw new Error(`Failed to read CSV file: ${(error as Error).message}`);
    }
  }

  /**
   * Parse CSV content string
   * @param content - CSV content
   * @returns Parsed CSV data
   */
  static parseContent(content: string): CSVRow[] {
    const lines = content.trim().split('\n');
    
    if (lines.length < 2) {
      throw new Error('CSV file must have at least a header and one data row');
    }

    const headers = this.parseCSVLine(lines[0]);
    const data: CSVRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) { // Skip empty lines
        const values = this.parseCSVLine(lines[i]);
        if (values.length === headers.length) {
          const row: CSVRow = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || null;
          });
          data.push(row);
        }
      }
    }

    return data;
  }

  /**
   * Parse a single CSV line handling quoted values
   * @param line - CSV line
   * @returns Array of values
   */
  static parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }
}
