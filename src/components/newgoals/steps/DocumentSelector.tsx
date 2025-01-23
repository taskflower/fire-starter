// src/components/newgoals/steps/DocumentSelector.tsx
import { useDocuments } from '@/hooks/useDocuments';
import { useGoalStore } from '@/store/useGoalStore';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StepConfig } from '../types';

interface DocumentSelectorProps {
  config: StepConfig;
  stepId: string;
}

export function DocumentSelector({ config, stepId }: DocumentSelectorProps) {
  const { documents } = useDocuments();
  const { stepsData, setStepData } = useGoalStore();
  const selectedIds = stepsData[stepId]?.documentIds || [];

  const relevantDocuments = documents.filter(doc =>
    config.documentRequirements?.some(req => req.categoryId === doc.categoryId)
  );

  const handleSelect = (documentId: string) => {
    const newSelectedIds = selectedIds.includes(documentId)
      ? selectedIds.filter(id => id !== documentId)
      : [...selectedIds, documentId];

    setStepData(stepId, { documentIds: newSelectedIds });
  };

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {relevantDocuments.map((doc) => (
          <div key={doc.id} className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg">
            <Checkbox
              checked={selectedIds.includes(doc.id)}
              onCheckedChange={() => handleSelect(doc.id)}
            />
            <div>
              <p className="font-medium">{doc.title}</p>
              <p className="text-sm text-muted-foreground">{doc.content}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
