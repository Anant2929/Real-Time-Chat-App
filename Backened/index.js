const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const Connection = require("./source/DB/Db.js");
const { app, server } = require("./SocketIo/socket.js");
dotenv.config();
const userRoute = require("./source/route/user.route.js");
const messageRoute = require("./source/route/message.route.js");

const cookieparser = require("cookie-parser");

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const servers = async () => {
  try {
    await Connection();
    console.log("MONGODB IS connected Succesfully");
  } catch (error) {
    console.log("MONGODB IS Not connected Succesfully");
  }
};
servers();
app.use(cors());
app.use("/user", userRoute);
app.use("/message", messageRoute);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
