const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
 

// Define routes for appointments
router.post('/register', userController.registerUser);

module.exports = router;