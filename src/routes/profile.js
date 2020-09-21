const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user");
const router = new express.Router();

router.get("/user/profile", auth, async (req, res) => {
  const list = [];
  req.user.list.forEach((listItem) => {
    if (listItem !== null) {
      list.push(listItem);
    }
  });
  const admins = [];
  const allUsers = await User.find({});
  allUsers.forEach((user) => {
    admins.push(user.email);
  });
  res.render("pages/profile", { list, token: req.token, admins });
});

router.post("/user/profile", auth, async (req, res) => {
  try {
    req.user.list.push(req.body.listData);
    await req.user.save();
    res.redirect("/user/profile?token=" + req.token);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
