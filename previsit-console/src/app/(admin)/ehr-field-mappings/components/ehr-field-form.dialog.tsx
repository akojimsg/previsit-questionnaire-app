'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EhrFieldMappingsFormValues } from '@/lib/types'
import { Separator } from '@/components/ui/separator'

interface Props {
  onSubmit: (data: EhrFieldMappingsFormValues) => void;
  initialData?: Partial<EhrFieldMappingsFormValues>;
  triggerLabel?: string | React.ReactNode;
  trigger?: React.ReactNode;
}

export function EhrFieldFormDialog({
  onSubmit,
  initialData = {},
  triggerLabel = '+ New',
  trigger,
}: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<EhrFieldMappingsFormValues>({
    questionKey: initialData.questionKey ?? "",
    ehrProvider: initialData.ehrProvider ?? "",
    endpoint: initialData.endpoint ?? "",
    ehrField: initialData.ehrField ?? "",
  });

  useEffect(() => {
    if (!open || !initialData?.questionKey) return;

    setForm({
      questionKey: initialData.questionKey,
      ehrProvider: initialData.ehrProvider ?? "",
      endpoint: initialData.endpoint ?? "",
      ehrField: initialData.ehrField ?? "",
    });
  }, [initialData, open]);

  useEffect(() => {
    if (!open) return;
    
    setForm({
      questionKey: initialData?.questionKey ?? "",
      ehrProvider: initialData?.ehrProvider ?? "",
      endpoint: initialData?.endpoint ?? "",
      ehrField: initialData?.ehrField ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? trigger : <Button>{triggerLabel}</Button>}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData?.questionKey ? "Edit Mapping" : "Create Mapping"}
          </DialogTitle>
        </DialogHeader>

        <Separator className="my-2" />

        {/* Form Body */}
        <div className="space-y-3 py-4">
          {["questionKey", "ehrProvider", "endpoint", "ehrField"].map(
            (field) => (
              <div key={field} className="flex items-center gap-4">
                <Label htmlFor={field} className="w-36 text-right capitalize">
                  {field}
                </Label>
                <Input
                  id={field}
                  name={field}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  value={(form as any)[field]}
                  onChange={handleChange}
                  className="flex-1"
                  disabled={
                    ["questionKey", "ehrProvider"].includes(field) &&
                    (!!initialData?.questionKey || !!initialData?.ehrProvider)
                  }
                />
              </div>
            )
          )}
        </div>

        {/* Footer Buttons */}
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
