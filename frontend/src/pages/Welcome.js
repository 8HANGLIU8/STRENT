import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 flex flex-col items-center p-6 overflow-y-auto">
      <motion.div 
        className="max-w-3xl w-full text-center space-y-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Main Title */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-lg">
            Welcome to <span className="text-blue-600">Strent</span>
          </h1>
          <p className="mt-4 text-gray-700 text-lg font-medium">
            Find your perfect roommate and affordable student housing.
          </p>
        </motion.div>

        {/* Login/Signup Buttons */}
        <motion.div 
          className="flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-full text-white text-base shadow-md hover:scale-105 transform"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-500 hover:bg-green-600 transition px-5 py-2 rounded-full text-white text-base shadow-md hover:scale-105 transform"
          >
            Sign Up
          </Link>
        </motion.div>

        {/* About Section */}
        <motion.div 
          className="text-left space-y-8 mt-12 bg-white p-8 rounded-2xl shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800">Why <span className="text-green-500">Strent</span>?</h2>
          <p className="text-gray-700">
            Strent is built for students who want affordable, trustworthy housing options. 
            We match you based on real lifestyle factors — no more guessing.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800">How It Works</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>🏫 Match based on program, age, ratings, and distance to school.</li>
            <li>💬 Chat instantly with potential roommates inside the app.</li>
            <li>🤖 Smart AI suggests the most compatible matches for you.</li>
            <li>💳 Easy billing and rent management in one place.</li>
          </ul>

          <h2 className="text-3xl font-semibold text-gray-800">Powered By</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>🍃 MongoDB database for fast, secure storage.</li>
            <li>🧠 AI matching and recommendation system.</li>
            <li>📩 Secure messaging system.</li>
            <li>💳 Integrated billing and payment features.</li>
          </ul>
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className="text-center text-gray-500 text-sm mt-12 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          © 2025 Strent. Built for students, by students.
        </motion.footer>
      </motion.div>
    </div>
  );
}

export default Welcome;
