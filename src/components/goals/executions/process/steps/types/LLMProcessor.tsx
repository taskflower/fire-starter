// src/components/goals/executions/process/steps/types/LLMProcessor.tsx
import { Button } from "@/components/ui/button";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { useGoalExecutionStore } from "@/store/useGoalExecutionStore";
import { buildPromptWithContext, processWithLLM } from "@/services/llm";
import { useDocuments } from "@/hooks/useDocuments";
import { StepConfig } from "@/types/goals";

interface LLMProcessorProps {
 config: StepConfig;
 stepId: string;
}

export function LLMProcessor({ config, stepId }: LLMProcessorProps) {
 const { isProcessingLLM, setIsProcessingLLM } = useGoalManagementStore();
 const { stepsData, setStepData } = useGoalExecutionStore();
 const { documents } = useDocuments();
 const response = stepsData[stepId]?.llmResponse;

 const handleProcess = async () => {
   setIsProcessingLLM(true);
   try {
     const fullPrompt = buildPromptWithContext(
       config.llmPrompt ? config.llmPrompt : "",
       stepId,
       documents
     );
     const result = await processWithLLM(fullPrompt);
     setStepData(stepId, { llmResponse: result });
   } catch (error) {
     console.error("Error processing with LLM:", error);
   } finally {
     setIsProcessingLLM(false);
   }
 };

 return (
   <div className="space-y-4">
     {response ? (
       <div className="bg-muted p-4 rounded-md">
         <p className="whitespace-pre-wrap">{response}</p>
         <Button
           variant="outline"
           onClick={handleProcess}
           disabled={isProcessingLLM}
           className="mt-4"
         >
           {isProcessingLLM ? "Przetwarzanie..." : "Wygeneruj ponownie"}
         </Button>
       </div>
     ) : (
       <Button
         onClick={handleProcess}
         disabled={isProcessingLLM}
         className="w-full"
       >
         {isProcessingLLM ? "Przetwarzanie..." : "Generuj"}
       </Button>
     )}
   </div>
 );
}