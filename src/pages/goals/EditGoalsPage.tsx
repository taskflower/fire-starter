import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Save, ArrowLeft } from "lucide-react";
import { useGoalStore } from "@/store/useGoalStore";
import { BasicInformation } from "@/components/goals/edit/forms/BasicInformation";
import { StepsList } from "@/components/goals/edit/StepsList";
import type { GoalTemplate } from "@/types/goals";

export default function EditGoalsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { templates, updateTemplate } = useGoalTemplates();
  const {
    title,
    description,
    onCompleteAction,
    steps,
    setTitle,
    setDescription,
    setOnCompleteAction,
    setSteps,
    resetStore,
  } = useGoalStore();

  useEffect(() => {
    const currentTemplate = templates.find((t) => t.id === id);
    if (currentTemplate) {
      setTitle(currentTemplate.title);
      setDescription(currentTemplate.description);
      setOnCompleteAction(currentTemplate.onCompleteAction || { type: "none" });
      setSteps(currentTemplate.steps);
    }
    
    return () => resetStore();
  }, [id, templates, setTitle, setDescription, setOnCompleteAction, setSteps, resetStore]);

  const handleSave = async () => {
    if (!id) return;

    const updatedTemplate: Partial<GoalTemplate> = {
      title,
      description,
      onCompleteAction,
      steps,
      updatedAt: new Date(),
    };

    try {
      await updateTemplate(id, updatedTemplate);
      navigate("/admin/goals");
    } catch (error) {
      console.error("Error while saving template:", error);
      alert("There was a problem saving the template. Please try again.");
    }
  };

  if (!templates.find((t) => t.id === id)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Edit Goal</h1>
          <p className="text-muted-foreground mt-2">
            Edit goal details and define steps.
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