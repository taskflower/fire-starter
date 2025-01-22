// template/GeneralTab.tsx
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GoalTemplate } from "@/types/goalTypes";

interface GeneralTabProps {
  formData: Partial<GoalTemplate>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<GoalTemplate>>>;
}

export function GeneralTab({ formData, setFormData }: GeneralTabProps) {
  return (
    <TabsContent value="general" className="overflow-y-auto flex-grow">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Nazwa szablonu</Label>
          <Input
            id="title"
            placeholder="np. Strategia marketingowa"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
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
  );
}