import { Goal, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplatesTable } from "@/components/goals/templates/list/TemplatesTable";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { useGoalExecutionStore } from "@/store/useGoalExecutionStore";
import { useGoalExecution } from "@/hooks/useGoalExecution";
import AdminOutletTemplate from "@/layouts/AdminOutletTemplate";
import { useEffect } from "react";
import { ExecutionsTable } from "@/components/goals/executions/list/ExecutionsTable";

export default function GoalsListPage() {
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
      actions={
        <Button onClick={() => navigate("/admin/goals/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Goal
        </Button>
      }
    >
      <Tabs defaultValue="templates">
        <TabsList>
          <TabsTrigger value="templates">Goal Templates</TabsTrigger>
          <TabsTrigger value="executions">Active Processes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates">
          <TemplatesTable templates={templates} onSelect={(id) => navigate(`/admin/goals/${id}`)} />
        </TabsContent>
        
        <TabsContent value="executions">
          <ExecutionsTable 
            templates={templates}
            executions={executions}
            onResumeExecution={async (id) => {
              await resumeExecution(id);
              const execution = executions.find(e => e.id === id);
              if (execution) navigate(`/admin/goals/${execution.templateId}`);
            }}
          />
        </TabsContent>
      </Tabs>
    </AdminOutletTemplate>
  );
}