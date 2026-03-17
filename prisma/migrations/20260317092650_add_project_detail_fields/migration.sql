/*
  Warnings:

  - You are about to drop the column `mediaUrls` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categorySlug` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "mediaUrls",
ADD COLUMN     "categorySlug" TEXT NOT NULL,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "mainImage" TEXT,
ADD COLUMN     "media" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
