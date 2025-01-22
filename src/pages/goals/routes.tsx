// src/pages/wizards/routes.tsx
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
const PathPage = lazy(() => import("@/pages/goals/PathPage")); // poprawiona ścieżka
const wizardRoutes: RouteObject[] = [
  { path: "path", element: <PathPage /> },
];
export default wizardRoutes;