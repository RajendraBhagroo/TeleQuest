const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Load Models
const User = require("../../models/User");

// Load Input Validation
const validateRegisterInput = require("../../validation/users/register");
const validateLoginInput = require("../../validation/users/login");

/*
 * @route   GET /api/v1/users/test
 * @desc    Tests Users Route
 * @access  Public
 */
router.get("/test", (req, res) => {
  res.json({ msg: "User Test Route" });
});

/*
 * @route   POST /api/v1/users/register
 * @params  {firstName, lastName, email, password}
 * @desc    Register User
 * @access  Public
 */
router.post("/register", (req, res) => {
  const { errors, body, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        userName: `${body.firstName} ${body.lastName}`,
        email: body.email,
        avatar,
        password: body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.status(201).json(user))
            .catch(err => {
              errors.user = `User could not be saved: ${err}`;
              res.status(400).json(errors);
            });
        });
      });
    }
  });
});

/*
 * @route   GET /api/v1/users/login
 * @params  {email, password}
 * @desc    Login User & Return JWT Token
 * @access  Public
 */
router.post("/login", (req, res) => {
  const { errors, body, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find User By Email
  User.findOne({ email: body.email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(body.password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          avatar: user.avatar
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRE },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET /api/v1/users/current
// @desc    Return Current User
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      userName: req.user.userName,
      email: req.user.email
    });
  }
);

/*
 * @route       DELETE /api/v1/users/:user_id
 * @params URL  {user_id}
 * @desc        Delete User By User Id
 * @access      Private
 */
router.delete(
  "/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    User.findOneAndDelete({ _id: req.params.user_id })
      .then(() => res.json({ success: true }))
      .catch(err => {
        errors.delete = `User Could not be deleted : ${err}`;
        res.status(400).json(errors);
      });
  }
);

module.exports = router;
