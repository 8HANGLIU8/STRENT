import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import SignUp from './pages/signup';
import Navbar from './components/Navbar'; // Add this import

function App() {
  return (
    <Router>
      <Navbar /> {/* Add the Navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/404" element={<div>404 - Page Not Found</div>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;