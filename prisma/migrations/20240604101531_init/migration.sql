/*
  Warnings:

  - The primary key for the `RespondentProfileSurveyIndexHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RespondentProfileSurveyIndexHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "respondent_profile_survey"."RespondentProfileSurveyIndexHistory" DROP CONSTRAINT "RespondentProfileSurveyIndexHistory_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "RespondentProfileSurveyIndexHistory_pkey" PRIMARY KEY ("surveyId");
