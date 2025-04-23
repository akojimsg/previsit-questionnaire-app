import {
  Controller,
  Post,
  Get,
  Body,
  Headers,
  NotFoundException,
  HttpStatus,
  BadRequestException,
  Query,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './dtos/create-questionnaire.dto';
import { Questionnaire } from './questionnaire.schema';
import {
  QuestionnaireResponseDto,
  ResolvedQuestionnaireResponse,
} from './dtos/questionnaire-response.dto';
import { QuestionService } from '../question/question.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { TenantId } from '@api/common/decorators/tenant-id.decorator';
import { toPlainMap } from '@api/utils/functions';

@ApiTags('Questionnaires')
@Controller('questionnaire')
export class QuestionnaireController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly questionnaireService: QuestionnaireService,
    private readonly questionService: QuestionService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a new questionnaire.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Questionnaire created',
    type: QuestionnaireResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request. The provided data is invalid.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict. The questionnaire already exists for this tenant.',
  })
  async create(@Body() dto: CreateQuestionnaireDto): Promise<Questionnaire> {
    return this.questionnaireService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'List of questionnaires for tenant.',
  })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of questionnaires for tenant.',
    type: QuestionnaireResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request. The provided data is invalid.',
  })
  async findAll(@TenantId() tenantId: string): Promise<Questionnaire[]> {
    return this.questionnaireService.findAll(tenantId);
  }

  @Get('resolved')
  @ApiOperation({
    summary: 'Get questionnaire and its questions.',
  })
  @ApiResponse({
    status: 200,
    description: 'Get questionnaire and its questions.',
    type: ResolvedQuestionnaireResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Questionnaire not found.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Question not found',
  })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  async getResolvedByName(
    @TenantId() tenantId: string,
    @Query('name') name: string,
    @Query('lang') lang = 'en',
  ): Promise<ResolvedQuestionnaireResponse> {
    if (!name) {
      throw new BadRequestException('Missing "name" query parameter');
    }

    const questionnaire = await this.questionnaireService.findByName(
      tenantId,
      name,
    );

    if (!questionnaire) {
      throw new NotFoundException(`Questionnaire "${name}" not found`);
    }

    const questions = await this.questionService.findByKeys(
      questionnaire.questionKeys,
    );

    const localizedQuestions = questions.map((q) => {
      const text = toPlainMap(q.text);
      const category = toPlainMap(q.category);

      return {
        questionKey: q.questionKey,
        label: text[lang] ?? text['en'] ?? 'Missing label',
        type: q.type,
        isRequired: q.isRequired,
        category: category[lang] ?? '',
        options: (q.options ?? []).map((opt) => {
          const labelMap = toPlainMap(opt.label);
          return {
            value: opt.value,
            label: labelMap[lang] ?? labelMap['en'] ?? '',
          };
        }),
      };
    });

    const qName = toPlainMap(questionnaire.name);
    const qDesc = toPlainMap(questionnaire.description);
    const qSubmitButtonLabel = toPlainMap(questionnaire.submitButtonLabel);

    return {
      name: qName[lang] ?? qName['en'] ?? '',
      description: qDesc[lang] ?? qDesc['en'] ?? '',
      submitButtonLabel:
        qSubmitButtonLabel[lang] ?? qSubmitButtonLabel['en'] ?? 'Submit',
      questions: localizedQuestions,
    };
  }
}
