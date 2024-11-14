const mongoose = require("mongoose");
const Message = require("../models/message.model.js");
const Conversation = require("../models/conversation.model.js");

const sendMessage = async (req, res) => {
  const { Id: receiverId } = req.params;
  const { text } = req.body;
  const senderId = req.user._id; // Assuming req.user is authenticated user

  try {
    // Find or create a conversation
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        members: [senderId, receiverId],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderID: senderId,
      reciverID: receiverId,
      text: text,
    });

    // Add the message to the conversation
    conversation.messages.push(newMessage._id);

    // Save both the conversation and the message
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json({
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.log("Error in sending message", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMessage = async (req, res) => {
  const { Id: chatuser } = req.params;
  const senderId = req.user._id; // Assuming req.user is authenticated user

  try {
    // Find conversation between sender and chat user
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatuser] },
    }).populate("messages"); // Populate messages array with actual message documents

    // If no conversation exists, return an empty array
    console.log("con",conversation);
    if (!conversation) { 
      return res.status(200).json([]);
    }

    // Respond with the populated messages
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getting messages", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { sendMessage, getMessage };
