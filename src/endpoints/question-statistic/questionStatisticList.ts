import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Query,
} from "@cloudflare/itty-router-openapi";
import { QuestionStatistic } from "../../types";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export class QuestionStatisticList extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["QuestionStatistic"],
		summary: "Returns all QuestionStatistic from the system that the user has access to",
        description: "Returns all QuestionStatistic from the system that the user has access to",
        security: [
            {
                BearerAuth: [],
            },
          ],
        parameters: {
			page: Query(Number, {
				description: "Page number",
				default: 0,
			}),
			isCompleted: Query(Boolean, {
				description: "Filter by completed flag",
				required: false,
			}),
		},
		responses: {
			"200": {
				description: "Returns a list of tasks",
				schema: {
					success: Boolean,
					result: {
						QuestionStatistic: [QuestionStatistic],
					},
				},
			},
		},
	};

	async handle(
		request: Request,
		env: any,
		context: any,
		data: Record<string, any>
	) {
		const { page, isCompleted } = data.query;
        const prisma = new PrismaClient({
            datasources: {
              db: {
                url: env.DATABASE_URL,
              },
            },
          }).$extends(withAccelerate());
        console.log("prisma: " + prisma);
        return await prisma.questionStatistic.findMany();
	}
    
}