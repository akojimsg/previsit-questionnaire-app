"use client";

import { useEffect, useState } from "react";
import { getColumns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Questionnaire } from "@/lib/types";
import { fetchQuestionnaires } from "@/lib/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Database, Plus, Upload, Search } from "lucide-react";

export default function QuestionnairePage() {
  const [data, setData] = useState<Questionnaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const tenantId = "clinic-123"; // Replace with useTenantId() later

  const fetchAndSetData = async () => {
    setLoading(true);
    try {
      const result = await fetchQuestionnaires(tenantId);
      setData(
        filter.trim()
          ? result.filter((q) =>
              q.name?.en?.toLowerCase().includes(filter.trim().toLowerCase())
            )
          : result
      );
    } catch (err) {
      toast.error("Failed to load questionnaires");
      console.error("Error fetching questionnaires:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Database className="w-6 h-6 text-muted-foreground" />
          <h1 className="text-2xl font-bold">Questionnaires</h1>
        </div>
        <p className="text-muted-foreground pl-8">
          List of all configured questionnaires for this tenant
        </p>
        <Separator className="my-2" />
      </div>

      {/* Search + Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search by title"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-64"
          />
          <Button onClick={fetchAndSetData} variant="default">
            <Search className="w-4 h-4 mr-1" />
            Search
          </Button>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <Button
            variant="default"
            onClick={() => toast.info("Create assessment coming soon!")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Assessment
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.info("Bulk upload coming soon!")}
          >
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
        </div>
      </div>

      {/* Table */}
      <DataTable columns={getColumns()} data={data} loading={loading} />
    </div>
  );
}
