const User = require('../models/userModel');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads/', // Choose a folder to store uploaded files
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

exports.addPost =  async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user.id;
    console.log('User ID:', userId);

    const { title, subtitle, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const customer = await User.findById(userId);
    console.log('Result of User.findOne:', customer);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found.' });
    }

    customer.post.push({ image, title, subtitle, content });
    await customer.save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error saving post data:', error.message);
    res.status(500).json({ error: 'Error saving post data.' });
    console.error('Error saving post data:', error.message);
    res.status(500).json({ error: 'Error saving post data.' });
  }
};

module.exports = {
  addPost,
};
