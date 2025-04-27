import React, { useState } from "react";
import './style.css';


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

     // Check if all fields are filled
     const isFormComplete = Object.values(formData).every(value => value !== '');

     if (!isFormComplete) {
       alert("Required to fill everything");
       return;
     }
 
     //alert("Completed");

    // Send data to the backend (API)
    const response = await fetch('http://localhost:3001/rent', {
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
          <label>Number of Bathrooms: </label>
          <input
            type='number'
            name="bathroomnumber"
            value={formData.bathroomnumber}
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
            <option value="">Select</option>
            <option value="longterm">Long-term: </option>
            <option value="shortterm">Short-term: </option>
          </select>
        </div>
        <div>
          <label>Pet Friendly: </label>
          <select
            name="petfriendly"
            value={formData.petfriendly}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Wifi Included: </label>
          <select
            name="wifi"
            value={formData.wifi}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Smoking: </label>
          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Parking: </label>
          <select
            name="parking"
            value={formData.parking}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Furnished: </label>
          <select
            name="furnished"
            value={formData.furnished}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button type="submit" className="submitbutton">Submit</button>
      </form>
    </div>
  );
}

