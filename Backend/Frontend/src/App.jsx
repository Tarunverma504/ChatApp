import React from "react";
import Left from "./home/left/Left";
import Right from "./home/right/Right";
import Logout from "./home/left1/logout";
import Signup from "./assets/components/Signup";
import Login from "./assets/components/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthProvider.jsx";
import toast, {Toaster} from "react-hot-toast";
export default function App() {
  const {authUser, setAuthUser} = useAuth();
  return (

    <>
      <Routes>
        <Route path="/" element={authUser ? (<div className="flex h-screen">
          <Logout />
          <Left />
          <Right />
          
          
        </div>) :
          (<Navigate to="/login" />)} />
        <Route path="/login" element={authUser? <Navigate to="/" /> :<Login />} />
        <Route path="/signup" element={authUser? <Navigate to="/" /> :<Signup />} />

      </Routes>
      <Toaster/>

    </>
  ) 
}