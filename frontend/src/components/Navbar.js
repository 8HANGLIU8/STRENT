import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';

function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">Strent</Link>
      </div>
      <div className="flex space-x-4 items-center">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/signup" className="hover:underline">
          Sign Up
        </Link>
        <Link to="/profile">
          <UserCircleIcon className="h-8 w-8 text-white hover:text-gray-300" />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;