// src/components/common/TreeSelect.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/services/utils';
import {  TreeNodeWithRequiredId, filterTreeNodes, flattenTree } from '@/utils/treeUtils';

// Zmieniamy ograniczenie generyczne z TreeNode na TreeNodeWithRequiredId
export interface TreeSelectProps<T extends TreeNodeWithRequiredId> {
  items: T[];
  value?: string;
  onChange: (value: string) => void;
  currentId?: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

// Zmieniamy ograniczenie generyczne z TreeNode na TreeNodeWithRequiredId
export const TreeSelect = <T extends TreeNodeWithRequiredId>({
  items,
  value,
  onChange,
  currentId,
  label,
  placeholder = "Select...",
  className
}: TreeSelectProps<T>) => {
  const filteredItems = filterTreeNodes(items, currentId);
  const flattenedItems = flattenTree(filteredItems);

  return (
    <div className={cn("grid gap-2", className)}>
      {label && <Label>{label}</Label>}
      <Select value={value || 'none'} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          {flattenedItems.map((item) => (
            <SelectItem key={item.id} value={item.id} className="relative">
              <span
                className="inline-block"
                style={{ paddingLeft: `${item.level * 16}px` }}
              >
                {item.level > 0 && (
                  <span 
                    className="absolute left-0 top-1/2 w-3 h-px bg-gray-300"
                    style={{ transform: 'translateY(-50%)' }}
                  />
                )}
                {item.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};