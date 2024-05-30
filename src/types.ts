import { DateTime, Str } from "@cloudflare/itty-router-openapi";

export const Task = {
	name: new Str({ example: "lorem" }),
	slug: String,
	description: new Str({ required: false }),
	completed: Boolean,
	due_date: new DateTime(),
};

export const Question = {
	question: String,
	questionType: String,
    category: String,
	possibleAnswers: String,
	answers: String	
};


export const TargetGroup = {
	age: Number,
	gender: String,
    country: String,
	surveyData: Question
};

export const NewRespondentProfileSurvey = {
	type: String,
	respondentOthentSub: String,
    targetGroups: TargetGroup
};

export const RespondentProfileSurvey = {
	id: String,
	type: String,
	respondentOthentSub: String,
    targetGroups: TargetGroup 	
};

