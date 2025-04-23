import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({
    description: 'Unique identifier for the tenant',
    example: 'clinic-123',
    uniqueItems: true,
  })
  @IsString()
  tenantId!: string;

  @ApiProperty({
    description: 'Name of the tenant',
    example: 'Clinic 123',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Description of the tenant, used for documentation purposes',
    example: 'This is a test tenant',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'EHR provider name, e.g., "Athena", "Allscripts"',
    example: 'Athena',
    // enum: ['Athena', 'Allscripts'],
    // enumName: 'EHRProviders',
  })
  @IsString()
  @IsIn(['Athena', 'Allscripts']) // Extendable
  ehrProvider!: string;

  @ApiProperty({
    description:
      'Additional configuration for the EHR provider, e.g., API key, endpoint',
    example: { apiKey: 'your-api-key', baseUrl: 'https://api.example.com' },
  })
  @IsOptional()
  ehrConfig?: Record<string, string>;
}
