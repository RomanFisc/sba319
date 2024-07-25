const Task = require('../models/task');
const Category = require('../models/category');

// Controller functions for tasks
exports.createTask = async (req, res) => {
  try {
    const { title, completed, category, dueDate, priority } = req.body;

    if (category) {
      const foundCategory = await Category.findById(category);
      if (!foundCategory) {
        return res.status(400).json({ error: 'Category not found' });
      }
    }

    const task = new Task({ title, completed, category, dueDate, priority });
    await task.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { category } = req.query;

    const query = {};
    if (category) {
      query.category = category;
    }

    const tasks = await Task.find(query).populate('category');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};