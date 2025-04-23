/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questionnaire, QuestionnaireDocument } from './questionnaire.schema';
import { questionnaireSeedData } from './questionnaire.config';

@Injectable()
export class QuestionnaireSeederService implements OnModuleInit {
  private readonly logger = new Logger(QuestionnaireSeederService.name);

  constructor(
    @InjectModel(Questionnaire.name)
    private readonly model: Model<QuestionnaireDocument>,
  ) {}

  async onModuleInit() {
    this.logger.log('Seeding questionnaires...');
    for (const q of questionnaireSeedData) {
      const exists = await this.model.findOne({
        tenantId: q.tenantId,
        name: q.name,
      });

      if (!exists) {
        await this.model.create(q);
        this.logger.log(`Seeded questionnaire: ${q.name}`);
      } else {
        this.logger.log(`Skipped existing questionnaire: ${q.name}`);
      }
    }
  }
}
