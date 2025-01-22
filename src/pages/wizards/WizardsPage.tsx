// src/pages/wizards/WizardsPage.tsx
import React from "react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import WizardsList from "@/components/wizards/WizardsList";

const WizardsPage: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Wizards Management</h1>
      </CardHeader>
      <CardContent>
        <WizardsList />
      </CardContent>
    </Card>
  );
};

export default WizardsPage;
