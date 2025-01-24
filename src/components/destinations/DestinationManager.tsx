// components/destinations/DestinationManager.tsx
import React from 'react';
import { useDestinations } from '@/hooks/useDestinations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Pencil, Trash, Plus } from 'lucide-react';

const DestinationManager: React.FC = () => {
  const { destinations, addDestination, updateDestination, deleteDestination } = useDestinations();
  const [newDestName, setNewDestName] = React.useState('');
  const [editingDest, setEditingDest] = React.useState<{ id: string; name: string } | null>(null);

  const handleAdd = async () => {
    if (!newDestName.trim()) return;
    await addDestination({ name: newDestName.trim() });
    setNewDestName('');
  };

  const handleUpdate = async () => {
    if (!editingDest || !editingDest.name.trim()) return;
    await updateDestination(editingDest);
    setEditingDest(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Nowe miejsce docelowe"
          value={newDestName}
          onChange={(e) => setNewDestName(e.target.value)}
        />
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-1" />
          Dodaj
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nazwa</TableHead>
            <TableHead className="text-right">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {destinations.map((dest) => (
            <TableRow key={dest.id}>
              <TableCell>
                {editingDest?.id === dest.id ? (
                  <Input
                    value={editingDest.name}
                    onChange={(e) => setEditingDest({ ...editingDest, name: e.target.value })}
                    onBlur={handleUpdate}
                  />
                ) : (
                  dest.name
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingDest(dest)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteDestination(dest.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DestinationManager;