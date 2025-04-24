// columns/actions.ts
import { PatientAnswer } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

export function renderViewButton(answer: PatientAnswer, onView: (answer: PatientAnswer) => void) {
  return (
    <Button variant="outline" size="sm" onClick={() => onView(answer)}>
      <Eye className="w-4 h-4 mr-1" />
      View
    </Button>
  );
}
