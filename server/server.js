const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Add this line
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Use CORS middleware
app.use(cors());  // Add this line

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

// Add this to get more detailed Mongoose logs
mongoose.set('debug', true);

app.use(express.json());

// Import and use routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back the React app's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
