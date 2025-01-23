import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { Step } from "@/components/newgoals/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, ArrowLeft } from "lucide-react";
import { StepsList } from "@/components/newgoals/edit/StepsList";

export default function AddGoalPage() {
  const navigate = useNavigate();
  const { addTemplate } = useGoalTemplates();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState<Step[]>([]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Goal name is required.");
      return;
    }

    const formattedSteps = steps.map((step, index) => ({
      ...step,
      order: index,
    }));

    const newTemplate = {
      title,
      description,
      steps: formattedSteps,
      createdAt: new Date(),
      updatedAt: new Date(),
      requiredCategories: [],
      status: "draft" as const,
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
          <p className="text-muted-foreground mt-2">Fill in the goal details and define the steps.</p>
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
            <StepsList steps={steps} onStepsChange={setSteps} />
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