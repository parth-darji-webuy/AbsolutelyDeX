-- CreateTable
CREATE TABLE "add_to_cart_tracking" (
    "id" TEXT NOT NULL,
    "anonymousId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productName" TEXT,
    "slug" TEXT,
    "brand" TEXT,
    "price" DECIMAL(65,30),
    "quantity" INTEGER NOT NULL,
    "selectedSize" TEXT,
    "selectedColor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "add_to_cart_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "add_to_cart_tracking_anonymousId_idx" ON "add_to_cart_tracking"("anonymousId");

-- CreateIndex
CREATE INDEX "add_to_cart_tracking_productId_idx" ON "add_to_cart_tracking"("productId");

-- CreateIndex
CREATE INDEX "add_to_cart_tracking_createdAt_idx" ON "add_to_cart_tracking"("createdAt");

-- CreateIndex
CREATE INDEX "add_to_cart_tracking_anonymousId_productId_idx" ON "add_to_cart_tracking"("anonymousId", "productId");
