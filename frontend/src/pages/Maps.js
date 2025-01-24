import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../Photos/heroimage.png';

const Maps = () => {
  // Placeholder data simulující mapy
  const maps = [
    { id: 1, name: 'Mapa 1', difficulty: 'Easy', waves: 22 },
    { id: 2, name: 'Mapa 2', difficulty: 'Medium', waves: 30 },
    { id: 3, name: 'Mapa 3', difficulty: 'Hard', waves: 40 },
    { id: 4, name: 'Mapa 4', difficulty: 'Easy', waves: 25 },
    { id: 5, name: 'Mapa 5', difficulty: 'Medium', waves: 35 },
  ];

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

      {/* Hero Image */}
      <div className="flex-grow relative h-[65vh] bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h1 className="text-8xl font-bold text-textSecondary font-nowharehouse">MAPS</h1>
              </div>
            </div>

      {/* Maps List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-6">
        {maps.map((map) => (
          <div
            key={map.id}
            className="bg-secondaryBackground rounded-lg shadow-lg p-4 text-center hover:bg-accent transition-colors"
          >
            <h2 className="text-xl font-bold text-textPrimary">{map.name}</h2>
            <p className="text-textSecondary">Obtížnost: <span className="text-accent">{map.difficulty}</span></p>
            <p className="text-textSecondary">Počet wavek: {map.waves}</p>
            <div className="mt-4 flex justify-around">
              <Link
                to={`/play/${map.id}`}
                className="bg-accent text-textSecondary px-4 py-2 rounded-md hover:bg-textSecondary hover:text-accent"
              >
                Hrát
              </Link>
              <Link
                to={`/leaderboard/${map.id}`}
                className="bg-textPrimary text-background px-4 py-2 rounded-md hover:bg-error hover:text-textSecondary"
              >
                Leaderboard
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Maps;