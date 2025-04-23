/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Question } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Question) => void;
  initialValues?: Question;
}

export function QuestionFormDialog({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<Question>({
    defaultValues: initialValues ?? {
      key: "",
      type: "text",
      isRequired: false,
      options: [],
    },
  });

  const selectedType = watch("type");

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    } else {
      reset({
        key: "",
        type: "text",
        isRequired: false,
        options: [],
      });
    }
  }, [initialValues, reset]);

  const submit = handleSubmit((data) => {
    if (
      ["radio", "checkbox"].includes(data.type) &&
      typeof data.options === "string"
    ) {
      // Split comma-separated string into array
      (data.options as string).split(",").map((opt) => opt.trim());
    }
    onSubmit(data);
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Edit Question" : "New Question"}
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <form onSubmit={submit} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="key">Key</Label>
              <Input
                {...register("key")}
                id="key"
                required
                disabled={!!initialValues}
              />
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <select
                {...register("type")}
                id="type"
                className="w-full border rounded px-2 py-2"
              >
                <option value="text">Text</option>
                <option value="date">Date</option>
                <option value="textarea">Textarea</option>
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="isRequired">
              <input
                type="checkbox"
                {...register("isRequired")}
                className="mr-2"
              />
              Required
            </Label>
          </div>

          {(selectedType === "radio" || selectedType === "checkbox") && (
            <div>
              <Label htmlFor="options">Options (comma-separated)</Label>
              <Input {...register("options" as any)} id="options" />
            </div>
          )}

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {initialValues ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
