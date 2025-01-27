// src/pages/documents/DocumentsPage.tsx
import { FileText } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DocumentList from "@/components/documents/DocumentList";
import CategoryTree from "@/components/categories/CategoryTree";
import AdminOutletTemplate from "@/layouts/AdminOutletTemplate";

export default function DocumentsPage() {
  return (
    <AdminOutletTemplate
      title="Documents Management"
      description="Manage your documents and categories"
      icon={FileText}
    >
      <Tabs defaultValue="documents" className="w-full">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="documents" className="mt-6">
          <DocumentList />
        </TabsContent>
        <TabsContent value="categories" className="mt-6">
          <CategoryTree />
        </TabsContent>
      </Tabs>
    </AdminOutletTemplate>
  );
}