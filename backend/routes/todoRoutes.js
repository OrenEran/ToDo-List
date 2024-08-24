const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const { getCategories } = require('../controllers/categoryController');

// Get todos list
router.get('/todos', auth, getTodos);

// Create a new Todo
router.post('/todos', auth, createTodo);

// Update a Todo
router.put('/todos/:id', auth, updateTodo);

// Delete a Todo
router.delete('/todos/:id', auth, deleteTodo);

// Categories Route
router.get('/categories', auth, require('../controllers/categoryController').getCategories);


module.exports = router;
