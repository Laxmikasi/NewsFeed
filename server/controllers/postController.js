// const User = require('../models/userModel');
// const multer = require('multer');


// const storage = multer.diskStorage({
//     destination: 'uploads/', // Choose a folder to store uploaded files
//     filename: function (_req, file, cb) {
//       cb(null, file.originalname);
//     },
//   });
  
//   const upload = multer({ storage });
// // exports.addPost = upload.single('image'), async (req, res) => {
  
// //   try {
// //     const userId = req.user.id;
// //     console.log("hai");

// //     const {  title, subtitle, content } = req.body;

// //     const image = req.file ? `/uploads/${req.file.filename}` : null;

// //     const token = req.headers['x-token'];
// //     console.log('Received Token in Controller:', token);

// //     const customer = await User.findOne( {_id:userId} );
// //     console.log('Result of User.findOne:', customer);


// //     if (!customer) {
// //       return res.status(404).json({ error: "Customer not found." });
// //     }

// //     // Assuming post is an array in your user model
// //     customer.post.push({ image, title, subtitle, content });
// //     await customer.save();

// //     res.status(201).json({ success: true });
// //   } catch (error) {
// //     console.error("Error saving post data:", error.message);
// //     res.status(500).json({ error: "Error saving post data." });
// //   }
// // };
// exports.addPost = async (req, res) => {
//   try {
//     const { title, subtitle, content } = req.body;
//     const image = req.file ? `/uploads/${req.file.filename}` : null;

//     // No need to check for the user ID or token in this version

//     const customer = await User.findOne({}); // Assuming you want to find any user

//     console.log('Result of User.findOne:', customer);

//     if (!customer) {
//       return res.status(404).json({ error: "Customer not found." });
//     }

//     // Assuming post is an array in your user model
//     customer.post.push({ image, title, subtitle, content });
//     await customer.save();

//     res.status(201).json({ success: true });
//   } catch (error) {
//     console.error("Error saving post data:", error.message);
//     res.status(500).json({ error: "Error saving post data." });
//   }
// };


// // exports.addPost = upload.single('image'), async (req, res) => {
  
// //   try {
// //     const newVideo = new Video(req.body);
// //     await newVideo.save();
// //     res.status(201).json(newVideo);
// //   } catch (error) {
// //     console.error('Error saving video:', error);
// //     res.status(500).send('Internal Server Error');
// //   }
// // };
// // exports.getAllPosts = async (req, res) => {
// //   try {
// //     const posts = await User.find(); // Retrieve all posts from the database
// //     res.status(200).json(posts); // Send the posts as a JSON response
// //   } catch (error) {
// //     console.error('Error fetching posts:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // };

// // Define a route to fetch videos
// // router.get('/videos', async (req, res) => {
// //   try {
// //     const videos = await Video.find(); 

   
// //     res.json(videos);
// //   } catch (error) {
// //     console.error('Error fetching videos:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // });

// postController.js

const User = require('../models/userModel');

const addPost = async (req, res) => {
  try {
    const { title, subtitle, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const customer = await User.findOne({});

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found.' });
    }

    customer.post.push({ image, title, subtitle, content });
    await customer.save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error saving post data:', error.message);
    res.status(500).json({ error: 'Error saving post data.' });
  }
};

module.exports = {
  addPost,
};
