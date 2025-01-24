import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGoalStore } from "@/store/useGoalStore";
import { useState } from "react";

export function StateDialog() {
  const [open, setOpen] = useState(false);
  const state = useGoalStore();

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
            {JSON.stringify(state, null, 2)}
          </pre>
        </DialogContent>
      </Dialog>
    </>
  );
}