import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
<<<<<<< HEAD
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Error404 from './pages/ErrorPage';
=======
import Home from './pages/Home'
import Welcome from './pages/Welcome';
import Login from './pages/login';
import SignUp from './pages/signup';
import Navbar from './components/Navbar'; // Add this import
import Error404 from './pages/error404';
>>>>>>> 8c3ecb75b7d30d42ee7320c8de84e8d6d917af27

function App() {
  return (
    <Router>
      <Navbar /> {/* Add the Navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
        <Route path="/" element={<Navigate to="/" />} /> {/* redirect */}
        <Route path="*" element={<Error404 />} />
=======
        <Route path="/welcome" element={< Welcome/>} />
        <Route path="/404" element={< Error404/>} />
        <Route path="*" element={<Navigate to="/404" />} />
        
>>>>>>> 8c3ecb75b7d30d42ee7320c8de84e8d6d917af27
      </Routes>
    </Router>
  );
}

export default App;