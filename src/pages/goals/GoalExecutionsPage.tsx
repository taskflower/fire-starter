import { Goal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGoalExecutionStore } from "@/store/useGoalExecutionStore";
import { useGoalExecution } from "@/hooks/useGoalExecution";
import AdminOutletTemplate from "@/layouts/AdminOutletTemplate";
import { useEffect } from "react";
import { ExecutionsTable } from "@/components/goals/executions/list/ExecutionsTable";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { GoalTabs } from "@/components/goals/GoalTabs";

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
      <GoalTabs activeTab="executions" />

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
    </AdminOutletTemplate>
  );
}