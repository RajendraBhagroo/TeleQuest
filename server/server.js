// Libraries
const express = require("express");
const mongoose = require("mongoose");

// Config
const config = require("../config/config.development.js");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database Configuration
mongoose
  .connect(config.mongodb_uri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Run Server
const host = config.host;
const port = process.env.PORT || config.node_port;

app.listen(port, () => console.log(`Server running on http://${host}:${port}`));

app.get("/", (req, res) => {
  res.status(200).json("TeleQuest Server Alive");
});
