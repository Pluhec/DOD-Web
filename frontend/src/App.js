import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Maps from './pages/Maps';
import Profile from './pages/Profile';

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/maps" element={<Maps />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
