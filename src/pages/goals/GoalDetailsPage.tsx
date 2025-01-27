import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Goal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StepsDataViewer from "@/components/goals/executions/process/state/StepsDataViewer";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { useGoalExecutionStore } from "@/store/useGoalExecutionStore";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { useGoalExecution } from "@/hooks/useGoalExecution";
import AdminOutletTemplate from "@/layouts/AdminOutletTemplate";
import { StepManager } from "@/components/goals/executions/process/steps/StepManager";
import { StepNavigation } from "@/components/goals/executions/process/steps/StepNavigation";

export default function GoalDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { templates, deleteTemplate } = useGoalTemplates();
  const { startExecution, updateExecution, completeExecution } = useGoalExecution();
  const [isLoading, setIsLoading] = useState(true);

  const {
    setTitle,
    setDescription,
    setOnCompleteAction,
    setSteps,
  } = useGoalManagementStore();

  const {
    currentStepIndex,
    stepsData,
    executionId,
    setExecutionId,
    steps
  } = useGoalExecutionStore();

  useEffect(() => {
    if (!id) {
      navigate("/admin/goals");
      return;
    }

    if (templates.length > 0) {
      setIsLoading(false);
      const template = templates.find((t) => t.id === id);
      if (template) {
        const initTemplate = async () => {
          setTitle(template.title);
          setDescription(template.description);
          setOnCompleteAction(template.onCompleteAction);
          setSteps(
            template.steps.map((step) => ({
              ...step,
              isCompleted: false,
            }))
          );
          const newExecutionId = await startExecution(id);
          setExecutionId(newExecutionId);
        };
        initTemplate();
      }
    }
  }, [id, templates, navigate, setTitle, setDescription, setOnCompleteAction, setSteps]);

  useEffect(() => {
    if (!executionId) return;
    updateExecution(executionId, stepsData, currentStepIndex);
  }, [stepsData, currentStepIndex, executionId]);

  const handleTemplateDelete = async () => {
    if (!id) return;
    await deleteTemplate(id);
    navigate("/admin/goals");
  };

  const handleComplete = async () => {
    if (!executionId) return;
    await completeExecution(executionId);
    navigate('/admin/goals');
  };

  if (isLoading) return <div>Loading...</div>;

  const template = templates.find((t) => t.id === id);
  if (!template) return <div>Template not found</div>;

  return (
    <AdminOutletTemplate
      title={template.title}
      icon={Goal}
      description="Follow the steps to complete your goal"
      backPath="/admin/goals"
      actions={
        <>
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/goals/${id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" onClick={handleTemplateDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </>
      }
    >
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1.5">
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </div>
            <StepsDataViewer />
          </div>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent>
          <StepManager />
        </CardContent>
        <CardFooter className="bg-muted/50">
          <StepNavigation
            canGoBack={currentStepIndex > 0}
            canGoForward={currentStepIndex < steps.length - 1}
            onComplete={handleComplete}
          />
        </CardFooter>
      </Card>
    </AdminOutletTemplate>
  );
}