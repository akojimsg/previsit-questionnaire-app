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
