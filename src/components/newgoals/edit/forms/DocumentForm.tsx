// src/pages/goals/components/edit/forms/DocumentForm.tsx
import { StepConfig } from '@/components/newgoals/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface DocumentFormProps {
    config?: StepConfig; // Dodaj optional
  onChange: (config: StepConfig) => void;
}

export function DocumentForm({ config = {}, onChange }: DocumentFormProps) {
  const [newRequirement, setNewRequirement] = useState({
    categoryId: '',
    title: '',
    description: ''
  });

  const addRequirement = () => {
    if (!newRequirement.categoryId || !newRequirement.title) return;
    
    onChange({
      ...config,
      documentRequirements: [
        ...(config.documentRequirements || []),
        newRequirement
      ]
    });
    setNewRequirement({ categoryId: '', title: '', description: '' });
  };

  const removeRequirement = (index: number) => {
    const newReqs = config.documentRequirements?.filter((_, i) => i !== index) || [];
    onChange({ ...config, documentRequirements: newReqs });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {config.documentRequirements?.map((req, index) => (
          <div key={index} className="flex items-center gap-2 p-2 border rounded">
            <div className="flex-1">
              <p className="font-medium">{req.title}</p>
              <p className="text-sm text-muted-foreground">{req.description}</p>
              <p className="text-sm">Category: {req.categoryId}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeRequirement(index)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t pt-4">
        <div className="space-y-2">
          <Label>Category ID</Label>
          <Input
            value={newRequirement.categoryId}
            onChange={e => setNewRequirement({ ...newRequirement, categoryId: e.target.value })}
            placeholder="Enter category ID..."
          />
        </div>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={newRequirement.title}
            onChange={e => setNewRequirement({ ...newRequirement, title: e.target.value })}
            placeholder="Enter document requirement title..."
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={newRequirement.description}
            onChange={e => setNewRequirement({ ...newRequirement, description: e.target.value })}
            placeholder="Enter description..."
          />
        </div>
        <Button onClick={addRequirement} className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Add Requirement
        </Button>
      </div>
    </div>
  );
}