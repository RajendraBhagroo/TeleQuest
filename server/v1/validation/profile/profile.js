const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = validateProfieInput = (data, user) => {
  let errors = {};
  let body = {};

  body.user = user.id;
  if (data.handle) body.handle = data.handle.replace(" ", "");
  if (data.bio) body.bio = data.bio;
  if (data.isStudent) body.isStudent = data.isStudent;

  // Skills - Spilt into array
  if (typeof data.skills !== "undefined") {
    body.skills = data.skills.split(",");
  }

  // Social
  body.social = {};
  if (data.youtube) body.social.youtube = data.youtube;
  if (data.twitter) body.social.twitter = data.twitter;
  if (data.linkedin) body.social.linkedin = data.linkedin;
  if (data.facebook) body.social.facebook = data.facebook;
  if (data.instagram) body.social.instagram = data.instagram;
  if (data.github) body.social.github = data.github;

  // Student

  // Teacher

  return {
    errors,
    body,
    isValid: isEmpty(errors)
  };
};
