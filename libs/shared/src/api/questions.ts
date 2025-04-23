import { fetchWithTenant } from "src/api/fetcher";
import { Question, Questionnaire } from "src/types";

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

export async function fetchQuestions( baseUrl: string, tenantId: string): Promise<Question[]> {
  const raw = await fetchWithTenant<any[]>(
    `${baseUrl}/v1/questions`,
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
  baseUrl: string,
  payload: Question,
  tenantId: string
): Promise<Question> {
  return fetchWithTenant<Question>(
    `${baseUrl}/v1/questions`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    tenantId
  );
}

export async function updateQuestion(
  baseUrl: string,
  key: string,
  payload: Question,
  tenantId: string
): Promise<Question> {
  return fetchWithTenant<Question>(
    `${baseUrl}/v1/questions/${encodeURIComponent(key)}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
    tenantId
  );
}

export async function fetchResolvedQuestionnaire(
  baseUrl: string,
  name: string,
  tenantId: string,
  lang: string = "en"
): Promise<Questionnaire> {
  const res = await fetch(
    `${baseUrl}/questionnaire/resolved?name=${name}&lang=${lang}`,
    {
      headers: { "x-tenant-id": tenantId },
    }
  );
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error: ${res.status} ${errorText}`);
  }
  const data = await res.json();
  if (!data?.questions || !Array.isArray(data.questions)) {
    throw new Error("Invalid API response: missing 'questions'");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const questions: Question[] = data.questions.map((q: any) => ({
    ...q,
    key: q.questionKey,
  }));

  return { ...data, questions };
}
