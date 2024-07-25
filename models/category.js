const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    minlength: [1, 'Category name must be at least 1 character long']
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;