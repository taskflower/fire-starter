/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { TreeSelect } from "@/components/common/TreeSelect";
import { GoalTemplate, GoalStep } from "@/types/goalTypes";

interface GoalTemplateDialogProps {
  /** Jeśli przekazujesz istniejący szablon, komponent przechodzi w tryb edycji. 
   *  Jeśli zostawisz `null`/`undefined`, będzie to tworzenie nowego szablonu.
   */
  template?: GoalTemplate | null;

  /** Czy okno dialogowe jest aktualnie otwarte */
  isOpen: boolean;

  /** Funkcja wywoływana, gdy okno się zamyka (lub gdy klikniemy Anuluj). */
  onClose: () => void;

  /** Funkcja zapisu - otrzymuje obiekt GoalTemplate do zapisania. */
  onSave: (template: GoalTemplate) => Promise<void>;
}

/**
 * Komponent łączy formularz dodawania i edycji szablonu.
 * - Gdy `template` jest przekazany, jesteśmy w trybie edycji.
 * - Gdy `template` jest `null/undefined`, jesteśmy w trybie tworzenia nowego szablonu.
 */
export function GoalTemplateDialog({
  template,
  isOpen,
  onClose,
  onSave,
}: GoalTemplateDialogProps) {
  const { categories } = useCategories();

  const [formData, setFormData] = useState<Partial<GoalTemplate>>({
    title: "",
    description: "",
    requiredCategories: [],
  });

  const [steps, setSteps] = useState<GoalStep[]>([]);

  useEffect(() => {
    if (template) {
      // Edycja istniejącego szablonu
      setFormData({
        title: template.title,
        description: template.description,
        requiredCategories: template.requiredCategories,
      });
      setSteps(template.steps || []);
    } else {
      // Tworzenie nowego szablonu
      setFormData({
        title: "",
        description: "",
        requiredCategories: [],
      });
      setSteps([]);
    }
  }, [template]);

  const addStep = () => {
    setSteps((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "",
        description: "",
        requiredDocuments: [],
      },
    ]);
  };

  const updateStep = (index: number, field: keyof GoalStep, value: any) => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      newSteps[index] = { ...newSteps[index], [field]: value };
      return newSteps;
    });
  };

  const removeStep = (index: number) => {
    setSteps((prevSteps) => prevSteps.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!formData.title) return;

    const newTemplate: GoalTemplate = {
      id: template?.id || crypto.randomUUID(),
      title: formData.title!,
      description: formData.description || "",
      requiredCategories: formData.requiredCategories || [],
      steps,
      // Dodatkowe pola, jeśli potrzebne
      suggestedDocuments: template?.suggestedDocuments || [],
    };

    await onSave(newTemplate);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
     

      <DialogContent className="max-w-2xl h-[60vh] flex flex-col overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>
            {template ? "Edytuj szablon celu" : "Nowy szablon celu"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col flex-grow">
          <Tabs defaultValue="general" className="w-full flex-grow">
            <div className="sticky top-0 bg-white z-10">
              <TabsList className="mb-4">
                <TabsTrigger value="general">Nazwa i opis</TabsTrigger>
                <TabsTrigger value="categories">Kategorie</TabsTrigger>
                <TabsTrigger value="steps">Kroki</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="general" className="overflow-y-auto flex-grow">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Nazwa szablonu</Label>
                  <Input
                    id="title"
                    placeholder="np. Strategia marketingowa"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Opis</Label>
                  <Textarea
                    id="description"
                    placeholder="Opisz cel tego szablonu..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </TabsContent>

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

            <TabsContent value="steps" className="overflow-y-auto flex-grow">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label>Kroki</Label>
                  <Button variant="outline" size="sm" onClick={addStep}>
                    <Plus className="mr-2 h-4 w-4" />
                    Dodaj krok
                  </Button>
                </div>

                {steps.map((step, index) => (
                  <div key={step.id} className="grid gap-2 p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <Input
                        placeholder="Nazwa kroku"
                        value={step.title}
                        onChange={(e) => updateStep(index, "title", e.target.value)}
                      />
                      <Button variant="ghost" size="sm" onClick={() => removeStep(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Opis kroku..."
                      value={step.description}
                      onChange={(e) =>
                        updateStep(index, "description", e.target.value)
                      }
                    />
                    <Label>Wymagane dokumenty</Label>
                    {/* Przykład prostej implementacji, zamiast TreeSelect można dodać logikę
                        wyboru wielu dokumentów. Tu jedynie pokazano ideę. */}
                    <TreeSelect
                      items={categories}
                      value={step.requiredDocuments[0]?.categoryId}
                      onChange={(value) => {
                        const docs = [
                          { categoryId: value, title: "", description: "" },
                        ];
                        updateStep(index, "requiredDocuments", docs);
                      }}
                      placeholder="Wybierz kategorię dokumentu"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Anuluj
          </Button>
          <Button onClick={handleSubmit}>
            {template ? "Zapisz zmiany" : "Zapisz szablon"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
