import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant, TenantDocument } from './tenant.schema';
import { tenantConfig } from './tenant.config';

@Injectable()
export class TenantSeederService implements OnModuleInit {
  private readonly logger = new Logger(TenantSeederService.name);

  constructor(
    @InjectModel(Tenant.name)
    private readonly tenantModel: Model<TenantDocument>,
  ) {}

  async onModuleInit() {
    this.logger.log('Seeding tenants...');
    for (const tenant of tenantConfig) {
      const exists = await this.tenantModel.findOne({
        tenantId: tenant.tenantId,
      });

      if (!exists) {
        await this.tenantModel.create(tenant);
        this.logger.log(`Inserted: ${tenant.tenantId} (${tenant.name})`);
      } else {
        this.logger.log(
          `Exists: ${tenant.tenantId} (${tenant.name}) (skipped)`,
        );
      }
    }
  }
}
