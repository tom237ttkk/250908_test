-- Migration: update video structure and team metadata

-- Drop existing video table to simplify schema changes
DROP TABLE IF EXISTS "Video";

-- Extend team metadata
ALTER TABLE "Team"
  ADD COLUMN IF NOT EXISTS "shortName" TEXT,
  ADD COLUMN IF NOT EXISTS "logoUrl" TEXT;

UPDATE "Team" SET "shortName" = COALESCE("shortName", UPPER("slug"));

ALTER TABLE "Team"
  ALTER COLUMN "shortName" SET NOT NULL;

-- Recreate video table with new structure
CREATE TABLE "Video" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "videoUrl" TEXT NOT NULL,
  "videoType" TEXT NOT NULL DEFAULT 'youtube',
  "thumbnailUrl" TEXT,
  "matchDate" TIMESTAMP(3) NOT NULL,
  "duration" INTEGER,
  "homeTeamId" TEXT NOT NULL,
  "awayTeamId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Video_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Video_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "Video_matchDate_idx" ON "Video"("matchDate");
