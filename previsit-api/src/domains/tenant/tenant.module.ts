import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantController } from './tenant.controller';
import { Tenant, TenantSchema } from './tenant.schema';
import { TenantService } from './tenant.service';
import { TenantSeederService } from '@api/domains/tenant/tenant-seeder.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }]),
  ],
  providers: [TenantService, TenantSeederService],
  controllers: [TenantController],
  exports: [TenantService],
})
export class TenantModule {}
