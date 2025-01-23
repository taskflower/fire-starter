// src/pages/goals/routes.tsx
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import AddGoalPage from "./AddGoalPage";

const NewGoalsPage = lazy(() => import("@/pages/goals/NewGoalsPage"));
const EditGoalsPage = lazy(() => import("@/pages/goals/EditGoalsPage"));

const pathRoutes: RouteObject[] = [
  { path: "goals", element: <NewGoalsPage /> },
  { path: "goal/:id/edit", element: <EditGoalsPage /> },
  { path: "goal/new", element: <AddGoalPage /> },
];

export default pathRoutes;