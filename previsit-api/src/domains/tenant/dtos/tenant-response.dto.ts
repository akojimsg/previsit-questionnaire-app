import { ApiProperty } from '@nestjs/swagger';

export class TenantResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the tenant',
    example: 'clinic-123',
    uniqueItems: true,
  })
  tenantId!: string;

  @ApiProperty({
    description: 'Name of the tenant',
    example: 'Clinic 123',
  })
  name!: string;

  @ApiProperty({
    description: 'Description of the tenant, used for documentation purposes',
    example: 'This is a test tenant',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'EHR provider name, e.g., "Athena", "Allscripts"',
    example: 'Athena',
  })
  ehrProvider!: string;

  @ApiProperty({
    description:
      'Additional configuration for the EHR provider, e.g., API key, baseUrl',
    example: { apiKey: 'your-api-key', baseUrl: 'https://api.example.com' },
    required: false,
  })
  ehrConfig?: Record<string, string>;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
