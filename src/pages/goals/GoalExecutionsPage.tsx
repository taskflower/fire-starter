// src/pages/goals/GoalExecutionsPage.tsx
import { Goal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGoalExecutionStore } from "@/store/useGoalExecutionStore";
import { useGoalExecution } from "@/hooks/useGoalExecution";
import AdminOutletTemplate from "@/layouts/AdminOutletTemplate";
import { useEffect } from "react";
import { ExecutionsTable } from "@/components/goals/executions/list/ExecutionsTable";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";

export default function GoalExecutionsPage() {
  const navigate = useNavigate();
  const { templates } = useGoalTemplates();
  const { executions, loadExecutions } = useGoalExecutionStore();
  const { resumeExecution } = useGoalExecution();

  useEffect(() => {
    loadExecutions();
  }, []);

  return (
    <AdminOutletTemplate
      title="Goals and Processes"
      icon={Goal}
      description="Manage goal templates and track process progress"
    >
      <Tabs defaultValue="executions">
        <TabsList className="mb-6">
          <TabsTrigger 
            value="templates"
            onClick={() => navigate("/admin/goals/templates")}
          >
            Goal Templates
          </TabsTrigger>
          <TabsTrigger 
            value="executions" 
            className="selected"
            onClick={() => navigate("/admin/goals/executions")}
          >
            Active Processes
          </TabsTrigger>
        </TabsList>

        <ExecutionsTable 
          templates={templates}
          executions={executions}
          onResumeExecution={async (id) => {
            await resumeExecution(id);
            const execution = executions.find(e => e.id === id);
            if (execution) {
              navigate(`/admin/goals/${execution.templateId}?execution=${id}`);
            }
          }}
        />
      </Tabs>
    </AdminOutletTemplate>
  );
}