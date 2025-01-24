// LLMForm.tsx
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGoalStore } from "@/store/useGoalStore";

export function LLMForm() {
  const { steps, stepFormData, setStepFormData } = useGoalStore();
  const selectedSteps = stepFormData.config?.includeSteps || [];

  const handleStepSelect = (stepId: string) => {
    const newSelectedSteps = selectedSteps.includes(stepId)
      ? selectedSteps.filter((id) => id !== stepId)
      : [...selectedSteps, stepId];

    setStepFormData({
      config: {
        ...stepFormData.config,
        includeSteps: newSelectedSteps,
      }
    });
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[200px] border rounded-md p-4">
        <div className="space-y-2">
          <Label>Include data from steps:</Label>
          {steps.map((step) => (
            <div key={step.id} className="flex items-center space-x-2">
              <Checkbox
                id={step.id}
                checked={selectedSteps.includes(step.id)}
                onCheckedChange={() => handleStepSelect(step.id)}
              />
              <label htmlFor={step.id} className="text-sm">
                {step.title}
              </label>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="space-y-2">
        <Label>LLM Prompt</Label>
        <Textarea
          value={stepFormData.config?.llmPrompt || ""}
          onChange={(e) => setStepFormData({
            config: {
              ...stepFormData.config,
              llmPrompt: e.target.value
            }
          })}
          placeholder="Enter prompt for LLM processing..."
          rows={6}
        />
      </div>
    </div>
  );
}