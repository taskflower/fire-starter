// src/components/goals/templates/edit/forms/InsertForm.tsx
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGoalManagementStore } from '@/store/useGoalManagementStore';
import { StepConfig } from '@/types/goals';

export function InsertForm() {
  const { stepFormData, setStepFormData, steps } = useGoalManagementStore();
  
  const defaultConfig: StepConfig = {
    documentRequirements: [],
    questions: [],
    llmPrompt: "",
    services: [],
    insert: [],
    validationRules: {},
    includeSteps: []
  };

  const config = stepFormData.config || defaultConfig;
  const insert = config.insert ?? [];

  const handleInsertChange = (value: string) => {
    setStepFormData({
      config: {
        ...config,
        insert: [...insert, value],
        services: config.services ?? []
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Wybierz krok źródłowy</Label>
        <Select onValueChange={handleInsertChange}>
          <SelectTrigger>
            <SelectValue placeholder="Wybierz krok..." />
          </SelectTrigger>
          <SelectContent>
            {steps.map((step) => (
              <SelectItem key={step.id} value={step.id}>
                {step.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
