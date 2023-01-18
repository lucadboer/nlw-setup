/*
  Warnings:

  - You are about to drop the `habit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "habit";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "habits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "habit_week_days" (
    "id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL,
    "week_day" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "day_habits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "habit_week_days_habit_id_week_day_key" ON "habit_week_days"("habit_id", "week_day");

-- CreateIndex
CREATE UNIQUE INDEX "days_date_key" ON "days"("date");

-- CreateIndex
CREATE UNIQUE INDEX "day_habits_date_id_habit_id_key" ON "day_habits"("date_id", "habit_id");
