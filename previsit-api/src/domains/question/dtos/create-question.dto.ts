import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty()
  tenantId!: string;

  @ApiProperty()
  questionKey!: string;

  @ApiProperty({
    type: Object,
    description:
      'Localized question text (e.g., { en: "What is your name?", es: "¿Cuál es tu nombre?" })',
  })
  text!: Record<string, string>;

  @ApiProperty({
    type: Object,
    required: false,
    description: 'Localized description of the question (optional)',
  })
  description?: Record<string, string>;

  @ApiProperty({ enum: ['text', 'radio', 'checkbox', 'date'] })
  type!: string;

  @ApiProperty({
    required: false,
    type: Object,
    isArray: true,
    description:
      'Options with localized labels, e.g., [{ value: "yes", label: { en: "Yes", es: "Sí" } }]',
  })
  options?: { value: string; label: Record<string, string> }[];

  @ApiProperty({
    required: false,
    type: Object,
    description:
      'Localized category, e.g., { en: "Medical History", es: "Historial Médico" }',
  })
  category?: Record<string, string>;

  @ApiProperty({ required: false, default: true })
  isRequired?: boolean;
}
