import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './question.schema';
import { questionSeedData } from './question.config';

@Injectable()
export class QuestionSeederService implements OnModuleInit {
  private readonly logger = new Logger(QuestionSeederService.name);

  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
  ) {}

  async onModuleInit() {
    this.logger.log('Seeding questions...');
    for (const q of questionSeedData) {
      const exists = await this.questionModel.findOne({
        tenantId: q.tenantId,
        questionKey: q.questionKey,
      });

      if (!exists) {
        await this.questionModel.create(q);
        this.logger.log(`Seeded question: ${q.questionKey}`);
      } else {
        this.logger.log(`Skipped existing question: ${q.questionKey}`);
      }
    }
  }
}
