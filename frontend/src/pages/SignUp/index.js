import React, { useState } from "react";

export default function SignUp() {
  const [role, setRole] = useState("Tenant");

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgb(56,124,160)] p-6">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-6" style={{ color: "rgb(56,124,160)" }}>Sign Up</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="number"
            placeholder="Age"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="text"
            placeholder="Institution"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Tenant">Tenant</option>
            <option value="Landlord">Landlord</option>
          </select>
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-[rgb(56,124,160)] text-white p-3 rounded-lg hover:bg-[rgb(46,104,140)] text-lg mt-4"
          >
            Create Account
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600 text-sm">
          Already have an account? <a href="/login" className="text-[rgb(56,124,160)] hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
}
