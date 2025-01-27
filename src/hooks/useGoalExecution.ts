import { FirestoreService } from "@/services/firestoreService";
import { useGoalExecutionStore } from "@/store/useGoalExecutionStore";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { GoalExecution, StepData } from "@/types/goals";
import { WithFieldValue } from "firebase/firestore";

export const useGoalExecution = () => {
  const executionService = new FirestoreService<GoalExecution>("goal-executions");
  
  const { 
    setStepData, 
    setExecutionId, 
    loadExecutions,
    initializeSteps
  } = useGoalExecutionStore();

  const { steps } = useGoalManagementStore();

  const startExecution = async (templateId: string): Promise<string> => {
    const now = new Date();
    const execution: WithFieldValue<GoalExecution> = {
      id: '',  // Will be set by Firestore
      templateId,
      stepsData: {},
      currentStepIndex: 0,
      startedAt: now,
      status: 'in_progress',
      createdAt: now,
      updatedAt: now
    };
    const id = await executionService.add(execution);
    initializeSteps(steps);
    setExecutionId(id);
    return id;
  };

  const updateExecution = async (id: string, stepsData: Record<string, StepData>, currentStepIndex: number) => {
    await executionService.update(id, {
      stepsData,
      currentStepIndex,
      updatedAt: new Date()
    });
    await loadExecutions();
  };

  const completeExecution = async (id: string) => {
    await executionService.update(id, {
      completedAt: new Date(),
      status: 'completed',
      updatedAt: new Date()
    });
    await loadExecutions();
  };

  const loadExecution = async (id: string) => {
    const execution = await executionService.getById(id);
    if (execution) {
      Object.entries(execution.stepsData).forEach(([stepId, data]) => {
        setStepData(stepId, data);
      });
      initializeSteps(steps);
      setExecutionId(id);
    }
    return execution;
  };

  const resumeExecution = async (executionId: string) => {
    const execution = await loadExecution(executionId);
    if (execution) {
      return execution;
    }
    return null;
  };

  const getExecutionHistory = async (templateId: string) => {
    const executions = await executionService.getAll();
    return executions.filter(e => e.templateId === templateId);
  };

  return { 
    startExecution, 
    updateExecution, 
    completeExecution, 
    loadExecution,
    resumeExecution,
    getExecutionHistory
  };
};