import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { createenrollment } from "../../common/dynamodb";
import { v4 } from "uuid";
const createnewenrollment: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    const body = event.body;
    const enrollementid = "en-" + v4();
    const data = {
      TableName: "SEMSTABLE",
      Item: {
        courseid: body.courseid,
        studentid: body.studentid,
        dateofassigment: body.dateofassigment,
        id: enrollementid,
      },
    };

    const response = await createenrollment(data);

    return formatJSONResponse({
      body: response,
    });
  };

export const main = middyfy(createnewenrollment);
