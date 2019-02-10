// Libraries
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database Configuration
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Run Server
const host = "localhost";
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on http://${host}:${port}`));
