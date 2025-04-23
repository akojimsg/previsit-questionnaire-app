import { ApiProperty } from '@nestjs/swagger';

export class QuestionResponseDto {
  @ApiProperty({ example: 'clinic-123' })
  tenantId!: string;

  @ApiProperty({ example: 'dob' })
  questionKey!: string;

  @ApiProperty({
    example: 'What is your date of birth?',
    description: 'Localized question text',
  })
  text!: string;

  @ApiProperty({
    required: false,
    example: 'Please provide your date of birth',
    description: 'Localized description',
  })
  description?: string;

  @ApiProperty({ enum: ['text', 'radio', 'checkbox', 'date'], example: 'date' })
  type!: 'text' | 'radio' | 'checkbox' | 'date';

  @ApiProperty({
    required: false,
    type: Object,
    isArray: true,
    example: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    description: 'Localized options (label shown to user)',
  })
  options?: { value: string; label: string }[];

  @ApiProperty({
    required: false,
    example: 'Demographics',
    description: 'Localized category (if any)',
  })
  category?: string;

  @ApiProperty({ example: true })
  isRequired!: boolean;

  @ApiProperty()
  createdAt?: string;

  @ApiProperty()
  updatedAt?: string;
}
