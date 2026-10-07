-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "timestamp" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiment_exposure" (
    "id" TEXT NOT NULL,
    "anonymousId" TEXT NOT NULL,
    "experimentKey" TEXT NOT NULL,
    "experimentName" TEXT,
    "variationId" INTEGER NOT NULL,
    "variationName" TEXT,
    "variationValue" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "featureId" TEXT,

    CONSTRAINT "ExperimentExposure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiment_exposures" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "experiment_key" TEXT NOT NULL,
    "variation" TEXT NOT NULL,
    "timestamp" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "experiment_exposures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "experiment_tracking" (
    "id" TEXT NOT NULL,
    "anonymousId" TEXT NOT NULL,
    "experimentKey" TEXT NOT NULL,
    "experimentName" TEXT,
    "variationId" INTEGER NOT NULL,
    "variationName" TEXT,
    "variationValue" TEXT,
    "featureId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "experiment_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExperimentExposure_anonymousId_idx" ON "experiment_exposure"("anonymousId");

-- CreateIndex
CREATE INDEX "ExperimentExposure_experimentKey_idx" ON "experiment_exposure"("experimentKey");

-- CreateIndex
CREATE INDEX "ExperimentExposure_experimentKey_variationId_idx" ON "experiment_exposure"("experimentKey", "variationId");

-- CreateIndex
CREATE INDEX "experiment_tracking_anonymousId_idx" ON "experiment_tracking"("anonymousId");

-- CreateIndex
CREATE INDEX "experiment_tracking_experimentKey_idx" ON "experiment_tracking"("experimentKey");

-- CreateIndex
CREATE INDEX "experiment_tracking_experimentKey_variationId_idx" ON "experiment_tracking"("experimentKey", "variationId");

-- CreateIndex
CREATE INDEX "experiment_tracking_createdAt_idx" ON "experiment_tracking"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "experiment_tracking_anonymousId_experimentKey_key" ON "experiment_tracking"("anonymousId", "experimentKey");
