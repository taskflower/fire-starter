// src/pages/goals/routes.tsx

import { RouteObject } from "react-router-dom";
import DestinationsPage from "../destinations/DestinationsPage";

const pathRoutes: RouteObject[] = [
  { path: "relations", element: <DestinationsPage /> },
];

export default pathRoutes;
