// src/layouts/AdminSidebar.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AdminSidebar = () => {
  return (
    <ScrollArea className="h-screen w-64 border-r bg-background">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">RAG Panel</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/admin/settings">Settings</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/admin/documents">Documents</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/admin/wizards">Wizards</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/admin/path">Goals</Link>
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
