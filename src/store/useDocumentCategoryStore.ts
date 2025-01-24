// src/store/useDocumentCategoryStore.ts
import { create } from 'zustand';

export interface DocumentCategoryNode {
    id: string;
    type: 'document' | 'category';
    parentId?: string;
    metadata?: {
      relationshipType?: string;
      weight?: number;
      notes?: string;
    };
  }

interface DocumentCategoryStore {
  nodes: DocumentCategoryNode[];
  addNode: (node: DocumentCategoryNode) => void;
  removeNode: (documentId: string, categoryId: string) => void;
  updateNode: (id: string, updates: Partial<DocumentCategoryNode>) => void;
  getChildren: (categoryId?: string) => DocumentCategoryNode[];
  getCategoryDocuments: (categoryId: string) => DocumentCategoryNode[];
  getCategories: () => DocumentCategoryNode[];
}

export const useDocumentCategoryStore = create<DocumentCategoryStore>((set, get) => ({
  nodes: [],
  
  addNode: (node) => set((state) => ({ 
    nodes: [...state.nodes, node] 
  })),
  
  removeNode: (documentId, categoryId) => set((state) => ({ 
    nodes: state.nodes.filter((node) => 
      !(node.id === documentId && node.parentId === categoryId)
    ) 
  })),
  
  updateNode: (id, updates) => set((state) => ({
    nodes: state.nodes.map((node) => 
      node.id === id ? { ...node, ...updates } : node
    )
  })),
  
  getChildren: (categoryId) => get().nodes.filter(
    (node) => node.parentId === categoryId
  ),
  
  getCategoryDocuments: (categoryId) => get().nodes.filter(
    (node) => node.parentId === categoryId && node.type === 'document'
  ),
  
  getCategories: () => get().nodes.filter(
    (node) => node.type === 'category'
  ),
}));