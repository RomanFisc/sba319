const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Create a new task
router.post('/tasks', taskController.createTask);

// Get all tasks
router.get('/tasks', taskController.getTasks);

// Delete a task by ID
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;