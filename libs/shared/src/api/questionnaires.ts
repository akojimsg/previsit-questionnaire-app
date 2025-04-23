import { Questionnaire } from "src/types";
import { fetchWithTenant } from "./fetcher";

/**
 * Uses API v1 to fetch questionnaires
 * @param baseUrl url to the API
 * @param tenantId the tenant id
 * @returns questionnaires
 */
export async function fetchQuestionnairesV1(
  baseUrl: string,
  tenantId: string
): Promise<Questionnaire[]> {
  const raw = await fetchWithTenant<any[]>(
    `${baseUrl}/v1/questionnaire`,
    { method: "GET" },
    tenantId
  );

  return raw.map((item) => ({
    name: item.name,
    title: item.title,
    description: item.description,
    questions: item.questions,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
}
