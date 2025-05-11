const validator = require("validator");
const bcrypt = require("bcrypt")
const { isEmail, isStrongPassword } = require("validator");


const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};
//validate profile edit data
const validateProfileeditData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "emailId", "age", "gender", "skills", "about"];

  const isEditAllowed = Object.keys(req.body).every((field) => {
    return allowedEditFields.includes(field);
  });

  return isEditAllowed;
};
const comparePasswords = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const validateNewPassword = (newPassword) => {
  if (!newPassword || typeof newPassword !== "string") {
    throw new Error("New password is required");
  }

  if (!validator.isStrongPassword(newPassword)) {
    throw new Error(
      "Password is not strong enough. It must contain at least one lowercase letter, one uppercase letter, one number, and one symbol."
    );
  }
};




module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
