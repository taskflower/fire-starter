/* eslint-disable @typescript-eslint/no-explicit-any */
// tabs/StepItem.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { TreeSelect } from "@/components/common/TreeSelect";
import { StepQuestionEditor } from "./StepQuestionEditor";
import { GoalStep } from "@/types/goalTypes";
import { Category } from "@/types/types";
import { useCategories } from "@/hooks/useCategories";

interface StepItemProps {
  step: GoalStep;
  index: number;
  categories: Category[]; // dodać import z types.ts
  onUpdate: (index: number, field: keyof GoalStep, value: any) => void;
  onRemove: () => void;
}

export function StepItem({ step, index, onUpdate, onRemove }: StepItemProps) {
  const { categories } = useCategories();

  return (
    <div className="grid gap-2 p-4 border rounded-lg">
      <div className="flex justify-between items-start">
        <Input
          placeholder="Nazwa kroku"
          value={step.title}
          onChange={(e) => onUpdate(index, "title", e.target.value)}
        />
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        placeholder="Opis kroku..."
        value={step.description}
        onChange={(e) => onUpdate(index, "description", e.target.value)}
      />
      <Label>Wymagane dokumenty</Label>
      <TreeSelect
        items={categories}
        value={step.requiredDocuments[0]?.categoryId}
        onChange={(value) => {
          const docs = [{ categoryId: value, title: "", description: "" }];
          onUpdate(index, "requiredDocuments", docs);
        }}
        placeholder="Wybierz kategorię dokumentu"
      />

      <Label className="mt-4">Pytania w kroku</Label>
      <StepQuestionEditor
        questions={step.questions || []}
        onChange={(questions) => onUpdate(index, "questions", questions)}
      />
    </div>
  );
}