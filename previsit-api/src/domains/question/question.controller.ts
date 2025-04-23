// Header extraction can be abstracted using a decorator like @TenantId()
// This can be useful for extracting tenant ID from headers in a consistent way across different controllers
// and services. This would help in reducing boilerplate code and improving readability.
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Headers,
  HttpStatus,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.schema';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { QuestionResponseDto } from './dtos/question-response-dto';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('Questions')
@Controller('questions')
export class QuestionController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly questionService: QuestionService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a new question.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Question created successfully.',
    type: QuestionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request. The provided data is invalid.',
  })
  async create(
    @Headers('x-tenant-id') tenantId: string,
    @Body() dto: CreateQuestionDto,
  ): Promise<Question> {
    if (!tenantId) {
      throw new BadRequestException('Missing x-tenant-id header');
    }
    return this.questionService.create(tenantId, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all questions for the tenant.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Status OK',
    type: QuestionResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request. The provided data is invalid.',
  })
  async findAll(@Headers('x-tenant-id') tenantId: string): Promise<Question[]> {
    if (!tenantId) {
      throw new BadRequestException('Missing x-tenant-id header');
    }
    return this.questionService.findAll(tenantId);
  }

  @Get(':questionKey')
  @ApiOperation({
    summary: 'Get a question by its key.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a question by its key',
    type: QuestionResponseDto,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request. The provided data is invalid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Question not found',
  })
  async findOne(
    @Headers('x-tenant-id') tenantId: string,
    @Param('questionKey') key: string,
  ): Promise<Question> {
    if (!tenantId) {
      throw new BadRequestException('Missing x-tenant-id header');
    }
    const question = await this.questionService.findByKey(key);
    if (!question) throw new NotFoundException('Question not found');
    return question;
  }
}
