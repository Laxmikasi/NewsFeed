const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://kasireddylaxmi66040:1234@cluster0.wrtaxpl.mongodb.net/NewsFeed",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Create separate routers for each route file
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");
const postRoutes = require("./routes/postRoutes");
const forgotRoutes = require("./routes/forgotRoutes");

// Use each router under the /api namespace
app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/forgot", forgotRoutes);

// Serve static files and handle other routes by serving the React app
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
