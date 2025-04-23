export type QuestionType = "text" | "date" | "radio" | "checkbox" | "textarea";

export interface Question {
  key: string;
  label: string;
  category?: string;
  text?: string;
  type: "text" | "date" | "textarea" | "radio" | "checkbox";
  isRequired?: boolean;
  options?: string[] | { value: string; label: string }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Questionnaire {
  description: string;
  name: string;
  tenantId: string;
  questions: Question[];
  submitButtonLabel: string;
}

export interface QuestionFieldProps {
  question: Question;
  value: AnswerValue;
  onChange: (key: string, value: AnswerValue) => void;
}

export type AnswerValue = string | string[] | boolean;

export interface SubmitResponseDto {
  tenantId: string;
  questionnaireName: string;
  patientId: string;
  answers: Record<string, AnswerValue>;
}