// src/components/goals/executions/list/ExecutionFilters.tsx
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ExecutionFiltersProps {
  statusFilter: string;
  onStatusChange: (value: string) => void;
  isEmpty?: boolean;
}

export function ExecutionFilters({ statusFilter, onStatusChange, isEmpty = false }: ExecutionFiltersProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger>
          <SelectValue placeholder="Wybierz status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Wszystkie</SelectItem>
          <SelectItem value="completed">Zakończone</SelectItem>
          <SelectItem value="in_progress">W trakcie</SelectItem>
        </SelectContent>
      </Select>

      {isEmpty && (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
        
          <p className="text-gray-500 mb-4">
            {statusFilter === 'all' 
              ? 'Brak aktywnych procesów' 
              : statusFilter === 'completed' 
                ? 'Brak zakończonych procesów'
                : 'Brak procesów w trakcie'
            }
          </p>
  
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/goals/templates')}
              className="inline-flex items-center"
            >
              Przejdź do szablonów
            </Button>
       
        </div>
      )}
    </div>
  );
}