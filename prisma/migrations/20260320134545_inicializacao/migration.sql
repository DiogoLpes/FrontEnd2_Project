-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "subService" TEXT,
    "extraInfo" TEXT,
    "date" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
