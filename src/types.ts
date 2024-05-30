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
	possibleAnswers: Array<String>,
	answers: Array<String>	
};


export const TargetGroup = {
	age: Number,
	gender: String,
    country: String,
	surveyData: Array<typeof Question>
};

export const NewRespondentProfileSurvey = {
	type: String,
	respondentOthentSub: String,
    targetGroups: Array<typeof TargetGroup> 
};

export const RespondentProfileSurvey = {
	id: String,
	type: String,
	respondentOthentSub: String,
    targetGroups: Array<typeof TargetGroup> 	
};

