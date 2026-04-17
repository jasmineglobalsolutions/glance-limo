/*
  Warnings:

  - Made the column `carId` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stripeStatus` on table `Booking` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_carId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_tenantId_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "amount" DOUBLE PRECISION,
ADD COLUMN     "currency" TEXT DEFAULT 'SGD',
ADD COLUMN     "dropoff" TEXT,
ADD COLUMN     "pickup" TEXT,
ADD COLUMN     "pickupDate" TIMESTAMP(3),
ADD COLUMN     "pickupTime" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'one-way',
ALTER COLUMN "tenantId" DROP NOT NULL,
ALTER COLUMN "carId" SET NOT NULL,
ALTER COLUMN "stripeStatus" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
