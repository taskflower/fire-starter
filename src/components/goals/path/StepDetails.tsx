// src/components/goals/path/StepDetails.tsx
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { StepQuestions } from "../StepQuestions";
import { GoalStep } from "@/types/goalTypes";

interface StepDetailsProps {
  step: GoalStep & { completed: boolean };
  onToggle: (stepId: string) => void;
}

export function StepDetails({ step, onToggle }: StepDetailsProps) {
  return (
    <div className="p-3 border rounded-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className={`font-medium ${step.completed ? "line-through text-muted-foreground" : ""}`}>
          {step.title}
        </h3>
        <Button
          variant={step.completed ? "secondary" : "outline"}
          size="sm"
          onClick={() => onToggle(step.id)}
        >
          {step.completed ? (
            <>
              <Check className="mr-1 h-4 w-4" />
              Gotowe
            </>
          ) : (
            "Oznacz"
          )}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">{step.description}</p>

      {step.questions && step.questions.length > 0 && (
        <StepQuestions stepId={step.id} questions={step.questions} />
      )}

      {step.requiredDocuments && step.requiredDocuments.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium">Wymagane dokumenty:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {step.requiredDocuments.map((doc, idx) => (
              <li key={idx}>{doc.title || "Dokument " + (idx + 1)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}