import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home'
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Bootcamps from './Pages/Bootcamps/Bootcamps';
import Profile from './Pages/Profile/Profile';
import CreateBootcamp from './Pages/CreateBootcamp/CreateBootcamp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/bootcamps" element={<Bootcamps />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/createbootcamp" element={<CreateBootcamp />} />
    </Routes>
  )
}

export default App;
