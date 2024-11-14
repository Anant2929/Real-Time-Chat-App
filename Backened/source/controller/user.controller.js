const mongoose = require("mongoose");
const userSchema = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const { createTokenAndCookie } = require("../JWT/jasonwebtoken.js");

const signup = async (req, res) => {
  const {fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    console.log(fullname , email ,password)
    return res.status(400).json({ message: "All fields are required" });
    
  }
  try {
    const user = await userSchema.findOne({ email: email });

    if (user) {
      return res.status(200).json({ message: "User already registered" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new userSchema({
      fullname,
      email,
      password: hashpassword,
    });
    await newUser.save();
    if (newUser) {
      createTokenAndCookie(newUser._id, res);
      return res
        .status(201)
        .json({ message: "User registred successfully", newUser:{
          fullname: newUser.fullname,
          email: newUser.email,
          _id: newUser._id,
        }});
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("error :", error);
  }
};

const login = async (req, res) => {
  const { email,password } = req.body;
  console.log("password and email",password," ",email)
  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: "Invalid user credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if ( !isMatch) {
      return res.status(200).json({ message: "Invalid user credentials" });
    }

    createTokenAndCookie(user._id, res);
    res.status(201).json({
      message: "User Logged in Succesfully",
      user: {
        fullname: user.fullname,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("error :", error);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(201).json({ message: "User logged out succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("error :", error);
  }
};

const alluser = async(req,res)=>{
  try{
    // authenticste se login user ki id li 
    const userId = req.user._id;
    // all user me se logfin user ka data exclude kra and alluser ke data me se password bhi exclude kra ; 
    const alluser = await userSchema.find({ _id: { $ne: userId } }).select("-password") ;
    console.log("all user data send") ;
      res.json(alluser) ;
      

  }catch(error){
    res.status(500).json({ message: "Internal server error" });
    console.log("error in fetiching friend :", error);
  }
  }






module.exports = { signup, login ,logout, alluser};
