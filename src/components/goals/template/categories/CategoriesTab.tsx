// tabs/CategoriesTab.tsx
import { TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useCategories } from "@/hooks/useCategories";
import { GoalTemplate } from "@/types/goalTypes";

interface CategoriesTabProps {
  formData: Partial<GoalTemplate>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<GoalTemplate>>>;
}

export function CategoriesTab({ formData, setFormData }: CategoriesTabProps) {
  const { categories } = useCategories();

  return (
    <TabsContent value="categories" className="overflow-y-auto flex-grow">
      <div className="grid gap-2">
        <Label>Wymagane kategorie dokumentów</Label>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`cat-${category.id}`}
              checked={formData.requiredCategories?.includes(category.id)}
              onChange={(e) => {
                setFormData((prev) => {
                  const prevCats = prev.requiredCategories || [];
                  return {
                    ...prev,
                    requiredCategories: e.target.checked
                      ? [...prevCats, category.id]
                      : prevCats.filter((c) => c !== category.id),
                  };
                });
              }}
            />
            <label htmlFor={`cat-${category.id}`}>{category.name}</label>
          </div>
        ))}
      </div>
    </TabsContent>
  );
}