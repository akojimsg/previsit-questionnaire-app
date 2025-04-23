import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './question.schema';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionSeederService } from './question-seeder.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  providers: [QuestionService, QuestionSeederService],
  controllers: [QuestionController],
  exports: [QuestionService],
})
export class QuestionModule {}
