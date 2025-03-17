import { pgTable, varchar, text, customType, index } from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "./helpers/date-helpers";
import { relations } from "drizzle-orm";
import { users } from "./user.schema";
import { EventStatus, ViolationSeverity, RejectionReason } from "../../types";

const EnumViolationSeverity = customType<{
  data: ViolationSeverity;
}>({
  dataType: () => "text",
});

const EnumEventStatus = customType<{
  data: EventStatus;
}>({
  dataType: () => "text",
});

const EnumReason = customType<{
  data: RejectionReason;
}>({
  dataType: () => "text",
});

export const events = pgTable(
  "events",
  {
    id,
    videoUrl: varchar("video_url", { length: 255 }),
    licensePlateImageUrl: varchar("license_plate_image_url", { length: 255 }),
    reason: EnumReason("reason").default(null),
    violationSeverity: EnumViolationSeverity("violation_severity")
      .notNull()
      .default(ViolationSeverity.MEDIUM),
    status: EnumEventStatus("status").notNull().default(EventStatus.IDLE),
    location: text("location"),
    reviewerId: varchar("reviewer_id", { length: 255 }).default(null),
    createdAt,
    updatedAt,
  },
  (table) => ({
    statusIdx: index("idx_events_status").on(table.status),
    reviewerIdx: index("idx_events_reviewer").on(table.reviewerId),
    createdAtIdx: index("idx_events_created_at").on(table.createdAt),
    statusReviewerIdx: index("idx_events_status_reviewer").on(
      table.status,
      table.reviewerId
    ),
  })
);

export type Event = typeof events.$inferSelect;
export type EventInsert = typeof events.$inferInsert;

export const eventsRelations = relations(events, ({ one }) => ({
  reviewer: one(users, {
    fields: [events.reviewerId],
    references: [users.id],
  }),
}));
