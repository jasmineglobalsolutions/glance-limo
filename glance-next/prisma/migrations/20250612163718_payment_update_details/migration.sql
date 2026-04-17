-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "failureReason" TEXT,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentIntentId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
