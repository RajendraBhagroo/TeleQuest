const config = require("../config/config.development");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

require("./passport")(passport);

// Routes
const users = require("./routes/api/v1/users");
const profile = require("./routes/api/v1/profile");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// Database Configuration
mongoose
  .set("useCreateIndex", true)
  .connect(config.mongodb_uri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/v1/users", users);
app.use("/api/v1/profile", profile);

// Run Server
const host = config.host;
const port = process.env.PORT || config.node_port;

app.listen(port, () => console.log(`Server running on http://${host}:${port}`));
