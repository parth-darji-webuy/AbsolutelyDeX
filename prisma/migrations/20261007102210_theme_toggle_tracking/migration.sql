/*
  Warnings:

  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "events";

-- CreateTable
CREATE TABLE "quickview_tracking" (
    "id" TEXT NOT NULL,
    "anonymousId" TEXT NOT NULL,
    "customerId" TEXT,
    "productId" TEXT NOT NULL,
    "featureKey" TEXT NOT NULL DEFAULT 'quick-view-enabled',
    "featureEnabled" BOOLEAN NOT NULL,
    "experimentKey" TEXT,
    "variationId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quickview_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quick_view_cart_events" (
    "id" VARCHAR(50) NOT NULL,
    "anonymousId" VARCHAR(100) NOT NULL,
    "productId" VARCHAR(100) NOT NULL,
    "eventName" VARCHAR(100) NOT NULL,
    "source" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "quick_view_cart_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "theme_toggle_tracking" (
    "id" TEXT NOT NULL,
    "anonymousId" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "theme_toggle_tracking_pkey" PRIMARY KEY ("id")
);
