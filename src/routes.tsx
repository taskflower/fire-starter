import { RouteObject } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { RequireAuth } from "@/components/RequireAuth";
import { documentRoutes } from "./pages/documents/routes";
import { categoryRoutes } from "./pages/categories/routes";
import publicRoutes from "@/pages/public/routes";
import adminRoutes from "@/pages/admin/routes";
import wizardRoutes from "@/pages/wizards/routes";
import goalsRoutes from "@/pages/goals/routes";


export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [...publicRoutes], // Trasy publiczne
  },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      ...adminRoutes, // Trasy admina
      ...documentRoutes, // Trasy dokumentów w układzie admina
      ...wizardRoutes,
      ...categoryRoutes,
      ...goalsRoutes
    ],
  },
];
