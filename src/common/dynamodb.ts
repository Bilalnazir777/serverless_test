import * as AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
});

//getting all student list

export const getstudentlist = async () => {
  let studentlist;
  const List = await dynamodb
    .scan({
      TableName: "SEMSTABLE",
      ProjectionExpression: "#name,email,age,dob",
      ExpressionAttributeNames: { "#name": "name" },
      FilterExpression: "begins_with(id,:v)",
      ExpressionAttributeValues: {
        ":v": "st",
      },
    })
    .promise();
  studentlist = List.Items;
  return studentlist;
};
//getting all courses list

export const getcourselist = async () => {
  let courselist;
  const List = await dynamodb
    .scan({
      TableName: "SEMSTABLE",
      ProjectionExpression: "coursetitle,coursecode,CH",
      FilterExpression: "begins_with(id,:v)",
      ExpressionAttributeValues: {
        ":v": "cr",
      },
    })
    .promise();
  courselist = List.Items;
  return courselist;
};
//getting all enrollment list

export const getenrollmentlist = async () => {
  let enrollmentlist;
  const List = await dynamodb
    .scan({
      TableName: "SEMSTABLE",
      ProjectionExpression: "courseid,studentid,dateofassigment",
      FilterExpression: "begins_with(id,:v)",
      ExpressionAttributeValues: {
        ":v": "en",
      },
    })
    .promise();
  enrollmentlist = List.Items;
  return enrollmentlist;
};

///savinng student to db
export const saveData = async (data) => {
  const name = data.Item.name;

  const dbdata = await getstudentlist();

  let exist = false;
  for (let i = 0; i < dbdata.length; i++) {
    if (name === dbdata[i].name) {
      exist = true;
      break;
    }
  }
  if (exist) {
    return "Student already exist";
  } else {
    await dynamodb.put(data).promise();
    return data.Item;
  }
};

//getting one student byy id

export const getOneStudent = async (data) => {
  try {
    const singlestudent = await dynamodb.get(data).promise();
    return singlestudent;
  } catch (error) {
    return error;
  }
};

//delete student
export const deleteOneStudent = async (data) => {
  try {
    await dynamodb.delete(data).promise();
    return "student deleted";
  } catch (error) {
    return "student not found";
  }
};
//update an student
export const updateOneStudent = async (newdata) => {
  // console.log(newdata.name)
  // const name = newdata.Item.name
  // const dbdata = await getstudentlist()

  // let exist = false
  // for (let i = 0; i < dbdata.length; i++) {
  //     if (name === dbdata[i].name) {
  //         exist = true
  //         break
  //     }
  // }
  // if (exist) {
  //     return "Student already exist"
  // } else {
  //     await dynamodb.put(newdata).promise()
  //     return newdata.Item
  try {
    const DataToAdd = await dynamodb.update(newdata).promise();
    return DataToAdd;
  } catch (error) {
    return "not updated";
  }
};

//create course
export const createcourse = async (data) => {
  const coursetitle = data.Item.coursetitle;

  const dbdata = await getcourselist();

  let exist = false;
  for (let i = 0; i < dbdata.length; i++) {
    if (coursetitle === dbdata[i].coursetitle) {
      exist = true;
      break;
    }
  }
  if (exist) {
    return "course already exist/change course title";
  } else {
    try {
      await dynamodb.put(data).promise();
      return data.Item;
    } catch (error) {
      console.log(error);
      return "any of attribute missing";
    }
  }
};

//getting one course byy id

export const getcourse = async (data) => {
  try {
    const singlecourse = await dynamodb.get(data).promise();
    return singlecourse;
  } catch (error) {
    return error;
  }
};

//delete course
export const deletecourse = async (data) => {
  try {
    await dynamodb.delete(data).promise();
    return "course deleted";
  } catch (error) {
    return error;
  }
};
//update an course
export const updatecourse = async (newdata) => {
  try {
    const DataToAdd = await dynamodb.update(newdata).promise();
    return DataToAdd;
  } catch (error) {
    return "course not updated";
  }
};

//create enrollment
export const createenrollment = async (data) => {
  const studentid = data.Item.studentid;

  const dbdata = await getenrollmentlist();

  let exist = false;
  for (let i = 0; i < dbdata.length; i++) {
    if (studentid === dbdata[i].studentid) {
      exist = true;
      break;
    }
  }
  if (exist) {
    return "enrollment already exist/change studentid";
  } else {
    try {
      await dynamodb.put(data).promise();
      return data.Item;
    } catch (error) {
      return "any of the body attributes is not upto mark";
    }
  }
};
//getting one enrollment byy id

export const getenrollment = async (data) => {
  try {
    const singleenrollment = await dynamodb.get(data).promise();
    return singleenrollment;
  } catch (error) {
    console.log(error);

    return "enrollment not found";
  }
};
//delete enrollment
export const deleteenrollment = async (data) => {
  try {
    await dynamodb.delete(data).promise();
    return "enrollment deleted";
  } catch (error) {
    return "enrollment not deleted";
  }
};

//update an enrollment
export const updateenrollment = async (newdata) => {
  try {
    const DataToAdd = await dynamodb.update(newdata).promise();
    return DataToAdd;
  } catch (error) {
    return "enrollment not updated";
  }
};
