export type AnswerValue = string | string[] | boolean;

export interface SubmitResponseDto {
  tenantId: string;
  questionnaireName: string;
  patientId: string;
  answers: Record<string, AnswerValue>;
}
