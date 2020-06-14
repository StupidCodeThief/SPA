const express = require("express");
const router = express.Router();

// @route GET api/users
// @desc test route
// @access public

router.get("/", (req, res) => {
  res.send("users route");
});

module.exports = router;
