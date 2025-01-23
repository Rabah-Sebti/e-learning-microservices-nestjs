/*
  Warnings:

  - A unique constraint covering the columns `[courseId]` on the table `quizes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "quizes_courseId_key" ON "quizes"("courseId");
