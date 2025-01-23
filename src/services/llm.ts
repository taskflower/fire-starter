/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/llm.ts
import { useGoalStore } from '@/store/useGoalStore';
import { Step } from '@/components/newgoals/types';

interface StepData {
  answers?: Record<string, any>;
  documentIds?: string[];
}

interface GoalStoreState {
  steps: Step[];
  stepsData: Record<string, StepData>;
}

export async function processWithLLM(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Example response for prompt: ${prompt}`);
    }, 1000);
  });
}

interface ContextData {
  previousAnswers: Array<{
    stepTitle: string;
    answers: Record<string, any>;
  } | null>;
  selectedDocuments: Array<{
    stepTitle: string;
    documentIds: string[];
  } | null>;
}

export function buildPromptWithContext(
  basePrompt: string,
  stepId: string
): string {
  const state = useGoalStore.getState() as GoalStoreState;
  const { stepsData, steps } = state;
  const contextData: ContextData = {
    previousAnswers: [],
    selectedDocuments: []
  };

  const currentStepIndex = steps.findIndex(s => s.id === stepId);
  const previousSteps = steps.slice(0, currentStepIndex);

  contextData.previousAnswers = previousSteps
    .map(step => {
      const stepData = stepsData[step.id];
      if (stepData?.answers) {
        return {
          stepTitle: step.title,
          answers: stepData.answers
        };
      }
      return null;
    });

  contextData.selectedDocuments = previousSteps
    .map(step => {
      const stepData = stepsData[step.id];
      if (stepData?.documentIds) {
        return {
          stepTitle: step.title,
          documentIds: stepData.documentIds
        };
      }
      return null;
    });

  return basePrompt.replace(/{(\w+)}/g, (match, key: keyof ContextData) => {
    return contextData[key] ? JSON.stringify(contextData[key], null, 2) : match;
  });
}