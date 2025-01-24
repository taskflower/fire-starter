// store/useTreeStore.ts
import { getAllDescendants } from '@/utils/documentCategoryTreeUtils';
import { TreeNode } from '@/utils/treeUtils';
import { create } from 'zustand';

interface TreeStore {
  nodes: TreeNode[];
  addNode: (node: TreeNode) => void;
  removeNode: (nodeId: string) => void;
  updateNode: (id: string, updates: Partial<TreeNode>) => void;
  getChildren: (parentId?: string) => TreeNode[];
  moveNode: (nodeId: string, newParentId?: string) => void;
}

export const useTreeStore = create<TreeStore>((set, get) => ({
  nodes: [],
  
  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node]
  })),
  
  removeNode: (nodeId) => set((state) => {
    // Remove node and all its descendants
    const descendants = getAllDescendants(state.nodes, nodeId);
    return {
      nodes: state.nodes.filter(node => 
        node.id !== nodeId && !descendants.includes(node.id)
      )
    };
  }),
  
  updateNode: (id, updates) => set((state) => ({
    nodes: state.nodes.map(node =>
      node.id === id ? { ...node, ...updates } : node
    )
  })),
  
  getChildren: (parentId) => get().nodes.filter(
    node => node.parentId === parentId
  ),
  
  moveNode: (nodeId, newParentId) => set((state) => ({
    nodes: state.nodes.map(node =>
      node.id === nodeId ? { ...node, parentId: newParentId } : node
    )
  }))
}));