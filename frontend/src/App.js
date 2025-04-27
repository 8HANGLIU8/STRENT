import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login.js';
import SignUp from './pages/signup.js';
import Error404 from './pages/error404.js';
import Home from './pages/Home.js';
import Welcome from './pages/Welcome.js';

function App() {
  return (
    <Router>
      <Navbar /> {/* Add the Navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/" />} /> {/* redirect */}
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;