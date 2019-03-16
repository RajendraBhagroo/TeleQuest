const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
  /*
   * @route   POST /api/v1/profile/register
   * @params  {isTeacher, user_id, school}
   * @desc    Register Profile
   * @access  Public
   */
router.post("/register", (req, res) => {
    const errors = {};
  
    Profile.findOne({ user_id: req.body.user_id }).then(user => {
      if (user) {
        errors.user_id = "This user already has a profile";
        return res.status(400).json(errors);
      } 
      else {
        
        const newProfile = new Profile({
          isTeacher: req.body.isTeacher,
          user_id: req.body.user_id,
          school: req.body.school  
        });
            newProfile
              .save()
              .then(profile => res.status(201).json(profile))
              .catch(err => {
                errors.user = `Profile could not be saved: ${err}`;
                res.status(400).json(errors);
              });
      }
    });
  });

  // @route   GET /api/v1/profile/current
  // @desc    Return Current Profiles's School, classes enrolled in or teaching
  // @access  Private
  router.get("/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.json(profile);
    }
  );
  
  /*
   * @route   DELETE /api/v1/profile/:user_id
   * @params  {user_id}
   * @desc    Delete Profile By User ID
   * @access  Private
   */
  router.delete(
    "/:user_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const errors = {};
      User.findOneAndDelete({ _id: req.params.user_id })
      Profile.findOneAndDelete({_id:req.params.user_id})
        .then(() => res.json({ success: true }))
        .catch(err => {
          errors.delete = `Could not be deleted : ${err}`;
          res.status(400).json(errors);
        });
    }
  );
   /*
   * @route   UPDATE /api/v1/profile/studentEnroll
   * @params  {user_id,class}
   * @desc    Update a profile to enroll into classes
   * @access  Private
   */
  router.post(
    "/studentEnroll",
    passport.authenticate("jwt",{session:false}),
    (req, res) => {
      const errors= {};
      Profile.findOneAndUpdate(
        { user_id:req.parmas.user_id},
        {$push:{classesIn:req.paramas.class}})
      .then(()=>res.json.status(204).json(profile))
      .catch(err => {
        errors.update=`Could not add class(s) to classesIn:${err}`;
        res.status(400).json(errors);
      });
    }
  );
  /*
   * @route   UPDATE /api/v1/profile/teachEnroll
   * @params  {user_id, class}
   * @desc    Update a profile's classes they're teaching
   * @access  Private
   */
  router.post(
    "/teacherEnroll",
    passport.authenticate("jwt",{session:false}),
    (req, res) => {
      const errors= {};
      Profile.findOneAndUpdate(
        { user_id:req.parmas.user_id},
        {$push:{classesTeaching:req.paramas.class}})
      .then(()=>res.json.status(204).json(profile))
      .catch(err => {
        errors.update=`Could not add class(s) to classesTeaching:${err}`;
        res.status(400).json(errors);
      });
    }
  );
  /*
   * @route   DELETE /api/v1/profile/studentDrop
   * @params  {user_id, class}
   * @desc    Update a profile's to drop a class they're enrolled in 
   * @access  Private
   */
  router.delete(
    "/studentDrop",
    passport.authenticate("jwt",{session:false}),
    (req, res) => {
      const errors= {};
      Profile.findOneAndUpdate(
        { user_id:req.parmas.user_id},
        { $pull: { classesIn: { $in: [req.paramas.class] }}})
      .then(()=>res.json.status(204).json(profile))
      .catch(err => {
        errors.update=`Could not drop class(s) from classesIn:${err}`;
        res.status(400).json(errors);
      });
    }
  );
    /*
   * @route   DELETE /api/v1/profile/teacherDrop
   * @params  {user_id, class}
   * @desc    Update a profile's to drop a class they're teaching
   * @access  Private
   */
  router.delete(
    "/teacherDrop",
    passport.authenticate("jwt",{session:false}),
    (req, res) => {
      const errors= {};
      Profile.findOneAndUpdate(
        { user_id:req.parmas.user_id},
        { $pull: { classesTeaching: { $in: [req.paramas.class] }}})
      .then(()=>res.json.status(204).json(profile))
      .catch(err => {
        errors.update=`Could not drop class(s) in classesTeaching:${err}`;
        res.status(400).json(errors);
      });
    }
  );
      /*
   * @route   POST /api/v1/profile/teacherStatUpdate
   * @params  {user_id, isTeacher}
   * @desc    Update a profile's teacher status
   * @access  Private
   */
  router.post(
    "/teacherStatUpdate",
    passport.authenticate("jwt",{session:false}),
    (req, res) => {
      const errors= {};
      Profile.findOneAndUpdate(
        { user_id:req.parmas.user_id},
        { isTeacher:req.params.isTeacher})
      .then(()=>res.json.status(204).json(profile))
      .catch(err => {
        errors.update=`Could not update teacher status:${err}`;
        res.status(400).json(errors);
      });
    }
  );
  
module.exports = router;
