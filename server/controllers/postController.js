const User = require('../models/userModel');
const multer = require('multer');
const upload = multer();

exports.addPost = upload.none(), async (req, res) => {
  const { image, title, subtitle, content } = req.body;

  try {
    const token = req.headers['x-token'];
    const customer = await User.findOne({ token });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found." });
    }

    // Assuming post is an array in your user model
    customer.post.push({ image, title, subtitle, content });
    await customer.save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error saving post data:", error.message);
    res.status(500).json({ error: "Error saving post data." });
  }
};
