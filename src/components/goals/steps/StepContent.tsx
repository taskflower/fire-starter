import { useGoalStore } from "@/store/useGoalStore";
import { Separator } from "@/components/ui/separator";
import { DocumentSelector } from "./DocumentSelector";
import { QuestionForm } from "./QuestionForm";
import { LLMProcessor } from "./LLMProcessor";
import { InsertProcessor } from "./InsertProcessor";
import { ServicesProcessor } from "./ServicesProcessor";
import { SummaryStep } from "./SummaryStep";

export function StepContent() {
  const { steps, currentStepIndex, onCompleteAction } = useGoalStore();
  const step = steps[currentStepIndex];
  const showingSummary = onCompleteAction?.type === "summary" && currentStepIndex === steps.length;

  const renderContent = () => {
    if (showingSummary) {
      return <SummaryStep />;
    }

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
          {showingSummary ? "Podsumowanie" : step.title}
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