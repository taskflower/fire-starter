/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/treeUtils.ts
export interface TreeNode {
  id: string | undefined;
  name: string; 
  parent_id?: string | undefined;
  [key: string]: any;
}

export type TreeNodeWithRequiredId = Omit<TreeNode, "id"> & {
  id: string;
};
export interface ProcessedTreeNode extends TreeNodeWithRequiredId {
  name: string;
  children: ProcessedTreeNode[];
  level: number;
}

export const buildTree = (
  items: TreeNodeWithRequiredId[],
  parentId: string | null = null,
  level: number = 0
): ProcessedTreeNode[] => {
  return items
    .filter((item) =>
      parentId === null ? !item.parent_id : item.parent_id === parentId
    )
    .map(
      (item) =>
        ({
          ...item,
          level,
          children: buildTree(items, item.id, level + 1),
        } as ProcessedTreeNode)
    );
};

export const flattenTree = (
  items: TreeNodeWithRequiredId[],
  parentId: string | null = null,
  level: number = 0
): (TreeNodeWithRequiredId & { level: number })[] => {
  const result: (TreeNodeWithRequiredId & { level: number })[] = [];

  items
    .filter((item) =>
      parentId === null ? !item.parent_id : item.parent_id === parentId
    )
    .forEach((item) => {
      result.push({ ...item, level });
      result.push(...flattenTree(items, item.id, level + 1));
    });

  return result;
};

export const filterTreeNodes = (
  items: TreeNodeWithRequiredId[],
  currentId?: string
): TreeNodeWithRequiredId[] => {
  if (!currentId) return items;

  return items.filter((item) => {
    if (item.id === currentId) return false;

    let currentItem = item;
    while (currentItem.parent_id) {
      if (currentItem.parent_id === currentId) return false;
      const parentItem = items.find((i) => i.id === currentItem.parent_id);
      if (!parentItem) break;
      currentItem = parentItem;
    }

    return true;
  });
};
