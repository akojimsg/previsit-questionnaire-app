"use client";

import { useEffect, useState } from "react";
import { EhrFieldFormDialog } from "./components/ehr-field-form.dialog";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import {
  fetchMappings,
  createMapping,
  updateMapping,
  deleteMapping,
  bulkUploadMappings,
} from "@/lib/api";
import { EhrFieldMapping } from "@/lib/types";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Database, Plus, Upload } from "lucide-react";
import Papa from "papaparse";

export default function MappingPage() {
  const [data, setData] = useState<EhrFieldMapping[]>([]);
  const [loading, setLoading] = useState(true);
  const [providerFilter, setProviderFilter] = useState("");
  const [searching, setSearching] = useState(false);
  const tenantId = "clinic-123"; // Temporary

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
      const newMapping = (await createMapping(
        input,
        tenantId
      )) as EhrFieldMapping;
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

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const records = results.data as EhrFieldMapping[];
        const validRecords = records.filter(
          (r) => r.questionKey && r.ehrProvider && r.endpoint && r.ehrField
        );

        if (validRecords.length === 0) {
          toast.error("No valid mappings found in CSV");
          return;
        }

        try {
          const result = await bulkUploadMappings({mappings: validRecords}, tenantId);
          toast.success("Bulk upload completed", {
            description: `${result.success} created, ${result.failed} failed`,
          });
          fetchAndSetMappings();
        } catch (err) {
          toast.error("Bulk upload failed", {
            description: (err as Error).message,
          });
        }
      },
      error: (err: Error) => {
        toast.error("CSV parsing failed", {
          description: err.message,
        });
        console.error("CSV parsing error:", err);
      },
    });
  };

  const columns = getColumns(tenantId, handleUpdate, handleDelete);

  return (
    <div className="p-6 space-y-6">
      {/* Header section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Database className="w-6 h-6 text-muted-foreground" />
          <h1 className="text-2xl font-bold">EHR Field Mappings</h1>
        </div>
        <p className="text-muted-foreground pl-8">
          Manage how patient answers are mapped to different EHR fields.
        </p>
        <Separator className="my-2" />
      </div>

      {/* Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search */}
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

        {/* Actions */}
        <div className="flex items-center gap-2 justify-end">
          <EhrFieldFormDialog
            trigger={
              <Button variant="default">
                <Plus className="w-4 h-4 mr-2" />
                Create field mapping
              </Button>
            }
            onSubmit={handleSubmit}
          />
          <label htmlFor="csv-upload" className="inline-flex items-center">
            <Button variant="secondary" asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </span>
            </Button>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleCsvUpload}
            />
          </label>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
