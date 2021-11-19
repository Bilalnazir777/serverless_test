import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { getstudentlist } from "../../common/dynamodb"


const studentList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {



  const student = await getstudentlist()

  return formatJSONResponse({
    message: "List of students",
    body: student,

  });
}

export const main = middyfy(studentList);