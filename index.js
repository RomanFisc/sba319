const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the to-do list');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});