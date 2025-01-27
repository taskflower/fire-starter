// src/pages/admin/DashboardPage.tsx
import { LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import AdminOutletTemplate from "@/layouts/AdminOutletTemplate";

export default function DashboardPage() {
  const { templates, loading, error } = useGoalTemplates();

  if (loading) return <p className="text-muted-foreground">Loading templates...</p>;
  if (error) return <p className="text-destructive">{error}</p>;

  return (
    <AdminOutletTemplate
      title="Dashboard"
      description="Browse and edit templates, manage users, and configure additional system settings."
      icon={LayoutDashboard}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Goal Templates</h2>
          <Button asChild>
            <Link to="/admin/goals/new">New Template</Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates?.map((template) => (
            <Link key={template.id} to={`/admin/goals/${template.id}`}>
              <Card className="hover:bg-muted transition-colors">
                <CardHeader>
                  <CardTitle>{template.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {template.description || "No description available"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost">See Details</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AdminOutletTemplate>
  );
}