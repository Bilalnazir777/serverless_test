import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { deleteenrollment } from "../../common/dynamodb"


const deleteoneenrollment: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const id = event.pathParameters
  const data = {
    TableName: "SEMSTABLE",
    Key: {
      id
    }
  }
  await deleteenrollment(data)
  return formatJSONResponse({

    Message: "enrollment deleted"
  });
}

export const main = middyfy(deleteoneenrollment);
