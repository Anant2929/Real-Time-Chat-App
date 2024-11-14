import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSocket } from "../../Context/SocketProvider";

export default function Type() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const { socket } = useSocket();

  const handleChange = (e) => {
    
    setText(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await axios.post(`/api/message/send/${id}`, { text });
      console.log("Message sent:", res.data);

      const newMessage = res.data.newMessage

      // Emit the message using socket.io
      socket.emit("send-message", newMessage);

      // Immediately update the messages state to include the new message
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log("messages",messages)
      setText(""); // Clear the input field
      
    } catch (error) {
      console.log("Error in sending text:", error.message);
    }
  };

  useEffect(() => {
    socket.on("receive-message", (messages) => {
      console.log("Received message:", messages);
      setMessages((prevMessages) => [...prevMessages, messages]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [socket]);
console.log("text")
  return (
    <div className="flex items-center space-x-4 h-[8vh] text-center bg-slate-700 p-2">
      <div className="w-[90%]">
        <input
          type="text"
          placeholder="Type here..."
          className="input input-bordered w-full"
          value={text}
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleClick(e);
            }
          }}
        />
      </div>
      <button className="hover:bg-slate-600 p-3 rounded" onClick={handleClick}>
        <IoSend className="text-3xl" />
      </button>
    </div>
  );
}
