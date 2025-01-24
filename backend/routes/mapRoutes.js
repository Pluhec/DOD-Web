const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/maps', verifyToken, mapController.getAllMaps);
router.post('/play-map', verifyToken, mapController.playMap);
router.post('/submit-stats', verifyToken, mapController.submitStats);

module.exports = router;