import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Save, ArrowLeft } from "lucide-react";
import { useGoalStore } from "@/store/useGoalStore";
import { BasicInformation } from "@/components/goals/edit/forms/BasicInformation";
import { StepsList } from "@/components/goals/edit/StepsList";
import type { CreateGoalTemplateDTO } from "@/types/goals";

export default function AddGoalPage() {
  const navigate = useNavigate();
  const { addTemplate } = useGoalTemplates();
  const { 
    title, 
    description, 
    onCompleteAction, 
    steps,
    resetStore 
  } = useGoalStore();

  useEffect(() => {
    return () => resetStore();
  }, [resetStore]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Goal name is required.");
      return;
    }

    const newTemplate: CreateGoalTemplateDTO = {
      title,
      description,
      onCompleteAction,
      steps,
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      await addTemplate(newTemplate);
      navigate("/admin/goals");
    } catch (error) {
      console.error("Error while saving template:", error);
      alert("There was a problem saving the template. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Add New Goal</h1>
          <p className="text-muted-foreground mt-2">
            Fill in the goal details and define the steps.
          </p>
        </div>
        <Button variant="ghost" onClick={() => navigate("/admin/goals")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <BasicInformation />
        <Card>
          <CardContent className="pt-6">
            <StepsList />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" /> Save Goal
        </Button>
      </div>
    </div>
  );
}