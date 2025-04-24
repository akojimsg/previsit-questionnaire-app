import { ApiProperty } from '@nestjs/swagger';

export class QuestionnaireResponseDto {
  @ApiProperty({ example: 'clinic-123' })
  tenantId!: string;

  @ApiProperty({
    example: 'Pre-visit intake form',
    description: 'Localized name of the questionnaire',
  })
  name!: string;

  @ApiProperty({
    example: 'Questions for initial patient visit',
    required: false,
    description: 'Localized description of the questionnaire',
  })
  description?: string;

  @ApiProperty({
    type: [String],
    example: ['name', 'dob', 'gender', 'medicalHistory'],
  })
  questionKeys!: string[];

  @ApiProperty({ example: true, required: false })
  isActive?: boolean;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Date and time when the questionnaire was created',
  })
  createdAt!: string;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Date and time when the questionnaire was last updated',
  })
  updatedAt!: string;
}

export class LocalizedQuestion {
  @ApiProperty({ example: 'gender' })
  questionKey!: string;

  @ApiProperty({
    example: '¿Cuál es su género?',
  })
  label!: string;

  @ApiProperty({
    example: 'radio',
    enum: ['text', 'radio', 'checkbox', 'date'],
  })
  type!: string;

  @ApiProperty({
    example: [
      { value: 'male', label: 'Hombre' },
      { value: 'female', label: 'Mujer' },
    ],
    required: false,
  })
  options?: { value: string; label: string }[];

  @ApiProperty({ example: true })
  isRequired!: boolean;

  @ApiProperty({ example: 'Demographics', required: false })
  category?: string;
}

export class ResolvedQuestionnaireResponse {
  @ApiProperty({
    example: 'Pre-visit intake form',
    description: 'Localized name of the questionnaire',
  })
  name!: string;

  @ApiProperty({
    example: 'Submit previsit form',
    required: false,
    description: 'Localized label for the submit button',
  })
  submitButtonLabel?: string;

  @ApiProperty({
    example: 'Questions for initial patient visit',
    description: 'Localized description of the questionnaire',
  })
  description?: string;

  @ApiProperty({
    description: 'List of questions with their localized labels and content',
    type: LocalizedQuestion,
    isArray: true,
  })
  questions!: LocalizedQuestion[];
}
