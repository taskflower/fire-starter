// src/pages/admin/DashboardPage.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useGoalTemplates } from "@/hooks/useGoalTemplates";
import { Link } from "react-router-dom"; // We are importing Link

export default function DashboardPage() {
  const { templates, loading, error } = useGoalTemplates();

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading templates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Admin Panel</CardTitle>
          <CardDescription className="text-gray-700">
            This is the place where you can manage the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-black">
            Browse and edit templates, manage users, and configure additional system settings.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black">Goal Templates</h2>
        <Link to="/path/templates/new">
          <button className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-colors duration-200">
            New Template
          </button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {templates?.map((template) => (
          <Link key={template.id} to={`/path/templates/${template.id}`}>
            <Card className="bg-white border-gray-300 hover:bg-gray-50 transition-colors duration-200">
              <CardHeader>
                <CardTitle className="text-black">{template.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {template.description
                    ? template.description
                    : "No additional description..."}
                </p>
              </CardContent>
              <CardFooter>
                <button className="text-black hover:underline">See Details</button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
