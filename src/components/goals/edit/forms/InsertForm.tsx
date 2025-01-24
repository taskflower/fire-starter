// InsertForm.tsx
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGoalStore } from "@/store/useGoalStore";

export function InsertForm() {
  const { stepFormData, setStepFormData, steps } = useGoalStore();
  const config = stepFormData.config || {};
  const insert = config.insert || [];

  const handleInsertChange = (value: string) => {
    setStepFormData({
      config: {
        ...config,
        insert: [...insert, { sourceStepId: value }]
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