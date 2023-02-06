import React from "react";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Bootcamps from "./Pages/Bootcamps/Bootcamps";
import Profile from "./Pages/Profile/Profile";
import CreateBootcamp from "./Pages/CreateBootcamp/CreateBootcamp";
import BootcampProfile from "./Pages/BootcampProfile/BootcampProfile";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bootcamps" element={<Bootcamps />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createbootcamp" element={<CreateBootcamp />} />
        <Route path="/bootcamp-profile/:id" element={<BootcampProfile />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
