import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { getenrollmentlist } from "../../common/dynamodb"


const enrollmentList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {


  const data = {
    TableName: "SEMSTABLE",
    ProjectionExpression: "coursetitle,studentid,dateofassigment",
    FilterExpression: "begins_with(id,:v)",
    ExpressionAttributeValues: {
      ":v": "en"
    }
  }



  const courses = await getenrollmentlist(data)

  return formatJSONResponse({
    message: "List of enrollment",
    body: courses,

  });
}

export const main = middyfy(enrollmentList);