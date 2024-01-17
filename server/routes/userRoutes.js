const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


// Define routes for appointments
router.post('/register', userController.registerUser);
router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;
