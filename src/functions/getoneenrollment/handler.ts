import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { getenrollment } from "../../common/dynamodb"


const getoneenrollment: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const { id } = event.pathParameters
  const data = {
    TableName: "SEMSTABLE",
    Key: {
      id,
    }
  }

  const course = await getenrollment(data)

  return formatJSONResponse({
    message: "enrollment found",
    body: course,

  });
}

export const main = middyfy(getoneenrollment);