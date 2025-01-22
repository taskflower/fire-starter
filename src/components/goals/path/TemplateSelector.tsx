// src/components/goals/path/TemplateSelector.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { GoalTemplate } from "@/types/goalTypes";

interface TemplateSelectorProps {
  templates: GoalTemplate[];
  selectedTemplateId: string;
  onTemplateSelect: (id: string) => void;
  onAddTemplate: () => void;
  onEditTemplate: () => void;
  onDeleteTemplate: () => Promise<void>;
}

export function TemplateSelector({
  templates,
  selectedTemplateId,
  onTemplateSelect,
  onAddTemplate,
  onEditTemplate,
  onDeleteTemplate,
}: TemplateSelectorProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Wybierz szablon celu</CardTitle>
        <CardDescription>Wybierz predefiniowany szablon lub stwórz własny</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-4 items-center">
          <Select value={selectedTemplateId} onValueChange={onTemplateSelect}>
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

          <Button onClick={onAddTemplate}>Dodaj szablon</Button>

          {selectedTemplateId && (
            <>
              <Button variant="outline" onClick={onEditTemplate}>
                Edytuj szablon
              </Button>
              <Button variant="outline" onClick={onDeleteTemplate}>
                Usuń szablon
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}