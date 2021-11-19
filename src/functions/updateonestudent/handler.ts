import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { updateOneStudent } from "../../common/dynamodb"


const updateStudent: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const data = event.body
  const { id } = event.pathParameters

  const newdata = {
    TableName: "SEMSTABLE",
    Key: {
      id,
    },
    UpdateExpression:
      'SET #name = :name, email = :email, age = :age, dob = :dob',
    ExpressionAttributeValues: {
      ':name': data.name,
      ':email': data.email,
      ':age': data.age,
      ':dob': data.dob,
    },
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ReturnValues: 'ALL_NEW',
  }
  console.log(newdata, "hfjkhskdfhhgfhsdgfjgj");

  const ReturnedUpdatedData = await updateOneStudent(newdata)
  return formatJSONResponse({

    body: ReturnedUpdatedData,
    message: "student updated"

  });
}
export const main = middyfy(updateStudent);
