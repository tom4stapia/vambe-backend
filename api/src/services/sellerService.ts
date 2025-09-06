import { CreateSellerRequest, UpdateSellerRequest, SellerModel, PaginationQuery } from '../types/api';
import { Seller } from '../db/models/Seller';

export class SellerService {
  private Seller: typeof Seller;

  constructor(db: any) {
    this.Seller = db.Seller;
  }

  async getAllSellers(query: PaginationQuery): Promise<{ sellers: SellerModel[], total: number }> {
    const { page = 1, limit = 10, sortBy = 'id', sortOrder = 'ASC' } = query;
    const offset = (page - 1) * limit;

    const { count, rows } = await this.Seller.findAndCountAll({
      limit,
      offset,
      order: [[this.sanitizeColumn(sortBy), sortOrder]],
      raw: true
    });

    return {
      sellers: rows,
      total: count
    };
  }

  async getSellerById(id: number): Promise<SellerModel | null> {
    const seller = await this.Seller.findByPk(id, { raw: true });
    return seller;
  }

  async createSeller(sellerData: CreateSellerRequest): Promise<SellerModel> {
    const seller = await this.Seller.create({
      name: sellerData.name,
      email: sellerData.email,
      phone: sellerData.phone || null,
      active: sellerData.active !== undefined ? sellerData.active : true
    });

    return seller.toJSON() as SellerModel;
  }

  /**
   * Update seller
   */
  async updateSeller(id: number, sellerData: UpdateSellerRequest): Promise<SellerModel | null> {
    const seller = await this.Seller.findByPk(id);
    if (!seller) {
      throw new Error('Seller not found');
    }

    const updateData: any = {};
    if (sellerData.name !== undefined) updateData.name = sellerData.name;
    if (sellerData.email !== undefined) updateData.email = sellerData.email;
    if (sellerData.phone !== undefined) updateData.phone = sellerData.phone;
    if (sellerData.active !== undefined) updateData.active = sellerData.active;

    if (Object.keys(updateData).length === 0) {
      return seller.toJSON() as SellerModel;
    }

    await seller.update(updateData);
    return seller.toJSON() as SellerModel;
  }

  /**
   * Delete seller
   */
  async deleteSeller(id: number): Promise<boolean> {
    const seller = await this.Seller.findByPk(id, {
      include: ['meetings']
    });

    if (!seller) {
      throw new Error('Seller not found');
    }

    const meetingCount = seller.meetings?.length || 0;
    if (meetingCount > 0) {
      throw new Error('Cannot delete seller with associated meetings');
    }

    await seller.destroy();
    return true;
  }

  async getActiveSellers(): Promise<SellerModel[]> {
    const sellers = await this.Seller.findAll({
      where: { active: true },
      order: [['name', 'ASC']],
      raw: true
    });

    return sellers;
  }

  private sanitizeColumn(column: string): string {
    const allowedColumns = ['id', 'name', 'email', 'phone', 'active', 'created_at', 'updated_at'];
    return allowedColumns.includes(column) ? column : 'id';
  }
}
