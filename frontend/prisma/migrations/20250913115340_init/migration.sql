-- CreateTable
CREATE TABLE "public"."Pinata" (
    "pda" TEXT NOT NULL,
    "pinataUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pinata_pkey" PRIMARY KEY ("pda")
);
