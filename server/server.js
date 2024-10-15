console.log('Starting server...');
console.log('Current directory:', process.cwd());
console.log('Files in current directory:', require('fs').readdirSync('.'));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Use CORS middleware
app.use(cors());

// Connect to MongoDB
const mongoURI = process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI;
console.log('Connecting to MongoDB with URI:', mongoURI);
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log(`MongoDB Atlas connected to ${process.env.NODE_ENV === 'test' ? 'test' : 'development'} database`))
  .catch(err => {
    console.error('MongoDB Atlas connection error:', err);
    console.error('Error details:', JSON.stringify(err, null, 2));
    console.error('MongoDB URI:', mongoURI); // Be careful not to log sensitive information in production
  });

// API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Increase the server timeout
app.timeout = 60000; // 60 seconds

app.use(express.json());
