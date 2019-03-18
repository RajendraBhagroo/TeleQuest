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
 * @route   POST /api/profile
 * @params  {handle, bio, skills, youtube, twitter, linkedin, facebook, instagram, github, isStudent}
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
          new Profile(body).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

/*
 * @route   GET /api/profile/handle/:handle
 * @desc    Get Profile By Handle
 * @access  Public
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
 * @route   GET /api/profile/user/:user_id
 * @desc    Get Profile By User ID
 * @access  Public
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
 * @route   POST /api/profile/education
 * @params  {school, location, degree, fieldOfStudy, from, to, isCurrent, description}
 * @desc    Add Education To Profile
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
      profile.save().then(profile => res.json(profile));
    });
  }
);

/*
 * @route   POST /api/profile/experience
 * @params  {title, company, location, from, to, isCurrent, description}
 * @desc    Add Experience To Profile
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
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
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
 * @route   DELETE /api/profile/experience/:exp_id
 * @desc    Delete Experience From Profile
 * @access  Private
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

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
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
