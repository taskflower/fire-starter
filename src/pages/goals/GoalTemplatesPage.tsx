// src/pages/goals/GoalTemplatesPage.tsx
import { Goal, Plus } from "lucide-react";
import { GoalTemplate } from "@/types/goals";
import { GoalTabs } from "@/components/goals/GoalTabs";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { useGoalExecution } from "@/hooks/useGoalExecution";
import AdminOutletTemplate from "@/layouts/AdminOutletTemplate";


interface TemplatesTableProps {
  templates: GoalTemplate[];
}

function TemplatesTable({ templates }: TemplatesTableProps) {
  const navigate = useNavigate();
  const { startExecution } = useGoalExecution();

  const handleStartProcess = async (templateId: string) => {
    const executionId = await startExecution(templateId);
    navigate(`/admin/goals/${templateId}?execution=${executionId}`);
  };

  const handleEdit = (templateId: string) => {
    navigate(`/admin/goals/${templateId}/edit`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nazwa</TableHead>
          <TableHead>Opis</TableHead>
          <TableHead>Akcje</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates.map((template) => (
          <TableRow key={template.id}>
            <TableCell>{template.title}</TableCell>
            <TableCell>{template.description}</TableCell>
            <TableCell className="space-x-2">
              <Button onClick={() => handleStartProcess(template.id)}>
                Start
              </Button>
              <Button variant="outline" onClick={() => handleEdit(template.id)}>
                Edytuj
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function GoalTemplatesPage() {
  const navigate = useNavigate();
  const { templates } = useGoalTemplates();

  return (
    <AdminOutletTemplate
      title="Goals and Processes"
      icon={Goal}
      description="Manage goal templates and track process progress"
      actions={
        <Button onClick={() => navigate("/admin/goals/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Goal
        </Button>
      }
    >
      <GoalTabs activeTab="templates" />
      <TemplatesTable templates={templates} />
    
    </AdminOutletTemplate>
  );
}