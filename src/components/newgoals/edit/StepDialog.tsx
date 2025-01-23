//src/pages/goals/components/edit/StepDialog.tsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DocumentForm } from './forms/DocumentForm';
import { QuestionsForm } from './forms/QuestionsForm';
import { LLMForm } from './forms/LLMForm';
import { Step, StepType } from '@/components/newgoals/types';

interface StepDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  step: Step | null;
  onSave: (step: Step) => void;
}

export function StepDialog({ open, onOpenChange, step, onSave }: StepDialogProps) {
    const [formData, setFormData] = useState<Partial<Step>>({
        title: '',
        description: '',
        type: undefined,
        config: {} // Pusty obiekt zamiast undefined
      });

  useEffect(() => {
    if (step) {
      setFormData(step);
    } else {
      setFormData({
        title: '',
        description: '',
        type: undefined,
        config: {},
      });
    }
  }, [step]);

  const handleSave = () => {
    if (!formData.title || !formData.type) return;

    onSave({
      id: step?.id || `step-${Date.now()}`,
      title: formData.title,
      description: formData.description || '',
      type: formData.type,
      isCompleted: false,
      config: formData.config || {},
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{step ? 'Edit Step' : 'Add New Step'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Step Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: StepType) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select step type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="document_selection">Document Selection</SelectItem>
                <SelectItem value="questions">Questions</SelectItem>
                <SelectItem value="llm_processing">LLM Processing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter step title..."
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter step description..."
            />
          </div>

          {formData.type && (
            <div className="space-y-4">
              {formData.type === 'document_selection' && (
                <DocumentForm
                  config={formData.config}
                  onChange={(config) => setFormData({ ...formData, config })}
                />
              )}    
              {formData.type === 'questions' && (
                <QuestionsForm
                  config={formData.config}
                  onChange={(config) => setFormData({ ...formData, config })}
                />
              )}
              {formData.type === 'llm_processing' && (
                <LLMForm
                  config={formData.config}
                  onChange={(config) => setFormData({ ...formData, config })}
                />
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Step</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}