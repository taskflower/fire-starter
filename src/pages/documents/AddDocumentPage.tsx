// src/pages/documents/AddDocumentPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocuments } from '@/hooks/useDocuments';
import { useCategories } from '@/hooks/useCategories';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import DocumentForm from '@/components/documents/DocumentForm';


const AddDocumentPage: React.FC = () => {
  const navigate = useNavigate();
  const { addDocument } = useDocuments();
  const { categories, loading: catsLoading, error: catsError } = useCategories();

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

  if (catsLoading) return <p className="text-muted-foreground">Loading...</p>;
  if (catsError) return <p className="text-destructive">{catsError}</p>;

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-bold">Add New Document</h1>
        <p className="text-muted-foreground">Create a new document in the system.</p>
      </CardHeader>
      <CardContent>
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
  );
};

export default AddDocumentPage;