import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Query,
} from "@cloudflare/itty-router-openapi";
import { NewRespondentProfileSurveyIndex, RespondentProfileSurveyIndex } from "../../types";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export class RespondentProfileSurveyIndexCreate extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["RespondentProfileSurveyIndex"],
		summary: "Creates a new RespondentProfileSurveyIndex in the store. ",
        description: "Creates a new RespondentProfileSurveyIndex in the store. ",
        security: [
            {
                BearerAuth: [],
            },
          ],
		requestBody:  NewRespondentProfileSurveyIndex,
		responses: {
			"200": {
				description: "RespondentProfileSurveyIndex response",
				schema: {
					success: Boolean,
					result: {
						RespondentProfileSurveyIndex: RespondentProfileSurveyIndex,
					},
				},
			},
		},
	};

	async handle(
		request: any,
		env: any,
		context: any,
		data: Record<string, any>
	) {       		
		console.log(data.body);
        const prisma = new PrismaClient({
            datasources: {
              db: {
                url: env.DATABASE_URL,
              },
            },
          }).$extends(withAccelerate());
		  const resBody =  await prisma.respondentProfileSurveyIndex.upsert({
			where: { othentId: request.claims.sub },
			update: {
			  'currentSurveyId': data.body.currentSurveyId,
			  'lastSurveyId': data.body.lastSurveyId ? data.body.lastSurveyId : null
			},
			create: {
			  'othentId': request.claims.sub,
			  'currentSurveyId': data.body.currentSurveyId,
			  'lastSurveyId': data.body.lastSurveyId ? data.body.lastSurveyId : null
			}      
		  });
		  await prisma.respondentProfileSurveyIndexHistory.upsert({
			where: { surveyId: data.body.currentSurveyId },
			update: {
				'active': true
			},
			create: {
				'surveyId': data.body.currentSurveyId,
				'active': true
			}})
			if(data.body.lastSurveyId && data.body.lastSurveyId.length > 0) {
				await prisma.respondentProfileSurveyIndexHistory.upsert({
					where: { surveyId: data.body.lastSurveyId },
					update: {
						'active': false
					},
					create: {
						'surveyId': data.body.lastSurveyId,
						'active': false
					}})		
			}		

		  return resBody;
		
	}
}