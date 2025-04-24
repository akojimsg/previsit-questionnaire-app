"use client";

import { useState } from "react";
import { QuestionField } from "./QuestionField";
import { Question, AnswerValue, QuestionnaireFormProps } from "@/lib/types";
import { useRouter } from "next/navigation";
import { submitPatientAnswers } from "@/lib/api";

export function QuestionnaireForm({
  questionnaireName,
  tenantId,
  patientId,
  questions,
  submitButtonLabel = "Submit previsit form",
}: QuestionnaireFormProps) {
  const [formState, setFormState] = useState<Record<string, AnswerValue>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (key: string, value: AnswerValue) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const getDefaultValue = (q: Question): AnswerValue => {
    switch (q.type) {
      case "checkbox":
        return [];
      case "radio":
        return "";
      default:
        return "";
    }
  };

  const isEmpty = (val: AnswerValue) => {
    if (typeof val === "string") return val.trim() === "";
    if (Array.isArray(val)) return val.length === 0;
    return val === undefined || val === null;
  };

const handleSubmit = async () => {
  const missing = questions.filter(
    (q) => q.isRequired && isEmpty(formState[q.key])
  );
  if (missing.length > 0) {
    setError(`Please fill: ${missing.map((m) => m.label).join(", ")}`);
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const result = await submitPatientAnswers({
      tenantId,
      questionnaireName,
      patientId,
      answers: formState,
    });

    setSuccess(true);
    console.log("Submitted", result);

    setTimeout(() => {
      router.push("/questionnaire/confirmation");
    }, 1000);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Submission failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <form className="space-y-6">
      {questions.map((q) => (
        <QuestionField
          key={q.key}
          question={q}
          value={formState[q.key] || getDefaultValue(q)}
          onChange={handleChange}
        />
      ))}

      {error && (
        <div className="p-2 bg-red-100 text-red-700 border border-red-300 rounded-md">
          {error}
        </div>
      )}
      {success && (
        <div className="p-2 bg-green-100 text-green-700 border border-green-300 rounded-md">
          Submitted successfully!
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-60 transition-all"
          disabled={loading}
        >
          {loading ? "Submitting..." : submitButtonLabel}
        </button>
      </div>
    </form>
  );
}
