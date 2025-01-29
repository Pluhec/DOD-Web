const sequelize = require('../config/database');
const Map = require('../models/Map')(sequelize, require('sequelize').DataTypes);
const MapRun = require('../models/MapRun')(sequelize, require('sequelize').DataTypes);
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
});

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
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'map_id is required' });
    }

    try {
        const map = await Map.findByPk(id);
        
        if (!map) {
            return res.status(404).json({ error: 'Map not found' });
        }

        res.status(200).json({ id: map.id, map_data: map.json_data, waves: map.waves });
    } catch (error) {
        console.error('Error fetching map:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Save statistics for a played map
exports.submitStats = async (req, res) => {
    const { mapID, playerID, money, kills, waves, time } = req.body;

    if (!mapID || !playerID || !money || !kills || !waves || !time) {
        return res.status(400).json({ error: 'map_id, player_id, and stats are required' });
    }

    try {
        await MapRun.create({
            mapID,
            playerID,
            money: money,
            kills: kills,
            waves: waves,
            time: time
        });

        res.status(201).json({ message: 'Statistics saved successfully' });
    } catch (error) {
        console.error('Error saving statistics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.submitMap = [
    upload.single('mapFile'),
    async (req, res) => {
        const { name, difficulty, waves } = req.body;
        const mapFile = req.file;

        if (!name || !difficulty || !waves || !mapFile) {
            return res.status(400).json({ error: 'name, difficulty, waves, and mapFile are required' });
        }

        try {
            const json_data = mapFile.originalname;

            const newMap = await db.Map.create({
                name,
                difficulty,
                waves,
                json_data
            });

            res.status(201).json({ message: 'Map created successfully', map: newMap });
        } catch (error) {
            console.error('Error submitting map:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
];

exports.getLeaderboard = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'map_id is required' });
    }

    try {
        const topPlayers = await Promise.all([
            MapRun.findAll({
                where: { id },
                order: [['money', 'DESC']],
                limit: 5
            }),
            MapRun.findAll({
                where: { id },
                order: [['kills', 'DESC']],
                limit: 5
            }),
            MapRun.findAll({
                where: { id },
                order: [['waves', 'DESC']],
                limit: 5
            }),
            MapRun.findAll({
                where: { id },
                order: [['time', 'ASC']],
                limit: 5
            })
        ]);

        res.status(200).json({
            topMoney: topPlayers[0],
            topKills: topPlayers[1],
            topWaves: topPlayers[2],
            bestTime: topPlayers[3]
        });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getMapName = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'mamp_id is required' });
    }

    try {
        const map = await Map.findByPk(id, { attributes: ['name'] });

        if (!user) {
            return res.status(404).json({ error: 'Map not found' });
        }

        res.status(200).json({ name: map.name });
    } catch (error) {
        console.error('Error fetching map name:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};