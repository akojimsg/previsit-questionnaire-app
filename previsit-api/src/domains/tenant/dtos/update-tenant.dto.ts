import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTenantDto } from './create-tenant.dto';

export class UpdateTenantDto extends PartialType(CreateTenantDto) {
  @ApiProperty({ required: false, example: 'clinic-123' })
  tenantId?: string;

  @ApiProperty({ required: false, example: 'Clinic 123' })
  name?: string;

  @ApiProperty({ required: false, example: 'This is a test tenant' })
  description?: string;

  @ApiProperty({ required: false, example: 'Athena' })
  ehrProvider?: string;

  @ApiProperty({
    required: false,
    example: {
      apiKey: 'your-api-key',
      baseUrl: 'https://api.example.com',
    },
  })
  ehrConfig?: Record<string, string>;

  @ApiProperty({ required: false, example: true })
  isActive?: boolean;
}
