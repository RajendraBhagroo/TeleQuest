const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = validateRegisterInput = data => {
  let errors = {};
  let body = {};

  body.firstName = !isEmpty(data.firstName) ? data.firstName.trim() : "";
  body.lastName = !isEmpty(data.lastName) ? data.lastName.trim() : "";
  body.email = !isEmpty(data.email) ? data.email.trim().toLowerCase() : "";
  body.password = !isEmpty(data.password) ? data.password.trim() : "";
  body.password2 = !isEmpty(data.password2) ? data.password2.trim() : "";

  if (!Validator.isLength(body.firstName, { min: 2, max: 30 })) {
    errors.firstName = "First name must be between 2 and 30 characters";
  }

  if (!Validator.isLength(body.lastName, { min: 2, max: 30 })) {
    errors.lastName = "Last name must be between 2 and 30 characters";
  }

  if (!Validator.isAlpha(body.firstName)) {
    errors.firstName = "First name must only contain letters";
  }

  if (!Validator.isAlpha(body.lastName)) {
    errors.lastName = "Last name must only contain letters";
  }

  if (Validator.isEmpty(body.firstName)) {
    errors.firstName = "First name field is required";
  }

  if (Validator.isEmpty(body.lastName)) {
    errors.lastName = "Last name field is required";
  }

  if (Validator.isEmpty(body.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(body.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(body.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.contains(body.email, "@nyit.edu")) {
    errors.email = "Educational email is required [@nyit.edu]";
  }

  if (!Validator.isLength(body.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(body.password2)) {
    errors.password2 = "Confirm Password field is required";
  } else {
    if (!Validator.equals(body.password, body.password2)) {
      errors.password2 = "Passwords must match";
    }
  }

  return {
    errors,
    body,
    isValid: isEmpty(errors)
  };
};
