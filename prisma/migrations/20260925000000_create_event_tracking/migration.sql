-- CreateTable
CREATE TABLE "event_tracking" (
    "id" TEXT NOT NULL,
    "anonymousId" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "dedupeKey" TEXT NOT NULL,
    "customerId" TEXT,
    "productId" TEXT,
    "productName" TEXT,
    "slug" TEXT,
    "brand" TEXT,
    "price" DECIMAL(65,30),
    "quantity" INTEGER,
    "selectedSize" TEXT,
    "selectedColor" TEXT,
    "featureKey" TEXT,
    "featureEnabled" BOOLEAN,
    "experimentKey" TEXT,
    "variationId" INTEGER,
    "theme" TEXT,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_tracking_anonymousId_dedupeKey_key" ON "event_tracking"("anonymousId", "dedupeKey");
CREATE INDEX "event_tracking_anonymousId_idx" ON "event_tracking"("anonymousId");
CREATE INDEX "event_tracking_event_idx" ON "event_tracking"("event");
CREATE INDEX "event_tracking_productId_idx" ON "event_tracking"("productId");
CREATE INDEX "event_tracking_createdAt_idx" ON "event_tracking"("createdAt");

-- Copy existing rows into event_tracking. dedupeKey mirrors the key built in
-- src/app/api/analytics/route.ts (fields joined by "|", NULL as empty string);
-- ON CONFLICT drops duplicates. Guarded because some old tables may not exist.
DO $$
BEGIN
    IF to_regclass('public.add_to_cart_tracking') IS NOT NULL THEN
        INSERT INTO "event_tracking" ("id", "anonymousId", "event", "dedupeKey", "productId", "productName", "slug", "brand", "price", "quantity", "selectedSize", "selectedColor", "createdAt")
        SELECT "id", "anonymousId", 'add_to_cart',
            concat_ws('|', 'add_to_cart', "productId", coalesce("productName", ''), coalesce("slug", ''), coalesce("brand", ''),
                coalesce("price"::float8::text, ''), "quantity"::text, coalesce("selectedSize", ''), coalesce("selectedColor", ''),
                '', '', '', '', '', ''),
            "productId", "productName", "slug", "brand", "price", "quantity", "selectedSize", "selectedColor", "createdAt"
        FROM "add_to_cart_tracking"
        ORDER BY "createdAt"
        ON CONFLICT DO NOTHING;
        DROP TABLE "add_to_cart_tracking";
    END IF;

    IF to_regclass('public.quickview_tracking') IS NOT NULL THEN
        INSERT INTO "event_tracking" ("id", "anonymousId", "event", "dedupeKey", "customerId", "productId", "featureKey", "featureEnabled", "experimentKey", "variationId", "createdAt")
        SELECT "id", "anonymousId", 'quick_view_clicked',
            concat_ws('|', 'quick_view_clicked', "productId", '', '', '', '', '', '', '',
                "featureKey", "featureEnabled"::text, coalesce("experimentKey", ''), coalesce("variationId"::text, ''), '', ''),
            "customerId", "productId", "featureKey", "featureEnabled", "experimentKey", "variationId", "createdAt"
        FROM "quickview_tracking"
        ORDER BY "createdAt"
        ON CONFLICT DO NOTHING;
        DROP TABLE "quickview_tracking";
    END IF;

    IF to_regclass('public.theme_toggle_tracking') IS NOT NULL THEN
        INSERT INTO "event_tracking" ("id", "anonymousId", "event", "dedupeKey", "theme", "createdAt")
        SELECT "id", "anonymousId", 'theme_toggle',
            concat_ws('|', 'theme_toggle', '', '', '', '', '', '', '', '', '', '', '', '', "theme", ''),
            "theme", "createdAt"
        FROM "theme_toggle_tracking"
        ORDER BY "createdAt"
        ON CONFLICT DO NOTHING;
        DROP TABLE "theme_toggle_tracking";
    END IF;

    IF to_regclass('public.whats_new_tracking') IS NOT NULL THEN
        INSERT INTO "event_tracking" ("id", "anonymousId", "event", "dedupeKey", "source", "createdAt")
        SELECT "id", "anonymousId", 'whats_new_clicked',
            concat_ws('|', 'whats_new_clicked', '', '', '', '', '', '', '', '', '', '', '', '', '', coalesce("source", '')),
            "source", "createdAt"
        FROM "whats_new_tracking"
        ORDER BY "createdAt"
        ON CONFLICT DO NOTHING;
        DROP TABLE "whats_new_tracking";
    END IF;
END $$;
