"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import { PatientAnswer } from "@/lib/types";
import { format } from "date-fns";

interface Props {
  open: boolean;
  onClose: () => void;
  answer: PatientAnswer | null;
}

export function AssessmentDetailPanel({ open, onClose, answer }: Props) {
  if (!answer) return null;

  return (
    <Drawer open={open} onOpenChange={onClose} direction="right">
      <DrawerContent
        className="fixed top-0 right-0 h-screen w-[1152px] max-w-none border-l bg-white shadow-xl z-50"
        style={{ transition: "transform 0.3s ease-in-out" }}
      >
        <DrawerHeader className="p-6 border-b relative">
          <DrawerTitle className="text-xl font-semibold">
            {answer.questionnaireName}
          </DrawerTitle>
          <DrawerDescription className="text-sm text-muted-foreground">
            Submitted on {format(new Date(answer.submittedAt), "PPP p")}
          </DrawerDescription>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </DrawerHeader>

        <div className="p-6 space-y-4 text-sm overflow-y-auto h-[calc(100vh-6rem)]">
          {Object.entries(answer.answers).map(([key, value]) => (
            <div key={key} className="border-b last:border-none pb-3">
              <div className="font-medium text-muted-foreground capitalize">
                {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
              </div>
              <div className="text-base text-gray-800">{value}</div>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
