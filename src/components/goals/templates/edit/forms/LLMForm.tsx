// src/components/goals/templates/edit/forms/LLMForm.tsx

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SourceStepsSelect } from "./SourceStepsSelect";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { StepConfig } from "@/types/goals";

export function LLMForm() {
  const { stepFormData, setStepFormData } = useGoalManagementStore();

  const defaultConfig: StepConfig = {
    documentRequirements: [],
    questions: [],
    llmPrompt: "",
    services: [],
    insert: [],
    validationRules: {},
    includeSteps: [],
  };

  // Mergujemy stepFormData.config z defaultConfig, aby zapewnić, że wszystkie właściwości są zdefiniowane
  const config: StepConfig = { ...defaultConfig, ...stepFormData.config };

  // Upewniamy się, że selectedSteps jest zawsze string[]
  const selectedSteps: string[] = config.includeSteps ?? [];

  const handleStepsChange = (selected: string[]) => {
    setStepFormData({
      config: {
        ...config,
        includeSteps: selected,
        // Nie zmieniamy 'services', ponieważ powinny one być zarządzane niezależnie
      },
    });
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStepFormData({
      config: {
        ...config,
        llmPrompt: e.target.value,
        // Nie zmieniamy 'services', ponieważ powinny one być zarządzane niezależnie
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <SourceStepsSelect
          selectedSteps={selectedSteps}
          onChange={handleStepsChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="llmPrompt">LLM Prompt</Label>
        <Textarea
          id="llmPrompt"
          value={config.llmPrompt}
          onChange={handlePromptChange}
          placeholder="Enter prompt for LLM processing..."
          rows={6}
          required
        />
      </div>
    </div>
  );
}
