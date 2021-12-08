import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import {
  getenrollmentlist,
  getOneStudent,
  getcourse,
} from "../../common/dynamodb";

const enrollmentList: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    const enrollements = await getenrollmentlist();
    const response = [];

    for (const index in enrollements) {
      const courseid = enrollements[index].courseid;
      const studentid = enrollements[index].studentid;
      const dateofenrollment = enrollements[index].dateofassigment;

      const data = {
        TableName: "SEMSTABLE",
        Key: {
          id: studentid,
        },
      };

      const student = await getOneStudent(data);

      const studentname = student.Item.name;

      const coursedata = {
        TableName: "SEMSTABLE",
        Key: {
          id: courseid,
        },
      };

      const course = await getcourse(coursedata);

      const coursetitle = course.Item.coursetitle;

      response.push({
        studentname,
        coursetitle,
        dateofenrollment,
      });
    }

    return formatJSONResponse({
      message: "List of enrollment",
      body: response,
    });
  };

export const main = middyfy(enrollmentList);
