import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
