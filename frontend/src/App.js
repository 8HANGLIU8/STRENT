import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login.js';
import SignUp from './pages/signup.js';
import Error404 from './pages/error404.js';
import Home from './pages/Home.js';
import Welcome from './pages/Welcome.js';
import ApartListings from './pages/ApartListings.js';
import Messages from './pages/messages.js';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/" />} /> {/* redirect */}
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/ApartListings" element={<ApartListings />} />
      </Routes>
    </Router>
  );
}

export default App;