/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/goals/executions/list/ExecutionsTable.tsx
import { GoalTemplate, GoalExecution } from "@/types/goals";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useGoalExecutionStore } from "@/store/useGoalExecutionStore";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { Trash } from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/ui/ConfirmDeleteDialog";
import { useQueryParams } from "@/hooks/useQueryParams";
import { ExecutionFilters } from "./ExecutionFilters";

interface Props {
  onResumeExecution: (id: string) => void;
  templates: GoalTemplate[];
  executions: GoalExecution[];
}

interface FilterParams extends Record<string, string> {
  status: string;
}

export function ExecutionsTable({ onResumeExecution, executions }: Props) {
  const { params, setParams } = useQueryParams<FilterParams>();
  const statusFilter = params.status || 'all';
  
  const steps = useGoalManagementStore(state => state.steps);
  const title = useGoalManagementStore(state => state.title);
  const deleteExecution = useGoalExecutionStore(state => state.deleteExecution);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteExecution(deleteId);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const handleStatusChange = (value: string) => {
    setParams({ status: value === 'all' ? undefined : value });
  };

  const filteredExecutions = executions.filter(execution => 
    statusFilter === 'all' || execution.status === statusFilter
  );

  if (filteredExecutions.length === 0) {
    return <ExecutionFilters 
      statusFilter={statusFilter}
      onStatusChange={handleStatusChange}
      isEmpty={true}
    />;
  }

  return (
    <div className="space-y-4">
      <ExecutionFilters 
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cel</TableHead>
            <TableHead>Postęp</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredExecutions.map((execution) => (
            <TableRow key={execution.id}>
              <TableCell>{execution.id}</TableCell>
              <TableCell>{title}</TableCell>
              <TableCell>
                {execution.currentStepIndex + 1} / {steps.length}
              </TableCell>
              <TableCell>
                <Badge variant={execution.status === 'completed' ? "default" : "secondary"}>
                  {execution.status === 'completed' ? 'Zakończone' : 'W trakcie'}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                {execution.status === 'in_progress' && (
                  <Button 
                    variant="outline"
                    onClick={() => onResumeExecution(execution.id)}
                  >
                    Wznów
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => handleDeleteClick(execution.id)}
                  className="text-red-500"
                  aria-label="Usuń Proces"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {deleteId && (
        <ConfirmDeleteDialog
          isOpen={!!deleteId}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}