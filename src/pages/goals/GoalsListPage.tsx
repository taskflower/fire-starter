import { Goal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import MainTitle from "@/layouts/MainTitle";

export default function GoalsListPage() {
  const navigate = useNavigate();
  const { templates } = useGoalTemplates();

  return (
    <div className="container mx-auto py-8 space-y-8">
        <div className="text-blue-500 text-sm underline pb-4">  Breadcrumbs</div>
      <MainTitle
        title="My Goals"
        icon={Goal}
        description="Select a template and start working with LLM"
      />

      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("/admin/goal/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Goal
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Steps Count</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template) => (
              <TableRow
                key={template.id}
                className="hover:bg-muted/50"
                onClick={() => navigate(`/admin/goal/${template.id}/edit`)}
              >
                <TableCell className="font-medium cursor-pointer">
                  {template.title}
                </TableCell>
                <TableCell className="cursor-pointer">
                  {template.description}
                </TableCell>
                <TableCell className="cursor-pointer">
                  {template.steps.length}
                </TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
