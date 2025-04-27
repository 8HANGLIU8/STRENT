import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import apartmentsData from '../data/apartments.json';

function Home() {
  const [apartments, setApartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setApartments(apartmentsData);
  }, []);

  const filteredApartments = apartments.filter((apartment) =>
    apartment.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold">Hello, Student!</h1>
        <p className="text-lg mt-2">Explore rentals on Strent</p>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Main Content: Map and List */}
      <div className="flex flex-col md:flex-row">
        {/* Map Interface (Left) */}
        <div className="w-full md:w-1/2 h-96 md:h-screen">
          <MapContainer
            center={[40.7128, -74.0060]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredApartments.map((apartment) => (
              <Marker key={apartment.id} position={[apartment.lat, apartment.lng]}>
                <Popup>
                  <div>
                    <h3 className="font-bold">{apartment.title}</h3>
                    <p>{apartment.location}</p>
                    <p>${apartment.price}/month</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* List Interface (Right) */}
        <div className="w-full md:w-1/2 p-4 overflow-y-auto h-96 md:h-screen">
          {filteredApartments.length > 0 ? (
            filteredApartments.map((apartment) => (
              <div
                key={apartment.id}
                className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center"
              >
                <img
                  src={apartment.image || 'https://via.placeholder.com/150'}
                  alt={apartment.title}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold">{apartment.title}</h3>
                  <p className="text-gray-600">{apartment.location}</p>
                  <p className="text-green-600 font-semibold">${apartment.price}/month</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No apartments found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;