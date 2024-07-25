const express = require('express');
const router = express.Router();

// Import controllers
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');

// Task routes
router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.delete('/tasks/:id', taskController.deleteTask);

// User routes
router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.delete('/users/:id', userController.deleteUser);

// Category routes
router.get('/categories', categoryController.getAllCategories);
router.post('/categories', categoryController.createCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;