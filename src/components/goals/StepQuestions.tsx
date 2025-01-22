// src/components/goals/StepQuestions.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepQuestion } from '@/types/goalTypes';
import { useStepAnswers } from '@/store/useStepAnswers';

interface StepQuestionsProps {
  stepId: string;
  questions: StepQuestion[];
}

export function StepQuestions({ stepId, questions }: StepQuestionsProps) {
  const { setAnswer, getStepAnswers } = useStepAnswers();
  const stepAnswers = getStepAnswers(stepId);

  const handleAnswerChange = (questionId: string, value: string | string[] | number) => {
    setAnswer(stepId, questionId, value);
  };

  return (
    <div className="space-y-4 mt-4">
      {questions.map((question) => (
        <div key={question.id} className="space-y-2">
          <Label>
            {question.question}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          
          {question.type === 'text' && (
            <Input
              value={stepAnswers[question.id] as string || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              required={question.required}
            />
          )}

          {question.type === 'select' && question.options && (
            <Select
              value={stepAnswers[question.id] as string}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
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
              value={stepAnswers[question.id] as number || ''}
              onChange={(e) => handleAnswerChange(question.id, Number(e.target.value))}
              required={question.required}
            />
          )}
        </div>
      ))}
    </div>
  );
}