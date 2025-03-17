ALTER TABLE "events" ALTER COLUMN "violation_type" SET DEFAULT null;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "status" SET DEFAULT 'idle';--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "reviewer_id" SET DEFAULT null;