/*
  Warnings:

  - Added the required column `country` to the `QuestionStatistic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "respondent_profile_survey"."QuestionStatistic" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3);
