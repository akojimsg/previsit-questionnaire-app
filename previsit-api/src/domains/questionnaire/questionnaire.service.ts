/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questionnaire, QuestionnaireDocument } from './questionnaire.schema';
import { QuestionService } from '@api/domains/question/question.service';
import { CreateQuestionnaireDto } from './dtos/create-questionnaire.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire.name)
    private readonly questionnaireModel: Model<QuestionnaireDocument>,
    private readonly questionService: QuestionService,
  ) {}

  async create(dto: CreateQuestionnaireDto): Promise<Questionnaire> {
    const exists = await this.questionnaireModel.findOne({
      tenantId: dto.tenantId,
      'name.en': dto.name['en'],
    });

    if (exists) {
      throw new ConflictException(
        `Questionnaire "${dto.name}" already exists for this tenant.`,
      );
    }

    return this.questionnaireModel.create(dto);
  }

  async findAll(tenantId: string): Promise<Questionnaire[]> {
    return this.questionnaireModel.find({ tenantId }).exec();
  }

  async findOne(id: string): Promise<Questionnaire> {
    const questionnaire = await this.questionnaireModel.findById(id).exec();
    if (!questionnaire) throw new NotFoundException('Questionnaire not found');
    return questionnaire;
  }

  /**
   * Returns questionnaire by name
   * @param tenantId
   * @param name
   * @returns Questionnaire for the given tenant and name
   * @throws NotFoundException if not found
   */
  async findByName(
    tenantId: string,
    name: string,
  ): Promise<Questionnaire | null> {
    return this.questionnaireModel
      .findOne({
        tenantId,
        [`name.en`]: name,
      })
      .exec();
  }

  /**
   * Returns full questionnaire with resolved question objects
   */
  async getResolved(
    id: string,
    lang = 'en',
  ): Promise<{
    name: string;
    description?: string;
    tenantId: string;
    questions: any[]; // or use LocalizedQuestion[]
  }> {
    const questionnaire = await this.findOne(id);

    const questions = await this.questionService.findByKeys(
      questionnaire.questionKeys,
    );

    const localizedQuestions = questions.map((q) => ({
      questionKey: q.questionKey,
      label: q.text?.[lang] ?? q.text?.['en'] ?? 'Missing label',
      type: q.type,
      options: q.options?.map((opt) => ({
        value: opt.value,
        label: opt.label?.[lang] ?? opt.label?.['en'] ?? '',
      })),
      isRequired: q.isRequired,
      category: q.category?.[lang] ?? '',
    }));

    return {
      name: questionnaire.name?.[lang] ?? questionnaire.name?.['en'] ?? '',
      description:
        questionnaire.description?.[lang] ??
        questionnaire.description?.['en'] ??
        '',
      tenantId: questionnaire.tenantId,
      questions: localizedQuestions,
    };
  }
}
