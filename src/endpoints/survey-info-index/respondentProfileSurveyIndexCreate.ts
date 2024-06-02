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

		  return resBody;
		
	}
}