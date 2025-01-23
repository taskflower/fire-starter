//src/pages/goals/components/edit/StepsList.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Step } from '@/components/newgoals/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { StepDialog } from './StepDialog';

interface StepsListProps {
  steps: Step[];
  onStepsChange: (steps: Step[]) => void;
}

export function StepsList({ steps, onStepsChange }: StepsListProps) {
  const [open, setOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<Step | null>(null);
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  const handleAdd = () => {
    setEditingStep(null);
    setEditingIndex(-1);
    setOpen(true);
  };

  const handleEdit = (step: Step, index: number) => {
    setEditingStep(step);
    setEditingIndex(index);
    setOpen(true);
  };

  const handleDelete = (index: number) => {
    onStepsChange(steps.filter((_, i) => i !== index));
  };

  const handleSave = (step: Step) => {
    if (editingIndex >= 0) {
      const newSteps = [...steps];
      newSteps[editingIndex] = step;
      onStepsChange(newSteps);
    } else {
      onStepsChange([...steps, step]);
    }
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Steps</h3>
          <p className="text-sm text-muted-foreground">Add and manage steps for this goal</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" /> Add Step
        </Button>
      </div>

      <div className="space-y-2">
        {steps.map((step, index) => (
          <Card key={step.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-muted-foreground">{index + 1}</span>
                <div>
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                <Badge variant="outline">{step.type}</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(step, index)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <StepDialog 
        open={open} 
        onOpenChange={setOpen}
        step={editingStep}
        onSave={handleSave}
      />
    </div>
  );
}