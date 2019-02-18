const express = require("express");
const router = express.Router();

// @route   GET api/v1/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/", (req, res) => res.json({ msg: "Profile Test Route" }));

module.exports = router;