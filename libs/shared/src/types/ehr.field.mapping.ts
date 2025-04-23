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
