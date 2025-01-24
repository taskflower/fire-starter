// src/pages/goals/routes.tsx
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const GoalsPage = lazy(() => import("@/pages/goals/GoalsPage"));
const EditGoalsPage = lazy(() => import("@/pages/goals/EditGoalsPage"));
const AddGoalPage = lazy(() => import("@/pages/goals/AddGoalPage"));

const pathRoutes: RouteObject[] = [
  { path: "goals", element: <GoalsPage /> },
  { path: "goals/:id", element: <GoalsPage /> },
  { path: "goal/:id/edit", element: <EditGoalsPage /> },
  { path: "goal/new", element: <AddGoalPage /> },
];

export default pathRoutes;