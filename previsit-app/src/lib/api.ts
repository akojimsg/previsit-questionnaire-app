import { AnswerValue, Question, Questionnaire } from "@/lib/types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export async function fetchResolvedQuestionnaire(
  name: string,
  tenantId: string,
  lang: string = "en"
): Promise<Questionnaire> {
  const res = await fetch(
    `${API_BASE_URL}/v1/questionnaire/resolved?name=${name}&lang=${lang}`,
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

export async function submitPatientAnswers(params: {
  tenantId: string;
  questionnaireName: string;
  patientId: string;
  answers: Record<string, AnswerValue>;
}) {
  const { tenantId, questionnaireName, patientId, answers } = params;

  const res = await fetch(`${API_BASE_URL}/v1/answers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-tenant-id": tenantId,
    },
    body: JSON.stringify({ tenantId, questionnaireName, patientId, answers }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to submit answers");
  }

  return res.json();
}