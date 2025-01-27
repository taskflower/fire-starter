// src/components/goals/templates/edit/StepDialog.tsx
import { useEffect } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { DocumentForm } from "./forms/DocumentForm";
import { QuestionsForm } from "./forms/QuestionsForm";
import { LLMForm } from "./forms/LLMForm";
import { InsertForm } from "./forms/InsertForm";
import { ServicesForm } from "./forms/ServicesForm";

import { Step, StepType } from "@/types/goals";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";

interface StepDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  step: Step | null;
}

export function StepDialog({ open, onOpenChange, step }: StepDialogProps) {
  const {
    stepFormData,
    setStepFormData,
    resetStepForm,
    steps,
    handleStepSave
  } = useGoalManagementStore();

  useEffect(() => {
    if (step) {
      setStepFormData({
        ...step,
        config: step.config || {
          documentRequirements: [],
          questions: [],
          llmPrompt: "",
        },
      });
    } else {
      resetStepForm();
    }
  }, [step, setStepFormData, resetStepForm]);

  const onSave = () => {
    if (!stepFormData.title || !stepFormData.type) return;

    const finalStep: Step = {
      id: step?.id || `step-${Date.now()}`,
      title: stepFormData.title,
      description: stepFormData.description || "",
      type: stepFormData.type as StepType,
      isCompleted: false,
      config: stepFormData.config || {},
      order: step?.order || steps.length,
    };

    handleStepSave(finalStep);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{step ? "Edit Step" : "Add New Step"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4 flex gap-4 w-full">
          <div className="flex-1 space-y-2">
            <div className="space-y-2">
              <Label>Step Type</Label>
              <Select
                value={stepFormData.type}
                onValueChange={(value: StepType) =>
                  setStepFormData({ type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select step type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document_selection">Document Selection</SelectItem>
                  <SelectItem value="questions">Questions</SelectItem>
                  <SelectItem value="llm_processing">LLM Processing</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="insert">Insert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={stepFormData.title}
                onChange={(e) => setStepFormData({ title: e.target.value })}
                placeholder="Enter step title..."
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={stepFormData.description}
                onChange={(e) => setStepFormData({ description: e.target.value })}
                placeholder="Enter step description..."
              />
            </div>
          </div>

          {stepFormData.type && (
            <div className="space-y-4 flex-1">
              {stepFormData.type === "document_selection" && <DocumentForm />}
              {stepFormData.type === "questions" && <QuestionsForm />}
              {stepFormData.type === "llm_processing" && <LLMForm />}
              {stepFormData.type === "insert" && <InsertForm />}
              {stepFormData.type === "services" && <ServicesForm />}
            </div>  
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Step</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}