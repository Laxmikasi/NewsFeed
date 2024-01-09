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