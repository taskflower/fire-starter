"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";

import { GoalTemplate, GoalStep } from "@/types/goalTypes";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { useDocuments } from "@/hooks/useDocuments";
import { GoalTemplateDialog } from "./ GoalTemplateDialog";

export default function PathPage() {
  const { templates, addTemplate, updateTemplate } = useGoalTemplates();
  const { documents } = useDocuments();

  // Wybrany szablon
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

  // Obsługa dialogu do edycji/nowego
  const [dialogOpen, setDialogOpen] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState<GoalTemplate | null>(null);

  // Kroki i rekomendacje
  const [steps, setSteps] = useState<(GoalStep & { completed: boolean })[]>([]);
  const [recommendations, setRecommendations] = useState<
    Array<{ id: string; name: string; match: number; description: string }>
  >([]);

  // Ustawianie początkowych kroków i dokumentów zależnych od wybranego szablonu
  useEffect(() => {
    if (selectedTemplateId && templates) {
      const template = templates.find((t) => t.id === selectedTemplateId);
      if (template) {
        // Resetujemy kroki
        setSteps(
          template.steps.map((step) => ({
            ...step,
            completed: false,
          }))
        );

        // Wyszukujemy odpowiednie dokumenty
        const allRequiredCategories = new Set(template.requiredCategories);
        const relevantDocs = documents
          .filter((doc) => allRequiredCategories.has(doc.categoryId))
          .map((doc) => ({
            id: doc.id,
            name: doc.title,
            match: 75,
            description: doc.content.substring(0, 100) + "...",
          }));
        setRecommendations(relevantDocs);
      }
    }
  }, [selectedTemplateId, templates, documents]);

  // Oblicz postęp w %
  const progress = steps.length
    ? Math.round(
        (steps.filter((step) => step.completed).length / steps.length) * 100
      )
    : 0;

  // Kliknięcie w krok -> togglowanie completed
  const toggleStep = (stepId: string) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    );
  };

  // Obsługa zapisu z GoalTemplateDialog
  const handleSaveTemplate = async (template: GoalTemplate) => {
    // Sprawdź, czy już istnieje w liście (update), czy zupełnie nowy (add)
    const isExisting = templates.some((t) => t.id === template.id);

    if (isExisting) {
      await updateTemplate(template.id, template);
    } else {
      await addTemplate(template);
    }
    // Po zapisie ustawiamy go jako wybrany
    setSelectedTemplateId(template.id);
  };

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Moja Podróż do Celu</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Wybierz szablon celu</CardTitle>
          <CardDescription>
            Wybierz predefiniowany szablon lub stwórz własny
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Wybierz szablon..." />
              </SelectTrigger>
              <SelectContent>
                {templates?.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Dodawanie nowego szablonu */}
            <Button
              onClick={() => {
                setTemplateToEdit(null); // nowy szablon
                setDialogOpen(true);
              }}
            >
              Dodaj szablon
            </Button>

            {/* Edycja wybranego szablonu */}
            {selectedTemplateId && (
              <Button
                variant="outline"
                onClick={() => {
                  const selectedTemplate = templates.find(
                    (t) => t.id === selectedTemplateId
                  );
                  if (selectedTemplate) {
                    setTemplateToEdit(selectedTemplate);
                    setDialogOpen(true);
                  }
                }}
              >
                Edytuj szablon
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Okno dialogowe dla dodawania/edycji */}
      <GoalTemplateDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveTemplate}
        template={templateToEdit} // może być null lub istniejący szablon
      />

      {selectedTemplateId && (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Blok rekomendowanych dokumentów */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Rekomendowane dokumenty</CardTitle>
              <CardDescription>
                Dokumenty pasujące do wybranego szablonu
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96 px-4">
                {recommendations.map((doc) => (
                  <div
                    key={doc.id}
                    className="py-4 border-b last:border-none flex items-start justify-between"
                  >
                    <div>
                      <p className="font-semibold">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.description}
                      </p>
                    </div>
                    <Badge variant="outline">{doc.match}%</Badge>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Blok kroków do celu (plan działania) */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Plan działania</CardTitle>
              <CardDescription>
                Kroki do realizacji wybranego celu
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="mb-4">
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Postęp: {progress}%
                </p>
                <Progress value={progress} className="w-full" />
              </div>

              <div className="space-y-3">
                {steps.map((step) => (
                  <div key={step.id} className="p-3 border rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={`font-medium ${
                          step.completed ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {step.title}
                      </h3>
                      <Button
                        variant={step.completed ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => toggleStep(step.id)}
                      >
                        {step.completed ? (
                          <>
                            <Check className="mr-1 h-4 w-4" />
                            Gotowe
                          </>
                        ) : (
                          "Oznacz"
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>

                    {step.requiredDocuments && step.requiredDocuments.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">
                          Wymagane dokumenty:
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {step.requiredDocuments.map((doc, idx) => (
                            <li key={idx}>{doc.title || "Dokument " + (idx + 1)}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
