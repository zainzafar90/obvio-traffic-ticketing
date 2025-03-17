import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";

import { UpdateEventReq } from "@/types/api/api-payloads";
import { EventStatus } from "@/types/enums.types";
import { db } from "@/db";
import { events } from "@/db/schema/events.schema";

export const eventService = {
  getRandomEvent: async () => {
    const [event] = await db
      .select()
      .from(events)
      .where(eq(events.status, EventStatus.PENDING))
      .orderBy(sql`RANDOM()`)
      .limit(1);

    return event;
  },

  updateEventById: async (
    eventId: string,
    reviewerId: string,
    updateBody: UpdateEventReq
  ) => {
    const [updatedEvent] = await db
      .update(events)
      .set({
        status: updateBody.status,
        reason: updateBody.reason,
        reviewerId,
      })
      .where(eq(events.id, eventId))
      .returning();

    return updatedEvent;
  },
};
