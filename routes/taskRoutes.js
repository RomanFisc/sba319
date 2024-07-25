const express = require('express');
const router = express.Router();

// Import controllers
const taskController = require('../controllers/taskController');
const categoryController = require('../controllers/categoryController');

// Task routes
router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.delete('/tasks/:id', taskController.deleteTask);



// Category routes
router.get('/categories', categoryController.getAllCategories);
router.post('/categories', categoryController.createCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;