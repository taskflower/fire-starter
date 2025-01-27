import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const GoalsListPage = lazy(() => import("@/pages/goals/GoalsListPage"));
const GoalDetailsPage = lazy(() => import("@/pages/goals/GoalDetailsPage"));
const EditGoalsPage = lazy(() => import("@/pages/goals/EditGoalsPage"));
const AddGoalPage = lazy(() => import("@/pages/goals/AddGoalPage"));

const pathRoutes: RouteObject[] = [
  { path: "goals", element: <GoalsListPage /> },
  { path: "goals/:id", element: <GoalDetailsPage /> },
  { path: "goals/:id/edit", element: <EditGoalsPage /> },
  { path: "goals/new", element: <AddGoalPage /> },
];

export default pathRoutes;