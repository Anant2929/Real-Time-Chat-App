const mongoose = require("mongoose");
const {
  signup,
  login,
  logout,
  alluser
} = require("../controller/user.controller.js");

const Authenticateuser = require("../middleware/Authenicateuser");
const express = require("express");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/alluser",Authenticateuser,alluser)
module.exports = router;
