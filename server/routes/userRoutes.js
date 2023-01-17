const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/user-info', authenticateToken, userController.getUserInfo)

module.exports = router