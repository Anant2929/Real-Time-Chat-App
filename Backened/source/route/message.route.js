const mongoose = require("mongoose");
const {
  sendMessage,
  getMessage,
} = require("../controller/message.controller.js");

const express = require("express");
const Authenticateuser = require("../middleware/Authenicateuser.js");
const router = express.Router();

router.post("/send/:Id", Authenticateuser, sendMessage);
router.get("/get/:Id", Authenticateuser, getMessage);
module.exports = router;
