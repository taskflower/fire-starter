// src/components/goals/templates/edit/forms/ServicesForm.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGoalManagementStore } from "@/store/useGoalManagementStore";
import { Service, StepConfig } from "@/types/goals";
import { SourceStepsSelect } from "./SourceStepsSelect";

export function ServicesForm() {
  const { stepFormData, setStepFormData } = useGoalManagementStore();

  const defaultConfig: StepConfig = {
    documentRequirements: [],
    questions: [],
    llmPrompt: "",
    services: [],
    insert: [],
    validationRules: {},
    includeSteps: [],
  };

  // Mergujemy stepFormData.config z defaultConfig
  const config: StepConfig = { ...defaultConfig, ...stepFormData.config };
  const services = config.services;

  const handleAddService = () => {
    if (config.serviceName && config.serviceEndpoint) {
      const newService: Service = {
        name: config.serviceName,
        endpoint: config.serviceEndpoint,
        sourceStepIds: config.selectedSteps || [],
      };

      setStepFormData({
        config: {
          ...config,
          services: [...services, newService],
          serviceName: "",
          serviceEndpoint: "",
          selectedSteps: [],
        },
      });
    }
  };

  const handleSelectedStepsChange = (selected: string[]) => {
    setStepFormData({
      config: {
        ...config,
        selectedSteps: selected,
        // 'services' pozostaje niezmienione
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Nazwa usługi</Label>
        <Input
          value={config.serviceName}
          onChange={(e) =>
            setStepFormData({
              config: { ...config, serviceName: e.target.value },
            })
          }
          placeholder="Wprowadź nazwę usługi..."
        />
      </div>

      <div className="space-y-2">
        <Label>Endpoint</Label>
        <Input
          value={config.serviceEndpoint}
          onChange={(e) =>
            setStepFormData({
              config: { ...config, serviceEndpoint: e.target.value },
            })
          }
          placeholder="Wprowadź endpoint usługi..."
        />
      </div>

      <SourceStepsSelect
        selectedSteps={config.selectedSteps || []}
        onChange={handleSelectedStepsChange}
      />

      <Button
        onClick={handleAddService}
        className="w-full"
        disabled={!config.serviceName || !config.serviceEndpoint}
      >
        Dodaj usługę
      </Button>
    </div>
  );
}
