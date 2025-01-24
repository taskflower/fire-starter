import { TreeNode } from "./treeUtils";

// Helper function to get all descendant node IDs
export function getAllDescendants(nodes: TreeNode[], nodeId: string): string[] {
    const children = nodes.filter(node => node.parentId === nodeId);
    return children.reduce((acc, child) => [
      ...acc,
      child.id,
      ...getAllDescendants(nodes, child.id)
    ], [] as string[]);
  }