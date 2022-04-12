/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
var aws = require("aws-sdk");
var db = new aws.DynamoDB();

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  let data = new Date();

  if (event.request.userAttributes.sub) {
    let params = {
      Item: {
        id: { S: event.request.userAttributes.sub },
        __typename: { S: "User" },
        username: { S: event.userName },
        email: { S: event.request.userAttributes.email },
        createdAt: { S: data.toISOString() },
        updatedAt: { S: data.toISOString() },
      },
      TableName: process.env.USERTABLE,
    };
    try {
      await db.putItem(params).promise();
      console.log("User written to DB");
    } catch (err) {
      console.log(err);
    }
    context.done(null, event);
  } else {
    console.log("No user written to DB");
    context.done(null, event);
  }

  return event;
};
