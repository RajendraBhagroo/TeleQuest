const express = require("express");
const router = express.Router();

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/", (req, res) => res.json({ msg: "User Test Route" }));

module.exports = router;
