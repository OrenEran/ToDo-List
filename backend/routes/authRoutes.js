const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Route for user registration
router.post('/auth/register', register);

// Route for user login
router.post('/auth/login', login);

module.exports = router;
