const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://kasireddylaxmi66040:1234@cluster0.wrtaxpl.mongodb.net/NewsFeed', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const postRoutes = require('./routes/postRoutes');

app.use('/api', userRoutes); 
app.use('/api', loginRoutes);
app.use('/api', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



