// src/components/goals/GoalTabs.tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

interface GoalTabsProps {
  activeTab: "templates" | "executions";
}

export function GoalTabs({ activeTab }: GoalTabsProps) {
  const navigate = useNavigate();

  return (
    <Tabs defaultValue={activeTab}>
      <TabsList className="mb-6">
        <TabsTrigger 
          value="templates"
          onClick={() => navigate("/admin/goals/templates")}
        >
          Goal Templates
        </TabsTrigger>
        <TabsTrigger 
          value="executions"
          onClick={() => navigate("/admin/goals/executions")}
        >
          Active Processes
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}