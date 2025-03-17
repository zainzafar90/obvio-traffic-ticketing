import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRandomEvent } from "@/hooks/api/event.hooks";

import { BottomControlBar } from "./components/bottom-control-bar";
import { VideoContainer } from "./components/video-container";
import { useEventStore } from "./stores/event.store";
import { useLicensePlateStore } from "./stores/license-plate.store";
import { useVideoPlayerStore } from "./stores/video-player.store";

export const Home = () => {
  const { data: event, isLoading, isFetching, refetch } = useRandomEvent();

  const resetEventStore = useEventStore((s) => s.resetStore);
  const resetVideoPlayerStore = useVideoPlayerStore((s) => s.resetStore);
  const resetLicensePlateStore = useLicensePlateStore((s) => s.resetStore);

  const onFetchNextEvent = () => {
    refetch();
    resetEventStore();
    resetVideoPlayerStore();
    resetLicensePlateStore();
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="flex-1 text-sm text-muted-foreground">
          No more events, please wait for new events to be generated.
        </div>
        <Button onClick={() => refetch()} disabled={isFetching}>
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <VideoContainer event={event} />
      <BottomControlBar event={event} onFetchNextEvent={onFetchNextEvent} />
    </div>
  );
};
