const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes'); // Make sure this file exists

require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api', taskRoutes); // All routes under /api will be handled by taskRoutes

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});