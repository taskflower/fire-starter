// src/pages/documents/DocumentsPage.tsx
import React from "react";
import { CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DocumentList from "@/components/documents/DocumentList";
import CategoryTree from "@/components/categories/CategoryTree";

const DocumentsPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold">Documents Management</h1>
        <p className="text-muted-foreground">
          Manage your documents and categories.
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="documents" className="w-full">
          <TabsList>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="documents">
            <DocumentList />
          </TabsContent>
          <TabsContent value="categories">
            <CategoryTree />
          </TabsContent>
        </Tabs>
      </CardContent>
    </div>
  );
};

export default DocumentsPage;