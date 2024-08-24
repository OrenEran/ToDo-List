const express = require('express');
const app = express();
const { createCategory, getCategories } = require('../controllers/categoryController');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new category
router.post('/categories', auth, createCategory);

// Get all categories
router.get('/categories', auth, getCategories);

module.exports = router;
