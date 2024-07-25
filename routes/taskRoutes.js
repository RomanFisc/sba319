const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.delete('/tasks/:id', taskController.deleteTask);

router.get('/users', taskController.getAllUsers);
router.post('/users', taskController.createUser);
router.delete('/users/:id', taskController.deleteUser);

router.get('/categories', taskController.getAllCategories);
router.post('/categories', taskController.createCategory);
router.delete('/categories/:id', taskController.deleteCategory);

module.exports = router;



