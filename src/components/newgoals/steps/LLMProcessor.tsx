// src/components/newgoals/steps/LLMProcessor.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useGoalStore } from '@/store/useGoalStore';
import { StepConfig } from '../types';
import { processWithLLM, buildPromptWithContext } from '@/services/llm';

interface LLMProcessorProps {
  config: StepConfig;
  stepId: string;
}

export function LLMProcessor({ config, stepId }: LLMProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { stepsData, setStepData } = useGoalStore();
  const response = stepsData[stepId]?.llmResponse;

  const handleProcess = async () => {
    if (!config.llmPrompt) return;

    setIsProcessing(true);
    try {
      // Budujemy prompt z kontekstem
      const fullPrompt = buildPromptWithContext(config.llmPrompt, stepId);
      // Wywołujemy LLM
      const result = await processWithLLM(fullPrompt);
      setStepData(stepId, { llmResponse: result });
    } catch (error) {
      console.error('Error processing with LLM:', error);
      // Tutaj możesz dodać obsługę błędów, np. wyświetlenie komunikatu
    } finally {
      setIsProcessing(false);
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
            disabled={isProcessing}
            className="mt-4"
          >
            {isProcessing ? 'Przetwarzanie...' : 'Wygeneruj ponownie'}
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleProcess}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? 'Przetwarzanie...' : 'Generuj'}
        </Button>
      )}
    </div>
  );
}