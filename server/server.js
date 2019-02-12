// Libraries
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");

// Config
const config = require("../config/config.development.js");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database Configuration
mongoose
  .connect(config.mongodb_uri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);

// Run Server
const host = config.host;
const port = process.env.PORT || config.node_port;

app.listen(port, () => console.log(`Server running on http://${host}:${port}`));
