import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext';
import TenantHome from './pages/TenantHome';
import LandlordHome from './pages/LandlordHome';
import Welcome from './pages/Welcome';
import Login from './pages/login';
import SignUp from './pages/signup';
import Navbar from './components/Navbar';
import Error404 from './pages/error404';
import Profile from './pages/Profile';
import Properties from './pages/Properties';
import ApartListings from './pages/ApartListings';
import { UserProvider } from './context/UserContext';
import Messages from './pages/messages.js';

// Child component to handle routes with access to user context
function RoutesWithUser() {
  const { user } = useUser(); // Now safe to call useUser() inside UserProvider

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            user.userType === 'landlord' ? (
              <LandlordHome />
            ) : user.userType === 'tenant' ? (
              <TenantHome />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/ApartListings" element={<ApartListings />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <UserProvider>
      <RoutesWithUser />
    </UserProvider>
  );
}

export default App;