import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Questionnaire, QuestionnaireSchema } from './questionnaire.schema';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionModule } from '../question/question.module';
import { QuestionnaireSeederService } from './questionnaire-seeder.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Questionnaire.name, schema: QuestionnaireSchema },
    ]),
    QuestionModule, // Required for resolving questions in getResolved()
  ],
  providers: [QuestionnaireService, QuestionnaireSeederService],
  controllers: [QuestionnaireController],
})
export class QuestionnaireModule {}
