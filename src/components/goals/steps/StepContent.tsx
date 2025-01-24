// src/components/goals/steps/StepContent.tsx
import { DocumentSelector } from "./DocumentSelector";
import { QuestionForm } from "./QuestionForm";
import { LLMProcessor } from "./LLMProcessor";
import { Separator } from "@/components/ui/separator";
import { useGoalStore } from "@/store/useGoalStore";

export function StepContent() {
  const { steps, currentStepIndex } = useGoalStore();
  const step = steps[currentStepIndex];

  const renderContent = () => {
    if (!step) return null;
    
    switch (step.type) {
      case "document_selection":
        return <DocumentSelector config={step.config} stepId={step.id} />;
      case "questions":
        return <QuestionForm config={step.config} stepId={step.id} />;
      case "llm_processing":
        return <LLMProcessor config={step.config} stepId={step.id} />;
      default:
        return null;
    }
  };

  if (!step) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h3 className="text-2xl font-black">{step.title}</h3>
        {step.description && (
          <p className="text-sm text-muted-foreground">{step.description}</p>
        )}
      </div>
      <Separator />
      {renderContent()}
    </div>
  );
}