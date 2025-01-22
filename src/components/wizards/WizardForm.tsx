// src/components/wizards/WizardForm.tsx
import React, { useState } from "react";
import { useWizards } from "@/hooks/useWizards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const WizardForm: React.FC = () => {
  const { addWizard } = useWizards();
  const [open, setOpen] = useState(false);
  const [newWizard, setNewWizard] = useState({
    name: "",
    description: "",
    steps: [],
  });

  const handleAddWizard = async () => {
    if (newWizard.name && newWizard.description) {
      console.log('Próba dodania wizarda:', newWizard);
      try {
        const id = await addWizard({ 
          ...newWizard, 
          createdAt: new Date(), 
          updatedAt: new Date() 
        });
        console.log('Wizard dodany pomyślnie, ID:', id);
        setNewWizard({ name: "", description: "", steps: [] });
        setOpen(false);
      } catch (error) {
        console.error("Error adding wizard:", error);
      }
    } else {
      console.log('Brak wymaganych pól');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add New Wizard</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add New Wizard</DialogTitle>
        <DialogDescription>
          Fill in the details to create a new wizard.
        </DialogDescription>
        <div className="grid gap-4 mt-4">
          <Input
            placeholder="Name"
            value={newWizard.name}
            onChange={(e) => setNewWizard({ ...newWizard, name: e.target.value })}
          />
          <Input
            placeholder="Description"
            value={newWizard.description}
            onChange={(e) =>
              setNewWizard({ ...newWizard, description: e.target.value })
            }
          />
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleAddWizard}>Add Wizard</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WizardForm;