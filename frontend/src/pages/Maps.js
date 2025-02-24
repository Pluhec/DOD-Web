import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import heroImage from '../Photos/heroimage.png';

const Maps = () => {
  const [maps, setMaps] = useState([]); // State pro uložení dat o mapách
  const [loading, setLoading] = useState(true); // Indikátor načítání
  const [error, setError] = useState(null); // Chybový stav
  const [selectedMap, setSelectedMap] = useState(null); // Vybraná mapa

  useEffect(() => {
    // Načtení map z backendu
    const fetchMaps = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log('Token from localStorage:', token);

        if (!token) {
          setError('Nebyl nalezen žádný autentizační token.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:3000/api/maps/maps', {
          headers: {
            Authorization: `Bearer ${token}`, // Ověř formát
          },
        });

        setMaps(response.data); // Nastavení map do stavu
        setLoading(false); // Načítání ukončeno
      } catch (err) {
        console.error('Error fetching maps:', err);
        setError('Nepodařilo se načíst mapy.'); // Zobrazení chyby uživateli
        setLoading(false); // Načítání ukončeno i při chybě
      }
    };

    fetchMaps();
  }, []);

  const handlePlay = async (mapId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Nebyl nalezen žádný autentizační token.');
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/api/maps/play-map',
        { mapId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const mapData = response.data;
      setSelectedMap(mapData); // Uložení načtené mapy
      console.log('Map data received:', mapData);

      // Odešli mapu do Unity
      sendToUnity(mapData);
    } catch (err) {
      console.error('Error starting the map:', err);
      alert('Nepodařilo se spustit mapu.');
    }
  };

  const sendToUnity = (mapData) => {
    // Tady zavolejte funkci nebo API Unity pro načtení mapy
    console.log('Sending map to Unity:', mapData);
    // UnityIntegration.loadMap(mapData); // Příklad, závisí na implementaci
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

      {/* Hero Image */}
      <div className="flex-grow relative h-[65vh] bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-textSecondary font-nowharehouse">MAPS</h1>
        </div>
      </div>

      {/* Maps List */}
      <div className="p-6 mt-6">
        {loading && (
          <p className="text-textPrimary text-center text-xl">Načítání map...</p>
        )}
        {error && (
          <p className="text-error text-center text-xl">{error}</p>
        )}
        {!loading && !error && maps.length === 0 && (
          <p className="text-textPrimary text-center text-xl">Žádné mapy nebyly nalezeny.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            !error &&
            maps.map((map) => (
              <div
                key={map.id}
                className="bg-secondaryBackground rounded-lg shadow-lg p-4 text-center transition-colors"
              >
                <h2 className="text-xl font-bold text-textPrimary">{map.name}</h2>
                <p className="text-textSecondary">
                  Obtížnost: <span className="text-accent">{map.difficulty}</span>
                </p>
                <p className="text-textSecondary">Počet wavek: {map.waves}</p>
                <div className="mt-4 flex justify-around">
                  <button
                    onClick={() => handlePlay(map.id)}
                    className="bg-accent text-textSecondary px-4 py-2 rounded-md hover:bg-textPrimary hover:text-accent"
                  >
                    Hrát
                  </button>
                  <Link
                    to={`/leaderboard/${map.id}`}
                    className="bg-textPrimary text-background px-4 py-2 rounded-md hover:bg-accent hover:text-textSecondary"
                  >
                    Leaderboard
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Maps;