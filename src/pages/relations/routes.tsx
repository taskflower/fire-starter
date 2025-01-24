// src/pages/goals/routes.tsx

import { RouteObject } from "react-router-dom";
import DocumentCategoryTreePage from "../relations/DocumentCategoryTreePage";



const pathRoutes: RouteObject[] = [
  { path: "relations", element: <DocumentCategoryTreePage /> },
];

export default pathRoutes;