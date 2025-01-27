/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/goals/executions/process/steps/types/QuestionForm.tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGoalExecutionStore } from '@/store/useGoalExecutionStore';
import { StepConfig } from '@/types/goals';

interface QuestionFormProps {
  config: StepConfig;
  stepId: string;
}

export function QuestionForm({ config, stepId }: QuestionFormProps) {
  const { stepsData, setStepData } = useGoalExecutionStore();
  const answers = stepsData[stepId]?.answers || {};

  const handleAnswer = (questionId: string, value: any) => {
    setStepData(stepId, {
      answers: {
        ...answers,
        [questionId]: value
      }
    });
  };

  return (
    <div className="space-y-4">
      {config.questions?.map((question) => (
        <div key={question.id} className="space-y-2">
          <Label>
            {question.question}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          
          {question.type === 'text' && (
            <Input
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              required={question.required}
            />
          )}

          {question.type === 'select' && question.options && (
            <Select
              value={answers[question.id]}
              onValueChange={(value) => handleAnswer(question.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Wybierz..." />
              </SelectTrigger>
              <SelectContent>
                {question.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {question.type === 'number' && (
            <Input
              type="number"
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, Number(e.target.value))}
              required={question.required}
            />
          )}
        </div>
      ))}
    </div>
  );
}