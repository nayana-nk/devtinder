const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies; // Ensure you have cookie-parser enabled in your server
    if (!token) throw new Error("Token not provided");

    const decoded = jwt.verify(token, "DEV_TINDER@23");
    const user = await User.findById(decoded._id);
    if (!user) throw new Error("User not found");

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = { userAuth };