// src/components/newgoals/steps/StepContent.tsx
import { Step } from '../types';
import { DocumentSelector } from './DocumentSelector';
import { QuestionForm } from './QuestionForm';
import { LLMProcessor } from './LLMProcessor';

interface StepContentProps {
  step: Step;
}

export function StepContent({ step }: StepContentProps) {
  const renderContent = () => {
    switch (step.type) {
      case 'document_selection':
        return <DocumentSelector config={step.config} stepId={step.id} />;
      case 'questions':
        return <QuestionForm config={step.config} stepId={step.id} />;
      case 'llm_processing':
        return <LLMProcessor config={step.config} stepId={step.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{step.title}</h3>
        {step.description && (
          <p className="text-sm text-muted-foreground">{step.description}</p>
        )}
      </div>
      {renderContent()}
    </div>
  );
}