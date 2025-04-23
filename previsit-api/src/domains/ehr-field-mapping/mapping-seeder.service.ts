// domains/ehr/mapping-seeder.service.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EhrFieldMapping,
  EhrFieldMappingDocument,
} from './ehr-field-mapping.schema';
import { ehrFieldMappings } from './ehr-field-mapping.config';

@Injectable()
export class MappingSeederService implements OnModuleInit {
  private readonly logger = new Logger(MappingSeederService.name);

  constructor(
    @InjectModel(EhrFieldMapping.name)
    private readonly mappingModel: Model<EhrFieldMappingDocument>,
  ) {}

  async onModuleInit() {
    this.logger.log('Seeding EHR field mappings...');
    for (const mapping of ehrFieldMappings) {
      const exists = await this.mappingModel.findOne({
        tenantId: mapping.tenantId,
        ehrProvider: mapping.ehrProvider,
        questionKey: mapping.questionKey,
      });

      if (!exists) {
        await this.mappingModel.create(mapping);
        this.logger.log(`Inserted: ${mapping.tenantId} ${mapping.questionKey}`);
      } else {
        this.logger.log(
          `Exists: ${mapping.tenantId} ${mapping.questionKey} (skipped)`,
        );
      }
    }
  }
}
