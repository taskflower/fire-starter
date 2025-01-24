import { useEffect } from "react";
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
import StepsDataViewer from "@/components/goals/stateDataDialog/StepsDataViewer";
import { StepManager } from "@/components/goals/StepManager";
import { StepNavigation } from "@/components/goals/StepNavigation";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { useGoalStore } from "@/store/useGoalStore";
import MainTitle from "@/layouts/MainTitle";
import { TemplateSelector } from "@/components/goals/TemplateSelector";

export default function GoalDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { templates, deleteTemplate } = useGoalTemplates();
  const {
    setTitle,
    setDescription,
    setOnCompleteAction,
    setSteps,
    currentStepIndex,
    steps,
  } = useGoalStore();

  useEffect(() => {
    if (!id) {
      navigate("/admin/goals");
      return;
    }

    const template = templates.find((t) => t.id === id);
    if (template) {
      setTitle(template.title);
      setDescription(template.description);
      setOnCompleteAction(template.onCompleteAction);
      setSteps(
        template.steps.map((step) => ({
          ...step,
          isCompleted: false,
        }))
      );
    } else {
      navigate("/admin/goals");
    }
  }, [
    id,
    templates,
    navigate,
    setTitle,
    setDescription,
    setOnCompleteAction,
    setSteps,
  ]);

  const handleTemplateDelete = async () => {
    if (!id) return;
    await deleteTemplate(id);
    navigate("/admin/goals");
  };

  const template = templates.find((t) => t.id === id);

  if (!template) return null;

  return (
    <div className="container mx-auto py-8 space-y-8">
      <MainTitle
        title={template.title}
        icon={Goal}
        description="Follow the steps to complete your goal"
      />
      <TemplateSelector selectedId={id} />
      <div className="flex gap-4 justify-end">
        <Button
          variant="outline"
          onClick={() => navigate(`/admin/goal/${id}/edit`)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" onClick={handleTemplateDelete}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>

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
          />
        </CardFooter>
      </Card>
    </div>
  );
}
