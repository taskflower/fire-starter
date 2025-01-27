// src/components/goals/templates/list/TemplatesTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GoalTemplate } from "@/types/goals";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";

interface Props {
  templates: GoalTemplate[];
  onSelect: (id: string) => void;
}

export function TemplatesTable({ templates, onSelect }: Props) {
  const { resetStore } = useGoalManagementStore();

  const handleSelect = (id: string) => {
    resetStore();
    onSelect(id);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tytuł</TableHead>
            <TableHead>Opis</TableHead>
            <TableHead>Liczba kroków</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.map((template) => (
            <TableRow
              key={template.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSelect(template.id)}
            >
              <TableCell className="font-medium">{template.title}</TableCell>
              <TableCell>{template.description}</TableCell>
              <TableCell>{template.steps.length}</TableCell>
              <TableCell>{template.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}