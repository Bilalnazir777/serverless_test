import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { getcourse } from "../../common/dynamodb"


const getonecourse: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const { id } = event.pathParameters
  const data = {
    TableName: "SEMSTABLE",
    Key: {
      id,
    }
  }

  const course = await getcourse(data)

  return formatJSONResponse({
    message: "course found",
    body: course,

  });
}

export const main = middyfy(getonecourse);