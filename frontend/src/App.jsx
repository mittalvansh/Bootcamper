import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home'
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Bootcamps from './Pages/Bootcamps/Bootcamps';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bootcamps" element={<Bootcamps />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App;
