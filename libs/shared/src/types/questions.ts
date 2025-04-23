import { AnswerValue } from "src/types/patient.answers";

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

export interface QuestionFormValues {
  key: string;
  category?: string;
  text?: string;
  type: "text" | "date" | "textarea" | "radio" | "checkbox";
  isRequired?: boolean;
  options?: string[] | { value: string; label: string }[];
}

export interface QuestionFieldProps {
  question: Question;
  value: AnswerValue;
  onChange: (key: string, value: AnswerValue) => void;
}