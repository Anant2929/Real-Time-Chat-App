import React, { useContext, useEffect, useState } from 'react'; // Import useEffect
import { AuthContext } from '../../Context/Authprovider';
import { useSocket } from '../../Context/SocketProvider';

export default function Chatuser() {
  const { frienddetail } = useContext(AuthContext);
  const { onlineUsers } = useSocket();  // Get online users from context
  const [isOnline, setIsOnline] = useState(false); // Track friend status

  // Effect to update online status
  useEffect(() => {
    setIsOnline(onlineUsers.includes(frienddetail._id)); // Check if friend is online

    // Optionally, you can listen for online/offline changes here if needed
  }, [onlineUsers, frienddetail._id]); // Dependencies

  return (
    <div className='flex item-center justify-center bg-slate-700 h-[8vh]'>
      <div className="flex py-3 px-3 space-x-4 items-center ">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="avatar" />
          </div>
        </div>

        <div>
          <h1 className="font-semibold">{frienddetail.fullname}</h1>
          <span className={`text-sm ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
    </div>
  );
}


