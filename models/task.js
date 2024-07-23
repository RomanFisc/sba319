const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [1, 'Title must be at least 1 character long']
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;