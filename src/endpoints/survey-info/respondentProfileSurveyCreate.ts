import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Query,
} from "@cloudflare/itty-router-openapi";
import { NewRespondentProfileSurvey, RespondentProfileSurvey } from "../../types";

const decode = require('jwt-claims');

export class RespondentProfileSurveyCreate extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["RespondentProfileSurvey"],
		summary: "Creates a new RespondentProfileSurvey in the store. ",
        description: "Creates a new RespondentProfileSurvey in the store. ",
        security: [
            {
                BearerAuth: [],
            },
          ],
		requestBody:  NewRespondentProfileSurvey,
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