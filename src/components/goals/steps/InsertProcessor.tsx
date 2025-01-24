// src/components/goals/steps/InsertProcessor.tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CategoryTreeSelect } from "../edit/CategoryTreeSelect";
import { useState } from "react";
import { useGoalStore } from '@/store/useGoalStore';
import { Button } from '@/components/ui/button';
import { StepConfig } from '@/types/goals';

interface InsertProcessorProps {
  config: StepConfig;
  stepId: string;
}

export function InsertProcessor({ config, stepId }: InsertProcessorProps) {
  const { stepsData, setStepData } = useGoalStore();
  const [documentTitle, setDocumentTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  const handleInsert = async () => {
    if (!documentTitle || !selectedCategory || !config.selectedStep) return;
    
    const sourceStepData = stepsData[config.selectedStep];
    const content = sourceStepData?.llmResponse || sourceStepData?.serviceResponse;
    
    if (!content) return;
    
    // Here you would typically call your document creation service
    const newDocument = {
      title: documentTitle,
      categoryId: selectedCategory,
      content: content
    };
    
    // Store the created document reference
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
          categories={[]} // Pass your categories here
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