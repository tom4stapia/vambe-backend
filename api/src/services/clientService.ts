import { CreateClientRequest, UpdateClientRequest, ClientModel, PaginationQuery } from '../types/api';
import { Client } from '../db/models/Client';

export class ClientService {
  private Client: typeof Client;

  constructor(db: any) {
    this.Client = db.Client;
  }

  async getAllClients(query: PaginationQuery): Promise<{ clients: ClientModel[], total: number }> {
    const { page = 1, limit = 10, sortBy = 'id', sortOrder = 'ASC' } = query;
    const offset = (page - 1) * limit;

    const { count, rows } = await this.Client.findAndCountAll({
      limit,
      offset,
      order: [[this.sanitizeColumn(sortBy), sortOrder]],
      raw: true
    });

    return {
      clients: rows,
      total: count
    };
  }

  async getClientById(id: number): Promise<ClientModel | null> {
    const client = await this.Client.findByPk(id, { raw: true });
    return client;
  }

  async createClient(clientData: CreateClientRequest): Promise<ClientModel> {
    const client = await this.Client.create({
      name: clientData.name,
      email: clientData.email || null,
      phone: clientData.phone || null
    });

    return client.toJSON() as ClientModel;
  }

  async updateClient(id: number, clientData: UpdateClientRequest): Promise<ClientModel | null> {
    const client = await this.Client.findByPk(id);
    if (!client) {
      throw new Error('Client not found');
    }

    const updateData: any = {};
    if (clientData.name !== undefined) updateData.name = clientData.name;
    if (clientData.email !== undefined) updateData.email = clientData.email;
    if (clientData.phone !== undefined) updateData.phone = clientData.phone;

    if (Object.keys(updateData).length === 0) {
      return client.toJSON() as ClientModel;
    }

    await client.update(updateData);
    return client.toJSON() as ClientModel;
  }
  
  async deleteClient(id: number): Promise<boolean> {
    const client = await this.Client.findByPk(id);
    if (!client) {
      throw new Error('Client not found');
    }

    await client.destroy();
    return true;
  }

  private sanitizeColumn(column: string): string {
    const allowedColumns = ['id', 'name', 'email', 'phone', 'created_at', 'updated_at'];
    return allowedColumns.includes(column) ? column : 'id';
  }
}
