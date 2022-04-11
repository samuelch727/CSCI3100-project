/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
const app = express();
// const cors = require('cors')
// app.use(cors())
const server = require("http").Server(app);
const { Server } = require("socket.io");
// const eiows = require("eiows")
const io = new Server();
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use("/peerjs", peerServer);
// app.use(bodyParser.json())
// app.set('view engine', 'ejs')
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json("message");
});
// app.get('/:room', (req, res) => {
//   res.render('room', { roomId: req.params.room })
// })

// const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
// app.use(awsServerlessExpressMiddleware.eventContext())

// declare a new express app

// Enable CORS for all methods

/**********************
 * Example get method *
 **********************/

//  app.get('/:room', (req, res) => {
//   res.render('room', { roomId: req.params.room })
// })

io.on("connection", (socket) => {
  console.log("connected user");
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    //   socket.on('message', (message) => {
    //     //send message to the same room
    //     io.to(roomId).emit('createMessage', message)
    // });

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

server.listen(process.env.PORT || 3030, () => {
  console.log("server connected");
});

module.exports = app;
