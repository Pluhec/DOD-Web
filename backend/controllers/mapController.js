const sequelize = require('../config/database');
const Map = require('../models/Map')(sequelize, require('sequelize').DataTypes);
const MapRun = require('../models/MapRun')(sequelize, require('sequelize').DataTypes);

// Fetch all maps from the database
exports.getAllMaps = async (req, res) => {
    try {
        const maps = await Map.findAll({ attributes: ['id', 'name', 'difficulty', 'waves'] });
        res.status(200).json(maps);
    } catch (error) {
        console.error('Error fetching maps:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Fetch map data for playing based on map ID
exports.playMap = async (req, res) => {
    const { map_id } = req.body;

    if (!map_id) {
        return res.status(400).json({ error: 'map_id is required' });
    }

    try {
        const map = await Map.findByPk(map_id);
        
        if (!map) {
            return res.status(404).json({ error: 'Map not found' });
        }

        res.status(200).json({ id: map.id, map_data: map.json_data });
    } catch (error) {
        console.error('Error fetching map:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Save statistics for a played map
exports.submitStats = async (req, res) => {
    const { map_id, player_id, stats } = req.body;

    if (!map_id || !player_id || !stats) {
        return res.status(400).json({ error: 'map_id, player_id, and stats are required' });
    }

    try {
        await MapRun.create({
            map_id,
            player_id,
            money: stats.money,
            kills: stats.kills,
            waves: stats.waves,
            time: stats.time
        });

        res.status(201).json({ message: 'Statistics saved successfully' });
    } catch (error) {
        console.error('Error saving statistics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};