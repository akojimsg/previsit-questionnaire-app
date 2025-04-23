import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { CreateTenantDto } from './dtos/create-tenant.dto';
import { UpdateTenantDto } from './dtos/update-tenant.dto';
import { TenantService } from './tenant.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TenantResponseDto } from './dtos/tenant-response.dto';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The tenant has been successfully created.',
    type: TenantResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request. The provided data is invalid.',
  })
  create(@Body() dto: CreateTenantDto) {
    return this.tenantService.create(dto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all the tenants.',
    type: TenantResponseDto,
    isArray: true,
  })
  findAll() {
    return this.tenantService.findAll();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tenant with the specified tenantId.',
    type: TenantResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The tenant with the given tenantId was not found.',
  })
  @Get(':tenantId')
  findById(@Param('tenantId') tenantId: string) {
    return this.tenantService.findByTenantId(tenantId);
  }

  @Put(':tenantId')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The tenant was updated successfully.',
    type: TenantResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request. The provided data is invalid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found. The tenant with the given ID does not exist.',
  })
  update(@Param('tenantId') tenantId: string, @Body() dto: UpdateTenantDto) {
    return this.tenantService.update(tenantId, dto);
  }

  @Delete(':tenantId')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The tenant was deleted successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found. The tenant with the given ID does not exist.',
  })
  remove(@Param('tenantId') tenantId: string) {
    return this.tenantService.remove(tenantId);
  }
}
