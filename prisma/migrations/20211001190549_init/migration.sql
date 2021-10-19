-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "dateOverdueEmailSent" TIMESTAMP(3),
ADD COLUMN     "hasDueSoonEmailBeenSent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasDueTodayEmailBeenSent" BOOLEAN NOT NULL DEFAULT false;
