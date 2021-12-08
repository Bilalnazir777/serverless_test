import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { deletecourse } from "../../common/dynamodb";

const deleteonecourse: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    const { id } = event.pathParameters;
    const data = {
      TableName: "SEMSTABLE",
      Key: {
        id,
      },
      ConditionExpression: "attribute_exists(id)",
    };
    const response = await deletecourse(data);
    return formatJSONResponse({
      body: response,
    });
  };

export const main = middyfy(deleteonecourse);
