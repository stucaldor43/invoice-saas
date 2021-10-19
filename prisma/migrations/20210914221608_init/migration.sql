/*
  Warnings:

  - You are about to drop the column `description` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `InvoiceItem` table. All the data in the column will be lost.
  - Added the required column `price` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvoiceItem" DROP COLUMN "description",
DROP COLUMN "rate",
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;
