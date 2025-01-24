// src/services/services.ts
import { useGoalStore } from "@/store/useGoalStore";

export async function processWithService(
  endpoint: string,
  serviceName: string,
  stepId: string,
  selectedSteps: string[]
) {
  const { stepsData } = useGoalStore.getState();

  const stepsContent = selectedSteps.map((stepId) => ({
    stepId,
    content:
      stepsData[stepId]?.llmResponse ||
      stepsData[stepId]?.answers ||
      stepsData[stepId]?.documentIds,
  }));

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceName,
        stepsContent,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error processing with service:", error);
    throw error;
  }
}
