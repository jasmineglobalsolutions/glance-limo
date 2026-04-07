/*
  Warnings:

  - You are about to drop the column `luggageCapacity` on the `Car` table. All the data in the column will be lost.
  - Added the required column `bigLuggage` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smallLuggage` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "luggageCapacity",
ADD COLUMN     "bigLuggage" INTEGER NOT NULL,
ADD COLUMN     "smallLuggage" INTEGER NOT NULL;
