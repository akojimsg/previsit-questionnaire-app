/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchWithTenant } from "./fetcher";
import { EhrFieldMapping, PatientAnswer, Question, Questionnaire } from "./types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export async function fetchMappings(tenantId: string, ehrProvider?: string) {
  const url = ehrProvider
    ? `${API_BASE_URL}/v1/ehr-mappings?ehrProvider=${encodeURIComponent(ehrProvider)}`
    : `${API_BASE_URL}/v1/ehr-mappings`;

  return fetchWithTenant(url, {}, tenantId);
}

export async function createMapping(
  data: Pick<
    EhrFieldMapping,
    "questionKey" | "ehrProvider" | "endpoint" | "ehrField"
  >,
  tenantId: string
) {
  return fetchWithTenant(
    `${API_BASE_URL}/v1/ehr-mappings`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    tenantId
  );
}

export async function updateMapping(
  tenantId: string,
  data: Pick<
    EhrFieldMapping,
    "questionKey" | "ehrProvider" | "endpoint" | "ehrField"
  >
) {
  const url = `${API_BASE_URL}/v1/ehr-mappings?ehrProvider=${data.ehrProvider}&questionKey=${data.questionKey}`;
  return fetchWithTenant(
    url,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    tenantId
  );
}

export async function deleteMapping(
  tenantId: string,
  data: Pick<
    EhrFieldMapping,
    "questionKey" | "ehrProvider" | "endpoint" | "ehrField"
  >
) {
  const url = `${API_BASE_URL}/v1/ehr-mappings?ehrProvider=${data.ehrProvider}&questionKey=${data.questionKey}`;
  return fetchWithTenant(
    url,
    {
      method: "DELETE",
    },
    tenantId
  );
}

export async function bulkUploadMappings(
  data: { mappings: EhrFieldMapping[] },
  tenantId: string
) {
  return fetchWithTenant<{ success: string; failed: string }>(
    `${API_BASE_URL}/v1/ehr-mappings/bulk`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    tenantId
  );
}

function normalizeOptions(
  options?: any[] // could be string[] or { value, label: { en, es } }[]
): Question["options"] {
  if (!Array.isArray(options)) return [];
  const radioOptions = options as { value: string; label: { en: string } }[];

  return radioOptions.map((opt) => {
    if (typeof opt === "string") return opt;
    return {
      value: opt.value,
      label:
        typeof opt.label === "object" ? opt.label.en || opt.value : opt.label,
    };
  });
}

export async function fetchQuestions(tenantId: string): Promise<Question[]> {
  const raw = await fetchWithTenant<any[]>(
    `${API_BASE_URL}/v1/questions`,
    { method: "GET" },
    tenantId
  );
  return raw.map((item) => ({
    key: item.questionKey,
    label: item.text?.en || item.questionKey, // using `text.en` as display label
    text: item.text?.en || "",
    category: item.category?.en || "",
    type: item.type,
    isRequired: item.isRequired,
    options: normalizeOptions(item.options),
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
}

export async function createQuestion(
  payload: Question,
  tenantId: string
): Promise<Question> {
  return fetchWithTenant<Question>(
    `${API_BASE_URL}/v1/questions`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    tenantId
  );
}

export async function updateQuestion(
  key: string,
  payload: Question,
  tenantId: string
): Promise<Question> {
  return fetchWithTenant<Question>(
    `${API_BASE_URL}/v1/questions/${encodeURIComponent(key)}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
    tenantId
  );
}

export async function fetchQuestionnaires(
  tenantId: string
): Promise<Questionnaire[]> {
  const raw = await fetchWithTenant<any[]>(
    `${API_BASE_URL}/v1/questionnaire`,
    { method: "GET" },
    tenantId
  );

  return raw.map((item) => ({
    name: item.name,
    description: item.description,
    submitButtonLabel: item.submitButtonLabel,
    questions: item.questionKeys,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
}

export async function fetchPatientAnswers(
  tenantId: string
): Promise<PatientAnswer[]> {
  return fetchWithTenant<PatientAnswer[]>(
    `${API_BASE_URL}/v1/answers`,
    {},
    tenantId
  );
}
