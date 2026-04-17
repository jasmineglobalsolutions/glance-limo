/*
  Warnings:

  - You are about to drop the column `name` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "name",
ADD COLUMN     "airline" TEXT,
ADD COLUMN     "airportTerminal" TEXT,
ADD COLUMN     "arrivalTime" TEXT,
ADD COLUMN     "bookingType" TEXT NOT NULL DEFAULT 'self',
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "flightNumber" TEXT,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "passengerEmail" TEXT,
ADD COLUMN     "passengerFirstName" TEXT,
ADD COLUMN     "passengerLastName" TEXT,
ADD COLUMN     "passengerPhone" TEXT,
ADD COLUMN     "pickupSign" TEXT,
ADD COLUMN     "referenceCode" TEXT,
ADD COLUMN     "title" TEXT;
