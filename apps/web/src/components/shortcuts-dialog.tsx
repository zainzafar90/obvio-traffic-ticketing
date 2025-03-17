import { ReactNode, useState } from "react";

import { Command, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";

const shortcutCategories = [
  {
    name: "Video Controls",
    shortcuts: [
      { action: "Play/Pause video", keys: ["Space"] },
      { action: "Previous frame", keys: ["←"] },
      { action: "Next frame", keys: ["→"] },
    ],
  },
  {
    name: "Event Actions",
    shortcuts: [
      { action: "Accept event", keys: ["A"] },
      { action: "Reject event", keys: ["R"] },
      { action: "Toggle license plate details", keys: ["D"] },
      { action: "Reject: False positive", keys: ["F"] },
      { action: "Reject: Main camera issue", keys: ["C"] },
      { action: "Reject: License plate issue", keys: ["L"] },
      { action: "Reject: DMV information issue", keys: ["D"] },
    ],
  },
];

interface ShortcutsDialogProps {
  trigger?: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ShortcutsDialog({
  trigger,
  isOpen,
  onOpenChange,
}: ShortcutsDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isControlled = isOpen !== undefined && onOpenChange !== undefined;
  const open = isControlled ? isOpen : internalOpen;
  const setOpen = isControlled
    ? (newOpen: boolean) => onOpenChange(newOpen)
    : setInternalOpen;

  // Filter shortcuts based on search query
  const filteredCategories = searchQuery
    ? shortcutCategories
        .map((category) => ({
          ...category,
          shortcuts: category.shortcuts.filter((shortcut) =>
            shortcut.action.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((category) => category.shortcuts.length > 0)
    : shortcutCategories;

  const defaultTrigger = (
    <Button outline className="gap-1" onClick={() => setOpen(true)}>
      <Command className="h-4 w-4" />
      Shortcuts
    </Button>
  );

  const triggerElement = trigger ? (
    <div onClick={() => setOpen(true)}>{trigger}</div>
  ) : (
    defaultTrigger
  );

  return (
    <>
      {!isControlled && triggerElement}
      <Dialog open={open} onClose={() => setOpen(false)} size="xl">
        <DialogTitle>Keyboard Shortcuts</DialogTitle>
        <DialogDescription>
          Use these keyboard shortcuts to quickly navigate and control the
          application.
        </DialogDescription>
        <DialogBody>
          <div className="relative mt-2">
            <Input
              type="search"
              placeholder="Search shortcuts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1">
            {filteredCategories.map((category) => (
              <div key={category.name} className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-foreground">
                  {category.name}
                </h3>
                <div className="space-y-2">
                  {category.shortcuts.map((shortcut) => (
                    <div
                      key={shortcut.action}
                      className="flex items-center justify-between rounded-md border border-border px-3 py-2"
                    >
                      <span className="text-sm">{shortcut.action}</span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, index) => (
                          <span
                            key={index}
                            className="text-md flex items-center rounded-md bg-foreground text-background"
                          >
                            <Kbd>{key}</Kbd>
                            {index < shortcut.keys.length - 1 && (
                              <span className="mx-0.5 text-muted-foreground">
                                +
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {filteredCategories.length === 0 && (
              <div className="flex h-32 items-center justify-center text-muted-foreground">
                No shortcuts found for "{searchQuery}"
              </div>
            )}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
