// QuestionsForm.tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Question } from '@/types/goals';
import { useGoalStore } from '@/store/useGoalStore';

export function QuestionsForm() {
  const { stepFormData, setStepFormData } = useGoalStore();
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    type: 'text',
    question: '',
    required: true
  });

  const addQuestion = () => {
    if (!newQuestion.question || !newQuestion.type) return;

    const question: Question = {
      id: `q-${Date.now()}`,
      question: newQuestion.question,
      type: newQuestion.type,
      required: newQuestion.required ?? true
    };

    setStepFormData({
      config: {
        ...stepFormData.config,
        questions: [...(stepFormData.config?.questions || []), question]
      }
    });
    setNewQuestion({ type: 'text', question: '', required: true });
    setIsAddingQuestion(false);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = stepFormData.config?.questions?.filter((_, i) => i !== index) || [];
    setStepFormData({
      config: {
        ...stepFormData.config,
        questions: newQuestions
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {stepFormData.config?.questions?.map((q, index) => (
          <div key={q.id} className="flex items-center gap-2 p-2 border rounded">
            <div className="flex-1">
              <p className="font-medium">{q.question}</p>
              <p className="text-sm text-muted-foreground">Type: {q.type}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeQuestion(index)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {!isAddingQuestion ? (
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => setIsAddingQuestion(true)}
        >
          <Plus className="h-4 w-4 mr-2" /> Create Question
        </Button>
      ) : (
        <div className="space-y-4 border p-4 rounded-lg">
          <div className="space-y-2">
            <Label>Question Type</Label>
            <Select
              value={newQuestion.type}
              onValueChange={(value: 'text' | 'select' | 'number') => 
                setNewQuestion({ ...newQuestion, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select question type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="select">Select</SelectItem>
                <SelectItem value="number">Number</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Question</Label>
            <Input
              value={newQuestion.question}
              onChange={e => setNewQuestion({ ...newQuestion, question: e.target.value })}
              placeholder="Enter question..."
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsAddingQuestion(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={addQuestion}
              className="flex-1"
            >
              Add Question
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}