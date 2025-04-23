"use client";

import { useEffect, useState } from "react";
import { getColumns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Questionnaire } from "@/lib/types";
import { fetchQuestionnaires } from "@/lib/api";
import { toast } from "sonner";

export default function QuestionnairePage() {
  const [data, setData] = useState<Questionnaire[]>([]);
  const [loading, setLoading] = useState(true);

  const tenantId = "clinic-123"; // temporary, replace with useTenantId() later

  useEffect(() => {
    fetchQuestionnaires(tenantId)
      .then(setData)
      .catch(() => toast.error("Failed to load questionnaires"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Questionnaires</h1>
      <DataTable columns={getColumns()} data={data} loading={loading} />
    </div>
  );
}
