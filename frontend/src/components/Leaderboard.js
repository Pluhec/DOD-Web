import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Leaderboard = () => {
    const { mapId } = useParams(); // Získání map_id z URL
    const [leaderboard, setLeaderboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nickname, setNickname] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const token = localStorage.getItem('authToken');
                console.log('Token from localStorage:', token);

                if (!token) { 
                    setError('Nebyl nalezen žádný autentizační token.');
                    setLoading(false);
                    return;
                }

                const response = await axios.post(
                    'http://localhost:3000/api/maps/leaderboard',
                    { id: mapId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Přidání tokenu do hlavičky
                        },
                    }
                );

                const leaderboardData = response.data;

                // Fetch nicknames for each statistic type
                const fetchNicknames = async (entries) => {
                    return Promise.all(
                        entries.map(async (entry) => {
                            try {
                                const nicknameResponse = await axios.post(
                                    'http://localhost:3000/api/user/get-nickname',
                                    { id: entry.id }, // Změna klíče z "id" na "user_id"
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    }
                                );
                                return { ...entry, nickname: nicknameResponse.data.nickname };
                            } catch (err) {
                                console.error('Error fetching nickname:', err);
                                return { ...entry, nickname: 'Unknown' };
                            }
                        })
                    );
                };

                const topMoney = await fetchNicknames(leaderboardData.topMoney);
                const topKills = await fetchNicknames(leaderboardData.topKills);
                const topWaves = await fetchNicknames(leaderboardData.topWaves);
                const bestTime = await fetchNicknames(leaderboardData.bestTime);

                setLeaderboard({ topMoney, topKills, topWaves, bestTime });
            } catch (err) {
                console.error('Error fetching leaderboard:', err);
                setError('Nepodařilo se načíst leaderboard.');
            } finally {
                setLoading(false);
            }
        };

        const fetchNickname = async () => {
            try {
                const token = localStorage.getItem('authToken');
                console.log('Token from localStorage for nickname:', token);

                if (!token) {
                    setError('Nebyl nalezen žádný autentizační token pro získání přezdívky.');
                    return;
                }

                const response = await axios.post(
                    'http://localhost:3000/api/user/get-nickname',
                    { id: mapId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setNickname(response.data.nickname); // Uložení přezdívky uživatele
            } catch (err) {
                console.error('Error fetching nickname:', err);
                setError('Nepodařilo se načíst přezdívku.');
            }
        };

        fetchLeaderboard();
        fetchNickname();
    }, [mapId]);

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-2xl text-gray-600">Načítání dat...</p>
            </div>
        );
    if (error)
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-2xl text-red-600">{error}</p>
            </div>
        );

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
        
            <h1 className="text-4xl font-extrabold text-center mb-6 text-textSecondary mt-32">Leaderboard</h1>
            {leaderboard && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-5">
                    <div className="bg-secondaryBackground p-4 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-textSecondary">Top Money</h2>
                        {leaderboard.topMoney.map((player, index) => (
                            <p key={index} className="text-lg text-gray-600">
                                <span className="font-bold text-textSecondary">{player.nickname}</span> - {player.money} coins
                            </p>
                        ))}
                    </div>
                    <div className="bg-secondaryBackground p-4 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-textSecondary">Top Kills</h2>
                        {leaderboard.topKills.map((player, index) => (
                            <p key={index} className="text-lg text-gray-600">
                                <span className="font-bold text-textSecondary">{player.nickname}</span> - {player.kills} kills
                            </p>
                        ))}
                    </div>
                    <div className="bg-secondaryBackground p-4 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-textSecondary">Top Waves</h2>
                        {leaderboard.topWaves.map((player, index) => (
                            <p key={index} className="text-lg text-gray-600">
                                <span className="font-bold text-textSecondary">{player.nickname}</span> - {player.waves} waves
                            </p>
                        ))}
                    </div>
                    <div className="bg-secondaryBackground p-4 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-textSecondary">Best Time</h2>
                        {leaderboard.bestTime.map((player, index) => (
                            <p key={index} className="text-lg text-gray-600">
                                <span className="font-bold text-textSecondary">{player.nickname}</span> - {player.time} seconds
                            </p>
                        ))}
                    </div>
                </div>
            )}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-error transition-colors"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default Leaderboard;