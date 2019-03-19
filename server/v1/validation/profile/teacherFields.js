const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = validateTeacherFieldsInput = data => {
  let errors = {};
  let body = {};

  if (data.name) body.name = data.name;
  if (data.type) body.type = data.type;
  if (data.number) body.number = data.number;

  body.students = {};
  if (data.firstName) body.students.firstName = data.firstName;
  if (data.lastName) body.students.lastName = data.lastName;
  if (data.studentId) body.students.studentId = data.studentId;

  return {
    errors,
    body,
    isValid: isEmpty(errors)
  };
};
