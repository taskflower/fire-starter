import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Badge } from "@/components/ui/badge";
  import { useNavigate } from "react-router-dom";
  
  export function GoalsTable({ templates }) {
    const navigate = useNavigate();
  
    return (
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
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/admin/goals/${template.id}`)}
              >
                <TableCell className="font-medium">{template.title}</TableCell>
                <TableCell>{template.description}</TableCell>
                <TableCell>{template.steps.length}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {template.isCompleted ? "Completed" : "In Progress"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }