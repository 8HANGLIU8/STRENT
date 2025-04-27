import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Strent</h1>
        <p className="text-lg mb-6">
          Find the perfect student rental. Log in to start exploring!
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;