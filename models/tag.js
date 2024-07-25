const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tag name is required'],
    minlength: [1, 'Tag name must be at least 1 character long']
  }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;