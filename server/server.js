const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

require("./passport")(passport);

// Routes
const users = require(`./routes/api/${process.env.ROUTE_VERSION}/users`);
const profile = require(`./routes/api/${process.env.ROUTE_VERSION}/profile`);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// Database Configuration
mongoose
  .set("useCreateIndex", true)
  .connect(process.env.MONGO_DB_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use(`/api/${process.env.ROUTE_VERSION}/users`, users);
app.use(`/api/${process.env.ROUTE_VERSION}/profile`, profile);

// Run Server
const host = process.env.HOST || `127.0.0.1`;
const port = process.env.NODE_PORT || 3001;

app.listen(port, () => console.log(`Server running on http://${host}:${port}`));
