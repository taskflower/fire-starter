import React from "react";
import { useWizards } from "@/hooks/useWizards";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import WizardForm from "./WizardForm";

const WizardsList: React.FC = () => {
  const { wizards, loading, error, deleteWizard } = useWizards();

  if (loading) return <p>Loading wizards...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Wizards</h2>
        <WizardForm />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Steps</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wizards.map((wizard) => (
              <TableRow key={wizard.id}>
                <TableCell>{wizard.name}</TableCell>
                <TableCell>{wizard.description}</TableCell>
                <TableCell>{wizard.steps.length}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteWizard(wizard.id!)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WizardsList;
