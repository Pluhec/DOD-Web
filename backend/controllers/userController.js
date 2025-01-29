const sequelize = require('../config/database');
const MapRun = require('../models/MapRun')(sequelize, require('sequelize').DataTypes);
const User = require('../models/User')(sequelize, require('sequelize').DataTypes);

exports.getUserStats = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'user_id is required' });
    }

    try {
        const bestStats = await MapRun.findOne({
            where: { userID: id },
            attributes: [
                [sequelize.fn('MAX', sequelize.col('time')), 'best_time'],
                [sequelize.fn('MAX', sequelize.col('waves')), 'best_waves'],
                [sequelize.fn('MAX', sequelize.col('money')), 'best_money'],
                [sequelize.fn('MAX', sequelize.col('kills')), 'best_kills']
            ]
        });

        res.status(200).json(bestStats);
    } catch (error) {
        console.error('Error fetching user stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getNickname = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'user_id is required' });
    }

    try {
        const user = await User.findByPk(id, { attributes: ['nickname'] });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ nickname: user.nickname });
    } catch (error) {
        console.error('Error fetching nickname:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};