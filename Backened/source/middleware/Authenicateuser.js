const userSchema = require("../models/user.model");
const jwt = require('jsonwebtoken');  // Import jwt correctly

const Authenticateuser = async (req, res, next) => {
  try {
    // Token ko cookies se fetch karo
    const cookie = req.cookies.token;
    if(!cookie){
      return res.status(401).json({ message: "Authorization denied" });
    }

    // Token ko verify karo
    const verifiedUser = jwt.verify(cookie, process.env.JWT_TOKEN);
    if (!verifiedUser) {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    // Database se user ko find karo using user._id
    const user = await userSchema.findById(verifiedUser.userid).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found in DB" });
    }

    // User ko request object mein attach karo
    req.user = user;
    next();  // Move to the next middleware or route
  } catch (error) {
    console.log("error in authorization",error)
    res.status(401).json({ message: "Invalid token", error });
  }
};

module.exports = Authenticateuser