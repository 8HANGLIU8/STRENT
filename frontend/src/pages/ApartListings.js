import React, { useState } from "react";

export default function RentForm() {
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

  //Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send data to the backend (API)
    const response = await fetch('http://localhost:3000/api/rent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Send form data as JSON
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div>
      <h2>Rent Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Number of Bedrooms:</label>
          <input
            type="number"
            name="bedroomnumber"
            value={formData.bedrooms}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Type of Rent:</label>
          <select
            name="rentType"
            value={formData.rentType}
            onChange={handleChange}
          >
            <option value="longterm">Long-term</option>
            <option value="shortterm">Short-term</option>
          </select>
        </div>
        <div>
          <label>Pet Friendly</label>
          <select
            name="petfriendly"
            value={formData.petfriendly}
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Wifi Included</label>
          <select
            name="wifi"
            value={formData.wifi}
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Smoking</label>
          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Parking</label>
          <select
            name="parking"
            value={formData.parking}
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Furnished</label>
          <select
            name="furnished"
            value={formData.furnished}
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Bathroom Number</label>
          <select
            type='number'
            name="bathroomnumber"
            value={formData.bathroomnumber}
            onChange={handleChange}
          >
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

