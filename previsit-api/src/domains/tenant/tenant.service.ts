import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTenantDto } from './dtos/create-tenant.dto';
import { UpdateTenantDto } from './dtos/update-tenant.dto';
import { Tenant, TenantDocument } from './tenant.schema';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name) private tenantModel: Model<TenantDocument>,
  ) {}

  async create(dto: CreateTenantDto): Promise<Tenant> {
    return this.tenantModel.create(dto);
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantModel.find().exec();
  }

  async findByTenantId(tenantId: string): Promise<Tenant | null> {
    return this.tenantModel.findOne({ tenantId }).exec();
  }

  async update(tenantId: string, dto: UpdateTenantDto): Promise<Tenant | null> {
    return this.tenantModel
      .findOneAndUpdate({ tenantId }, dto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async remove(tenantId: string): Promise<void> {
    await this.tenantModel.deleteOne({ tenantId }).exec();
  }
}
