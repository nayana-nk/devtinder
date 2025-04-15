const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error("All fields (firstName, lastName, emailId, and password) are required");
  }

  // Trim inputs to remove extra whitespace
  req.body.firstName = firstName.trim();
  req.body.lastName = lastName.trim();
  req.body.emailId = emailId.trim();
  req.body.password = password.trim();

  // Validate first name length
  if (firstName.length < 3 || firstName.length > 8) {
    throw new Error("First name must be between 3 and 8 characters");
  }

  // Validate email format
  if (!validator.isEmail(emailId)) {
    throw new Error("Please enter a valid email ID");
  }

  // Validate password strength
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough. It must contain at least one lowercase letter, one uppercase letter, one number, and one symbol.");
  }
};

module.exports = { validateSignupData };
