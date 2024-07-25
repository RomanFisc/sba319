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
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'  
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  
  }
}, { timestamps: true });

taskSchema.index({ title: 1 });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;