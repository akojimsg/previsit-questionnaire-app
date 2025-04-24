"use client";

import { useEffect, useState } from "react";
import { QuestionFormDialog } from "./components/question-form.dialog";
import { getColumns } from "./columns";
import { DataTable } from "@/components/data-table";
import {
  fetchQuestions,
  createQuestion,
  updateQuestion,
  // deleteQuestion,
} from "@/lib/api";
import { Question } from "@/lib/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Database, Plus, Search } from "lucide-react";

export default function QuestionsPage() {
  const [data, setData] = useState<Question[]>([]);
  const [filtered, setFiltered] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState<Question | null>(null);
  const [open, setOpen] = useState(false);

  const tenantId = "clinic-123"; // Replace with useTenantId() later

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetchQuestions(tenantId);
      setData(response);
      setFiltered(response);
    } catch (err) {
      toast.error("Failed to fetch questions");
      console.error("Failed to fetch questions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearching(true);
    setTimeout(() => {
      const term = searchTerm.trim().toLowerCase();
      if (!term) {
        setFiltered(data);
      } else {
        setFiltered(
          data.filter((q) => {
            const text = q.text?.toLowerCase() ?? "";
            const key = q.key?.toLowerCase() ?? "";
            return text.includes(term) || key.includes(term);
          })
        );
      }
      setSearching(false);
    }, 150);
  };

  const handleSubmit = async (values: Question) => {
    try {
      if (editing) {
        await updateQuestion(editing.key, values, tenantId);
        toast.success("Question updated");
      } else {
        await createQuestion(values, tenantId);
        toast.success("Question created");
      }
      setOpen(false);
      setEditing(null);
      await loadData();
    } catch (err) {
      toast.error("Failed to save question");
      console.error("Failed to save question:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // await deleteQuestion(id);
      toast.success("Question deleted: " + id);
      await loadData();
    } catch (err) {
      toast.error("Failed to delete question");
      console.error("Failed to delete question:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Database className="w-6 h-6 text-muted-foreground" />
          <h1 className="text-2xl font-bold">Questions</h1>
        </div>
        <p className="text-muted-foreground pl-8">
          List of all patient-facing questions configured for this tenant.
        </p>
        <Separator className="my-2" />
      </div>

      {/* Search + Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search by key or text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
            disabled={searching}
          />
          <Button onClick={handleSearch} disabled={searching}>
            <Search className="w-4 h-4 mr-1" />
            Search
          </Button>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <Button onClick={() => setOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Question
          </Button>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={getColumns({ onEdit: setEditing, onDelete: handleDelete })}
        data={filtered}
        loading={loading}
      />

      {/* Dialog */}
      <QuestionFormDialog
        open={open || !!editing}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
        initialValues={editing ?? undefined}
      />
    </div>
  );
}
