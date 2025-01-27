// src/components/goals/executions/process/steps/types/ServicesProcessor.tsx
import { Button } from "@/components/ui/button";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { useGoalExecutionStore } from "@/store/useGoalExecutionStore";
import { StepConfig } from "@/types/goals";

interface ServicesProcessorProps {
  config: StepConfig;
  stepId: string;
}

export function ServicesProcessor({ config, stepId }: ServicesProcessorProps) {
  const { isProcessingService, setIsProcessingService } = useGoalManagementStore();
  const { stepsData, setStepData } = useGoalExecutionStore();
  const response = stepsData[stepId]?.serviceResponse;

  const handleProcess = async () => {
    setIsProcessingService(true);
    try {
      const result = await processWithService(
        config.serviceEndpoint || "",
        config.serviceName || "",
        stepId,
        config.selectedSteps || []
      );
      setStepData(stepId, { serviceResponse: result });
    } catch (error) {
      console.error("Error processing with service:", error);
    } finally {
      setIsProcessingService(false);
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
            disabled={isProcessingService}
            className="mt-4"
          >
            {isProcessingService ? "Przetwarzanie..." : "Wykonaj ponownie"}
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleProcess}
          disabled={isProcessingService}
          className="w-full"
        >
          {isProcessingService ? "Przetwarzanie..." : "Wykonaj"}
        </Button>
      )}
    </div>
  );
}
