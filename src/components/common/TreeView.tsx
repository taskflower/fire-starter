// src/components/common/TreeView.tsx
import React from 'react';
import { ChevronRight, File } from 'lucide-react';
import { cn } from '@/services/utils';
import { ProcessedTreeNode } from '@/utils/treeUtils';

export interface TreeViewProps {
    nodes: ProcessedTreeNode[];
    renderActions?: (node: ProcessedTreeNode) => React.ReactNode;
    renderIcon?: (node: ProcessedTreeNode) => React.ReactNode;
    className?: string;
    itemClassName?: string;
    showIcons?: boolean;
    indentSize?: number;
  }

export const TreeView: React.FC<TreeViewProps> = ({
  nodes,
  renderActions,
  renderIcon,
  className,
  itemClassName,
  showIcons = true,
  indentSize = 2,
}) => {
  return (
    <div className={cn("w-full", className)}>
      {nodes.map((node) => (
        <div key={node.id} className="w-full">
          <div 
            className={cn(
              "flex items-center w-full min-h-[3rem] px-4",
              "border-b last:border-b-0",
              "hover:bg-muted/50 transition-colors",
              "text-sm",
              itemClassName
            )}
            style={{ paddingLeft: `${node.level * indentSize + 1}rem` }}
          >
            <div className="flex-1 flex items-center gap-3">
              {showIcons && (
                renderIcon ? renderIcon(node) : (
                  node.children?.length > 0 ? (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <File className="h-4 w-4 text-muted-foreground" />
                  )
                )
              )}
              <span>{node.name}</span>
            </div>
            {renderActions && (
              <div className="flex gap-1">
                {renderActions(node)}
              </div>
            )}
          </div>
          {node.children?.length > 0 && (
            <TreeView 
              nodes={node.children}
              renderActions={renderActions}
              renderIcon={renderIcon}
              itemClassName={itemClassName}
              showIcons={showIcons}
              indentSize={indentSize}
            />
          )}
        </div>
      ))}
    </div>
  );
};