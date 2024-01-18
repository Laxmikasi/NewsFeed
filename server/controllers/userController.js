const User = require('../models/userModel');
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

exports.registerUser = async (req, res) => {
  const { firstName,lastName, email, phone, password } = req.body;

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create a new user document
    const newUser = new User({
    firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    // Save the user document to the database
    await newUser.save();

    res.status(201).json({ message: "Registration successful." });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Failed to register." });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user details from the "users" collection and populate additional data
    const user = await User.findById(userId)
    

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};
