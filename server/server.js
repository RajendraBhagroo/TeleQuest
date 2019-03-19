const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

const app = express();
require(`./${process.env.SERVER_VERSION}/passport`)(passport);

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

// Run Server
const host = process.env.HOST || `127.0.0.1`;
const port = process.env.NODE_PORT || 3001;
app.listen(port, () => console.log(`Server running on http://${host}:${port}`));
