/*
  Warnings:

  - You are about to drop the column `airline` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `airportTerminal` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `arrivalTime` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `bookingType` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `flightNumber` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `pickupSign` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `referenceCode` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "airline",
DROP COLUMN "airportTerminal",
DROP COLUMN "arrivalTime",
DROP COLUMN "bookingType",
DROP COLUMN "flightNumber",
DROP COLUMN "notes",
DROP COLUMN "pickupSign",
DROP COLUMN "referenceCode",
DROP COLUMN "title";
