import React from 'react';

function LandlordHome() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Welcome, Landlord!</h1>
      <p className="text-lg">Manage your properties on Strent</p>
      {/* Add landlord-specific features here */}
    </div>
  );
}

export default LandlordHome;