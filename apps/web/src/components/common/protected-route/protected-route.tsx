import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Spinner } from "@/components/ui/spinner";
import { useMe } from "@/hooks/api/auth.hooks";

export const ProtectedRoute = () => {
  const { data, isLoading } = useMe();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
