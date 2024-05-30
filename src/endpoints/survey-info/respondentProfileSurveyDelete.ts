import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";

export class RespondentProfileSurveyDelete extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["RespondentProfileSurvey"],
		summary: "deletes a single RespondentProfileSurvey based on the ID supplied",
        description: "deletes a single RespondentProfileSurvey based on the ID supplied",
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
			"204": {
				description: "RespondentProfileSurvey response",
			},
		},
	};

	async handle(
		request: any,
		env: any,
		context: any,
		data: Record<string, any>
	) {    	
		  return Response.json(
            {
                status: 204,
            }
        );	
	}
    
}