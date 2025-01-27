/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/goals/executions/list/GoalsTable.tsx 
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Select } from "@/components/ui/select";
import { useState } from "react";
import { useGoalExecutionStore } from "@/store/useGoalExecutionStore";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";

interface Props {
  onResumeExecution: (executionId: string) => void;
}

export function GoalsTable({ onResumeExecution }: Props) {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress'>('all');
  
  const executions = useGoalExecutionStore(state => state.executions);
  const title = useGoalManagementStore(state => state.title);
  const description = useGoalManagementStore(state => state.description);
  const steps = useGoalManagementStore(state => state.steps);

  const filteredExecutions = executions.filter(execution => 
    statusFilter === 'all' || execution.status === statusFilter
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as any)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="in_progress">In Progress</option>
        </Select>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExecutions.map((execution) => (
              <TableRow key={execution.id}>
                <TableCell className="font-medium">{title}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>
                  {execution.currentStepIndex + 1} / {steps.length}
                </TableCell>
                <TableCell>
                  <Badge variant={execution.status === 'completed' ? "default" : "secondary"}>
                    {execution.status === 'completed' ? 'Completed' : 'In Progress'}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2">
                  {execution.status === 'in_progress' && (
                    <Button 
                      variant="outline"
                      onClick={() => onResumeExecution(execution.id)}
                    >
                      Resume
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => navigate(`/goals/${execution.templateId}/executions/${execution.id}`)}
                  >
                    History
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}