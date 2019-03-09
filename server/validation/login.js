const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateLoginInput = data => {
  let errors = {};
  let body = {};

  body.email = !isEmpty(data.email) ? data.email.trim().toLowerCase() : "";
  body.password = !isEmpty(data.password) ? data.password.trim() : "";

  if (!Validator.isEmail(body.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(body.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(body.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    body,
    isValid: isEmpty(errors)
  };
};
