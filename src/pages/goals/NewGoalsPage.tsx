/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/goals/NewGoalsPage.tsx

import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { StepManager } from "@/components/newgoals/StepManager";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import StepsDataViewer from "@/components/newgoals/stateDataDialog/StepsDataViewer";


export default function NewGoalsPage() {
  const navigate = useNavigate();
  const { templates, deleteTemplate } = useGoalTemplates();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  const handleTemplateDelete = async () => {
    if (!selectedTemplateId) return;
    await deleteTemplate(selectedTemplateId);
    setSelectedTemplateId("");
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">New Goals</h1>
        <p className="text-muted-foreground mt-2">
          Select a template and start working with LLM
        </p>
      </div>

      {/* Template selection section */}
      <Card>
        <CardHeader>
          <CardTitle>Select a Goal Template</CardTitle>
          <CardDescription>
            Choose a predefined template or create your own
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <Select
              value={selectedTemplateId}
              onValueChange={setSelectedTemplateId}
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
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(`/admin/goal/${selectedTemplateId}/edit`)
                  }
                >
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

      {/* Selected template details */}
      {selectedTemplate && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{selectedTemplate.title}</CardTitle>
                <CardDescription>
                  {selectedTemplate.description}
                </CardDescription>
              </div>
              <Badge variant="outline">
                {selectedTemplate.steps.length} steps
              </Badge>
            </div>
          </CardHeader>

          <Separator className="mb-6" />

          <CardContent>
            {/* Render the new StepManager here */}
            <StepManager
              steps={selectedTemplate.steps.map((step: any) => ({
                ...step,
                isCompleted: false,
              }))}
              onComplete={() => {
                console.log("Goal completed!");
                // Add logic here after all steps are completed
              }}
            />
          </CardContent>

          <CardFooter className="bg-muted/50 pt-4">
          <StepsDataViewer />
            {/* TODO: sprawdz w typich i w store czy to jest uzywane i jesli tak to wywal to */}
            {/* <div className="w-full space-y-2">
              <p className="text-sm font-medium">Required Categories:</p>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.requiredCategories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            </div> */}
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
