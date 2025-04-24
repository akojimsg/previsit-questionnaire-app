"use client";

import { useEffect, useState } from "react";
import { fetchPatientAnswers } from "@/lib/api";
import { PatientAnswer } from "@/lib/types";
import { DataTable } from "@/components/data-table";
import { toast } from "sonner";
import { AssessmentDetailPanel } from "./assessment-detail-panel";
import { getAssessmentColumns } from "./columns/columns";
import { Database, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AssessmentListPage() {
  const [data, setData] = useState<PatientAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<PatientAnswer | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  const tenantId = "clinic-123";

  const fetchAndSetData = async () => {
    setLoading(true);
    try {
      const allAnswers = await fetchPatientAnswers(tenantId);
      setData(allAnswers);
    } catch {
      toast.error("Failed to load assessments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const handleSearch = async () => {
    setSearching(true);
    try {
      const results = await fetchPatientAnswers(tenantId);
      const filtered = results.filter((answer) =>
        answer.questionnaireName.toLowerCase().includes(search.toLowerCase())
      );
      setData(filtered);
      toast.success("Search complete", {
        description: `${filtered.length} result(s) for "${search}"`,
      });
    } catch {
      toast.error("Search failed");
    } finally {
      setSearching(false);
    }
  };

  const handleView = (answer: PatientAnswer) => {
    setSelected(answer);
    setPanelOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Database className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Assessments</h2>
      </div>
      <p className="text-muted-foreground pl-9">
        Questionnaire responses submitted by the patient
      </p>
      <Separator className="my-2" />

      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by questionnaire, patient id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-72"
          disabled={searching}
        />
        <Button onClick={handleSearch} disabled={searching}>
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      <DataTable
        columns={getAssessmentColumns(handleView)}
        data={data}
        loading={loading}
      />

      <AssessmentDetailPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        answer={selected}
      />
    </div>
  );
}
