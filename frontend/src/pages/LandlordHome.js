import React, { useEffect, useState } from 'react';

export default function LandlordHome() {
  const [showText, setShowText] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    rentType: '',
    bedroomnumber: '',
    petfriendly: '',
    wifi: '',
    smoking: '',
    parking: '',
    bathroomnumber: '',
    furnished: ''
  });

  useEffect(() => {
    setTimeout(() => {
      setShowText(true);
    }, 300);

    setTimeout(() => {
      setShowNavbar(true);
    }, 1500);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormComplete = Object.values(formData).every(value => value !== '');
    if (!isFormComplete) {
      alert("Required to fill everything");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/rent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'rgb(8,20,42)' }}>
      {/* Main layout */}
      <div className="flex flex-1 relative">
        
        {/* Sidebar */}
        {showNavbar && (
          <div
            className={`absolute top-0 left-0 h-full bg-white shadow-lg p-6 flex flex-col space-y-6 transform transition-transform duration-1000 ease-out ${
              showNavbar ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{
              width: '16rem',
              fontFamily: '"Playfair Display", serif',
              marginTop: '0px',
            }}
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Dashboard</h2>
            <button 
              onClick={() => setShowForm(true)} 
              className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Add a property
            </button>
            <button 
              className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              My properties
            </button>
            <button 
              className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Messages
            </button>
            <button 
              className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Billing
            </button>
          </div>
        )}

        {/* Main region */}
        <div className="flex-1 flex items-center justify-center p-8">
          {showForm ? (
            // FORM SECTION
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl grid grid-cols-2 gap-6"
            >
              <h2 className="col-span-2 text-3xl font-bold text-center text-blue-900 mb-4">
                Add a New Property
              </h2>

              {/* Location */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                  required
                />
              </div>

              {/* Bedroom number */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Number of Bedrooms:</label>
                <input
                  type="number"
                  name="bedroomnumber"
                  value={formData.bedroomnumber}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                  required
                />
              </div>

              {/* Bathroom number */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Number of Bathrooms:</label>
                <input
                  type="number"
                  name="bathroomnumber"
                  value={formData.bathroomnumber}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                  required
                />
              </div>

              {/* Rent Type */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Type of Rent:</label>
                <select
                  name="rentType"
                  value={formData.rentType}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                  required
                >
                  <option value="">Select</option>
                  <option value="longterm">Long-term</option>
                  <option value="shortterm">Short-term</option>
                </select>
              </div>

              {/* Pet Friendly */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Pet Friendly:</label>
                <select
                  name="petfriendly"
                  value={formData.petfriendly}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                  required
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Wifi Included */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Wifi Included:</label>
                <select
                  name="wifi"
                  value={formData.wifi}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                  required
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Smoking Allowed */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Smoking Allowed:</label>
                <select
                  name="smoking"
                  value={formData.smoking}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                  required
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Parking */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Parking Available:</label>
                <select
                  name="parking"
                  value={formData.parking}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                  required
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Furnished */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Furnished:</label>
                <select
                  name="furnished"
                  value={formData.furnished}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                  required
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Buttons (perfectly aligned higher) */}
              <div className="col-span-2 flex justify-end items-center space-x-6 -mt-8">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-800 text-white py-3 px-8 rounded-xl transition text-lg font-semibold"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 hover:bg-gray-600 text-white py-3 px-8 rounded-xl transition text-lg font-semibold"
                >
                  Cancel
                </button>
              </div>

            </form>
          ) : (
            // WELCOME SECTION
            <div className="flex flex-1 items-center justify-center overflow-hidden">
              <div
                className={`transform transition-all duration-500 ease-out ${
                  showText ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
              >
                <h1
                  className="text-6xl md:text-7xl font-semibold text-center tracking-wider"
                  style={{
                    color: 'rgb(255,215,0)',
                    fontFamily: '"Playfair Display", serif',
                    lineHeight: '1.2',
                  }}
                >
                  Welcome, Landlord!
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
