import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { getcourselist } from "../../common/dynamodb"


const coursesList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {


  const data = {
    TableName: "SEMSTABLE",
    ProjectionExpression: "coursetitle,coursecode,CR",
    FilterExpression: "begins_with(id,:v)",
    ExpressionAttributeValues: {
      ":v": "cr"
    }
  }



  const courses = await getcourselist(data)

  return formatJSONResponse({
    message: "List of courses",
    body: courses,

  });
}

export const main = middyfy(coursesList);