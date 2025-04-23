/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './question.schema';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { QuestionResponseDto } from '@api/domains/question/dtos/question-response-dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
  ) {}
  /**
   * Helper - converts a Question document to a localized DTO.
   * @param question - The question document.
   * @param lang - The language code for localization.
   * @returns The localized question response DTO.
   */
  toLocalizedDto(
    question: QuestionDocument,
    lang: string,
  ): QuestionResponseDto {
    return {
      tenantId: question.tenantId,
      questionKey: question.questionKey,
      text: question.text?.[lang] || question.text?.['en'] || '',
      description: question.description?.[lang] || '',
      type: question.type as any,
      category: question.category?.[lang] || '',
      isRequired: question.isRequired,
      options: question.options?.map((opt) => ({
        value: opt.value,
        label: opt.label?.[lang] || '',
      })),
    };
  }
  /**
   * Creates a new question.
   * @param tenantId - The tenant identifier.
   * @param dto - The data transfer object containing question details.
   * @returns The created question.
   * @throws ConflictException if a question with the same key already exists for the tenant.
   */
  async create(tenantId: string, dto: CreateQuestionDto): Promise<Question> {
    const exists = await this.questionModel.findOne({
      tenantId,
      questionKey: dto.questionKey,
    });

    if (exists) {
      throw new ConflictException(
        `Question with key "${dto.questionKey}" already exists for tenant "${tenantId}"`,
      );
    }
    dto.tenantId = tenantId; // Set the tenantId in the DTO
    return this.questionModel.create(dto);
  }

  async findAll(tenantId?: string): Promise<Question[]> {
    const filter = tenantId ? { tenantId } : {};
    return this.questionModel.find(filter).exec();
  }

  async findByKey(questionKey: string): Promise<Question | null> {
    return this.questionModel.findOne({ questionKey }).exec();
  }

  async findByKeys(questionKeys: string[]): Promise<Question[]> {
    return this.questionModel
      .find({ questionKey: { $in: questionKeys } })
      .exec();
  }

  async findLocalizedAll(
    tenantId: string,
    lang = 'en',
  ): Promise<QuestionResponseDto[]> {
    const questions = await this.questionModel.find({ tenantId }).exec();
    return questions.map((q) => this.toLocalizedDto(q, lang));
  }

  // Add update/delete methods later etc
}
