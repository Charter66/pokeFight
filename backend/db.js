const mongoose = require('mongoose');
require('dotenv').config()


const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', function() {
  console.log('MongoDB connected!');
});

module.exports = mongoose.connection;
