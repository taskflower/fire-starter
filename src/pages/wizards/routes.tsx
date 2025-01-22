// src/pages/wizards/routes.tsx
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
const WizardsPage = lazy(() => import("@/pages/wizards/WizardsPage")); // poprawiona ścieżka
const wizardRoutes: RouteObject[] = [
  { path: "wizards", element: <WizardsPage /> },
];
export default wizardRoutes;