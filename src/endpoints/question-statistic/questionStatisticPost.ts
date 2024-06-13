import { Question } from './../../types';
import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { QuestionStatistic } from "../../types";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export class QuestionStatisticPost extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["QuestionStatistic"],
		summary: "Creates/ Update QuestionStatistic in the store. ",
        description: "Creates/ Update QuestionStatistic in the store. ",
        security: [
            {
                BearerAuth: [],
            },
          ],
		requestBody: [QuestionStatistic],
		responses: {
			"200": {
				description: "OK",
				schema: {
					success: Boolean,
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
		  console.log("data.body",data.body)
		  for(var i = 0; i < data.body.length; ++ i) {
			let questionStatistic = data.body[i];	
			console.log("data.body[" + i + "]", questionStatistic);
			let questionStatisticRow = await prisma.questionStatistic.findFirst({
				where: {question: questionStatistic.question,
						AND : {answer: questionStatistic.answer,
							   AND: {dateOfBirth: (new Date(questionStatistic.dateOfBirth)).toISOString(),
								     AND: {country: questionStatistic.country, 
										AND: {gender: questionStatistic.gender,
											AND: {category: questionStatistic.category}}}}, 
				    	}					
			   }
			});
			console.log("questionStatisticRow", questionStatisticRow);
			if(questionStatisticRow) {
				await prisma.questionStatistic.update({
					where: {id: questionStatisticRow.id },
					data: {
						'count': questionStatisticRow.count + questionStatistic.count
					}
				}).then();	
			} else {
				let profileSurveyStatistic = await prisma.profileSurveyStatistic.findFirst({
					where: {
						nameId: questionStatistic.profileSurveyStatisticId
					}
				})
				if(!profileSurveyStatistic) {
					await prisma.profileSurveyStatistic.create({
						data: {
							'nameId': questionStatistic.profileSurveyStatisticId
						}
					})
				}
				await prisma.questionStatistic.create({
					data: {
						'question': questionStatistic.question,
						'answer': questionStatistic.answer,
						'dateOfBirth': (new Date(questionStatistic.dateOfBirth)).toISOString(),
						'country': questionStatistic.country,
						'gender': questionStatistic.gender,
						'category': questionStatistic.category,
						'count': questionStatistic.count,
						'profileSurveyStatisticId': questionStatistic.profileSurveyStatisticId,
					}	
				});
	
			}
		  }
		return {};
	}
    
}