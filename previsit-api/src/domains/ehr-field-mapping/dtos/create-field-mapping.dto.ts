import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateEhrFieldMappingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ehrProvider!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  questionKey!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  endpoint!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ehrField!: string;
}

export class CreateEhrFieldMappingBulkDto {
  @ApiProperty({ type: [CreateEhrFieldMappingDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEhrFieldMappingDto)
  mappings!: CreateEhrFieldMappingDto[];
}
