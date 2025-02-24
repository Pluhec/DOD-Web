import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Správný import

const Profile = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({ name: '', email: '' });

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Odstranění tokenu z localStorage
    navigate('/'); // Přesměrování na domovskou stránku
  };

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('authToken'); // JWT token z localStorage
      if (!token) {
        setError('Authentication token is missing. Please log in again.');
        navigate('/'); // Přesměruj uživatele na přihlašovací stránku
        return;
      }

      try {
        // Dekóduj JWT token a získej userId
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id; // Předpokládáme, že `id` je v tokenu

        if (!userId) {
          setError('User ID not found in the token. Please log in again.');
          navigate('/');
          return;
        }

        // Požadavek na API s userId
        const response = await axios.post(
          'http://localhost:3000/api/user/get-stats',
          { id: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Přidej JWT token do hlavičky pro případnou autorizaci
            },
          }
        );

        setStats(response.data);
        console.log('Stats:', response.data);
        setUser({ name: response.data.name, email: response.data.email });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to fetch user stats. Please try again.');
      }
    };

    fetchStats();
  }, [navigate]);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      {/* Navigace */}
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

      {/* Obsah Profilu */}
      <div className="flex-grow pt-20 px-6">
        <div className="max-w-4xl mx-auto bg-secondaryBackground shadow-lg rounded-lg p-6">
          {/* Hlavička Profilu */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-textPrimary">{user.name}</h1>
            <p className="text-lg mt-2 text-textSecondary">{user.email}</p>
          </div>

          {/* Sekce Statistik */}
          <div className="mt-8">
            <h2 className="text-5xl font-semibold text-center text-white">Statistics</h2>
            {error ? (
              <p className="text-red-500 text-center mt-4">{error}</p>
            ) : stats ? (
              <div className="mt-6 grid grid-cols-1 gap-4 text-center">
                <div className="bg-accent p-4 rounded-md shadow-md">
                  <p className="text-lg font-medium">Best Time</p>
                  <p className="text-2xl font-bold text-textSecondary">
                    {stats.best_time ? `${stats.best_time} seconds` : 'N/A'}
                  </p>
                </div>
                <div className="bg-accent p-4 rounded-md shadow-md">
                  <p className="text-lg font-medium">Best Waves</p>
                  <p className="text-2xl font-bold text-textSecondary">{stats.best_waves || 'N/A'}</p>
                </div>
                <div className="bg-accent p-4 rounded-md shadow-md">
                  <p className="text-lg font-medium">Most Coins Collected</p>
                  <p className="text-2xl font-bold text-textSecondary">{stats.best_money || 'N/A'}</p>
                </div>
                <div className="bg-accent p-4 rounded-md shadow-md">
                  <p className="text-lg font-medium">Most Kills</p>
                  <p className="text-2xl font-bold text-textSecondary">{stats.best_kills || 'N/A'}</p>
                  
                </div>
              </div>
            ) : (
              <p className="text-center text-textSecondary">Loading statistics...</p>
            )}
          </div>

          {/* Tlačítko pro Odhlášení */}
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