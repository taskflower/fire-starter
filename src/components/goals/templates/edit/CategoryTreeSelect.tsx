import { TreeView } from "@/components/common/TreeView";
import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@/types/types";
import { buildTree, ProcessedTreeNode } from "@/utils/treeUtils";

interface CategoryTreeSelectProps {
  categories: Category[];
  selectedCategories: string[];
  onSelectionChange: (categoryIds: string[]) => void;
}

export function CategoryTreeSelect({ 
  categories, 
  selectedCategories, 
  onSelectionChange 
}: CategoryTreeSelectProps) {
  const categoryTree = buildTree(categories.filter(
    (cat): cat is Category & { id: string } => !!cat.id
  ));

  const renderActions = (node: ProcessedTreeNode) => (
    <div className="flex items-center space-x-2">
      <Checkbox 
        checked={selectedCategories.includes(node.id)}
        onCheckedChange={(checked) => {
          const newSelection = checked
            ? [...selectedCategories, node.id]
            : selectedCategories.filter(id => id !== node.id);
          onSelectionChange(newSelection);
        }}
      />
    </div>
  );

  return (
    <TreeView 
      nodes={categoryTree} 
      renderActions={renderActions}
      showIcons={false}
    />
  );
}