import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { createcourse } from "../../common/dynamodb"
import { v4 } from 'uuid';
const createnewcourse: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const body = event.body
  const courseid = "cr-" + v4();
  const data = {
    TableName: "SEMSTABLE",
    Item: {
      coursecode: body.coursecode,
      coursetitle: body.coursetitle,
      CR: body.CR,
      id: courseid,
    }
  }

  const response = await createcourse(data)

  return formatJSONResponse({
    body: response,
    message: 'new course created',


  })



}

export const main = middyfy(createnewcourse);
