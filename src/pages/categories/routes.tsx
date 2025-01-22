// src/pages/categories/routes.tsx
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const CategoriesPage = lazy(() => import("./CategoriesPage"));

export const categoryRoutes: RouteObject[] = [
  { path: "categories", element: <CategoriesPage /> },
];
