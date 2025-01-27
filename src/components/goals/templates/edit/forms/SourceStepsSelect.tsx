// src/components/goals/templates/edit/forms/SourceStepsSelect.tsx

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useGoalManagementStore } from '@/store/useGoalManagementStore';
import { Step } from '@/types/goals';

interface SourceStepsSelectProps {
  selectedSteps: string[];
  onChange: (selected: string[]) => void;
}

export function SourceStepsSelect({ selectedSteps, onChange }: SourceStepsSelectProps) {
  const { steps } = useGoalManagementStore();

  const handleCheckboxChange = (stepId: string) => {
    if (selectedSteps.includes(stepId)) {
      onChange(selectedSteps.filter(id => id !== stepId));
    } else {
      onChange([...selectedSteps, stepId]);
    }
  };

  if (!steps.length) {
    return <p className="text-muted-foreground">Brak dostępnych kroków do wyboru.</p>;
  }

  return (
    <div className="space-y-2">
      <Label>Wybierz kroki źródłowe</Label>
      {/* Dodany opis poniżej etykiety */}
      <p className="text-sm text-muted-foreground">
        Wybierz kroki, z których dane będą wykorzystywane w tym etapie. Możesz zaznaczyć jeden lub więcej kroków.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
        {steps.map((step: Step) => (
          <div key={step.id} className="flex items-center space-x-2">
            <Checkbox
              id={`source-step-${step.id}`}
              checked={selectedSteps.includes(step.id)}
              onCheckedChange={() => handleCheckboxChange(step.id)}
            />
            <label htmlFor={`source-step-${step.id}`} className="text-sm">
              {step.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
