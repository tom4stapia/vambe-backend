import * as path from 'path';
import * as fs from 'fs';

export class CsvUtils {
  
  static parseCSV(filePath: string): any[] {
    console.log(`📁 Reading CSV from: ${filePath}`);
    const csvContent = fs.readFileSync(filePath, 'utf-8');
    const lines = csvContent.split('\n').filter((line) => line.trim());
    const headers = lines[0].split(',').map((h) => h.trim());

    const csvData = lines.slice(1).map((line) => {
      const values = line.split(',').map((v) => v.trim());
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      return row;
    });

    console.log(`📊 Found ${csvData.length} rows in CSV`);
    return csvData;
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
