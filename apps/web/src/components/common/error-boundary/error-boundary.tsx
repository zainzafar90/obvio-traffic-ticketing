import { Navigate, useLocation, useRouteError } from "react-router-dom";

import { isAxiosError } from "axios";
import { Info } from "lucide-react";

import { Heading, Subheading } from "@/components/ui/heading";

// TODO: Need to allow wrapping <Outlet> with ErrorBoundary for more granular error handling.
export const ErrorBoundary = () => {
  const error = useRouteError();
  const location = useLocation();

  let code: number | null = null;

  if ((error as any)?.code === 401) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAxiosError(error)) {
    if (error.status === 401) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    code = error.status ?? null;
  }

  let title: string;
  let message: string;

  switch (code) {
    case 400:
      title = "Bad request";
      message = "The request was invalid.";
      break;
    case 404:
      title = "Not found";
      message = "The page you are looking for does not exist.";
      break;
    case 500:
      title = "Internal server error";
      message = "An error occurred on the server.";
      break;
    default:
      title = "An error occurred";
      message = "An error occurred while rendering this page.";
      break;
  }

  return (
    <div className="flex size-full min-h-screen items-center justify-center">
      <div className="text-ui-fg-subtle flex flex-col items-center gap-y-2">
        <Info />
        <Heading>{title}</Heading>
        <Subheading>{message}</Subheading>
      </div>
    </div>
  );
};
