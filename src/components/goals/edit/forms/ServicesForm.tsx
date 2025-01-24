// ServicesForm.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGoalStore } from "@/store/useGoalStore";
import { Service } from "@/types/goals";

export function ServicesForm() {
  const { stepFormData, setStepFormData, steps } = useGoalStore();
  const config = stepFormData.config || {};
  const services = config.services || [];

  const handleAddService = () => {
    if (config.serviceName && config.serviceEndpoint) {
      const newService: Service = {
        name: config.serviceName,
        endpoint: config.serviceEndpoint,
        sourceStepIds: config.selectedSteps || []
      };

      setStepFormData({
        config: {
          ...config,
          services: [...services, newService],
          serviceName: "",
          serviceEndpoint: "",
          selectedSteps: []
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Nazwa usługi</Label>
        <Input
          value={config.serviceName || ""}
          onChange={(e) =>
            setStepFormData({
              config: { ...config, serviceName: e.target.value }
            })
          }
          placeholder="Wprowadź nazwę usługi..."
        />
      </div>

      <div className="space-y-2">
        <Label>Endpoint</Label>
        <Input
          value={config.serviceEndpoint || ""}
          onChange={(e) =>
            setStepFormData({
              config: { ...config, serviceEndpoint: e.target.value }
            })
          }
          placeholder="Wprowadź endpoint usługi..."
        />
      </div>

      <div className="space-y-2">
        <Label>Wybierz kroki źródłowe</Label>
        <div className="space-y-2">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={(config.selectedSteps || []).includes(step.id)}
                onChange={(e) => {
                  const selectedSteps = config.selectedSteps || [];
                  const newSelectedSteps = e.target.checked
                    ? [...selectedSteps, step.id]
                    : selectedSteps.filter((id) => id !== step.id);
                  setStepFormData({
                    config: { ...config, selectedSteps: newSelectedSteps }
                  });
                }}
              />
              <span>{step.title}</span>
            </div>
          ))}
        </div>
      </div>

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