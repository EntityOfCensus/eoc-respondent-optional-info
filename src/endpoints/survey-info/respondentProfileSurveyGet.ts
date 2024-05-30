import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { RespondentProfileSurvey } from "../../types";

export class RespondentProfileSurveyGet extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["RespondentProfileSurvey"],
		summary: "Returns a RespondentProfileSurvey based on a single ID",
        description: "Returns a RespondentProfileSurvey based on a single ID",
        security: [
            {
                BearerAuth: [],
            },
          ],
        parameters: {
			id: Path(String, {
				description: "ID of RespondentProfileSurvey to fetch",
				default: 0,
			}),
		},
		responses: {
			"200": {
				description: "RespondentProfileSurvey response",
				schema: {
					success: Boolean,
					result: {
						RespondentProfileSurvey: RespondentProfileSurvey,
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
        return {};
	}
    
}