// src/components/goals/executions/process/state/StateDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGoalExecutionStore } from "@/store/useGoalExecutionStore";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { useState } from "react";

export function StateDialog() {
  const [open, setOpen] = useState(false);
  const executionState = useGoalExecutionStore();
  const managementState = useGoalManagementStore();
  
  const combinedState = {
    execution: executionState,
    management: managementState
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Show State
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Current State</DialogTitle>
          </DialogHeader>
          <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[400px]">
            {JSON.stringify(combinedState, null, 2)}
          </pre>
        </DialogContent>
      </Dialog>
    </>
  );
}