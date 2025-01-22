// src/components/goals/path/RecommendedDocuments.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface RecommendedDocument {
  id: string;
  name: string;
  match: number;
  description: string;
}

interface RecommendedDocumentsProps {
  documents: RecommendedDocument[];
}

export function RecommendedDocuments({ documents }: RecommendedDocumentsProps) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Rekomendowane dokumenty</CardTitle>
        <CardDescription>Dokumenty pasujące do wybranego szablonu</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96 px-4">
          {documents.map((doc) => (
            <div key={doc.id} className="py-4 border-b last:border-none flex items-start justify-between">
              <div>
                <p className="font-semibold">{doc.name}</p>
                <p className="text-sm text-muted-foreground">{doc.description}</p>
              </div>
              <Badge variant="outline">{doc.match}%</Badge>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}