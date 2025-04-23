import { fetchResolvedQuestionnaire } from "@/lib/api";
import { QuestionnaireForm } from "@/components/QuestionnaireForm";
import Layout from "@/components/Layout";

export default async function QuestionnairePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { patientId?: string; lang?: string };
}) {
  const tenantId = "clinic-123";
  const patientId = searchParams.patientId ?? "user-abc-123";
  const lang = searchParams.lang ?? "en";
  const questionnaire = await fetchResolvedQuestionnaire(params.slug, tenantId, lang);
  const { name, questions, description, submitButtonLabel } = questionnaire;

  return (
    <Layout>
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="mb-6 text-gray-600">{description}</p>
      <QuestionnaireForm
        questionnaireName={name}
        questions={questions}
        tenantId={tenantId}
        patientId={patientId}
        submitButtonLabel={submitButtonLabel}
      />
    </Layout>
  );
}
