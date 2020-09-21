const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.get("/signup", (req, res) => {
  res.render("pages/signup");
});

router.post("/signup", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) throw new Error("Email Id already exists");
    user = new User(req.body);
    const token = await user.generateAuthToken();
    res.redirect("/user/profile?token=" + token);
  } catch (e) {
    res.status(404).render("pages/error", { e: e.message });
  }
});

module.exports = router;
