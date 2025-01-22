// src/store/useStepAnswers.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AnswersState {
  answers: Record<string, Record<string, string | string[] | number>>;
  setAnswer: (stepId: string, questionId: string, answer: string | string[] | number) => void;
  getStepAnswers: (stepId: string) => Record<string, string | string[] | number>;
  clearAnswers: (stepId: string) => void;
}

export const useStepAnswers = create<AnswersState>()(
  persist(
    (set, get) => ({
      answers: {},
      setAnswer: (stepId, questionId, answer) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [stepId]: {
              ...state.answers[stepId],
              [questionId]: answer,
            },
          },
        })),
      getStepAnswers: (stepId) => get().answers[stepId] || {},
      clearAnswers: (stepId) =>
        set((state) => {
          const { [stepId]: _, ...rest } = state.answers;
          return { answers: rest };
        }),
    }),
    {
      name: 'step-answers',
    }
  )
)