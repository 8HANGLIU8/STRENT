import React from "react";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[rgb(56,124,160)] text-white text-center p-6">
      <h1 className="text-9xl font-extrabold mb-6">404</h1>
      <h2 className="text-3xl font-bold mb-4">Oops! You hit a wall.</h2>
      <p className="text-lg mb-8">This page went on vacation... try going back home!</p>
      <img 
        src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif" 
        alt="Funny 404" 
        className="w-80 h-80 rounded-xl shadow-lg mb-6" 
      />
      <Link 
        to="/login" 
        className="mt-4 px-6 py-3 bg-white text-[rgb(56,124,160)] font-semibold rounded-lg hover:bg-gray-200 transition-all"
      >
        Take me back to safety
      </Link>
    </div>
  );
}
