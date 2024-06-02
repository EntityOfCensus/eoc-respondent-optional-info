import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path
} from "@cloudflare/itty-router-openapi";
import { QuestionStatistic, QuestionStatisticFilter } from "../../types";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export class QuestionStatisticFilterRoute extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["QuestionStatistic"],
		summary: "Returns profile survey question statistic from the system that the user has access to ",
        description: "Returns profile survey question statistic from the system that the user has access to",
        security: [
            {
                BearerAuth: [],
            },
          ],
		parameters: {
			profileSurveyStatisticId: Path(String, {
				description: "ID of ProfileSurveyStatistic to filter",
				default: 0,
			}),
		},
		requestBody: [QuestionStatisticFilter],
		responses: {
			"200": {
				description: "OK",
				schema: [QuestionStatistic]
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
		  for(var i = 0; i < data.body.length; ++ i) {
			let questionStatisticFilter = data.body[i];	
			console.log("data.body[" + i + "]", questionStatisticFilter);
		  }
		  return await prisma.questionStatistic.findMany({
			where: {profileSurveyStatisticId: request.params.profileSurveyStatisticId}
		  });
		}
    
}