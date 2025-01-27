// src/routes/goalRoutes.ts
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const GoalTemplatesPage = lazy(() => import("@/pages/goals/GoalTemplatesPage"));
const GoalExecutionsPage = lazy(() => import("@/pages/goals/GoalExecutionsPage"));
const GoalDetailsPage = lazy(() => import("@/pages/goals/GoalDetailsPage"));
const EditGoalsPage = lazy(() => import("@/pages/goals/EditGoalsPage"));
const AddGoalPage = lazy(() => import("@/pages/goals/AddGoalPage"));

const pathRoutes: RouteObject[] = [
  { path: "goals/templates", element: <GoalTemplatesPage /> },
  { path: "goals/executions", element: <GoalExecutionsPage /> },
  { path: "goals/:id", element: <GoalDetailsPage /> },
  { path: "goals/:id/edit", element: <EditGoalsPage /> },
  { path: "goals/new", element: <AddGoalPage /> },
  // Redirect from /goals to /goals/templates
  { path: "goals", element: <GoalTemplatesPage /> },
];

export default pathRoutes;