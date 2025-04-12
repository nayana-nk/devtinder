const validator = require ("validator");

const validateSignupData = (req) => {

    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {

        throw new Error("First name or last name is missing");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Please enter a valid email ID");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }
};

module.exports = { validateSignupData, };
