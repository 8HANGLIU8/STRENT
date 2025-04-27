import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-4xl mx-auto flex space-x-4">
        <Link to="/" className="text-lg font-semibold hover:underline">
          Strent
        </Link>
        <Link to="/home" className="text-lg hover:underline">
          Home
        </Link>
        <Link to="/login" className="text-lg hover:underline">
          Login
        </Link>
        <Link to="/signup" className="text-lg hover:underline">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;