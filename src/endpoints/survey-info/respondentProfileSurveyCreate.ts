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
			const messageId = await message({
			  process: "taFQ_bgJhuBLNP7VXMdYq9xq9938oqinxboiLi7k2M8",
			  signer: createDataItemSigner('vFDZ6F4YuZoenYILnNpmh18klvtCquWsqng7oj_oxrQ'),
			  // the survey as stringified JSON
			  data: '{"type":"survey","config":"easy","countryCodes":["US","DZ","UA","RO"],"countryNames":["United States of America","Algeria","Ukraine","Romania"],"wantedRespondents":1000,"wantedQuestions":50,"targetGroups":[{"minimumAge":18,"maximumAge":64,"gender":"both","country":"United States of America","wantedCompletes":"753","ir":"100","loi":"17","daysInField":"7","startDate":"2024-05-16T13:54:48.029Z","time":"00:00","visible":true},{"minimumAge":18,"maximumAge":64,"gender":"both","country":"Algeria","wantedCompletes":"102","ir":"100","loi":"17","daysInField":"7","startDate":"2024-05-16T13:54:48.029Z","time":"00:00","visible":true},{"minimumAge":18,"maximumAge":64,"gender":"both","country":"Ukraine","wantedCompletes":"101","ir":"100","loi":"17","daysInField":"7","startDate":"2024-05-16T13:54:48.029Z","time":"00:00","visible":true},{"minimumAge":18,"maximumAge":64,"gender":"both","country":"Romania","wantedCompletes":"44","ir":"100","loi":"17","daysInField":"7","startDate":"2024-05-16T13:54:48.029Z","time":"00:00","visible":true}]}',
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