const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const app = express();
require(`./${process.env.SERVER_VERSION}/passport`)(passport);

let server = require("http").Server(app);
let io = require("socket.io").listen(server);
const connections = [];
let availablerooms = [];
let currentRoom = "";

// Routes
const users = require(`./${process.env.SERVER_VERSION}/routes/api/users`);
const profile = require(`./${process.env.SERVER_VERSION}/routes/api/profile`);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(cors());

// Database Configuration
mongoose
  .set("useCreateIndex", true)
  .connect(process.env.MONGO_DB_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use(`/api/${process.env.SERVER_VERSION}/users`, users);
app.use(`/api/${process.env.SERVER_VERSION}/profile`, profile);

// Run Servers
const host = process.env.HOST || `127.0.0.1`;
const socket_port = process.env.SOCKET_PORT || 3002;
const node_port = process.env.NODE_PORT || 3001;

app.listen(node_port, () =>
  console.log(`Node Server listening on http://${host}:${node_port}`)
);

server.listen(socket_port, () =>
  console.log(`Socket.io Server running on http://${host}:${socket_port}`)
);

// Establishing Socket.io server
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

const nameSpace = "NYIT";

/* @route   http://host:port/nameSpace
 * @params  {nameSpace}
 * @desc    opens up a socket.io socket for the specified route
 */
io.of(`/${nameSpace}`).on("connection", function(socket) {
  connections.push(socket);
  console.log(
    `Connected to ${nameSpace}, number of connections = ${connections.length}`
  );
  socket.emit(`Welcome to ${nameSpace}`);

  /* @route http://host:port/nameSpace/room
   * @params{room}
   * @desc joins or creates a room within the given nameSpace
   */
  socket.on("joinRoom", function(room) {
    if (availablerooms.includes(room)) {
      socket.join(room);
      currentRoom = room;
      return io.emit("success", `New User has joined ${room}`);
    } else {
      return socket.emit("err", "This room doesn't exist yet");
    }
  });

  /*@desc upon streaming, broadcasts stream to those in the room
   */
  socket.on("stream", function(data) {
    console.log("Recived Stream Event");
    console.log(data);
    io
      .of(`/${nameSpace}`)
      .in(currentRoom)
      .emit("streaming", data);
  });

  /*@desc on event new-class, socket will append the new class to
   * availablerooms then joins it
   */
  socket.on("newClass", function(data) {
    console.log("recieved newclass event");
    availablerooms.push(data);
    currentRoom=data;
    socket.join(data);
    io
    .of(`/${nameSpace}`)
    .in(currentRoom)
    .emit("success",`${data} room created`);
  });

  /*@desc on event currentClasses, socket emits the response of current available rooms
   * in the namespace
   */
  socket.on("currentClasses", function() {
    return socket.emit("avaiableCourse", availablerooms);
  });

  /* @route
   * @params
   * @desc disconnects user and returns them to the default room in the nameSpace
   */
  socket.on("disconnect", function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log(
      `Connection disconnected, number of connections ${connections.length}`
    );
    socket.join("/");
  });
});
