-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM (
    'MALAYSIA_TRANSFER',
    'SINGAPORE_TOURS',
    'MALAYSIA_TOURS',
    'SINGAPORE_ATTRACTIONS',
    'WEDDING_CHAUFFEUR',
    'CORPORATE_EVENTS'
);

-- CreateTable
CREATE TABLE "ServiceBox" (
    "id" TEXT NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "ctaLabel" TEXT,
    "ctaHref" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "tenantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceBox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceBoxField" (
    "id" TEXT NOT NULL,
    "serviceBoxId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT,
    "fieldType" TEXT NOT NULL DEFAULT 'text',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceBoxField_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ServiceBox_serviceType_isActive_idx" ON "ServiceBox"("serviceType", "isActive");

-- CreateIndex
CREATE INDEX "ServiceBoxField_serviceBoxId_displayOrder_idx" ON "ServiceBoxField"("serviceBoxId", "displayOrder");

-- AddForeignKey
ALTER TABLE "ServiceBox" ADD CONSTRAINT "ServiceBox_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceBoxField" ADD CONSTRAINT "ServiceBoxField_serviceBoxId_fkey" FOREIGN KEY ("serviceBoxId") REFERENCES "ServiceBox"("id") ON DELETE CASCADE ON UPDATE CASCADE;
