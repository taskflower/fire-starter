// src/components/goals/executions/process/steps/types/DocumentSelector.tsx
import { useDocuments } from "@/hooks/useDocuments";
import { useGoalExecutionStore } from "@/store/useGoalExecutionStore";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepConfig } from "@/types/goals";

interface DocumentSelectorProps {
  config: StepConfig;
  stepId: string;
}

export function DocumentSelector({ config, stepId }: DocumentSelectorProps) {
  const { documents } = useDocuments();
  const { stepsData, setStepData } = useGoalExecutionStore();
  const selectedIds = stepsData[stepId]?.documentIds || [];

  const relevantDocuments = documents.filter((doc) =>
    config.documentRequirements?.some(
      (req) => req.categoryId === doc.categoryId
    )
  );

  const handleSelect = (documentId: string) => {
    const newSelectedIds = selectedIds.includes(documentId)
      ? selectedIds.filter((id) => id !== documentId)
      : [...selectedIds, documentId];

    setStepData(stepId, { documentIds: newSelectedIds });
  };

  return (
    <ScrollArea className="min-h-50">
      <div className="">
        {relevantDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg"
          >
            <Checkbox
              className="my-1"
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