const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = validateExperienceInput = data => {
  let errors = {};
  let body = {};

  if (data.title) body.title = data.title;
  if (data.company) body.company = data.company;
  if (data.location) body.location = data.location;
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
