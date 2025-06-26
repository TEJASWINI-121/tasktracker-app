// import Event from './models/Event.js';
// import User from './models/User.js';
const express = require('express');
const mongoose = require('mongoose');


const cors = require('cors');
const { MONGO_URI, PORT } = require('./config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB....');
    app.listen(PORT, () => console.log(`follow the link http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); 