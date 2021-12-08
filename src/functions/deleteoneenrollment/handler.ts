import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { deleteenrollment } from "../../common/dynamodb";

const deleteoneenrollment: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    const { id } = event.pathParameters;
    const data = {
      TableName: "SEMSTABLE",
      Key: {
        id,
      },
      ConditionExpression: "attribute_exists(id)",
    };
    const response = await deleteenrollment(data);
    return formatJSONResponse({
      body: response,
    });
  };

export const main = middyfy(deleteoneenrollment);
