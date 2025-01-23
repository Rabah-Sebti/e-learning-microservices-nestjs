-- CreateTable
CREATE TABLE "Instructor" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "image_url" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "expert" TEXT NOT NULL,
    "detail" TEXT NOT NULL,

    CONSTRAINT "Instructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InstructorCourses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_email_key" ON "Instructor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_InstructorCourses_AB_unique" ON "_InstructorCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_InstructorCourses_B_index" ON "_InstructorCourses"("B");

-- AddForeignKey
ALTER TABLE "_InstructorCourses" ADD CONSTRAINT "_InstructorCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstructorCourses" ADD CONSTRAINT "_InstructorCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
