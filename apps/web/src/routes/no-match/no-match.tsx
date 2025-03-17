import { Button } from "@/components/ui/button";

export const NoMatch = () => {
  return (
    <main className="grid min-h-screen w-full place-content-center">
      <div className="text-center">
        <p className="text-base font-semibold text-foreground">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button href="/">Go Back home</Button>

          <Button href="/" outline>
            Contact Suppoort
          </Button>
        </div>
      </div>
    </main>
  );
};
