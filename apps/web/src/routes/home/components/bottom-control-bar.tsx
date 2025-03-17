import { useEffect, useRef, useState } from "react";

import { ChevronDownIcon, ChevronUpIcon, Pause, Play } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import { EventStatus, RejectionReason } from "@/types/enums.types";
import { IEvent } from "@/types/interfaces/resources";
import { Button } from "@/components/ui/button";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownShortcut,
} from "@/components/ui/dropdown";
import { Kbd } from "@/components/ui/kbd";
import { useUpdateEvent } from "@/hooks/api/event.hooks";

import { useEventStore } from "../stores/event.store";
import { useLicensePlateStore } from "../stores/license-plate.store";
import { useVideoPlayerStore } from "../stores/video-player.store";

interface BottomControlBarProps {
  event: IEvent;
  onFetchNextEvent: () => void;
}

export const BottomControlBar = ({
  event,
  onFetchNextEvent,
}: BottomControlBarProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { mutate: updateEvent } = useUpdateEvent();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdownTime, setCountdownTime] = useState(10);
  const [isConfirmingReject, setIsConfirmingReject] = useState(false);
  const [isConfirmingApprove, setIsConfirmingApprove] = useState(false);
  const [selectedReason, setSelectedReason] = useState<RejectionReason | null>(
    null
  );

  const { eventStatus, acceptEvent, rejectEvent } = useEventStore();
  const { isPlaying, playVideo, pauseVideo } = useVideoPlayerStore();
  const { toggleLicensePlateExpanded } = useLicensePlateStore();

  useHotkeys("space", () => handlePlayPause(), {
    preventDefault: true,
  });

  useHotkeys("a", () => handleAcceptClick(), {
    preventDefault: true,
  });

  useHotkeys("r", () => handleDropdownClick(), {
    preventDefault: true,
  });

  useHotkeys("d", () => toggleLicensePlateExpanded(), {
    preventDefault: true,
  });

  const handleDropdownClick = () => {
    if (isConfirmingReject) {
      if (selectedReason) {
        completeRejection(selectedReason);
      }
      return;
    }

    setIsDropdownOpen(true);
    const dropdownButton = document.querySelector(
      '[data-dropdown-button="true"]'
    ) as HTMLButtonElement;
    if (dropdownButton) {
      dropdownButton.click();
    }
  };

  const toggleDropdown = () => {
    if (isConfirmingReject) return;
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (action: RejectionReason) => {
    setIsDropdownOpen(false);
    setSelectedReason(action);
    setIsConfirmingReject(true);
    setTimeout(() => {
      setIsConfirmingReject(false);
      setSelectedReason(null);
    }, 3000);
  };

  const completeRejection = (action: RejectionReason) => {
    setIsConfirmingReject(false);
    setSelectedReason(null);
    rejectEvent(action);
    updateEvent({
      id: event.id,
      reason: action,
      status: EventStatus.REJECTED,
    });
  };

  const handleAcceptClick = () => {
    if (isConfirmingApprove) {
      completeApproval();
      return;
    }

    setIsConfirmingApprove(true);

    setTimeout(() => {
      setIsConfirmingApprove(false);
    }, 3000);
  };

  const completeApproval = () => {
    setIsConfirmingApprove(false);
    acceptEvent();
    updateEvent({
      id: event.id,
      status: EventStatus.APPROVED,
    });
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  const handleCancelCountdown = () => {
    setIsCountingDown(false);
  };

  const countdownProgressPercentage = isCountingDown
    ? ((10 - countdownTime) / 10) * 100
    : 0;

  useEffect(() => {
    if (isCountingDown) {
      timerRef.current = setInterval(() => {
        setCountdownTime((prev) => Math.max(0, prev - 1));
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    }
  }, [isCountingDown]);

  useEffect(() => {
    if (isCountingDown && countdownTime === 0) {
      setIsCountingDown(false);
      onFetchNextEvent();
    }
  }, [isCountingDown, countdownTime, onFetchNextEvent]);

  useEffect(() => {
    if (
      eventStatus === EventStatus.REJECTED ||
      eventStatus === EventStatus.APPROVED
    ) {
      setIsCountingDown(true);
    }

    if (
      eventStatus === EventStatus.IDLE ||
      eventStatus === EventStatus.PENDING
    ) {
      setIsCountingDown(false);
      setCountdownTime(10);
    }
  }, [eventStatus]);

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
        <div className="flex flex-1 items-center justify-start space-x-4">
          <Button
            data-testid="video-controls"
            outline
            onClick={handlePlayPause}
            className="gap-2"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </div>

        {/* Middle section */}
        <div className="flex items-center justify-center space-x-2">
          {isCountingDown && (
            <div className="relative flex items-center gap-2">
              <Button
                data-testid="next-event-button"
                color="zinc"
                className="relative overflow-hidden transition-all duration-300"
                onClick={handleCancelCountdown}
              >
                <div
                  className="absolute inset-0 bg-zinc-900 transition-all duration-300 dark:bg-zinc-100"
                  style={{ width: `${countdownProgressPercentage}%` }}
                />

                <div className="relative z-10 flex items-center gap-2 text-background">
                  <span>Next event in {countdownTime}s</span>
                </div>
              </Button>
            </div>
          )}
          <Button
            data-testid="skip-event-button"
            plain
            disabled={
              eventStatus === EventStatus.PENDING ||
              eventStatus === EventStatus.IDLE
            }
            className="text-zinc-500 hover:text-zinc-700"
            onClick={onFetchNextEvent}
          >
            Next Event
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button
            color={
              eventStatus === EventStatus.APPROVED
                ? "green"
                : isConfirmingApprove
                  ? "green"
                  : "zinc"
            }
            onClick={handleAcceptClick}
            disabled={eventStatus === EventStatus.REJECTED}
            className={isConfirmingApprove ? "animate-pulse" : ""}
          >
            <Kbd>A</Kbd>
            {eventStatus === EventStatus.APPROVED
              ? "Approved"
              : isConfirmingApprove
                ? "Confirm Accept"
                : "Accept"}
          </Button>

          {isConfirmingReject ? (
            <Button
              color="red"
              className="animate-pulse"
              onClick={() =>
                selectedReason && completeRejection(selectedReason)
              }
            >
              <Kbd>R</Kbd>
              Confirm Reject
            </Button>
          ) : (
            <Dropdown>
              <DropdownButton
                color={eventStatus === EventStatus.REJECTED ? "red" : "zinc"}
                onClick={toggleDropdown}
                data-dropdown-button="true"
              >
                <Kbd>R</Kbd>

                {eventStatus === EventStatus.REJECTED ? "Rejected" : "Reject"}

                {isDropdownOpen ? (
                  <ChevronUpIcon className="size-4" />
                ) : (
                  <ChevronDownIcon className="size-4" />
                )}
              </DropdownButton>
              <DropdownMenu anchor="bottom start" className="min-w-48">
                <DropdownItem
                  onClick={() => handleSelect(RejectionReason.FALSE_POSITIVE)}
                  destructive
                >
                  <DropdownLabel>False positive</DropdownLabel>
                  <DropdownShortcut keys="F">
                    <Kbd>F</Kbd>
                  </DropdownShortcut>
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    handleSelect(RejectionReason.MAIN_CAMERA_ISSUE)
                  }
                  destructive
                >
                  <DropdownLabel>Main camera issue</DropdownLabel>
                  <DropdownShortcut keys="M">
                    <Kbd>C</Kbd>
                  </DropdownShortcut>
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    handleSelect(RejectionReason.LICENSE_PLATE_ISSUE)
                  }
                  destructive
                >
                  <DropdownLabel>License plate issue</DropdownLabel>
                  <DropdownShortcut keys="L">
                    <Kbd>L</Kbd>
                  </DropdownShortcut>
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    handleSelect(RejectionReason.DMV_INFORMATION_ISSUE)
                  }
                  destructive
                >
                  <DropdownLabel>DMV information issue</DropdownLabel>
                  <DropdownShortcut keys="D">
                    <Kbd>D</Kbd>
                  </DropdownShortcut>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};
