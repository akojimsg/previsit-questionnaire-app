import { ApiProperty } from '@nestjs/swagger';

export class QuestionResponseDto {
  @ApiProperty({ example: 'clinic-123' })
  tenantId!: string;

  @ApiProperty({ example: 'dob' })
  questionKey!: string;

  @ApiProperty({
    example: { en: 'Date of Birth', es: 'Fecha de Nacimiento' },
    description: 'Localized question text',
  })
  text!: string;

  @ApiProperty({
    required: false,
    example: { en: 'Localized description', es: 'Descripción localizada' },
    description: 'Localized description',
  })
  description?: string;

  @ApiProperty({ enum: ['text', 'radio', 'checkbox', 'date'], example: 'date' })
  type!: 'text' | 'radio' | 'checkbox' | 'date';

  @ApiProperty({
    required: false,
    type: Object,
    isArray: true,
    example: [{ value: 'male', label: { en: 'Male', es: 'Hombre' } }],
  })
  options?: { value: string; label: string }[];

  @ApiProperty({
    required: false,
    example: 'Demographics',
  })
  category?: string;

  @ApiProperty({ example: true })
  isRequired!: boolean;

  @ApiProperty({ example: '2025-04-22T22:29:30.585Z' })
  createdAt?: string;

  @ApiProperty({ example: '2025-04-22T22:29:30.585Z' })
  updatedAt?: string;
}
