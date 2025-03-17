import { EventStatus, RejectionReason } from "../enums.types";

// Auth
export type EmailPassReq = { email: string; password: string };

// Events
export type UpdateEventReq = Partial<{
  status: EventStatus;
  reason: RejectionReason;
}>;
