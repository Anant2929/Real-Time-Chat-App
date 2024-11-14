import React, { useContext, useEffect, useState } from "react";
import Left from "./Componenet/Leftpart/left";
import Right from "./Componenet/Rightpart/Right";
import Signup from "./utility/Signup";
import Login from "./utility/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./Context/Authprovider";


export default function App() {
  const { user } = useContext(AuthContext);
  

 

  return (
    <>
      <Routes>
        {/* If user is not logged in, show signup page */}
        <Route path="/signup" element={ (<Signup/>)} />

        {/* If user is logged in, show the home page */}
        <Route
          path="/"
          element={ user ?
            (<div className="flex h-screen">
              <Left />
              <Right />
            </div>) : (<Navigate to="/login"/>)
        }
        
        />
<Route
          path="/sender/:id"
          element={ user ?
            (<div className="flex h-screen">
              <Left />
              <Right />
            </div>) : (<Navigate to="/"/>)
        }/>
        {/* If user is not logged in, show login page */}
        <Route path="/login" element={ (<Login/>)} />
      </Routes>

    </>
  );
}
