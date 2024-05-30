import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { NewRespondentProfileSurvey, RespondentProfileSurvey } from "../../types";

export class RespondentProfileSurveyPut extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["RespondentProfileSurvey"],
		summary: "Update RespondentProfileSurvey in the store based on a single ID",
        description: "Update RespondentProfileSurvey in the store based on a single ID",
        security: [
            {
                BearerAuth: [],
            },
          ],
		  requestBody:  NewRespondentProfileSurvey,
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

        return data.body;
	}
    
}