/*
  Warnings:

  - The `status` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `templateId` on the `ServiceCard` table. All the data in the column will be lost.
  - You are about to drop the `CardFieldDefinition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CardTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceCardFieldValue` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[referenceCode]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Made the column `currency` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('NEW', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "BookingType" AS ENUM ('ONE_WAY', 'RETURN', 'HOURLY', 'TOUR', 'ATTRACTION');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "VehicleCategory" AS ENUM ('LUXURY', 'BUSINESS', 'PREMIUM_ECONOMY', 'ECONOMY', 'VAN', 'BUS');

-- CreateEnum
CREATE TYPE "TourServiceMode" AS ENUM ('FULL_DRIVER', 'TWO_WAY', 'SHARED');

-- CreateEnum
CREATE TYPE "AttractionAudience" AS ENUM ('FAMILY', 'COUPLES', 'TOURISTS');

-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_carId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CardFieldDefinition" DROP CONSTRAINT "CardFieldDefinition_templateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CardTemplate" DROP CONSTRAINT "CardTemplate_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CardTemplate" DROP CONSTRAINT "CardTemplate_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ServiceCard" DROP CONSTRAINT "ServiceCard_templateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ServiceCardFieldValue" DROP CONSTRAINT "ServiceCardFieldValue_cardId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ServiceCardFieldValue" DROP CONSTRAINT "ServiceCardFieldValue_fieldDefinitionId_fkey";

-- DropIndex
DROP INDEX "public"."ServiceCard_sectionId_isActive_displayOrder_idx";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "adultQty" INTEGER,
ADD COLUMN     "babySeatQty" INTEGER,
ADD COLUMN     "childQty" INTEGER,
ADD COLUMN     "guideLabel" TEXT,
ADD COLUMN     "guideRate" DOUBLE PRECISION,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "photographerRate" DOUBLE PRECISION,
ADD COLUMN     "serviceCardId" TEXT,
ADD COLUMN     "tourHours" DOUBLE PRECISION,
ADD COLUMN     "transferRouteId" TEXT,
ADD COLUMN     "vehicleUpgradeRate" DOUBLE PRECISION,
DROP COLUMN "status",
ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'NEW',
ALTER COLUMN "carId" DROP NOT NULL,
ALTER COLUMN "currency" SET NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "BookingType" NOT NULL DEFAULT 'ONE_WAY',
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "displayOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "hasChildSeat" SET DEFAULT false,
DROP COLUMN "category",
ADD COLUMN     "category" "VehicleCategory" NOT NULL,
ALTER COLUMN "bigLuggage" SET DEFAULT 0,
ALTER COLUMN "smallLuggage" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "message" TEXT;

-- AlterTable
ALTER TABLE "ServiceCard" DROP COLUMN "templateId",
ADD COLUMN     "badge" TEXT;

-- AlterTable
ALTER TABLE "ServiceSection" ADD COLUMN     "description" TEXT;

-- DropTable
DROP TABLE "public"."CardFieldDefinition";

-- DropTable
DROP TABLE "public"."CardTemplate";

-- DropTable
DROP TABLE "public"."ServiceCardFieldValue";

-- DropEnum
DROP TYPE "public"."CardFieldType";

-- CreateTable
CREATE TABLE "TransferRoute" (
    "id" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "distanceKm" INTEGER NOT NULL,
    "priceEconomy" DOUBLE PRECISION NOT NULL,
    "pricePremium" DOUBLE PRECISION NOT NULL,
    "priceBusiness" DOUBLE PRECISION NOT NULL,
    "priceLuxury" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransferRoute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TransferRoute_tenantId_isActive_displayOrder_idx" ON "TransferRoute"("tenantId", "isActive", "displayOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_referenceCode_key" ON "Booking"("referenceCode");

-- CreateIndex
CREATE INDEX "Booking_tenantId_status_createdAt_idx" ON "Booking"("tenantId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Booking_referenceCode_idx" ON "Booking"("referenceCode");

-- AddForeignKey
ALTER TABLE "TransferRoute" ADD CONSTRAINT "TransferRoute_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_transferRouteId_fkey" FOREIGN KEY ("transferRouteId") REFERENCES "TransferRoute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_serviceCardId_fkey" FOREIGN KEY ("serviceCardId") REFERENCES "ServiceCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
