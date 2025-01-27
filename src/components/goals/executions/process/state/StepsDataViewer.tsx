// src/components/goals/executions/process/state/StepsDataViewer.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGoalExecutionStore } from "@/store/useGoalExecutionStore";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Database } from "lucide-react";

export default function StepsDataViewer() {
  const [open, setOpen] = useState(false);
  const { stepsData } = useGoalExecutionStore();

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Database className="h-4 w-4 mr-2" /> Show Steps Data
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Steps Data Overview</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {Object.entries(stepsData).map(([stepId, data]) => (
              <Card key={stepId} className="p-4">
                <h3 className="text-lg font-semibold mb-2">Step: {stepId}</h3>
                <div className="bg-muted rounded-lg p-3">
                  {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="flex gap-2 mb-1">
                      <span className="font-medium text-muted-foreground">
                        {key}:
                      </span>
                      <span>{JSON.stringify(value)}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
            {Object.keys(stepsData).length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No steps data available
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}