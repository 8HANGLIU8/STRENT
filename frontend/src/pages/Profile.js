import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Profile() {
  const { user, setUser } = useUser();
  const [activeSection, setActiveSection] = useState('my-profile');
  const [name, setName] = useState('Félix');
  const [age, setAge] = useState('20');
  const [institution, setInstitution] = useState(user.institution || 'McGill University');
  const [studyProgram, setStudyProgram] = useState('Physics');
  const [description, setDescription] = useState('I’m a physics student passionate about robotics and parkour.');

  const handleSave = () => {
    setUser({ ...user, institution });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'roommate-preferences':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Roommate Preferences</h2>
            <p className="text-gray-600 mb-4">
              Set your preferences for finding the perfect roommate.
            </p>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Preferred Gender</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Any</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Smoking Preference</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>No Preference</option>
                  <option>Non-Smoker</option>
                  <option>Smoker</option>
                </select>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Save Preferences
              </button>
            </form>
          </div>
        );
      case 'billing-info':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Billing Info</h2>
            <p className="text-gray-600 mb-4">
              Manage your payment methods and billing history.
            </p>
            <div className="mb-4">
              <p className="text-gray-700">No payment methods added.</p>
              <button className="text-blue-500 hover:underline">
                Add Payment Method
              </button>
            </div>
          </div>
        );
      case 'my-profile':
      default:
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">My Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Institution</label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Study Program</label>
                <input
                  type="text"
                  value={studyProgram}
                  onChange={(e) => setStudyProgram(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  rows="4"
                />
              </div>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-gray-800 text-white p-4 h-screen">
        <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveSection('my-profile')}
              className={`w-full text-left p-2 rounded-lg ${
                activeSection === 'my-profile' ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`}
            >
              My Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('roommate-preferences')}
              className={`w-full text-left p-2 rounded-lg ${
                activeSection === 'roommate-preferences' ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`}
            >
              Roommate Preferences
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('billing-info')}
              className={`w-full text-left p-2 rounded-lg ${
                activeSection === 'billing-info' ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`}
            >
              Billing Info
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-1 flex flex-col items-center p-4">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          {renderSection()}
          <Link to="/home" className="text-blue-500 hover:underline mt-4 block">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;