-- CreateTable
CREATE TABLE "respondent_profile_survey"."RespondentProfileSurveyIndexHistory" (
    "id" SERIAL NOT NULL,
    "surveyId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "RespondentProfileSurveyIndexHistory_pkey" PRIMARY KEY ("id")
);
