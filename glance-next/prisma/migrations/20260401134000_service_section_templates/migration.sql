-- Drop old schema if present
DROP TABLE IF EXISTS "ServiceBoxField";
DROP TABLE IF EXISTS "ServiceBox";
DROP TYPE IF EXISTS "ServiceType";

-- Create new enums
CREATE TYPE "ServiceSectionKey" AS ENUM (
  'SINGAPORE_TRANSFER',
  'CROSS_BORDER_TRANSFER',
  'SINGAPORE_TOURS',
  'MALAYSIA_TOURS',
  'SINGAPORE_ATTRACTIONS'
);

CREATE TYPE "CardFieldType" AS ENUM (
  'TEXT',
  'NUMBER',
  'BOOLEAN',
  'DATE',
  'SELECT',
  'IMAGE',
  'RICH_TEXT'
);

-- Service sections
CREATE TABLE "ServiceSection" (
  "id" TEXT NOT NULL,
  "key" "ServiceSectionKey" NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "tenantId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ServiceSection_pkey" PRIMARY KEY ("id")
);

-- Card templates
CREATE TABLE "CardTemplate" (
  "id" TEXT NOT NULL,
  "sectionId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "isDefault" BOOLEAN NOT NULL DEFAULT false,
  "tenantId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CardTemplate_pkey" PRIMARY KEY ("id")
);

-- Field definitions
CREATE TABLE "CardFieldDefinition" (
  "id" TEXT NOT NULL,
  "templateId" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "fieldType" "CardFieldType" NOT NULL DEFAULT 'TEXT',
  "required" BOOLEAN NOT NULL DEFAULT false,
  "placeholder" TEXT,
  "helpText" TEXT,
  "options" JSONB,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CardFieldDefinition_pkey" PRIMARY KEY ("id")
);

-- Service cards
CREATE TABLE "ServiceCard" (
  "id" TEXT NOT NULL,
  "sectionId" TEXT NOT NULL,
  "templateId" TEXT NOT NULL,
  "tenantId" TEXT,
  "carId" TEXT,
  "title" TEXT NOT NULL,
  "subtitle" TEXT,
  "description" TEXT,
  "imageUrl" TEXT,
  "ctaLabel" TEXT,
  "ctaHref" TEXT,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ServiceCard_pkey" PRIMARY KEY ("id")
);

-- Card field values
CREATE TABLE "ServiceCardFieldValue" (
  "id" TEXT NOT NULL,
  "cardId" TEXT NOT NULL,
  "fieldDefinitionId" TEXT NOT NULL,
  "value" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ServiceCardFieldValue_pkey" PRIMARY KEY ("id")
);

-- Indexes
CREATE UNIQUE INDEX "ServiceSection_key_key" ON "ServiceSection"("key");
CREATE UNIQUE INDEX "ServiceSection_slug_key" ON "ServiceSection"("slug");
CREATE INDEX "CardTemplate_sectionId_isDefault_idx" ON "CardTemplate"("sectionId", "isDefault");
CREATE UNIQUE INDEX "CardFieldDefinition_templateId_key_key" ON "CardFieldDefinition"("templateId", "key");
CREATE INDEX "CardFieldDefinition_templateId_displayOrder_idx" ON "CardFieldDefinition"("templateId", "displayOrder");
CREATE INDEX "ServiceCard_sectionId_isActive_displayOrder_idx" ON "ServiceCard"("sectionId", "isActive", "displayOrder");
CREATE UNIQUE INDEX "ServiceCardFieldValue_cardId_fieldDefinitionId_key" ON "ServiceCardFieldValue"("cardId", "fieldDefinitionId");
CREATE INDEX "ServiceCardFieldValue_fieldDefinitionId_idx" ON "ServiceCardFieldValue"("fieldDefinitionId");

-- Foreign keys
ALTER TABLE "ServiceSection"
  ADD CONSTRAINT "ServiceSection_tenantId_fkey"
  FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "CardTemplate"
  ADD CONSTRAINT "CardTemplate_sectionId_fkey"
  FOREIGN KEY ("sectionId") REFERENCES "ServiceSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CardTemplate"
  ADD CONSTRAINT "CardTemplate_tenantId_fkey"
  FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "CardFieldDefinition"
  ADD CONSTRAINT "CardFieldDefinition_templateId_fkey"
  FOREIGN KEY ("templateId") REFERENCES "CardTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ServiceCard"
  ADD CONSTRAINT "ServiceCard_sectionId_fkey"
  FOREIGN KEY ("sectionId") REFERENCES "ServiceSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ServiceCard"
  ADD CONSTRAINT "ServiceCard_templateId_fkey"
  FOREIGN KEY ("templateId") REFERENCES "CardTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "ServiceCard"
  ADD CONSTRAINT "ServiceCard_tenantId_fkey"
  FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ServiceCard"
  ADD CONSTRAINT "ServiceCard_carId_fkey"
  FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ServiceCardFieldValue"
  ADD CONSTRAINT "ServiceCardFieldValue_cardId_fkey"
  FOREIGN KEY ("cardId") REFERENCES "ServiceCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ServiceCardFieldValue"
  ADD CONSTRAINT "ServiceCardFieldValue_fieldDefinitionId_fkey"
  FOREIGN KEY ("fieldDefinitionId") REFERENCES "CardFieldDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
