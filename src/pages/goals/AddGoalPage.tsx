// src/pages/admin/goals/AddGoalPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { Card, CardContent } from "@/components/ui/card";
import { Goal } from "lucide-react";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { BasicInformation } from "@/components/goals/templates/edit/forms/BasicInformation";
import type { CreateGoalTemplateDTO } from "@/types/goals";
import AdminOutletTemplate from "@/layouts/AdminOutletTemplate";
import { StepsList } from "@/components/goals/templates/edit/StepsList";
import SaveButton from "@/components/common/SaveButton";

export default function AddGoalPage() {
  const navigate = useNavigate();
  const { addTemplate } = useGoalTemplates();
  const { 
    title, 
    description, 
    onCompleteAction, 
    steps,
    resetStore 
  } = useGoalManagementStore();

  useEffect(() => {
    return () => resetStore();
  }, [resetStore]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Goal name is required.");
      return;
    }

    const newTemplate = {
      title,
      description,
      onCompleteAction,
      steps,
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date()
    } as CreateGoalTemplateDTO;

    try {
      await addTemplate(newTemplate);
      navigate("/admin/goals");
    } catch (error) {
      console.error("Error while saving template:", error);
      alert("There was a problem saving the template. Please try again.");
      throw error; // Propagate error to trigger SaveButton error state
    }
  };

  return (
    <AdminOutletTemplate
      title="Add New Goal"
      icon={Goal}
      description="Fill in the goal details and define the steps."
      backPath="/admin/goals"
      actions={
        <SaveButton 
          onSave={handleSave} 
          isValid={title.trim().length > 0}
        >
          Create Goal
        </SaveButton>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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