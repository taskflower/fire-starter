// src/components/goals/executions/process/steps/types/InsertProcessor.tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from "react";
import { useGoalExecutionStore } from '@/store/useGoalExecutionStore';
import { Button } from '@/components/ui/button';
import { StepConfig } from '@/types/goals';
import { CategoryTreeSelect } from '@/components/goals/templates/edit/CategoryTreeSelect';

interface InsertProcessorProps {
  config: StepConfig;
  stepId: string;
}

export function InsertProcessor({ config, stepId }: InsertProcessorProps) {
  const { stepsData, setStepData } = useGoalExecutionStore();
  const [documentTitle, setDocumentTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  const handleInsert = async () => {
    if (!documentTitle || !selectedCategory || !config.selectedStep) return;
    
    const sourceStepData = stepsData[config.selectedStep];
    const content = sourceStepData?.llmResponse || sourceStepData?.serviceResponse;
    
    if (!content) return;
    
    const newDocument = {
      title: documentTitle,
      categoryId: selectedCategory,
      content: content
    };
    
    setStepData(stepId, { createdDocument: newDocument });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Nazwa dokumentu</Label>
        <Input
          value={documentTitle}
          onChange={(e) => setDocumentTitle(e.target.value)}
          placeholder="Wprowadź nazwę dokumentu..."
        />
      </div>

      <div className="space-y-2">
        <Label>Kategoria</Label>
        <CategoryTreeSelect
          categories={[]}
          selectedCategories={selectedCategory ? [selectedCategory] : []}
          onSelectionChange={(categories) => setSelectedCategory(categories[0])}
        />
      </div>

      <Button 
        onClick={handleInsert}
        disabled={!documentTitle || !selectedCategory}
        className="w-full"
      >
        Utwórz dokument
      </Button>
    </div>
  );
}