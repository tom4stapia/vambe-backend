import * as path from 'path';
import * as fs from 'fs';

export class CsvUtils {
  
  static parseCSV(filePath: string): any[] {
    console.log(`📁 Reading CSV from: ${filePath}`);
    const csvContent = fs.readFileSync(filePath, 'utf-8');
    const lines = csvContent.split('\n').filter((line) => line.trim());
    
    const headers = this.parseCSVLine(lines[0]);

    const csvData = lines.slice(1).map((line) => {
      const values = this.parseCSVLine(line);
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      return row;
    });

    console.log(`📊 Found ${csvData.length} rows in CSV`);
    return csvData;
  }

  private static parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    let i = 0;

    while (i < line.length) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i += 2;
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
          i++;
        }
      } else if (char === ',' && !inQuotes) {
        // End of field
        result.push(current.trim());
        current = '';
        i++;
      } else {
        current += char;
        i++;
      }
    }

    result.push(current.trim());
    return result;
  }

  static getCsvFilePath(): string {
    const possiblePaths = [
      path.join(__dirname, '../../../database/seeds/clients-meetings.csv'),
      path.join(process.cwd(), 'src/database/seeds/clients-meetings.csv'),
      path.join(process.cwd(), 'api/src/database/seeds/clients-meetings.csv'),
      '/app/src/database/seeds/clients-meetings.csv',
    ];

    let csvFilePath: string | null = null;
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        csvFilePath = possiblePath;
        break;
      }
    }

    if (!csvFilePath) {
      throw new Error(
        `CSV file not found. Tried paths: ${possiblePaths.join(', ')}`,
      );
    }

    return csvFilePath;
  }

  static validateCsvData(csvData: any[]): boolean {
    if (!csvData || csvData.length === 0) {
      throw new Error('CSV data is empty or invalid');
    }

    const requiredFields = [
      'Nombre',
      'Correo Electronico',
      'Vendedor asignado',
      'Fecha de la Reunion',
      'Transcripcion',
    ];

    const firstRow = csvData[0];
    for (const field of requiredFields) {
      if (!(field in firstRow)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    return true;
  }
}
