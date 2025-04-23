"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EhrFieldMapping } from "@/lib/types";
import { EhrFieldFormDialog } from "./components/ehr-field-form.dialog";
import { EhrFieldMappingsFormValues } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const getColumns = (
  tenantId: string,
  onUpdate: (data: EhrFieldMappingsFormValues) => void,
  onDelete: (mapping: EhrFieldMapping) => void
): ColumnDef<EhrFieldMapping>[] => [
  {
    accessorKey: "questionKey",
    header: "Question Key",
  },
  {
    accessorKey: "ehrProvider",
    header: "Provider",
  },
  {
    accessorKey: "endpoint",
    header: "Endpoint",
  },
  {
    accessorKey: "ehrField",
    header: "EHR Field",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return date ? new Date(date).toDateString() : "-";
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => {
      const date = row.original.updatedAt;
      return date ? new Date(date).toDateString() : "-";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const mapping = row.original;

      return (
        <div className="flex gap-2 justify-end">
          <EhrFieldFormDialog
            initialData={mapping}
            onSubmit={(data) => onUpdate(data)}
            trigger={
              <Button variant="ghost" size="icon">
                <Pencil className="w-4 h-4" />
              </Button>
            }
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Mapping?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete{" "}
                  <strong>{mapping.questionKey}</strong> from{" "}
                  <strong>{mapping.ehrProvider}</strong>? This action cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => onDelete(mapping)}
                >
                  Yes, delete it
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
