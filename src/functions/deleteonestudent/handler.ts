import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { deleteOneStudent } from "../../common/dynamodb";

const deleteStudent: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { id } = event.pathParameters;
  const data = {
    TableName: "SEMSTABLE",
    Key: {
      id,
    },
    ConditionExpression: "attribute_exists(id)",
  };
  const response = await deleteOneStudent(data);
  return formatJSONResponse({
    body: response,
  });
};

export const main = middyfy(deleteStudent);
