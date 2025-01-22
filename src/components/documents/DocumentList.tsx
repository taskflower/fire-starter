// src/components/documents/DocumentList.tsx
import React, { useState, useMemo } from "react";
import { useSearchParams } from 'react-router-dom';
import { useDocuments } from "@/hooks/useDocuments";
import { useCategories } from "@/hooks/useCategories";
import { DocumentType, DocumentWithId, Category } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import { TreeSelect } from "@/components/common/TreeSelect";
import { TreeNodeWithRequiredId } from "@/utils/treeUtils";
import { Pagination } from "@/components/ui/pagination";
import AddDocumentDialog from "./dialogs/AddDocumentDialog";
import EditDocumentDialog from "./dialogs/EditDocumentDialog";

const ITEMS_PER_PAGE = 10;

const DocumentList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const currentCategoryId = searchParams.get('categoryId') || undefined;

  const {
    documents,
    loading: docsLoading,
    error: docsError,
    addDocument,
    updateDocument,
    deleteDocument,
  } = useDocuments();
  
  const {
    categories,
    loading: catsLoading,
    error: catsError,
  } = useCategories();
  
  const [editingDoc, setEditingDoc] = useState<DocumentWithId | null>(null);

  // Filter documents based on URL parameters
  const filteredDocuments = useMemo(() => {
    if (!currentCategoryId) return documents;
    return documents.filter(doc => doc.categoryId === currentCategoryId);
  }, [documents, currentCategoryId]);

  // Paginate filtered documents
  const paginatedDocuments = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDocuments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredDocuments, currentPage]);

  const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE);

  // Update URL parameters
  const updateParams = (params: { page?: number; categoryId?: string }) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (params.page) {
      newParams.set('page', params.page.toString());
    }
    
    if (params.categoryId !== undefined) {
      if (params.categoryId && params.categoryId !== 'none') {
        newParams.set('categoryId', params.categoryId);
      } else {
        newParams.delete('categoryId');
      }
      newParams.set('page', '1'); // Resetowanie strony przy zmianie kategorii
    }
  
    setSearchParams(newParams);
  };
  

  const getCategoryPath = (categoryId: string): string => {
    const paths: string[] = [];
    let currentCat = categories.find((cat) => cat.id === categoryId);

    while (currentCat) {
      paths.unshift(currentCat.name);
      currentCat = categories.find((cat) => cat.id === currentCat?.parent_id);
    }

    return paths.join(" / ") || "No category";
  };

  const handleAdd = async (docData: Pick<DocumentType, 'title' | 'content' | 'categoryId'>) => {
    try {
      const now = new Date();
      await addDocument({
        title: docData.title,
        content: docData.content,
        categoryId: docData.categoryId,
        createdAt: now,
        updatedAt: now
      });
    } catch (err) {
      console.error('Failed to add document:', err);
    }
  };

  const handleEdit = async (docData: Pick<DocumentWithId, 'id' | 'title' | 'content' | 'categoryId'>) => {
    if (!editingDoc) return;
    
    try {
      await updateDocument({
        ...editingDoc,
        title: docData.title,
        content: docData.content,
        categoryId: docData.categoryId,
        updatedAt: new Date()
      });
      setEditingDoc(null);
    } catch (err) {
      console.error('Failed to update document:', err);
    }
  };

  if (docsLoading || catsLoading)
    return <p className="text-muted-foreground">Loading documents...</p>;
  if (docsError || catsError)
    return <p className="text-destructive">{docsError || catsError}</p>;

  // Filtrujemy kategorie, żeby mieć pewność, że wszystkie mają id
  const categoriesWithId = categories.filter(
    (category): category is Category & { id: string } => !!category.id
  );

  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Documents</h2>
            <p className="text-sm text-muted-foreground">
              Manage and organize your document collection
            </p>
          </div>
          <AddDocumentDialog
            categories={categories}
            onAdd={handleAdd}
            getCategoryPath={getCategoryPath}
          />
        </div>
        <div className="pt-2">
          <TreeSelect<TreeNodeWithRequiredId>
            items={categoriesWithId}
            value={currentCategoryId}
            onChange={(categoryId) => updateParams({ categoryId })}
            label="Filter by category"
            placeholder="All categories"
           
          />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDocuments.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.title}</TableCell>
                <TableCell>
                  {doc.content.length > 100
                    ? `${doc.content.substring(0, 100)}...`
                    : doc.content}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {getCategoryPath(doc.categoryId)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingDoc(doc)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteDocument(doc.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => updateParams({ page })}
          />
        </div>

        {editingDoc && (
          <EditDocumentDialog
            document={editingDoc}
            isOpen={!!editingDoc}
            onClose={() => setEditingDoc(null)}
            onEdit={handleEdit}
            categories={categories}
            getCategoryPath={getCategoryPath}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentList;