const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/", (req, res) => {
  res.render("pages/index.ejs");
});

module.exports = router;
