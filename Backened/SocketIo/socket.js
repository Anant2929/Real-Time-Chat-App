const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

// Initialize socket.io server with CORS settings
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3001", // Use environment variable for flexibility
    methods: ["GET", "POST"],
  },
});

// This will hold connected users (userId -> socketId)
const onlineUsers = new Map();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId; // Get userId from the query params
  console.log(`User connected with socket id: ${socket.id}`);

  if (userId) {
    onlineUsers.set(userId, socket.id); // Mark user as online
    console.log(`User ${userId} is online`);

    // Notify all users that this user is online
    io.emit("user-online", { userId });
  }

  // Handle user disconnection
  socket.on("disconnect", () => {
    if (userId) {
      onlineUsers.delete(userId); // Remove user from online users map
      console.log(`User ${userId} disconnected`);

      // Notify all users that this user is offline
      io.emit("user-offline", { userId });
    }
  });

  // Handle message sending
  socket.on("send-message", (data) => {
    console.log(`Message from ${data.senderID} to ${data.receiverID}: ${data.text}`);

    const recipientSocketId = onlineUsers.get(data.senderID); // Get recipient's socket ID
        console.log("reci",recipientSocketId)
    if (recipientSocketId) {
      // Send the message to the recipient if they are online
      io.to(recipientSocketId).emit("receive-message", data
      );
    } else {
      console.log(`User ${data.receiverID} is offline`);
      // Handle if the recipient is offline (e.g., store message in database for later)
    }
  });
});

// Export the app and server for use in other files
module.exports = { app, io, server };

