const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = validateExperienceInput = data => {
  let errors = {};
  let body = {};

  // Populate

  body.title = !isEmpty(data.title) ? data.title.trim() : "";
  body.company = !isEmpty(data.company) ? data.company.trim() : "";
  body.location = !isEmpty(data.location) ? data.location.trim() : "";
  body.from = !isEmpty(data.from) ? data.from : "";
  body.to = !isEmpty(data.to) ? data.to : "";
  body.isCurrent = !isEmpty(data.isCurrent) ? data.isCurrent : false;
  body.description = !isEmpty(data.description) ? data.description.trim() : "";

  // Validate

  if (Validator.isEmpty(body.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(body.company)) {
    errors.company = "Company field is required";
  }

  if (Validator.isEmpty(body.location)) {
    errors.location = "Location field is required";
  }

  if (Validator.isEmpty(String(body.from))) {
    errors.from = "From date field is required";
  }

  if (!Validator.isLength(body.description, { min: 0, max: 280 })) {
    errors.description = "Description needs to be below 280 characters";
  }

  // Checks If [to] and [from] dates are equal
  if (
    Validator.equals(String(body.to), String(body.from)) &&
    String(body.to) != "" &&
    String(body.from) != ""
  ) {
    errors.dates =
      "the Starting date cannot equal the ending date, please enter valid dates";
  }

  // Checks If [to] Date Is After Current Date
  if (
    Validator.isAfter(
      String(body.to),
      String(String(new Date().toISOString().slice(0, 10)))
    )
  ) {
    errors.to =
      "You have specified a date in the future, if this is correct please check the [current] field";
  }

  // Checks If [from] Date Is After Current Date
  if (
    Validator.isAfter(
      String(body.from),
      String(String(new Date().toISOString().slice(0, 10)))
    )
  ) {
    errors.from =
      "You have specified a date in the future, please enter a valid date";
  }

  // Checks To See If [from] Date Is Before [Current Date - 125 Years]. Oldest Human Was 122 Years.
  if (
    Validator.isBefore(
      String(body.from),
      String(
        new Date(new Date().getFullYear() - 125, 1, 1)
          .toISOString()
          .slice(0, 10)
      )
    )
  ) {
    errors.from = "Please enter a more recent date";
  }

  // Checks If [to] Date Is Before [from] Date
  if (Validator.isBefore(String(body.to), String(body.from))) {
    errors.to = "Ending date cannot be before starting date";
  }

  return {
    errors,
    body,
    isValid: isEmpty(errors)
  };
};
