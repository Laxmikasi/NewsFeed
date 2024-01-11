const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');


// Define routes for appointments
router.post('/post', postController.addPost);
// router.get('/getPost', postController.getAllPosts);


module.exports = router;
