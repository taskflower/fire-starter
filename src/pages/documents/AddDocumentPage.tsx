// src/pages/documents/AddDocumentPage.tsx
import { useNavigate } from 'react-router-dom';
import { FileText } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';
import { useDocuments } from '@/hooks/useDocuments';
import { useCategories } from '@/hooks/useCategories';
import DocumentForm from '@/components/documents/DocumentForm';
import AdminOutletTemplate from '@/layouts/AdminOutletTemplate';

export default function AddDocumentPage() {
  const navigate = useNavigate();
  const { addDocument } = useDocuments();
  const { categories, loading, error } = useCategories();

  const getCategoryPath = (categoryId: string): string => {
    const paths: string[] = [];
    let currentCat = categories.find(cat => cat.id === categoryId);
    while (currentCat) {
      paths.unshift(currentCat.name);
      currentCat = categories.find(cat => cat.id === currentCat?.parent_id);
    }
    return paths.join(' / ') || 'No category';
  };

  const handleSubmit = async (document: DocumentType) => {
    await addDocument(document);
    navigate('/admin/documents');
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;
  if (error) return <p className="text-destructive">{error}</p>;

  return (
    <AdminOutletTemplate 
      title="Add New Document"
      description="Create a new document in the system"
      icon={FileText}
      backPath="/admin/documents"
    >
      <Card>
        <CardContent className="pt-6">
          <DocumentForm
            document={{}}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/admin/documents')}
            categories={categories}
            getCategoryPath={getCategoryPath}
            submitLabel="Create Document"
          />
        </CardContent>
      </Card>
    </AdminOutletTemplate>
  );
}