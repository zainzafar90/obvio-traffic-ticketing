import * as React from "react";

import * as Popover from "@radix-ui/react-popover";
import * as Portal from "@radix-ui/react-portal";

import { cn } from "@/lib/utils";

import { Kbd } from "./kbd";

type CommandBarProps = React.PropsWithChildren<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  disableAutoFocus?: boolean;
}>;

const Root = ({
  open = false,
  onOpenChange,
  defaultOpen = false,
  disableAutoFocus = true,
  children,
}: CommandBarProps) => {
  return (
    <Popover.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
    >
      <Portal.Root>
        <Popover.Anchor
          className={cn("fixed bottom-8 left-1/2 h-px w-px -translate-x-1/2")}
        />
      </Portal.Root>
      <Popover.Portal>
        <Popover.Content
          side="top"
          sideOffset={0}
          onOpenAutoFocus={(e) => {
            if (disableAutoFocus) {
              e.preventDefault();
            }
          }}
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            "bg-popover-foreground text-popover shadow-lg",
            "rounded-full border dark:border-zinc-200"
          )}
        >
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
Root.displayName = "CommandBar";

const Value = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("px-3 py-2.5 text-xs text-background/75", className)}
      {...props}
    />
  );
});
Value.displayName = "CommandBar.Value";

const Bar = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center overflow-hidden rounded-full bg-foreground px-1",
        className
      )}
      {...props}
    />
  );
});
Bar.displayName = "CommandBar.Bar";

const Seperator = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentPropsWithoutRef<"div">, "children">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("h-10 w-px bg-border/20", className)}
      {...props}
    />
  );
});
Seperator.displayName = "CommandBar.Seperator";

interface CommandProps
  extends Omit<
    React.ComponentPropsWithoutRef<"button">,
    "children" | "onClick"
  > {
  action: () => void | Promise<void>;
  label: string;
  shortcut: string;
}

const Command = React.forwardRef<HTMLButtonElement, CommandProps>(
  (
    { className, type = "button", label, action, shortcut, disabled, ...props },
    ref
  ) => {
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === shortcut) {
          event.preventDefault();
          event.stopPropagation();
          action();
        }
      };

      if (!disabled) {
        document.addEventListener("keydown", handleKeyDown);
      }

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [action, shortcut, disabled]);

    return (
      <button
        ref={ref}
        className={cn(
          "bg-foreground text-background",
          "hover:bg-background/15 hover:text-background",
          "focus:bg-background/15 focus:text-background",
          "flex items-center gap-x-2 px-3 py-2.5 outline-none",
          "text-xs font-normal",
          "last-of-type:-mr-1 last-of-type:pr-4",
          className
        )}
        type={type}
        onClick={action}
        {...props}
      >
        <span>{label}</span>
        <Kbd>{shortcut.toUpperCase()}</Kbd>
      </button>
    );
  }
);
Command.displayName = "CommandBar.Command";

const CommandBar = Object.assign(Root, {
  Command,
  Value,
  Bar,
  Seperator,
});

export { CommandBar };
