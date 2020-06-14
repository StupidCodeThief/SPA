const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const User = require("../User");

// @route POST api/users
// @desc registrate user
// @access public
router.post(
  "/",
  [
    check("name", "Name is reqered").not().isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check(
      "password",
      "Please emnter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = res.body;

    try {
      let user = await User.findOne({ email });
    } catch (error) {}

    res.send("users route");
  }
);

module.exports = router;
