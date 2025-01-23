// src/pages/goals/EditGoalsPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { StepsList } from "@/components/newgoals/edit/StepsList";
import { Save, ArrowLeft } from "lucide-react";
import { GoalTemplate } from "@/types/goals";

export default function EditGoalsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { templates, updateTemplate } = useGoalTemplates();
  const [template, setTemplate] = useState<GoalTemplate | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const currentTemplate = templates.find((t) => t.id === id);
    if (currentTemplate) {
      setTemplate(currentTemplate);
      setTitle(currentTemplate.title);
      setDescription(currentTemplate.description);
    }
  }, [id, templates]);

  const handleSave = async () => {
    if (!template || !id) return;

    const updatedTemplate = {
      ...template,
      title,
      description,
    };

    try {
      await updateTemplate(id, updatedTemplate);
      navigate("/admin/goals");
    } catch (error) {
      console.error("Error while saving template:", error);
      alert("There was a problem saving the template. Please try again.");
    }
  };

  if (!template) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Edit Goal</h1>
          <p className="text-muted-foreground mt-2">Edit goal details and define steps.</p>
        </div>
        <Button variant="ghost" onClick={() => navigate("/admin/goals")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Goal Name</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter goal name..."
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter goal description..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <StepsList 
              steps={template.steps} 
              onStepsChange={(newSteps) => {
                setTemplate({
                  ...template,
                  steps: newSteps
                });
              }} 
            />
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