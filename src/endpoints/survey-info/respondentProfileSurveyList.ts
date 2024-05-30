import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Query,
} from "@cloudflare/itty-router-openapi";
import { RespondentProfileSurvey } from "../../types";

export class RespondentProfileSurveyList extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["RespondentProfileSurvey"],
		summary: "Returns all RespondentProfileSurvey from the system that the user has access to",
        description: "Returns all RespondentProfileSurvey from the system that the user has access to",
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
						RespondentProfileSurvey: [RespondentProfileSurvey],
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
        return [];
	}
    
}