const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Token not provided");

    const decoded = jwt.verify(token, "DEV_TINDER@23");

    const user = await userModel.findById(decoded._id);
    if (!user) throw new Error("User not found");

    req.user = user;
    next();
  } catch {
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = { userAuth };
