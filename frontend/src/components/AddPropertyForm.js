import React, { useState } from 'react';

function AddPropertyForm({ onClose }) {
  const [formData, setFormData] = useState({
    landlordName: '',
    location: '',
    rentType: 'longterm',
    bedroomnumber: 1,
    petfriendly: 'yes',
    wifi: 'yes',
    smoking: 'no',
    parking: 'yes',
    bathroomnumber: 1,
    furnished: 'no',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:3001/rent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess(result.message || 'Apartment added successfully!');
        // Reset form after successful submission
        setFormData({
          landlordName: '',
          location: '',
          rentType: 'longterm',
          bedroomnumber: 1,
          petfriendly: 'yes',
          wifi: 'yes',
          smoking: 'no',
          parking: 'yes',
          bathroomnumber: 1,
          furnished: 'no',
        });
        // Close the form after a short delay to show the success message
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError(result.message || 'Failed to add apartment');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add a Property</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          {/* Landlord Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Landlord Name</label>
            <input
              type="text"
              name="landlordName"
              value={formData.landlordName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Rent Type */}
          <div className="mb-4">
            <label className="block text-gray-700">Rent Type</label>
            <select
              name="rentType"
              value={formData.rentType}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="longterm">Longterm</option>
              <option value="shortterm">Shortterm</option>
            </select>
          </div>

          {/* Bedroom Number */}
          <div className="mb-4">
            <label className="block text-gray-700">Bedroom Number</label>
            <input
              type="number"
              name="bedroomnumber"
              value={formData.bedroomnumber}
              onChange={handleChange}
              min="1"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Pet Friendly */}
          <div className="mb-4">
            <label className="block text-gray-700">Pet Friendly</label>
            <select
              name="petfriendly"
              value={formData.petfriendly}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* WiFi */}
          <div className="mb-4">
            <label className="block text-gray-700">WiFi</label>
            <select
              name="wifi"
              value={formData.wifi}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Smoking */}
          <div className="mb-4">
            <label className="block text-gray-700">Smoking</label>
            <select
              name="smoking"
              value={formData.smoking}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Parking */}
          <div className="mb-4">
            <label className="block text-gray-700">Parking</label>
            <select
              name="parking"
              value={formData.parking}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Bathroom Number */}
          <div className="mb-4">
            <label className="block text-gray-700">Bathroom Number</label>
            <input
              type="number"
              name="bathroomnumber"
              value={formData.bathroomnumber}
              onChange={handleChange}
              min="1"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Furnished */}
          <div className="mb-4">
            <label className="block text-gray-700">Furnished</label>
            <select
              name="furnished"
              value={formData.furnished}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPropertyForm;