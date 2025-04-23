import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiAcceptedResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiHeader,
  ApiParam,
} from '@nestjs/swagger';
import { EhrFieldMappingService } from './ehr-field-mapping.service';
import { EhrFieldMapping } from './ehr-field-mapping.schema';
import { CreateEhrFieldMappingDto } from './dtos/create-field-mapping.dto';
import {
  EhrFieldMappingResponseDto,
  EhrResolvedFieldMappingResponseDto,
} from './dtos/field-mapping-response.dto';
import { TenantId } from '@api/common/decorators/tenant-id.decorator';

@ApiTags('EHR field mapping')
@Controller('ehr-mappings')
export class EhrFieldMappingController {
  constructor(private readonly ehrService: EhrFieldMappingService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new EHR field mapping.',
  })
  @ApiHeader({
    name: 'x-tenant-id',
    required: true,
    description: 'Tenant identifier',
  })
  @ApiCreatedResponse({
    description: 'Create a new EHR field mapping',
    type: EhrFieldMappingResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The provided data is invalid.',
  })
  async create(
    @TenantId() tenantId: string,
    @Body() body: CreateEhrFieldMappingDto,
  ) {
    return this.ehrService.create(tenantId, body);
  }

  @Get()
  @ApiOperation({
    summary:
      'Get all EHR field mappings for the tenant optionally filter by provider.',
  })
  @ApiHeader({
    name: 'x-tenant-id',
    required: true,
    description: 'Tenant identifier',
  })
  @ApiQuery({
    name: 'ehrProvider',
    required: false,
    description: 'Filter by EHR provider',
  })
  @ApiOkResponse({
    description: 'Status OK',
    type: EhrFieldMappingResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The provided data is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'No EHR mapping found for the specified provider',
  })
  async findByTenant(
    @TenantId() tenantId: string,
    @Query('ehrProvider') ehrProvider?: string,
  ) {
    if (!tenantId) {
      throw new BadRequestException(
        'Tenant ID is required in the x-tenant-id header',
      );
    }
    // Input can be sanitized before being passed to the service
    return this.ehrService.findByEhrTenant(tenantId, ehrProvider);
  }

  @Put()
  @ApiHeader({
    name: 'x-tenant-id',
    required: true,
    description: 'Tenant identifier',
  })
  @ApiOperation({
    summary: 'Update the specified EHR field mapping.',
  })
  @ApiCreatedResponse({
    description: 'Create a new EHR field mapping',
    type: EhrFieldMappingResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The provided data is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'No EHR mapping found for the specified provider',
  })
  @ApiConflictResponse({
    description: 'Conflict. The mapping already exists.',
  })
  async update(
    @TenantId() tenantId: string,
    @Body() updates: Partial<EhrFieldMapping>,
  ) {
    return this.ehrService.update(tenantId, updates);
  }

  @Delete()
  @ApiHeader({
    name: 'x-tenant-id',
    required: true,
    description: 'Tenant identifier',
  })
  @ApiOperation({
    summary: 'Delete mapping by tenant header, provider, and question.',
  })
  @ApiQuery({ name: 'ehrProvider', required: true })
  @ApiQuery({ name: 'questionKey', required: true })
  @ApiAcceptedResponse({
    description: 'Mapping deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The provided data is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'No EHR mapping found for the specified provider',
  })
  async deleteByCompositeKey(
    @TenantId() tenantId: string,
    @Query('ehrProvider') ehrProvider: string,
    @Query('questionKey') questionKey: string,
  ) {
    await this.ehrService.deleteByCompositeKey(
      tenantId,
      ehrProvider,
      questionKey,
    );
    return { message: 'Deleted successfully' };
  }

  @Get('resolve/question/:questionKey')
  @ApiOperation({ summary: 'Resolve EHR field mapping for a question.' })
  @ApiHeader({ name: 'tenantId', required: true })
  @ApiParam({ name: 'questionKey', required: true })
  @ApiQuery({ name: 'ehrProvider' })
  @ApiOkResponse({
    description: 'Resolved EHR field mapping',
    type: EhrResolvedFieldMappingResponseDto,
    isArray: true,
  })
  async resolve(
    @TenantId() tenantId: string,
    @Param('questionKey') questionKey: string,
    @Query('ehrProvider') ehrProvider: string,
  ) {
    return this.ehrService.resolveFieldMapping(
      tenantId,
      ehrProvider,
      questionKey,
    );
  }
}
