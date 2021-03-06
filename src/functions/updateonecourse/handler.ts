import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { updatecourse } from "../../common/dynamodb";

const updateonecourse: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    const data = event.body;
    const { id } = event.pathParameters;

    const newdata = {
      TableName: "SEMSTABLE",
      Key: {
        id,
      },
      UpdateExpression:
        "set coursecode = :coursecode,  coursetitle = :coursetitle, CH = :CH",
      ConditionExpression: "attribute_exists(id)",
      ExpressionAttributeValues: {
        ":coursecode": data.coursecode,
        ":coursetitle": data.coursetitle,
        ":CH": data.CH,
      },
      ReturnValues: "ALL_NEW",
    };
    const ReturnedUpdatedData = await updatecourse(newdata);
    return formatJSONResponse({
      body: ReturnedUpdatedData,
      // message: "course updated",
    });
  };
export const main = middyfy(updateonecourse);
