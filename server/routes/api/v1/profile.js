const express = require("express");
const router = express.Router();

// @route   GET api/v1/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/", (req, res) => {
    res.json({ msg: "Profile Test Route" })});
  
  /*
   * @route   POST /api/v1/profile/register
   * @params  {name, email, password}
   * @desc    Register Profile
   * @access  Public
   */
  router.post("/register", (req, res) => {
    const errors = {};
  
    Profile.findOne({ user_id: req.body.user_id }).then(user => {
      if (user) {
        errors.user_id = "This user alraedy has a profile";
        return res.status(400).json(errors);
      } 
      else {
        
        const newProfile = new Profile({
          name: req.body.name,
          teacher: req.body.email,
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
  // @desc    Return Current User's School, classes enrolled in or teaching
  // @access  Private
  router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.json({
        teacher: req.profile.teacher,
        classesIn: req.profile.classesIn,
        classesTeaching: req.profile.classesTeaching,
        school: req.profile.school
      });
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
   * @params  {user_id}
   * @desc    Update a profile to enroll into classes
   * @access  Private
   */
  router.update(
    "/studentEnroll",
    passport.authenticate("jwt",{session:false}),
    (req, res) => {
      const errors= {};
      Profile.findOneAndUpdate(
        { user_id:req.parmas.user_id},
        {$push:{classesIn:req.paramas.class}})
      .then(()=>res.json.status(204).json(profile))
      .catch(err => {
        errors.update=`Could not update classes enrolled:${err}`;
        res.status(400).json(errors);
      });
    }
  );
  /*
   * @route   UPDATE /api/v1/profile/teachEnroll
   * @params  {user_id}
   * @desc    Update a profile's classes they're teaching
   * @access  Private
   */
  router.update(
    "/teacherEnroll",
    passport.authenticate("jwt",{session:false}),
    (req, res) => {
      const errors= {};
      Profile.findOneAndUpdate(
        { user_id:req.parmas.user_id},
        {$push:{classesTeaching:req.paramas.class}})
      .then(()=>res.json.status(204).json(profile))
      .catch(err => {
        errors.update=`Could not update classes enrolled:${err}`;
        res.status(400).json(errors);
      });
    }
  );
  
module.exports = router;
