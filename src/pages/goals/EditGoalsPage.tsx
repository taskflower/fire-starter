import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Save, Goal } from "lucide-react";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { BasicInformation } from "@/components/goals/templates/edit/forms/BasicInformation";
import type { GoalTemplate } from "@/types/goals";
import AdminOutletTemplate from "@/layouts/AdminOutletTemplate";
import { StepsList } from "@/components/goals/templates/edit/StepsList";

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
  } = useGoalManagementStore();

  useEffect(() => {
    const currentTemplate = templates.find((t) => t.id === id);
    if (currentTemplate) {
      setTitle(currentTemplate.title);
      setDescription(currentTemplate.description);
      setOnCompleteAction(currentTemplate.onCompleteAction || { type: "none" });
      setSteps(currentTemplate.steps);
    }

    return () => resetStore();
  }, [
    id,
    templates,
    setTitle,
    setDescription,
    setOnCompleteAction,
    setSteps,
    resetStore,
  ]);

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
    <AdminOutletTemplate
      title="Edit Goal"
      icon={Goal}
      description="Edit your goal here."
      backPath="/admin/goals"
      actions={
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" /> Save Goal
        </Button>
      }
    >
      <div className="grid grid-cols-2 gap-8">
        <BasicInformation />
          <Card>
            <CardContent className="pt-6">
            <StepsList />
          </CardContent>
        </Card>
      </div>
    </AdminOutletTemplate>
  );
}