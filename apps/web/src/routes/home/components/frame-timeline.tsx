import { useEffect, useRef, useState } from "react";

import { useHotkeys } from "react-hotkeys-hook";

interface FrameSelectorProps {
  duration: number;
  onFrameSelect: (frameId: number) => void;
}

export const FrameTimeline = ({
  duration,
  onFrameSelect,
}: FrameSelectorProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [frames, setFrames] = useState(generateFrames(duration));
  const [selectedFrame, setSelectedFrame] = useState(0);

  useHotkeys("left", () => handlePrevFrame());
  useHotkeys("right", () => handleNextFrame());

  const handlePrevFrame = () => {
    setSelectedFrame((prev) => Math.max(0, prev - 1));
  };

  const handleNextFrame = () => {
    setSelectedFrame((prev) => Math.min(frames.length - 1, prev + 1));
  };

  useEffect(() => {
    setFrames(generateFrames(duration));
  }, [duration]);

  useEffect(() => {
    setSelectedFrame(selectedFrame);
  }, [selectedFrame]);

  useEffect(() => {
    if (scrollContainerRef.current && selectedFrame !== null) {
      const container = scrollContainerRef.current;
      const selectedElement = container.querySelector(
        `[data-frame-id="${selectedFrame}"]`
      );

      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }

    onFrameSelect(selectedFrame);
  }, [selectedFrame, onFrameSelect]);

  return (
    <div className="space-y-1">
      <div className="relative" aria-label="Frame selector" role="listbox">
        <div
          tabIndex={-1}
          ref={scrollContainerRef}
          className="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-gray-100 dark:scrollbar-track-gray-900 flex space-x-2 overflow-x-auto p-1"
          style={{ scrollBehavior: "smooth" }}
        >
          {frames.map((frame) => (
            <button
              tabIndex={-1}
              key={frame.id}
              data-frame-id={frame.id}
              className={`relative flex-shrink-0 overflow-hidden rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                selectedFrame === frame.id
                  ? "ring-1 ring-primary"
                  : "ring-1 ring-gray-200 hover:ring-zinc-500 dark:ring-gray-800 dark:hover:ring-zinc-500"
              }`}
              onClick={() => setSelectedFrame(frame.id)}
              aria-selected={selectedFrame === frame.id}
              role="option"
            >
              <div className="h-8 w-12 rounded-md bg-gray-200 dark:bg-gray-800" />
              {selectedFrame === frame.id && (
                <div className="absolute inset-0" />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5 text-center text-[8px] text-white dark:bg-white/60 dark:text-black">
                {frame.timestamp}
              </div>
            </button>
          ))}
        </div>

        {/* Gradient overlays to indicate scrollability */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent dark:from-black dark:to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent dark:from-black dark:to-transparent" />
      </div>
    </div>
  );
};

export const FrameTimelineSkeleton = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-2 overflow-x-auto p-1">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="h-8 w-12 flex-shrink-0 animate-pulse rounded-md bg-gray-200 ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700"
          >
            <div className="mt-5 h-3 w-full animate-pulse rounded-sm bg-gray-300 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
};

const generateFrames = (duration: number) => {
  const frames = [];
  for (let i = 0; i < duration; i += 1) {
    frames.push({
      id: i,
      timestamp: `00:${String(i).padStart(2, "0")}`,
    });
  }
  return frames;
};
