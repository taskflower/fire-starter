/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/goals/EditGoalsPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StepManager } from "@/components/newgoals/StepManager";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Save, ArrowLeft, Trash2 } from "lucide-react";
import { GoalStep, GoalTemplate } from "@/types/goals";

export default function EditGoalsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { templates, updateTemplate, deleteTemplate } = useGoalTemplates();

  const [template, setTemplate] = useState<GoalTemplate | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const currentTemplate = templates.find((t) => t.id === id);
    if (currentTemplate) {
      setTemplate(currentTemplate);
      setTitle(currentTemplate.title);
      setDescription(currentTemplate.description);
    }
  }, [id, templates]);

  const handleSave = async () => {
    if (!template || !id) return;

    const updatedTemplate = {
      title,
      description,
    };

    await updateTemplate(id, updatedTemplate);
    navigate("/goals");
  };

  const handleDelete = async () => {
    if (!id) return;
    await deleteTemplate(id);
    navigate("/goals");
  };

  if (!template) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header z nawigacją */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edycja ścieżki celów</h1>
          <p className="text-muted-foreground mt-2">
            Dostosuj szczegóły i kroki swojej ścieżki
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => navigate("/admin/goals")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Powrót
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Usuń ścieżkę
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Czy na pewno chcesz usunąć tę ścieżkę?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Ta akcja jest nieodwracalna. Wszystkie dane związane z tą
                  ścieżką zostaną usunięte.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Anuluj</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Usuń
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Dwie kolumny: po lewej informacje, po prawej kroki */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Podstawowe informacje */}
        <Card>
          <CardHeader>
            <CardTitle>Podstawowe informacje</CardTitle>
            <CardDescription>
              Edytuj główne informacje o ścieżce celów
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Nazwa ścieżki</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Wprowadź nazwę ścieżki..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Opis</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Wprowadź opis ścieżki..."
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex flex-wrap gap-2">
              {template.requiredCategories.map((category: string) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Zapisz zmiany
            </Button>
          </CardFooter>
        </Card>

        {/* Kroki */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Kroki</CardTitle>
                <CardDescription>
                  Przeglądaj i edytuj kroki w ścieżce
                </CardDescription>
              </div>
              <Badge variant="outline">{template.steps.length} kroków</Badge>
            </div>
          </CardHeader>

          <Separator className="mb-6" />

          <CardContent>
            <StepManager
              steps={template.steps.map((step: GoalStep) => ({
                ...step,
                isCompleted: false, // dodajemy isCompleted, jeśli komponent StepManager tego wymaga
              }))}
              onComplete={() => {
                console.log("Goal editing completed!");
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
