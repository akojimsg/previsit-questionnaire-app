"use client";

import { Questionnaire } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const getColumns = (): ColumnDef<Questionnaire>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.name.en ?? ""}</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.original.description?.en ?? "",
  },
  {
    accessorKey: "submitButtonLabel",
    header: "Submit button label",
    cell: ({ row }) => row.original.submitButtonLabel?.en ?? "",
  },
  {
    accessorKey: "questions",
    header: "Questions",
    cell: ({ row }) => {
      const questions = row.original.questions ?? [];
      return questions.length.toString();
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) =>
      row.original.createdAt ? (
        <span className="text-xs text-muted-foreground">
          {format(new Date(row.original.createdAt), "yyyy-MM-dd HH:mm")}
        </span>
      ) : null,
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) =>
      row.original.updatedAt ? (
        <span className="text-xs text-muted-foreground">
          {format(new Date(row.original.updatedAt), "yyyy-MM-dd HH:mm")}
        </span>
      ) : null,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            // Placeholder for detail slider logic
            console.log("View details for:", row.original);
          }}
        >
          <Eye className="w-4 h-4 mr-1" />
          Details
        </Button>
      </div>
    ),
  },
];
