const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createTokenAndCookie = (userid, res) => {
  const token = jwt.sign({ userid }, process.env.JWT_TOKEN);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};

module.exports = { createTokenAndCookie };
