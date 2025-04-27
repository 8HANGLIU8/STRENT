import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function RoommatePreferences() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [preferredGender, setPreferredGender] = useState(user?.preferredGender || 'Any');
  const [smokingPreference, setSmokingPreference] = useState(user?.smokingPreference || 'No Preference');
  const [sleepSchedule, setSleepSchedule] = useState(user?.sleepSchedule || 'No Preference');
  const [cleanlinessLevel, setCleanlinessLevel] = useState(user?.cleanlinessLevel || 'No Preference');
  const [socialPreference, setSocialPreference] = useState(user?.socialPreference || 'No Preference');
  const [studyHabits, setStudyHabits] = useState(user?.studyHabits || 'No Preference');
  const [petPreference, setPetPreference] = useState(user?.petPreference || 'No Preference');
  const [alcoholPreference, setAlcoholPreference] = useState(user?.alcoholPreference || 'No Preference');
  const [dietaryPreference, setDietaryPreference] = useState(user?.dietaryPreference || 'No Preference');
  const [noiseTolerance, setNoiseTolerance] = useState(user?.noiseTolerance || 'No Preference');
  const [programOfStudy, setProgramOfStudy] = useState(user?.programOfStudy || 'No Preference');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700">Please log in to view this page.</p>
      </div>
    );
  }

  const handleSavePreferences = async () => {
    try {
      const response = await fetch('http://localhost:3001/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          preferredGender,
          smokingPreference,
          sleepSchedule,
          cleanlinessLevel,
          socialPreference,
          studyHabits,
          petPreference,
          alcoholPreference,
          dietaryPreference,
          noiseTolerance,
          programOfStudy
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Update the user context with the new preferences
        setUser({
          ...user,
          preferredGender,
          smokingPreference,
          sleepSchedule,
          cleanlinessLevel,
          socialPreference,
          studyHabits,
          petPreference,
          alcoholPreference,
          dietaryPreference,
          noiseTolerance,
          programOfStudy
        });
        alert('Preferences updated successfully!');
        // Redirect to the profile page after saving
        navigate('/profile');
      } else {
        alert(data.message || 'Failed to update preferences');
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
      alert('Error connecting to the server');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4 h-screen">
        <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
        <ul className="space-y-2">
          <li>
            <Link
              to="/profile"
              className="block w-full text-left p-2 rounded-lg bg-gray-600 hover:bg-gray-700"
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="/roommate-preferences"
              className="block w-full text-left p-2 rounded-lg bg-gray-600 hover:bg-gray-700"
            >
              Roommate Preferences
            </Link>
          </li>
          <li>
            <Link
              to="/billing-info"
              className="block w-full text-left p-2 rounded-lg bg-gray-600 hover:bg-gray-700"
            >
              Billing Info
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-4">
        <h1 className="text-3xl font-bold mb-4">Roommate Preferences</h1>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Roommate Preferences</h2>
          <p className="text-gray-600 mb-4">
            Set your preferences for finding the perfect roommate.
          </p>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Preferred Gender</label>
              <select
                value={preferredGender}
                onChange={(e) => setPreferredGender(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Any">Any</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Smoking Preference</label>
              <select
                value={smokingPreference}
                onChange={(e) => setSmokingPreference(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="No Preference">No Preference</option>
                <option value="Non-Smoker">Non-Smoker</option>
                <option value="Smoker">Smoker</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Sleep Schedule</label>
              <select
                value={sleepSchedule}
                onChange={(e) => setSleepSchedule(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="No Preference">No Preference</option>
                <option value="Early Riser">Early Riser</option>
                <option value="Night Owl">Night Owl</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Cleanliness Level</label>
              <select
                value={cleanlinessLevel}
                onChange={(e) => setCleanlinessLevel(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="No Preference">No Preference</option>
                <option value="Very Clean">Very Clean</option>
                <option value="Moderately Clean">Moderately Clean</option>
                <option value="Relaxed">Relaxed</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Social Preference</label>
              <select
                value={socialPreference}
                onChange={(e) => setSocialPreference(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="No Preference">No Preference</option>
                <option value="Very Social">Very Social</option>
                <option value="Moderately Social">Moderately Social</option>
                <option value="Prefers Privacy">Prefers Privacy</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Study Habits</label>
              <select
                value={studyHabits}
                onChange={(e) => setStudyHabits(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="No Preference">No Preference</option>
                <option value="Needs Silence">Needs Silence</option>
                <option value="Can Study with Noise">Can Study with Noise</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Pet Preference</label>
              <select
                value={petPreference}
                onChange={(e) => setPetPreference(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="No Preference">No Preference</option>
                <option value="Loves Pets">Loves Pets</option>
                <option value="Okay with Pets">Okay with Pets</option>
                <option value="No Pets">No Pets</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Alcohol/Party Preference</label>
              <select
                value={alcoholPreference}
                onChange={(e) => setAlcoholPreference(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="No Preference">No Preference</option>
                <option value="No Drinking/Partying">No Drinking/Partying</option>
                <option value="Occasional Drinking/Partying">Occasional Drinking/Partying</option>
                <option value="Frequent Partying">Frequent Partying</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Dietary Preference</label>
              <select
                value={dietaryPreference}
                onChange={(e) => setDietaryPreference(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="No Preference">No Preference</option>
                <option value="Vegetarian/Vegan">Vegetarian/Vegan</option>
                <option value="No Dietary Restrictions">No Dietary Restrictions</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Noise Tolerance</label>
              <select
                value={noiseTolerance}
                onChange={(e) => setNoiseTolerance(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="No Preference">No Preference</option>
                <option value="Prefers Quiet">Prefers Quiet</option>
                <option value="Tolerates Noise">Tolerates Noise</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Program of Study</label>
              <select
                value={programOfStudy}
                onChange={(e) => setProgramOfStudy(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="No Preference">No Preference</option>
                <option value="Engineering">Engineering</option>
                <option value="Medicine">Medicine</option>
                <option value="Life Sciences">Life Sciences</option>
                <option value="Law">Law</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleSavePreferences}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Save Preferences
            </button>
          </form>
          <Link to="/home" className="text-blue-500 hover:underline mt-4 block">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoommatePreferences;