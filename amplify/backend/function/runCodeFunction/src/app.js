/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const http = require("http");
const https = require("https");
const SERVER_IP = "13.213.0.95";

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**********************
 * Example get method *
 **********************/

/**
 * Compile code and run it
 *
 * json:
 * {
 *  "code": string of source code,
 *  "language": string of language (JAVA, PYTHON, C, CPP),
 *  "input": string of input,
 *  "expected": string of expected output
 * }
 */

app.post("/compile", function (req, res) {
  // Add your code here
  if (
    req.body?.code == undefined ||
    req.body?.language == undefined ||
    req.body?.input == undefined ||
    req.body?.expected == undefined
  ) {
    res.status(400).json({ message: "Invalid request" });
    return;
  }
  axios
    .post("http://" + SERVER_IP + ":8080/compiler/json", {
      input: req.body.input,
      sourceCode: req.body.code,
      language: req.body.language,
      expectedOutput: req.body.expected,
      timeLimit: 15,
      memoryLimit: 500,
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    });
  // res.json({ success: "get call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
