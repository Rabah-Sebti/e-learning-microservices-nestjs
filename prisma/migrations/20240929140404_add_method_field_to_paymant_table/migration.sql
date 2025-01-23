/*
  Warnings:

  - Added the required column `method` to the `paymantCourses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Method" AS ENUM ('payment_baridi', 'payment_pca', 'payment_online', 'payment_on_site');

-- AlterTable
ALTER TABLE "paymantCourses" ADD COLUMN     "method" "Method" NOT NULL;
