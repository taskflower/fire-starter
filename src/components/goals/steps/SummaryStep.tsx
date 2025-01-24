// src/components/goals/steps/SummaryStep.tsx
import { useGoalStore } from '@/store/useGoalStore';
import { Card, CardContent } from '@/components/ui/card';

export function SummaryStep() {
  const { steps, stepsData } = useGoalStore();

  return (
    <Card>
      <CardContent className="space-y-6 py-6">
        <h3 className="text-lg font-semibold">Goal Summary</h3>
        {steps.map((step, index) => (
          <div key={step.id} className="space-y-2">
            <h4 className="font-medium">{index + 1}. {step.title}</h4>
            <div className="pl-4">
              {stepsData[step.id]?.answers && (
                <pre className="text-sm whitespace-pre-wrap">
                  {JSON.stringify(stepsData[step.id]?.answers, null, 2)}
                </pre>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}