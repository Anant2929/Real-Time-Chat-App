import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSocket } from '../../Context/SocketProvider'; // Import the useSocket hook

export default function Message() {
  const [messages, setMessages] = useState([]);
  const { socket } = useSocket(); // Access socket from context
  const { id } = useParams(); // Receiver ID
  console.log("Receiver ID is and message:", id);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/message/get/${id}`); // Fetch messages for the given ID
      console.log("Fetched messages:", response.data);
      setMessages(response.data); // Set messages state
    } catch (error) {
      console.log("Error fetching messages:", error.message);
    }
  };

  useEffect(() => {
    // Fetch messages from the backend
    fetchMessages();

    // Listen for incoming messages from the socket
    socket.on('receive-message', (newMessage) => {
      console.log("Received message:", newMessage);
      setMessages(prevMessages => [...prevMessages, newMessage]); // Add the new message to the messages state
      console.log("text ", newMessage.text);
    });

    // Cleanup socket listener on component unmount
    return () => {
      socket.off('receive-message');
    };
  }, [id, socket]);

  return (
    <div className="flex flex-col w-full h-screen bg-[#F5F5DC]">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          message.reciverID === id ? ( // Check if message is for this receiver
            <div className="chat chat-end mb-4" key={message._id}> {/* Received message */}
              <div className="bg-[#DAA520] text-white p-3 rounded-lg max-w-xs">{message.text}</div>
            </div>
          ) : (
            <div className="chat chat-start mb-4" key={message._id}> {/* Sent message */}
              <div className="bg-[#333] text-white p-3 rounded-lg max-w-xs">{message.text}</div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}


