const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/get-stats', verifyToken, userController.getUserStats);
router.post('/get-nickname', verifyToken, userController.getNickname);

module.exports = router;