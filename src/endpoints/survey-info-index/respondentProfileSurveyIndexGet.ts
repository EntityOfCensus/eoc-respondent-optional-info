import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { RespondentProfileSurveyIndex } from "../../types";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export class RespondentProfileSurveyIndexGet extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["RespondentProfileSurveyIndex"],
		summary: "Returns a RespondentProfileSurveyIndex based on a single ID",
        description: "Returns a RespondentProfileSurveyIndex based on a single ID",
        security: [
            {
                BearerAuth: [],
            },
          ],
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
        return await prisma.respondentProfileSurveyIndex.findFirst({
			where: {othentId: request.claims.sub},
		  });
	}
    
}