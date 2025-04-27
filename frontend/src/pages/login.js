/*import React from "react";

export default function Login() { // not App anymore
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "rgb(56,124,160)" }}>
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6" style={{ color: "rgb(56,124,160)" }}>Login</h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-[rgb(56,124,160)] text-white p-3 rounded-lg hover:bg-[rgb(46,104,140)] text-lg"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account? <a href="/signup" className="text-[rgb(56,124,160)] hover:underline">Register</a>
        </div>
      </div>
    </div>
  );
}
*/

import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);

    
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login successful!');
      console.log(data);
    } else {
      alert('Login failed: ' + data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "rgb(56,124,160)" }}>
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6" style={{ color: "rgb(56,124,160)" }}>Login</h2>
        <form onSubmit={handleLogin}>
          
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            /*required*/
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-[rgb(56,124,160)] text-white p-3 rounded-lg hover:bg-[rgb(46,104,140)] text-lg"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account? <a href="/signup" className="text-[rgb(56,124,160)] hover:underline">Register</a>
        </div>
      </div>
    </div>
  );
}


