import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientAnswer, PatientAnswerDocument } from './patient-answer.schema';
import { patientAnswers } from '@api/domains/patient-answer/patient-answer.config';

@Injectable()
export class PatientAnswerSeederService implements OnModuleInit {
  private readonly logger = new Logger(PatientAnswerSeederService.name);

  constructor(
    @InjectModel(PatientAnswer.name)
    private readonly patientAnswerModel: Model<PatientAnswerDocument>,
  ) {}

  async onModuleInit() {
    this.logger.log('Seeding patient answers...');
    for (const entry of patientAnswers) {
      const exists = await this.patientAnswerModel.findOne({
        tenantId: entry.tenantId,
        questionnaireName: entry.questionnaireName,
        patientId: entry.patientId,
        submittedAt: entry.submittedAt,
      });

      if (!exists) {
        await this.patientAnswerModel.create(entry);
        this.logger.log(
          `Inserted: ${entry.questionnaireName} (${entry.patientId})`,
        );
      } else {
        this.logger.log(
          `Exists: ${entry.questionnaireName} (${entry.patientId}) (skipped)`,
        );
      }
    }
  }
}
