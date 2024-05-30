import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";
import { createCors } from 'itty-router';
import secure from './utils/secure';
import validatePathId from './endpoints/survey-info/validate.paths';
import { RespondentProfileSurveyList } from "./endpoints/survey-info/respondentProfileSurveyList";
import { RespondentProfileSurveyCreate } from "./endpoints/survey-info/respondentProfileSurveyCreate";
import { RespondentProfileSurveyGet } from "./endpoints/survey-info/respondentProfileSurveyGet";
import { RespondentProfileSurveyPut } from "./endpoints/survey-info/respondentProfileSurveyPut";
import { RespondentProfileSurveyDelete } from "./endpoints/survey-info/respondentProfileSurveyDelete";

export const router = OpenAPIRouter({
	docs_url: "/",
});
const { preflight, corsify } = createCors({
	origins: ['*'],
	methods: ['*'],
	maxAge: 84600,
  });

router.all('*', preflight);

router.get("/api/tasks/", TaskList);
router.post("/api/tasks/", TaskCreate);
router.get("/api/tasks/:taskSlug/", TaskFetch);
router.delete("/api/tasks/:taskSlug/", TaskDelete);

router.get("/survey-info/", secure, RespondentProfileSurveyList);
router.post("/survey-info/", secure, RespondentProfileSurveyCreate);
router.get("/survey-info/:id", secure, validatePathId, RespondentProfileSurveyGet);
router.put("/survey-info/:id", secure, validatePathId, RespondentProfileSurveyPut);
router.delete("/survey-info/:id", secure, validatePathId, RespondentProfileSurveyDelete);

router.registry.registerComponent(
	'securitySchemes',
	'BearerAuth',
	{
	  type: 'http',
	  scheme: 'bearer',
	},
  )

// 404 for everything else
router.all("*", () =>
	Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{ status: 404 }
	)
);

export default {
    fetch: async (request, env, ctx) => {
		return router.handle(request, env, ctx).then(corsify)
	 },
};
