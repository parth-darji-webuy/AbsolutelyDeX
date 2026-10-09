-- DropIndex
DROP INDEX "event_tracking_anonymousId_dedupeKey_key";

-- AlterTable
ALTER TABLE "event_tracking" DROP COLUMN "dedupeKey";

-- CreateIndex
CREATE INDEX "event_tracking_anonymousId_event_idx" ON "event_tracking"("anonymousId", "event");
