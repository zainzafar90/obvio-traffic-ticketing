import { UpdateEventReq } from "@/types/api/api-payloads";
import { EventResponse } from "@/types/api/api-responses";

import { getRequest, patchRequest } from "./common";

async function getRandomEvent() {
  return getRequest<EventResponse>("/v1/events/random");
}

async function updateEvent(id: string, payload: UpdateEventReq) {
  return patchRequest<EventResponse>(`/v1/events/${id}`, payload);
}

export const event = {
  getRandom: getRandomEvent,
  update: updateEvent,
};
