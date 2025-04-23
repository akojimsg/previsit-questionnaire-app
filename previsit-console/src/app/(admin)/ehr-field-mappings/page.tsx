"use client";

import { useEffect, useState } from "react";
import { EhrFieldFormDialog } from "./components/ehr-field-form.dialog";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import { fetchMappings, createMapping, updateMapping, deleteMapping } from "@/lib/api";
import { EhrFieldMapping } from "@/lib/types";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Database, Plus, Upload } from "lucide-react";

export default function MappingPage() {
  const [data, setData] = useState<EhrFieldMapping[]>([]);
  const [loading, setLoading] = useState(true);
  const [providerFilter, setProviderFilter] = useState("");
  const [searching, setSearching] = useState(false);
  // TODO: Replace with token payload or auth context
  const tenantId = "clinic-123";

  const fetchAndSetMappings = async () => {
    setLoading(true);
    try {
      const result = await fetchMappings(tenantId, providerFilter.trim());
      setData(result as EhrFieldMapping[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetMappings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (
    input: Pick<
      EhrFieldMapping,
      "questionKey" | "ehrProvider" | "endpoint" | "ehrField"
    >
  ) => {
    try {
      const newMapping = await createMapping(input, tenantId) as EhrFieldMapping;
      setData((prev) => [...prev, newMapping]);
      toast.success("Mapping created", {
        description: `Question "${input.questionKey}" mapped to ${input.ehrField}`,
      });
    } catch (err) {
      toast.error("Error creating mapping", {
        description: (err as Error).message,
      });
      console.error("Failed to create mapping:", err);
    }
  };

  const handleUpdate = async (
    updated: Pick<
      EhrFieldMapping,
      "questionKey" | "ehrProvider" | "endpoint" | "ehrField"
    >
  ) => {
    await updateMapping(tenantId, updated);
    toast.success("Mapping updated", {
      description: `${updated.questionKey} → ${updated.ehrField}`,
    });
    await fetchAndSetMappings();
  };

  const handleDelete = async (
    data: Pick<
      EhrFieldMapping,
      "questionKey" | "ehrProvider" | "endpoint" | "ehrField"
    >
  ) => {
    try {
      await deleteMapping(tenantId, data);
      toast.success("Mapping deleted");
      await fetchAndSetMappings();
    } catch (err) {
      toast.error("Delete failed", {
        description: (err as Error).message,
      });
    }
  };

  const columns = getColumns(tenantId, handleUpdate, handleDelete);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Header */}
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Database className="w-6 h-6 text-muted-foreground" />
          EHR Field Mappings
        </h1>

        <Separator className="my-4" />
        {/* Action bar row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left: Search */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Input
              placeholder="Search by EHR Provider"
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              className="w-60"
              disabled={searching}
            />
            <Button
              variant="default"
              onClick={async () => {
                setSearching(true);
                try {
                  const filtered = await fetchMappings(
                    tenantId,
                    providerFilter.trim()
                  );
                  setData(filtered as EhrFieldMapping[]);
                  toast.success("Filtered by provider", {
                    description: providerFilter || "All providers",
                  });
                } catch (err) {
                  toast.error("Failed to filter mappings");
                  console.error("Failed to filter mappings:", err);
                } finally {
                  setSearching(false);
                }
              }}
            >
              🔍 Search
            </Button>
          </div>

          {/* Right: New + Bulk Upload */}
          <div className="flex items-center gap-2 justify-end">
            <EhrFieldFormDialog
              trigger={
                <Button variant="default">
                  <Plus className="w-4 h-4 mr-2" />
                  New
                </Button>
              }
              onSubmit={handleSubmit}
            />
            <Button
              variant="secondary"
              onClick={() => toast.info("Bulk upload coming soon!")}
            >
              <Upload className="w-4 h-4 mr-2" />
              Bulk Upload
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <DataTable columns={columns} data={data} />
        </>
      )}
    </div>
  );
}
