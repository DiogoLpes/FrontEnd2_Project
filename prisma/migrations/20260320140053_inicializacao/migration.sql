/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Made the column `brand` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `model` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `fuel` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_ownerId_fkey";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
DROP COLUMN "ownerId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "brand" SET NOT NULL,
ALTER COLUMN "model" SET NOT NULL,
ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL,
DROP COLUMN "fuel",
ADD COLUMN     "fuel" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
