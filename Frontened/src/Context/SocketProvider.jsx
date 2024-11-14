import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './Authprovider';
import io from "socket.io-client";
import { useParams } from 'react-router-dom';

// Create a context for the socket
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    
    const { user } = useContext(AuthContext);
   

    useEffect(() => {
        if (user) {
            // Initialize socket connection
            const newSocket = io("http://localhost:3000", {
                query: { userId: user.user._id ,
                        },  // Send user ID to the server
            });

            setSocket(newSocket);

            // Listen for when users come online
            newSocket.on("user-online", (data) => {
                setOnlineUsers(prevUsers => [...prevUsers, data.userId]);
            });

            // Listen for when users go offline
            newSocket.on("user-offline", (data) => {
                setOnlineUsers(prevUsers => prevUsers.filter(index => index !== data.userId));
            });


            // Clean up the connection on unmount
            return () => {
                newSocket.disconnect();
            };
        }
    }, [user]);

  

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}> {/* Pass sendMessage to context */}
            {children}
        </SocketContext.Provider>
    );
};

// Custom hook to use socket context
export const useSocket = () => {
    return useContext(SocketContext);
};

