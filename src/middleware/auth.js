const jwt = require("jsonwebtoken");
const User = require("../models/user");
const jwtKey = process.env.JWT_KEY;

const auth = async (req, res, next) => {
  try {
    let token;
    if (req.query.token !== undefined) {
      token = req.query.token;
      console.log(token);
    } else {
      token = req.header("Authorization").replace("Bearer ", "");
    }
    const decoded = jwt.verify(token, jwtKey);
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
    if (!user) throw new Error("User does not exists");
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(404).render("pages/error", { e: "Invalid token" });
  }
};

module.exports = auth;
