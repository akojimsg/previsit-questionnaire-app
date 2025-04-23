import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiHeader,
  ApiOperation,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { PatientAnswerService } from './patient-answer.service';
import { SubmitResponseDto } from './dtos/create-answer.dto';
import { PatientAnswerResponseDto } from './dtos/answer-response.dto';

@ApiTags('Patient answers')
@Controller('answers')
export class PatientAnswerController {
  constructor(private readonly service: PatientAnswerService) {}

  @Post()
  @ApiOperation({
    summary: 'Submit a response for a patient.',
  })
  @ApiHeader({
    name: 'x-tenant-id',
    required: true,
    description: 'Tenant identifier',
  })
  @ApiCreatedResponse({
    description: 'Patient response submitted.',
    type: PatientAnswerResponseDto,
  })
  @ApiConflictResponse({
    description:
      'Conflict. A response already exists for the given patientId and questionnaireName.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The provided data is invalid.',
  })
  async submit(
    @Headers('x-tenant-id') tenantId: string,
    @Body() dto: SubmitResponseDto,
  ): Promise<PatientAnswerResponseDto> {
    if (!tenantId || !dto.patientId)
      throw new BadRequestException('Missing x-tenant-id header');
    return this.service.create({ ...dto, tenantId });
  }

  @Get()
  @ApiOperation({
    summary: 'Get responses for a patient.',
  })
  @ApiHeader({
    name: 'x-tenant-id',
    required: true,
    description: 'Tenant identifier',
  })
  @ApiOkResponse({
    description: 'Responses for a patient.',
    type: PatientAnswerResponseDto,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'No responses found for the given patientId.',
  })
  async findByPatient(
    @Headers('x-tenant-id') tenantId: string,
    @Query('patientId') patientId: string,
  ): Promise<PatientAnswerResponseDto[]> {
    if (!tenantId) throw new BadRequestException('Missing x-tenant-id header');
    return this.service.findByPatient(tenantId, patientId);
  }
}
