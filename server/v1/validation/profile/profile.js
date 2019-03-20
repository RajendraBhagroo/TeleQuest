const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = validateProfieInput = (data, user) => {
  let errors = {};
  let body = {};

  // Populate Body Object

  body.user = user.id;
  body.handle = !isEmpty(data.handle) ? data.handle.replace(" ", "") : "";
  body.isStudent = !isEmpty(data.isStudent) ? data.isStudent : false;
  body.bio = !isEmpty(data.bio) ? data.bio.trim() : "";
  body.skills = !isEmpty(data.skills) ? data.skills.trim() : "";

  body.social = {};
  body.social.youtube = !isEmpty(data.youtube)
    ? data.youtube.replace(" ", "")
    : "";
  body.social.twitter = !isEmpty(data.twitter)
    ? data.twitter.replace(" ", "")
    : "";
  body.social.linkedin = !isEmpty(data.linkedin)
    ? data.linkedin.replace(" ", "")
    : "";
  body.social.facebook = !isEmpty(data.facebook)
    ? data.facebook.replace(" ", "")
    : "";
  body.social.instagram = !isEmpty(data.instagram)
    ? data.instagram.replace(" ", "")
    : "";
  body.social.github = !isEmpty(data.github)
    ? data.github.replace(" ", "")
    : "";

  body.studentFields = {};
  body.studentFields.studentId = !isEmpty(data.studentId) ? data.studentId : "";

  body.teacherFields = {};
  body.teacherFields.teacherId = !isEmpty(data.teacherId) ? data.teacherId : "";

  // Run Validation

  if (Validator.isEmpty(body.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (!Validator.isLength(body.handle, { min: 0, max: 60 })) {
    errors.handle = "Handle needs to be below 60 characters";
  }

  if (!Validator.isLength(body.bio, { min: 0, max: 280 })) {
    errors.bio = "Bio needs to be below 280 characters";
  }

  if (Validator.isEmpty(body.skills)) {
    errors.skills = "Skills field is required";
  } else {
    // Split Skills Into Array
    if (typeof data.skills !== "undefined") {
      body.skills = data.skills.split(",");
    }
  }

  if (
    !isEmpty(String(body.studentFields.studentId)) &&
    !isEmpty(String(body.teacherFields.teacherId))
  ) {
    errors.id =
      "Cannot accept id for teacher and student. Please submit one discrete id for either student or teacher";
  }

  if (
    Boolean(body.isStudent) &&
    Validator.isEmpty(String(body.studentFields.studentId))
  ) {
    errors.studentId = "Students Id number is required";
  }

  if (
    Boolean(!body.isStudent) &&
    Validator.isEmpty(String(body.teacherFields.teacherId))
  ) {
    errors.teacherId = "Teachers Id number is required";
  }

  if (!isEmpty(body.youtube)) {
    if (!Validator.isURL(body.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(body.twitter)) {
    if (!Validator.isURL(body.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(body.linkedin)) {
    if (!Validator.isURL(body.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!isEmpty(body.facebook)) {
    if (!Validator.isURL(body.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(body.instagram)) {
    if (!Validator.isURL(body.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  if (!isEmpty(body.github)) {
    if (!Validator.isURL(body.github)) {
      errors.github = "Not a valid URL";
    }
  }

  if (!isEmpty(String(body.studentFields.studentId))) {
    if (
      !Validator.isNumeric(String(body.studentFields.studentId), {
        no_symbols: true
      })
    ) {
      errors.studentId = "Student Id must be numeric";
    }
  }
  if (!isEmpty(body.teacherFields.teacherId)) {
    if (
      !Validator.isNumeric(String(body.teacherFields.teacherId), {
        no_symbols: true
      })
    ) {
      errors.teacherId = "Teacher Id must be numeric";
    }
  }

  return {
    errors,
    body,
    isValid: isEmpty(errors)
  };
};
