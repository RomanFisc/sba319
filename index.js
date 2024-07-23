const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(cors()); 
app.use(express.json());

app.use('/api', taskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});