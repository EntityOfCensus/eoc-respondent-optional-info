-- CreateTable
CREATE TABLE "RespondentProfileSurveyIndex" (
    "othentId" TEXT NOT NULL,
    "currentSurveyId" TEXT NOT NULL,
    "lastSurveyId" TEXT NOT NULL,

    CONSTRAINT "RespondentProfileSurveyIndex_pkey" PRIMARY KEY ("othentId")
);

-- CreateTable
CREATE TABLE "ProfileSurveyStatistic" (
    "nameId" TEXT NOT NULL,

    CONSTRAINT "ProfileSurveyStatistic_pkey" PRIMARY KEY ("nameId")
);

-- CreateTable
CREATE TABLE "QuestionStatistic" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "profileSurveyStatisticId" TEXT NOT NULL,

    CONSTRAINT "QuestionStatistic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionStatistic" ADD CONSTRAINT "QuestionStatistic_profileSurveyStatisticId_fkey" FOREIGN KEY ("profileSurveyStatisticId") REFERENCES "ProfileSurveyStatistic"("nameId") ON DELETE RESTRICT ON UPDATE CASCADE;
