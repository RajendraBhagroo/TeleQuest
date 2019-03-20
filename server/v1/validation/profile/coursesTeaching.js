const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = validateCoursesTeachingInput = data => {
  let errors = {};
  let body = {};

  // Populate

  body.name = !isEmpty(data.name) ? data.name.trim() : "";
  body.type = !isEmpty(data.type) ? data.type.trim() : "";
  body.number = !isEmpty(data.number) ? data.number : "";

  body.students = {};
  body.students.firstName = !isEmpty(data.firstName)
    ? data.firstName.trim()
    : "";
  body.students.lastName = !isEmpty(data.lastName) ? data.lastName.trim() : "";
  body.students.studentId = !isEmpty(data.studentId) ? data.studentId : "";

  // Validate

  if (Validator.isEmpty(body.type)) {
    errors.type = "Course type is required";
  }

  if (Validator.isEmpty(String(body.number))) {
    errors.number = "Course number is required";
  }

  if (Validator.isEmpty(body.students.lastName)) {
    errors.lastName = "Students last name is required";
  }

  if (Validator.isEmpty(String(body.students.studentId))) {
    errors.studentId = "Students Id number is required";
  }

  if (!Validator.isLength(body.name, { min: 0, max: 280 })) {
    errors.name = "Course name needs to be below 280 characters";
  }

  if (!Validator.isLength(body.type, { min: 0, max: 30 })) {
    errors.type = "Course type needs to be below 30 characters";
  }

  return {
    errors,
    body,
    isValid: isEmpty(errors)
  };
};
