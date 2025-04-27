const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 8,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not a valid email: " + value);
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Not a strong password: " + value);
      }
    },
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum:{
      values:["male","female","other"],
      message: `{Value} is not a valid gender type`
    }
    // validate(value) {
    //   if (!["male", "female", "other"].includes(value)) {
    //     throw new Error("Gender data is not valid");
    //   }
    // },
  },
  skills: {
    type: [String],
    default: ["react", "node"],
  },
  about: {
    type: String,
    default: "This is the default about of the user",
  },
}, { timestamps: true });

// Pre-save hook to hash the password if modified
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Instance method to validate a password
userSchema.methods.validatePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

// Instance method to generate JWT for the user
userSchema.methods.getJWT = function () {
  return jwt.sign(
    { _id: this._id.toString() },
    "DEV_TINDER@23", // In production, move this secret to an environment variable.
    { expiresIn: "8h" }
  );
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
