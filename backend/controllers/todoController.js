const mongoose = require('mongoose');
const Todo = require('../models/Todo');
const Category = require('../models/Category');

exports.createTodo = async (req, res) => {
  const { text, categoryId, dueDate } = req.body;
  const userId = req.user._id;

  if (!text || !categoryId) {
    return res.status(400).json({ error: 'Todo text and category are required.' });
  }

  try {
    const newTodo = new Todo({
      text,
      completed: false,
      userId,
      categoryId,
      dueDate: dueDate || null,
    }); 
    console.log('Creating Todo with data:', { text, completed: false, userId, categoryId, dueDate });
   
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
};


exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id }).populate('categoryId');
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve todos' });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { completed, text } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { 
        ...(completed !== undefined && { completed }), 
        ...(text !== undefined && { text }) 
      }, 
      { new: true }
    ).populate('categoryId');

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
};


exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
};
