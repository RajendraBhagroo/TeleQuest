const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = validateStudentInput = data => {
  let errors = {};
  let body = {};

  return {
    errors,
    body,
    isValid: isEmpty(errors)
  };
};
