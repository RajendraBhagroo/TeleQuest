const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// Load Input Validation
const validateProfileInput = require("../../validation/profile/profile");
const validateEducationInput = require("../../validation/profile/education");
const validateExperienceInput = require("../../validation/profile/experience");
const validateCourseEnrolledInInput = require("../../validation/profile/courseEnrolledIn");
const validateCourseTeachingInput = require("../../validation/profile/courseTeaching");

/*
 * @route   GET /api/v1/profile/test
 * @desc    Tests Profile Route
 * @access  Public
 */
router.get("/test", (req, res) => {
  res.json({ msg: "Profile Test Route" });
});

/*
 * @route   GET /api/v1/profile
 * @desc    Return Current Users Profile
 * @access  Private
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["userName", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => {
        errors.profile = `Could Not Return Profile: ${err}`;
        res.status(404).json(errors);
      });
  }
);

/*
 * @route   POST /api/v1/profile
 * @params  {handle, bio, skills, youtube, twitter, linkedin, facebook, instagram, github, isStudent, studentId, teacherId}
 * @desc    Create Or Edit User Profile
 * @access  Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, body, isValid } = validateProfileInput(req.body, req.user);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: body },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        Profile.findOne({ handle: body.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
          new Profile(body)
            .save()
            .then(profile => res.status(201).json(profile));
        });
      }
    });
  }
);

/*
 * @route       GET /api/v1/profile/handle/:handle
 * @params URL  {handle}
 * @desc        Get Profile By Handle
 * @access      Public
 */
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["userName", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      errors.profile = `Could Not Return Profile By Handle: ${err}`;
      res.status(404).json(errors);
    });
});

/*
 * @route       GET /api/v1/profile/user/:user_id
 * @params URL  {user_id}
 * @desc        Get Profile By User ID
 * @access      Public
 */
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      errors.profile = `Could Not Return Profile By User Id: ${err}`;
      res.status(404).json(errors);
    });
});

/*
 * @route   POST /api/v1/profile/education
 * @params  {school, location, degree, fieldOfStudy, from, to, isCurrent, description}
 * @desc    Add Education Field To Profile
 * @access  Private
 */
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, body, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEducation = body;
      profile.education.unshift(newEducation);
      profile.save().then(profile => res.status(201).json(profile));
    });
  }
);

/*
 * @route   POST /api/v1/profile/experience
 * @params  {title, company, location, from, to, isCurrent, description}
 * @desc    Add Experience Field To Profile
 * @access  Private
 */
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, body, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExperience = body;
      profile.experience.unshift(newExperience);
      profile.save().then(profile => res.status(201).json(profile));
    });
  }
);

/*
 * @route   POST /api/v1/profile/courseEnrolledIn
 * @params  {name, type, number, firstName, lastName}
 * @desc    Add courseEnrolledIn Field [Student] To Profile
 * @access  Private
 */
router.post(
  "/courseEnrolledIn",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, body, isValid } = validateCourseEnrolledInInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newCourseEnrolledIn = body;
      profile.studentFields.coursesEnrolledIn.unshift(newCourseEnrolledIn);
      profile.save().then(profile => res.status(201).json(profile));
    });
  }
);

/*
 * @route   POST /api/v1/profile/courseTeaching
 * @params  {name, type, number, description}
 * @desc    Add courseTeaching Field [Teacher] To Profile
 * @access  Private
 */
router.post(
  "/courseTeaching",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, body, isValid } = validateCourseTeachingInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newCourseTeaching = body;
      profile.teacherFields.coursesTeaching.unshift(newCourseTeaching);
      profile.save().then(profile => res.status(201).json(profile));
    });
  }
);

/*
 * @route       DELETE /api/v1/profile/education/:edu_id
 * @params URL  {edu_id}
 * @desc        Delete Education Field From Profile
 * @access      Private
 */
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        profile.education = profile.education.filter(
          item => item.id != req.params.edu_id
        );
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => {
        errors.exp = `Could Not Remove Education By Id: ${err}`;
        res.status(404).json(errors);
      });
  }
);

/*
 * @route       DELETE /api/v1/profile/experience/:exp_id
 * @params URL  {exp_id}
 * @desc        Delete Experience Field From Profile
 * @access      Private
 */
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        profile.experience = profile.experience.filter(
          item => item.id != req.params.exp_id
        );
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => {
        errors.exp = `Could Not Remove Experience By Id: ${err}`;
        res.status(404).json(errors);
      });
  }
);

/*
 * @route       DELETE /api/v1/profile/courseEnrolledIn/:courseEnrolledIn_id
 * @params URL  {courseEnrolledIn_id}
 * @desc        Delete courseEnrolledIn Field From Profile
 * @access      Private
 */
router.delete(
  "/courseEnrolledIn/:courseEnrolledIn_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        profile.studentFields.coursesEnrolledIn = profile.studentFields.coursesEnrolledIn.filter(
          item => item.id != req.params.courseEnrolledIn_id
        );
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => {
        errors.exp = `Could Not Remove courseEnrolledIn Field By Id: ${err}`;
        res.status(404).json(errors);
      });
  }
);

/*
 * @route       DELETE /api/v1/profile/courseTeaching/:courseTeaching_id
 * @params URL  {courseTeaching_id}
 * @desc        Delete courseTeaching Field From Profile
 * @access      Private
 */
router.delete(
  "/courseTeaching/:courseTeaching_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        profile.teacherFields.coursesTeaching = profile.teacherFields.coursesTeaching.filter(
          item => item.id != req.params.courseTeaching_id
        );
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => {
        errors.exp = `Could Not Remove courseTeaching Field By Id: ${err}`;
        res.status(404).json(errors);
      });
  }
);

/*
 * @route       DELETE /api/v1/profile/:profile_id
 * @params URL  {user_id}
 * @desc        Delete Profile By Profile Id
 * @access      Private
 */
router.delete(
  "/:profile_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOneAndDelete({ _id: req.params.profile_id })
      .then(() => res.json({ success: true }))
      .catch(err => {
        errors.delete = `Profile Could not be deleted : ${err}`;
        res.status(400).json(errors);
      });
  }
);

/*
 * @route   DELETE /api/v1/profile
 * @desc    Delete User And Profile
 * @access  Private
 */
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
