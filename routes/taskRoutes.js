const express = require('express');
const router = express.Router();

//import controllers
const taskController = require('../controllers/taskController');
const categoryController = require('../controllers/categoryController');
const tagController = require('../controllers/tagController');


//task routes
router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.delete('/tasks/:id', taskController.deleteTask);


//category routes
router.get('/categories', categoryController.getAllCategories);
router.post('/categories', categoryController.createCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

//tag routes
router.post('/', tagController.createTag);
router.get('/', tagController.getTags);
router.delete('/:id', tagController.deleteTag);

module.exports = router;