// src/components/categories/CategoryTree.tsx
import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Pencil } from "lucide-react";
import { TreeView } from "@/components/common/TreeView";
import { buildTree, ProcessedTreeNode } from "@/utils/treeUtils";
import AddCategoryDialog from "./dialogs/AddCategoryDialog";
import EditCategoryDialog from "./dialogs/EditCategoryDialog";
import { Category } from "@/types/types";

const CategoryTree = () => {
  const {
    categories,
    loading,
    error,
    addCategory,
    deleteCategory,
    updateCategory,
  } = useCategories();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleEdit = (node: ProcessedTreeNode) => {
    // Konwertujemy ProcessedTreeNode na Category
    const category: Category = {
      id: node.id,
      name: node.name,
      parent_id: node.parent_id,
    };

    setSelectedCategory(category);
    setIsEditDialogOpen(true);
  };
  const handleUpdateCategory = (category: Category) => {
    if (category.id) {
      updateCategory(category as Category & { id: string });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-destructive bg-destructive/10 rounded-md">
        {error}
      </div>
    );

  const categoryTree = buildTree(
    categories.filter(
      (cat): cat is Category & { id: string } =>
        !!cat.id && typeof cat.id === "string"
    )
  );

  const renderActions = (node: ProcessedTreeNode) => (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-primary"
        onClick={() => handleEdit(node)}
      >
        <Pencil className="h-4 w-4" />
        <span className="sr-only">Edytuj kategorię</span>
      </Button>
      {node.id && (
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-destructive"
          onClick={() => deleteCategory(node.id)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Usuń kategorię</span>
        </Button>
      )}
    </>
  );

  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Kategorie</h2>
            <p className="text-sm text-muted-foreground">
              Zarządzaj strukturą kategorii
            </p>
          </div>
          <Button
            className="w-full sm:w-auto"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Dodaj Kategorię
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {categoryTree.length > 0 ? (
          <TreeView nodes={categoryTree} renderActions={renderActions} />
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-center rounded-md bg-muted/5">
            <p className="text-muted-foreground mb-4">
              Nie znaleziono żadnych kategorii
            </p>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Dodaj pierwszą kategorię
            </Button>
          </div>
        )}
      </CardContent>

      <AddCategoryDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={addCategory}
        categories={categories}
      />

      <EditCategoryDialog
        category={selectedCategory}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onEdit={handleUpdateCategory}
        categories={categories}
      />
    </Card>
  );
};

export default CategoryTree;
