import { useState, useEffect } from 'react';
import { FirestoreService } from '@/services/firestoreService';
import { DocumentType, DocumentWithId, DocumentWithoutId } from '@/types/types';
import { WithFieldValue } from 'firebase/firestore';

const documentService = new FirestoreService<Omit<DocumentType, 'id'>>('documents');

interface UseDocumentsReturn {
  documents: DocumentWithId[];
  loading: boolean;
  error: string | null;
  addDocument: (document: DocumentWithoutId) => Promise<void>;
  updateDocument: (document: DocumentWithId) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
}

export const useDocuments = (): UseDocumentsReturn => {
  const [documents, setDocuments] = useState<DocumentWithId[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async (): Promise<void> => {
    try {
      const docs = await documentService.getAll();
      setDocuments(docs as DocumentWithId[]);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching documents';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments().catch((err) => {
      console.error('Failed to fetch documents:', err);
    });
  }, []);

  const addDocument = async (document: WithFieldValue<DocumentWithoutId>): Promise<void> => {
    try {
      await documentService.add(document);
      await fetchDocuments();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add document';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateDocument = async (document: DocumentWithId): Promise<void> => {
    try {
      const { id, ...docData } = document;
      await documentService.update(id, docData as WithFieldValue<Omit<DocumentType, 'id'>>);
      await fetchDocuments();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update document';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteDocument = async (id: string): Promise<void> => {
    try {
      await documentService.delete(id);
      await fetchDocuments();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete document';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    documents,
    loading,
    error,
    addDocument,
    updateDocument,
    deleteDocument
  };
};