// const express = require('express');
// const router = express.Router();
// const postController = require('../controllers/postController');
// const authMiddleware = require('../middlewares/authMiddleware');


// // Define routes for appointments
// router.post('/post', postController.addPost);
// // router.get('/getPost', postController.getAllPosts);


// module.exports = router;


// postRoutes.js

const express = require('express');
const multer = require('multer');
const postController = require('../controllers/postController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Define routes
router.post('/post', upload.single('image'), postController.addPost);

module.exports = router;

