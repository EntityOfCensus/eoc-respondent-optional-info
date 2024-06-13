/*
  Warnings:

  - Added the required column `category` to the `QuestionStatistic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "respondent_profile_survey"."QuestionStatistic" ADD COLUMN     "category" TEXT NOT NULL;
