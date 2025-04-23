import { Question } from "src/types/questions";

export interface Questionnaire {
  name: string;
  title: Record<string, string>;
  description?: Record<string, string>;
  submitButtonLabel?: Record<string, string>;
  questions: string[];
  createdAt?: string;
  updatedAt?: string;
}
