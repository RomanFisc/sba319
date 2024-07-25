const Tag = require('../models/tag');

exports.createTag = async (req, res) => {
  try {
    const { name } = req.body;
    const tag = new Tag({ name });
    await tag.save();
    res.status(201).json(tag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByIdAndDelete(id);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};