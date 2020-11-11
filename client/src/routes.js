import React, {
  Suspense,
  Fragment,
  lazy
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from './layouts/Dashboard';
import { Reports, Myself } from "./screens/Client";
import DocsLayout from './layouts/DocsLayout';
import MainLayout from './layouts/MainLayout';

import LoadingScreen from './components/LoadingScreen';
import AuthGuard from './components/AuthGuard';
import GuestGuard from './components/GuestGuard';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
    {routes.map((route, i) => {
      const Guard = route.guard || Fragment;
      const Layout = route.layout || Fragment;
      const Component = route.component;

      return (
        <Route
          key={i}
          path={route.path}
          exact={route.exact}
          render={(props) => (
            <Guard>
              <Layout>
                {route.routes
                  ? renderRoutes(route.routes)
                  : <Component {...props} />}
              </Layout>
            </Guard>
          )}
        />
      );
    })}
  </Switch>
</Suspense>
)

const routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('./screens/errors/NotFound'))
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: DashboardLayout,
    path: '/login_client',
    component: lazy(() => import('./screens/Auth/Login'))
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: DashboardLayout,
    path: '/dashboard',
    component: lazy(() => import('./screens/Client/Home/Home'))
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: DashboardLayout,
    path: '/contact',
    component: lazy(() => import('./screens/Contact'))
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: DashboardLayout,
    path: '/agreement',
    component: lazy(() => import('./screens/Agreement'))
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: DashboardLayout,
    path: '/myself',
    component: Myself
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: DashboardLayout,
    path: '/reports',
    component: Reports
  },
]

export default routes;