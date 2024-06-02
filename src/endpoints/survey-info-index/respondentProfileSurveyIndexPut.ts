import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { NewRespondentProfileSurveyIndex, RespondentProfileSurveyIndex } from "../../types";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export class RespondentProfileSurveyIndexPut extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["RespondentProfileSurveyIndex"],
		summary: "Update RespondentProfileSurveyIndex in the store based on a single ID",
        description: "Update RespondentProfileSurveyIndex in the store based on a single ID",
        security: [
            {
                BearerAuth: [],
            },
          ],
		  requestBody:  NewRespondentProfileSurveyIndex,
		  parameters: {
			id: Path(String, {
				description: "ID of RespondentProfileSurveyIndex to fetch",
				default: 0,
			}),
		},
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
        const prisma = new PrismaClient({
            datasources: {
              db: {
                url: env.DATABASE_URL,
              },
            },
          }).$extends(withAccelerate());
		  const resBody =  await prisma.respondentProfileSurveyIndex.update({
			where: { othentId: request.claims.sub },
			data: {
				'currentSurveyId': data.body.currentSurveyId,
				'lastSurveyId': data.body.lastSurveyId ? data.body.lastSurveyId : null
			  }      
		  });		
        return resBody;
	}
    
}