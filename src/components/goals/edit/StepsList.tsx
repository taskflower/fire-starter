import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGoalStore } from "@/store/useGoalStore";
import { Step } from "@/types/goals";
import { Edit, Plus, Trash2 } from "lucide-react";
import { StepDialog } from "./StepDialog";

export function StepsList() {
  const { 
    steps, 
    editingStep, 
    setEditingStep, 
    deleteStep, 
    isDialogOpen, 
    setIsDialogOpen 
  } = useGoalStore();

  const handleAdd = () => {
    setEditingStep(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (step: Step) => {
    setEditingStep(step);
    setIsDialogOpen(true);
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
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" /> Dodaj Krok
        </Button>
      </div>

      <div className="space-y-2">
        {steps.map((step, index) => (
          <Card key={step.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-muted-foreground">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                <Badge variant="outline">{step.type}</Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(step)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteStep(index)}
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