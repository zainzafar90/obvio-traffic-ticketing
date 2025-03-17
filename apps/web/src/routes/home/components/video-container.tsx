import { useCallback, useEffect, useRef } from "react";

import ReactPlayer from "react-player";

import { IEvent } from "@/types/interfaces/resources";
import { Card, CardContent } from "@/components/ui/card";

import { useVideoPlayerStore } from "../stores/video-player.store";
import { FrameTimeline, FrameTimelineSkeleton } from "./frame-timeline";
import { LicensePlateContainer } from "./license-plate-container";

export const VideoContainer = ({ event }: { event: IEvent }) => {
  const videoPlayerRef = useRef<ReactPlayer>(null);

  const { isPlaying, videoDuration, playVideo, pauseVideo, setVideoDuration } =
    useVideoPlayerStore();

  const handleFrameSelect = useCallback(
    (frameId: number) => {
      if (videoPlayerRef.current) {
        videoPlayerRef.current.seekTo(frameId);
      }
    },
    [videoPlayerRef]
  );

  useEffect(() => {
    if (videoPlayerRef.current) {
      setVideoDuration(videoPlayerRef.current.getDuration());
    }
  }, [videoPlayerRef.current]);

  return (
    <Card className="border-none shadow-none" key={event.id}>
      <CardContent className="space-y-3 p-4">
        {videoDuration ? (
          <div className="flex w-full items-center justify-between">
            <FrameTimeline
              duration={videoDuration}
              onFrameSelect={handleFrameSelect}
            />
          </div>
        ) : (
          <FrameTimelineSkeleton />
        )}

        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
          <ReactPlayer
            ref={videoPlayerRef}
            url={event.videoUrl}
            className="h-full w-full object-cover"
            autoPlay={true}
            muted
            controls
            playsinline
            width="100%"
            height="100%"
            playing={isPlaying}
            onPlay={() => {
              playVideo();
            }}
            onPause={() => {
              pauseVideo();
            }}
            onProgress={() => {
              if (videoPlayerRef.current) {
                setVideoDuration(videoPlayerRef.current.getDuration());
              }
            }}
          />

          <LicensePlateContainer event={event} />
        </div>
      </CardContent>
    </Card>
  );
};
