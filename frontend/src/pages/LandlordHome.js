import React, { useEffect, useState } from 'react';

export default function LandlordHome() {
  const [showText, setShowText] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowText(true);
    }, 300);

    setTimeout(() => {
      setShowNavbar(true);
    }, 2300);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'rgb(8,20,42)' }}>
      {/* Top bar */}

      {/* Main content below top bar */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        {showNavbar && (
          <div
            className={`absolute top-0 left-0 h-full bg-white shadow-lg p-6 flex flex-col space-y-6 transform transition-transform duration-1000 ease-out ${
              showNavbar ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{
              width: '16rem', // w-64
              fontFamily: '"Playfair Display", serif',
              marginTop: '0px', // No overlap
            }}
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Dashboard</h2>
            <button className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition"  style={{ fontFamily: 'Arial, sans-serif' }}>Add a property</button>
            <button className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition"  style={{ fontFamily: 'Arial, sans-serif' }}>My properties</button>
            <button className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition"  style={{ fontFamily: 'Arial, sans-serif' }}>Messages</button>
            <button className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition"  style={{ fontFamily: 'Arial, sans-serif' }}>Billing</button>
          </div>
        )}

        {/* Welcome text */}
        {!showNavbar && (
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <div
              className={`transform transition-all duration-1000 ease-out ${
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
  );
}
