import { RouteObject } from "react-router-dom";

import { Home } from "@/routes/home/home";
import { ErrorBoundary } from "@/components/common/error-boundary/error-boundary";
import { ProtectedRoute } from "@/components/common/protected-route";
import { MainLayout } from "@/components/layout/main-layout";

export const RouteMap: RouteObject[] = [
  {
    path: "/login",
    lazy: () => import("../../routes/login"),
  },

  {
    path: "*",
    lazy: () => import("../../routes/no-match"),
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
        ],
      },
    ],
  },
];
