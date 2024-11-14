import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { AuthContext } from "../../Context/Authprovider";

export default function Users({ user }) {
  const navigate = useNavigate(); 
  const { setfrienddetail } = useContext(AuthContext);

  const handleClick = () => {
    if (user && user._id) {
      console.log("key is", user._id);
      setfrienddetail(user);
      navigate(`/sender/${user._id}`);
    } else {
      console.error("User data is not valid");
    }
  };

  console.log("user", user); 

  return (
    <div
      className="flex py-3 px-3 space-x-4 hover:bg-slate-700 duration-300 cursor-pointer mt-1"
      onClick={handleClick}
      role="button"
      tabIndex={0} // Make it focusable
      onKeyPress={(e) => e.key === 'Enter' && handleClick()} // Allow click with keyboard
    >
      <div className="avatar">
        <div className="w-12 rounded-full">
          <img
            src={
              user.avatar ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            alt={user.fullname || "User Avatar"}
          />
        </div>
      </div>

      <div>
        <h1 className="font-semibold">{user.fullname || "Unknown User"}</h1>
        <span className="text-gray-500">{user.email || "No Email"}</span>
      </div>
    </div>
  );
}
