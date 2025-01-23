import { useGoalStore } from '@/store/useGoalStore';
import { DocumentWithId } from '@/types/types';

export function buildPromptWithContext(
  prompt: string, 
  currentStepId: string,
  documents: DocumentWithId[]
): string {
  const { steps, stepsData } = useGoalStore.getState();
  const currentStep = steps.find(s => s.id === currentStepId);
  const messages: string[] = [];

  if (!currentStep?.config.includeSteps) {
    return prompt;
  }

  currentStep.config.includeSteps.forEach(stepId => {
    const step = steps.find(s => s.id === stepId);
    const data = stepsData[stepId];

    if (!step || !data) return;

    if (step.description) {
      messages.push(step.description);
    }

    if (step.type === 'questions' && data.answers) {
      step.config.questions?.forEach(q => {
        const answer = data.answers?.[q.id];
        if (answer) {
          messages.push(`${q.question}\nOdpowiedź: ${answer}`);
        }
      });
    }

    if (step.type === 'document_selection' && data.documentIds) {
      data.documentIds.forEach(docId => {
        const doc = documents.find(d => d.id === docId);
        if (doc?.content) {
          messages.push(doc.content);
        }
      });
    }

    if (step.type === 'llm_processing' && data.llmResponse) {
      messages.push(data.llmResponse);
    }
  });

  messages.push(prompt);

  return messages.join('\n\n');
}

export async function processWithLLM(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/llm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error('LLM processing failed');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('LLM processing error:', error);
    throw error;
  }
}