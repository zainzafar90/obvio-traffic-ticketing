import { create } from "zustand";

import { EventStatus, RejectionReason } from "@/types/enums.types";

interface EventState {
  // State
  eventStatus: EventStatus;
  rejectionReason: RejectionReason | null;

  // Actions
  acceptEvent: () => void;
  rejectEvent: (reason: RejectionReason) => void;
  resetStore: () => void;
}

export const useEventStore = create<EventState>((set) => ({
  eventStatus: EventStatus.PENDING,
  rejectionReason: null,

  acceptEvent: () => set({ eventStatus: EventStatus.APPROVED }),
  rejectEvent: (reason: RejectionReason) =>
    set({ eventStatus: EventStatus.REJECTED, rejectionReason: reason }),
  resetStore: () =>
    set({
      eventStatus: EventStatus.IDLE,
      rejectionReason: null,
    }),
}));
