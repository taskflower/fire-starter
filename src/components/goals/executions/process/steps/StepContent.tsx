// src/components/goals/executions/process/steps/StepContent.tsx
import { useGoalExecutionStore } from "@/store/useGoalExecutionStore";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { Separator } from "@/components/ui/separator";
import { DocumentSelector } from "./types/DocumentSelector";
import { QuestionForm } from "./types/QuestionForm";
import { LLMProcessor } from "./types/LLMProcessor";
import { InsertProcessor } from "./types/InsertProcessor";
import { ServicesProcessor } from "./types/ServicesProcessor";
import { SummaryStep } from "./types/SummaryStep";

export function StepContent() {
  const { currentStepIndex } = useGoalExecutionStore();
  const { steps, onCompleteAction } = useGoalManagementStore();
  const step = steps[currentStepIndex];
  const showingSummary = onCompleteAction?.type === "summary" && currentStepIndex === steps.length;

  const renderContent = () => {
    if (showingSummary) return <SummaryStep />;
    if (!step) return null;
    
    switch (step.type) {
      case "document_selection":
        return <DocumentSelector config={step.config} stepId={step.id} />;
      case "questions":
        return <QuestionForm config={step.config} stepId={step.id} />;
      case "llm_processing":
        return <LLMProcessor config={step.config} stepId={step.id} />;
      case "services":
        return <ServicesProcessor config={step.config} stepId={step.id} />;
      case "insert":
        return <InsertProcessor config={step.config} stepId={step.id} />;
      default:
        return null;
    }
  };

  if (!step && !showingSummary) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h3 className="text-2xl font-black">
          {showingSummary ? "Summary" : step.title}
        </h3>
        {step?.description && !showingSummary && (
          <p className="text-sm text-muted-foreground">{step.description}</p>
        )}
      </div>
      <Separator />
      {renderContent()}
    </div>
  );
}
