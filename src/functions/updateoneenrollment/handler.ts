import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { updateenrollment } from "../../common/dynamodb"


const updateoneenrollment: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const data = event.body
  const { id } = event.pathParameters

  const newdata = {
    TableName: "SEMSTABLE",
    Key: {
      id,
    },
    UpdateExpression:
      'SET courseid = :courseid,  studentid = :studentid, dateofassigment = :dateofassigment',
    ExpressionAttributeValues: {
      ':courseid': data.courseid,
      ':studentid': data.studentid,
      ':dateofassigment': data.dateofassigment,
    },
    ReturnValues: 'ALL_NEW',
  }
  const ReturnedUpdatedData = await updateenrollment(newdata)
  return formatJSONResponse({

    body: ReturnedUpdatedData,
    message: "enrollment updated"

  });
}
export const main = middyfy(updateoneenrollment);
