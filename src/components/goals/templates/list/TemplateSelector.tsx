// src/components/goals/templates/list/TemplateSelector.tsx
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";

export function TemplateSelector({ selectedId = "" }) {
  const navigate = useNavigate();
  const { templates, deleteTemplate } = useGoalTemplates();
  const { resetStore } = useGoalManagementStore();

  const handleTemplateDelete = async () => {
    if (!selectedId) return;
    await deleteTemplate(selectedId);
    resetStore();
    navigate("/admin/goals");
  };

  return (
    <Card className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-muted">
      <CardHeader>
        <CardTitle>Select a Goal Template</CardTitle>
        <CardDescription>
          Choose a predefined template or create your own
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <Select
            value={selectedId}
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
          <Button onClick={() => navigate("/admin/goals/new")}>
            <Plus className="h-4 w-4 mr-2" />
            New Goal
          </Button>
          {selectedId && (
            <>
              <Button
                variant="outline"
                onClick={() => navigate(`/admin/goals/${selectedId}/edit`)}
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
  );
}
