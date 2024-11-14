import Cookies from "js-cookie";
import { RiLogoutCircleLine } from "react-icons/ri";

export default function Logout() {
  const handleLogout = () => {
    localStorage.removeItem("ChatAPP");
    Cookies.remove("token");
    console.log("Token removed");
    window.location.reload();
  };

  return (
<div className="h-[10vh] flex items-center justify-center">
  <RiLogoutCircleLine 
    onClick={handleLogout} 
    className="w-[40px] h-[40px] hover:bg-slate-600 rounded-full cursor-pointer p-2" 
  />
</div>

  );
}
