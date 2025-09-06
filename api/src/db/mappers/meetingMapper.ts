import { MeetingData, ClientCSVRow } from '../types';

export class MeetingMapper {
  /**
   * Transform CSV row to meeting database format
   * @param csvRow - Raw CSV row data
   * @param clientId - Client ID from database
   * @param sellerId - Seller ID from database
   * @returns Meeting data for database insertion
   */
  static mapFromCSV(csvRow: ClientCSVRow, clientId: number, sellerId: number): MeetingData {
    return {
      client_id: clientId,
      seller_id: sellerId,
      meeting_at: this.parseMeetingDate(csvRow['Fecha de la Reunion']),
      closed: this.parseClosed(csvRow['closed']),
      transcript: this.sanitizeTranscript(csvRow['Transcripcion']),
      created_at: new Date(),
      updated_at: new Date()
    };
  }

  /**
   * Parse meeting date from CSV
   * @param dateString - Date string from CSV
   * @returns Parsed date
   */
  static parseMeetingDate(dateString: string | null): Date {
    if (!dateString || typeof dateString !== 'string') {
      throw new Error('Meeting date is required');
    }
    
    const date = new Date(dateString.trim());
    
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date format: ${dateString}`);
    }
    
    return date;
  }

  /**
   * Parse closed status from CSV
   * @param closedValue - Closed value from CSV
   * @returns Boolean closed status
   */
  static parseClosed(closedValue: string | null): boolean {
    if (closedValue === null || closedValue === undefined) {
      return false;
    }
    
    const stringValue = String(closedValue).trim().toLowerCase();
    
    return stringValue === '1' || 
           stringValue === 'true' || 
           stringValue === 'yes' || 
           stringValue === 'closed';
  }

  /**
   * Sanitize transcript text
   * @param transcript - Raw transcript from CSV
   * @returns Sanitized transcript
   */
  static sanitizeTranscript(transcript: string | null): string | null {
    if (!transcript || typeof transcript !== 'string') {
      return null;
    }
    
    const cleanTranscript = transcript.trim();
    return cleanTranscript.length > 0 ? cleanTranscript : null;
  }

  /**
   * Validate meeting data
   * @param meetingData - Meeting data to validate
   * @returns True if valid
   */
  static validate(meetingData: MeetingData): boolean {
    if (!meetingData.client_id || !Number.isInteger(meetingData.client_id)) {
      throw new Error('Valid client_id is required');
    }
    
    if (!meetingData.seller_id || !Number.isInteger(meetingData.seller_id)) {
      throw new Error('Valid seller_id is required');
    }
    
    if (!meetingData.meeting_at || !(meetingData.meeting_at instanceof Date)) {
      throw new Error('Valid meeting_at date is required');
    }
    
    if (typeof meetingData.closed !== 'boolean') {
      throw new Error('Closed must be a boolean value');
    }
    
    return true;
  }
}
