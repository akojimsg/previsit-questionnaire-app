import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientAnswer, PatientAnswerSchema } from './patient-answer.schema';
import { PatientAnswerService } from './patient-answer.service';
import { PatientAnswerController } from './patient-answer.controller';
import { PatientAnswerSeederService } from '@api/domains/patient-answer/patient-answer-seeder.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PatientAnswer.name, schema: PatientAnswerSchema },
    ]),
  ],
  controllers: [PatientAnswerController],
  providers: [PatientAnswerService, PatientAnswerSeederService],
})
export class PatientAnswerModule {}
