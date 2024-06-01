import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Query,
} from "@cloudflare/itty-router-openapi";
import { NewRespondentProfileSurvey, RespondentProfileSurvey } from "../../types";
import {
	dryrun,
	createDataItemSigner,
	message,
	connect,
  } from "@permaweb/aoconnect";

const TESTING_CENSUS_PROCESS_ID = "taFQ_bgJhuBLNP7VXMdYq9xq9938oqinxboiLi7k2M8";

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
		try {			
			const wallet = JSON.parse(env.JWK);
			console.log("AOProcessId", TESTING_CENSUS_PROCESS_ID);
			console.log("wallet", wallet);
			const messageId = await message({
			  process: TESTING_CENSUS_PROCESS_ID,
			  signer: createDataItemSigner(wallet),
			  // the survey as stringified JSON
			  data: JSON.stringify(data.body),
			  tags: [{ name: "Action", value: "AddSurvey" }],
			});
		
			console.log(messageId);
			return { messageId };
		  } catch (error) {
			console.log(error);
			return { messageId: false };
		  }
		//   return data.body;
	}
}