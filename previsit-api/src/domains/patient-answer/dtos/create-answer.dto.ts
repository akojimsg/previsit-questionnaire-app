import { ApiProperty } from '@nestjs/swagger';

export class SubmitResponseDto {
  @ApiProperty({ example: 'clinic-123' })
  tenantId!: string;

  @ApiProperty({ example: 'Pre-visit intake form' })
  questionnaireName!: string;

  @ApiProperty({ example: 'user-abc-123' })
  patientId!: string;

  @ApiProperty({
    example: {
      name: 'Jane Doe',
      dob: '1990-01-01',
      gender: 'female',
    },
  })
  answers!: Record<string, string>;
}
