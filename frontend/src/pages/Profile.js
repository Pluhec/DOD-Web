import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Odstranění tokenu z localStorage
    navigate('/'); // Přesměrování na domovskou stránku
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
          {/* Navigation */}
          <nav className="flex flex-col sm:flex-row justify-between items-center space-x-0 sm:space-x-4 bg-background p-4 shadow-md fixed top-0 left-0 right-0 z-10">
            <div className="mb-2 sm:mb-0 sm:mr-4">
              <Link to="/maps" className="flex items-center text-textPrimary transition-colors font-nowharehouse text-2xl">
                UNDEATH
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
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
        <div className="max-w-4xl mx-auto bg-secondaryBackground shadow-lg rounded-lg p-6">
          {/* Profile Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-textPrimary">John Doe</h1>
            <p className="text-lg mt-2 text-textSecondary">johndoe@example.com</p>
          </div>

          {/* Statistics Section */}
          <div className="mt-8">
            <h2 className="text-5xl font-semibold text-center text-white">Statistics</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 text-center">
              <div className="bg-accent p-4 rounded-md shadow-md">
                <p className="text-lg font-medium">Longest Playtime</p>
                <p className="text-2xl font-bold text-textSecondary">2 hours 45 minutes</p>
              </div>
              <div className="bg-accent p-4 rounded-md shadow-md">
                <p className="text-lg font-medium">Most Kills on a Map</p>
                <p className="text-2xl font-bold text-textSecondary">54</p>
              </div>
              <div className="bg-accent p-4 rounded-md shadow-md">
                <p className="text-lg font-medium">Most Coins Collected</p>
                <p className="text-2xl font-bold text-textSecondary">120</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-textSecondary px-6 py-3 rounded-md text-lg font-semibold cursor-pointer hover:bg-error transition-colors shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
