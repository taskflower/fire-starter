// src/pages/documents/routes.tsx
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const DocumentsPage = lazy(() => import("./DocumentsPage"));
const AddDocumentPage = lazy(() => import("./AddDocumentPage"));
const EditDocumentPage = lazy(() => import("./EditDocumentPage"));

export const documentRoutes: RouteObject[] = [
  { path: "documents", element: <DocumentsPage /> },
  { path: "documents/add", element: <AddDocumentPage /> },
  { path: "documents/edit/:id", element: <EditDocumentPage /> },
];