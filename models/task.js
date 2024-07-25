const mongoose = require('mongoose');
const Category = require('./category');
const Tag = require('./tag');

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
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  dueDate: Date,
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;