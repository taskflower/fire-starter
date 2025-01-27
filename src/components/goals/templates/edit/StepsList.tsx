// src/components/goals/templates/edit/StepsList.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { Step } from "@/types/goals";
import { Edit, Plus, Trash2 } from "lucide-react";
import { StepDialog } from "./StepDialog";

export function StepsList() {
  const { 
    steps, 
    editingStep, 
    setEditingStep,
    setSteps,
    isDialogOpen, 
    setIsDialogOpen 
  } = useGoalManagementStore();

  const handleAdd = () => {
    setEditingStep(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (step: Step) => {
    setEditingStep(step);
    setIsDialogOpen(true);
  };

  const handleDelete = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index).map((step, i) => ({
      ...step,
      order: i
    }));
    setSteps(newSteps);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Kroki</h3>
          <p className="text-sm text-muted-foreground">
            Dodaj i zarządzaj krokami dla tego celu
          </p>
        </div>
        <Button className="bg-white text-black hover:bg-gray-100" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" /> Dodaj Krok
        </Button>
      </div>

      <div className="space-y-2">
        {steps.map((step, index) => (
          <Card key={step.id} className="p-4 bg-black text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-medium text-white">{step.title}</h4>
                  <p className="text-sm text-gray-300">
                    {step.description}
                  </p>
                </div>
                <Badge variant="outline" className="text-white border-white">
                  {step.type}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-gray-800"
                  onClick={() => handleEdit(step)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-gray-800"
                  onClick={() => handleDelete(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <StepDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        step={editingStep}
      />
    </div>
  );
}