"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { fetchResolvedQuestionnaire } from "@/lib/api";
import { QuestionnaireForm } from "@/components/QuestionnaireForm";
import Layout from "@/components/Layout";
import { Questionnaire } from "@/lib/types";

export default function QuestionnairePage() {
  const [loading, setLoading] = useState(true);
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(
    null
  );

  const searchParams = useSearchParams();
  const params = useParams();

  const tenantId = "clinic-123";
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : "";
  const lang = searchParams.get("lang") || "en";
  const patientId = searchParams.get("patientId") || "user-abc-123";

  useEffect(() => {
    fetchResolvedQuestionnaire(slug, tenantId, lang)
      .then(setQuestionnaire)
      .catch((err) => {
        console.error("Error loading questionnaire", err);
        setQuestionnaire(null);
      })
      .finally(() => setLoading(false));
  }, [slug, tenantId, lang]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!questionnaire)
    return <p className="p-6 text-red-500">Failed to load questionnaire.</p>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold">{questionnaire.name}</h1>
      <p className="mb-6 text-gray-600">{questionnaire.description}</p>
      <QuestionnaireForm
        questionnaireName={questionnaire.name}
        questions={questionnaire.questions}
        tenantId={tenantId}
        patientId={patientId}
        submitButtonLabel={questionnaire.submitButtonLabel}
      />
    </Layout>
  );
}
