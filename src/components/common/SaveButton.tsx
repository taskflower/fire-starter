// src/components/common/SaveButton.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

interface SaveButtonProps {
  onSave: () => Promise<void>;
  isValid?: boolean;
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const SaveButton = ({ 
  onSave, 
  isValid = true, 
  className = "", 
  icon = <Save className="h-4 w-4 mr-2" />,
  children = "Save"
}: SaveButtonProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!isValid) return;
    
    try {
      setIsSaving(true);
      await onSave();
    } catch (error) {
      console.error('Error while saving:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button 
      onClick={handleSave} 
      disabled={isSaving || !isValid}
      className={`min-w-[100px] ${className}`}
    >
      {isSaving ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </Button>
  );
};

export default SaveButton;