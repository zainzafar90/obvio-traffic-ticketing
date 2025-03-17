import { RouterProvider } from "@/providers/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { queryClient } from "@/lib/query-client";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ThemeProvider } from "./providers/theme/theme-provider";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider storageKey="ui-theme" defaultTheme="light">
        <TooltipProvider>
          <RouterProvider />
        </TooltipProvider>
        <Toaster richColors position="top-center" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
