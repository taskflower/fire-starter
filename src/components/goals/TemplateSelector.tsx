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

export function TemplateSelector({ selectedId = "" }) {
  const navigate = useNavigate();
  const { templates, deleteTemplate } = useGoalTemplates();

  const handleTemplateDelete = async () => {
    if (!selectedId) return;
    await deleteTemplate(selectedId);
    navigate("/admin/goals");
  };

  return (
    <Card className="flex items-center justify-between">
      <CardHeader>
        <CardTitle>Select a Goal Template</CardTitle>
        <CardDescription>
          Choose a predefined template or create your own
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-center mt-3">
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

          <Button onClick={() => navigate("/admin/goal/new")}>
            <Plus className="h-4 w-4 mr-2" />
            New Goal
          </Button>

          {selectedId && (
            <>
              <Button
                variant="outline"
                onClick={() => navigate(`/admin/goal/${selectedId}/edit`)}
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