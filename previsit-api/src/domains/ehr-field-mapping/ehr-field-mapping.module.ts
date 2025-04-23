import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EhrFieldMapping,
  EhrFieldMappingSchema,
} from './ehr-field-mapping.schema';
import { EhrFieldMappingService } from './ehr-field-mapping.service';
import { MappingSeederService } from './mapping-seeder.service';
import { EhrFieldMappingController } from './ehr-field-mapping.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EhrFieldMapping.name, schema: EhrFieldMappingSchema },
    ]),
  ],
  providers: [EhrFieldMappingService, MappingSeederService],
  controllers: [EhrFieldMappingController],
  exports: [EhrFieldMappingService],
})
export class EhrFieldMappingModule {}
