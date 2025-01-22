/* eslint-disable @typescript-eslint/no-explicit-any */
// tabs/StepsTab.tsx
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { GoalStep } from "@/types/goalTypes";
import { StepItem } from "./StepItem";
import { useCategories } from "@/hooks/useCategories";

interface StepsTabProps {
  steps: GoalStep[];
  setSteps: React.Dispatch<React.SetStateAction<GoalStep[]>>;
}

export function StepsTab({ steps, setSteps }: StepsTabProps) {
  const { categories } = useCategories();
  const addStep = () => {
    setSteps((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "",
        description: "",
        requiredDocuments: [],
        questions: [],
      },
    ]);
  };

  const updateStep = (index: number, field: keyof GoalStep, value: any) => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      newSteps[index] = { ...newSteps[index], [field]: value };
      return newSteps;
    });
  };

  const removeStep = (index: number) => {
    setSteps((prevSteps) => prevSteps.filter((_, i) => i !== index));
  };

  return (
    <TabsContent value="steps" className="overflow-y-auto flex-grow">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <Label>Kroki</Label>
          <Button variant="outline" size="sm" onClick={addStep}>
            <Plus className="mr-2 h-4 w-4" />
            Dodaj krok
          </Button>
        </div>

        {steps.map((step, index) => (
          <StepItem
            key={step.id}
            step={step}
            index={index}
            categories={categories} // dodać import z useCategories
            onUpdate={updateStep}
            onRemove={() => removeStep(index)}
          />
        ))}
      </div>
    </TabsContent>
  );
}
