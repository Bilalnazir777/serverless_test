import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { getOneStudent } from "../../common/dynamodb"


const singleStudent: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const { id } = event.pathParameters
  const data = {
    TableName: "SEMSTABLE",
    Key: {
      id,
    }
  }

  const student = await getOneStudent(data)

  return formatJSONResponse({

    body: student,

  });
}

export const main = middyfy(singleStudent);