import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage'));
const SettingsPage = lazy(() => import('@/pages/admin/SettingsPage'));

const adminRoutes: RouteObject[] = [
  { path: '/admin/dashboard', element: <DashboardPage /> },
  { path: '/admin/settings', element: <SettingsPage /> },
];

export default adminRoutes;
