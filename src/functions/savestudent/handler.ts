import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { saveData } from "../../common/dynamodb"
import { v4 } from 'uuid';
const savestudent: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const body = event.body
  const studentid = "st-" + v4();

  const data = {
    TableName: "SEMSTABLE",
    Item: {
      name: body.name,
      email: body.email,
      age: body.age,
      dob: body.dob,
      id: studentid,
    }
  }

  const response = await saveData(data)

  return formatJSONResponse({
    message: response


  })



}

export const main = middyfy(savestudent);
