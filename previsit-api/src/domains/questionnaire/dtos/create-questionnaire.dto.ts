import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionnaireDto {
  @ApiProperty({ example: 'clinic-123' })
  tenantId!: string;

  @ApiProperty({
    type: Object,
    example: {
      en: 'Pre-visit intake form',
      es: 'Formulario de admisión previa a la visita',
    },
    description: 'Localized name of the questionnaire',
  })
  name!: Record<string, string>;

  @ApiProperty({
    type: Object,
    required: false,
    example: {
      en: 'Questions for initial patient visit',
      es: 'Preguntas para la visita inicial del paciente',
    },
    description: 'Localized description of the questionnaire',
  })
  description?: Record<string, string>;

  @ApiProperty({
    type: Object,
    required: false,
    example: {
      en: 'Submit previsit form',
      es: 'Enviar formulario de pre-visita',
    },
    description: 'Localized label for the submit button',
  })
  submitButtonLabel?: Record<string, string>;

  @ApiProperty({
    type: [String],
    example: ['name', 'dob', 'gender', 'medicalHistory'],
    description: 'List of question keys included in this questionnaire',
  })
  questionKeys!: string[];

  @ApiProperty({ example: true, required: false })
  isActive?: boolean;
}
