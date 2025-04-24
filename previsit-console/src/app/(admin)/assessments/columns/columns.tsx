import { ColumnDef } from "@tanstack/react-table";
import { PatientAnswer } from "@/lib/types";
import { format } from "date-fns";
import { renderViewButton } from "./actions";

export function getAssessmentColumns(
  onView: (answer: PatientAnswer) => void
): ColumnDef<PatientAnswer>[] {
  return [
    {
      accessorKey: "questionnaireName",
      header: "Questionnaire",
    },
    {
      accessorKey: "patientId",
      header: "Patient ID",
    },
    {
      accessorKey: "submittedAt",
      header: "Submitted At",
      cell: ({ row }) => format(new Date(row.original.submittedAt), "PPP p"),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) =>
        row.original.createdAt
          ? format(new Date(row.original.createdAt), "PPP p")
          : "-",
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) =>
        row.original.updatedAt
          ? format(new Date(row.original.updatedAt), "PPP p")
          : "-",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => renderViewButton(row.original, onView),
    },
  ];
}
