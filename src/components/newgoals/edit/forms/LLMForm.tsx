import { StepConfig } from "@/components/newgoals/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGoalStore } from "@/store/useGoalStore";

interface LLMFormProps {
  config?: StepConfig;
  onChange: (config: StepConfig) => void;
}

export function LLMForm({ config = {}, onChange }: LLMFormProps) {
  const { steps } = useGoalStore();
  const selectedSteps = config.includeSteps || [];

  const handleStepSelect = (stepId: string) => {
    const newSelectedSteps = selectedSteps.includes(stepId)
      ? selectedSteps.filter((id) => id !== stepId)
      : [...selectedSteps, stepId];

    onChange({
      ...config,
      includeSteps: newSelectedSteps,
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
          value={config.llmPrompt || ""}
          onChange={(e) => onChange({ ...config, llmPrompt: e.target.value })}
          placeholder="Enter prompt for LLM processing..."
          rows={6}
        />
      </div>
    </div>
  );
}
