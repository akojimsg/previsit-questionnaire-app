import { ApiProperty } from '@nestjs/swagger';

export class EhrFieldMappingResponseDto {
  @ApiProperty()
  tenantId!: string;

  @ApiProperty()
  ehrProvider!: string;

  @ApiProperty()
  questionKey!: string;

  @ApiProperty()
  endpoint!: string;

  @ApiProperty()
  ehrField!: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}

export class EhrResolvedFieldMappingResponseDto {
  @ApiProperty()
  ehrProvider!: string;

  @ApiProperty()
  endpoint!: string;

  @ApiProperty()
  ehrField!: string;
}

export class BulkUploadResponseDto {
  @ApiProperty({
    example: 20,
    description: 'Number of successfully inserted mappings',
  })
  success!: number;

  @ApiProperty({ example: 5, description: 'Number of failed insert attempts' })
  failed!: number;
}
