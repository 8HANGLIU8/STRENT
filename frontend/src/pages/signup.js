import React, { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    institution: '',
    role: 'Tenant',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    } 
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (!response.ok) {
        alert(result.message);
        return;
      }
      console.log('Success:', result);
      alert('Account created successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create account.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgb(56,124,160)] p-6">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-6" style={{ color: "rgb(56,124,160)" }}>Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
        <select
            name="role"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Tenant">Tenant</option>
            <option value="Landlord">Landlord</option>
          </select>

          {formData.role === "Tenant" && (
            <input
            type="text"
            name="institution"
            placeholder="Institution"
            required
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          )}

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            required
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          
          
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            onChange={handleChange}
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
