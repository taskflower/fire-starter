// src/pages/categories/CategoriesPage.tsx
import React from "react";
import { CardHeader, CardContent } from "@/components/ui/card";
import CategoryTree from "@/components/categories/CategoryTree";

const CategoriesPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <p className="text-muted-foreground">
          Manage your category structure and organization.
        </p>
      </CardHeader>
      <CardContent>
        <CategoryTree />
      </CardContent>
    </div>
  );
};

export default CategoriesPage;