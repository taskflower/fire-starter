import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDocuments } from '@/hooks/useDocuments';
import { useCategories } from '@/hooks/useCategories';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import DocumentForm from '@/components/documents/DocumentForm';
import { Document as DocumentType } from '@/services/types';

const EditDocumentPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { documents, updateDocument, loading: docsLoading } = useDocuments();
  const { categories, loading: catsLoading, error: catsError } = useCategories();

  if (!id) return <p className="text-destructive">Nieprawidłowe ID dokumentu</p>;

  const document = documents.find(doc => doc.id === id);

  const getCategoryPath = (categoryId: string): string => {
    const paths: string[] = [];
    let currentCat = categories.find(cat => cat.id === categoryId);
    
    while (currentCat) {
      paths.unshift(currentCat.name);
      currentCat = categories.find(cat => cat.id === currentCat?.parent_id);
    }
    
    return paths.join(' / ') || 'Brak kategorii';
  };

  const handleSubmit = async (updatedDoc: DocumentType) => {
    await updateDocument({ ...updatedDoc, id });
    navigate('/admin/documents');
  };

  if (docsLoading || catsLoading) return <p className="text-muted-foreground">Ładowanie...</p>;
  if (catsError) return <p className="text-destructive">{catsError}</p>;
  if (!document) return <p className="text-destructive">Nie znaleziono dokumentu</p>;

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-bold">Edytuj dokument</h1>
        <p className="text-muted-foreground">Zmodyfikuj istniejący dokument.</p>
      </CardHeader>
      <CardContent>
        <DocumentForm
          document={document}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin/documents')}
          categories={categories}
          getCategoryPath={getCategoryPath}
          submitLabel="Zapisz zmiany"
        />
      </CardContent>
    </Card>
  );
};

export default EditDocumentPage;