const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = validateCoursesEnrolledInInput = data => {
  let errors = {};
  let body = {};

  if (data.name) body.name = data.name;
  if (data.type) body.type = data.type;
  if (data.number) body.number = data.number;

  body.teacher = {};
  if (data.firstName) body.teacher.firstName = data.firstName;
  if (data.lastName) body.teacher.lastName = data.lastName;

  return {
    errors,
    body,
    isValid: isEmpty(errors)
  };
};
