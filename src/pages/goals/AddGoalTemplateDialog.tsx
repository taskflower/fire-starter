/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { TreeSelect } from "@/components/common/TreeSelect";
import { GoalTemplate, GoalStep } from "@/types/goalTypes";

interface Props {
  onTemplateCreate: (template: GoalTemplate) => Promise<void>;
}

export function AddGoalTemplateDialog({ onTemplateCreate }: Props) {
  const { categories } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<GoalTemplate>>({
    title: "",
    description: "",
    steps: [],
    requiredCategories: [],
    suggestedDocuments: [],
  });

  const [steps, setSteps] = useState<GoalStep[]>([]);

  const addStep = () => {
    setSteps([
      ...steps,
      {
        id: crypto.randomUUID(),
        title: "",
        description: "",
        requiredDocuments: [],
      },
    ]);
  };

  const updateStep = (index: number, field: keyof GoalStep, value: any) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!formData.title) return;

    const template: GoalTemplate = {
      id: crypto.randomUUID(),
      title: formData.title!,
      description: formData.description || "",
      steps,
      requiredCategories: formData.requiredCategories || [],
      suggestedDocuments: [],
    };

    await onTemplateCreate(template);
    setIsOpen(false);
    setFormData({
      title: "",
      description: "",
      steps: [],
      requiredCategories: [],
    });
    setSteps([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj szablon celu
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl h-[60vh] flex flex-col overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Nowy szablon celu</DialogTitle>
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
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="np. Strategia marketingowa"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Opis</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Opisz cel tego szablonu..."
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="categories"
              className="overflow-y-auto flex-grow"
            >
              <div className="grid gap-2">
                <Label>Wymagane kategorie dokumentów</Label>
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`cat-${category.id}`}
                      checked={formData.requiredCategories?.includes(
                        category.id
                      )}
                      onChange={(e) => {
                        const newCategories = e.target.checked
                          ? [
                              ...(formData.requiredCategories || []),
                              category.id,
                            ]
                          : formData.requiredCategories?.filter(
                              (id) => id !== category.id
                            );
                        setFormData({
                          ...formData,
                          requiredCategories: newCategories,
                        });
                      }}
                    />
                    <label htmlFor={`cat-${category.id}`}>
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="steps" className="overflow-y-auto flex-grow">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>Kroki</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addStep}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Dodaj krok
                  </Button>
                </div>

                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="grid gap-2 p-4 border rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <Input
                        value={step.title}
                        onChange={(e) =>
                          updateStep(index, "title", e.target.value)
                        }
                        placeholder="Nazwa kroku"
                        className="mb-2"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStep(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <Textarea
                      value={step.description}
                      onChange={(e) =>
                        updateStep(index, "description", e.target.value)
                      }
                      placeholder="Opis kroku..."
                    />

                    <Label>Wymagane dokumenty dla tego kroku</Label>
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
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Anuluj
          </Button>
          <Button onClick={handleSubmit}>Zapisz szablon</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
