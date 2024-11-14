import React, { createContext, useState, useEffect ,useContext } from "react";
import Cookies from "js-cookie";

// Create AuthContext
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cookie ,setcookie] = useState(null);
  const [frienddetail,setfrienddetail] = useState(null) ;

  // Function to load user data from localStorage or Cookies
  const loadUserFromLocalStorage = () => {
    const savedUser =localStorage.getItem("ChatAPP");
    setcookie(Cookies.get("token")) ;
    console.log("Setcookie" + setcookie) ;

    if (savedUser && savedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(savedUser); // Parse user data
        setUser(parsedUser); // Set user if valid data is found
        console.log("Loaded user:", parsedUser); // Log user data instead of setUser function
      } catch (error) {
        console.log("Error parsing user data:", error);
      }
    } else {
      setUser(null);
    }
  };

  // useEffect to load user data when the component mounts
  useEffect(() => {
    loadUserFromLocalStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser ,cookie ,frienddetail,setfrienddetail}}>
      {children}
    </AuthContext.Provider>
  );
}
export const userAuth = () => {
  return useContext(AuthContext);
};

