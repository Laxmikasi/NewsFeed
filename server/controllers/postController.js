const User = require('../models/userModel');
const Post = require('../models/postModel');
const multer = require('multer');
// const { default: MyPost } = require('../../client/src/Components/Mypost');

const storage = multer.diskStorage({
  destination: 'uploads/', // Choose a folder to store uploaded files
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

exports.addPost =  async (req, res) => {
  try {
    console.log('Received request body:', req.body);

    const userId = req.user.id;
    

    const { title, subtitle, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const timestamp = req.body.timestamp ? new Date(req.body.timestamp) : new Date();
    const customer = await User.findById(userId);
    // console.log('Result of User.findOne:', customer);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found.' });
    }

    const newPost = new Post({

      title,
      
      content,
      image,

      Author : { 
        UserId : customer._id,
        ProfilePic:customer.ProfilePic,
        Name : customer.firstName
  }
     
      });
    
    await newPost.save();
    console.log('New Post Document:', newPost);


    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error saving post data:', error.message);
    res.status(500).json({ error: 'Error saving post data.' });
    console.error('Error saving post data:', error.message);
    res.status(500).json({ error: 'Error saving post data.' });
  }
};

exports.likePost = async(req, res) =>{
  try {

      // accessing ids from like route
      const postId = req.params.postId;
      const userId = req.user.id;

      // checking id's validitity in the database
      const postExist = await Post.findById(postId);
      const userExist = await User.findById(userId);

      if(!postExist){
          return res.status(400).json({message: "Post not found"});
      }

      if(!userExist){
          return res.status(400).json({message: "User not found"});
      }

      // checking if user already liked the post in the past
      if(postExist.likedBy.includes(userId)){
          return res.status(400).json({message: "Post already liked"});
      }

      // checking if user already disliked then remove dislike
      if(postExist.dislikedBy.includes(userId)){
          postExist.dislikedBy.pull(userId);
          postExist.dislikes -= 1;
      }

      // creating like and storing into the database
      postExist.likedBy.push(userId);
      postExist.likes += 1;

      const savedLikes = await postExist.save();
      res.status(200).json(savedLikes);
      
  } catch (error) {
      res.status(500).json({error: error});
  }
}


exports.dislikePost = async(req, res) =>{
  try {

      // accessing ids from dislike route
      const postId = req.params.postId;
      const userId = req.user.id;

      // checking id's validitity in the database
      const postExist = await Post.findById(postId);
      const userExist = await User.findById(userId);

      if(!postExist){
          return res.status(400).json({message: "Post not found"});
      }

      if(!userExist){
          return res.status(400).json({message: "User not found"});
      }

      if(postExist.dislikedBy.includes(userId)){
          return res.status(400).json({message: "Post already disliked"});
      }

      // checking if user already liked then remove like
      if(postExist.likedBy.includes(userId)){
          postExist.likedBy.pull(userId);
          postExist.likes -= 1;
      }

      // creating dislike and storing into the database
      postExist.dislikedBy.push(userId);
      postExist.dislikes += 1;

      const savedDislikes = await postExist.save();
      res.status(200).json(savedDislikes);
      
  } catch (error) {
      res.status(500).json({error: error});
  }
}


exports.readPosts= async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};



// server.js
exports.commentPost= async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;
    const post = await Post.findById(postId);
    post.comments.push({ text });
    await post.save();
    res.json({ message: 'Commented successfully' });
  } catch (error) {
    console.error('Error commenting on media:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};