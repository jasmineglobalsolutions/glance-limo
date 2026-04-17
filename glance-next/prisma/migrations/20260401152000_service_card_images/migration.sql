-- CreateTable
CREATE TABLE "ServiceCardImage" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "altText" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceCardImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ServiceCardImage_cardId_displayOrder_idx" ON "ServiceCardImage"("cardId", "displayOrder");

-- AddForeignKey
ALTER TABLE "ServiceCardImage" ADD CONSTRAINT "ServiceCardImage_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "ServiceCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
