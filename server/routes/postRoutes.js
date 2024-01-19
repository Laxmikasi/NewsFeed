

const express = require('express');
const multer = require('multer');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');



const storage = multer.diskStorage({
    destination: 'uploads/', // Choose a folder to store uploaded files
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage });

// Define routes for appointments
router.post('/post',upload.single('image'), authMiddleware, postController.addPost);
router.post('/like/:postId/:userId', postController.likePost);
router.post('/dislike/:postId/:userId', postController.dislikePost);
router.get('/allPosts', postController.readPosts);

module.exports = router;

