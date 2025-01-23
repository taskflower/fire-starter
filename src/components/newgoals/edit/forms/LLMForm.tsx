// src/pages/goals/components/edit/forms/LLMForm.tsx
import { StepConfig } from '@/components/newgoals/types';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface LLMFormProps {
    config?: StepConfig; // Dodaj optional
  onChange: (config: StepConfig) => void;
}

export function LLMForm({ config = {}, onChange }: LLMFormProps) {
  return (
    <div className="space-y-2">
      <Label>LLM Prompt</Label>
      <Textarea
        value={config.llmPrompt || ''}
        onChange={e => onChange({ ...config, llmPrompt: e.target.value })}
        placeholder="Enter prompt for LLM processing..."
        rows={6}
      />
    </div>
  );
}