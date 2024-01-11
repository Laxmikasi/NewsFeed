const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: 'uploads/', // Choose a folder to store uploaded files
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage });

// Define routes for appointments
router.post('/addPost',upload.single('image'), authMiddleware, postController.addPost);

module.exports = router;
