-- CreateTable
CREATE TABLE "Email" (
    "emailId" SERIAL NOT NULL,
    "template" TEXT NOT NULL,
    "message" JSONB NOT NULL,
    "locals" JSONB NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("emailId")
);
