import { ApiProperty } from '@nestjs/swagger';

export class PatientAnswerResponseDto {
  @ApiProperty({ example: 'clinic-123' })
  tenantId!: string;

  @ApiProperty({ example: 'Patient Intake Form' })
  questionnaireName!: string;

  @ApiProperty({ example: 'user-abc-123' })
  patientId!: string;

  @ApiProperty({
    example: {
      name: 'Jane Doe',
      gender: 'female',
      dob: '1990-01-01',
    },
    type: 'object',
    additionalProperties: { type: 'string' },
  })
  answers!: Record<string, string>;

  @ApiProperty({
    example: '2025-04-20T19:40:22.123Z',
  })
  submittedAt!: Date;
}
