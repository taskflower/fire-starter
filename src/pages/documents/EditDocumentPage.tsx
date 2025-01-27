// src/pages/documents/EditDocumentPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { FileText } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';
import { useDocuments } from '@/hooks/useDocuments';
import { useCategories } from '@/hooks/useCategories';
import DocumentForm from '@/components/documents/DocumentForm';
import AdminOutletTemplate from '@/layouts/AdminOutletTemplate';

export default function EditDocumentPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { documents, updateDocument, loading: docsLoading } = useDocuments();
  const { categories, loading: catsLoading, error: catsError } = useCategories();

  if (!id) return <p className="text-destructive">Invalid document ID</p>;

  const document = documents.find(doc => doc.id === id);

  const getCategoryPath = (categoryId: string): string => {
    const paths: string[] = [];
    let currentCat = categories.find(cat => cat.id === categoryId);
    while (currentCat) {
      paths.unshift(currentCat.name);
      currentCat = categories.find(cat => cat.id === currentCat?.parent_id);
    }
    return paths.join(' / ') || 'No category';
  };

  const handleSubmit = async (updatedDoc: DocumentType) => {
    await updateDocument({ ...updatedDoc, id });
    navigate('/admin/documents');
  };

  if (docsLoading || catsLoading) return <p className="text-muted-foreground">Loading...</p>;
  if (catsError) return <p className="text-destructive">{catsError}</p>;
  if (!document) return <p className="text-destructive">Document not found</p>;

  return (
    <AdminOutletTemplate
      title="Edit Document"
      description="Modify existing document"
      icon={FileText}
      backPath="/admin/documents"
    >
      <Card>
        <CardContent className="pt-6">
          <DocumentForm
            document={document}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/admin/documents')}
            categories={categories}
            getCategoryPath={getCategoryPath}
            submitLabel="Save Changes"
          />
        </CardContent>
      </Card>
    </AdminOutletTemplate>
  );
}