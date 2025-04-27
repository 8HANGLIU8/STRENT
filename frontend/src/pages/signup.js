import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Tenant',
    institution: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const quebecUniversities = [
    "Bishop’s University",
    "Concordia University",
    "École de technologie supérieure",
    "École nationale d’administration publique",
    "École des hautes études commerciales de Montréal (HEC Montréal)",
    "Institut national de la recherche scientifique",
    "McGill University",
    "Polytechnique Montréal",
    "Université de Montréal",
    "Université de Sherbrooke",
    "Université du Québec à Chicoutimi",
    "Université du Québec à Montréal",
    "Université du Québec à Rimouski",
    "Université du Québec à Trois-Rivières",
    "Université du Québec en Abitibi-Témiscamingue",
    "Université du Québec en Outaouais",
    "Université Laval",
    "Université TÉLUQ"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'age') {
      if (value === '') {
        setFormData((prevData) => ({
          ...prevData,
          age: ''
        }));
        return;
      }

      const parsedAge = parseInt(value, 10);
      if (isNaN(parsedAge) || parsedAge <= 0) {
        setError('Age must be a positive integer');
        return;
      }

      setError('');
      setFormData((prevData) => ({
        ...prevData,
        age: parsedAge
      }));
    } else if (name === 'role') {
      setFormData((prevData) => ({
        ...prevData,
        role: value,
        institution: value === 'Landlord' ? '' : prevData.institution
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const requiredFields = [
      'firstName',
      'lastName',
      'age',
      'email',
      'password',
      'confirmPassword',
      'role'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
        return;
      }
    }

    if (formData.role === 'Tenant' && !formData.institution) {
      setError('Please select an institution');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.age || formData.age <= 0) {
      setError('Please enter a valid age (positive integer)');
      return;
    }

    console.log('Data being sent to backend:', {
      ...formData,
      age: formData.age,
      ageType: typeof formData.age
    });

    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: formData.age
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              step="1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Tenant">Tenant/Student</option>
              <option value="Landlord">Landlord</option>
            </select>
          </div>
          {formData.role === 'Tenant' && (
            <div className="mb-4">
              <label className="block text-gray-700">Institution</label>
              <select
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select an institution</option>
                {quebecUniversities.map((university, index) => (
                  <option key={index} value={university}>
                    {university}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600 text-sm">
          Already have an account? <a href="/login" className="text-[rgb(56,124,160)] hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;