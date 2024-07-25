const mongoose = require('mongoose');
const Category = require('./category');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [1, 'Title must be at least 1 character long']
  },
  completed: {
    type: Boolean,
    default: false
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;