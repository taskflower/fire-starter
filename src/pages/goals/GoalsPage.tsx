import StepsDataViewer from "@/components/goals/stateDataDialog/StepsDataViewer";
import { StepManager } from "@/components/goals/StepManager";
import { StepNavigation } from "@/components/goals/StepNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { useGoalStore } from "@/store/useGoalStore";
import { Separator } from "@radix-ui/react-dropdown-menu";

import { Plus, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// src/pages/goals/GoalsPage.tsx
export default function GoalsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { templates, deleteTemplate } = useGoalTemplates();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const { setTitle, setDescription, setOnCompleteAction, setSteps, currentStepIndex, steps } = useGoalStore();
 
  useEffect(() => {
    if (id) {
      const template = templates.find(t => t.id === id);
      if (template) {
        setSelectedTemplateId(id);
        setTitle(template.title);
        setDescription(template.description);
        setOnCompleteAction(template.onCompleteAction);
        setSteps(template.steps.map(step => ({
          ...step,
          isCompleted: false,
        })));
      } else {
        navigate('/admin/goals');
      }
    }
  }, [id, templates, navigate, setTitle, setDescription, setOnCompleteAction, setSteps]);
 
  const handleTemplateDelete = async () => {
    if (!selectedTemplateId) return;
    await deleteTemplate(selectedTemplateId);
    setSelectedTemplateId("");
    navigate("/admin/goals");
  };
 
  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);
 
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Goals</h1>
        <p className="text-muted-foreground mt-2">
          Select a template and start working with LLM
        </p>
      </div>
 
      <Card className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Select a Goal Template</CardTitle>
          <CardDescription>Choose a predefined template or create your own</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <Select
              value={selectedTemplateId}
              onValueChange={(value) => {
                navigate(`/admin/goals/${value}`);
              }}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select a template..." />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
 
            <Button onClick={() => navigate("/admin/goal/new")}>
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
 
            {selectedTemplateId && (
              <>
                <Button variant="outline" onClick={() => navigate(`/admin/goal/${selectedTemplateId}/edit`)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" onClick={handleTemplateDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
 
      {selectedTemplate && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{selectedTemplate.title}</CardTitle>
                <CardDescription>{selectedTemplate.description}</CardDescription>
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
      )}
    </div>
  );
 }