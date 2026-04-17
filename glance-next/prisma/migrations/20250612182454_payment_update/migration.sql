/*
  Warnings:

  - You are about to drop the column `paymentLink` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "paymentLink",
ADD COLUMN     "paymentSession" TEXT;
