const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = validateEducationInput = data => {
  let errors = {};
  let body = {};

  if (data.school) body.school = data.school;
  if (data.degree) body.degree = data.degree;
  if (data.fieldOfStudy) body.fieldOfStudy = data.fieldOfStudy;
  if (data.from) body.from = data.from;
  if (data.to) body.to = data.to;
  if (data.isCurrent) body.isCurrent = data.isCurrent;
  if (data.description) body.description = data.description;

  return {
    errors,
    body,
    isValid: isEmpty(errors)
  };
};
