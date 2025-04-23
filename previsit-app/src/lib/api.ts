import { Question, Questionnaire } from "@/lib/types";

export async function fetchResolvedQuestionnaire(
  name: string,
  tenantId: string,
  lang: string = "en"
): Promise<Questionnaire> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/questionnaire/resolved?name=${name}&lang=${lang}`,
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
