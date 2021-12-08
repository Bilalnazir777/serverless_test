import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { getcourselist } from "../../common/dynamodb";

const coursesList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const courses = await getcourselist();

  return formatJSONResponse({
    message: "List of courses",
    body: courses,
  });
};

export const main = middyfy(coursesList);
