import type { AWS } from "@serverless/typescript";

import savestudent from "@functions/savestudent";
import singleStudent from "@functions/getonestudent";
import deleteStudent from "@functions/deleteonestudent";
import updateStudent from "@functions/updateonestudent";
import createnewcourse from "@functions/createnewcourse";
import getonecourse from "@functions/getonecourse";
import deleteonecourse from "@functions/deleteonecourse";
import updateonecourse from "@functions/updateonecourse";
import createnewenrollment from "@functions/createnewenrollment";
import getoneenrollment from "@functions/getoneenrollment";
import deleteoneenrollment from "@functions/deleteoneenrollment";
import updateoneenrollment from "@functions/updateoneenrollment";
import getenrollmentlist from "@functions/getlistofenrollment";
import getcourseslist from "@functions/getlistofcourses";
import getstudentlist from "@functions/getlistofstudent";

const serverlessConfiguration: AWS = {
  service: "test-practice",
  frameworkVersion: "2",
  custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        migrate: true,
        seed: true,
      },
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
    },
  },
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "ap-east-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
  },
  resources: {
    Resources: {
      SEMSTABLE: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "SEMSTABLE",
          AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
          KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
          BillingMode: "PAY_PER_REQUEST",
        },
      },
    },
  },
  // import the function via paths
  functions: {
    savestudent,
    singleStudent,
    deleteStudent,
    updateStudent,
    createnewcourse,
    getonecourse,
    deleteonecourse,
    updateonecourse,
    createnewenrollment,
    getoneenrollment,
    deleteoneenrollment,
    updateoneenrollment,
    getenrollmentlist,
    getcourseslist,
    getstudentlist,
  },
};

module.exports = serverlessConfiguration;

// configuration of dynamodb with lsi
// resources: {
//   Resources: {
//     DatabaseResource: {
//       Type: "AWS::DynamoDB::Table",
//       Properties: {
//         TableName: "SEMSTable",
//         BillingMode: "PAY_PER_REQUEST",
//         AttributeDefinitions: [
//           {
//             AttributeName: "tableId",
//             AttributeType: "S",
//           },
//           {
//             AttributeName: "dataId",
//             AttributeType: "S",
//           },
//           {
//             AttributeName: "email",
//             AttributeType: "S",
//           },
//           {
//             AttributeName: "coursecode",
//             AttributeType: "S",
//           },
//         ],
//         KeySchema: [
//           {
//             AttributeName: "tableId",
//             KeyType: "HASH",
//           },
//           {
//             AttributeName: "dataId",
//             KeyType: "RANGE",
//           },
//         ],
//         LocalSecondaryIndexes: [
//           {
//             IndexName: "LocalIndexOfEmail",
//             KeySchema: [
//               // can change only sort key
//               {
//                 AttributeName: "tableId",
//                 KeyType: "HASH",
//               },
//               {
//                 AttributeName: "email",
//                 KeyType: "RANGE",
//               },
//             ],
//             Projection: {
//               ProjectionType: "ALL",
//             },
//           },
//           {
//             IndexName: "LocalIndexOfCourseCode",
//             KeySchema: [
//               // can change only sort key
//               {
//                 AttributeName: "tableId",
//                 KeyType: "HASH",
//               },
//               {
//                 AttributeName: "coursecode",
//                 KeyType: "RANGE",
//               },
//             ],
//             Projection: {
//               ProjectionType: "ALL",
//             },
//           },
//         ],
//       },
//     },
//   },
// },
