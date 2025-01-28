// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
require('dotenv').config();

const blogsRouter = require('./controllers/blogs');
const spotifyRouter = require('./controllers/spotify');
const usersRouter = require('./controllers/users');
const authRouter = require('./controllers/auth');
const youtubeRouter = require('./controllers/youtube');
const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('dist'))
app.use(express.json());


app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api', spotifyRouter);
app.use('/api/auth', authRouter);
app.use('/api/youtube', youtubeRouter);







module.exports = app;
