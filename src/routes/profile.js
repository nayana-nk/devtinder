const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileeditData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileeditData(req)) {
      return res.status(400).send("Invalid fields in request.");
    }

    const loggedInuser = req.user;
    // Update fields dynamically
    Object.keys(req.body).forEach((key) => {
      loggedInuser[key] = req.body[key];
    });
    await loggedInuser.save();
    res.json({
      message: `${loggedInuser.firstName}'s profile edited successfully`,
      data: loggedInuser,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = profileRouter;
