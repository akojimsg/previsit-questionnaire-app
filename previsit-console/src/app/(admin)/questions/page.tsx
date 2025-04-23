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
import { Plus } from "lucide-react";

export default function QuestionsPage() {
  const [data, setData] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Question | null>(null);
  const [open, setOpen] = useState(false);
  // TODO: Replace with token payload or auth context
  const tenantId = "clinic-123";

  const loadData = async () => {
    try {
      const response = await fetchQuestions(tenantId);
      setData(response);
    } catch (err) {
      toast.error("Failed to fetch questions");
      console.error("Failed to fetch questions:", err);
    } finally {
      setLoading(false);
    }
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
      loadData();
    } catch (err) {
      toast.error("Failed to save question");
      console.error("Failed to delete question:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      //await deleteQuestion(id);
      toast.success("Question deleted" + id);
      loadData();
    } catch (err) {
      toast.error("Failed to delete question");
      console.error("Failed to delete question:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Questions</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Question
        </Button>
      </div>

      <Separator />

      <DataTable
        columns={getColumns({ onEdit: setEditing, onDelete: handleDelete })}
        data={data}
        loading={loading}
      />

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
