import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between space-x-4 bg-background p-4 shadow-md fixed top-0 left-0 right-0 z-10">
        <div>
          <Link to="/maps" className="flex items-center text-textPrimary transition-colors font-nowharehouse text-2xl">
            UNDEATH
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/map-builder" className="flex items-center text-textPrimary hover:text-accent transition-colors">
            Create Map
          </Link>
          <Link to="/download" className="flex items-center text-textPrimary hover:text-accent transition-colors">
            Download
          </Link>
          <Link to="/profile" className="flex items-center text-textPrimary hover:text-accent transition-colors">
            Profile
          </Link>
        </div>
      </nav>

      {/* Profile Content */}
      <div className="flex-grow pt-20 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-6">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-accent"
            />
            <div>
              <h1 className="text-3xl font-bold text-textPrimary">John Doe</h1>
              <p className="text-gray-500">johndoe@example.com</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-textPrimary">Profile Details</h2>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">
                <strong>Joined:</strong> January 1, 2023
              </p>
              <p className="text-gray-700">
                <strong>Maps Created:</strong> 5
              </p>
              <p className="text-gray-700">
                <strong>Favorite Map:</strong> The Lost City
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex space-x-4">
            <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accentHover transition-colors">
              Edit Profile
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;