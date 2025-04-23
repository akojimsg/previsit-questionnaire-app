"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Question } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface GetColumnsProps {
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
}

export const getColumns = ({
  onEdit,
  onDelete,
}: GetColumnsProps): ColumnDef<Question>[] => [
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "key",
    header: "Key",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.key}</span>
    ),
  },
  {
    accessorKey: "text",
    header: "Text",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "isRequired",
    header: "Required",
    cell: ({ row }) => (
      <Badge variant={row.original.isRequired ? "default" : "outline"}>
        {row.original.isRequired ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    accessorKey: "options",
    header: "Options",
    cell: ({ row }) => {
      const options = row.original.options;

      if (!Array.isArray(options)) return null;

      const formatted = options
        .map((opt) => (typeof opt === "string" ? opt : opt.label || opt.value))
        .join(", ");

      return <span className="text-xs">{formatted}</span>;
    },
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
      const question = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(question)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:bg-red-100"
            onClick={() => onDelete(question.key)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
