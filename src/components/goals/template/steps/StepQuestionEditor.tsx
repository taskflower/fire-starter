// src/components/goals/dialogs/StepQuestionEditor.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StepQuestion, QuestionFormData } from '@/types/goalTypes';
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";

interface StepQuestionEditorProps {
  questions: StepQuestion[];
  onChange: (questions: StepQuestion[]) => void;
}

export function StepQuestionEditor({ questions, onChange }: StepQuestionEditorProps) {
  const [questionForm, setQuestionForm] = useState<QuestionFormData>({
    id: '',
    type: 'text',
    question: '',
    required: false,
    options: []
  });
  
  const addQuestion = () => {
    if (!questionForm.question) return;
    
    const newQuestion: StepQuestion = {
      ...questionForm,
      id: crypto.randomUUID()
    };
    
    onChange([...questions, newQuestion]);
    setQuestionForm({ id: '', type: 'text', question: '', required: false, options: [] });
  };

  const removeQuestion = (id: string) => {
    onChange(questions.filter(q => q.id !== id));
  };

  const addOption = () => {
    setQuestionForm(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const updateOption = (index: number, value: string) => {
    setQuestionForm(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const removeOption = (index: number) => {
    setQuestionForm(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div key={question.id} className="flex items-center justify-between p-2 border rounded">
          <div>
            <p className="font-medium">{question.question}</p>
            <p className="text-sm text-muted-foreground">
              Typ: {question.type} {question.required && '(wymagane)'}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => removeQuestion(question.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <div className="space-y-4 border-t pt-4">
        <div className="space-y-2">
          <Label>Nowe pytanie</Label>
          <Input
            value={questionForm.question}
            onChange={(e) => setQuestionForm(prev => ({ ...prev, question: e.target.value }))}
            placeholder="Wpisz treść pytania..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Typ pytania</Label>
            <Select
              value={questionForm.type}
              onValueChange={(value: 'text' | 'select' | 'multiselect' | 'number') => 
                setQuestionForm(prev => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Tekst</SelectItem>
                <SelectItem value="select">Lista wyboru</SelectItem>
                <SelectItem value="multiselect">Lista wielokrotnego wyboru</SelectItem>
                <SelectItem value="number">Liczba</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Wymagane</Label>
            <Switch
              checked={questionForm.required}
              onCheckedChange={(checked) => 
                setQuestionForm(prev => ({ ...prev, required: checked }))
              }
            />
          </div>
        </div>

        {(questionForm.type === 'select' || questionForm.type === 'multiselect') && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Opcje</Label>
              <Button variant="outline" size="sm" onClick={addOption}>
                <Plus className="h-4 w-4 mr-2" />
                Dodaj opcję
              </Button>
            </div>
            {questionForm.options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Opcja ${index + 1}`}
                />
                <Button variant="ghost" size="sm" onClick={() => removeOption(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button onClick={addQuestion}>Dodaj pytanie</Button>
      </div>
    </div>
  );
}