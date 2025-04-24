export type EhrFieldMapping = {
  tenantId: string;
  ehrProvider: string;
  questionKey: string;
  endpoint: string;
  ehrField: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface EhrFieldMappingsFormValues {
  questionKey: string;
  ehrProvider: string;
  endpoint: string;
  ehrField: string;
}

export interface Question {
  key: string;
  category?: string;
  text?: string;
  type: "text" | "date" | "textarea" | "radio" | "checkbox";
  isRequired?: boolean;
  options?: string[] | { value: string; label: string }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Questionnaire {
  name: Record<string, string>;
  description?: Record<string, string>;
  submitButtonLabel?: Record<string, string>;
  questions: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PatientAnswer {
  tenantId: string;
  patientId: string;
  questionnaireName: string;
  submittedAt: string;
  answers: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}
