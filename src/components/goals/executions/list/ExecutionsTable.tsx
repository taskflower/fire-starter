/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/goals/executions/list/ExecutionsTable.tsx
import { GoalTemplate, GoalExecution } from "@/types/goals";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { useState } from "react";
import { useGoalExecutionStore } from "@/store/useGoalExecutionStore";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { Trash } from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/ui/ConfirmDeleteDialog";

interface Props {
  onResumeExecution: (id: string) => void;
  templates: GoalTemplate[];
  executions: GoalExecution[];
}

export function ExecutionsTable({ onResumeExecution, executions }: Props) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress'>('all');
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

  const filteredExecutions = executions.filter(execution => 
    statusFilter === 'all' || execution.status === statusFilter
  );

  return (
    <div className="space-y-4">
      <Select
        value={statusFilter}
        onValueChange={(value) => setStatusFilter(value as any)}
      >
        <option value="all">Wszystkie</option>
        <option value="completed">Zakończone</option>
        <option value="in_progress">W trakcie</option>
      </Select>

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