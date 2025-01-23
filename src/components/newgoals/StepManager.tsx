// src/components/newgoals/StepManager.tsx
import { useEffect, useState } from 'react';
import { Step, GoalStore } from './types';
import { useGoalStore } from '@/store/useGoalStore';
import { StepContent } from './steps/StepContent';
import { StepNavigation } from './StepNavigation';
import { StepProgress } from './StepProgress';
import { StepDialog } from './edit/StepDialog';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface StepManagerProps {
 steps: Step[];
 onComplete?: () => void;
}

export function StepManager({ steps, onComplete }: StepManagerProps) {
 const [editingStep, setEditingStep] = useState<Step | null>(null);
 const [isDialogOpen, setIsDialogOpen] = useState(false);
 
 const { currentStepIndex, initializeSteps } = useGoalStore(
   (state): Pick<GoalStore, 'currentStepIndex' | 'initializeSteps'> => ({
     currentStepIndex: state.currentStepIndex,
     initializeSteps: state.initializeSteps
   })
 );

 useEffect(() => {
   initializeSteps(steps);
 }, [steps, initializeSteps]);

 const handleEditStep = (step: Step) => {
   setEditingStep(step);
   setIsDialogOpen(true);
 };

 const handleSaveStep = (updatedStep: Step) => {
   initializeSteps(steps.map(step => 
     step.id === updatedStep.id ? updatedStep : step
   ));
   setIsDialogOpen(false);
   setEditingStep(null);
 };

 if (steps.length === 0) {
   return <div>Brak dostępnych kroków</div>;
 }

 return (
   <div className="space-y-6">
     <div className="flex justify-between items-center">
       <StepProgress steps={steps} currentIndex={currentStepIndex} />
       <Button variant="outline" size="sm" onClick={() => handleEditStep(steps[currentStepIndex])}>
         <Edit className="h-4 w-4 mr-2" />
         Edytuj krok
       </Button>
     </div>
     <StepContent step={steps[currentStepIndex]} />
     <StepNavigation 
       canGoBack={currentStepIndex > 0}
       canGoForward={currentStepIndex < steps.length - 1}
       onComplete={onComplete}
     />
     <StepDialog 
       open={isDialogOpen}
       onOpenChange={setIsDialogOpen}
       step={editingStep}
       onSave={handleSaveStep}
     />
   </div>
 );
}